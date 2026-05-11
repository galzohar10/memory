import React, { useEffect } from 'react';

const LoadingScreen = ({ onLoadingComplete }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onLoadingComplete();
        }, 3000);

        return () => clearTimeout(timer);
    }, [onLoadingComplete]);

    return (
        <div className="loading-screen">
            <div className="loading-content">
                <img src="/loading.png" alt="Windows XP" className="xp-loading-image" />
                <div className="xp-loading-bar-container">
                    <div className="xp-loading-blocks-wrapper">
                        <div className="xp-loading-block"></div>
                        <div className="xp-loading-block"></div>
                        <div className="xp-loading-block"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoadingScreen;
