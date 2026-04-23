/**
 * @file Section scroll navigation, IntersectionObserver for active nav state, and smooth scroll.
 */

import { setMenuOpen } from './nav.js';

const mainEl = document.querySelector('.main');
const navLinks = document.querySelectorAll('.nav-link');
const sideDots = document.querySelectorAll('.side-dot');
const sectionEls = document.querySelectorAll('.view-container');
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * Updates `aria-current="page"` on side dots and mobile nav links for the visible section.
 * @param {string} id - Section element `id` (e.g. `about-view`).
 */
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

/**
 * Observes which `.view-container` is most visible inside `.main` and syncs nav UI.
 */
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

/**
 * Scrolls the main scroll container to a section by id.
 * @param {string} targetId - Target element id without `#`.
 */
export function scrollToSection(targetId) {
    const targetEl = document.getElementById(targetId);
    if (targetEl) {
        targetEl.scrollIntoView({
            behavior: prefersReducedMotion ? 'auto' : 'smooth',
            block: 'start',
        });
    }
}

/**
 * Wires nav links, side dots, landing chevron, and starts the section observer.
 */
export function initScrollNavigation() {
    setupSectionNavObserver();

    navLinks.forEach((link) => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            scrollToSection(link.getAttribute('data-target'));
            setMenuOpen(false);
        });
    });

    sideDots.forEach((dot) => {
        dot.addEventListener('click', (e) => {
            e.preventDefault();
            scrollToSection(dot.getAttribute('data-target'));
        });
    });

    const landingChevron = document.querySelector('.landing-chevron');
    if (landingChevron) {
        landingChevron.addEventListener('click', (e) => {
            e.preventDefault();
            scrollToSection(landingChevron.getAttribute('data-target'));
        });
    }
}
