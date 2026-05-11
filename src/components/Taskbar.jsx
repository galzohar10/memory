import React from 'react';

const Taskbar = ({ windows, onWindowClick, onCloseWindow }) => {
    return (
        <div className="xp-taskbar">
            <div className="taskbar-middle">
                {windows.map(win => (
                    <div 
                        key={win.id} 
                        className={`taskbar-item ${win.zIndex === Math.max(...windows.map(w => w.zIndex), 0) ? 'active' : ''}`}
                        onClick={() => onWindowClick(win.id)}
                    >
                        <span>{win.title}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Taskbar;
