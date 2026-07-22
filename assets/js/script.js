/* =====================================================
   ZOVRO TECH
   MAIN JAVASCRIPT
   PART 1
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* ==========================================
       SELECTORS
    ========================================== */

    const header = document.querySelector("header");
    const menuBtn = document.querySelector(".menu-btn");
    const navLinks = document.querySelector(".nav-links");
    const loader = document.getElementById("loader");

    /* ==========================================
       PAGE LOADER
    ========================================== */

    window.addEventListener("load", () => {

        if (loader) {

            setTimeout(() => {

                loader.classList.add("hide");

            }, 800);

        }

    });

    /* ==========================================
       MOBILE MENU
    ========================================== */

    if (menuBtn && navLinks) {

        menuBtn.addEventListener("click", () => {

            navLinks.classList.toggle("active");
            menuBtn.classList.toggle("active");

        });

    }

    /* ==========================================
       CLOSE MENU WHEN CLICK OUTSIDE
    ========================================== */

    document.addEventListener("click", (e) => {

        if (
            navLinks &&
            menuBtn &&
            !navLinks.contains(e.target) &&
            !menuBtn.contains(e.target)
        ) {

            navLinks.classList.remove("active");
            menuBtn.classList.remove("active");

        }

    });

    /* ==========================================
       STICKY NAVBAR
    ========================================== */

    function stickyNavbar() {

        if (!header) return;

        if (window.scrollY > 80) {

            header.classList.add("sticky");

        } else {

            header.classList.remove("sticky");

        }

    }

    stickyNavbar();

    window.addEventListener("scroll", stickyNavbar);

                              /* ==========================================
       SMOOTH SCROLL
    ========================================== */

    document.querySelectorAll('a[href^="#"]').forEach(link => {

        link.addEventListener("click", function (e) {

            const target = document.querySelector(this.getAttribute("href"));

            if (target) {

                e.preventDefault();

                target.scrollIntoView({

                    behavior: "smooth",
                    block: "start"

                });

            }

        });

    });

    /* ==========================================
       CLOSE MOBILE MENU AFTER CLICK
    ========================================== */

    document.querySelectorAll(".nav-links a").forEach(link => {

        link.addEventListener("click", () => {

            if (navLinks && menuBtn) {

                navLinks.classList.remove("active");
                menuBtn.classList.remove("active");

            }

        });

    });

    /* ==========================================
       SCROLL TO TOP BUTTON
    ========================================== */

    const topBtn = document.getElementById("topBtn");

    function toggleTopButton() {

        if (!topBtn) return;

        if (window.scrollY > 400) {

            topBtn.classList.add("show");

        } else {

            topBtn.classList.remove("show");

        }

    }

    toggleTopButton();

    window.addEventListener("scroll", toggleTopButton);

    if (topBtn) {

        topBtn.addEventListener("click", () => {

            window.scrollTo({

                top: 0,
                behavior: "smooth"

            });

        });

    }

    /* ==========================================
       ACTIVE NAVIGATION
    ========================================== */

    const sections = document.querySelectorAll("section");
    const navItems = document.querySelectorAll(".nav-links a");

    function activeNavigation() {

        let current = "";

        sections.forEach(section => {

            const sectionTop = section.offsetTop - 120;
            const sectionHeight = section.offsetHeight;

            if (
                window.scrollY >= sectionTop &&
                window.scrollY < sectionTop + sectionHeight
            ) {

                current = section.getAttribute("id");

            }

        });

        navItems.forEach(link => {

            link.classList.remove("active");

            if (link.getAttribute("href") === "#" + current) {

                link.classList.add("active");

            }

        });

    }

    activeNavigation();

    window.addEventListener("scroll", activeNavigation);
       /* ==========================================
       FAQ ACCORDION
    ========================================== */

    const faqItems = document.querySelectorAll(".faq-item");

    faqItems.forEach(item => {

        const question = item.querySelector(".faq-question");

        question.addEventListener("click", () => {

            const isActive = item.classList.contains("active");

            faqItems.forEach(faq => {

                faq.classList.remove("active");

            });

            if (!isActive) {

                item.classList.add("active");

            }

        });

    });

    /* ==========================================
       SCROLL REVEAL ANIMATION
    ========================================== */

    const revealElements = document.querySelectorAll(".fade-up");

    const revealObserver = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("show");

                revealObserver.unobserve(entry.target);

            }

        });

    }, {

        threshold: 0.15

    });

    revealElements.forEach(element => {

        revealObserver.observe(element);

    });

    /* ==========================================
       STAGGER ANIMATION
    ========================================== */

    revealElements.forEach((element, index) => {

        element.style.transitionDelay = `${index * 0.1}s`;

    });

    /* ==========================================
       HERO PARALLAX EFFECT
    ========================================== */

    const heroImage = document.querySelector(".hero-image");

    window.addEventListener("scroll", () => {

        if (!heroImage) return;

        const offset = window.pageYOffset;

        heroImage.style.transform =
            `translateY(${offset * 0.15}px)`;

    });

    /* ==========================================
       SERVICE CARD HOVER EFFECT
    ========================================== */

    const cards = document.querySelectorAll(".card");

    cards.forEach(card => {

        card.addEventListener("mousemove", (e) => {

            const rect = card.getBoundingClientRect();

            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            card.style.setProperty("--x", `${x}px`);
            card.style.setProperty("--y", `${y}px`);

        });

    });

    /* ==========================================
       SECTION TITLE ANIMATION
    ========================================== */

    const titles = document.querySelectorAll(".section-title");

    const titleObserver = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("visible");

                titleObserver.unobserve(entry.target);

            }

        });

    }, {

        threshold: 0.2

    });

    titles.forEach(title => {

        titleObserver.observe(title);

    });
       /* ==========================================
       COUNTER ANIMATION
    ========================================== */

    const counters = document.querySelectorAll(".counter");

    const counterObserver = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if (!entry.isIntersecting) return;

            const counter = entry.target;
            const target = parseInt(counter.dataset.target) || 0;

            let current = 0;
            const duration = 2000;
            const increment = target / (duration / 16);

            function updateCounter() {

                current += increment;

                if (current < target) {

                    counter.textContent = Math.floor(current);

                    requestAnimationFrame(updateCounter);

                } else {

                    counter.textContent = target + "+";

                }

            }

            updateCounter();

            counterObserver.unobserve(counter);

        });

    }, {

        threshold: 0.5

    });

    counters.forEach(counter => {

        counterObserver.observe(counter);

    });

    /* ==========================================
       SCROLL PROGRESS BAR
    ========================================== */

    const progressBar = document.getElementById("progress-bar");

    function updateProgressBar() {

        if (!progressBar) return;

        const scrollTop = window.scrollY;

        const docHeight =
            document.documentElement.scrollHeight -
            window.innerHeight;

        const progress =
            (scrollTop / docHeight) * 100;

        progressBar.style.width = progress + "%";

    }

    updateProgressBar();

    window.addEventListener("scroll", updateProgressBar);

    /* ==========================================
       TESTIMONIAL AUTO SLIDER
    ========================================== */

    const testimonialGrid =
        document.querySelector(".testimonial-grid");

    if (testimonialGrid) {

        let scrollAmount = 0;

        setInterval(() => {

            const card =
                testimonialGrid.querySelector(".testimonial-card");

            if (!card) return;

            scrollAmount += card.offsetWidth + 30;

            if (
                scrollAmount >=
                testimonialGrid.scrollWidth -
                testimonialGrid.clientWidth
            ) {

                scrollAmount = 0;

            }

            testimonialGrid.scrollTo({

                left: scrollAmount,

                behavior: "smooth"

            });

        }, 4000);

    }

    /* ==========================================
       PORTFOLIO FILTER
    ========================================== */

    const filterButtons =
        document.querySelectorAll(".filter-btn");

    const projects =
        document.querySelectorAll(".project");

    filterButtons.forEach(button => {

        button.addEventListener("click", () => {

            filterButtons.forEach(btn =>
                btn.classList.remove("active")
            );

            button.classList.add("active");

            const filter = button.dataset.filter;

            projects.forEach(project => {

                if (
                    filter === "all" ||
                    project.dataset.category === filter
                ) {

                    project.style.display = "block";

                } else {

                    project.style.display = "none";

                }

            });

        });

    });

    /* ==========================================
       NUMBER COUNT FORMAT
    ========================================== */

    document.querySelectorAll(".counter").forEach(counter => {

        if (!counter.dataset.target) {

            counter.dataset.target =
                counter.textContent.replace(/\D/g, "");

        }

    });
       /* ==========================================
       CONTACT FORM VALIDATION
    ========================================== */

    const contactForm = document.querySelector(".contact-form form");

    if (contactForm) {

        contactForm.addEventListener("submit", (e) => {

            e.preventDefault();

            const name =
                contactForm.querySelector("input[type='text']");

            const email =
                contactForm.querySelector("input[type='email']");

            const phone =
                contactForm.querySelector("input[type='tel']");

            const message =
                contactForm.querySelector("textarea");

            if (!name.value.trim()) {

                alert("Please enter your name.");
                name.focus();
                return;

            }

            if (!email.value.trim()) {

                alert("Please enter your email.");
                email.focus();
                return;

            }

            const emailPattern =
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!emailPattern.test(email.value)) {

                alert("Please enter a valid email address.");
                email.focus();
                return;

            }

            if (!phone.value.trim()) {

                alert("Please enter your phone number.");
                phone.focus();
                return;

            }

            if (message.value.trim().length < 10) {

                alert("Message must contain at least 10 characters.");
                message.focus();
                return;

            }

            alert("Thank you! Your message has been sent.");

            contactForm.reset();

        });

    }

    /* ==========================================
       HERO TYPING EFFECT
    ========================================== */

    const typingElement = document.querySelector(".typing");

    if (typingElement) {

        const words = [

            "Website Development",
            "Meta Ads",
            "Google Ads",
            "SEO",
            "AI Automation"

        ];

        let wordIndex = 0;
        let charIndex = 0;
        let deleting = false;

        function typingEffect() {

            const currentWord = words[wordIndex];

            if (!deleting) {

                typingElement.textContent =
                    currentWord.substring(0, charIndex++);

                if (charIndex > currentWord.length) {

                    deleting = true;

                    setTimeout(typingEffect, 1500);

                    return;

                }

            } else {

                typingElement.textContent =
                    currentWord.substring(0, charIndex--);

                if (charIndex < 0) {

                    deleting = false;

                    wordIndex = (wordIndex + 1) % words.length;

                }

            }

            setTimeout(
                typingEffect,
                deleting ? 50 : 90
            );

        }

        typingEffect();

    }

    /* ==========================================
       RIPPLE BUTTON EFFECT
    ========================================== */

    document.querySelectorAll(".btn1,.btn2").forEach(button => {

        button.addEventListener("click", function (e) {

            const ripple = document.createElement("span");

            ripple.className = "ripple";

            const rect = this.getBoundingClientRect();

            const size = Math.max(rect.width, rect.height);

            ripple.style.width = size + "px";
            ripple.style.height = size + "px";

            ripple.style.left =
                (e.clientX - rect.left - size / 2) + "px";

            ripple.style.top =
                (e.clientY - rect.top - size / 2) + "px";

            this.appendChild(ripple);

            setTimeout(() => {

                ripple.remove();

            }, 600);

        });

    });

    /* ==========================================
       IMAGE LAZY LOADING
    ========================================== */

    const images = document.querySelectorAll("img");

    const imageObserver = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if (!entry.isIntersecting) return;

            const img = entry.target;

            if (img.dataset.src) {

                img.src = img.dataset.src;

            }

            imageObserver.unobserve(img);

        });

    });

    images.forEach(img => {

        imageObserver.observe(img);

    });

    /* ==========================================
       CONSOLE MESSAGE
    ========================================== */

    console.log(

        "%cZOVRO TECH",

        "color:#0A84FF;font-size:28px;font-weight:bold;"

    );

    console.log(

        "%cProfessional Digital Agency",

        "color:#38BDF8;font-size:14px;"

    );
       /* ==========================================
       AUTO UPDATE FOOTER YEAR
    ========================================== */

    const yearElement = document.querySelector(".year");

    if (yearElement) {

        yearElement.textContent = new Date().getFullYear();

    }

    /* ==========================================
       PREVENT FORM RESUBMIT
    ========================================== */

    if (window.history.replaceState) {

        window.history.replaceState(

            null,

            null,

            window.location.href

        );

    }

    /* ==========================================
       PAGE VISIBILITY
    ========================================== */

    document.addEventListener("visibilitychange", () => {

        if (document.hidden) {

            document.title = "👋 Come Back | ZOVRO TECH";

        } else {

            document.title =
                "ZOVRO TECH | Website Development | Meta Ads | Google Ads";

        }

    });

    /* ==========================================
       KEYBOARD SHORTCUTS
    ========================================== */

    document.addEventListener("keydown", (e) => {

        if (e.key === "Escape") {

            if (navLinks && menuBtn) {

                navLinks.classList.remove("active");
                menuBtn.classList.remove("active");

            }

        }

    });

    /* ==========================================
       RESIZE HANDLER
    ========================================== */

    window.addEventListener("resize", () => {

        if (window.innerWidth > 992) {

            if (navLinks && menuBtn) {

                navLinks.classList.remove("active");
                menuBtn.classList.remove("active");

            }

        }

    });

    /* ==========================================
       WEBSITE READY
    ========================================== */

    window.addEventListener("load", () => {

        console.log("🚀 Website Loaded Successfully");

        console.log("⚡ ZOVRO TECH Premium Version");

    });

}); // DOMContentLoaded End


