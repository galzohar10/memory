import React from 'react';

const Desktop = ({ children, onIconClick, showRestored, restoredImage, background }) => {
    return (
        <div id="desktop" style={background ? { backgroundImage: `url(${background})`, backgroundSize: 'cover' } : {}}>
            <div id="desktop-icons">
                <div className="desktop-icon" onClick={() => onIconClick('computer')}>
                    <div className="icon-img icon-computer"></div>
                    <span>המחשב שלי</span>
                </div>
                <div className="desktop-icon" onClick={() => onIconClick('recycle')}>
                    <div className="icon-img icon-recycle"></div>
                    <span>סל המחזור</span>
                </div>
                <div className="desktop-icon" onClick={() => onIconClick('ie')}>
                    <div className="icon-img icon-ie"></div>
                    <span>Internet Explorer</span>
                </div>
                <div className="desktop-icon" id="photos-folder" onClick={() => onIconClick('photos')}>
                    <div className="icon-img icon-photos"></div>
                    <span>תמונות<br />2010</span>
                </div>
                <div className="desktop-icon" onClick={() => onIconClick('icq')}>
                    <div className="icon-img icon-icq"></div>
                    <span>ICQ</span>
                </div>
                {showRestored && (
                    <div className="desktop-icon" onClick={() => onIconClick('restored')}>
                        <div className="icon-img" style={{ backgroundImage: `url(${restoredImage})`, backgroundSize: 'cover', borderRadius: '2px', border: '1px solid #fff' }}></div>
                        <span>captured_photo.jpg</span>
                    </div>
                )}
            </div>
            {children}
        </div>
    );
};

export default Desktop;
