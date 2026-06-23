document.addEventListener('DOMContentLoaded', () => {
    
    // --- Mobile Menu Toggle ---
    const hamburger = document.querySelector('.hamburger');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    function toggleMenu() {
        hamburger.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    }

    if (hamburger) {
        hamburger.addEventListener('click', toggleMenu);
    }

    mobileLinks.forEach(link => {
        link.addEventListener('click', toggleMenu);
    });


    // --- Scroll Animations (Intersection Observer) ---
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const fadeElements = document.querySelectorAll('.fade-up');
    fadeElements.forEach(el => observer.observe(el));


    // --- FAQs Accordion ---
    const accordionItems = document.querySelectorAll('.accordion-item');

    accordionItems.forEach(item => {
        const header = item.querySelector('.accordion-header');
        header.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all items
            accordionItems.forEach(acc => acc.classList.remove('active'));
            
            // Open clicked item if it wasn't active
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });


    // --- Booking Modal ---
    const modal = document.getElementById('bookingModal');
    const modalTriggers = document.querySelectorAll('.book-call-trigger');
    const modalCloseBtn = document.querySelector('.modal-close');

    function openModal(e) {
        if(e) e.preventDefault();
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }

    modalTriggers.forEach(trigger => {
        trigger.addEventListener('click', openModal);
    });

    if (modalCloseBtn) {
        modalCloseBtn.addEventListener('click', closeModal);
    }

    // Close on click outside
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });
    }


    // --- Blueprint Carousel ---
    const track = document.querySelector('.carousel-track');
    const prevBtn = document.querySelector('.carousel-nav.prev');
    const nextBtn = document.querySelector('.carousel-nav.next');
    const dots = document.querySelectorAll('.dot');
    
    if (track && prevBtn && nextBtn) {
        let currentIndex = 0;
        const getCardsPerView = () => window.innerWidth <= 768 ? 1 : 3;
        const totalCards = document.querySelectorAll('.carousel-card').length;
        
        function updateCarousel() {
            const cardsPerView = getCardsPerView();
            const cardWidth = document.querySelector('.carousel-card').offsetWidth + 24; // width + gap
            const maxIndex = Math.max(0, totalCards - cardsPerView);
            
            // Boundary check
            if (currentIndex > maxIndex) currentIndex = maxIndex;
            if (currentIndex < 0) currentIndex = 0;
            
            // Move track
            track.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
            
            // Update dots
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === Math.min(currentIndex, dots.length - 1));
            });
            
            // Disable/Enable buttons
            prevBtn.style.opacity = currentIndex === 0 ? '0.5' : '1';
            prevBtn.style.cursor = currentIndex === 0 ? 'not-allowed' : 'pointer';
            
            nextBtn.style.opacity = currentIndex >= maxIndex ? '0.5' : '1';
            nextBtn.style.cursor = currentIndex >= maxIndex ? 'not-allowed' : 'pointer';
        }

        nextBtn.addEventListener('click', () => {
            const maxIndex = totalCards - getCardsPerView();
            if (currentIndex < maxIndex) {
                currentIndex++;
                updateCarousel();
            }
        });

        prevBtn.addEventListener('click', () => {
            if (currentIndex > 0) {
                currentIndex--;
                updateCarousel();
            }
        });

        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                const maxIndex = totalCards - getCardsPerView();
                currentIndex = Math.min(index, maxIndex);
                updateCarousel();
            });
        });

        // Handle resize
        window.addEventListener('resize', () => {
            updateCarousel();
        });

        // Initialize state
        updateCarousel();
    }
    
    // --- Time Slot Selection (Mock) ---
    const timeSlots = document.querySelectorAll('.time-slot');
    timeSlots.forEach(slot => {
        slot.addEventListener('click', () => {
            timeSlots.forEach(s => s.classList.remove('selected'));
            slot.classList.add('selected');
        });
    });
    
    const daySlots = document.querySelectorAll('.day:not(.disabled)');
    daySlots.forEach(day => {
        day.addEventListener('click', () => {
            daySlots.forEach(d => d.classList.remove('selected'));
            day.classList.add('selected');
        });
    });

    // --- Scroll scrub fade for Bottom CTA ---
    const scrollFadeElements = document.querySelectorAll('.scroll-fade-in-out');
    const scrollFadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && entry.intersectionRatio > 0.1) {
                entry.target.classList.add('visible');
            } else {
                entry.target.classList.remove('visible');
            }
        });
    }, {
        threshold: [0, 0.1, 0.2]
    });

    scrollFadeElements.forEach(el => scrollFadeObserver.observe(el));

    // --- Staggered Fade for FAQs ---
    const staggerElements = document.querySelectorAll('.scroll-fade-in-out-stagger');
    const staggerObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            } else {
                entry.target.classList.remove('visible');
            }
        });
    }, {
        threshold: 0,
        rootMargin: "50px"
    });

    staggerElements.forEach(el => staggerObserver.observe(el));

    // Fallback: If elements are still invisible after 2 seconds, force them visible
    setTimeout(() => {
        staggerElements.forEach(el => {
            if (!el.classList.contains('visible')) {
                // Only force if it's actually in viewport or just force all to be safe
                el.classList.add('visible');
            }
        });
    }, 1500);

    // --- Character Reveal Effect ---
    function applyCharacterReveal(selector) {
        const elements = document.querySelectorAll(selector);
        elements.forEach(el => {
            const text = el.textContent.trim();
            el.innerHTML = '';
            const words = text.split(' ');
            let charIndex = 0;
            
            words.forEach((word, wordIdx) => {
                const wordSpan = document.createElement('span');
                wordSpan.style.display = 'inline-block';
                wordSpan.style.whiteSpace = 'nowrap';
                
                for (let i = 0; i < word.length; i++) {
                    const charSpan = document.createElement('span');
                    charSpan.textContent = word[i];
                    charSpan.className = 'char';
                    charSpan.style.setProperty('--char-index', charIndex);
                    wordSpan.appendChild(charSpan);
                    charIndex++;
                }
                
                el.appendChild(wordSpan);
                if (wordIdx < words.length - 1) {
                    el.appendChild(document.createTextNode(' '));
                }
            });
        });
    }

    applyCharacterReveal('.accordion-header h3');
    applyCharacterReveal('.accordion-inner p');
});