/* =====================================================
   ZOVRO TECH
   PART 7 (OPTIONAL PREMIUM FEATURES)
===================================================== */

/* ==========================================
   PRELOADER FADE OUT
========================================== */

window.addEventListener("load", () => {

    const loader = document.getElementById("loader");

    if (loader) {

        loader.style.opacity = "0";

        setTimeout(() => {

            loader.style.display = "none";

        }, 500);

    }

});

/* ==========================================
   COPY EMAIL TO CLIPBOARD
========================================== */

const emailLink = document.querySelector(".copy-email");

if (emailLink) {

    emailLink.addEventListener("click", (e) => {

        e.preventDefault();

        const email = emailLink.dataset.email;

        navigator.clipboard.writeText(email);

        alert("Email copied successfully.");

    });

}

/* ==========================================
   BUTTON LOADING EFFECT
========================================== */

document.querySelectorAll(".btn-loading").forEach(button => {

    button.addEventListener("click", function () {

        this.classList.add("loading");

        setTimeout(() => {

            this.classList.remove("loading");

        }, 2000);

    });

});

/* ==========================================
   SCROLL DIRECTION
========================================== */

let lastScroll = 0;

window.addEventListener("scroll", () => {

    const current = window.pageYOffset;

    if (current > lastScroll) {

        document.body.classList.add("scroll-down");
        document.body.classList.remove("scroll-up");

    } else {

        document.body.classList.add("scroll-up");
        document.body.classList.remove("scroll-down");

    }

    lastScroll = current;

});

/* ==========================================
   NETWORK STATUS
========================================== */

window.addEventListener("offline", () => {

    console.warn("No Internet Connection");

});

window.addEventListener("online", () => {

    console.log("Internet Connected");

});

/* ==========================================
   PAGE PERFORMANCE
========================================== */

window.addEventListener("load", () => {

    const time = performance.now().toFixed(0);

    console.log(

        `⚡ Page Loaded in ${time} ms`

    );

});

/* ==========================================
   END
========================================== */

console.log("✅ ZOVRO TECH Premium JavaScript Loaded");
