/* Cookie souhlas — Google Analytics se načte až po kliknutí na Přijmout. */
(function () {
  "use strict";

  var KEY = "rd-cookie-consent";
  var GA_ID = "G-473N7QTW4C";

  function loadGA() {
    if (window.__gaLoaded) return;
    window.__gaLoaded = true;
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () {
      dataLayer.push(arguments);
    };
    gtag("js", new Date());
    gtag("config", GA_ID);
    var s = document.createElement("script");
    s.async = true;
    s.src = "https://www.googletagmanager.com/gtag/js?id=" + GA_ID;
    document.head.appendChild(s);
  }

  function getConsent() {
    try {
      return localStorage.getItem(KEY);
    } catch (e) {
      return null;
    }
  }

  function setConsent(value) {
    try {
      localStorage.setItem(KEY, value);
    } catch (e) {}
  }

  function hideBanner() {
    var el = document.getElementById("cookie-banner");
    if (!el) return;
    el.classList.remove("is-visible");
    setTimeout(function () {
      el.remove();
    }, 300);
  }

  function showBanner() {
    if (document.getElementById("cookie-banner")) return;
    var el = document.createElement("div");
    el.id = "cookie-banner";
    el.className = "cookie-banner";
    el.setAttribute("role", "dialog");
    el.setAttribute("aria-label", "Nastavení cookies");
    el.innerHTML =
      '<div class="cookie-banner-inner">' +
      '<p>Web používá Google Analytics k měření návštěvnosti. Analytické cookies se uloží až po vašem souhlasu. Víc v <a href="/ochrana-udaju">zásadách zpracování údajů</a>.</p>' +
      '<div class="cookie-banner-actions">' +
      '<button type="button" class="btn btn-ghost" data-consent="reject">Odmítnout</button>' +
      '<button type="button" class="btn btn-gold" data-consent="accept">Přijmout</button>' +
      "</div>" +
      "</div>";
    document.body.appendChild(el);
    requestAnimationFrame(function () {
      el.classList.add("is-visible");
    });

    el.addEventListener("click", function (e) {
      var btn = e.target.closest("[data-consent]");
      if (!btn) return;
      var choice = btn.getAttribute("data-consent");
      if (choice === "accept") {
        setConsent("granted");
        loadGA();
      } else {
        setConsent("denied");
      }
      hideBanner();
    });
  }

  var consent = getConsent();
  if (consent === "granted") {
    loadGA();
  } else if (consent !== "denied") {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", showBanner);
    } else {
      showBanner();
    }
  }

  document.addEventListener("click", function (e) {
    var trigger = e.target.closest("#cookie-settings-link");
    if (!trigger) return;
    e.preventDefault();
    showBanner();
  });
})();
