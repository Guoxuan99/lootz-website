document.addEventListener('DOMContentLoaded', () => {

    // --- WhatsApp Integration ---
    const contactBtns = document.querySelectorAll('.contact-btn');
    const whatsappUrl = 'https://wa.me/60122420296?text=Hello,%20I%20am%20interested%20in%20Lootz%20Enterprise%20AI%20solutions.';

    contactBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            window.location.href = whatsappUrl;
        });
    });

    // --- Mobile Menu Toggle ---
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenuBtn.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking a link
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                mobileMenuBtn.classList.remove('active');
                navLinks.classList.remove('active');
            }
        });
    });

    // --- Navbar Scroll Effect ---
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // --- Scroll Reveal Animation ---
    const revealElements = document.querySelectorAll('.reveal');

    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealOnScroll = new IntersectionObserver(function (entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    revealElements.forEach(el => {
        revealOnScroll.observe(el);
    });

    // --- FAQ Accordion ---
    const faqQuestions = document.querySelectorAll('.faq-question');

    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const faqItem = question.parentElement;
            const answer = question.nextElementSibling;

            // Close all other open items
            const allItems = document.querySelectorAll('.faq-item');
            allItems.forEach(item => {
                if (item !== faqItem && item.classList.contains('active')) {
                    item.classList.remove('active');
                    const otherAnswer = item.querySelector('.faq-answer');
                    otherAnswer.style.maxHeight = null;
                }
            });

            // Toggle current item
            faqItem.classList.toggle('active');

            if (faqItem.classList.contains('active')) {
                answer.style.maxHeight = answer.scrollHeight + "px";
            } else {
                answer.style.maxHeight = null;
            }
        });
    });

    // --- Interactive Demo Console Engine ---
    const demoTabs = document.querySelectorAll('.demo-tab');
    const demoPanels = document.querySelectorAll('.demo-panel');

    function triggerTypingEffect(panelId) {
        const panel = document.getElementById(panelId);
        if (!panel) return;

        const typingSpan = panel.querySelector('.typing-text');
        if (!typingSpan) return;

        const textToType = typingSpan.getAttribute('data-text');
        typingSpan.textContent = '';

        let charIndex = 0;

        // Prevent stacking interval cycles if user click-spams tabs
        if (typingSpan.activeIntervalId) {
            clearInterval(typingSpan.activeIntervalId);
        }

        typingSpan.activeIntervalId = setInterval(() => {
            if (charIndex < textToType.length) {
                typingSpan.textContent += textToType.charAt(charIndex);
                charIndex++;
            } else {
                clearInterval(typingSpan.activeIntervalId);
            }
        }, 20); // Value adjustment for typewriter text generation speed
    }

    // Connect click routing logic to active tabs
    demoTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetRoute = tab.getAttribute('data-target');
            const targetPanelId = `panel-${targetRoute}`;

            // Clean active states
            demoTabs.forEach(t => t.classList.remove('active'));
            demoPanels.forEach(p => p.classList.remove('active'));

            // Toggle selected state and run script animation
            tab.classList.add('active');
            const targetPanel = document.getElementById(targetPanelId);
            if (targetPanel) {
                targetPanel.classList.add('active');
                triggerTypingEffect(targetPanelId);
            }
        });
    });

    // Run typewriter engine loop safely on initial content render loads
    if (demoPanels.length > 0) {
        triggerTypingEffect('panel-knowledge');
    }

    // --- Smart Back to Top & Circular Progress Engine ---
    const scrollTopBtn = document.getElementById('scrollTopBtn');
    const progressPath = document.querySelector('.progress-circle path');

    if (progressPath && scrollTopBtn) {
        const pathLength = progressPath.getTotalLength();

        // Setup initial dimensions properties for SVG metric path tracks
        progressPath.style.transition = progressPath.style.webkitTransition = 'none';
        progressPath.style.strokeDasharray = `${pathLength} ${pathLength}`;
        progressPath.style.strokeDashoffset = pathLength;
        progressPath.getBoundingClientRect();
        progressPath.style.transition = progressPath.style.webkitTransition = 'stroke-dashoffset 10ms linear';

        const updateScrollProgress = () => {
            const scrollPosition = window.scrollY;
            const totalHeight = document.documentElement.scrollHeight - window.innerHeight;

            // Map absolute viewport position depth data straight into circular vector property tracking
            const currentProgress = pathLength - (scrollPosition * pathLength / totalHeight);
            progressPath.style.strokeDashoffset = currentProgress;

            // Dynamically manage trigger visibility layers
            if (scrollPosition > 300) {
                scrollTopBtn.classList.add('visible');
            } else {
                scrollTopBtn.classList.remove('visible');
            }
        };

        window.addEventListener('scroll', updateScrollProgress);

        // Execute smooth view scroll returning execution
        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

        // Runtime check evaluation setup cycle
        updateScrollProgress();
    }

});