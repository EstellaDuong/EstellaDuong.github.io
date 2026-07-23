document.querySelectorAll('.project-content-container img').forEach(img => {
    img.style.cursor = 'pointer';
    img.addEventListener('click', () => {
        const activeImg = showingA ? lightboxImgA : lightboxImgB;
        if (activeImg) activeImg.src = img.src;

        lightbox?.classList.add('open');
    });
});