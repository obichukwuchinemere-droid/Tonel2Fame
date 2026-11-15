
document.addEventListener("DOMContentLoaded", () => {

    // PAGE LOADER
    const loader = document.getElementById("pageLoader");

    const hideLoader = () => {
        if (loader) loader.classList.add("loaded");
    };

    window.addEventListener("load", hideLoader, { once: true });
    setTimeout(hideLoader, 2500);


    // MOBILE SIDE NAVIGATION
    const menuToggle = document.getElementById("galleryMenuToggle");
    const nav = document.getElementById("galleryNav");
    const navBackdrop = document.getElementById("navBackdrop");
    function closeMenu() {
        if (!menuToggle || !nav) return;

        menuToggle.classList.remove("active");
        nav.classList.remove("active");
        if (navBackdrop) {
            navBackdrop.classList.remove("active");
        }
        menuToggle.setAttribute("aria-expanded", "false");
        
    }

    if (menuToggle && nav) {

        menuToggle.addEventListener("click", () => {
            const open = nav.classList.toggle("active");

            menuToggle.classList.toggle("active", open);

            if (navBackdrop) {
                navBackdrop.classList.toggle("active", open);
            }
           
            menuToggle.setAttribute("aria-expanded", String(open));
        });

        nav.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", closeMenu);
        });

        if (navBackdrop) {
            navBackdrop.addEventListener("click", closeMenu);
        }

        document.addEventListener("keydown", event => {
            if (event.key === "Escape") closeMenu();
        });

        document.addEventListener("click", event => {
            if (
                nav.classList.contains("active") &&
                !nav.contains(event.target) &&
                !menuToggle.contains(event.target)
            ) {
                closeMenu();
            }
        });
    }


    // CURRENT YEAR
    const year = document.getElementById("currentYear");

    if (year) {
        year.textContent = new Date().getFullYear();
    }


    // SCROLL REVEAL
    const revealElements = document.querySelectorAll(".reveal");

    if ("IntersectionObserver" in window) {

        const observer = new IntersectionObserver((entries, observer) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {
                    entry.target.classList.add("revealed");
                    observer.unobserve(entry.target);
                }

            });

        }, {
            threshold: 0.12
        });

        revealElements.forEach(element => observer.observe(element));

    } else {
        revealElements.forEach(element => element.classList.add("revealed"));
    }


    // CATEGORY FILTERS
    const filterButtons = document.querySelectorAll(".gallery-filter");
    const cards = document.querySelectorAll(".gallery-card");

    filterButtons.forEach(button => {

        button.addEventListener("click", () => {

            const filter = button.dataset.filter;

            filterButtons.forEach(btn => btn.classList.remove("active"));
            button.classList.add("active");

            cards.forEach(card => {

                const matches =
                    filter === "all" ||
                    card.dataset.category === filter;

                card.classList.toggle("is-hidden", !matches);

                if (matches) {
                    card.classList.remove("revealed");

                    requestAnimationFrame(() => {
                        card.classList.add("revealed");
                    });
                }

            });

        });

    });


    // LIGHTBOX
    const lightbox = document.getElementById("galleryLightbox");
    const lightboxImage = document.getElementById("lightboxImage");
    const lightboxCaption = document.getElementById("lightboxCaption");

    const closeButton = document.getElementById("lightboxClose");
    const previousButton = document.getElementById("lightboxPrev");
    const nextButton = document.getElementById("lightboxNext");

    let currentIndex = 0;
    let visibleCards = [];

    function updateVisibleCards() {
        visibleCards = Array.from(cards).filter(card => {
            return !card.classList.contains("is-hidden");
        });
    }

    function showImage(index) {

        updateVisibleCards();

        if (!visibleCards.length) return;

        currentIndex = (index + visibleCards.length) % visibleCards.length;

        const card = visibleCards[currentIndex];
        const image = card.querySelector("img");
        const caption = card.querySelector(".gallery-caption h3");

        if (!image) return;

        lightboxImage.src = image.src;
        lightboxImage.alt = image.alt;

        lightboxCaption.textContent = caption
            ? caption.textContent
            : image.alt;
    }

    function openLightbox(card) {

        if (!lightbox) return;

        updateVisibleCards();

        currentIndex = visibleCards.indexOf(card);

        if (currentIndex < 0) return;

        showImage(currentIndex);

        lightbox.classList.add("active");
        lightbox.setAttribute("aria-hidden", "false");

        document.body.style.overflow = "hidden";

        if (closeButton) closeButton.focus();
    }

    function closeLightbox() {

        if (!lightbox) return;

        lightbox.classList.remove("active");
        lightbox.setAttribute("aria-hidden", "true");

        document.body.style.overflow = "";

    }

    cards.forEach(card => {

        const image = card.querySelector("img");
        const openButton = card.querySelector(".image-open");

        if (image) {
            image.style.cursor = "pointer";
            image.addEventListener("click", () => openLightbox(card));
        }

        if (openButton) {
            openButton.addEventListener("click", () => openLightbox(card));
        }

    });

    if (closeButton) {
        closeButton.addEventListener("click", closeLightbox);
    }

    if (previousButton) {
        previousButton.addEventListener("click", () => {
            showImage(currentIndex - 1);
        });
    }

    if (nextButton) {
        nextButton.addEventListener("click", () => {
            showImage(currentIndex + 1);
        });
    }

    if (lightbox) {

        lightbox.addEventListener("click", event => {
            if (event.target === lightbox) closeLightbox();
        });

        document.addEventListener("keydown", event => {

            if (!lightbox.classList.contains("active")) return;

            if (event.key === "Escape") closeLightbox();

            if (event.key === "ArrowRight") {
                showImage(currentIndex + 1);
            }

            if (event.key === "ArrowLeft") {
                showImage(currentIndex - 1);
            }

        });
    }

});
