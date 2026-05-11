import React, { useState } from 'react';

const CaptchaImagesStep = ({ onNext }) => {
    const [selected, setSelected] = useState([]);
    const [errorMsg, setErrorMsg] = useState('');
    
    // Using the filenames exactly as requested by the user
    // 3 Britney images and 6 distractors. Object-fit: cover is used to fill the square tiles.
    const tiles = [
        { id: 0, src: '/britheny/britney1.png', isBritney: true, pos: 'center' },
        { id: 1, src: '/britheny/avril.png', isBritney: false, pos: 'center' },
        { id: 2, src: '/britheny/beyonce.png', isBritney: false, pos: 'center' },
        { id: 3, src: '/britheny/pink.png', isBritney: false, pos: 'center' },
        { id: 4, src: '/britheny/britney2.png', isBritney: true, pos: 'center' },
        { id: 5, src: '/britheny/rihanna.png', isBritney: false, pos: 'center' },
        { id: 6, src: '/britheny/snoopdogg.png', isBritney: false, pos: 'center' },
        { id: 7, src: '/britheny/britney3.png', isBritney: true, pos: 'center' },
        { id: 8, src: '/britheny/pic.png', isBritney: false, pos: 'center' },
    ];

    const toggle = (id) => {
        if (selected.includes(id)) {
            setSelected(selected.filter(i => i !== id));
        } else {
            setSelected([...selected, id]);
        }
        setErrorMsg('');
    };

    const handleVerify = () => {
        const correctIds = tiles.filter(t => t.isBritney).map(t => t.id);
        
        const isCorrect = selected.length === correctIds.length && 
                          selected.every(id => correctIds.includes(id));

        if (isCorrect) {
            onNext();
        } else {
            setErrorMsg('נסה שוב');
            setSelected([]);
        }
    };

    return (
        <div style={{ textAlign: 'center' }}>
            <p style={{ marginTop: 0, marginBottom: '10px' }}>
                סמן את כל התמונות שבהן מופיעה בריטני:
            </p>
            
            <div className="image-grid">
                {tiles.map((tile) => (
                    <div 
                        key={tile.id} 
                        className={`captcha-img-wrapper ${selected.includes(tile.id) ? 'selected' : ''}`}
                        onClick={() => toggle(tile.id)}
                    >
                        <img 
                            src={tile.src} 
                            alt="" 
                            style={{ 
                                objectFit: 'cover', 
                                objectPosition: tile.pos 
                            }}
                        />
                        {selected.includes(tile.id) && (
                            <div className="check-mark">✓</div>
                        )}
                    </div>
                ))}
            </div>

            {errorMsg && (
                <p style={{ color: 'red', fontSize: '13px', margin: '5px 0' }}>
                    {errorMsg}
                </p>
            )}
            
            <button 
                style={{ marginTop: '10px' }} 
                onClick={handleVerify}
            >
                המשך
            </button>
        </div>
    );
};



export default CaptchaImagesStep;


