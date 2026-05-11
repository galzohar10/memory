import React, { useState } from 'react';

const LyricStep = ({ onNext, onAlert }) => {
    const [val, setVal] = useState('');
    const [showNext, setShowNext] = useState(false);

    return (
        <div>
            {!showNext ? (
                <>
                    <p style={{ marginTop: 0 }}>השלם את השורה:</p>
                    <p dir="ltr" style={{ textAlign: 'center', fontStyle: 'italic', margin: '15px 0' }}>"Tonight’s gonna be a good ______"</p>
                    <input 
                        type="text" 
                        dir="ltr" 
                        value={val} 
                        onChange={(e) => setVal(e.target.value)} 
                        style={{ width: '100%' }} 
                    />
                    <br />
                    <button 
                        style={{ marginTop: '10px' }} 
                        onClick={() => {
                            if (val.trim().toLowerCase() === 'night') {
                                setShowNext(true);
                            } else {
                                onAlert('לא נכון. נסה שוב.');
                            }
                        }}
                        disabled={!val.trim()}
                    >בדיקה</button>
                </>
            ) : (
                <div style={{ textAlign: 'center' }}>
                    <p>אושר</p>
                    <button onClick={onNext}>המשך</button>
                </div>
            )}
        </div>
    );
};

export default LyricStep;
