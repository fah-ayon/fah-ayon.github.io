const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Current year
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Mobile menu (with aria-expanded) and Escape to close
const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

function setMenu(open) {
  navLinks.classList.toggle("show", open);
  menuBtn.classList.toggle("active", open);
  menuBtn.setAttribute("aria-expanded", String(open));
  menuBtn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
}

if (menuBtn && navLinks) {
  menuBtn.addEventListener("click", () => setMenu(!navLinks.classList.contains("show")));
  navLinks.querySelectorAll("a").forEach(link => link.addEventListener("click", () => setMenu(false)));
  document.addEventListener("keydown", e => { if (e.key === "Escape") setMenu(false); });
}

// Mark the current page in the nav (works on every page that includes this script)
const here = location.pathname.split("/").pop() || "index.html";
document.querySelectorAll("#navLinks a").forEach(a => {
  if (a.getAttribute("href") === here) {
    a.classList.add("current");
    a.setAttribute("aria-current", "page");
  }
});

// Scroll progress bar
const progress = document.getElementById("progress");
if (progress) {
  const update = () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.width = (max > 0 ? (window.scrollY / max) * 100 : 0) + "%";
  };
  window.addEventListener("scroll", update, { passive: true });
  update();
}

// Typing effect (static text if the visitor prefers reduced motion)
const typingEl = document.getElementById("typingText");
const lines = [
  "Training neural networks for medical imaging",
  "Developing full-stack web apps with MERN",
  "Wiring up ESP32 and Arduino safety systems",
  "Rendering 3D games with PyOpenGL",
  "Designing secure cloud access for health data"
];

let lineIndex = 0;
let charIndex = 0;
let deleting = false;

function typeLoop() {
  if (!typingEl) return;
  const current = lines[lineIndex];

  if (!deleting) {
    charIndex++;
    typingEl.textContent = current.slice(0, charIndex);
    if (charIndex >= current.length) {
      deleting = true;
      return setTimeout(typeLoop, 1600); // pause on the full line
    }
  } else {
    charIndex--;
    typingEl.textContent = current.slice(0, charIndex);
    if (charIndex <= 0) {
      deleting = false;
      lineIndex = (lineIndex + 1) % lines.length;
    }
  }
  setTimeout(typeLoop, deleting ? 30 : 55);
}

if (typingEl) {
  if (reducedMotion) typingEl.textContent = lines[0];
  else typeLoop();
}

const footerEmail = document.getElementById("footerEmail");
if (footerEmail) {
  footerEmail.addEventListener("click", event => {
    const email = footerEmail.getAttribute("data-email");
    if (!email || !navigator.clipboard) return;

    event.preventDefault();
    navigator.clipboard.writeText(email).then(() => {
      const originalText = footerEmail.textContent;
      footerEmail.textContent = "Copied";
      setTimeout(() => {
        footerEmail.textContent = originalText;
      }, 2000);
    });
  });
}

const copyEmailBtn = document.getElementById("copyEmailBtn");
if (copyEmailBtn) {
  copyEmailBtn.addEventListener("click", () => {
    const email = copyEmailBtn.getAttribute("data-email");
    const buttonText = copyEmailBtn.querySelector(".btn-text");
    const feedback = copyEmailBtn.querySelector(".copy-feedback");
    if (!email || !navigator.clipboard || !buttonText || !feedback) return;

    navigator.clipboard.writeText(email).then(() => {
      buttonText.hidden = true;
      feedback.hidden = false;
      setTimeout(() => {
        buttonText.hidden = false;
        feedback.hidden = true;
      }, 2000);
    }).catch(() => {
      buttonText.textContent = "Copy failed";
      setTimeout(() => {
        buttonText.textContent = "Copy email";
      }, 2000);
    });
  });
}

// Scroll reveal (sections only)
const revealElements = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window && !reducedMotion) {
  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  revealElements.forEach(el => io.observe(el));
} else {
  revealElements.forEach(el => el.classList.add("active"));
}
