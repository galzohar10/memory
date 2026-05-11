import React, { useState, useEffect } from 'react';

const PhotosFolderStep = ({ capturedImage, onDeleteSuccess, onAlert }) => {
    const [photos, setPhotos] = useState([]);
    const [selected, setSelected] = useState(null);

    useEffect(() => {
        const fakePhotos = [];
        for (let i = 0; i < 8; i++) {
            const canvas = document.createElement('canvas');
            canvas.width = 80;
            canvas.height = 80;
            const ctx = canvas.getContext('2d');
            ctx.fillStyle = `hsl(${Math.random() * 360}, 70%, 80%)`;
            ctx.fillRect(0, 0, 80, 80);
            ctx.fillStyle = '#000';
            ctx.font = '10px Arial';
            ctx.fillText(`IMG_2010_${Math.floor(Math.random() * 1000)}`, 5, 45);
            fakePhotos.push({ src: canvas.toDataURL(), isTarget: false });
        }
        
        fakePhotos.push({ src: capturedImage || '', isTarget: true, id: 'target' });
        setPhotos(fakePhotos);
    }, [capturedImage]);

    const handleDelete = () => {
        if (selected && selected.isTarget) {
            onDeleteSuccess();
        } else {
            onAlert('זו לא התמונה הנכונה.');
        }
    };

    return (
        <div>
            <div className="photo-grid">
                {photos.map((p, i) => (
                    <img 
                        key={i} 
                        src={p.src} 
                        style={{ border: selected === p ? '2px solid blue' : '2px solid transparent' }}
                        onClick={() => setSelected(p)}
                    />
                ))}
            </div>
            <div style={{ marginTop: '15px', textAlign: 'center' }}>
                {selected && <button onClick={handleDelete}>מחק תמונה</button>}
            </div>
        </div>
    );
};

export default PhotosFolderStep;
