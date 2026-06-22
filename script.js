document.addEventListener("DOMContentLoaded", () => {

    // ==========================================================================
    // Navigation & Sticky Header Controls
    // ==========================================================================
    const header = document.querySelector(".main-header");
    const menuToggle = document.getElementById("menuToggle");
    const navMenu = document.getElementById("navMenu");
    const navLinks = document.querySelectorAll(".nav-link");

    // Sticky Scroll tracking
    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            header.classList.add("sticky");
        } else {
            header.classList.remove("sticky");
        }
    });

    // Mobile Navigation Drawer Toggle Handler
    if (menuToggle && navMenu) {
        menuToggle.addEventListener("click", () => {
            navMenu.classList.toggle("active");
            
            // Toggle hamburger animation state
            const bars = menuToggle.querySelectorAll(".bar");
            bars[0].style.transform = navMenu.classList.contains("active") ? "rotate(45deg) translate(5px, 6px)" : "none";
            bars[1].style.opacity = navMenu.classList.contains("active") ? "0" : "1";
            bars[2].style.transform = navMenu.classList.contains("active") ? "rotate(-45deg) translate(5px, -6px)" : "none";
        });
    }

    // Force drawer closure when selecting local links
    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            if (navMenu.classList.contains("active")) {
                menuToggle.click();
            }
        });
    });

    // ==========================================================================
    // Interactive Form Validation Layout Logic
    // ==========================================================================
    const travelForm = document.getElementById("travelForm");
    const contactForm = document.getElementById("contactForm");

    // Shared custom alerts mapping
    const displayNotice = (msg) => {
        alert(msg);
    };

    if (travelForm) {
        travelForm.addEventListener("submit", (e) => {
            e.preventDefault();

            const name = document.getElementById("name").value.trim();
            const phone = document.getElementById("phone").value.trim();
            const destination = document.getElementById("destination").value.trim();
            const travelDate = document.getElementById("travelDate").value;
            const travelers = document.getElementById("travelers").value;

            if (!name) return displayNotice("Please enter your name to proceed.");
            if (phone.length < 10 || isNaN(phone)) return displayNotice("Please enter a valid 10-digit phone number.");
            if (!destination) return displayNotice("Please declare your target destination.");
            if (!travelDate) return displayNotice("Please indicate your desired travel window date.");
            if (!travelers || travelers < 1) return displayNotice("Please note your expected passenger count.");

            displayNotice("Thank you for contacting Classic Road Travels. Our luxury travel advisor will contact you shortly with an customized itinerary.");
            travelForm.reset();
        });
    }

    if (contactForm) {
        contactForm.addEventListener("submit", (e) => {
            e.preventDefault();

            const contactName = document.getElementById("contactName").value.trim();
            const contactEmail = document.getElementById("contactEmail").value.trim();
            const contactMessage = document.getElementById("contactMessage").value.trim();
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!contactName) return displayNotice("Please state your name.");
            if (!emailRegex.test(contactEmail)) return displayNotice("Please verify your email address configuration.");
            if (!contactMessage) return displayNotice("Please input your targeted operational message queries.");

            displayNotice("Message routed successfully! A corporate coordinator will answer within 2 business hours.");
            contactForm.reset();
        });
    }

    // ==========================================================================
    // Accordion System Mechanics
    // ==========================================================================
    const faqItems = document.querySelectorAll(".faq-item");

    faqItems.forEach(item => {
        const questionButton = item.querySelector(".faq-question");
        const answerWrapper = item.querySelector(".faq-answer");

        questionButton.addEventListener("click", () => {
            const isCurrentlyOpen = item.classList.contains("active");

            // Close all items to create single accordion functionality
            faqItems.forEach(innerItem => {
                innerItem.classList.remove("active");
                innerItem.querySelector(".faq-answer").style.maxHeight = null;
            });

            // Toggle selected state
            if (!isCurrentlyOpen) {
                item.classList.add("active");
                answerWrapper.style.maxHeight = answerWrapper.scrollHeight + "px";
            }
        });
    });

    // ==========================================================================
    // Back To Top Control Architecture
    // ==========================================================================
    const backToTopBtn = document.getElementById("backToTop");

    window.addEventListener("scroll", () => {
        if (window.scrollY > 400) {
            backToTopBtn.classList.add("visible");
        } else {
            backToTopBtn.classList.remove("visible");
        }
    });

    backToTopBtn.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });

    // ==========================================================================
    // Animated Counters Logic
    // ==========================================================================
    const counterElements = document.querySelectorAll(".counter");
    let countersInitiated = false;

    const startCounters = () => {
        counterElements.forEach(counter => {
            const targetValue = parseInt(counter.getAttribute("data-target"), 10);
            const incrementalStep = targetValue / 50; // Standardize animation frames duration
            let currentCount = 0;

            const updateCount = () => {
                currentCount += incrementalStep;
                if (currentCount < targetValue) {
                    counter.innerText = Math.ceil(currentCount);
                    setTimeout(updateCount, 25);
                } else {
                    counter.innerText = targetValue;
                }
            };
            updateCount();
        });
    };

    // ==========================================================================
    // Intersection Observer for Smooth Scroll Reveals
    // ==========================================================================
    const revealTargets = document.querySelectorAll(".scroll-reveal, .stats-section");

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.classList.contains("stats-section") && !countersInitiated) {
                    startCounters();
                    countersInitiated = true;
                } else {
                    entry.target.classList.add("reveal-visible");
                }
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15
    });

    revealTargets.forEach(target => revealObserver.observe(target));
});