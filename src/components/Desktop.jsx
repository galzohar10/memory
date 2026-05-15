import React, { useState } from 'react';

const Desktop = ({ children, onIconClick, restoredToDesktop = [], background, onSetWallpaper }) => {
    const [selectedDesktopPhoto, setSelectedDesktopPhoto] = useState(null);
    return (
        <div id="desktop" style={background ? { backgroundImage: `url(${background})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}} onClick={() => setSelectedDesktopPhoto(null)}>
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
                {restoredToDesktop.map((photo, idx) => (
                    <div 
                        key={idx} 
                        className="desktop-icon" 
                        style={{ position: 'relative', backgroundColor: selectedDesktopPhoto === photo ? 'rgba(0, 85, 229, 0.3)' : 'transparent' }}
                        onClick={(e) => {
                            e.stopPropagation();
                            setSelectedDesktopPhoto(photo);
                        }}
                        onDoubleClick={() => onIconClick('restored', photo)}
                        draggable={true}
                        onDragStart={(e) => {
                            e.dataTransfer.setData('photo', JSON.stringify(photo));
                        }}
                    >
                        <div className="icon-img" style={{ backgroundImage: `url(${photo.src})`, backgroundSize: 'cover', borderRadius: '2px', border: '1px solid #fff' }}></div>
                        <span>{photo.caption || photo.name || 'photo.jpg'}</span>
                        {selectedDesktopPhoto === photo && (
                            <button 
                                style={{ position: 'absolute', bottom: '-25px', left: '50%', transform: 'translateX(-50%)', zIndex: 10, whiteSpace: 'nowrap' }}
                                onClick={(e) => { 
                                    e.stopPropagation(); 
                                    if (onSetWallpaper) onSetWallpaper(photo); 
                                }}
                            >
                                הגדר כמסך הבית
                            </button>
                        )}
                    </div>
                ))}
            </div>
            {children}
        </div>
    );
};

export default Desktop;
