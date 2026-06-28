document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================================================
    // Core Navigation & UI Logic (Non-GSAP)
    // ==========================================================================

    // --- Mobile Menu Toggle ---
    const hamburger = document.querySelector('.hamburger');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    function toggleMenu() {
        hamburger.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    }

    if (hamburger) hamburger.addEventListener('click', toggleMenu);
    mobileLinks.forEach(link => link.addEventListener('click', toggleMenu));


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

    modalTriggers.forEach(trigger => trigger.addEventListener('click', openModal));
    if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);
    if (modal) modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });


    // --- Blueprint Carousel ---
    const track = document.querySelector('.carousel-track');
    const prevBtn = document.querySelector('.carousel-nav.prev');
    const nextBtn = document.querySelector('.carousel-nav.next');
    const dots = document.querySelectorAll('.dot');
    
    if (track && prevBtn && nextBtn) {
        let currentIndex = 1; 
        const getCardsPerView = () => window.innerWidth <= 768 ? 1 : 3;
        const totalCards = document.querySelectorAll('.carousel-card').length;
        
        function updateCarousel() {
            const cardsPerView = getCardsPerView();
            const cardWidth = document.querySelector('.carousel-card').offsetWidth + 24; 
            const maxIndex = totalCards - 1;
            
            if (currentIndex > maxIndex) currentIndex = maxIndex;
            if (currentIndex < 0) currentIndex = 0;
            
            if (cardsPerView === 1 || totalCards > cardsPerView) {
                track.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
            } else {
                track.style.transform = `translateX(0px)`;
            }
            
            dots.forEach((dot, index) => dot.classList.toggle('active', index === currentIndex));
            
            const allCards = document.querySelectorAll('.carousel-card');
            allCards.forEach((card, idx) => {
                if (idx === currentIndex) {
                    card.style.transform = 'scale(1)';
                    card.style.filter = 'blur(0px)';
                    card.style.opacity = '1';
                    card.style.zIndex = '2';
                } else {
                    card.style.transform = 'scale(0.9)';
                    card.style.filter = 'blur(0.5px)';
                    card.style.opacity = '0.6';
                    card.style.zIndex = '1';
                }
            });

            prevBtn.style.opacity = currentIndex === 0 ? '0.5' : '1';
            prevBtn.style.cursor = currentIndex === 0 ? 'not-allowed' : 'pointer';
            nextBtn.style.opacity = currentIndex >= maxIndex ? '0.5' : '1';
            nextBtn.style.cursor = currentIndex >= maxIndex ? 'not-allowed' : 'pointer';
        }

        nextBtn.addEventListener('click', () => { if (currentIndex < totalCards - 1) { currentIndex++; updateCarousel(); } });
        prevBtn.addEventListener('click', () => { if (currentIndex > 0) { currentIndex--; updateCarousel(); } });
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                currentIndex = Math.min(index, totalCards - getCardsPerView());
                updateCarousel();
            });
        });
        window.addEventListener('resize', updateCarousel);
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
    
    // --- Dynamic Calendar Rendering ---
    const calendarSections = document.querySelectorAll('.calendar-section');
    calendarSections.forEach(section => {
        const calendarGrid = section.querySelector('.dynamic-calendar');
        const monthYearText = section.querySelector('.month-year-text');
        const prevMonthBtn = section.querySelector('.prev-month-btn');
        const nextMonthBtn = section.querySelector('.next-month-btn');
        
        if (!calendarGrid || !monthYearText || !prevMonthBtn || !nextMonthBtn) return;
        
        let currentDate = new Date();
        let selectedDate = new Date();

        function renderCalendar() {
            calendarGrid.innerHTML = ''; 
            const days = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
            days.forEach(day => {
                const dayDiv = document.createElement('div');
                dayDiv.className = 'day-name';
                dayDiv.textContent = day;
                calendarGrid.appendChild(dayDiv);
            });

            const year = currentDate.getFullYear();
            const month = currentDate.getMonth();
            const firstDay = new Date(year, month, 1).getDay();
            const daysInMonth = new Date(year, month + 1, 0).getDate();
            const daysInPrevMonth = new Date(year, month, 0).getDate();
            const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
            monthYearText.textContent = `${monthNames[month]} ${year}`;

            const today = new Date();
            if (year < today.getFullYear() || (year === today.getFullYear() && month <= today.getMonth())) {
                prevMonthBtn.style.visibility = 'hidden';
            } else {
                prevMonthBtn.style.visibility = 'visible';
            }

            for (let i = firstDay; i > 0; i--) {
                const dayDiv = document.createElement('div');
                dayDiv.className = 'day disabled';
                dayDiv.textContent = daysInPrevMonth - i + 1;
                calendarGrid.appendChild(dayDiv);
            }

            for (let i = 1; i <= daysInMonth; i++) {
                const dayDiv = document.createElement('div');
                dayDiv.className = 'day';
                dayDiv.textContent = i;
                
                if (year === today.getFullYear() && month === today.getMonth() && i < today.getDate()) {
                    dayDiv.classList.add('disabled');
                } else if (year < today.getFullYear() || (year === today.getFullYear() && month < today.getMonth())) {
                    dayDiv.classList.add('disabled');
                } else {
                    dayDiv.addEventListener('click', () => {
                        section.querySelectorAll('.day:not(.disabled)').forEach(d => d.classList.remove('selected'));
                        dayDiv.classList.add('selected');
                        selectedDate = new Date(year, month, i);
                    });
                }

                if (i === selectedDate.getDate() && month === selectedDate.getMonth() && year === selectedDate.getFullYear()) {
                    dayDiv.classList.add('selected');
                }
                calendarGrid.appendChild(dayDiv);
            }

            const totalCells = firstDay + daysInMonth;
            const nextDays = Math.ceil(totalCells / 7) * 7 - totalCells;
            for (let i = 1; i <= nextDays; i++) {
                const dayDiv = document.createElement('div');
                dayDiv.className = 'day disabled';
                dayDiv.textContent = i;
                calendarGrid.appendChild(dayDiv);
            }
        }

        prevMonthBtn.addEventListener('click', () => { currentDate.setMonth(currentDate.getMonth() - 1); renderCalendar(); });
        nextMonthBtn.addEventListener('click', () => { currentDate.setMonth(currentDate.getMonth() + 1); renderCalendar(); });
        renderCalendar();
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
                    charSpan.className = 'gsap-char';
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
    // GSAP & Lenis Premium Animation System
    // ==========================================================================
    
    gsap.registerPlugin(ScrollTrigger);

    // 1. Global Smooth Scroll System (Lenis)
    const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), 
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 1,
        smoothTouch: false,
        touchMultiplier: 2,
    });

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
    });
    
    gsap.ticker.lagSmoothing(0);

    // Handle Anchor Links for Smooth Scrolling with Lenis
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                lenis.scrollTo(targetElement, { offset: -100 });
            }
        });
    });

    const cinematicEase = "power3.out"; 

    // Prevent FOUC
    gsap.set('.reveal-target, .stagger-group > *, .timeline-item, .hero-line-inner, .review-card, .faq-item, .about-photo img, .gsap-char, .blur-reveal', { visibility: 'visible' });

    // 2. Navbar Experience
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        // Initial load
        gsap.from(navbar, {
            y: -20,
            opacity: 0,
            duration: 1,
            ease: cinematicEase,
            delay: 0.2
        });

        // Scroll state
        ScrollTrigger.create({
            trigger: 'body',
            start: 'top -50',
            onEnter: () => {
                gsap.to(navbar, {
                    paddingTop: '10px',
                    paddingBottom: '10px',
                    backdropFilter: 'blur(20px)',
                    backgroundColor: 'rgba(255, 255, 255, 0.85)',
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
                    duration: 0.4,
                    ease: cinematicEase
                });
            },
            onLeaveBack: () => {
                gsap.to(navbar, {
                    paddingTop: '20px',
                    paddingBottom: '20px',
                    backdropFilter: 'blur(10px)',
                    backgroundColor: 'rgba(255, 255, 255, 0.7)',
                    boxShadow: 'none',
                    duration: 0.4,
                    ease: cinematicEase
                });
            }
        });
    }

    // 3. Hero Section Staged Reveal Sequence
    const heroTl = gsap.timeline({ defaults: { ease: cinematicEase } });
    
    heroTl.from('.trust-badge', { y: 30, opacity: 0, duration: 0.8 }, 0.2)
          .from('.hero-line-inner', { y: 50, opacity: 0, duration: 0.8, stagger: 0.15 }, "-=0.5")
          .from('.sub-headline', { y: 30, opacity: 0, duration: 0.8 }, "-=0.5")
          .from('.gsap-hero-video', { scale: 0.95, opacity: 0, duration: 1 }, "-=0.4")
          .from('.gsap-hero-actions .cta-button', { y: 20, opacity: 0, duration: 0.6, stagger: 0.1 }, "-=0.6");

    // 3.5 Text Reveal (Large Headlines)
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
                duration: 1.2,
                ease: cinematicEase
            }
        );
    });

    // 4. Global Reveal System
    const revealElements = document.querySelectorAll('.reveal-target, .stagger-group');
    revealElements.forEach(el => {
        // If it's a stagger group, animate its children
        if (el.classList.contains('stagger-group')) {
            gsap.fromTo(el.children, 
                { opacity: 0, y: 60 },
                {
                    scrollTrigger: {
                        trigger: el,
                        start: "top 85%",
                        toggleActions: "play none none reverse"
                    },
                    opacity: 1,
                    y: 0,
                    duration: 1.1,
                    stagger: 0.12,
                    ease: cinematicEase
                }
            );
        } else {
            gsap.fromTo(el, 
                { opacity: 0, y: 60 },
                {
                    scrollTrigger: {
                        trigger: el,
                        start: "top 85%",
                        toggleActions: "play none none reverse"
                    },
                    opacity: 1,
                    y: 0,
                    duration: 1.1,
                    ease: cinematicEase
                }
            );
        }
    });

    // 5. Founder Story Timeline Section
    const timeline = document.querySelector('.timeline');
    const timelineProgress = document.querySelector('.timeline-progress');
    const timelineItems = gsap.utils.toArray('.timeline-item');
    
    if (timeline && timelineProgress) {
        // Vertical line scrub
        gsap.to(timelineProgress, {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
                trigger: timeline,
                start: "top 50%", 
                end: "bottom 60%",
                scrub: true
            }
        });

        // Individual milestone reveals
        timelineItems.forEach((item) => {
            const dot = item.querySelector('.timeline-dot');
            const card = item.querySelector('.timeline-content');
            
            gsap.set(dot, { scale: 0.5, opacity: 0.5 });
            gsap.set(card, { opacity: 0, x: 50 });

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: item,
                    start: "top 70%",
                    toggleActions: "play none none reverse"
                }
            });

            tl.to(dot, {
                scale: 1.2,
                opacity: 1,
                backgroundColor: 'var(--accent-primary)',
                boxShadow: '0 0 15px var(--accent-primary)',
                duration: 0.6,
                ease: "back.out(2)"
            })
            .to(card, {
                opacity: 1,
                x: 0,
                duration: 1,
                ease: cinematicEase
            }, "-=0.4");
        });
    }

    // 6. Testimonial Section
    const reviewCards = document.querySelectorAll('.review-card');
    if (reviewCards.length > 0) {
        gsap.fromTo(reviewCards,
            { opacity: 0, y: 60, scale: 0.96 },
            {
                scrollTrigger: {
                    trigger: '.reviews-grid',
                    start: "top 80%",
                    toggleActions: "play none none reverse"
                },
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.9,
                stagger: 0.12,
                ease: cinematicEase
            }
        );
    }

    // 7. FAQ Section (GSAP Governed)
    const accordionItems = document.querySelectorAll('.accordion-item');
    const faqSection = document.querySelector('.faqs');
    
    if (accordionItems.length > 0 && faqSection) {
        // Ensure items are full width and centered, and disable CSS transitions during GSAP scroll reveal
        gsap.set(accordionItems, { 
            width: '100%', 
            margin: '0 auto',
            transformOrigin: "top center",
            transition: "none"
        });

        // Section reveal (Pyramid/Cascade style fade up + scale + blur stagger animation)
        gsap.fromTo(accordionItems, 
            { 
                opacity: 0, 
                y: 60, 
                scale: 0.85,
                filter: "blur(10px)"
            }, 
            {
                opacity: 1,
                y: 0,
                scale: 1,
                filter: "blur(0px)",
                scrollTrigger: {
                    trigger: faqSection,
                    start: 'top 75%',
                    toggleActions: "play none none reverse"
                },
                duration: 1,
                stagger: 0.15,
                ease: cinematicEase
            }
        );

        // Click interaction and Character Reveal
        accordionItems.forEach(item => {
            const header = item.querySelector('.accordion-header');
            const content = item.querySelector('.accordion-content');
            const chevron = item.querySelector('.chevron');
            const chars = item.querySelectorAll('.gsap-char');
            
            // Initial setup
            gsap.set(content, { height: 0, opacity: 0 });
            gsap.set(chevron, { rotation: 0 });

            // Character reveal for the header initially
            const headerChars = header.querySelectorAll('.gsap-char');
            if(headerChars.length > 0) {
                gsap.fromTo(headerChars,
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

            header.addEventListener('click', () => {
                const isActive = item.classList.contains('active');
                
                // Close all
                accordionItems.forEach(acc => {
                    acc.classList.remove('active');
                    const c = acc.querySelector('.accordion-content');
                    const ch = acc.querySelector('.chevron');
                    gsap.to(c, { height: 0, opacity: 0, duration: 0.4, ease: "power2.out" });
                    gsap.to(ch, { rotation: 0, duration: 0.4, ease: "power2.out" });
                });
                
                // Open clicked if it wasn't active
                if (!isActive) {
                    item.classList.add('active');
                    gsap.to(content, { height: "auto", opacity: 1, duration: 0.4, ease: "power2.out" });
                    gsap.to(chevron, { rotation: 180, duration: 0.4, ease: "power2.out" });
                    
                    // Animate content characters on open
                    const contentChars = content.querySelectorAll('.gsap-char');
                    if (contentChars.length > 0) {
                        gsap.fromTo(contentChars,
                            { opacity: 0, y: 15 },
                            {
                                opacity: 1,
                                y: 0,
                                duration: 0.6,
                                stagger: 0.01,
                                ease: "back.out(1.7)",
                                overwrite: "auto"
                            }
                        );
                    }
                }
            });
        });
    }

    // 8. Numbers / Stats Count-Up
    const numbers = document.querySelectorAll('.gsap-number');
    numbers.forEach(num => {
        const target = parseInt(num.getAttribute('data-target'), 10);
        if(!isNaN(target)){
            gsap.fromTo(num, 
                { innerHTML: 0 },
                {
                    scrollTrigger: {
                        trigger: num,
                        start: "top 90%",
                        toggleActions: "play none none reverse"
                    },
                    innerHTML: target,
                    duration: 2,
                    ease: "power2.out",
                    snap: { innerHTML: 1 },
                    onUpdate: function() {
                        // Add commas for thousands
                        num.innerHTML = Math.round(num.innerHTML).toLocaleString();
                    }
                }
            );
        }
    });

    // 9. Image Reveal System
    const images = document.querySelectorAll('.about-photo img, .blueprint-image');
    images.forEach(img => {
        gsap.fromTo(img,
            { opacity: 0, scale: 1.05 },
            {
                scrollTrigger: {
                    trigger: img,
                    start: "top 85%",
                    toggleActions: "play none none reverse"
                },
                opacity: 1,
                scale: 1,
                duration: 1.2,
                ease: cinematicEase
            }
        );
    });

    // 10. Scroll Depth Effects (Subtle Parallax)
    const parallaxElements = document.querySelectorAll('.hero-bg-animated, .blueprint');
    parallaxElements.forEach(el => {
        gsap.to(el, {
            y: 20, // max movement 20px
            ease: "none",
            scrollTrigger: {
                trigger: el,
                start: "top bottom",
                end: "bottom top",
                scrub: true
            }
        });
    });

    // 11. Optional: Cleanup on page unmount (if using a framework, but good practice)
    window.addEventListener('unload', () => {
        ScrollTrigger.getAll().forEach(t => t.kill());
        lenis.destroy();
    });

});
