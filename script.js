const header = document.getElementById("site-header");
const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");
const form = document.getElementById("contact-form");
const success = document.getElementById("form-success");
const cycler = document.getElementById("font-cycler");
const cyclerCurrent = document.getElementById("cycler-current");
const cyclerNext = document.getElementById("cycler-next");

const fonts = [
  { family: '"Inter", system-ui, sans-serif', style: "normal", weight: "500" },
  { family: '"Trebuchet MS", sans-serif', style: "normal", weight: "500" },
  { family: 'Georgia, "Times New Roman", serif', style: "italic", weight: "500" },
  { family: '"Palatino Linotype", "Book Antiqua", serif', style: "normal", weight: "500" },
  { family: '"Segoe UI", Tahoma, sans-serif', style: "normal", weight: "500" },
  { family: '"JetBrains Mono", ui-monospace, monospace', style: "normal", weight: "500" }
];

if (cycler && cyclerCurrent && cyclerNext) {
  let currentIndex = 0;
  let nextIndex = 1;
  let swapping = false;

  const applyFont = (element, font) => {
    element.style.fontFamily = font.family;
    element.style.fontStyle = font.style;
    element.style.fontWeight = font.weight;
  };

  applyFont(cyclerCurrent, fonts[currentIndex]);
  applyFont(cyclerNext, fonts[nextIndex]);

  setInterval(() => {
    if (swapping) return;
    swapping = true;

    applyFont(cyclerNext, fonts[nextIndex]);

    cyclerCurrent.style.opacity = "0";
    cyclerCurrent.style.filter = "blur(4px)";
    cyclerCurrent.style.transform = "scale(0.97)";

    cyclerNext.style.opacity = "1";
    cyclerNext.style.filter = "blur(0)";
    cyclerNext.style.transform = "scale(1)";

    setTimeout(() => {
      currentIndex = nextIndex;
      nextIndex = (nextIndex + 1) % fonts.length;

      applyFont(cyclerCurrent, fonts[currentIndex]);

      cyclerCurrent.style.opacity = "1";
      cyclerCurrent.style.filter = "blur(0)";
      cyclerCurrent.style.transform = "scale(1)";

      cyclerNext.style.opacity = "0";
      cyclerNext.style.filter = "blur(4px)";
      cyclerNext.style.transform = "scale(1.03)";

      swapping = false;
    }, 180);
  }, 700);
}

window.addEventListener("scroll", () => {
  if (window.scrollY > 20) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});

menuToggle.addEventListener("click", () => {
  const open = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", open ? "true" : "false");
  menuToggle.textContent = open ? "Close" : "Menu";
});

navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.textContent = "Menu";
  });
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  form.hidden = true;
  success.hidden = false;

  setTimeout(() => {
    form.reset();
    success.hidden = true;
    form.hidden = false;
  }, 3000);
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
