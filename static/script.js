// Video card is now always visible, no intersection observer needed
// The card is positioned to be partially visible on page load

// Video mute/unmute functionality
const video = document.getElementById('backgroundVideo');
const muteOverlay = document.getElementById('muteOverlay');
const customMuteBtn = document.getElementById('customMuteBtn');
const videoContent = document.querySelector('.video-content');

let muteTimeout;

// Initialize video
if (video) {
    // Ensure video is muted and playing
    video.muted = true;
    video.play().catch(err => {
        console.log('Video autoplay prevented:', err);
    });

    // Prevent pausing on click
    video.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        // Don't pause, just toggle mute
        toggleMute();
    });

    // Prevent context menu
    video.addEventListener('contextmenu', (e) => {
        e.preventDefault();
    });

    // Keep video playing
    video.addEventListener('pause', () => {
        video.play();
    });

    // Handle video content area click
    if (videoContent) {
        videoContent.addEventListener('click', (e) => {
            // Only trigger if clicking on the video area itself, not buttons
            if (e.target === videoContent || e.target === video) {
                toggleMute();
            }
        });
    }
}

// Toggle mute function
function toggleMute() {
    if (!video) return;

    video.muted = !video.muted;
    
    // Show overlay
    muteOverlay.classList.add('show');
    muteOverlay.classList.toggle('unmuted', !video.muted);

    // Hide overlay after delay
    clearTimeout(muteTimeout);
    muteTimeout = setTimeout(() => {
        muteOverlay.classList.remove('show');
    }, 2000);
}

// Custom mute button click
if (customMuteBtn) {
    customMuteBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleMute();
    });
}

// Smooth scroll behavior
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            if (target.id === 'pricing') {
                target.classList.add('revealed');
            }
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

    // Ensure video is playing
    if (video) {
        video.play().catch(err => {
            console.log('Video play error:', err);
        });
    }
    
    // Initialize video card animation
    updateVideoCardAnimation();
});

// Scroll-based animations for video card
let ticking = false;

function updateVideoCardAnimation() {
    const videoCard = document.getElementById('videoCard');
    const videoSection = document.querySelector('.video-section');
    
    if (!videoCard || !videoSection) return;
    
    const rect = videoSection.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    const sectionTop = rect.top;
    const sectionCenter = rect.top + (rect.height / 2);
    const viewportCenter = windowHeight / 2;
    
    // Calculate distance from viewport center
    const distanceFromCenter = sectionCenter - viewportCenter;
    const maxDistance = windowHeight;
    
    // Normalize distance (-1 to 1, where 0 is centered)
    const normalizedDistance = Math.max(-1, Math.min(1, distanceFromCenter / maxDistance));
    
    // Calculate opacity: fade in when approaching center, fade out when far
    const opacity = Math.max(0.4, Math.min(1, 1 - Math.abs(normalizedDistance) * 0.6));
    
    // Calculate scale: slightly larger when centered
    const scale = 1 - (Math.abs(normalizedDistance) * 0.05); // Scale from 1.0 to 0.95
    
    // Calculate translateY: subtle movement
    const translateY = normalizedDistance * 20; // Move up to 20px
    
    // Apply transformations
    videoCard.style.opacity = opacity;
    videoCard.style.transform = `translateY(${translateY}px) scale(${scale})`;
    
    // Parallax effect on video frame
    const parallaxOffset = (sectionTop / windowHeight) * 30;
    const videoFrame = videoCard.querySelector('.video-frame');
    if (videoFrame) {
        videoFrame.style.transform = `translateY(${parallaxOffset}px)`;
    }
    
    ticking = false;
}

function requestVideoCardAnimation() {
    if (!ticking) {
        window.requestAnimationFrame(updateVideoCardAnimation);
        ticking = true;
    }
}

// Initial animation setup
updateVideoCardAnimation();

// Update on scroll
window.addEventListener('scroll', requestVideoCardAnimation, { passive: true });

// Update on resize
window.addEventListener('resize', () => {
    updateVideoCardAnimation();
});

// Hover effect is handled by CSS on .video-frame

// Reveal pricing section on view
const pricingSection = document.getElementById('pricing');
if (pricingSection) {
    const pricingObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                pricingSection.classList.add('revealed');
                pricingObserver.disconnect();
            }
        });
    }, { threshold: 0.2 });

    pricingObserver.observe(pricingSection);
}
