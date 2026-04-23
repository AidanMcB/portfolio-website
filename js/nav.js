/**
 * @file Mobile navigation: hamburger toggle, aria-expanded, focus trap, and outside-click close.
 */

const hamburgerBtn = document.getElementById('hamburger-btn');
const navMenu = document.getElementById('nav-menu');

/**
 * Opens or closes the mobile overlay menu and syncs `aria-expanded`.
 * @param {boolean} isOpen - Whether the menu should be visible.
 */
export function setMenuOpen(isOpen) {
    if (!hamburgerBtn || !navMenu) return;
    hamburgerBtn.classList.toggle('active', isOpen);
    navMenu.classList.toggle('active', isOpen);
    hamburgerBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
}

/**
 * When the menu is open, traps Tab within links; Shift+Tab from first item wraps to hamburger.
 * Escape closes the menu and returns focus to the toggle.
 * @param {KeyboardEvent} e
 */
function handleNavKeydown(e) {
    if (!navMenu || !navMenu.classList.contains('active')) return;

    if (e.key === 'Escape') {
        setMenuOpen(false);
        hamburgerBtn?.focus();
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
    } else if (document.activeElement === last) {
        e.preventDefault();
        hamburgerBtn?.focus();
    }
}

/**
 * Binds hamburger click, global Escape/Tab handling, and closes menu when clicking outside.
 */
export function initNav() {
    if (hamburgerBtn && navMenu) {
        hamburgerBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            const willOpen = !navMenu.classList.contains('active');
            setMenuOpen(willOpen);
            if (willOpen) {
                const firstLink = navMenu.querySelector('a');
                firstLink?.focus();
            }
        });
    }

    document.addEventListener('keydown', handleNavKeydown);

    document.addEventListener('click', (e) => {
        if (!e.target.closest('.hamburger-menu')) {
            setMenuOpen(false);
        }
    });
}
