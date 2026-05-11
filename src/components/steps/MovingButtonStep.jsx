import React, { useState, useEffect } from 'react';

const MovingButtonStep = ({ onNext }) => {
    const [pos, setPos] = useState({ left: 100, top: 80 });
    const [allowClick, setAllowClick] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setAllowClick(true), 4000);
        return () => clearTimeout(timer);
    }, []);

    const handleMouseEnter = () => {
        if (allowClick) return;
        const maxX = 300 - 80;
        const maxY = 200 - 30;
        setPos({
            left: Math.random() * maxX,
            top: Math.random() * maxY
        });
    };

    return (
        <div>
            <p style={{ marginTop: 0 }}>לחץ על "אני זוכר"</p>
            <div id="moving-btn-container">
                <button 
                    className="moving-btn"
                    style={{ left: `${pos.left}px`, top: `${pos.top}px` }}
                    onMouseEnter={handleMouseEnter}
                    onClick={() => allowClick && onNext()}
                >
                    אני זוכר
                </button>
            </div>
        </div>
    );
};

export default MovingButtonStep;
