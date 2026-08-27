/* =====================================================
   GSAP
===================================================== */

gsap.registerPlugin(ScrollTrigger);


/* =====================================================
   PRELOADER
===================================================== */

const counter = document.querySelector(".loader-counter");
const loaderLine = document.querySelector(".loader-line::after");

let progress = 0;

const loader = setInterval(() => {

    progress += Math.floor(Math.random() * 8) + 3;

    if (progress >= 100) {

        progress = 100;

        clearInterval(loader);

        gsap.to(".loader-counter", {
            opacity: 0,
            duration: .3
        });

        gsap.to(".preloader", {
            yPercent: -100,
            duration: 1.2,
            ease: "power4.inOut",
            delay: .3
        });

        startHero();

    }

    counter.textContent =
        String(progress).padStart(2, "0");

}, 80);


/* =====================================================
   LENIS SMOOTH SCROLL
===================================================== */

const lenis = new Lenis({
    duration: 1.2,
    smoothWheel: true
});


function raf(time) {

    lenis.raf(time);

    requestAnimationFrame(raf);

}

requestAnimationFrame(raf);


/* =====================================================
   CUSTOM CURSOR
===================================================== */

const cursor =
    document.querySelector(".cursor");

const ring =
    document.querySelector(".cursor-ring");


let mouseX = 0;
let mouseY = 0;

let ringX = 0;
let ringY = 0;


window.addEventListener("mousemove", e => {

    mouseX = e.clientX;
    mouseY = e.clientY;

    gsap.to(cursor, {

        x: mouseX,
        y: mouseY,

        duration: .1

    });

});


function cursorAnimation() {

    ringX +=
        (mouseX - ringX) * .12;

    ringY +=
        (mouseY - ringY) * .12;


    gsap.set(ring, {

        x: ringX,
        y: ringY

    });


    requestAnimationFrame(cursorAnimation);

}

cursorAnimation();


/* =====================================================
   HERO
===================================================== */

function startHero() {

    const timeline = gsap.timeline();

    timeline

    
         .from(".hero-visual", {

            opacity: 0,

            x: 100,

            scale: .92,

            duration: 1.4,

            ease: "power4.out"

        }, "-=1")


        .from(".nav", {

            y: -30,

            opacity: 0,

            duration: .8

        })


        .from(".hero-kicker", {

            y: 30,

            opacity: 0,

            duration: .8

        })


        .from(".hero-line", {

            yPercent: 120,

            opacity: 0,

            stagger: .12,

            duration: 1.2,

            ease: "power4.out"

        }, "-=.5")


        .from(".hero-description", {

            y: 30,

            opacity: 0,

            duration: .8

        }, "-=.5")


        .from(".explore-button", {

            scale: 0,

            opacity: 0,

            duration: .7,

            ease: "back.out(1.7)"

        }, "-=.5")


        .from(".hero-scroll", {

            opacity: 0,

            duration: .8

        });

}


/* =====================================================
   SCROLL REVEALS
===================================================== */

gsap.utils
    .toArray(".reveal")
    .forEach(element => {

        gsap.from(element, {

            y: 80,

            opacity: 0,

            duration: 1,

            ease: "power3.out",

            scrollTrigger: {

                trigger: element,

                start: "top 85%",

                toggleActions:
                    "play none none reverse"

            }

        });

    });


/* =====================================================
   PROJECT PARALLAX
===================================================== */

gsap.utils
    .toArray(".project-visual img")
    .forEach(image => {

        gsap.to(image, {

            yPercent: 8,

            ease: "none",

            scrollTrigger: {

                trigger: image,

                start: "top bottom",

                end: "bottom top",

                scrub: true

            }

        });

    });


/* =====================================================
   HERO ORB
===================================================== */

gsap.to(".hero-orb", {

    x: -100,

    y: 80,

    duration: 6,

    repeat: -1,

    yoyo: true,

    ease: "sine.inOut"

});


/* =====================================================
   CONTACT GLOW
===================================================== */

gsap.to(".contact-glow", {

    x: -100,

    y: -100,

    duration: 7,

    repeat: -1,

    yoyo: true,

    ease: "sine.inOut"

});


/* =====================================================
   MAGNETIC EXPLORE BUTTON
===================================================== */

const explore =
    document.querySelector(".explore-button");


if (explore) {

    explore.addEventListener(
        "mousemove",
        e => {

            const rect =
                explore.getBoundingClientRect();


            const x =
                e.clientX -
                rect.left -
                rect.width / 2;


            const y =
                e.clientY -
                rect.top -
                rect.height / 2;


            gsap.to(explore, {

                x: x * .25,

                y: y * .25,

                duration: .4

            });

        }
    );


    explore.addEventListener(
        "mouseleave",
        () => {

            gsap.to(explore, {

                x: 0,

                y: 0,

                duration: .6,

                ease:
                    "elastic.out(1,.3)"

            });

        }
    );

}


/* =====================================================
   CURSOR LINK EFFECT
===================================================== */

document
    .querySelectorAll("a, .project")
    .forEach(element => {


        element.addEventListener(
            "mouseenter",
            () => {

                gsap.to(ring, {

                    scale: 1.7,

                    duration: .3

                });

            }
        );


        element.addEventListener(
            "mouseleave",
            () => {

                gsap.to(ring, {

                    scale: 1,

                    duration: .3

                });

            }
        );

    });


/* =====================================================
   EXPERTISE HOVER
===================================================== */

document
    .querySelectorAll(".expertise-row")
    .forEach(row => {


        row.addEventListener(
            "mouseenter",
            () => {

                gsap.to(
                    row.querySelector("h3"),
                    {

                        x: 20,

                        duration: .4,

                        ease: "power2.out"

                    }
                );

            }
        );


        row.addEventListener(
            "mouseleave",
            () => {

                gsap.to(
                    row.querySelector("h3"),
                    {

                        x: 0,

                        duration: .4

                    }
                );

            }
        );

    });


/* =====================================================
   ACTIVE NAV
===================================================== */

const sections =
    document.querySelectorAll("section[id]");

const navLinks =
    document.querySelectorAll(".nav nav a");


window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        const sectionTop =
            section.offsetTop - 300;

        if (
            window.scrollY >= sectionTop
        ) {

            current =
                section.getAttribute("id");

        }

    });


    navLinks.forEach(link => {

        link.classList.remove("active");

        if (
            link.getAttribute("href") ===
            `#${current}`
        ) {

            link.classList.add("active");

        }

    });

});

/* =====================================================
   HERO IMAGE PARALLAX
===================================================== */

const heroVisual =
    document.querySelector(".hero-visual img");


if (heroVisual && window.innerWidth > 768) {

    window.addEventListener("mousemove", (e) => {

        const x =
            (e.clientX / window.innerWidth - .5);

        const y =
            (e.clientY / window.innerHeight - .5);


        gsap.to(heroVisual, {

            x: x * 25,

            y: y * 20,

            rotateY: x * 3,

            rotateX: -y * 3,

            duration: 1.2,

            ease: "power3.out"

        });

    });

}