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
- `index.html` — single scrolling page. Sticky `<nav class="site-nav">` menu (anchor links) → `<main class="hero" id="home">` (names, `.tagline`, `.divider`, `.details`, countdown), then seven `<section class="section">` shells: `#story`, `#venue`, `#accommodation`, `#schedule`, `#dresscode`, `#rsvp`, `#gifts`. Backgrounds are set **deliberately per section** (not a strict alternation): `#story` cream, `#venue` white + Hadsham watermark, `#accommodation` white, `#schedule` cream, `#dresscode` white, `#rsvp` cream, `#gifts` white (`.section--alt` = white). From Schedule down it alternates cleanly (cream/white/cream/white); the only same-colour adjacency is `#venue`/`#accommodation` (both white), intentional since `#venue` carries the watermark. Later sections are placeholder stubs, being filled one at a time.
- `style.css` — palette in `:root` CSS variables; flexbox-centered `.hero`; Cormorant Garamond (Google Fonts) for headings, system sans for body.
- `script.js` — (1) password gate logic, (2) countdown to the wedding date, updates every second, (3) **scrollspy** — on scroll, adds `.active` to the `.site-nav a` for the section currently in view (last section whose top has passed under the sticky nav; bottom-of-page forces the last link). Highlight follows scroll position, not clicks. **Two passwords at the top of this file**: `PASSWORD` (day guests → full site) and `EVENING_PASSWORD` ("Welcome" → evening guests). The evening password adds `body.evening` to the page, which via CSS shows an extra `.evening-line` under the tagline, hides every `.schedule-item--day` (so only the 7pm-onward evening items show), and hides the whole `#rsvp` section + its nav link — a shorter "evening" version of the same site. The scrollspy skips hidden sections (`offsetParent === null`). A third password `SEATING_PASSWORD` ("Seating Plan") sets a `seatingUnlocked` sessionStorage flag and redirects to `seating.html` (the table planner). NOT real security (client-side, visible in View Source; the hidden content still exists in the page source) — just a casual gate.
- `seating.html` — **standalone, self-contained** tipi table planner (own `<style>`/`<script>`, no deps on the main site's files). Interactive drag-and-drop seating tool (Guests/Tables/Venue/Plan tabs), auto-saves to `localStorage` (`tipi-planner-v1`), export/import text for backup/cross-device. Already responsive (`@media max-width:760px` stacks the panel under the map) + touch drag, and uses a palette close to the site's (cream/green/kraft). A password-gate overlay (`.seating-gate`) added at the top reveals the planner when "Seating Plan" is entered, or immediately if the `seatingUnlocked` sessionStorage flag was set by the main gate. Source lived in the git-ignored `Seating Plan/` folder (with `tipi-table-planner-instructions.md`); **this root copy is the live one — edit it, not the folder.**
- `CNAME` — custom domain (do not remove).
- `README.md`, `hello.txt` (leftover test file, safe to delete).

## Palette (from the save-the-dates: kraft on deep green + spring pastels)
- `--green #2f4a3a` (headings), `--kraft #c19a6b` (accents/dividers), `--cream #f7f3ec` (bg), `--ink #3a3a34` (text), `--blush #e9d5cf` (pastel accent).
- Desired vibe: rustic/warm/friendly tipi wedding, but clean, modern, simplistic.

## Key facts
- Couple: **Matthew & Jacqueline**. Big day: **Wed 19 May 2027**, Hadsham Farm, Banbury.

## Conventions
- **Cache-busting**: `index.html` links assets with a version query — currently `style.css?v=16` and `script.js?v=3`. **Bump the number whenever that file is edited** so browsers fetch fresh copies. (Editing `index.html` text alone needs no bump — it isn't versioned.)
- **Password gate overlay**: `.gate` uses `position: fixed; inset: 0` + `z-index`. A `[hidden] { display: none !important; }` rule makes the HTML `hidden` attribute reliably win over `display: flex` — that's how JS reveals the site (`gate.hidden = true`). (The joke Terms & Conditions overlay + checkbox were **removed**; some now-unused `.terms` / `.gate-terms` CSS still sits harmlessly in `style.css`.)
- **Responsive helpers** (in style.css): `class="only-desktop"` shows on computers only; `class="only-mobile"` shows on phones only. Breakpoint is `max-width: 600px`; mobile rule uses `display: revert`. Reuse these instead of one-off show/hide classes.

## Status
- LIVE and styled with a working countdown.
- Sticky nav + four sections. **Our Story is built but currently HIDDEN from the live site** (`#story` + its nav link set to `display:none` in a commented two-line block in style.css — all HTML kept so it can be switched back on). When shown it has: a `.story-intro` line, then a **centre-line timeline** (`.timeline` / `.timeline-item`) with events alternating left/right via `:nth-child(odd/even)`, oldest→newest. Milestone entries have year + text (+ photo); holiday entries (`.timeline-item--photo`) are year + a `.timeline-place` location label + photo. Timeline photos display at **natural aspect ratio** (no `object-fit: cover` crop) so no faces get cut off — portraits/landscapes keep their real shape. The centre line is drawn per-item via `.timeline-item:not(:last-child)::after` (each segment joins one dot to the next) so it **ends at the last marker**; the final (2027) marker is a **♥ heart** via `.timeline-item:last-child::before` instead of a dot. Collapses to a single left-aligned column under 600px (media query at end of the timeline CSS). Images live in `images/` — **filenames are kebab-case, no spaces** (web convention).
- **Venue is done**: Hadsham Farm, Horley, Banbury, Oxfordshire, OX15 6FH + a Google Maps link, over a **faint tipi/lake watermark** (`#venue::before`, opacity 0.15) cropped from the save-the-date. `images/save-the-date.png` is the full card (crop source); `images/venue-illustration.png` is the cropped tipi/lake used as the watermark. (Crop was done with a one-off PowerShell + System.Drawing script — no Python/Node/ImageMagick on this machine.)
- **Accommodation is done**: camping-on-site intro, then `.stay-cards` (responsive `grid` auto-fit) of `.stay-card`s — cream cards, green font, `box-shadow` 3D lift, each showing name + photo + time-to-venue ("X mins away"). The **whole card is a link** — each `.stay-card` is an `<a>` (no nested links) to the hotel site, `text-decoration: none`. Four stays (Castle at Edgehill, Wroxton House, Feldon Valley, Premier Inn). Hotel images in `images/` (kebab-case lowercase). `.stay-name` has `min-height: 2.5em` + flex-centring so cards with a two-line name keep their photos aligned with single-line ones — **don't remove that or the photo row goes ragged**.
- **Schedule is done**: a centred `.schedule` list (`.schedule-item` = `.schedule-time` serif green + `.schedule-event` kraft uppercase, faint kraft dividers between). Nine entries, 1:30pm ceremony. Timings now pretty much confirmed; intro line reads "Here's how our day will unfold" (dropped the earlier "roughly / final timings to follow" placeholder caveat).
- **RSVP is done**: intro + `.rsvp-deadline` + a big green `.rsvp-button` that links to the live Google Form (`https://forms.gle/cxMmkvXdLS7ePwQW6`, `target="_blank" rel="noopener"`). Form title "Wedding RSVP". Deadline is **30th November 2026** (site and form now match).
- **Dress Code is live**: `.dress-text` paragraphs after Schedule — colours encouraged (bridesmaids in pastels), please avoid white/ivory, plus a practical field/tipi footwear + evening-layer note. No specific formality level stated. Shows for both day and evening guests.
- **Gifts is live**: modest honeymoon-donation wording in `.gifts-text` + a `.gifts-fund` white card with the dedicated savings-account details (name / sort code / account number as a `.gifts-fund-details` `<dl>`, labels left / values right) + a "use your name as the reference" note. **These bank details are public** (a dedicated savings account, published with the couple's informed consent that the repo/page is public). Shows for both day and evening guests.
- **All sections are built and live.**
