// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Header scroll effect
const header = document.querySelector('.header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Form submission handling for Netlify Forms
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

if (contactForm && formStatus) {
    // This is now handled by Netlify Forms, but we'll add some client-side validation
    // and feedback for a better user experience
    contactForm.addEventListener('submit', function(e) {
        // Don't prevent default - let Netlify handle the form submission

        // Get form data for validation
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        // Validate form data
        if (!name || !email || !message) {
            e.preventDefault();
            showFormStatus('Please fill in all fields', 'error');
            return;
        }

        // Disable submit button to prevent multiple submissions
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        submitBtn.disabled = true;
        submitBtn.textContent = 'SENDING...';

        // Show sending message
        showFormStatus('Sending your message...', 'success');

        // Note: The actual form submission is handled by Netlify
        // This function just provides user feedback
    });
}

// Handle form submission success (for when the page reloads after submission)
document.addEventListener('DOMContentLoaded', function() {
    // Check if this is a form submission success page
    if (window.location.search.includes('success=true')) {
        const formStatus = document.getElementById('formStatus');
        if (formStatus) {
            showFormStatus('Thank you for your message! I will get back to you soon.', 'success');
        }
    }
});

// Function to show form status messages
function showFormStatus(message, type) {
    if (!formStatus) return;

    formStatus.textContent = message;
    formStatus.className = `form-status ${type}`;

    // Auto-hide success messages after 5 seconds
    if (type === 'success') {
        setTimeout(() => {
            formStatus.style.display = 'none';
        }, 5000);
    }
}

// Theme toggle functionality
const themeToggle = document.querySelector('.theme-toggle');
if (themeToggle) {
    // Check for saved theme preference or use preferred color scheme
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    const savedTheme = localStorage.getItem('theme');

    if (savedTheme === 'dark' || (!savedTheme && prefersDarkScheme.matches)) {
        document.body.classList.add('dark-theme');
        themeToggle.querySelector('i').classList.replace('fa-moon', 'fa-sun');
    }

    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-theme');
        const icon = themeToggle.querySelector('i');
        icon.classList.toggle('fa-moon');
        icon.classList.toggle('fa-sun');

        // Save preference to localStorage
        const currentTheme = document.body.classList.contains('dark-theme') ? 'dark' : 'light';
        localStorage.setItem('theme', currentTheme);
    });
}

// Mobile menu functionality
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const mobileMenu = document.querySelector('.mobile-menu');
const mobileMenuLinks = document.querySelectorAll('.mobile-menu a');

if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenuBtn.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    });

    // Close mobile menu when clicking on a link
    mobileMenuLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenuBtn.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.classList.remove('menu-open');
        });
    });
}

// Add coding-themed animations
document.addEventListener('DOMContentLoaded', () => {
    // Add typing animation to the logo
    const logo = document.querySelector('.logo');
    if (logo) {
        logo.setAttribute('data-text', logo.textContent);
        logo.innerHTML = `<span class="typing-text">${logo.textContent}</span>`;
    }

    // Add code brackets to nav items on hover
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        link.addEventListener('mouseenter', () => {
            link.classList.add('code-hover');
        });
        link.addEventListener('mouseleave', () => {
            link.classList.remove('code-hover');
        });
    });

    // Lazy load images for better performance
    const lazyImages = document.querySelectorAll('img[src^="https://placehold.co"]');

    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.classList.add('fade-in');
                    observer.unobserve(img);
                }
            });
        });

        lazyImages.forEach(img => {
            imageObserver.observe(img);
        });
    }
});