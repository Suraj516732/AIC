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
        let currentIndex = 1; // Start with the middle card focused
        const getCardsPerView = () => window.innerWidth <= 768 ? 1 : 3;
        const totalCards = document.querySelectorAll('.carousel-card').length;
        
        function updateCarousel() {
            const cardsPerView = getCardsPerView();
            const cardWidth = document.querySelector('.carousel-card').offsetWidth + 24; // width + gap
            const maxIndex = totalCards - 1;
            
            // Boundary check
            if (currentIndex > maxIndex) currentIndex = maxIndex;
            if (currentIndex < 0) currentIndex = 0;
            
            // Move track
            if (cardsPerView === 1 || totalCards > cardsPerView) {
                // On mobile, or if we have lots of cards, actually slide the track
                // If we are on mobile, we center the currentIndex by sliding.
                track.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
            } else {
                // On desktop with exactly 3 cards, we don't slide. The cards fit perfectly.
                track.style.transform = `translateX(0px)`;
            }
            
            // Update dots
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentIndex);
            });
            
            // Update Coverflow Effect
            const allCards = document.querySelectorAll('.carousel-card');
            
            // On desktop with 3 cards (no slide), center card is just currentIndex.
            // On mobile (with slide), center card is also just currentIndex.
            // (If we had 4+ cards on desktop, we'd need more complex logic, but we only have 3).
            const centerCardIndex = currentIndex;
            
            allCards.forEach((card, idx) => {
                if (idx === centerCardIndex) {
                    card.style.transform = 'scale(1)';
                    card.style.filter = 'blur(0px)';
                    card.style.opacity = '1';
                    card.style.zIndex = '2';
                } else {
                    card.style.transform = 'scale(0.9)';
                    card.style.filter = 'blur(0.5px)'; // Reduced blur
                    card.style.opacity = '0.6';
                    card.style.zIndex = '1';
                }
            });

            // Disable/Enable buttons
            prevBtn.style.opacity = currentIndex === 0 ? '0.5' : '1';
            prevBtn.style.cursor = currentIndex === 0 ? 'not-allowed' : 'pointer';
            
            nextBtn.style.opacity = currentIndex >= maxIndex ? '0.5' : '1';
            nextBtn.style.cursor = currentIndex >= maxIndex ? 'not-allowed' : 'pointer';
        }

        nextBtn.addEventListener('click', () => {
            if (currentIndex < totalCards - 1) {
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

    // --- Character Reveal Effect Setup ---
    function prepareCharacterReveal(selector) {
        const elements = document.querySelectorAll(selector);
        elements.forEach(el => {
            const text = el.textContent.trim();
            el.innerHTML = '';
            const words = text.split(' ');
            
            words.forEach((word, wordIdx) => {
                const wordSpan = document.createElement('span');
                wordSpan.style.display = 'inline-block';
                wordSpan.style.whiteSpace = 'nowrap';
                
                for (let i = 0; i < word.length; i++) {
                    const charSpan = document.createElement('span');
                    charSpan.textContent = word[i];
                    charSpan.className = 'gsap-char'; // New class
                    wordSpan.appendChild(charSpan);
                }
                
                el.appendChild(wordSpan);
                if (wordIdx < words.length - 1) {
                    el.appendChild(document.createTextNode(' '));
                }
            });
        });
    }

    prepareCharacterReveal('.gsap-char-target');

    // ==========================================================================
    // GSAP & Lenis Cinematic Animation System
    // ==========================================================================
    
    gsap.registerPlugin(ScrollTrigger);

    // Initialize Lenis
    const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // https://www.desmos.com/calculator/brs54l4xou
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 1,
        smoothTouch: true,
        touchMultiplier: 2,
    });

    lenis.on('scroll', ScrollTrigger.update);

    // Sync Lenis's requestAnimationFrame with GSAP's ticker for performance
    gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
    });
    
    // Disable GSAP lag smoothing to prevent conflicts
    gsap.ticker.lagSmoothing(0);

    // Common Easing
    const cinematicEase = "power3.out"; // Maps closely to cubic-bezier(0.22,1,0.36,1)

    // Make elements visible right before animating to avoid FOUC
    gsap.set('.reveal-target, .stagger-group > *, .blur-reveal, .timeline-item, .gsap-char', { visibility: 'visible' });

    // 1. Global Reveal System
    gsap.utils.toArray('.reveal-target').forEach(element => {
        gsap.fromTo(element, 
            { opacity: 0, y: 30 },
            {
                scrollTrigger: {
                    trigger: element,
                    start: "top 85%",
                    toggleActions: "play none none reverse"
                },
                opacity: 1,
                y: 0,
                duration: 0.6,
                ease: cinematicEase
            }
        );
    });

    // 2. Staggered Group Reveals
    gsap.utils.toArray('.stagger-group').forEach(group => {
        const children = group.children;
        gsap.fromTo(children,
            { opacity: 0, y: 30 },
            {
                scrollTrigger: {
                    trigger: group,
                    start: "top 80%",
                    toggleActions: "play none none reverse"
                },
                opacity: 1,
                y: 0,
                duration: 0.6,
                stagger: 0.1,
                ease: cinematicEase
            }
        );
    });

    // 3. Text Reveal (Large Headlines)
    gsap.utils.toArray('.blur-reveal').forEach(text => {
        gsap.fromTo(text,
            { opacity: 0, y: 30 },
            {
                scrollTrigger: {
                    trigger: text,
                    start: "top 85%",
                    toggleActions: "play none none reverse"
                },
                opacity: 1,
                y: 0,
                duration: 0.6,
                ease: cinematicEase
            }
        );
    });

    // 4. Parallax Elements
    gsap.utils.toArray('[data-speed]').forEach(el => {
        const speed = parseFloat(el.getAttribute('data-speed'));
        gsap.to(el, {
            y: () => (1 - speed) * ScrollTrigger.maxScroll(window),
            ease: "none",
            scrollTrigger: {
                trigger: el,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
                invalidateOnRefresh: true
            }
        });
    });

    // 5. Timeline Scroll Scrubbing Effect
    const timeline = document.querySelector('.timeline');
    const timelineProgress = document.querySelector('.timeline-progress');
    const timelineItems = gsap.utils.toArray('.timeline-item');
    
    if (timeline && timelineProgress) {
        // Animate the vertical progress line
        gsap.to(timelineProgress, {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
                trigger: timeline,
                start: "top 60%", // Start line when top of timeline is 60% down viewport
                end: "bottom 60%",
                scrub: 0.5
            }
        });

        // Animate each item
        timelineItems.forEach((item, i) => {
            const dot = item.querySelector('.timeline-dot');
            const card = item.querySelector('.timeline-content');
            
            // Initial state
            gsap.set(item, { visibility: 'visible' });
            gsap.set(dot, { backgroundColor: '#fff', boxShadow: 'none', scale: 0.8 });
            gsap.set(card, { opacity: 0, y: 30 });

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: item,
                    start: "top 60%", // When item reaches 60% down viewport (where line is)
                    toggleActions: "play none none reverse"
                }
            });

            tl.to(dot, {
                backgroundColor: 'var(--accent-primary)',
                boxShadow: '0 0 15px var(--accent-primary)',
                scale: 1.2,
                duration: 0.4,
                ease: "back.out(2)"
            })
            .to(card, {
                opacity: 1,
                y: 0,
                duration: 0.6,
                ease: cinematicEase
            }, "-=0.2"); // overlap slightly
        });
    }

    // 6. Character Reveal for GSAP
    gsap.utils.toArray('.accordion-item').forEach(item => {
        const chars = item.querySelectorAll('.gsap-char');
        if (chars.length > 0) {
            // Setup trigger to animate characters when accordion opens or scrolls in
            gsap.fromTo(chars,
                { opacity: 0, y: 15 },
                {
                    scrollTrigger: {
                        trigger: item,
                        start: "top 85%",
                        toggleActions: "play none none reverse"
                    },
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    stagger: 0.015,
                    ease: "back.out(1.7)"
                }
            );
        }
    });

    // 7. FAQ Inverted Pyramid & Scrub Animation
    const faqItems = gsap.utils.toArray('.accordion-item');
    const faqSection = document.querySelector('.faqs');
    
    if (faqItems.length > 0 && faqSection) {
        // Ensure items are full width and centered
        gsap.set(faqItems, { 
            width: '100%', 
            margin: '0 auto',
            transformOrigin: "top center"
        });

        // Pop-up stagger animation: they pop one by one
        gsap.fromTo(faqItems, 
            { opacity: 0, y: 40, scale: 0.9 }, 
            {
                opacity: 1,
                y: 0,
                scale: 1,
                scrollTrigger: {
                    trigger: faqSection,
                    start: 'top 75%',
                    toggleActions: "play none none reverse"
                },
                duration: 0.8,
                stagger: 0.12,
                ease: "back.out(1.5)"
            }
        );
    }

    // 8. Unique 3D Tilt Effect for Hero Video
    const videoContainer = document.querySelector('.video-container');
    const heroSection = document.querySelector('.hero');
    
    if (videoContainer && heroSection) {
        heroSection.addEventListener('mousemove', (e) => {
            const rect = videoContainer.getBoundingClientRect();
            // Calculate center of the video
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            
            // Distance of mouse from center (smoother, subtler tilt)
            const xAxis = (centerX - e.clientX) / 40; // reduced tilt factor
            const yAxis = (centerY - e.clientY) / 40;
            
            gsap.to(videoContainer, {
                rotationY: -xAxis,
                rotationX: yAxis,
                transformPerspective: 1000,
                transformOrigin: "center center",
                ease: 'power3.out',
                duration: 1.2,
                overwrite: 'auto'
            });
        });

        heroSection.addEventListener('mouseleave', () => {
            gsap.to(videoContainer, {
                rotationY: 0,
                rotationX: 0,
                ease: 'elastic.out(1, 0.3)',
                duration: 1.5
            });
        });
    }

});
