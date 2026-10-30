// Personalise these values before publishing.
const PORTFOLIO_EMAIL = ""; // Example: "srivatsan@example.com"

const body = document.body;
const themeToggle = document.getElementById("themeToggle");
const themeIcon = document.getElementById("themeIcon");
const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");
const modal = document.getElementById("projectModal");

themeToggle.addEventListener("click", () => {
  const isLight = body.classList.toggle("light");
  themeIcon.textContent = isLight ? "☾" : "☼";
  themeToggle.setAttribute("aria-label", isLight ? "Switch to dark theme" : "Switch to light theme");
});

menuToggle.addEventListener("click", () => {
  const isOpen = navMenu.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

navMenu.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

const projectInfo = {
  portfolio: {
    eyebrow: "01 / COMPLETED STARTER PROJECT",
    title: "Personal Portfolio",
    text: "A mobile-first portfolio made with semantic HTML, responsive CSS, and vanilla JavaScript. It includes a theme switcher, mobile navigation, project detail dialogs, and contact links.",
    tags: ["HTML5", "CSS3", "JavaScript", "Responsive design"],
    note: "Next step: add your real GitHub repository and live website URL after publishing."
  },
  circuit: {
    eyebrow: "02 / PROJECT IDEA",
    title: "Virtual Circuit Lab",
    text: "A future learning project to document small circuits, simulation screenshots, component choices, and what each experiment teaches. You can begin with a simple LED-resistor circuit.",
    tags: ["Electronics", "eSim", "Circuit concepts"],
    note: "Status: idea only. Update this card when you have built and tested the project."
  },
  security: {
    eyebrow: "03 / PROJECT IDEA",
    title: "Security Notes Hub",
    text: "A structured notebook for beginner-friendly notes about networking, authentication, common web security concepts, and defensive testing in systems you own or have permission to test.",
    tags: ["Cybersecurity", "Networking", "Documentation"],
    note: "Status: idea only. Keep all security practice legal and inside authorised labs."
  }
};

document.querySelectorAll(".project-detail").forEach(button => {
  button.addEventListener("click", () => {
    const project = projectInfo[button.dataset.project];
    if (!project) return;
    document.getElementById("modalEyebrow").textContent = project.eyebrow;
    document.getElementById("modalTitle").textContent = project.title;
    document.getElementById("modalText").textContent = project.text;
    document.getElementById("modalNote").textContent = project.note;
    const tagContainer = document.getElementById("modalTags");
    tagContainer.replaceChildren();
    project.tags.forEach(tag => {
      const item = document.createElement("span");
      item.textContent = tag;
      tagContainer.appendChild(item);
    });
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    document.querySelector(".modal-close").focus();
  });
});

function closeModal() {
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
}
modal.querySelectorAll("[data-close-modal]").forEach(item => item.addEventListener("click", closeModal));
document.addEventListener("keydown", event => {
  if (event.key === "Escape" && modal.classList.contains("open")) closeModal();
});

const copyEmail = document.getElementById("copyEmail");
const copyStatus = document.getElementById("copyStatus");
copyEmail.addEventListener("click", async () => {
  if (!PORTFOLIO_EMAIL) {
    copyStatus.textContent = "Open script.js and add your email to PORTFOLIO_EMAIL first.";
    return;
  }
  try {
    await navigator.clipboard.writeText(PORTFOLIO_EMAIL);
    copyStatus.textContent = "Email address copied!";
  } catch {
    copyStatus.textContent = `Email: ${PORTFOLIO_EMAIL}`;
  }
});

document.getElementById("year").textContent = new Date().getFullYear();
