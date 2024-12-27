// Utility: Debounce Function
function debounce(func, wait) {
    let timeout;
    return function (...args) {
        const later = () => {
            clearTimeout(timeout);
            func.apply(this, args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Navigation Scroll Effect with Debounce
const handleScroll = debounce(() => {
    const header = document.querySelector('.header');
    if (window.scrollY > 50) {
        header.style.background = '#1A1A1A';
        header.style.boxShadow = '0px 4px 10px rgba(0, 0, 0, 0.5)';
    } else {
        header.style.background = 'transparent';
        header.style.boxShadow = 'none';
    }
}, 100);
window.addEventListener('scroll', handleScroll);

// Reusable Smooth Scroll Function
function smoothScrollTo(targetId) {
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
    } else {
        console.error(`Element with ID "${targetId}" not found.`);
    }
}

// Smooth Scroll Animation for Links
const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');
smoothScrollLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').slice(1);
        smoothScrollTo(targetId);
    });
});

// Button Animation on Hover
const buttons = document.querySelectorAll('.cta-buttons button');
buttons.forEach(button => {
    button.addEventListener('mouseenter', () => {
        button.style.transform = 'scale(1.05)';
        button.style.transition = 'transform 0.2s ease-in-out';
    });
    button.addEventListener('mouseleave', () => {
        button.style.transform = 'scale(1)';
    });
});

// Intersection Observer for Fade-In Effects
const fadeInElements = document.querySelectorAll('.fade-in');
const fadeInObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = 1;
            entry.target.style.transform = 'translateY(0)';
            entry.target.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.2 });

fadeInElements.forEach(el => {
    el.style.opacity = 0;
    el.style.transform = 'translateY(20px)';
    fadeInObserver.observe(el);
});

// Mobile Menu Toggle with Dynamic Icon
const menuButton = document.querySelector('.menu-btn');
const navLinks = document.querySelector('.nav');

menuButton.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    menuButton.textContent = navLinks.classList.contains('open') ? '✖' : '☰';
});

// Form Validation and API Simulation
const exampleForm = document.querySelector('#example-form'); // Add form ID to your HTML
if (exampleForm) {
    exampleForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(exampleForm);
        const data = Object.fromEntries(formData.entries());

        // Basic Form Validation
        if (!data.name || !data.email) {
            alert('Please fill in all required fields.');
            return;
        }

        simulateAPICall(data);
    });
}

// Backend Placeholder (Simulated API Call)
async function simulateAPICall(data) {
    try {
        console.log('Sending data to the server...', data);
        // Simulate a delay for the API call
        await new Promise(resolve => setTimeout(resolve, 2000));
        console.log('Data successfully sent to the server!');
    } catch (error) {
        console.error('Error sending data:', error);
    }
}
// Smooth Scroll to Pricing Section on "Get Started" Button Click
document.getElementById('get-started-btn').addEventListener('click', () => {
    const pricingSection = document.getElementById('pricing');
    if (pricingSection) {
        pricingSection.scrollIntoView({ behavior: 'smooth' });
    } else {
        console.error('Pricing section not found.');
    }
});
