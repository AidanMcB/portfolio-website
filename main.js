const mainEl = document.querySelector('.main');
const hamburgerBtn = document.getElementById('hamburger-btn');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const sectionEls = document.querySelectorAll('.view-container');

function setMenuOpen(isOpen) {
    if (!hamburgerBtn || !navMenu) return;
    hamburgerBtn.classList.toggle('active', isOpen);
    navMenu.classList.toggle('active', isOpen);
    hamburgerBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
}

function setActiveNav(id) {
    navLinks.forEach((link) => {
        const target = link.getAttribute('data-target');
        if (target === id) {
            link.setAttribute('aria-current', 'page');
        } else {
            link.removeAttribute('aria-current');
        }
    });
}

function setupSectionNavObserver() {
    if (!mainEl || !sectionEls.length) return;
    const navObserver = new IntersectionObserver(
        (entries) => {
            const visible = entries
                .filter((e) => e.isIntersecting && e.target.id)
                .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
            if (visible.length) {
                setActiveNav(visible[0].target.id);
            }
        },
        { root: mainEl, threshold: [0.35, 0.5, 0.65] }
    );
    sectionEls.forEach((sec) => navObserver.observe(sec));
}

if (hamburgerBtn && navMenu) {
    hamburgerBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const willOpen = !navMenu.classList.contains('active');
        setMenuOpen(willOpen);
    });
}

navLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('data-target');
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
            const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
            targetElement.scrollIntoView({ behavior: prefersReduced ? 'auto' : 'smooth', block: 'start' });
        }

        setMenuOpen(false);
    });
});

document.addEventListener('click', (e) => {
    if (!e.target.closest('.hamburger-menu')) {
        setMenuOpen(false);
    }
});

setupSectionNavObserver();

const aboutView = document.getElementById('about-view');
const skillRows = document.querySelectorAll('.skill-row');
let skillsAnimated = false;

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (prefersReducedMotion) {
    skillRows.forEach((row, index) => {
        const skillItems = row.querySelector('.skill-items');
        if (!skillItems) return;
        skillItems.classList.add(index % 2 === 0 ? 'animate' : 'animate-right');
    });
    skillsAnimated = true;
} else {
    const observerOptions = {
        root: null,
        threshold: 0.3,
        rootMargin: '0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting && !skillsAnimated) {
                skillsAnimated = true;

                skillRows.forEach((row, index) => {
                    const skillItems = row.querySelector('.skill-items');
                    if (!skillItems) return;
                    if (index % 2 === 0) {
                        skillItems.classList.add('animate');
                    } else {
                        skillItems.classList.add('animate-right');
                    }
                });
            }
        });
    }, observerOptions);

    if (aboutView) {
        observer.observe(aboutView);
    }
}

const sendBtn = document.getElementById('send-email-button');
const emailInput = document.getElementById('contact-email-input');
const messageInput = document.getElementById('contact-message-input');
if (sendBtn && emailInput && messageInput) {
    sendBtn.addEventListener('click', () => {
        const subject = encodeURIComponent('Portfolio contact');
        const fromLine = emailInput.value.trim() ? `From: ${emailInput.value.trim()}\n\n` : '';
        const body = encodeURIComponent(fromLine + messageInput.value.trim());
        window.location.href = `mailto:aidankmcbride@gmail.com?subject=${subject}&body=${body}`;
    });
}
