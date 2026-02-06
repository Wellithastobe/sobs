// Intersection Observer for video card animation
const videoCard = document.getElementById('videoCard');

const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

if (videoCard) {
    observer.observe(videoCard);
}

// Smooth scroll behavior
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add parallax effect to hero glow
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        const glow = hero.querySelector('::before');
        hero.style.setProperty('--scroll', scrolled * 0.5 + 'px');
    }
});

// Add subtle animation to logo on scroll
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    const logo = document.querySelector('.logo');
    
    if (logo) {
        if (currentScroll > lastScroll && currentScroll > 100) {
            logo.style.transform = 'scale(0.95)';
        } else {
            logo.style.transform = 'scale(1)';
        }
    }
    
    lastScroll = currentScroll;
});

// Animate elements on page load
window.addEventListener('load', () => {
    const elements = document.querySelectorAll('.hero-content > *');
    elements.forEach((el, index) => {
        setTimeout(() => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, index * 200);
    });
});

// Add hover effect to video card
const videoCardElement = document.getElementById('videoCard');
if (videoCardElement) {
    videoCardElement.addEventListener('mouseenter', () => {
        videoCardElement.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    videoCardElement.addEventListener('mouseleave', () => {
        videoCardElement.style.transform = 'translateY(0) scale(1)';
    });
}
