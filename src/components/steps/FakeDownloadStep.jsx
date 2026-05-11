import React from 'react';

const FakeDownloadStep = ({ onRealClick, onFakeClick }) => {
    const msgs = ["נפתח חלון חדש שלא ביקשת.", "סרגל כלים הותקן בהצלחה. סתם, לא באמת."];

    return (
        <div>
            <p style={{ marginTop: 0 }}>הורד את קובץ האימות:</p>
            <div className="fake-downloads">
                <button onClick={() => onFakeClick(msgs[0])}>DOWNLOAD</button>
                <button onClick={() => onFakeClick(msgs[1])}>DOWNLOAD NOW</button>
                <button onClick={() => onFakeClick(msgs[0])}>הורדה בטוחה</button>
                <button onClick={() => onFakeClick(msgs[1])}>לא וירוס</button>
                <button onClick={onRealClick}>הכפתור האמיתי</button>
            </div>
        </div>
    );
};

export default FakeDownloadStep;
