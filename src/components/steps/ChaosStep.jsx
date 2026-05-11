import React, { useEffect, useState } from 'react';
import DraggableWindow from '../DraggableWindow';
import { getSafeRandomPos } from '../../utils/windowUtils';

const ChaosStep = ({ onComplete }) => {
    const [popups, setPopups] = useState([]);
    const [finished, setFinished] = useState(false);
    const [localZIndex, setLocalZIndex] = useState(2000);

    const bringToFront = (id) => {
        setLocalZIndex(prev => {
            const nextZ = prev + 1;
            setPopups(prevPopups => prevPopups.map(p => 
                p.id === id ? { ...p, zIndex: nextZ } : p
            ));
            return nextZ;
        });
    };

    const popupData = [
        { title: 'MSN Status', text: 'מה היה הסטטוס שלך במסנג׳ר?', type: 'MSN' },
        { title: 'System Notice', text: 'נמצאה תיקיית תמונות 2010', type: 'NOTICE', classes: ['shaking'] },
        { title: 'Toolbar Installer', text: 'האם להתקין סרגל כלים?', type: 'TOOLBAR', buttons: true },
        { title: 'Warning', text: 'המערכת זוכרת יותר מדי.', type: 'WARNING' }
    ];

    useEffect(() => {
        popupData.forEach((p, i) => {
            setTimeout(() => {
                const { x, y } = getSafeRandomPos(300, 150);
                setPopups(prev => [...prev, { ...p, id: i, x, y, zIndex: localZIndex + i }]);
            }, i * 400);
        });
        
        setLocalZIndex(prev => prev + popupData.length);

        setTimeout(() => {
            setFinished(true);
        }, 3500);
    }, []);

    const closePopup = (id) => {
        setPopups(prev => prev.filter(p => p.id !== id));
    };

    if (finished && popups.length === 0) {
        onComplete();
        return null;
    }

    return (
        <>
            {popups.map(p => (
                <DraggableWindow 
                    key={p.id} 
                    title={p.title} 
                    x={p.x} 
                    y={p.y} 
                    zIndex={p.zIndex}
                    classes={p.classes || []}
                    onClose={() => closePopup(p.id)}
                    onFocus={() => bringToFront(p.id)}
                >
                    <p>{p.text}</p>
                    {p.buttons ? (
                        <div style={{ display: 'flex', gap: '5px' }}>
                            <button onClick={() => closePopup(p.id)}>כן</button>
                            <button onClick={() => closePopup(p.id)}>כן אבל בעברית</button>
                        </div>
                    ) : (
                        <button onClick={() => closePopup(p.id)}>אישור</button>
                    )}
                </DraggableWindow>
            ))}
            {finished && popups.length > 0 && (
                <DraggableWindow 
                    title="המערכת מוכנה" 
                    x={Math.max(20, Math.floor(Math.random() * (window.innerWidth - 220)))} 
                    y={Math.max(20, Math.floor(Math.random() * (window.innerHeight - 150)))} 
                    zIndex={localZIndex + 10}
                    onClose={() => onComplete()}
                    onFocus={() => bringToFront('continue')}
                >
                    <div style={{ textAlign: 'center', padding: '10px' }}>
                        <p>כל השלבים הושלמו בהצלחה.</p>
                        <button style={{ padding: '8px 20px', fontWeight: 'bold' }} onClick={() => onComplete()}>המשך</button>
                    </div>
                </DraggableWindow>
            )}
        </>
    );
};

export default ChaosStep;
