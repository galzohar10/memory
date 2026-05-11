import React, { useState } from 'react';

const EncyclopediaStep = ({ onNext }) => {
    const [attempts, setAttempts] = useState(0);
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [showNextButton, setShowNextButton] = useState(false);

    const handleConfirm = () => {
        const nextAttempts = attempts + 1;
        setAttempts(nextAttempts);
        setPassword('');

        if (nextAttempts === 1) {
            setMessage('רשמת אנציקולוםדיה. נסה שנית.');
        } else if (nextAttempts >= 2) {
            setMessage('רשמת אנציקךופדיה.');
            setShowNextButton(true);
        }
    };

    return (
        <div style={{ textAlign: 'center', padding: '10px' }}>
            <p style={{ marginTop: 0 }}>כתוב אנציקלופדיה</p>
            <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ 
                    padding: '5px', 
                    width: '180px', 
                    marginBottom: '10px',
                    border: '2px inset #888'
                }} 
            />
            <br />
            {message && <p style={{ color: 'red', fontSize: '13px', margin: '5px 0' }}>{message}</p>}
            
            {!showNextButton ? (
                <button 
                    onClick={handleConfirm}
                    style={{ padding: '4px 15px' }}
                >
                    אישור
                </button>
            ) : (
                <button 
                    onClick={onNext}
                    style={{ padding: '4px 15px', marginTop: '10px' }}
                >
                    נסה דרך אחרת
                </button>
            )}
        </div>
    );
};

export default EncyclopediaStep;
