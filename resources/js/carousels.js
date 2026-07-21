//lightbox and illustrations list
const illustrations = [
    'resources/illustrations/hakyona.jpg',
    'resources/illustrations/stern.jpeg',
    'resources/illustrations/Jinmao.jpg',
    'resources/illustrations/Frimmel.jpg',
    'resources/illustrations/falin.jpg',
    'resources/illustrations/dandadan.jpg',
    'resources/illustrations/blossom.jpg',
    'resources/illustrations/esper.png',
    'resources/illustrations/weakhero.jpg',
    'resources/illustrations/yuji_.jpg',
    'resources/illustrations/strawby.jpeg',
    'resources/illustrations/frieren.jpeg',
];

let currentIndex = 0;
const track = document.getElementById('illustration-track');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');

document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && lightbox?.classList.contains('open')) {
        lightbox.classList.remove('open');
    }
});

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

    if (lightbox && lightbox.classList.contains('open')) {
        lightboxImg.src = illustrations[currentIndex];
    }
}

// Mini-carousel track click (only exists on pages with #illustration-track, e.g. home page)
if (track) {
    track.addEventListener('click', e => {
        const item = e.target.closest('.illustration-item');
        if (!item) return;

        const clickedOffset = parseInt(item.dataset.index);
        currentIndex = (currentIndex + clickedOffset) % illustrations.length;
        lightboxImg.src = illustrations[currentIndex];
        lightbox.classList.add('open');
    });
}

// Mini-carousel arrows (only exist alongside #illustration-track)
document.getElementById('illustration-prev')?.addEventListener('click', () => navigate(-1));
document.getElementById('illustration-next')?.addEventListener('click', () => navigate(1));

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

function getVisible() {
    return window.innerWidth <= 600 ? 1 : 3;
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