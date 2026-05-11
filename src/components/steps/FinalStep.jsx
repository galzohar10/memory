import React, { useState } from 'react';
import DraggableWindow from '../DraggableWindow';

const FinalStep = () => {
    const [final, setFinal] = useState(false);

    if (final) {
        return (
            <div style={{ textAlign: 'center' }}>
                <p style={{ color: 'red', fontWeight: 'bold' }}>ACCESS DENIED</p>
                <p>הסיסמה נכונה, אבל המשתמש כבר לא אותו משתמש.</p>
                <button style={{ marginTop: '10px' }} onClick={() => window.location.reload()}>התחל מחדש</button>
            </div>
        );
    }

    return (
        <div style={{ textAlign: 'center' }}>
            <p style={{ marginTop: 0 }}>הסיסמה שוחזרה בהצלחה.</p>
            <button onClick={() => setFinal(true)}>כניסה</button>
        </div>
    );
};

export default FinalStep;
