fetch('navbar.html')
          .then(response => response.text())
          .then(data => {
            document.getElementById('navbar-placeholder').innerHTML = data;

        //navbar hamburger
        const hamburger = document.getElementById('hamburger');
        const navLinks = document.getElementById('nav-links');

        hamburger?.addEventListener('click', () => {
            hamburger.classList.toggle('open');
            navLinks.classList.toggle('open');
        });
});

fetch('footer.html')
          .then(response => response.text())
          .then(data => {
            document.getElementById('footer-placeholder').innerHTML = data;
});




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
    
