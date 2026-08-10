/* =========================================================
   ZOVRO TECH — LIVE 4D EXPERIENCE
   COMPLETE SCRIPT.JS
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       01 — INTRO
    ===================================================== */

    const intro = document.getElementById("intro");
    const introCanvas = document.getElementById("introCanvas");

    if (intro && introCanvas) {

        const ctx = introCanvas.getContext("2d");

        let width = 0;
        let height = 0;

        const introParticles = [];

        function resizeIntro() {

            width = introCanvas.width = window.innerWidth;
            height = introCanvas.height = window.innerHeight;

        }

        resizeIntro();

        window.addEventListener("resize", resizeIntro);


        for (let i = 0; i < 90; i++) {

            introParticles.push({

                x: Math.random() * width,
                y: Math.random() * height,

                size: Math.random() * 1.8 + .4,

                speedX:
                    (Math.random() - .5) * .25,

                speedY:
                    (Math.random() - .5) * .25,

                alpha:
                    Math.random() * .7 + .2

            });

        }


        let introStart = performance.now();


        function drawIntro(time) {

            if (!intro || intro.style.display === "none") {
                return;
            }

            ctx.clearRect(
                0,
                0,
                width,
                height
            );


            /* Background */

            const gradient =
                ctx.createRadialGradient(
                    width * .5,
                    height * .5,
                    0,
                    width * .5,
                    height * .5,
                    Math.max(width, height) * .7
                );

            gradient.addColorStop(
                0,
                "rgba(126,34,206,.14)"
            );

            gradient.addColorStop(
                .4,
                "rgba(76,29,149,.07)"
            );

            gradient.addColorStop(
                1,
                "rgba(0,0,0,0)"
            );

            ctx.fillStyle = gradient;

            ctx.fillRect(
                0,
                0,
                width,
                height
            );


            /* Particles */

            introParticles.forEach(p => {

                p.x += p.speedX;
                p.y += p.speedY;


                if (p.x < 0)
                    p.x = width;

                if (p.x > width)
                    p.x = 0;

                if (p.y < 0)
                    p.y = height;

                if (p.y > height)
                    p.y = 0;


                ctx.beginPath();

                ctx.arc(
                    p.x,
                    p.y,
                    p.size,
                    0,
                    Math.PI * 2
                );

                ctx.fillStyle =
                    `rgba(216,180,254,${p.alpha})`;

                ctx.shadowBlur = 10;

                ctx.shadowColor =
                    "#c026d3";

                ctx.fill();

            });


            /* Energy ring */

            const elapsed =
                time - introStart;

            const pulse =
                1 +
                Math.sin(elapsed * .004) * .08;

            const radius =
                Math.min(width, height)
                * .12
                * pulse;


            ctx.beginPath();

            ctx.arc(
                width / 2,
                height / 2 - 60,
                radius,
                0,
                Math.PI * 2
            );

            ctx.strokeStyle =
                "rgba(192,132,252,.45)";

            ctx.lineWidth = 1;

            ctx.shadowBlur = 25;

            ctx.shadowColor =
                "#a855f7";

            ctx.stroke();


            requestAnimationFrame(drawIntro);

        }


        requestAnimationFrame(drawIntro);


        setTimeout(() => {

            if (intro) {

                intro.style.opacity = "0";
                intro.style.pointerEvents = "none";

            }

        }, 2300);


        setTimeout(() => {

            if (intro) {

                intro.remove();

            }

        }, 3100);

    }



    /* =====================================================
       02 — LIVE BACKGROUND
    ===================================================== */

    const canvas =
        document.getElementById(
            "backgroundCanvas"
        );


    if (canvas) {

        const ctx =
            canvas.getContext("2d");

        let width;
        let height;

        let mouseX = 0;
        let mouseY = 0;

        let targetMouseX = 0;
        let targetMouseY = 0;


        const particles = [];

        const PARTICLE_COUNT =
            window.innerWidth < 768
                ? 55
                : 110;


        function resizeCanvas() {

            width =
                canvas.width =
                window.innerWidth;

            height =
                canvas.height =
                window.innerHeight;

        }


        resizeCanvas();

        window.addEventListener(
            "resize",
            resizeCanvas
        );


        window.addEventListener(
            "mousemove",
            event => {

                targetMouseX =
                    event.clientX;

                targetMouseY =
                    event.clientY;

            },
            { passive:true }
        );


        for (
            let i = 0;
            i < PARTICLE_COUNT;
            i++
        ) {

            particles.push({

                x:
                    Math.random()
                    * window.innerWidth,

                y:
                    Math.random()
                    * window.innerHeight,

                vx:
                    (Math.random() - .5)
                    * .35,

                vy:
                    (Math.random() - .5)
                    * .35,

                size:
                    Math.random()
                    * 1.6 + .3,

                alpha:
                    Math.random()
                    * .65 + .15,

                pulse:
                    Math.random()
                    * Math.PI * 2

            });

        }


        function drawBackground(time) {

            ctx.clearRect(
                0,
                0,
                width,
                height
            );


            /* Smooth mouse */

            mouseX +=
                (targetMouseX - mouseX)
                * .025;

            mouseY +=
                (targetMouseY - mouseY)
                * .025;


            /* Ambient glow */

            const glowX =
                width * .72
                + (mouseX - width / 2)
                * .035;

            const glowY =
                height * .42
                + (mouseY - height / 2)
                * .025;


            const glow =
                ctx.createRadialGradient(
                    glowX,
                    glowY,
                    0,
                    glowX,
                    glowY,
                    Math.min(width,height)
                    * .55
                );


            glow.addColorStop(
                0,
                "rgba(168,85,247,.11)"
            );

            glow.addColorStop(
                .35,
                "rgba(124,58,237,.055)"
            );

            glow.addColorStop(
                1,
                "rgba(0,0,0,0)"
            );


            ctx.fillStyle = glow;

            ctx.fillRect(
                0,
                0,
                width,
                height
            );


            /* Particles */

            particles.forEach(p => {

                p.x += p.vx;
                p.y += p.vy;

                p.pulse += .015;


                /* Mouse influence */

                const dx =
                    mouseX - p.x;

                const dy =
                    mouseY - p.y;

                const distance =
                    Math.sqrt(
                        dx * dx +
                        dy * dy
                    );


                if (distance < 170) {

                    const force =
                        (170 - distance)
                        / 170
                        * .018;

                    p.x -=
                        dx * force;

                    p.y -=
                        dy * force;

                }


                /* Wrap */

                if (p.x < -10)
                    p.x = width + 10;

                if (p.x > width + 10)
                    p.x = -10;

                if (p.y < -10)
                    p.y = height + 10;

                if (p.y > height + 10)
                    p.y = -10;


                const alpha =
                    p.alpha +
                    Math.sin(p.pulse)
                    * .12;


                ctx.beginPath();

                ctx.arc(
                    p.x,
                    p.y,
                    p.size,
                    0,
                    Math.PI * 2
                );


                ctx.fillStyle =
                    `rgba(216,180,254,${alpha})`;

                ctx.shadowBlur = 10;

                ctx.shadowColor =
                    "#a855f7";

                ctx.fill();

            });


            /* Connecting lines */

            for (
                let i = 0;
                i < particles.length;
                i++
            ) {

                for (
                    let j = i + 1;
                    j < particles.length;
                    j++
                ) {

                    const a =
                        particles[i];

                    const b =
                        particles[j];


                    const dx =
                        a.x - b.x;

                    const dy =
                        a.y - b.y;

                    const distance =
                        Math.sqrt(
                            dx * dx +
                            dy * dy
                        );


                    if (distance < 100) {

                        const opacity =
                            (1 - distance / 100)
                            * .11;


                        ctx.beginPath();

                        ctx.moveTo(
                            a.x,
                            a.y
                        );

                        ctx.lineTo(
                            b.x,
                            b.y
                        );

                        ctx.strokeStyle =
                            `rgba(168,85,247,${opacity})`;

                        ctx.lineWidth = .5;

                        ctx.stroke();

                    }

                }

            }


            requestAnimationFrame(
                drawBackground
            );

        }


        requestAnimationFrame(
            drawBackground
        );

    }



    /* =====================================================
       03 — MOBILE MENU
    ===================================================== */

    const menuButton =
        document.getElementById(
            "menuButton"
        );

    const navLinks =
        document.querySelector(
            ".nav-links"
        );


    if (menuButton && navLinks) {

        menuButton.addEventListener(
            "click",
            () => {

                navLinks.classList.toggle(
                    "active"
                );

            }
        );


        navLinks
            .querySelectorAll("a")
            .forEach(link => {

                link.addEventListener(
                    "click",
                    () => {

                        navLinks.classList.remove(
                            "active"
                        );

                    }
                );

            });

    }



    /* =====================================================
       04 — FAQ
    ===================================================== */

    const faqItems =
        document.querySelectorAll(
            ".faq-item"
        );


    faqItems.forEach(item => {

        const question =
            item.querySelector(
                ".faq-question"
            );


        if (!question) return;


        question.addEventListener(
            "click",
            () => {


                faqItems.forEach(
                    other => {

                        if (
                            other !== item
                        ) {

                            other.classList.remove(
                                "active"
                            );

                            const answer =
                                other.querySelector(
                                    ".faq-answer"
                                );

                            if (answer) {

                                answer.style.maxHeight =
                                    null;

                            }

                        }

                    }
                );


                item.classList.toggle(
                    "active"
                );


                const answer =
                    item.querySelector(
                        ".faq-answer"
                    );


                if (
                    item.classList.contains(
                        "active"
                    )
                ) {

                    answer.style.maxHeight =
                        answer.scrollHeight
                        + "px";

                } else {

                    answer.style.maxHeight =
                        null;

                }

            }
        );

    });



    /* =====================================================
       05 — COUNTERS
    ===================================================== */

    const counters =
        document.querySelectorAll(
            ".counter"
        );


    let countersStarted = false;


    function animateCounters() {

        if (countersStarted)
            return;

        countersStarted = true;


        counters.forEach(
            counter => {

                const target =
                    Number(
                        counter.dataset.target
                    );


                let current = 0;


                const increment =
                    Math.max(
                        target / 45,
                        1
                    );


                function update() {

                    current += increment;


                    if (
                        current >= target
                    ) {

                        counter.textContent =
                            target;

                        return;

                    }


                    counter.textContent =
                        Math.floor(current);


                    requestAnimationFrame(
                        update
                    );

                }


                update();

            }
        );

    }


    const statsSection =
        document.querySelector(
            ".stats"
        );


    if (statsSection) {

        const statsObserver =
            new IntersectionObserver(
                entries => {

                    if (
                        entries[0].isIntersecting
                    ) {

                        animateCounters();

                        statsObserver.disconnect();

                    }

                },
                {
                    threshold:.25
                }
            );


        statsObserver.observe(
            statsSection
        );

    }



    /* =====================================================
       06 — SCROLL PROGRESS
    ===================================================== */

    const progressBar =
        document.getElementById(
            "progressBar"
        );


    function updateProgress() {

        if (!progressBar)
            return;


        const scrollTop =
            window.scrollY;

        const documentHeight =
            document.documentElement
                .scrollHeight
            - window.innerHeight;


        const progress =
            documentHeight > 0
                ? (
                    scrollTop /
                    documentHeight
                ) * 100
                : 0;


        progressBar.style.width =
            progress + "%";

    }


    window.addEventListener(
        "scroll",
        updateProgress,
        { passive:true }
    );


    updateProgress();



    /* =====================================================
       07 — SCROLL TOP
    ===================================================== */

    const scrollTopButton =
        document.getElementById(
            "scrollTop"
        );


    if (scrollTopButton) {

        window.addEventListener(
            "scroll",
            () => {

                if (
                    window.scrollY > 500
                ) {

                    scrollTopButton.classList.add(
                        "show"
                    );

                } else {

                    scrollTopButton.classList.remove(
                        "show"
                    );

                }

            },
            { passive:true }
        );


        scrollTopButton.addEventListener(
            "click",
            () => {

                window.scrollTo({
                    top:0,
                    behavior:"smooth"
                });

            }
        );

    }



    /* =====================================================
       08 — CONTACT FORM
    ===================================================== */

    const contactForm =
        document.getElementById(
            "contactForm"
        );


    if (contactForm) {

        contactForm.addEventListener(
            "submit",
            event => {

                event.preventDefault();


                const button =
                    contactForm.querySelector(
                        "button[type='submit']"
                    );


                if (!button)
                    return;


                const originalText =
                    button.innerHTML;


                button.innerHTML =
                    "Sending...";


                button.disabled = true;


                setTimeout(
                    () => {

                        button.innerHTML =
                            "Message Sent ✓";


                        setTimeout(
                            () => {

                                button.innerHTML =
                                    originalText;

                                button.disabled =
                                    false;

                                contactForm.reset();

                            },
                            1400
                        );

                    },
                    600
                );

            }
        );

    }



    /* =====================================================
       09 — HERO MOUSE PARALLAX
    ===================================================== */

    const scene =
        document.querySelector(
            ".scene"
        );


    if (
        scene &&
        window.matchMedia(
            "(pointer:fine)"
        ).matches
    ) {

        let targetRotateX = 12;
        let targetRotateY = -12;

        let currentRotateX = 12;
        let currentRotateY = -12;


        window.addEventListener(
            "mousemove",
            event => {

                const x =
                    event.clientX /
                    window.innerWidth;

                const y =
                    event.clientY /
                    window.innerHeight;


                targetRotateY =
                    -12 +
                    (x - .5) * 10;


                targetRotateX =
                    12 -
                    (y - .5) * 8;

            },
            { passive:true }
        );


        function animateScene() {

            currentRotateX +=
                (
                    targetRotateX
                    - currentRotateX
                ) * .035;


            currentRotateY +=
                (
                    targetRotateY
                    - currentRotateY
                ) * .035;


            scene.style.transform =
                `
                translate(-50%,-50%)
                perspective(900px)
                rotateX(${currentRotateX}deg)
                rotateY(${currentRotateY}deg)
                `;


            requestAnimationFrame(
                animateScene
            );

        }


        animateScene();

    }



    /* =====================================================
       10 — NAVBAR SCROLL EFFECT
    ===================================================== */

    const header =
        document.querySelector(
            ".site-header"
        );


    if (header) {

        window.addEventListener(
            "scroll",
            () => {

                if (
                    window.scrollY > 40
                ) {

                    header.style.paddingTop =
                        "10px";

                } else {

                    header.style.paddingTop =
                        "18px";

                }

            },
            { passive:true }
        );

    }



    /* =====================================================
       11 — CURRENT YEAR
    ===================================================== */

    const year =
        document.getElementById(
            "year"
        );


    if (year) {

        year.textContent =
            new Date().getFullYear();

    }



    /* =====================================================
       12 — SMOOTH ANCHOR LINKS
    ===================================================== */

    document
        .querySelectorAll(
            'a[href^="#"]'
        )
        .forEach(link => {

            link.addEventListener(
                "click",
                event => {

                    const id =
                        link.getAttribute(
                            "href"
                        );


                    if (
                        !id ||
                        id === "#"
                    ) {

                        return;

                    }


                    const target =
                        document.querySelector(
                            id
                        );


                    if (!target)
                        return;


                    event.preventDefault();


                    const headerOffset =
                        85;


                    const position =
                        target.getBoundingClientRect()
                            .top
                        + window.scrollY
                        - headerOffset;


                    window.scrollTo({

                        top:position,

                        behavior:"smooth"

                    });

                }
            );

        });



    /* =====================================================
       13 — IMAGE ERROR PROTECTION
    ===================================================== */

    document
        .querySelectorAll(
            "img"
        )
        .forEach(img => {

            img.addEventListener(
                "error",
                () => {

                    img.style.opacity = "0";

                }
            );

        });



    /* =====================================================
       14 — PAGE READY
    ===================================================== */

    document.body.classList.add(
        "page-ready"
    );

});
