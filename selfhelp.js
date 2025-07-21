// Mobile Menu Toggle with Hamburger Animation
const mobileMenuBtn = document.querySelector('.mobile-menu');
const navLinks = document.querySelector('.nav-links');

mobileMenuBtn.addEventListener('click', () => {
    mobileMenuBtn.classList.toggle('active');
    navLinks.classList.toggle('active');
    
    // Prevent scrolling when menu is open
    if (navLinks.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
    }
});

// Close menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenuBtn.classList.remove('active');
        navLinks.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if(targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if(targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Highlight current page in navigation
const currentPage = window.location.pathname.split('/').pop();
document.querySelectorAll('.nav-links a').forEach(link => {
    if (link.getAttribute('href') === currentPage) {
        link.classList.add('active');
    }
});

// Resource Popup Functionality
const resourceLinks = document.querySelectorAll('.tool-btn');
const resourcePopup = document.getElementById('resourcePopup');
const popupClose = document.getElementById('popupClose');
const popupCloseBtn = document.getElementById('popupCloseBtn');
const popupTitle = document.getElementById('popupTitle');
const popupContent = document.getElementById('popupContent');

resourceLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Get data from the clicked link
        const title = this.getAttribute('data-title');
        const content = this.getAttribute('data-content');
        
        // Set popup content
        popupTitle.textContent = title;
        popupContent.innerHTML = content;
        
        // Show popup
        resourcePopup.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
});

// Close popup
function closePopup() {
    resourcePopup.classList.remove('active');
    document.body.style.overflow = '';
}

popupClose.addEventListener('click', closePopup);
popupCloseBtn.addEventListener('click', closePopup);

// Close when clicking outside content
resourcePopup.addEventListener('click', function(e) {
    if (e.target === resourcePopup) {
        closePopup();
    }
});

// Close with Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && resourcePopup.classList.contains('active')) {
        closePopup();
    }
});

// Tab functionality for techniques section
const tabBtns = document.querySelectorAll('.tab-btn');
const tabPanes = document.querySelectorAll('.tab-pane');

tabBtns.forEach(btn => {
    btn.addEventListener('click', function() {
        // Remove active class from all buttons and panes
        tabBtns.forEach(btn => btn.classList.remove('active'));
        tabPanes.forEach(pane => pane.classList.remove('active'));
        
        // Add active class to clicked button
        this.classList.add('active');
        
        // Show corresponding pane
        const tabId = this.getAttribute('data-tab');
        document.getElementById(tabId).classList.add('active');
    });
});
