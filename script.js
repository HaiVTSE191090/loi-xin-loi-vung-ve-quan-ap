const copyButton = document.querySelector("[data-copy]");
const toast = document.querySelector(".toast");
const emailText = document.querySelector("#emailText");

const showToast = () => {
  toast.classList.add("is-visible");
  window.setTimeout(() => toast.classList.remove("is-visible"), 1800);
};

copyButton?.addEventListener("click", async () => {
  const text = emailText?.innerText.trim();

  if (!text) return;

  try {
    await navigator.clipboard.writeText(text);
    showToast();
  } catch {
    const selection = window.getSelection();
    const range = document.createRange();
    range.selectNodeContents(emailText);
    selection.removeAllRanges();
    selection.addRange(range);
    showToast();
  }
});

const revealTargets = document.querySelectorAll(".letter-card, .email-card, .section-heading, .email-copy");

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-revealed");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.16 }
);

revealTargets.forEach(target => {
  target.style.opacity = "0";
  target.style.transform = "translateY(22px)";
  target.style.transition = "opacity 700ms ease, transform 700ms cubic-bezier(0.2, 0.9, 0.2, 1)";
  observer.observe(target);
});

const style = document.createElement("style");
style.textContent = `
  .is-revealed {
    opacity: 1 !important;
    transform: translateY(0) !important;
  }
`;
document.head.append(style);
