//illustration gallery (full grid on illustration.html)
const galleryEl = document.getElementById('illustration-gallery');

if (galleryEl) {
    galleryEl.innerHTML = illustrations
        .map((src, i) => `
            <div class="gallery-item" data-index="${i}">
                <img src="${src}" alt="Illustration">
            </div>
        `).join('');

    galleryEl.addEventListener('click', e => {
        const item = e.target.closest('.gallery-item');
        if (!item) return;

        currentIndex = parseInt(item.dataset.index);
        lightboxImg.src = illustrations[currentIndex];
        lightbox.classList.add('open');
    });
}