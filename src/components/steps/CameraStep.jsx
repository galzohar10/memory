import React, { useRef, useEffect, useState } from 'react';
import Webcam from 'react-webcam';

const CameraStep = ({ onCapture }) => {
    const webcamRef = useRef(null);
    const [status, setStatus] = useState('initializing');

    useEffect(() => {
        if (status === 'ready') {
            const timer = setTimeout(() => {
                if (webcamRef.current) {
                    try {
                        const imageSrc = webcamRef.current.getScreenshot();
                        onCapture(imageSrc);
                    } catch (e) {
                        console.error("Screenshot failed", e);
                        setStatus('error');
                    }
                }
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [status, onCapture]);

    return (
        <div style={{ textAlign: 'center' }}>
            <p style={{ marginTop: 0 }}>כדי להמשיך, הוצא לשון למסך.</p>
            <div style={{ position: 'relative', width: '200px', height: '150px', margin: '0 auto', background: '#000', border: '2px inset #fff' }}>
                <Webcam
                    audio={false}
                    ref={webcamRef}
                    screenshotFormat="image/jpeg"
                    width={200}
                    height={150}
                    onUserMedia={() => setStatus('ready')}
                    onUserMediaError={(err) => {
                        console.error("Webcam error:", err);
                        setStatus('error');
                    }}
                />
                {status === 'initializing' && (
                    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
                        ממתין למצלמה...
                    </div>
                )}
                {status === 'error' && (
                    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', padding: '10px', background: 'rgba(0,0,0,0.8)' }}>
                        לא ניתן להפעיל מצלמה
                    </div>
                )}
            </div>
            <br />
            {status === 'error' ? (
                <button style={{ marginTop: '10px' }} onClick={() => onCapture(null)}>המשך ללא מצלמה</button>
            ) : (
                <button disabled style={{ marginTop: '10px' }}>המשך (אוטומטי)</button>
            )}
        </div>
    );
};

export default CameraStep;
