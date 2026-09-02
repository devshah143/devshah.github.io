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


/* Allow native scrolling inside modal */

const caseContainer =
    document.querySelector(".case-container");

if (caseContainer) {

    caseContainer.setAttribute(
        "data-lenis-prevent",
        ""
    );

}


/* LENIS RAF */

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

    const isMobile = window.innerWidth <= 768;

    const timeline = gsap.timeline();

    timeline

        /* HERO IMAGE */
        .from(".hero-visual", {

            opacity: 0,

            x: isMobile ? 40 : 100,

            scale: isMobile ? 0.96 : 0.92,

            duration: isMobile ? 1 : 1.4,

            ease: "power4.out"

        })


        /* NAV */
        .from(".nav", {

            y: -30,

            opacity: 0,

            duration: .8

        })


        /* KICKER */
        .from(".hero-kicker", {

            y: isMobile ? 20 : 30,

            opacity: 0,

            duration: .7

        })


        /* HERO HEADING */
        .from(".hero-line", {

            yPercent: 120,

            opacity: 0,

            stagger: isMobile ? .08 : .12,

            duration: isMobile ? .9 : 1.2,

            ease: "power4.out"

        }, "-=.4")


        /* DESCRIPTION */
        .from(".hero-description", {

            y: 20,

            opacity: 0,

            duration: .7

        }, "-=.4")


        /* EXPLORE BUTTON */
        .from(".explore-button", {

            scale: 0,

            opacity: 0,

            duration: .7,

            ease: "back.out(1.7)"

        }, "-=.4")


        /* SCROLL INDICATOR */
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

const orbMovement =
    window.innerWidth <= 768
        ? {
            x: -40,
            y: 50
        }
        : {
            x: -100,
            y: 80
        };


