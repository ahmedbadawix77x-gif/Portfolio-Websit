// ✅ Initialize AOS (Animations on Scroll)
AOS.init({
  duration: 1000,
  once: true,
  easing: "ease-in-out",
  offset: 100,
});

// ✅ Splash / Preloader
window.addEventListener("load", () => {
  const preloader = document.getElementById("preloader");
  if (preloader) {
    setTimeout(() => {
      preloader.style.opacity = "0";
      setTimeout(() => {
        preloader.style.display = "none";
      }, 900);
    }, 1650);
  }
});

// ✅ Typing Effect
const typingTexts = [
  "Ahmed Badawi",
  "Full-Stack Developer",
  "React & Node.js Enthusiast",
  "Building for the Future",
  "Passionate about Code",
];

let typingIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingElm = document.querySelector(".typing");

function typeEffect() {
  if (!typingElm) return;

  const current = typingTexts[typingIndex];
  const speed = isDeleting ? 40 : 70;

  if (!isDeleting) {
    typingElm.textContent = current.substring(0, charIndex + 1);
    charIndex++;
    if (charIndex === current.length) {
      setTimeout(() => {
        isDeleting = true;
        typeEffect();
      }, 1200);
      return;
    }
  } else {
    typingElm.textContent = current.substring(0, charIndex - 1);
    charIndex--;
    if (charIndex === 0) {
      isDeleting = false;
      typingIndex = (typingIndex + 1) % typingTexts.length;
      setTimeout(typeEffect, 650);
      return;
    }
  }

  setTimeout(typeEffect, speed);
}

// Start typing after preloader appears
if (typingElm) {
  setTimeout(typeEffect, 1100);
}

// ✅ Smooth Scrolling & Active Navigation
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const targetId = this.getAttribute("href");
    const target = document.querySelector(targetId);
    const nav = document.querySelector("nav");

    if (target && nav) {
      const navHeight = nav.offsetHeight;
      const targetPosition = target.offsetTop - navHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });

      // Update active nav link
      document.querySelectorAll("nav .nav-link").forEach((link) => {
        link.classList.remove("active");
      });
      this.classList.add("active");
    }
  });
});

// ✅ Auto-update active nav on scroll
window.addEventListener("scroll", () => {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll("nav .nav-link");
  let currentSectionId = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (window.scrollY >= sectionTop - sectionHeight / 3) {
      currentSectionId = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${currentSectionId}`) {
      link.classList.add("active");
    }
  });
});

// ✅ Skills Bar Animation with Intersection Observer
document.querySelectorAll(".level-bar").forEach((bar) => {
  const percent = Number(bar.dataset.percent) || 0;
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            bar.style.width = `${percent}%`;
          }, 300);
          observer.disconnect(); // أفضل من unobserve() إذا كنت مش هتستعمله تاني
        }
      });
    },
    { threshold: 0.2 }
  );
  observer.observe(bar);
});

// ✅ Contact Form Handling
const contactForm = document.getElementById("contact-form");
if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const msg = contactForm.querySelector(".form-message");
    if (msg) {
      msg.textContent = "Thank you! Your message has been sent.";
      msg.style.color = "#4cc9f0";
      setTimeout(() => {
        msg.textContent = "";
      }, 4200);
    }
    contactForm.reset();
  });
}

// ✅ Project Image Click → Open Demo
document.querySelectorAll(".project-image").forEach((img) => {
  img.addEventListener("click", function (e) {
    const link = this.querySelector("a");
    if (link && link.href) {
      e.preventDefault();
      window.open(link.href, "_blank", "noopener,noreferrer");
    }
  });
});

// ✅ 3D Tilt Effect (Disabled on Touch Devices)
document.addEventListener("DOMContentLoaded", () => {
  const heroWrapper = document.querySelector(".hero-3d-wrapper");
  if (!heroWrapper) return;

  // Detect if device is touch-based (mobile/tablet)
  const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0;
  if (isTouchDevice) return; // Skip effect on mobile

  let isHovering = false;

  const handleMouseMove = (e) => {
    if (!isHovering) return;
    const rect = heroWrapper.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateY = ((x - centerX) / centerX) * 6;
    const rotateX = ((centerY - y) / centerY) * 6;

    const img = heroWrapper.querySelector(".hero-img");
    if (img) {
      img.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    }
  };

  const handleMouseLeave = () => {
    isHovering = false;
    const img = heroWrapper.querySelector(".hero-img");
    if (img) {
      img.style.transform = "rotateX(0) rotateY(0) scale3d(1,1,1)";
    }
  };

  const handleMouseEnter = () => {
    isHovering = true;
  };

  heroWrapper.addEventListener("mouseenter", handleMouseEnter);
  heroWrapper.addEventListener("mousemove", handleMouseMove);
  heroWrapper.addEventListener("mouseleave", handleMouseLeave);
});
