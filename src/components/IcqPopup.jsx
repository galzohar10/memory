import React, { useEffect } from 'react';

const IcqPopup = () => {
    useEffect(() => {
        const audio = new Audio('/Icq old sound.mp3');
        audio.play().catch(e => console.error("Audio play failed:", e));
    }, []);

    return (
        <div style={{ padding: '10px' }}>
            <p style={{ margin: 0, fontSize: '13px' }}>572 הודעות חדשות</p>
        </div>
    );
};

export default IcqPopup;
