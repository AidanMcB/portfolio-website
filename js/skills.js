/**
 * @file One-time slide-in animation for skill rows when the About section enters the viewport.
 */

const aboutView = document.getElementById('about-view');
const skillRows = document.querySelectorAll('.skill-row');
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * Adds animation classes to `.skill-items` in each row (alternating direction).
 */
export function initSkillsAnimation() {
    let skillsAnimated = false;

    const applyAnimations = () => {
        skillRows.forEach((row, index) => {
            const skillItems = row.querySelector('.skill-items');
            if (!skillItems) return;
            skillItems.classList.add(index % 2 === 0 ? 'animate' : 'animate-right');
        });
    };

    if (prefersReducedMotion) {
        applyAnimations();
        return;
    }

    const skillObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting && !skillsAnimated) {
                    skillsAnimated = true;
                    applyAnimations();
                }
            });
        },
        { root: null, threshold: 0.3 }
    );

    if (aboutView) skillObserver.observe(aboutView);
}
