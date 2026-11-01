/* Mobilní menu + jemné odhalení sekcí při scrollu. Bez knihoven. */
(function () {
  "use strict";

  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("nav");
  var mq = window.matchMedia("(max-width: 900px)");

  function applyLayout() {
    if (!toggle || !nav) return;
    if (mq.matches) {
      nav.hidden = toggle.getAttribute("aria-expanded") !== "true";
    } else {
      nav.hidden = false;
    }
  }

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!open));
      nav.hidden = open;
    });

    nav.addEventListener("click", function (e) {
      if (e.target.tagName === "A" && mq.matches) {
        toggle.setAttribute("aria-expanded", "false");
        nav.hidden = true;
      }
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") {
        toggle.setAttribute("aria-expanded", "false");
        nav.hidden = true;
        toggle.focus();
      }
    });

    mq.addEventListener("change", applyLayout);
    applyLayout();
  }

  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var targets = document.querySelectorAll(".reveal");

  if (reduced || !("IntersectionObserver" in window)) {
    targets.forEach(function (el) {
      el.classList.add("is-visible");
    });
    return;
  }

  var io = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    },
    { rootMargin: "0px 0px -10% 0px", threshold: 0.1 }
  );

  targets.forEach(function (el) {
    io.observe(el);
  });
})();
