import React, { useState, useEffect } from 'react';
import Desktop from './components/Desktop.jsx';
import DraggableWindow from './components/DraggableWindow.jsx';
import LoginStep from './components/steps/LoginStep.jsx';
import CaptchaNumbersStep from './components/steps/CaptchaNumbersStep.jsx';
import CaptchaImagesStep from './components/steps/CaptchaImagesStep.jsx';
import LyricStep from './components/steps/LyricStep.jsx';
import FakeDownloadStep from './components/steps/FakeDownloadStep.jsx';
import CameraStep from './components/steps/CameraStep.jsx';
import PaintStep from './components/steps/PaintStep.jsx';
import PhotosFolderStep from './components/steps/PhotosFolderStep.jsx';
import MovingButtonStep from './components/steps/MovingButtonStep.jsx';
import ProgressBarStep from './components/steps/ProgressBarStep.jsx';
import ChaosStep from './components/steps/ChaosStep.jsx';
import FinalStep from './components/steps/FinalStep.jsx';
import EncyclopediaStep from './components/steps/EncyclopediaStep.jsx';
import IcqPopup from './components/IcqPopup.jsx';

import { getSafeRandomPos } from './utils/windowUtils';
import LoadingScreen from './components/LoadingScreen.jsx';
import Taskbar from './components/Taskbar.jsx';

