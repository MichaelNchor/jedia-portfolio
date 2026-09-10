/* =========================================================
   JEDIA ANDOH — PORTFOLIO
   ========================================================= */
(function () {
  'use strict';

  /* ---------- MOBILE MENU ---------- */
  var toggle = document.getElementById('menu-toggle');
  var nav = document.getElementById('nav');

  function closeMenu() {
    nav.classList.remove('open');
    toggle.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
  }

  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      toggle.classList.toggle('open', open);
      toggle.setAttribute('aria-expanded', String(open));
    });
    nav.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', closeMenu);
    });
  }

  /* ---------- SCROLL PROGRESS ---------- */
  var progress = document.getElementById('progress');
  function onScroll() {
    var max = document.documentElement.scrollHeight - window.innerHeight;
    var pct = max > 0 ? (window.scrollY / max) * 100 : 0;
    progress.style.width = pct + '%';
  }
  if (progress) {
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ---------- REVEAL ON SCROLL ---------- */
  var reveals = document.querySelectorAll('.rv');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.05, rootMargin: '0px 0px -6% 0px' });

    reveals.forEach(function (el, i) {
      el.style.transitionDelay = (i % 5) * 60 + 'ms';
      io.observe(el);
    });

    // Safety net: never leave content invisible if the observer misses an
    // element (very tall sections, late layout, restored scroll positions).
    window.addEventListener('load', function () {
      window.setTimeout(function () {
        reveals.forEach(function (el) {
          var r = el.getBoundingClientRect();
          if (r.top < window.innerHeight && r.bottom > 0) el.classList.add('in');
        });
      }, 400);
    });
  } else {
    reveals.forEach(function (el) { el.classList.add('in'); });
  }

  /* ---------- ANNOTATION BOX ON THE PORTRAIT ---------- */
  var portraitBox = document.getElementById('portrait-box');
  var portraitWrap = document.getElementById('portrait-wrap');
  if (portraitBox) {
    window.setTimeout(function () {
      portraitBox.classList.add('is-on');
      if (portraitWrap) portraitWrap.classList.add('is-on');
    }, 1400);
  }

  /* ---------- ACTIVE NAV LINK ---------- */
  var sections = document.querySelectorAll('section[id]');
  var links = {};
  document.querySelectorAll('.nav-links a[href^="#"]').forEach(function (a) {
    links[a.getAttribute('href').slice(1)] = a;
  });

  if ('IntersectionObserver' in window && sections.length) {
    var navIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        var link = links[e.target.id];
        if (!link) return;
        if (e.isIntersecting) {
          Object.keys(links).forEach(function (k) { links[k].classList.remove('active'); });
          link.classList.add('active');
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    sections.forEach(function (s) { navIO.observe(s); });
  }

  /* ---------- THEME TOGGLE ---------- */
  var THEME_KEY = 'theme-preference';
  var themeToggle = document.getElementById('theme-toggle');

  function isDark() { return document.documentElement.classList.contains('dark'); }

  function syncToggle() {
    if (!themeToggle) return;
    var dark = isDark();
    themeToggle.setAttribute('aria-pressed', String(dark));
    themeToggle.setAttribute('aria-label', dark ? 'Switch to light theme' : 'Switch to dark theme');
  }

  function setTheme(dark) {
    document.documentElement.classList.toggle('dark', dark);
    try { localStorage.setItem(THEME_KEY, dark ? 'dark' : 'light'); } catch (e) { /* private mode */ }
    syncToggle();
  }

  if (themeToggle) {
    syncToggle();
    themeToggle.addEventListener('click', function () { setTheme(!isDark()); });
  }

  /* ---------- YEAR ---------- */
  var year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
})();
