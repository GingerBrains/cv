// Navigation functionality
const navLinks = document.querySelectorAll('.nav-link');
const pages = document.querySelectorAll('.page');

// Page navigation
navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetPage = this.getAttribute('data-page');
        
        // Update active navigation
        navLinks.forEach(navLink => navLink.classList.remove('active'));
        this.classList.add('active');
        
        // Switch pages
        switchPage(targetPage);
    });
});

// Function to switch pages
function switchPage(pageId) {
    // Hide all pages
    pages.forEach(page => {
        page.classList.remove('active');
    });
    
    // Show target page
    const targetPage = document.getElementById(pageId);
    if (targetPage) {
        targetPage.classList.add('active');
        
        // Trigger animations for the new page
        setTimeout(() => {
            animatePageContent(targetPage);
        }, 100);
    }
}

// Function to animate page content
function animatePageContent(page) {
    const cards = page.querySelectorAll('.card, .project-card');
    const techItems = page.querySelectorAll('.tech-item');
    const sectionTitle = page.querySelector('.section-title');
    
    // Animate section title
    if (sectionTitle) {
        sectionTitle.style.opacity = '0';
        sectionTitle.style.transform = 'translateY(30px)';
        setTimeout(() => {
            sectionTitle.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            sectionTitle.style.opacity = '1';
            sectionTitle.style.transform = 'translateY(0)';
        }, 100);
    }
    
    // Animate cards with staggered delay
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        setTimeout(() => {
            card.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 200 + (index * 100));
    });
    
    // Animate tech items with staggered delay
    techItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        setTimeout(() => {
            item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }, 300 + (index * 50));
    });
}

// Initialize animations for the home page
document.addEventListener('DOMContentLoaded', () => {
    const homePage = document.getElementById('home');
    if (homePage && homePage.classList.contains('active')) {
        animatePageContent(homePage);
    }
});

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(26, 26, 26, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
    } else {
        navbar.style.background = 'rgba(26, 26, 26, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Handle browser back/forward buttons
window.addEventListener('popstate', (event) => {
    const currentPage = window.location.hash.slice(1) || 'home';
    switchPage(currentPage);
    
    // Update navigation
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-page') === currentPage) {
            link.classList.add('active');
        }
    });
});

// Update URL when navigating
function updateURL(pageId) {
    const newURL = `${window.location.pathname}#${pageId}`;
    window.history.pushState({ page: pageId }, '', newURL);
}

// Enhanced navigation with URL updates
navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetPage = this.getAttribute('data-page');
        
        // Update URL
        updateURL(targetPage);
        
        // Update active navigation
        navLinks.forEach(navLink => navLink.classList.remove('active'));
        this.classList.add('active');
        
        // Switch pages
        switchPage(targetPage);
    });
});

// Check initial URL on page load
document.addEventListener('DOMContentLoaded', () => {
    const initialPage = window.location.hash.slice(1) || 'home';
    switchPage(initialPage);
    
    // Update navigation
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-page') === initialPage) {
            link.classList.add('active');
        }
    });
});

// Add hover effects for tech items
document.addEventListener('DOMContentLoaded', () => {
    const techItems = document.querySelectorAll('.tech-item');
    
    techItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.style.transform = 'translateY(-2px) scale(1.05)';
            item.style.transition = 'all 0.3s ease';
        });
        
        item.addEventListener('mouseleave', () => {
            item.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Smooth scroll for anchor links within pages
document.addEventListener('click', (e) => {
    if (e.target.tagName === 'A' && e.target.getAttribute('href').startsWith('#')) {
        const targetId = e.target.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement && targetElement.classList.contains('page')) {
            // This is handled by the page navigation
            return;
        }
        
        if (targetElement) {
            e.preventDefault();
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }
});

// Project Category Tabs Functionality
document.addEventListener('DOMContentLoaded', () => {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    // Initialize all project cards as visible (since "All Projects" is active by default)
    projectCards.forEach(card => {
        card.classList.add('visible');
    });
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const category = button.getAttribute('data-category');
            
            // Update active tab
            tabButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Filter projects
            filterProjects(category);
        });
    });
    
    function filterProjects(category) {
        console.log('Filtering for category:', category);
        projectCards.forEach(card => {
            const cardCategory = card.getAttribute('data-category');
            console.log('Card category:', cardCategory, 'Should show:', category === 'all' || cardCategory === category);
            
            if (category === 'all' || cardCategory === category) {
                card.classList.remove('hidden');
                card.classList.add('visible');
            } else {
                card.classList.add('hidden');
                card.classList.remove('visible');
            }
        });
    }
}); 