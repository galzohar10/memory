export const TASKBAR_HEIGHT = 40;
export const WINDOW_MARGIN = 20;

export const getSafeRandomPos = (width, height) => {
    const maxX = Math.max(WINDOW_MARGIN, window.innerWidth - width - WINDOW_MARGIN);
    const maxY = Math.max(WINDOW_MARGIN, window.innerHeight - height - WINDOW_MARGIN - TASKBAR_HEIGHT);

    return {
        x: WINDOW_MARGIN + Math.random() * (maxX - WINDOW_MARGIN),
        y: WINDOW_MARGIN + Math.random() * (maxY - WINDOW_MARGIN)
    };
};

export const clampToViewport = (x, y, width, height) => {
    const maxX = Math.max(WINDOW_MARGIN, window.innerWidth - width - WINDOW_MARGIN);
    const maxY = Math.max(WINDOW_MARGIN, window.innerHeight - height - WINDOW_MARGIN - TASKBAR_HEIGHT);

    return {
        x: Math.min(Math.max(WINDOW_MARGIN, x), maxX),
        y: Math.min(Math.max(WINDOW_MARGIN, y), maxY)
    };
};
