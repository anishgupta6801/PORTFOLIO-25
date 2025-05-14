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

// Form submission handling
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

if (contactForm && formStatus) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Get form data
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        // Validate form data
        if (!name || !email || !message) {
            showFormStatus('Please fill in all fields', 'error');
            return;
        }

        try {
            // Disable submit button
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            submitBtn.disabled = true;
            submitBtn.textContent = 'SENDING...';

            // Send data to server
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, email, message })
            });

            const data = await response.json();

            if (data.success) {
                showFormStatus('Thank you for your message! I will get back to you soon.', 'success');
                contactForm.reset();
            } else {
                showFormStatus(data.message || 'Something went wrong. Please try again.', 'error');
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            showFormStatus('Server error. Please try again later.', 'error');
        } finally {
            // Re-enable submit button
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            submitBtn.disabled = false;
            submitBtn.textContent = 'SEND MESSAGE';
        }
    });
}

// Function to show form status messages
function showFormStatus(message, type) {
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