# Portfolio site

Static personal portfolio for [Aidan McBride](https://github.com/AidanMcB), a frontend engineer. It is a single-page site with full-viewport sections, vertical scroll snapping, and no build step—plain HTML, CSS, and a small amount of vanilla JavaScript.

## Features

- **Landing** — Name and role.
- **About** — Short bio, skill tags grouped by category (Frontend, Backend, Database, Tools & Platforms, Hardware & IoT), and a link to download the resume PDF (`assets/AidanMcBride_Resume_2025.pdf`).
- **Projects** — Featured project cards (e.g. Gaeilge App, Open Toad Productions) with descriptions, tech notes, and external links.
- **Contact** — Email and message fields plus links to LinkedIn, GitHub, and email.
- **Navigation** — Hamburger menu that opens an overlay nav, smooth scrolling to each section, and a one-time skills animation when the About section enters the viewport (`IntersectionObserver` in inline script).

## Tech stack

- **HTML5** — Single entry: `index.html`.
- **CSS** — Modular sheets imported from `styles/index.css`: `base.css`, `nav.css`, `about.css`, `projects.css`, `contact.css` (space-themed palette, scroll snap on the main scroll container).
- **JavaScript** — Inline in `index.html` for menu behavior, smooth scroll, and the About-section skills animation.
- **Font Awesome 6** — Loaded from CDN for social icons.

## Project structure

```
portfolio-site/
├── index.html
├── README.md
├── assets/          # favicon, resume PDF, project images
└── styles/
    ├── index.css    # imports other stylesheets
    ├── base.css
    ├── nav.css
    ├── about.css
    ├── projects.css
    └── contact.css
```

## Local preview

1. **Open directly** — Double-click `index.html` or open it from your browser’s File menu.

2. **Static server (recommended)** — From the repository root, serve the folder so paths and CSS `@import` resolve predictably:

   ```bash
   npx serve .
   ```

   or:

   ```bash
   python3 -m http.server 8000
   ```

   Then visit the URL the tool prints (often `http://localhost:3000` or `http://localhost:8000`).

## Deployment

This site is static files only; host the repository root (or the built folder if you ever add a build) on any static host such as GitHub Pages, Netlify, or Vercel.