const App = () => {
    const [step, setStep] = useState('LOGIN');
    const [openWindows, setOpenWindows] = useState([]);
    
    // Initial login window - Centered
    useEffect(() => {
        const winWidth = 400;
        const winHeight = 300;
        const x = (window.innerWidth - winWidth) / 2;
        const y = (window.innerHeight - winHeight) / 2;
        
        setOpenWindows([
            { id: 'login', title: 'Windows Login', type: 'LOGIN', x, y, width: `${winWidth}px`, classes: ['login-window'], zIndex: 100 }
        ]);
    }, []);

    const [googleSearch, setGoogleSearch] = useState('');
    const [capturedImage, setCapturedImage] = useState(null);
    const [deletedPhotos, setDeletedPhotos] = useState([]);
    const [restoredToDesktop, setRestoredToDesktop] = useState([]);
    const [selectedRecyclePhoto, setSelectedRecyclePhoto] = useState(null);
    const [isPhotoRestored, setIsPhotoRestored] = useState(false);
    const [desktopBackground, setDesktopBackground] = useState(null);
    const [zIndexCounter, setZIndexCounter] = useState(100);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 3000);
        return () => clearTimeout(timer);
    }, []);

    const bringToFront = (id) => {
        setZIndexCounter(prev => {
            const nextZ = prev + 1;
            setOpenWindows(prevWindows => prevWindows.map(w => 
                w.id === id ? { ...w, zIndex: nextZ } : w
            ));
            return nextZ;
        });
    };

    const closeWindow = (id) => {
        setOpenWindows(prev => prev.filter(w => w.id !== id));
    };

    const addWindow = (win) => {
        const id = Math.random().toString(36).substr(2, 9);
        const nextZ = zIndexCounter + 1;
        setZIndexCounter(nextZ);

        const winWidth = parseInt(win.width) || 300;
        const winHeight = parseInt(win.height) || 200;
        const { x, y } = getSafeRandomPos(winWidth, winHeight);

        setOpenWindows(prev => [...prev, { 
            ...win, 
            id, 
            zIndex: nextZ,
            x: win.x !== undefined ? win.x : x,
            y: win.y !== undefined ? win.y : y
        }]);
    };

    const nextStep = (nextStepName, newWin) => {
        setStep(nextStepName);
        if (newWin) {
            addWindow(newWin);
        }
    };

    const handleIconClick = (icon, data) => {
        if (icon === 'photos' && step === 'INSTRUCTION') {
            closeWindow('instruction-alert');
            nextStep('PHOTOS', { title: 'תמונות 2010', type: 'PHOTOS', width: '320px' });
        } else if (icon === 'photos') {
            addWindow({ title: 'תמונות 2010', type: 'PHOTOS', width: '320px' });
        } else if (icon === 'recycle') {
            addWindow({ title: 'סל המיחזור', type: 'RECYCLE', width: '320px' });
        } else if (icon === 'restored') {
            addWindow({ title: data.caption || data.name || 'preview', type: 'PREVIEW', content: data.src });
            return;
        } else if (icon === 'icq') {
            new Audio('/Icq old sound.mp3').play().catch(() => {});
            addWindow({ title: 'ICQ', type: 'ICQ_FULL', width: '600px' });
        } else if (icon === 'ie') {
            addWindow({ 
                title: 'Google - Microsoft Internet Explorer', 
                type: 'GOOGLE', 
                width: 'min(calc(100vw - 40px), calc((100vh - 120px) * 1609 / 977))', 
                height: 'auto', 
                x: 20, 
                y: 20,
                classes: ['google-window']
            });
        }
    };

    if (isLoading) {
        return <LoadingScreen onLoadingComplete={() => setIsLoading(false)} />;
    }

    return (
        <Desktop 
            onIconClick={handleIconClick} 
            restoredToDesktop={restoredToDesktop} 
            background={desktopBackground}
            onSetWallpaper={(photo) => {
                setDesktopBackground(photo.src);
                if (photo.isTarget && step === 'RESTORE_TASK') {
                    const infoWin = openWindows.find(w => w.type === 'INFO' && typeof w.content === 'string' && w.content.includes('כמסך הבית'));
                    if (infoWin) closeWindow(infoWin.id);
                    nextStep('PROGRESS', { title: 'טוען נתונים', type: 'PROGRESS' });
                }
            }}
        >
            {openWindows.map(win => (
                <DraggableWindow 
                    key={win.id} 
                    title={win.title} 
                    x={win.x} 
                    y={win.y} 
                    width={win.width}
                    height={win.height}
                    zIndex={win.zIndex}
                    classes={win.classes}
                    onClose={() => closeWindow(win.id)}
                    onFocus={() => bringToFront(win.id)}
                >
                    {win.type === 'LOGIN' && (
                        <LoginStep 
                            onLogin={() => addWindow({ title: 'Error', type: 'ERROR', content: 'הסיסמה שגויה:\nלא בוצעה כניסה למערכת כבר: 5957 ימים' })} 
                            onForgotPassword={() => nextStep('CAPTCHA_NUMBERS', { title: 'אימות משתמש', type: 'CAPTCHA_NUMBERS' })}
                        />
                    )}
                    {win.type === 'ERROR' && (
                        <div style={{ textAlign: 'right' }}>
                            <p dangerouslySetInnerHTML={{ __html: win.content.replace(/\n/g, '<br/>') }} />
                            <button style={{ marginTop: '10px' }} onClick={() => closeWindow(win.id)}>נסה שוב</button>
                        </div>
                    )}
                    {win.type === 'CAPTCHA_NUMBERS' && (
                        <CaptchaNumbersStep onNext={() => nextStep('CAPTCHA_WORDS', { title: 'בדיקת אבטחה', type: 'CAPTCHA_WORDS' })} />
                    )}
                    {win.type === 'CAPTCHA_WORDS' && (
                        <CaptchaImagesStep onNext={() => nextStep('ENCYCLOPEDIA', { title: 'אימות אנציקלופדיה', type: 'ENCYCLOPEDIA' })} />
                    )}
                    {win.type === 'ENCYCLOPEDIA' && (
                        <EncyclopediaStep onNext={() => nextStep('LYRIC', { title: 'בדיקת זיכרון מוזיקלי', type: 'LYRIC' })} />
                    )}
                    {win.type === 'LYRIC' && (
                        <LyricStep 
                            onNext={() => nextStep('DOWNLOAD', { title: 'קובץ אימות', type: 'DOWNLOAD' })} 
                            onAlert={(msg) => addWindow({ title: 'שגיאה', type: 'ALERT', content: msg })}
                        />
                    )}
                    {win.type === 'DOWNLOAD' && (
                        <FakeDownloadStep 
                            onRealClick={() => nextStep('CAMERA', { title: 'אימות זהות מתקדם', type: 'CAMERA' })} 
                            onFakeClick={(msg) => addWindow({ title: 'אזהרה', type: 'ALERT', content: msg })}
                        />
                    )}
                    {win.type === 'ALERT' && (
                        <div>
                            <p>{win.content}</p>
                            <button onClick={() => closeWindow(win.id)}>אישור</button>
                        </div>
                    )}
                    {win.type === 'CAMERA' && (
                        <CameraStep 
                            onCapture={(img) => {
                                setCapturedImage(img);
                                addWindow({ title: 'מערכת', type: 'INFO', content: 'לשון זוהתה' });
                                setTimeout(() => {
                                    closeWindow(win.id);
                                    nextStep('PAINT', { title: 'untitled - Paint', type: 'PAINT', width: '360px' });
                                }, 1500);
                            }} 
                        />
                    )}
                    {win.type === 'INFO' && (
                        <div style={{ margin: '10px 20px', textAlign: 'center' }}>
                            <p>{win.content}</p>
                        </div>
                    )}
                    {win.type === 'PAINT' && (
                        <PaintStep onNext={() => {
                            closeWindow(win.id);
                            addWindow({ id: 'instruction-alert', title: 'מערכת', type: 'INFO', content: 'אין מספיק מקום.\nגש לתיקיית התמונות ומחק את התמונה האחרונה.' });
                            setStep('INSTRUCTION');
                        }} />
                    )}
                    {win.type === 'PHOTOS' && (
                        <PhotosFolderStep 
                            capturedImage={capturedImage} 
                            deletedPhotos={deletedPhotos}
                            restoredToDesktop={restoredToDesktop}
                            isDeleteTask={step === 'INSTRUCTION'}
                            onDeleteSuccess={() => {
                                closeWindow(win.id);
                                nextStep('MOVING_BUTTON', { title: 'בדיקת זיכרון', type: 'MOVING_BUTTON', width: '350px' });
                            }} 
                            onDelete={(photo) => {
                                setDeletedPhotos(prev => [...prev, photo]);
                                if (photo.isTarget) setIsPhotoRestored(false);
                            }}
                            onPreview={(src, name) => {
                                addWindow({ title: name, type: 'PREVIEW', content: src, width: '400px' });
                            }}
                            onDropBack={(photo) => {
                                setRestoredToDesktop(prev => prev.filter(p => p.src !== photo.src));
                            }}
                            onAlert={(msg) => addWindow({ title: 'שגיאה', type: 'ALERT', content: msg })}
                            onSetWallpaper={(photo) => {
                                setDesktopBackground(photo.src);
                                if (photo.isTarget && step === 'RESTORE_TASK') {
                                    nextStep('FINAL', { title: 'סיום', type: 'FINAL', width: '400px' });
                                }
                            }}
                        />
                    )}
                    {win.type === 'MOVING_BUTTON' && (
                        <MovingButtonStep onNext={() => {
                            closeWindow(win.id);
                            addWindow({ id: 'restore-alert', title: 'מערכת', type: 'INFO', content: 'גש לסל המחזור ושחזר את התמונה שמחקת.' });
                            setStep('RESTORE_TASK');
                        }} />
                    )}
                    {win.type === 'PROGRESS' && (
                        <ProgressBarStep onComplete={() => {
                            closeWindow(win.id);
                            addWindow({ title: 'ICQ', type: 'ICQ', width: '250px' });
                        }} />
                    )}
                    {win.type === 'CHAOS' && (
                        <ChaosStep onComplete={() => nextStep('FINAL', { title: 'Password Recovery Complete', type: 'FINAL' })} />
                    )}
                    {win.type === 'FINAL' && (
                        <FinalStep />
                    )}
                    {win.type === 'RECYCLE' && (
                        <div style={{ display: 'flex', flexDirection: 'column', height: '100%', minHeight: '150px' }}>
                            <div style={{ flex: 1, overflowY: 'auto', padding: '10px' }}>
                                {deletedPhotos.length > 0 ? (
                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '15px' }}>
                                        {deletedPhotos.map((photo, idx) => (
                                            <div 
                                                key={idx} 
                                                style={{ 
                                                    display: 'flex', 
                                                    flexDirection: 'column', 
                                                    alignItems: 'center', 
                                                    gap: '5px',
                                                    padding: '5px',
                                                    border: selectedRecyclePhoto === photo ? '1px solid #0055e5' : '1px solid transparent',
                                                    backgroundColor: selectedRecyclePhoto === photo ? 'rgba(0, 85, 229, 0.1)' : 'transparent',
                                                    cursor: 'pointer'
                                                }}
                                                onClick={() => setSelectedRecyclePhoto(photo)}
                                            >
                                                <div className="icon-img icon-photos" style={{ 
                                                    width: '80px', 
                                                    height: '80px', 
                                                    backgroundImage: `url(${photo.src})`, 
                                                    backgroundSize: 'cover',
                                                    border: '1px solid #fff' 
                                                }}></div>
                                                <p style={{ fontSize: '10px', margin: 0 }}>{photo.caption || photo.name || 'photo.jpg'}</p>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p style={{ textAlign: 'center' }}>סל המיחזור ריק.</p>
                                )}
                            </div>
                            {selectedRecyclePhoto && (
                                <div style={{ padding: '10px', borderTop: '1px solid #ccc', textAlign: 'center', backgroundColor: 'transparent' }}>
                                    <button 
                                        onClick={() => {
                                            const photo = selectedRecyclePhoto;
                                            setDeletedPhotos(prev => prev.filter(p => p.src !== photo.src));
                                            setRestoredToDesktop(prev => [...prev, photo]);
                                            
                                            if (photo.isTarget) {
                                                setIsPhotoRestored(true);
                                                closeWindow('restore-alert');
                                                addWindow({ title: 'מערכת', type: 'INFO', content: 'הגדר את התמונה כמסך הבית.' });
                                            }
                                            setSelectedRecyclePhoto(null);
                                        }}
                                    >שחזור</button>
                                </div>
                            )}
                        </div>
                    )}
                    {win.type === 'SET_BG' && (
                        <div style={{ textAlign: 'center' }}>
                            <img src={capturedImage} style={{ width: '100px', height: '100px', objectFit: 'cover', border: '1px solid #888' }} />
                            <br />
                            <button style={{ marginTop: '10px' }} onClick={() => {
                                setIsBackgroundSet(true);
                                closeWindow(win.id);
                                closeWindow(openWindows.find(w => w.type === 'INFO' && w.content.includes('כמסך הבית'))?.id);
                                nextStep('PROGRESS', { title: 'טוען נתונים', type: 'PROGRESS' });
                            }}>הגדר כמסך הבית</button>
                        </div>
                    )}
                    {win.type === 'ICQ' && (
                        <IcqPopup />
                    )}
                    {win.type === 'ICQ_FULL' && (
                        <div style={{ textAlign: 'center', overflow: 'hidden' }}>
                            <img 
                                src="/icq-old.png" 
                                style={{ 
                                    maxWidth: '100%', 
                                    display: 'block',
                                    clipPath: 'inset(0 0 18px 0)' // Crop 18px from the bottom
                                }} 
                                alt="ICQ" 
                            />
                        </div>
                    )}
                    {win.type === 'GOOGLE' && (
                        <div className="google-content-wrapper">
                            <div className="google-image-container">
                                <img src="/google.png" alt="Google" />
                                <input 
                                    type="text" 
                                    className="google-search-input"
                                    value={googleSearch}
                                    onChange={(e) => setGoogleSearch(e.target.value)}
                                    autoFocus
                                />
                            </div>
                        </div>
                    )}
                    {win.type === 'PREVIEW' && (
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', background: '#000', width: '100%', height: '100%' }}>
                            <img src={win.content} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} alt="Preview" />
                        </div>
                    )}
                </DraggableWindow>
            ))}
            <Taskbar windows={openWindows} onWindowClick={bringToFront} onCloseWindow={closeWindow} />
        </Desktop>
    );
};

export default App;
