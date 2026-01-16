// Set Current Year
document.getElementById("year").textContent = new Date().getFullYear();

// Navigation Toggle - Logic defined only once
const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

if (menuBtn && navLinks) {
  menuBtn.addEventListener("click", () => {
    // Toggles the mobile menu visibility
    navLinks.classList.toggle("show");
    // Toggles the hamburger to 'X' animation
    menuBtn.classList.toggle("active");
  });

  document.querySelectorAll("#navLinks a").forEach(link => {
    link.addEventListener("click", () => {
      // Ensures both the menu AND the icon reset when a link is clicked
      navLinks.classList.remove("show");
      menuBtn.classList.remove("active"); 
    });
  });
}

// Typing Effect
const typingEl = document.getElementById("typingText");
const lines = [
  "Optimizing System Kernels",
  "Architecting IoT Ecosystems",
  "Training Neural Networks",
  "Developing Journaling Filesystems",
  "Engineering Hardware-Software Solutions"
];

let lineIndex = 0;
let charIndex = 0;
let deleting = false;

function typeLoop() {
  const current = lines[lineIndex];

  if (!deleting) {
    typingEl.textContent = current.slice(0, charIndex++);
    if (charIndex > current.length + 10) {
      deleting = true;
    }
  } else {
    typingEl.textContent = current.slice(0, charIndex--);
    if (charIndex < 0) {
      deleting = false;
      lineIndex = (lineIndex + 1) % lines.length;
      charIndex = 0;
    }
  }

  setTimeout(typeLoop, deleting ? 40 : 70);
}

// Copy to Clipboard Logic
const copyBtn = document.getElementById("copyEmailBtn");
if (copyBtn) {
  const btnText = copyBtn.querySelector(".btn-text");
  const feedback = copyBtn.querySelector(".copy-feedback");

  copyBtn.addEventListener("click", () => {
    const email = copyBtn.getAttribute("data-email");
    navigator.clipboard.writeText(email).then(() => {
      btnText.style.display = "none";
      feedback.style.display = "inline";

      setTimeout(() => {
        btnText.style.display = "inline";
        feedback.style.display = "none";
      }, 2000);
    }).catch(err => {
      console.error("Failed to copy text: ", err);
    });
  });
}

// Scroll Reveal Animation
const revealElements = document.querySelectorAll(".reveal");

const scrollObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("active");
      // Stop observing after the element is revealed to save resources
      scrollObserver.unobserve(entry.target);
    }
  });
}, { 
  threshold: 0.1 // Triggers when 10% of the element is visible
});

revealElements.forEach(el => scrollObserver.observe(el));

// START the typing effect
typeLoop();