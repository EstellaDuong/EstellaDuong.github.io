
fetch('navbar.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('navbar-placeholder').innerHTML = data;

        const hamburger = document.getElementById('hamburger');
        const navPanel = document.getElementById('nav-panel');
        const navOverlay = document.getElementById('nav-overlay');
        const navbarTop = document.getElementById('navbar-top');

        function toggleMenu() {
            hamburger.classList.toggle('open');
            navPanel.classList.toggle('open');
            navOverlay.classList.toggle('open');
            navbarTop.classList.toggle('hidden');
        }

        hamburger?.addEventListener('click', toggleMenu);
        navOverlay?.addEventListener('click', toggleMenu);

        // Hide navbar on scroll down, reveal on scroll up
        let lastScrollY = window.scrollY;

        window.addEventListener('scroll', () => {
            const currentScrollY = window.scrollY;
            const menuIsOpen = navPanel.classList.contains('open');

            if (!menuIsOpen) {
                if (currentScrollY > lastScrollY && currentScrollY > 64) {
                    navbarTop.classList.add('scroll-hidden');
                    hamburger.classList.add('scroll-hidden');
                } else {
                    navbarTop.classList.remove('scroll-hidden');
                    hamburger.classList.remove('scroll-hidden');
                }
            }

            lastScrollY = currentScrollY;
        });
    });

    
//scrolls to content on home page 
document.getElementById('scroll-down-btn')?.addEventListener('click', () => {
    document.querySelector('.intro-container').scrollIntoView({ behavior: 'smooth' });
});


//lightbox and illustrations list
const illustrations = [
    'resources/illustrations/hakyona.jpg',
    'resources/illustrations/stern.jpeg',
    'resources/illustrations/Jinmao.jpg',
    'resources/illustrations/Frimmel.jpg',
    'resources/illustrations/falin.jpg',
    'resources/illustrations/dandadan.jpg',
];

let currentIndex = 0;
const track = document.getElementById('illustration-track');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');

function getVisibleImages() {
  return [0, 1, 2].map(offset =>
      illustrations[(currentIndex + offset) % illustrations.length]
  );
}

function navigate(direction) {
  currentIndex = (currentIndex + direction + illustrations.length) % illustrations.length;
  renderTrack();
}

function renderTrack() {
  track.innerHTML = getVisibleImages()
      .map((src, i) => `
          <div class="illustration-item" data-index="${i}">
              <img src="${src}" alt="Illustration">
          </div>
      `).join('');

  // clicking any of the 3 visible images opens the lightbox at that specific image
  track.querySelectorAll('.illustration-item').forEach(item => {
      item.addEventListener('click', () => {
          const clickedOffset = parseInt(item.dataset.index);
          currentIndex = (currentIndex + clickedOffset) % illustrations.length;
          lightboxImg.src = illustrations[currentIndex];
          lightbox.classList.add('open');
      });
  });
}

// replace your old track.addEventListener('click', ...) block with renderTrack() calls:
document.getElementById('illustration-prev').addEventListener('click', () => navigate(-1));
document.getElementById('illustration-next').addEventListener('click', () => navigate(1));
document.getElementById('lightbox-prev').addEventListener('click', () => navigate(-1));
document.getElementById('lightbox-next').addEventListener('click', () => navigate(1));

renderTrack(); // initial render on page load


//projects list
fetch('/resources/projects/projects.json')
  .then(response => response.json())
  .then(projects => {
    const container = document.querySelector('.projects-section');
    if (!container) return;

    projects.forEach(project => {
      container.innerHTML += `
        <a href="${project.link}" class="project-card">
          <div class="project-thumbnail-wrapper">
            <img src="${project.thumbnail}" alt="${project.title}" class="project-thumbnail">
          </div>
          <div class="project-info">
            <h2>${project.title}</h2>
            <p>${project.description}</p>
          </div>
        </a>
      `;
    });
  })
  .catch(err => console.error('Failed to load projects:', err));




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
        const track = document.getElementById('carousel-track');
        if (!track) return;
    
        track.innerHTML = '';
    
        for (let i = 0; i < getVisible(); i++) {
            const project = carouselProjects[(carouselIndex + i) % carouselProjects.length];
            track.innerHTML += `
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





    //project details
    function loadProjectDetails() {
        const page = document.getElementById('project-title');
        if (!page) return;
    
        const params = new URLSearchParams(window.location.search);
        const index = parseInt(params.get('project'));
    
        fetch('/resources/projects/projects.json')
            .then(response => response.json())
            .then(projects => {
                const project = projects[index];
                if (!project) return;
    
                document.title = `${project.title} | Estella's Portfolio`;
                document.getElementById('project-title').textContent = project.title;
                document.getElementById('project-description').textContent = project.description;

                const linksContainer = document.getElementById('project-links');
                if (project.externalLinks && project.externalLinks.length > 0) {
                    project.externalLinks.forEach(link => {
                        linksContainer.innerHTML += `
                            <a href="${link.url}" target="_blank" class="project-external-link">${link.label}</a>
                        `;
                    });
                } else {
                    linksContainer.style.display = 'none';
                }
    
                const photo = document.getElementById('project-photo');
                photo.src = project.photo;
                photo.alt = project.title;
    
                const videoSource = document.getElementById('project-video-source');
                videoSource.src = project.video;
                document.getElementById('project-video').load();
            })
            .catch(err => console.error('Failed to load project details:', err));
    }

    document.addEventListener('DOMContentLoaded', () => {
        loadProjectDetails();
    });
    
