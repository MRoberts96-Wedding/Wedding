# Our Wedding Website — Progress & How-To (Plain English)

A friendly log of what we've built and how to look after it. No jargon.

---

## Where things live

- **The live website:** https://therobertswedding.co.uk (also works with `www.`)
- **The "cloud filing cabinet" (GitHub):** https://github.com/MRoberts96-Wedding/Wedding
- **The folder on my PC:** `C:\Users\MatthewRoberts\Claude_Practice_Project`

The folder on my PC and the GitHub cabinet are **linked**. I edit files on my PC, then "send them up" to GitHub, and the website updates automatically.

---

## What each file does

| File | What it's for |
|------|----------------|
| `index.html` | The homepage — the words and structure people see. |
| `style.css` | The **looks** — colours, fonts, spacing. |
| `script.js` | The **countdown** timer (a bit of interactivity). |
| `CNAME` | Tells GitHub my custom domain is therobertswedding.co.uk. Don't delete. |
| `README.md` | A short note shown on the GitHub page. |
| `hello.txt` | A leftover test file, harmless. |

---

## The everyday routine (how to save my work to the live site)

1. **Edit** a file (or ask Claude to) and **save** it (Ctrl+S in VS Code).
2. **Send it up** — either ask Claude "send it up", or run these three commands one at a time:

   ```bash
   git add .
   git commit -m "Say what I changed"
   git push
   ```
3. Wait about a minute, then refresh the website (Ctrl+F5 to force a fresh copy).

That's it. `add` = gather changes, `commit` = take a labelled snapshot, `push` = upload it.

---

## Words I learned (quick glossary)

- **Git** — the tool that tracks changes and uploads them.
- **Repository ("repo")** — the project's folder, tracked by Git, mirrored on GitHub.
- **Commit** — a saved snapshot of my work with a short note.
- **Push** — uploading commits to GitHub.
- **HTML** — the content/structure of a web page (tags in `< >`).
- **CSS** — the styling (colours, fonts, layout).
- **JavaScript (JS)** — makes pages interactive (e.g. the countdown).
- **DNS** — the internet's phone book; points my domain at GitHub.
- **HTTPS / the padlock** — the secure version of the site.
- **Public repo** — anyone can *view* the files (needed for free hosting); only I can *change* them.

---

## Done so far

- [x] Linked my folder to GitHub and learned to push
- [x] Built a homepage (names, date, venue)
- [x] Connected my own domain (therobertswedding.co.uk) with a padlock
- [x] Styled it in our wedding colours (kraft brown + deep green, spring feel)
- [x] Added a live countdown to the big day

## Next up

- [ ] Add tabs/sections: Our Story, Venue & Directions, Schedule, RSVP (tomorrow)

---

## Key facts to remember

- **The big day:** Wednesday 19 May 2027, Hadsham Farm, Banbury
- **Keep it free:** static site on GitHub Pages, no paid services
- **Never paste passwords or tokens into a chat** — type them into the private popup only
