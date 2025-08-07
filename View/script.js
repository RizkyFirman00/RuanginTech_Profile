// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
    });
  });
});

// Header background change on scroll
window.addEventListener("scroll", () => {
  const header = document.querySelector("header");
  if (window.scrollY > 100) {
    header.style.background = "rgba(0, 0, 0, 0.9)";
  } else {
    header.style.background = "rgba(255, 255, 255, 0.1)";
  }
});

// Scroll animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, observerOptions);

document.querySelectorAll(".fade-in").forEach((el) => {
  observer.observe(el);
});

// Form submission handler
document.querySelector("form").addEventListener("submit", function (e) {
  e.preventDefault();

  // Get form data
  const formData = new FormData(this);
  const name = formData.get("name") || document.getElementById("name").value;
  const email = formData.get("email") || document.getElementById("email").value;
  const project =
    formData.get("project") || document.getElementById("project").value;
  const message =
    formData.get("message") || document.getElementById("message").value;

  // Simple validation
  if (!name || !email || !message) {
    alert("Please fill in all required fields.");
    return;
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    alert("Please enter a valid email address.");
    return;
  }

  // Success message
  alert(
    `Thank you ${name}! We've received your message and will get back to you soon.`
  );

  // Reset form
  this.reset();
});

// Service card hover effects with enhanced animations
document.querySelectorAll(".service-card").forEach((card) => {
  card.addEventListener("mouseenter", function () {
    this.style.transform = "translateY(-12px) scale(1.02)";
    this.style.boxShadow = "0 20px 60px rgba(168, 85, 247, 0.4)";
  });

  card.addEventListener("mouseleave", function () {
    this.style.transform = "translateY(0) scale(1)";
    this.style.boxShadow = "0 8px 30px rgba(168, 85, 247, 0.2)";
  });
});

// Stat counter animation
function animateCounters() {
  const counters = document.querySelectorAll(".stat-number");

  counters.forEach((counter) => {
    const target = counter.textContent;
    const isPercentage = target.includes("%");
    const isTime = target.includes("/");
    const isPlusSign = target.includes("+");

    if (isPercentage || isPlusSign) {
      const numericValue = parseInt(target);
      let current = 0;
      const increment = numericValue / 50;

      const timer = setInterval(() => {
        current += increment;
        if (current >= numericValue) {
          counter.textContent = target; // Show original format
          clearInterval(timer);
        } else {
          if (isPercentage) {
            counter.textContent = Math.floor(current) + "%";
          } else if (isPlusSign) {
            counter.textContent = Math.floor(current) + "+";
          }
        }
      }, 30);
    }
  });
}

// Trigger counter animation when about section is visible
const aboutSection = document.querySelector("#about");
const aboutObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounters();
        aboutObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.5 }
);

aboutObserver.observe(aboutSection);

// Enhanced keyboard navigation
document.addEventListener("keydown", function (e) {
  // ESC key to close any modals or reset focus
  if (e.key === "Escape") {
    document.activeElement.blur();
  }

  // Enter key for CTA button
  if (e.key === "Enter" && e.target.classList.contains("cta-button")) {
    e.target.click();
  }
});

// Smooth scroll to top functionality
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

// Add scroll to top on logo click
document.querySelector(".logo").addEventListener("click", function (e) {
  e.preventDefault();
  scrollToTop();
});

// Performance optimization: Throttle scroll events
let ticking = false;

function updateHeader() {
  const header = document.querySelector("header");
  if (window.scrollY > 100) {
    header.style.background = "rgba(0, 0, 0, 0.9)";
    header.style.borderBottom = "1px solid rgba(168, 85, 247, 0.3)";
  } else {
    header.style.background = "rgba(255, 255, 255, 0.1)";
    header.style.borderBottom = "1px solid rgba(255, 255, 255, 0.2)";
  }
  ticking = false;
}

window.addEventListener("scroll", () => {
  if (!ticking) {
    requestAnimationFrame(updateHeader);
    ticking = true;
  }
});

// Add loading animation
window.addEventListener("load", function () {
  document.body.style.opacity = "0";
  document.body.style.transition = "opacity 0.5s ease-in-out";

  setTimeout(() => {
    document.body.style.opacity = "1";
  }, 100);
});

// Mobile menu toggle (if you want to add mobile hamburger menu later)
function toggleMobileMenu() {
  const nav = document.querySelector("nav");
  nav.classList.toggle("mobile-active");
}

// Add touch support for service cards on mobile
if ("ontouchstart" in window) {
  document.querySelectorAll(".service-card").forEach((card) => {
    card.addEventListener("touchstart", function () {
      this.style.transform = "translateY(-12px) scale(1.02)";
    });

    card.addEventListener("touchend", function () {
      setTimeout(() => {
        this.style.transform = "translateY(0) scale(1)";
      }, 150);
    });
  });
}
