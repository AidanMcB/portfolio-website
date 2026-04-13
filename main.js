// ── Replace with your Formspree form ID after signing up at https://formspree.io
const FORMSPREE_ID = 'xeevjdzo';

const mainEl = document.querySelector('.main');
const hamburgerBtn = document.getElementById('hamburger-btn');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const sideDots = document.querySelectorAll('.side-dot');
const sectionEls = document.querySelectorAll('.view-container');
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// ── Navigation helpers ────────────────────────────────────────────────────────

function setMenuOpen(isOpen) {
    if (!hamburgerBtn || !navMenu) return;
    hamburgerBtn.classList.toggle('active', isOpen);
    navMenu.classList.toggle('active', isOpen);
    hamburgerBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
}

function setActiveNav(id) {
    navLinks.forEach((link) => {
        const isActive = link.getAttribute('data-target') === id;
        if (isActive) {
            link.setAttribute('aria-current', 'page');
        } else {
            link.removeAttribute('aria-current');
        }
    });

    sideDots.forEach((dot) => {
        const isActive = dot.getAttribute('data-target') === id;
        if (isActive) {
            dot.setAttribute('aria-current', 'page');
        } else {
            dot.removeAttribute('aria-current');
        }
    });
}

// ── Section IntersectionObserver ─────────────────────────────────────────────

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

// ── Focus trap for hamburger nav ─────────────────────────────────────────────

function handleNavKeydown(e) {
    if (!navMenu.classList.contains('active')) return;

    if (e.key === 'Escape') {
        setMenuOpen(false);
        hamburgerBtn.focus();
        return;
    }

    if (e.key !== 'Tab') return;

    const focusable = [...navMenu.querySelectorAll('a[href]')];
    if (!focusable.length) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (e.shiftKey) {
        if (document.activeElement === first) {
            e.preventDefault();
            last.focus();
        }
    } else {
        if (document.activeElement === last) {
            e.preventDefault();
            hamburgerBtn.focus();
        }
    }
}

// ── Scroll helper (used by nav links, side dots, chevron) ────────────────────

function scrollToSection(targetId) {
    const targetEl = document.getElementById(targetId);
    if (targetEl) {
        targetEl.scrollIntoView({
            behavior: prefersReducedMotion ? 'auto' : 'smooth',
            block: 'start',
        });
    }
}

// ── Hamburger events ─────────────────────────────────────────────────────────

if (hamburgerBtn && navMenu) {
    hamburgerBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const willOpen = !navMenu.classList.contains('active');
        setMenuOpen(willOpen);
        if (willOpen) {
            const firstLink = navMenu.querySelector('a');
            if (firstLink) firstLink.focus();
        }
    });

    document.addEventListener('keydown', handleNavKeydown);
}

navLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        scrollToSection(link.getAttribute('data-target'));
        setMenuOpen(false);
    });
});

document.addEventListener('click', (e) => {
    if (!e.target.closest('.hamburger-menu')) {
        setMenuOpen(false);
    }
});

// ── Side-dot click events ─────────────────────────────────────────────────────

sideDots.forEach((dot) => {
    dot.addEventListener('click', (e) => {
        e.preventDefault();
        scrollToSection(dot.getAttribute('data-target'));
    });
});

// ── Landing chevron ───────────────────────────────────────────────────────────

const landingChevron = document.querySelector('.landing-chevron');
if (landingChevron) {
    landingChevron.addEventListener('click', (e) => {
        e.preventDefault();
        scrollToSection(landingChevron.getAttribute('data-target'));
    });
}

setupSectionNavObserver();

// ── Skills slide-in animation ─────────────────────────────────────────────────

const aboutView = document.getElementById('about-view');
const skillRows = document.querySelectorAll('.skill-row');
let skillsAnimated = false;

if (prefersReducedMotion) {
    skillRows.forEach((row, index) => {
        const skillItems = row.querySelector('.skill-items');
        if (!skillItems) return;
        skillItems.classList.add(index % 2 === 0 ? 'animate' : 'animate-right');
    });
    skillsAnimated = true;
} else {
    const skillObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting && !skillsAnimated) {
                    skillsAnimated = true;
                    skillRows.forEach((row, index) => {
                        const skillItems = row.querySelector('.skill-items');
                        if (!skillItems) return;
                        skillItems.classList.add(index % 2 === 0 ? 'animate' : 'animate-right');
                    });
                }
            });
        },
        { root: null, threshold: 0.3 }
    );

    if (aboutView) skillObserver.observe(aboutView);
}

// ── Contact form (Formspree) ──────────────────────────────────────────────────

const sendBtn = document.getElementById('send-email-button');
const emailInput = document.getElementById('contact-email-input');
const messageInput = document.getElementById('contact-message-input');
const formStatus = document.getElementById('contact-form-status');

function setFormStatus(message, type) {
    if (!formStatus) return;
    formStatus.textContent = message;
    formStatus.className = `contact-form-status${type ? ` ${type}` : ''}`;
}

if (sendBtn && emailInput && messageInput && formStatus) {
    sendBtn.addEventListener('click', async () => {
        const email = emailInput.value.trim();
        const message = messageInput.value.trim();

        if (!email || !message) {
            setFormStatus('Please fill in both fields before sending.', 'error');
            return;
        }

        if (!FORMSPREE_ID || FORMSPREE_ID === 'YOUR_FORM_ID') {
            // Fallback to mailto: when Formspree hasn't been configured yet
            const subject = encodeURIComponent('Portfolio contact');
            const body = encodeURIComponent(`From: ${email}\n\n${message}`);
            window.location.href = `mailto:aidankmcbride@gmail.com?subject=${subject}&body=${body}`;
            return;
        }

        sendBtn.disabled = true;
        sendBtn.textContent = 'Sending…';
        setFormStatus('', '');

        try {
            const response = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify({ email, message }),
            });

            if (response.ok) {
                setFormStatus("Message sent! I'll get back to you soon.", 'success');
                emailInput.value = '';
                messageInput.value = '';
            } else {
                throw new Error('Non-OK response');
            }
        } catch {
            setFormStatus(
                'Something went wrong. You can reach me directly at aidankmcbride@gmail.com.',
                'error'
            );
        } finally {
            sendBtn.disabled = false;
            sendBtn.textContent = 'Send Message';
        }
    });
}
