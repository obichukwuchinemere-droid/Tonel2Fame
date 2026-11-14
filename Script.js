
/* =========================================
   TONEL2FAME — WEBSITE INTERACTIONS
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    
// MOBILE NAVIGATION
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const navBackdrop = document.getElementById("navBackdrop");

const navItems = navLinks
    ? navLinks.querySelectorAll("a")
    : [];

function closeMenu() {
    if (!menuToggle || !navLinks) return;

    menuToggle.classList.remove("active");
    navLinks.classList.remove("active");

    if (navBackdrop) {
        navBackdrop.classList.remove("active");
    }

    menuToggle.setAttribute("aria-expanded", "false");
}

if (menuToggle && navLinks) {

    menuToggle.addEventListener("click", () => {
        const isOpen = navLinks.classList.toggle("active");

        menuToggle.classList.toggle("active", isOpen);

        if (navBackdrop) {
            navBackdrop.classList.toggle("active", isOpen);
        }

        menuToggle.setAttribute("aria-expanded", String(isOpen));
    });

    navItems.forEach(link => {
        link.addEventListener("click", closeMenu);
    });

    if (navBackdrop) {
        navBackdrop.addEventListener("click", closeMenu);
    }

    document.addEventListener("click", event => {
        const clickedInsideMenu =
            navLinks.contains(event.target) ||
            menuToggle.contains(event.target);

        if (!clickedInsideMenu) {
            closeMenu();
        }
    });

    document.addEventListener("keydown", event => {
        if (event.key === "Escape") {
            closeMenu();
        }
    });
}

    // SCROLL REVEAL FOUNDATION
    const revealElements = document.querySelectorAll(
        ".reveal, .reveal-left, .reveal-right"
    );

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
                threshold: 0.12
            }
        );

        revealElements.forEach(element => {
            revealObserver.observe(element);
        });

    } else {
        revealElements.forEach(element => {
            element.classList.add("revealed");
        });
    }

    // UPDATE FOOTER YEAR
    const yearElement = document.getElementById("currentYear");

    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }


    // =====================================
    // GALLERY CATEGORY FILTERS
    // =====================================

    const filterButtons = document.querySelectorAll(".filter-btn");
    const galleryItems = document.querySelectorAll(".gallery-item");

    filterButtons.forEach(button => {

        button.addEventListener("click", () => {

            const filter = button.dataset.filter;

            filterButtons.forEach(btn => {
                btn.classList.remove("active");
            });

            button.classList.add("active");

            galleryItems.forEach(item => {

                const category = item.dataset.category;

                const shouldShow =
                    filter === "all" || category === filter;

                item.classList.toggle("is-hidden", !shouldShow);

            });

        });

    });


    // =====================================
    // GALLERY LIGHTBOX
    // =====================================

    const lightbox = document.getElementById("lightbox");
    const lightboxImage = document.getElementById("lightboxImage");
    const lightboxCaption = document.getElementById("lightboxCaption");

    const lightboxClose = document.getElementById("lightboxClose");
    const lightboxPrev = document.getElementById("lightboxPrev");
    const lightboxNext = document.getElementById("lightboxNext");

    let currentGalleryIndex = 0;
    let visibleGalleryItems = [];

    function updateVisibleGallery() {

        visibleGalleryItems = Array.from(galleryItems).filter(item => {
            return !item.classList.contains("is-hidden");
        });

    }

    function showGalleryImage(index) {

        updateVisibleGallery();

        if (!visibleGalleryItems.length) return;

        currentGalleryIndex =
            (index + visibleGalleryItems.length) %
            visibleGalleryItems.length;

        const item = visibleGalleryItems[currentGalleryIndex];

        const image = item.querySelector("img");
        const caption = item.querySelector(".gallery-item-overlay span");

        lightboxImage.src = image.src;
        lightboxImage.alt = image.alt;

        lightboxCaption.textContent =
            caption ? caption.textContent : image.alt;

    }

    function openLightbox(item) {

    if (!lightbox || !lightboxImage || !lightboxCaption) return;

    updateVisibleGallery();

    currentGalleryIndex = visibleGalleryItems.indexOf(item);

    if (currentGalleryIndex < 0) return;

    showGalleryImage(currentGalleryIndex);

    lightbox.classList.add("active");
    lightbox.setAttribute("aria-hidden", "false");

    document.body.style.overflow = "hidden";

    if (lightboxClose) {
        lightboxClose.focus();
    }

}

    function closeLightbox() {

    if (!lightbox) return;

    lightbox.classList.remove("active");
    lightbox.setAttribute("aria-hidden", "true");

    document.body.style.overflow = "";

}

    galleryItems.forEach(item => {

        const viewButton = item.querySelector(".gallery-view");

        if (viewButton) {
            viewButton.addEventListener("click", () => {
                openLightbox(item);
            });
        }

        // Allow opening by clicking the image itself
        item.querySelector("img").addEventListener("click", () => {
            openLightbox(item);
        });

    });

    if (lightboxClose) {
        lightboxClose.addEventListener("click", closeLightbox);
    }

    if (lightboxPrev) {
        lightboxPrev.addEventListener("click", () => {
            showGalleryImage(currentGalleryIndex - 1);
        });
    }

    if (lightboxNext) {
        lightboxNext.addEventListener("click", () => {
            showGalleryImage(currentGalleryIndex + 1);
        });
    }

    if (lightbox) {

        lightbox.addEventListener("click", event => {

            if (event.target === lightbox) {
                closeLightbox();
            }

        });

        document.addEventListener("keydown", event => {

            if (!lightbox.classList.contains("active")) return;

            if (event.key === "Escape") {
                closeLightbox();
            }

            if (event.key === "ArrowRight") {
                showGalleryImage(currentGalleryIndex + 1);
            }

            if (event.key === "ArrowLeft") {
                showGalleryImage(currentGalleryIndex - 1);
            }

        });

    }

// =====================================
// TONEL2FAME WHATSAPP BOOKING FORM
// =====================================

const appointmentForm = document.getElementById("appointmentForm");

if (appointmentForm) {
    appointmentForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const name = document.getElementById("clientName").value.trim();
        const phone = document.getElementById("clientPhone").value.trim();
        const service = document.getElementById("clientService").value;
        const date = document.getElementById("appointmentDate").value;
        const message = document.getElementById("clientMessage").value.trim();

        if (!name || !phone || !service) {
    alert("Please complete all required fields.");
    return;
}

// Validate phone number
const cleanPhone = phone.replace(/[\s\-()+]/g, "");

if (!/^\d{10,15}$/.test(cleanPhone)) {
    alert("Please enter a valid phone number.");
    return;
}

        const whatsappNumber = "2349161711509";

        const bookingMessage = `
Hello Tonel2Fame!

I would like to make an appointment enquiry.

Name: ${name}
Phone Number: ${cleanPhone}
Service: ${service}
Preferred Date: ${date || "Not specified"}

Additional Message:
${message || "No additional message."}

Please let me know your availability and the next steps.

Thank you!
        `.trim();

        const whatsappURL =
            `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(bookingMessage)}`;

        window.open(whatsappURL, "_blank", "noopener,noreferrer");
    });
}

// Prevent customers from selecting past appointment dates
const appointmentDate = document.getElementById("appointmentDate");

if (appointmentDate) {
    const today = new Date();
    const localDate = new Date(
        today.getTime() - today.getTimezoneOffset() * 60000
    ).toISOString().split("T")[0];

    appointmentDate.min = localDate;
}

// SCROLL PROGRESS INDICATOR

const scrollProgress = document.getElementById("scrollProgress");

if (scrollProgress) {

    function updateScrollProgress() {

        const scrollableHeight =
            document.documentElement.scrollHeight - window.innerHeight;

        const progress = scrollableHeight > 0
            ? (window.scrollY / scrollableHeight) * 100
            : 0;

        scrollProgress.style.width = `${progress}%`;

    }

    window.addEventListener("scroll", updateScrollProgress, {
        passive: true
    });

    updateScrollProgress();
}

});
