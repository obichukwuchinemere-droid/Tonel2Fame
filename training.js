
/* =========================================
   TONEL2FAME — HAIR ACADEMY
   PAGE INTERACTIONS
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    // =====================================
    // PAGE LOADER
    // =====================================

    const trainingLoader = document.getElementById("trainingLoader");

    function hideTrainingLoader() {
        if (trainingLoader) {
            trainingLoader.classList.add("hide");
        }
    }

    window.addEventListener("load", hideTrainingLoader);

    // Fallback in case some images take too long
    setTimeout(hideTrainingLoader, 2500);


    // =====================================
    // MOBILE SIDE NAVIGATION
    // =====================================

    const menuToggle = document.getElementById("trainingMenuToggle");
    const navLinks = document.getElementById("trainingNavLinks");
    const navItems = navLinks
        ? navLinks.querySelectorAll("a")
        : [];

    function openMenu() {
        if (!menuToggle || !navLinks) return;

        menuToggle.classList.add("active");
        navLinks.classList.add("active");

        document.body.classList.add("menu-open");

        menuToggle.setAttribute("aria-expanded", "true");
        menuToggle.setAttribute("aria-label", "Close navigation menu");
    }

    function closeMenu() {
        if (!menuToggle || !navLinks) return;

        menuToggle.classList.remove("active");
        navLinks.classList.remove("active");

        document.body.classList.remove("menu-open");

        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation menu");
    }

    if (menuToggle && navLinks) {

        menuToggle.addEventListener("click", () => {
            const isOpen = navLinks.classList.contains("active");

            if (isOpen) {
                closeMenu();
            } else {
                openMenu();
            }
        });


        // Close menu when a link is clicked
        navItems.forEach(link => {
            link.addEventListener("click", closeMenu);
        });


        // Close menu when clicking outside
        document.addEventListener("click", event => {

            const clickedInsideMenu = navLinks.contains(event.target);
            const clickedToggle = menuToggle.contains(event.target);

            if (!clickedInsideMenu && !clickedToggle) {
                closeMenu();
            }

        });


        // Close menu with Escape key
        document.addEventListener("keydown", event => {

            if (event.key === "Escape") {
                closeMenu();
            }

        });


        // Close menu if screen becomes desktop-sized
        window.addEventListener("resize", () => {

            if (window.innerWidth > 850) {
                closeMenu();
            }

        });

    }


    // =====================================
    // SCROLL REVEAL ANIMATIONS
    // =====================================

    const revealElements = document.querySelectorAll(".reveal");

    if ("IntersectionObserver" in window) {

        const revealObserver = new IntersectionObserver(
            (entries, observer) => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("revealed");

                        observer.unobserve(entry.target);

                    }

                });

            },
            {
                threshold: 0.12,
                rootMargin: "0px 0px -40px 0px"
            }
        );


        revealElements.forEach(element => {
            revealObserver.observe(element);
        });

    } else {

        // Fallback for older browsers
        revealElements.forEach(element => {
            element.classList.add("revealed");
        });

    }


    // =====================================
    // FOOTER YEAR
    // =====================================

    const trainingYear = document.getElementById("trainingYear");

    if (trainingYear) {
        trainingYear.textContent = new Date().getFullYear();
    }


    // =====================================
    // SMOOTH INTERNAL NAVIGATION
    // =====================================

    document.querySelectorAll('a[href^="#"]').forEach(link => {

        link.addEventListener("click", event => {

            const targetId = link.getAttribute("href");

            if (!targetId || targetId === "#") return;

            const target = document.querySelector(targetId);

            if (target) {

                event.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }

        });

    });

});
