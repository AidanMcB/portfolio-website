# Portfolio site

Static personal portfolio for [Aidan McBride](https://github.com/AidanMcB), a frontend engineer. Single-page layout with full-viewport sections, **no build step** — plain HTML, modular CSS, and vanilla ES modules.

## Features

- **Landing** — Name, role, and tagline.
- **About** — Bio, skill badges (semantic lists), resume download (`assets/AidanMcBride_Resume_2025.pdf`).
- **Experience** — Work history timeline.
- **Projects** — Featured cards (e.g. Gaeilge App, Open Toad Productions) with descriptions, tech notes, and external links.
- **Contact** — Form (Formspree) plus LinkedIn, GitHub, and email.
- **Navigation** — Side dots (desktop), hamburger overlay (mobile), smooth scroll to sections, and a one-time skills row animation when About enters the viewport (`IntersectionObserver`).
- **Accessibility** — Skip link, semantic landmarks (`<main>`, `<section>`), sensible heading order (one `<h1>`), focus-visible styles, reduced-motion support, live region for form status.

## Tech stack

- **HTML5** — Single entry: [`index.html`](index.html).
- **CSS** — Aggregated in [`styles/index.css`](styles/index.css): [`base.css`](styles/base.css), [`nav.css`](styles/nav.css), [`about.css`](styles/about.css), [`experience.css`](styles/experience.css), [`projects.css`](styles/projects.css), [`contact.css`](styles/contact.css).
- **JavaScript** — [`main.js`](main.js) (`type="module"`) imports [`js/nav.js`](js/nav.js), [`js/scroll.js`](js/scroll.js), [`js/skills.js`](js/skills.js), and [`js/contact.js`](js/contact.js). Each module is documented with JSDoc.
- **Fonts** — [Geist](https://fonts.google.com/) via Google Fonts; critical stylesheet is also `preload`ed in HTML.
- **Icons** — Inline SVGs in HTML (no icon font CDN).

## Project structure

```
portfolio-website/
├── index.html
├── main.js              # ES module entry
├── CNAME                # Custom domain (e.g. GitHub Pages)
├── README.md
├── assets/              # favicon, resume PDF, project images (not always tracked)
├── js/
│   ├── nav.js           # Hamburger, focus trap, outside click
│   ├── scroll.js        # Section observer, smooth scroll
│   ├── skills.js        # About section skill animation
│   └── contact.js       # Form validation + Formspree
└── styles/
    ├── index.css
    ├── base.css
    ├── nav.css
    ├── about.css
    ├── experience.css
    ├── projects.css
    └── contact.css
```

## Local preview

Use a static server so ES modules and `@import` resolve correctly:

```bash
npx serve .
```

or:

```bash
python3 -m http.server 8000
```

Then open the URL shown (e.g. `http://localhost:3000`).

## Deployment

Host the repository root on any static host (GitHub Pages, Netlify, Vercel, etc.). For social previews, `og:image` and related tags use the production domain (`aidan-mcbride.com`); ensure that URL serves your assets.

## Content roadmap (follow-up)

Ideas for the next iteration of copy and structure:

- **Current role** — Day-to-day impact, scale, and what you want employers to remember.
- **Positioning** — Broader than a single framework; align hero, About, and meta descriptions.
- **Projects** — Which work best shows depth; add or retire cards as needed.

## Configuration

- **Contact form** — Set `FORMSPREE_ID` in [`js/contact.js`](js/contact.js) (or replace with your Formspree endpoint). Until configured, the UI can fall back to `mailto:` when the placeholder id is used.
