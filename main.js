"use strict";

/**
 * SANZ OFFICIAL — main.js
 */

/* 1. Stagger button entrance */
function bootLinks() {
  const buttons = document.querySelectorAll(".link-btn");
  buttons.forEach((btn, i) => {
    setTimeout(() => {
      btn.style.transition =
        "opacity 0.45s ease, transform 0.45s cubic-bezier(0.16,1,0.3,1), background 0.22s, border-color 0.22s, box-shadow 0.22s";
      btn.style.opacity   = "1";
      btn.style.transform = "translateY(0)";
    }, 120 + i * 75);
  });
}

/* 2. Ripple on click */
function initRipple() {
  document.querySelectorAll(".link-btn").forEach((btn) => {
    btn.addEventListener("click", function (e) {
      this.querySelectorAll(".ripple").forEach((r) => r.remove());

      const rect   = this.getBoundingClientRect();
      const size   = Math.max(rect.width, rect.height) * 1.8;
      const x      = e.clientX - rect.left - size / 2;
      const y      = e.clientY - rect.top  - size / 2;

      const ripple = document.createElement("span");
      ripple.className = "ripple";
      ripple.style.cssText = `
        position: absolute;
        left: ${x}px;
        top: ${y}px;
        width: ${size}px;
        height: ${size}px;
        border-radius: 50%;
        background: rgba(255,255,255,0.12);
        transform: scale(0);
        animation: rippleAnim 0.5s ease-out forwards;
        pointer-events: none;
        z-index: 0;
      `;

      this.appendChild(ripple);
      setTimeout(() => ripple.remove(), 520);
    });
  });

  if (!document.getElementById("ripple-style")) {
    const s = document.createElement("style");
    s.id = "ripple-style";
    s.textContent = "@keyframes rippleAnim { to { transform: scale(1); opacity: 0; } }";
    document.head.appendChild(s);
  }
}

/* 3. Video fallback */
function handleVideoFallback() {
  const video  = document.getElementById("bg-video");
  if (!video) return;

  video.addEventListener("error", () => {
    video.style.display = "none";
  });

  const source = video.querySelector("source");
  if (source && source.src.includes("YOUR_VIDEO")) {
    video.style.display = "none";
  }
}

/* INIT */
document.addEventListener("DOMContentLoaded", () => {
  bootLinks();
  initRipple();
  handleVideoFallback();
});
