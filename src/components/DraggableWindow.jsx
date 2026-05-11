import React, { useState, useRef, useEffect } from 'react';
import { clampToViewport } from '../utils/windowUtils';

const DraggableWindow = ({ title, children, x, y, width, height, zIndex, onClose, onFocus, classes = [] }) => {
    // We use a ref to get the actual width/height after first render
    const windowRef = useRef(null);
    const [pos, setPos] = useState({ x: x || 100, y: y || 100 });
    const [isDragging, setIsDragging] = useState(false);
    const [isMaximized, setIsMaximized] = useState(false);
    const [rel, setRel] = useState({ x: 0, y: 0 });

    const performClamp = (newX, newY) => {
        if (!windowRef.current) return { x: newX, y: newY };
        const rect = windowRef.current.getBoundingClientRect();
        return clampToViewport(newX, newY, rect.width, rect.height);
    };

    const onMouseDown = (e) => {
        if (isMaximized) return;
        if (e.button !== 0) return;
        if (e.target.tagName === 'BUTTON') return;
        
        setIsDragging(true);
        const rect = windowRef.current.getBoundingClientRect();
        setRel({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        });
        onFocus?.();
        e.stopPropagation();
    };

    const toggleMaximize = (e) => {
        e.stopPropagation();
        setIsMaximized(!isMaximized);
        onFocus?.();
    };

    useEffect(() => {
        const onMouseMove = (e) => {
            if (!isDragging) return;
            const newPos = performClamp(e.clientX - rel.x, e.clientY - rel.y);
            setPos(newPos);
        };

        const onMouseUp = () => {
            setIsDragging(false);
        };

        const handleResize = () => {
            if (!isMaximized) {
                setPos(prev => performClamp(prev.x, prev.y));
            }
        };

        if (isDragging) {
            document.addEventListener('mousemove', onMouseMove);
            document.addEventListener('mouseup', onMouseUp);
        }
        window.addEventListener('resize', handleResize);

        return () => {
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
            window.addEventListener('resize', handleResize);
        };
    }, [isDragging, rel, isMaximized]);

    // Ensure window is in bounds on mount and when props change
    useEffect(() => {
        if (windowRef.current && !isMaximized) {
            setPos(performClamp(x !== undefined ? x : pos.x, y !== undefined ? y : pos.y));
        }
    }, [x, y]);

    return (
        <div
            ref={windowRef}
            className={`xp-window ${isMaximized ? 'maximized' : ''} ${classes.join(' ')}`}
            style={{
                left: isMaximized ? 0 : `${pos.x}px`,
                top: isMaximized ? 0 : `${pos.y}px`,
                width: isMaximized ? '100%' : (width || 'auto'),
                height: isMaximized ? 'calc(100vh - 40px)' : (height || 'auto'),
                zIndex: isMaximized ? 9999 : zIndex,
                position: 'absolute',
            }}
            onMouseDown={() => onFocus?.()}
        >
            <div className="xp-titlebar" onMouseDown={onMouseDown}>
                <span className="xp-title">{title}</span>
                <div className="xp-window-controls" style={{ display: 'flex', gap: '2px', direction: 'ltr' }}>
                    <button className="xp-min-btn" tabIndex="-1">_</button>
                    <button className="xp-max-btn" tabIndex="-1" onClick={toggleMaximize}>□</button>
                    <button 
                        className="xp-close-btn" 
                        tabIndex="-1" 
                        onClick={(e) => {
                            e.stopPropagation();
                            onClose?.();
                        }}
                    >X</button>
                </div>
            </div>
            <div className="xp-content">
                {children}
            </div>
        </div>
    );
};

export default DraggableWindow;

