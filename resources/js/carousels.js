//lightbox and illustrations list
const illustrations = [
    '/resources/illustrations/stern.jpeg',
    '/resources/illustrations/Jinmao.jpg',
    '/resources/illustrations/dandadan.jpg',
    '/resources/illustrations/hakyona.jpg',
    '/resources/illustrations/falin.jpg',
    '/resources/illustrations/Frimmel.jpg',
    '/resources/illustrations/blossom.jpg',
    '/resources/illustrations/esper.png',
    '/resources/illustrations/weakhero.jpg',
    '/resources/illustrations/yuji_.jpg',
    '/resources/illustrations/frieren.jpeg',
    '/resources/illustrations/goth.jpeg',
    '/resources/illustrations/yellowDragon.jpg',
    '/resources/illustrations/tadakomi.jpg',
    '/resources/illustrations/theboy.jpg',
    '/resources/illustrations/strawby.jpeg',
    '/resources/illustrations/catburger.jpg',
    '/resources/illustrations/white.jpg',
    '/resources/illustrations/moonlight.jpg',
    '/resources/illustrations/rock.jpg',
    '/resources/illustrations/crimsonQueen.jpg',
    '/resources/illustrations/nottestellata.jpg',
    '/resources/illustrations/solo.jpg',
    '/resources/illustrations/Kghn.jpg'
];

illustrations.forEach(src => {
    const img = new Image();
    img.src = src;
});

let currentIndex = 0;
const track = document.getElementById('illustration-track');
const lightbox = document.getElementById('lightbox');
const lightboxImgA = document.getElementById('lightbox-img-a');
const lightboxImgB = document.getElementById('lightbox-img-b');
let showingA = true;

// Crossfades to a new image inside the lightbox. Both <img> elements sit
// stacked on top of each other via CSS; this swaps which one is "active"
// (opacity: 1) so the old and new images fade simultaneously, with no gap.
function setLightboxImage(src) {
    if (!lightboxImgA || !lightboxImgB) return;

    const current = showingA ? lightboxImgA : lightboxImgB;
    const next = showingA ? lightboxImgB : lightboxImgA;

    const preloader = new Image();
    preloader.onload = () => {
        next.src = src;
        next.classList.add('active');
        current.classList.remove('active');
        showingA = !showingA;
    };
    preloader.src = src;
}

function openLightbox(index) {
    currentIndex = index;
    setLightboxImage(illustrations[currentIndex]);
    lightbox?.classList.add('open');
}

function getVisibleCount() {
    return window.innerWidth <= 600 ? 1 : 3;
}

function renderTrack() {
    if (!track) return;

    track.innerHTML = '';
    for (let i = 0; i < getVisibleCount(); i++) {
        const src = illustrations[(currentIndex + i) % illustrations.length];
        track.innerHTML += `
            <div class="illustration-item" data-index="${i}">
                <img src="${src}" alt="Illustration">
            </div>
        `;
    }
}

function navigate(direction) {
    currentIndex = (currentIndex + direction + illustrations.length) % illustrations.length;
    renderTrack();

    if (lightbox?.classList.contains('open')) {
        setLightboxImage(illustrations[currentIndex]);
    }
}

document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && lightbox?.classList.contains('open')) {
        lightbox.classList.remove('open');
    }
});

// Mini-carousel track click (only exists on pages with #illustration-track, e.g. home page)
if (track) {
    track.addEventListener('click', e => {
        const item = e.target.closest('.illustration-item');
        if (!item) return;

        const clickedOffset = parseInt(item.dataset.index);
        openLightbox((currentIndex + clickedOffset) % illustrations.length);
    });
}

// Mini-carousel arrows (only exist alongside #illustration-track)
document.getElementById('illustration-prev')?.addEventListener('click', () => navigate(-1));
document.getElementById('illustration-next')?.addEventListener('click', () => navigate(1));

// Full gallery grid click (only exists on illustration.html)
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
        openLightbox(parseInt(item.dataset.index));
    });
}

// Lightbox controls — these exist on ANY page with a lightbox (home + illustration gallery),
// so they're wired up independently of whether the mini-carousel track exists.
document.getElementById('lightbox-prev')?.addEventListener('click', () => navigate(-1));
document.getElementById('lightbox-next')?.addEventListener('click', () => navigate(1));

if (lightbox) {
    lightbox.addEventListener('click', e => {
        if (e.target === lightbox) lightbox.classList.remove('open');
    });
}

document.getElementById('lightbox-close')?.addEventListener('click', () => {
    lightbox?.classList.remove('open');
});

renderTrack(); // initial render on page load (no-ops if #illustration-track doesn't exist)


//project carousel
let carouselIndex = 0;
let carouselProjects = [];

// DETERMINES THE NUMBER OF PROJECTS VISIBLE AT A TIME
function getVisible() {
    // return window.innerWidth <= 600 ? 1 : 3;
    return window.innerWidth <= 600 ? 1 : 2;
    // return 1; //shows 1 project at a time
}

fetch('/resources/projects/projects.json')
    .then(response => response.json())
    .then(projects => {
        carouselProjects = projects;
        renderCarousel();
    })
    .catch(err => console.error('Failed to load projects for carousel:', err));

function renderCarousel() {
    const carouselTrack = document.getElementById('carousel-track');
    if (!carouselTrack) return;

    carouselTrack.innerHTML = '';

    for (let i = 0; i < getVisible(); i++) {
        const project = carouselProjects[(carouselIndex + i) % carouselProjects.length];
        carouselTrack.innerHTML += `
            <a href="${project.link}" class="carousel-card">
                <div class="carousel-card-thumbnail-wrapper">
                    <img src="${project.thumbnail}" alt="${project.title}">
                </div>
                <div class="carousel-card-title">${project.title}</div>
                <p class="carousel-card-description">${project.description}</p>
            </a>
        `;
    }
}

document.getElementById('carousel-prev')?.addEventListener('click', () => {
    carouselIndex = (carouselIndex - 1 + carouselProjects.length) % carouselProjects.length;
    renderCarousel();
});

document.getElementById('carousel-next')?.addEventListener('click', () => {
    carouselIndex = (carouselIndex + 1) % carouselProjects.length;
    renderCarousel();
});