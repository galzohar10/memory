import React, { useState, useEffect } from 'react';

const PhotosFolderStep = ({ capturedImage, onDeleteSuccess, onDelete, onPreview, onDropBack, onSetWallpaper, deletedPhotos = [], restoredToDesktop = [], isDeleteTask }) => {
    const [photos, setPhotos] = useState([]);
    const [selected, setSelected] = useState(null);

    useEffect(() => {
        const initialPhotos = [];
        const captions = {
            'gal1.png': 'אני:)',
            'gal2.png': 'צחוקיםXD',
            'gal3.png': 'בריכהההה',
            'gal4.png': 'עם החברה:))',
            'gal5.png': 'יום העצמאות'
        };
        const uploadedImages = ['gal1.png', 'gal2.png', 'gal3.png', 'gal4.png', 'gal5.png'];
        uploadedImages.forEach(filename => {
            initialPhotos.push({ 
                src: `/${filename}`, 
                isTarget: false, 
                name: filename,
                caption: captions[filename]
            });
        });

        // Add the captured image (progression target)
        if (capturedImage) {
            initialPhotos.push({ src: capturedImage, isTarget: true, name: 'captured_photo.jpg', caption: 'captured_photo.jpg' });
        }
        
        // Filter out deleted photos and photos restored to desktop
        const visiblePhotos = initialPhotos.filter(p => 
            !deletedPhotos.find(dp => dp.src === p.src) && 
            !restoredToDesktop.find(rp => rp.src === p.src)
        );
        
        setPhotos(visiblePhotos);
    }, [capturedImage, deletedPhotos, restoredToDesktop]);

    const handleDelete = () => {
        if (selected) {
            onDelete(selected);
            setPhotos(prev => prev.filter(p => p !== selected));
            if (selected.isTarget) {
                onDeleteSuccess();
            }
            setSelected(null);
        }
    };

    return (
        <div 
            style={{ position: 'relative', minHeight: '200px' }}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
                const photoData = e.dataTransfer.getData('photo');
                if (photoData) {
                    onDropBack(JSON.parse(photoData));
                }
            }}
        >
            <div className="photo-grid">
                {photos.map((p, i) => (
                    <div key={i} className="photo-item">
                        <img 
                            src={p.src} 
                            style={{ border: selected === p ? '2px solid blue' : '2px solid transparent' }}
                            onClick={() => {
                                setSelected(p);
                            }}
                            onDoubleClick={() => {
                                if (!isDeleteTask) {
                                    onPreview(p.src, p.caption || p.name);
                                }
                            }}
                        />
                        <span className="photo-caption">{p.caption}</span>
                    </div>
                ))}
            </div>
            <div style={{ marginTop: '15px', textAlign: 'center' }}>
                {selected && <button onClick={handleDelete}>מחק תמונה</button>}
            </div>
        </div>
    );
};

export default PhotosFolderStep;
