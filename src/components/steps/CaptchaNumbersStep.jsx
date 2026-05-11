import React, { useState } from 'react';

const CaptchaNumbersStep = ({ onNext }) => {
    const [target] = useState(() => Math.floor(1000 + Math.random() * 9000).toString());
    const [val, setVal] = useState('');

    return (
        <div style={{ textAlign: 'center' }}>
            <p>הקלד את הספרות שמופיעות:</p>
            <h2 style={{ fontFamily: '"Comic Sans MS", cursive', letterSpacing: '5px', color: '#555', background: '#ddd', padding: '5px', transform: 'rotate(-5deg)', display: 'inline-block', margin: '0' }}>{target}</h2>
            <br />
            <input 
                type="text" 
                value={val} 
                onChange={(e) => setVal(e.target.value)} 
                style={{ marginTop: '10px' }} 
            />
            <br />
            <button 
                style={{ marginTop: '10px' }} 
                onClick={onNext}
                disabled={val !== target}
            >המשך</button>
        </div>
    );
};

export default CaptchaNumbersStep;
