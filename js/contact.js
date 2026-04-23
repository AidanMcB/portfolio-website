/**
 * @file Contact form: client validation, honeypot, Formspree POST, and mailto fallback.
 */

/** Formspree form id — replace after signing up at https://formspree.io */
const FORMSPREE_ID = 'xeevjdzo';

const sendBtn = document.getElementById('send-email-button');
const emailInput = document.getElementById('contact-email-input');
const messageInput = document.getElementById('contact-message-input');
const formStatus = document.getElementById('contact-form-status');
const honeypot = document.getElementById('contact-honeypot');

/**
 * Sets the live status message below the form.
 * @param {string} message - User-visible text (empty clears).
 * @param {string} [type] - Optional CSS modifier class name (`success` | `error`).
 */
function setFormStatus(message, type) {
    if (!formStatus) return;
    formStatus.textContent = message;
    formStatus.className = `contact-form-status${type ? ` ${type}` : ''}`;
}

/**
 * Binds the Send button to validate and submit via Formspree or `mailto:` fallback.
 */
export function initContactForm() {
    if (!sendBtn || !emailInput || !messageInput || !formStatus) return;

    sendBtn.addEventListener('click', async () => {
        const email = emailInput.value.trim();
        const message = messageInput.value.trim();

        if (honeypot && honeypot.value) return;

        if (!email || !message) {
            setFormStatus('Please fill in both fields before sending.', 'error');
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setFormStatus('Please enter a valid email address.', 'error');
            return;
        }

        if (!FORMSPREE_ID || FORMSPREE_ID === 'YOUR_FORM_ID') {
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
                    Accept: 'application/json',
                },
                body: JSON.stringify({ email, message, _gotcha: '' }),
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
