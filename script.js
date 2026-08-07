/* ============================================================
   Password gate + Terms & Conditions
   ------------------------------------------------------------
   NOTE ON SECURITY: this is a fun "keep casual visitors out"
   gate, NOT real security. The password below is visible to
   anyone who opens the browser's View Source. Don't reuse a
   password you use elsewhere, and don't put anything truly
   private behind it.
   ============================================================ */

/* 👇 CHANGE THIS to whatever password you print on the invitations */
const PASSWORD = "190527";

/* Grab the pieces we need from the page */
const gate = document.getElementById("gate");
const gateForm = document.getElementById("gate-form");
const gatePassword = document.getElementById("gate-password");
const gateAgree = document.getElementById("gate-agree");
const gateError = document.getElementById("gate-error");
const terms = document.getElementById("terms");
const termsLink = document.getElementById("terms-link");
const termsClose = document.getElementById("terms-close");

/* When the guest presses Enter (submits the form) */
gateForm.addEventListener("submit", function (event) {
  event.preventDefault(); // stop the page from reloading

  /* Must tick the joke Terms box first */
  if (!gateAgree.checked) {
    gateError.textContent = "Please agree to the Terms & Conditions.";
    return;
  }

  /* Then the password must match */
  if (gatePassword.value !== PASSWORD) {
    gateError.textContent = "Sorry, that password isn't right.";
    return;
  }

  /* All good — hide the gate to reveal the wedding page */
  gate.hidden = true;
});

/* Clicking the "Terms & Conditions" link opens the Terms overlay */
termsLink.addEventListener("click", function (event) {
  event.preventDefault(); // don't jump to the top of the page
  terms.hidden = false;
});

/* The "Back" button closes the Terms and returns to the password screen */
termsClose.addEventListener("click", function () {
  terms.hidden = true;
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

  const nav = document.querySelector(".site-nav");
  const navHeight = nav ? nav.offsetHeight : 0;
  const scrollPos = window.scrollY + navHeight + 5;

  /* current section = the last one whose top has scrolled up under the menu */
  let currentId = navSections.length ? navSections[0].id : null;
  navSections.forEach(function (section) {
    if (section.offsetTop <= scrollPos) currentId = section.id;
  });

  /* if we've scrolled right to the bottom, force the final section active */
  const atBottom =
    window.innerHeight + window.scrollY >=
    document.documentElement.scrollHeight - 2;
  if (atBottom && navSections.length) {
    currentId = navSections[navSections.length - 1].id;
  }

  if (currentId) setActiveLink(currentId);
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
