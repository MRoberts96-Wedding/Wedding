/* ============================================================
   Password gate + Terms & Conditions
   ------------------------------------------------------------
   NOTE ON SECURITY: this is a fun "keep casual visitors out"
   gate, NOT real security. The password below is visible to
   anyone who opens the browser's View Source. Don't reuse a
   password you use elsewhere, and don't put anything truly
   private behind it.
   ============================================================ */

/* 👇 CHANGE THESE to whatever passwords you print on the invitations.
   Day guests get the full site; evening guests get a shorter version
   (evening schedule only, no RSVP). */
const PASSWORD = "190527";                // day guests — full site
const EVENING_PASSWORD = "Welcome";       // evening guests — evening mode
const SEATING_PASSWORD = "Seating Plan";  // opens the seating planner (seating.html)

/* Grab the pieces we need from the page */
const gate = document.getElementById("gate");
const gateForm = document.getElementById("gate-form");
const gatePassword = document.getElementById("gate-password");
const gateError = document.getElementById("gate-error");

/* When the guest presses Enter (submits the form) */
gateForm.addEventListener("submit", function (event) {
  event.preventDefault(); // stop the page from reloading

  /* Check the password. The day password shows the full site; the
     evening password switches the page into "evening mode" (styled in
     style.css). We trim spaces and ignore capitals so guests aren't
     caught out by "Welcome" vs "welcome". */
  const entered = gatePassword.value.trim().toLowerCase();
  if (entered === PASSWORD.toLowerCase()) {
    document.body.classList.remove("evening");   // full day site
  } else if (entered === EVENING_PASSWORD.toLowerCase()) {
    document.body.classList.add("evening");      // shorter evening site
  } else if (entered === SEATING_PASSWORD.toLowerCase()) {
    /* the seating planner is its own page — unlock it for this browsing
       session and go there */
    try { sessionStorage.setItem("seatingUnlocked", "1"); } catch (e) {}
    window.location.href = "seating.html";
    return;
  } else {
    gateError.textContent = "Sorry, that password isn't right.";
    return;
  }

  /* All good — hide the gate to reveal the wedding page */
  gate.hidden = true;
});

/* ============================================================
   Countdown to the big day
   ------------------------------------------------------------
   This runs in the visitor's browser. Every second it works out
   how long is left until the wedding and updates the numbers.
   ============================================================ */

/* The big day.  NOTE: in JavaScript months start at 0,
   so May is 4 (Jan=0, Feb=1 ... May=4).
   Format: new Date(year, month, day, hour, minute)
   The time below is 13:00 (1pm) — the ceremony start time. */
const weddingDate = new Date(2027, 4, 19, 13, 0, 0);

/* Grab the four number slots from the page by their id */
const daysEl = document.getElementById("days");
const hoursEl = document.getElementById("hours");
const minutesEl = document.getElementById("minutes");
const secondsEl = document.getElementById("seconds");

/* Adds a leading zero so 7 shows as "07" */
function pad(number) {
  return String(number).padStart(2, "0");
}

function updateCountdown() {
  const now = new Date();
  const msLeft = weddingDate - now; // milliseconds remaining

  /* If the day has arrived, celebrate instead of counting */
  if (msLeft <= 0) {
    document.getElementById("countdown").innerHTML =
      "<p class='big-day'>It's the big day! 🎉</p>";
    return;
  }

  /* Turn milliseconds into days / hours / minutes / seconds */
  const totalSeconds = Math.floor(msLeft / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  /* Write the numbers back into the page */
  daysEl.textContent = days;
  hoursEl.textContent = pad(hours);
  minutesEl.textContent = pad(minutes);
  secondsEl.textContent = pad(seconds);
}

updateCountdown();              // run once immediately...
setInterval(updateCountdown, 1000);  // ...then again every second

/* ============================================================
   Highlight the current section in the top menu while scrolling
   ------------------------------------------------------------
   As you scroll, we work out which section you're looking at and
   add the "active" class to its menu link (removing it from the
   others). This means clicking "Venue" then scrolling to
   Accommodation won't leave "Venue" stuck on — the menu follows you.
   ============================================================ */
const navLinks = Array.from(document.querySelectorAll(".site-nav a"));

/* the section each link points to (href="#venue" -> the #venue element) */
const navSections = navLinks
  .map(function (link) { return document.querySelector(link.getAttribute("href")); })
  .filter(Boolean);

function setActiveLink(id) {
  navLinks.forEach(function (link) {
    link.classList.toggle("active", link.getAttribute("href") === "#" + id);
  });
}

let spyScheduled = false;

function updateActiveLink() {
  spyScheduled = false;

  /* only consider visible sections — RSVP is hidden for evening guests,
     and a hidden element reports offsetParent === null */
  const visible = navSections.filter(function (section) {
    return section.offsetParent !== null;
  });
  if (!visible.length) return;

  const nav = document.querySelector(".site-nav");
  const navHeight = nav ? nav.offsetHeight : 0;
  const scrollPos = window.scrollY + navHeight + 5;

  /* current section = the last one whose top has scrolled up under the menu */
  let currentId = visible[0].id;
  visible.forEach(function (section) {
    if (section.offsetTop <= scrollPos) currentId = section.id;
  });

  /* if we've scrolled right to the bottom, force the final section active */
  const atBottom =
    window.innerHeight + window.scrollY >=
    document.documentElement.scrollHeight - 2;
  if (atBottom) {
    currentId = visible[visible.length - 1].id;
  }

  setActiveLink(currentId);
}

/* run on scroll, throttled with requestAnimationFrame so it stays smooth */
window.addEventListener("scroll", function () {
  if (!spyScheduled) {
    spyScheduled = true;
    window.requestAnimationFrame(updateActiveLink);
  }
});

/* set the right one on first load too */
updateActiveLink();