gsap.to(".hero-orb", {

    x: orbMovement.x,

    y: orbMovement.y,

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

/* =====================================================
   GRAPHIC DESIGN GALLERY
===================================================== */


/*
    Each category contains its own images.

    Add/remove images here as required.
*/

const galleries = {

    "social-media": {

        title: "Social Media",

        images: [

            "assets/galleries/social-media/01.jpg",

            "assets/galleries/social-media/02.jpg",

            "assets/galleries/social-media/03.jpg",

            "assets/galleries/social-media/04.jpg",

            "assets/galleries/social-media/05.jpg",

            "assets/galleries/social-media/06.jpg",

            "assets/galleries/social-media/07.jpg",

            "assets/galleries/social-media/08.jpg",

            "assets/galleries/social-media/09.jpg",

            "assets/galleries/social-media/10.jpg",

            "assets/galleries/social-media/11.jpg",

            "assets/galleries/social-media/12.jpg"

        ]

    },


    "menu": {

        title: "Menu Design",

        images: [

            "assets/galleries/menu/1.jpg",

            "assets/galleries/menu/2.jpg",

            "assets/galleries/menu/3.jpg",
            
            "assets/galleries/menu/4.jpg",

            "assets/galleries/menu/5.jpg",

            "assets/galleries/menu/6.jpg",

            "assets/galleries/menu/7.jpg",

            "assets/galleries/menu/8.jpg",

            "assets/galleries/menu/9.jpg",

            "assets/galleries/menu/10.jpg",

            "assets/galleries/menu/11.jpg",

            "assets/galleries/menu/12.jpg",

            "assets/galleries/menu/13.jpg",

            "assets/galleries/menu/14.jpg",

            "assets/galleries/menu/15.jpg",

            "assets/galleries/menu/16.jpg",

        ]

    },


    "pole-banners": {

        title: "Pole Banners",

        images: [

            "assets/galleries/pole-banners/1.jpg",

            "assets/galleries/pole-banners/2.jpg",

            "assets/galleries/pole-banners/3.jpg",

            "assets/galleries/pole-banners/4.jpg",

            "assets/galleries/pole-banners/5.jpg",

            "assets/galleries/pole-banners/6.jpg",

            "assets/galleries/pole-banners/7.jpg",

            "assets/galleries/pole-banners/8.jpg",

            "assets/galleries/pole-banners/9.jpg",

            "assets/galleries/pole-banners/10.jpg"

        ]

    },


    "visiting-cards": {

        title: "Visiting Cards",

        images: [

            "assets/galleries/visiting-cards/1.jpg",

            "assets/galleries/visiting-cards/2.jpg",

            "assets/galleries/visiting-cards/3.jpg",

            "assets/galleries/visiting-cards/4.jpg",

            "assets/galleries/visiting-cards/5.jpg",

            "assets/galleries/visiting-cards/6.jpg",

            "assets/galleries/visiting-cards/7.jpg"

        ]

    },


    "newspaper": {

        title: "Newspaper Insert",

        images: [

            "assets/galleries/newspaper/1.jpg",

            "assets/galleries/newspaper/2.jpg",

            "assets/galleries/newspaper/3.jpg",

            "assets/galleries/newspaper/4.jpg",

            "assets/galleries/newspaper/5.jpg",

            "assets/galleries/newspaper/6.jpg",

            "assets/galleries/newspaper/7.jpg",

            "assets/galleries/newspaper/8.jpg",

        ]

    },


    "handbook": {

        title: "Handbook Design",

        images: [

            "assets/galleries/handbook/01.jpg",

            "assets/galleries/handbook/02.jpg",

            "assets/galleries/handbook/03.jpg"

        ]

    },


    "catalogue": {

        title: "Catalogue Design",

        images: [

            "assets/galleries/catalogue/01.jpg",

            "assets/galleries/catalogue/02.jpg",

            "assets/galleries/catalogue/03.jpg"

        ]

    },


    "letterhead": {

        title: "Letterhead",

        images: [

            "assets/galleries/letterhead/01.jpg",

            "assets/galleries/letterhead/02.jpg"

        ]

    },


    "site-branding": {

        title: "Site Branding",

        images: [

            "assets/galleries/site-branding/01.jpg",

            "assets/galleries/site-branding/02.jpg",

            "assets/galleries/site-branding/03.jpg"

        ]

    },


    "brochure": {

        title: "Brochure Design",

        images: [

            "assets/galleries/brochure/01.jpg",

            "assets/galleries/brochure/02.jpg",

            "assets/galleries/brochure/03.jpg"

        ]

    }

};



/* =====================================================
   ELEMENTS
===================================================== */

const galleryModal =
    document.getElementById("galleryModal");

const galleryTitle =
    document.getElementById("galleryTitle");

const galleryMainImage =
    document.getElementById("galleryMainImage");

const galleryThumbnails =
    document.getElementById("galleryThumbnails");

const galleryCurrent =
    document.getElementById("galleryCurrent");

const galleryTotal =
    document.getElementById("galleryTotal");

const galleryClose =
    document.getElementById("galleryClose");

const galleryPrev =
    document.getElementById("galleryPrev");

const galleryNext =
    document.getElementById("galleryNext");


let currentGallery = null;

let currentIndex = 0;



/* =====================================================
   OPEN GALLERY
===================================================== */

document
    .querySelectorAll(".graphic-card")
    .forEach(card => {

        card.addEventListener(
            "click",
            () => {

                const galleryName =
                    card.dataset.gallery;

                openGallery(galleryName);

            }

        );

    });



function openGallery(name) {

    const gallery =
        galleries[name];

    if (!gallery) return;


    currentGallery = gallery;

    currentIndex = 0;


    galleryTitle.textContent =
        gallery.title;


    galleryTotal.textContent =
        String(gallery.images.length)
        .padStart(2, "0");


    createThumbnails();


    galleryModal.style.visibility =
        "visible";

    galleryModal.style.pointerEvents =
        "auto";


    gsap.to(galleryModal, {

        opacity: 1,

        duration: .5,

        ease: "power2.out"

    });


    gsap.fromTo(
        ".gallery-container",
        {
            y: 60,
            opacity: 0
        },
        {
            y: 0,
            opacity: 1,
            duration: .7,
            ease: "power4.out"
        }
    );


    document.body.style.overflow =
        "hidden";


    showImage(0);

}



/* =====================================================
   CLOSE
===================================================== */

function closeGallery() {

    gsap.to(galleryModal, {

        opacity: 0,

        duration: .4,

        ease: "power2.in",

        onComplete: () => {

            galleryModal.style.visibility =
                "hidden";

            galleryModal.style.pointerEvents =
                "none";

        }

    });


    document.body.style.overflow =
        "";

}


galleryClose.addEventListener(
    "click",
    closeGallery
);


document
    .querySelector(".gallery-overlay")
    .addEventListener(
        "click",
        closeGallery
    );



/* =====================================================
   SHOW IMAGE
===================================================== */

function showImage(index) {

    if (!currentGallery)
        return;


    const images =
        currentGallery.images;


    if (index < 0)
        index = images.length - 1;


    if (index >= images.length)
        index = 0;


    currentIndex = index;


    galleryMainImage.style.opacity =
        "0";


    galleryMainImage.src =
        images[currentIndex];


    galleryMainImage.onload =
        () => {

            gsap.fromTo(
                galleryMainImage,
                {
                    opacity: 0,
                    scale: .94,
                    y: 20
                },
                {
                    opacity: 1,
                    scale: 1,
                    y: 0,
                    duration: .6,
                    ease: "power3.out"
                }
            );

        };


    galleryCurrent.textContent =
        String(currentIndex + 1)
        .padStart(2, "0");


    updateThumbnails();

}



/* =====================================================
   NEXT / PREVIOUS
===================================================== */

galleryNext.addEventListener(
    "click",
    () => {

        showImage(
            currentIndex + 1
        );

    }
);


galleryPrev.addEventListener(
    "click",
    () => {

        showImage(
            currentIndex - 1
        );

    }
);



/* =====================================================
   THUMBNAILS
===================================================== */

function createThumbnails() {

    galleryThumbnails.innerHTML =
        "";


    currentGallery.images
        .forEach((image, index) => {

            const thumb =
                document.createElement("div");


            thumb.className =
                "gallery-thumb";


            thumb.innerHTML = `

                <img
                    src="${image}"
                    alt=""
                >

            `;


            thumb.addEventListener(
                "click",
                () => {

                    showImage(index);

                }
            );


            galleryThumbnails.appendChild(
                thumb
            );

        });

}



function updateThumbnails() {

    document
        .querySelectorAll(".gallery-thumb")
        .forEach(
            (thumb, index) => {

                thumb.classList.toggle(
                    "active",
                    index === currentIndex
                );

            }
        );

}



/* =====================================================
   KEYBOARD CONTROLS
===================================================== */

document.addEventListener(
    "keydown",
    e => {

        if (
            galleryModal.style.visibility
            !== "visible"
        ) return;


        if (e.key === "Escape") {

            closeGallery();

        }


        if (e.key === "ArrowRight") {

            showImage(
                currentIndex + 1
            );

        }


        if (e.key === "ArrowLeft") {

            showImage(
                currentIndex - 1
            );

        }

    }
);

// /* =====================================================
//    CASE STUDY POPUP
// ===================================================== */

// const caseStudies = {

//     footspot: {

//         title: "FootSpot",

//         project: "FootSpot",

//         type: "UI/UX Design",

//         year: "2025",

//         image:
//             "assets/case-studies/footspot.jpg",

//         link: "#"

//     },


//     fuelbuddy: {

//         title: "Fuel Buddy",

//         project: "Fuel Buddy",

//         type: "UI/UX Design",

//         year: "2025",

//         image:
//             "assets/case-studies/fuelbuddy.jpg",

//         link: "#"

//     },


//     amul: {

//         title: "Amul",

//         project: "Amul",

//         type: "Website Design",

//         year: "2025",

//         image:
//             "assets/case-studies/amul.jpg",

//         link: "#"

//     },


//     cashmonk: {

//         title: "Cashmonk",

//         project: "Cashmonk",

//         type: "UI/UX Design",

//         year: "2024",

//         image:
//             "assets/case-studies/cashmonk.jpg",

//         link: "#"

//     },


//     quotes: {

//         title: "11000 Quotes",

//         project: "11000 Quotes",

//         type: "Mobile App",

//         year: "2024",

//         image:
//             "assets/case-studies/quotes.jpg",

//         link: "#"

//     }

// };



// /* ELEMENTS */

// const caseModal =
//     document.getElementById("caseModal");

// const caseTitle =
//     document.getElementById("caseTitle");

// const caseImage =
//     document.getElementById("caseImage");

// const caseProject =
//     document.getElementById("caseProject");

// const caseType =
//     document.getElementById("caseType");

// const caseYear =
//     document.getElementById("caseYear");

// const caseLink =
//     document.getElementById("caseLink");

// const caseClose =
//     document.getElementById("caseClose");



// /* OPEN */

// document
//     .querySelectorAll(".work-card")
//     .forEach(card => {

//         card.addEventListener(
//             "click",
//             () => {

//                 const id =
//                     card.dataset.caseStudy;

//                 openCaseStudy(id);

//             }
//         );

//     });



// function openCaseStudy(id) {

//     const project =
//         caseStudies[id];

//     if (!project) return;


//     caseTitle.textContent =
//         project.title;

//     caseProject.textContent =
//         project.project;

//     caseType.textContent =
//         project.type;

//     caseYear.textContent =
//         project.year;

//     caseImage.src =
//         project.image;

//     caseLink.href =
//         project.link;


//     caseModal.style.visibility =
//         "visible";

//     caseModal.style.pointerEvents =
//         "auto";


//     document.body.style.overflow =
//         "hidden";


//     gsap.to(caseModal, {

//         opacity: 1,

//         duration: .5,

//         ease: "power2.out"

//     });


//     gsap.fromTo(
//         ".case-container",
//         {
//             y: 70,
//             opacity: 0
//         },
//         {
//             y: 0,
//             opacity: 1,
//             duration: .7,
//             ease: "power4.out"
//         }
//     );


//     caseImage.onload = () => {

//         gsap.fromTo(
//             caseImage,
//             {
//                 opacity: 0,
//                 scale: .9,
//                 y: 30
//             },
//             {
//                 opacity: 1,
//                 scale: 1,
//                 y: 0,
//                 duration: .8,
//                 ease: "power3.out"
//             }
//         );

//     };

// }



// /* CLOSE */

// function closeCaseStudy() {

//     gsap.to(caseModal, {

//         opacity: 0,

//         duration: .4,

//         ease: "power2.in",

//         onComplete: () => {

//             caseModal.style.visibility =
//                 "hidden";

//             caseModal.style.pointerEvents =
//                 "none";

//         }

//     });


//     document.body.style.overflow =
//         "";

// }


// caseClose.addEventListener(
//     "click",
//     closeCaseStudy
// );


// document
//     .querySelector(".case-overlay")
//     .addEventListener(
//         "click",
//         closeCaseStudy
//     );



// /* ESC */

// document.addEventListener(
//     "keydown",
//     e => {

//         if (
//             e.key === "Escape" &&
//             caseModal.style.visibility === "visible"
//         ) {

//             closeCaseStudy();

//         }

//     }
// );

/* =====================================================
   CASE STUDY POPUP
===================================================== */


/* -----------------------------------------------------
   CASE STUDY DATA
----------------------------------------------------- */

const caseStudies = {

    footspot: {

        title: "FootSpot",

        project: "FootSpot",

        type: "E-Commerce App · UI/UX Design",

        year: "2025",

        image:
            "assets/case-studies/footspot/footspot.png",

        link: "#"

    },


    fuelbuddy: {

        title: "Fuel Buddy",

        project: "Fuel Buddy",

        type: "E-Commerce App · UI/UX Design",

        year: "2025",

        image:
            "assets/case-studies/fuelbuddy/fuelbuddy.png",

        link: "#"

    },


    amul: {

        title: "Amul Website Redesign",

        project: "Amul Website Redesign",

        type: "B2B / B2C · Website Redesign",

        year: "2025",

        image:
            "assets/case-studies/amul/amul.png",

        link: "#"

    },


    cashmonk: {

        title: "Cashmonk",

        project: "Cashmonk",

        type: "App Redesign · UI/UX",

        year: "2025",

        image:
            "assets/case-studies/cashmonk/case-study.jpg",

        link: "#"

    },


    quotes: {

        title: "11000 Quotes App",

        project: "11000 Quotes App",

        type: "App Redesign · UI/UX",

        year: "2025",

        image:
            "assets/case-studies/quotes/case-study.jpg",

        link: "#"

    }

};



/* -----------------------------------------------------
   ELEMENTS
----------------------------------------------------- */

const caseModal =
    document.getElementById("caseModal");

const caseTitle =
    document.getElementById("caseTitle");

const caseImage =
    document.getElementById("caseImage");

const caseProject =
    document.getElementById("caseProject");

const caseType =
    document.getElementById("caseType");

const caseYear =
    document.getElementById("caseYear");

const caseLink =
    document.getElementById("caseLink");

const caseClose =
    document.getElementById("caseClose");

const caseOverlay =
    document.querySelector(".case-overlay");



/* -----------------------------------------------------
   PROJECT CLICK
----------------------------------------------------- */

document
    .querySelectorAll(".project[data-case-study]")
    .forEach(project => {

        project.addEventListener(
            "click",
            () => {

                const name =
                    project.dataset.caseStudy;

                openCaseStudy(name);

            }

        );

    });



/* -----------------------------------------------------
   OPEN CASE STUDY
----------------------------------------------------- */

function openCaseStudy(name) {

    const data =
        caseStudies[name];

    if (!data) {

        console.warn(
            "Case study not found:",
            name
        );

        return;

    }


    /* CONTENT */

    caseTitle.textContent =
        data.title;

    caseProject.textContent =
        data.project;

    caseType.textContent =
        data.type;

    caseYear.textContent =
        data.year;


    /* IMAGE */

    caseImage.src =
        data.image;

    caseImage.alt =
        data.title;


    /* LINK */

    caseLink.href =
        data.link;


    /* SHOW */

    caseModal.style.visibility =
        "visible";

    caseModal.style.pointerEvents =
        "auto";


    document.body.style.overflow =
        "hidden";


    /* RESET */

    gsap.set(
        ".case-container",
        {
            y: 70,
            opacity: 0
        }
    );


    gsap.set(
        caseImage,
        {
            opacity: 0,
            y: 40,
            scale: .97
        }
    );


    /* MODAL FADE */

    gsap.to(
        caseModal,
        {

            opacity: 1,

            duration: .45,

            ease: "power2.out"

        }
    );


    /* CONTAINER */

    gsap.to(
        ".case-container",
        {

            y: 0,

            opacity: 1,

            duration: .7,

            ease: "power4.out"

        }
    );


    /* IMAGE */

    caseImage.onload =
        () => {

            gsap.to(
                caseImage,
                {

                    opacity: 1,

                    y: 0,

                    scale: 1,

                    duration: .8,

                    delay: .15,

                    ease: "power4.out"

                }
            );

        };

}



/* -----------------------------------------------------
   CLOSE CASE STUDY
----------------------------------------------------- */

function closeCaseStudy() {

    gsap.to(
        ".case-container",
        {

            y: 50,

            opacity: 0,

            duration: .4,

            ease: "power2.in"

        }
    );


    gsap.to(
        caseModal,
        {

            opacity: 0,

            duration: .45,

            delay: .1,

            ease: "power2.in",

            onComplete: () => {

                caseModal.style.visibility =
                    "hidden";

                caseModal.style.pointerEvents =
                    "none";

                document.body.style.overflow =
                    "";

                caseImage.src = "";

            }

        }
    );

}



/* -----------------------------------------------------
   CLOSE BUTTON
----------------------------------------------------- */

caseClose.addEventListener(
    "click",
    closeCaseStudy
);



/* -----------------------------------------------------
   BACKGROUND CLICK
----------------------------------------------------- */

caseOverlay.addEventListener(
    "click",
    closeCaseStudy
);



/* -----------------------------------------------------
   ESC KEY
----------------------------------------------------- */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape" &&
            caseModal.style.visibility === "visible"
        ) {

            closeCaseStudy();

        }

    }
);
