if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}

window.scrollTo(0, 0);

fetch('/navbar.html')
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




//projects list on projects page
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
            <span class="view-all-button project-view-button">View Project &rarr;</span>
          </div>
        </a>
      `;
    });
  })
  .catch(err => console.error('Failed to load projects:', err));



//project details page creation
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

