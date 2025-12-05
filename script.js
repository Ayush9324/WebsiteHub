// Array of websites with Font Awesome icons - CUSTOMIZE THIS WITH YOUR WEBSITES
const websites = [
    {
        name: "Portfolio",
        description: "My professional portfolio showcasing my work and projects",
        url: "https://ayush9324.github.io/My-web/",
        icon: "fas fa-briefcase"
    },
    {
        name: "Shareall",
        description: "A website to share text easily and wihout privacy",
        url: "https://ayush9324.github.io/shareall/",
        icon: "fas fa-share-nodes"
    },
    {
        name: "Drift in Wheat",
        description: "My first Browser Game made made with three.js and backend with Node.js",
        url: "https://driftinwheat-1.onrender.com/",
        icon: "fas fa-gamepad"
    },
    {
        name: "Chat JhatPat",
        description: "My AI Chatbot like ChatGPT. It was my first time working with AI models and calling (API) them from backend.",
        url: "https://chat-jhat-pat.onrender.com/",
        icon: "fas fa-comments"
    },
    {
        name: "Weeness AI",
        description: "My Personal AI Chatbot like Gemini.That speaks reacts and interacts with the user with a 3D avatarIt was my first time working with AI models and calling (API) them from backend.",
        url: "https://wenes.onrender.com/",
        icon: "fas fa-robot"
    },
    {
        name: "Billing System",
        description: "My Aunts Personal Billing system for his small business to manage his products and sales.",
        url: "https://ayush9324.github.io/CreativePoint/",
        icon: "fas fa-receipt"
    },
    {
        name: "Independece Game",
        description: "My first 2D Platformer Game made with HTML5 Canvas and JavaScript to celebrate India's Independence Day.",
        url: "https://ayush9324.github.io/independencedaygame/",
        icon: "fas fa-flag"
    },
    {
        name: "GitHub",
        description: "My open source projects and code repositories",
        url: "https://github.com/Ayush9324?tab=repositories",
        icon: "fab fa-github"
    },
    {
        name: "LinkedIn",
        description: "Professional networking and career information",
        url: "https://www.linkedin.com/in/ayush-vishwakarma2007/?locale=en_US",
        icon: "fab fa-linkedin"
    },
    {
        name: "Contact",
        description: "Get in touch with me for inquiries and collaborations",
        url: "https://example-contact.com",
        icon: "fas fa-envelope"
    }
];

// DOM Elements
const grid = document.getElementById('websitesGrid');
const searchInput = document.getElementById('searchInput');
const emptyState = document.getElementById('emptyState');
const themeToggle = document.getElementById('themeToggle');

// Theme Management
function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
}

function updateThemeIcon(theme) {
    if (!themeToggle) return; // Skip if theme toggle doesn't exist
    const icon = themeToggle.querySelector('i');
    if (theme === 'dark') {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    } else {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    }
}

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });
}

// Render websites to grid
function renderWebsites(sitesToRender = websites) {
    grid.innerHTML = '';

    if (sitesToRender.length === 0) {
        emptyState.style.display = 'flex';
        emptyState.style.flexDirection = 'column';
        emptyState.style.alignItems = 'center';
        emptyState.style.justifyContent = 'center';
        return;
    }

    emptyState.style.display = 'none';

    sitesToRender.forEach((site, index) => {
        const card = document.createElement('a');
        card.href = site.url;
        card.target = '_blank';
        card.rel = 'noopener noreferrer';
        card.className = 'website-card';
        card.style.animationDelay = `${index * 0.1}s`;
        
        const domain = new URL(site.url).hostname.replace('www.', '');

        card.innerHTML = `
            <div class="website-card-icon">
                <i class="${site.icon}"></i>
            </div>
            <h3>${site.name}</h3>
            <p>${site.description}</p>
            <div class="card-footer">
                <span class="card-url" title="${domain}">${domain}</span>
                <button class="card-button" onclick="event.preventDefault(); window.open('${site.url}', '_blank')" aria-label="Visit ${site.name}">
                    <i class="fas fa-arrow-up-right-from-square"></i>
                </button>
            </div>
        `;
        grid.appendChild(card);
    });
}

// Search functionality
function filterWebsites(query) {
    const lowercaseQuery = query.toLowerCase().trim();
    
    if (lowercaseQuery === '') {
        renderWebsites(websites);
        return;
    }

    const filtered = websites.filter(site => 
        site.name.toLowerCase().includes(lowercaseQuery) ||
        site.description.toLowerCase().includes(lowercaseQuery) ||
        site.url.toLowerCase().includes(lowercaseQuery)
    );

    renderWebsites(filtered);
}

// Search input event listener with debounce
let debounceTimer;
searchInput.addEventListener('input', (e) => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
        filterWebsites(e.target.value);
    }, 300);
});

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + K to focus search
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        searchInput.focus();
    }
    // Escape to clear search
    if (e.key === 'Escape' && document.activeElement === searchInput) {
        searchInput.value = '';
        filterWebsites('');
    }
});

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    renderWebsites();
    
    // Add focus to search input on page load hint
    searchInput.setAttribute('title', 'Search websites (Ctrl+K to focus)');
});

// Add ripple effect on button click
function addRipple(e) {
    const button = e.currentTarget;
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple');
    button.appendChild(ripple);

    setTimeout(() => ripple.remove(), 600);
}
