// =============================================
// THEME TOGGLE FUNCTIONALITY
// =============================================

const themeToggle = document.getElementById('theme-toggle');
const htmlElement = document.documentElement;
const themeIcon = document.querySelector('.theme-icon');

// Check for saved theme preference or default to light mode
const currentTheme = localStorage.getItem('theme') || 'light';
if (currentTheme === 'dark') {
    document.body.classList.add('dark-mode');
    themeIcon.textContent = '☀️';
}

// Theme toggle event listener
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');

    // Update icon
    const isDarkMode = document.body.classList.contains('dark-mode');
    themeIcon.textContent = isDarkMode ? '☀️' : '🌙';

    // Save preference
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
});

// =============================================
// MOBILE MENU TOGGLE
// =============================================

const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close menu when link is clicked
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// =============================================
// SMOOTH SCROLLING & ACTIVE NAV HIGHLIGHT
// =============================================

const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// =============================================
// DYNAMIC PROJECT RENDERING
// =============================================

function renderProjects() {
    const projectsContainer = document.getElementById('projects-container');

    if (!projectsContainer || typeof projects === 'undefined') {
        console.error('Projects container or data not found');
        return;
    }

    projectsContainer.innerHTML = projects.map(project => `
        <div class="project-card">
            <div class="project-header">
                <div style="color: var(--primary-color); margin-bottom: 1rem; display: flex; align-items: center;">${project.image}</div>
                <h3 class="project-title">${project.name}</h3>
                <p class="project-description">${project.description}</p>
            </div>
            <div class="project-body">
                <div class="project-tech">
                    ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                </div>
                <div class="project-links">
                    <a href="${project.githubUrl}" target="_blank" rel="noopener noreferrer" class="project-link">
                        GitHub
                    </a>
                    ${project.liveUrl ? `<a href="${project.liveUrl}" target="_blank" rel="noopener noreferrer" class="project-link">
                        Live Demo
                    </a>` : ''}
                </div>
            </div>
        </div>
    `).join('');
}

// Render projects on page load
document.addEventListener('DOMContentLoaded', renderProjects);

// =============================================
// SCROLL REVEAL ANIMATIONS
// =============================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            // Optional: stop observing once revealed
            // observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.reveal').forEach(element => {
    observer.observe(element);
});

// =============================================
// SMOOTH PAGE LOAD
// =============================================

window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});

// =============================================
// SCROLL TO TOP BUTTON
// =============================================

const scrollToTopBtn = document.getElementById('scrollToTopBtn');

if (scrollToTopBtn) {
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.classList.add('show');
        } else {
            scrollToTopBtn.classList.remove('show');
        }
    });

    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}
