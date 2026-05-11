import React, { useRef, useState, useEffect } from 'react';

const PaintStep = ({ onNext }) => {
    const canvasRef = useRef(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [hasDrawn, setHasDrawn] = useState(false);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        ctx.strokeStyle = '#000';
        ctx.lineWidth = 2;
        ctx.lineCap = 'round';
    }, []);

    const startDrawing = (e) => {
        const { offsetX, offsetY } = e.nativeEvent;
        const ctx = canvasRef.current.getContext('2d');
        ctx.beginPath();
        ctx.moveTo(offsetX, offsetY);
        setIsDrawing(true);
    };

    const draw = (e) => {
        if (!isDrawing) return;
        const { offsetX, offsetY } = e.nativeEvent;
        const ctx = canvasRef.current.getContext('2d');
        ctx.lineTo(offsetX, offsetY);
        ctx.stroke();
        if (!hasDrawn) setHasDrawn(true);
    };

    const stopDrawing = () => {
        setIsDrawing(false);
    };

    return (
        <div style={{ textAlign: 'right' }}>
            <p style={{ margin: '0 0 5px 0' }}>צייר XD</p>
            <div className="paint-layout">
                <div className="paint-toolbar">
                    <div className="paint-tool" style={{ fontWeight: 'bold' }}>T</div>
                    <div className="paint-tool">~</div>
                    <div className="paint-tool">O</div>
                    <div className="paint-tool">/</div>
                    <div className="paint-colors">
                        <div className="paint-color" style={{ background: '#000' }}></div>
                        <div className="paint-color" style={{ background: '#fff' }}></div>
                        <div className="paint-color" style={{ background: '#f00' }}></div>
                        <div className="paint-color" style={{ background: '#0f0' }}></div>
                        <div className="paint-color" style={{ background: '#00f' }}></div>
                        <div className="paint-color" style={{ background: '#ff0' }}></div>
                    </div>
                </div>
                <canvas 
                    ref={canvasRef}
                    className="paint-canvas" 
                    width="250" 
                    height="200"
                    onMouseDown={startDrawing}
                    onMouseMove={draw}
                    onMouseUp={stopDrawing}
                    onMouseLeave={stopDrawing}
                ></canvas>
            </div>
            <div style={{ textAlign: 'center' }}>
                {hasDrawn && <button style={{ marginTop: '10px' }} onClick={onNext}>המשך</button>}
            </div>
        </div>
    );
};

export default PaintStep;
