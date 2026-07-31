# CLAUDE.md — Project notes for Claude

Context for anyone (esp. Claude) picking up this project. Keep this updated as the site grows.

## What this is
A **wedding website** built as a **learning project** for Matthew (beginner coder). Two goals: (1) learn web fundamentals, (2) learn to use Claude efficiently.

## Working style (important)
- User is a **beginner** — explain in **plain, layman's terms**, define jargon.
- Mode is **"explain as you build"**: Claude writes the code and explains each part; user gradually takes over. User also does hands-on edits (e.g. editing names in `index.html`).
- **Constraint: stay within free usage** — free hosting only, and keep Claude token usage low (small focused changes, targeted edits not full rewrites, `/clear` between unrelated tasks).

## Stack & hosting
- **Plain static site**: HTML + CSS + vanilla JS. No framework, no build step, no package manager.
- Hosted free on **GitHub Pages** (`Deploy from a branch` → `main` / root).
- **Repo must be public** for free Pages (it is). No secrets in repo.
- Custom domain **therobertswedding.co.uk** via IONOS DNS: four A records → GitHub (185.199.108–111.153) on `@`, plus `www` CNAME → `mroberts96-wedding.github.io`. `CNAME` file in repo pins the apex domain. HTTPS enforced.

## Repo / identity
- Remote: https://github.com/MRoberts96-Wedding/Wedding.git (origin, branch `main`).
- Auth works silently via Git Credential Manager (a saved GitHub sign-in on the machine). No token entry has been needed.
- Local git identity: Matthew Roberts / matthew.roberts@fullfibre.co.
- Windows: CRLF/LF warnings on commit are harmless.

## Files
- `index.html` — single scrolling page. Sticky `<nav class="site-nav">` menu (anchor links) → `<main class="hero" id="home">` (names, `.tagline`, `.divider`, `.details`, countdown), then four `<section class="section">` shells: `#story`, `#venue`, `#schedule`, `#rsvp` (alternating `.section--alt` white bg). Sections are placeholder stubs, being filled one at a time.
- `style.css` — palette in `:root` CSS variables; flexbox-centered `.hero`; Cormorant Garamond (Google Fonts) for headings, system sans for body.
- `script.js` — (1) password gate + Terms overlay logic, (2) countdown to the wedding date, updates every second. **Password is set at the top of this file** in `const PASSWORD` — NOT real security (client-side only, visible in View Source); it's just a casual "guests only" gate.
- `CNAME` — custom domain (do not remove).
- `README.md`, `hello.txt` (leftover test file, safe to delete).

## Palette (from the save-the-dates: kraft on deep green + spring pastels)
- `--green #2f4a3a` (headings), `--kraft #c19a6b` (accents/dividers), `--cream #f7f3ec` (bg), `--ink #3a3a34` (text), `--blush #e9d5cf` (pastel accent).
- Desired vibe: rustic/warm/friendly tipi wedding, but clean, modern, simplistic.

## Key facts
- Couple: **Matthew & Jacqueline**. Big day: **Wed 19 May 2027**, Hadsham Farm, Banbury.

## Conventions
- **Cache-busting**: `index.html` links assets with a version query — currently `style.css?v=3` and `script.js?v=3`. **Bump the number whenever that file is edited** so browsers fetch fresh copies.
- **Full-screen overlays**: the password gate (`.gate`) and Terms (`.terms`) use `position: fixed; inset: 0` + `z-index`. A `[hidden] { display: none !important; }` rule makes the HTML `hidden` attribute reliably win over `display: flex` — that's how JS shows/hides them (`el.hidden = true/false`).
- **Responsive helpers** (in style.css): `class="only-desktop"` shows on computers only; `class="only-mobile"` shows on phones only. Breakpoint is `max-width: 600px`; mobile rule uses `display: revert`. Reuse these instead of one-off show/hide classes.

## Status
- LIVE and styled with a working countdown.
- Sticky nav + four sections. **Our Story is done**: a `.story-intro` line, then a **centre-line timeline** (`.timeline` / `.timeline-item`) with events alternating left/right via `:nth-child(odd/even)`, oldest→newest. Milestone entries have year + text (+ photo); holiday entries (`.timeline-item--photo`) are year + photo only, no caption. Collapses to a single left-aligned column under 600px (media query at end of the timeline CSS). Images live in `images/` — **filenames are kebab-case, no spaces** (web convention).
- **Next:** Venue, Schedule, then RSVP. RSVP will need a no-backend approach (Google Form / Formspree / mailto) since the site is static.
