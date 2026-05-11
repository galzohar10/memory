import React, { useState, useEffect } from 'react';

const ProgressBarStep = ({ onComplete }) => {
    const [progress, setProgress] = useState(0);
    const [text, setText] = useState('טוען נתונים...');

    useEffect(() => {
        const timeouts = [
            setTimeout(() => setProgress(30), 500),
            setTimeout(() => setProgress(60), 1000),
            setTimeout(() => setProgress(98), 1500),
            setTimeout(() => setProgress(99), 2000),
            setTimeout(() => setText('עוד רגע...'), 4000),
            setTimeout(() => onComplete(), 5500)
        ];

        return () => timeouts.forEach(t => clearTimeout(t));
    }, [onComplete]);

    return (
        <div>
            <p id="prog-text" style={{ marginTop: 0 }}>{text}</p>
            <div className="progress-bar-container">
                <div className="progress-bar-fill" style={{ width: `${progress}%` }}></div>
            </div>
        </div>
    );
};

export default ProgressBarStep;
