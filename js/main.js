/* =========================================================
   Adhi.id — main.js
   - Constellation canvas (ambient twinkle + subtle parallax)
   - Signature gold star in hero + callback in CTA
   - Scroll reveal, sticky header, mobile nav
   - Respects prefers-reduced-motion & low-end devices
   ========================================================= */

(function () {
  'use strict';

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ------------------------------------------------------------------
     CONSTELLATION BACKGROUND
     A lightweight star field with thin connecting lines.
     Density scales with viewport area but is capped for low-end phones.
  ------------------------------------------------------------------ */
  function createConstellation(canvas, options) {
    const opts = Object.assign({
      density: 0.00009,   // stars per px²
      maxStars: 140,      // hard cap
      linkDist: 130,      // px distance to draw a line
      speed: 0.12,        // base drift speed
      starColor: '230, 232, 238',
      lineColor: '255, 255, 255',
      maxLineOpacity: 0.06,
      signature: false    // add the gold signature star
    }, options || {});

    const ctx = canvas.getContext('2d');
    let stars = [];
    let signatureStar = null;
    let w = 0, h = 0, dpr = Math.min(window.devicePixelRatio || 1, 2);
    let scrollOffset = 0;
    let rafId = null;
    let running = true;

    function resize() {
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed();
    }

    function seed() {
      // adapt count to area, cap for performance
      let count = Math.round(w * h * opts.density);
      // reduce density further on small / low-end screens
      if (w < 600) count = Math.round(count * 0.6);
      count = Math.min(count, opts.maxStars);

      stars = [];
      for (let i = 0; i < count; i++) {
        stars.push(makeStar());
      }

      if (opts.signature) {
        signatureStar = {
          x: w * (w < 700 ? 0.5 : 0.62),
          y: h * 0.42,
          r: 3.2,
          phase: 0
        };
      }
    }

    function makeStar() {
      return {
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 1.3 + 0.4,
        vx: (Math.random() - 0.5) * opts.speed,
        vy: (Math.random() - 0.5) * opts.speed,
        tw: Math.random() * Math.PI * 2,   // twinkle phase
        twSpeed: Math.random() * 0.015 + 0.005
      };
    }

    function step() {
      if (!running) return;
      ctx.clearRect(0, 0, w, h);

      const len = stars.length;

      // draw links (skip on very small screens to save perf)
      if (w > 480) {
        for (let i = 0; i < len; i++) {
          const a = stars[i];
          for (let j = i + 1; j < len; j++) {
            const b = stars[j];
            const dx = a.x - b.x;
            const dy = a.y - b.y;
            const dist = dx * dx + dy * dy;
            const max = opts.linkDist * opts.linkDist;
            if (dist < max) {
              const op = (1 - dist / max) * opts.maxLineOpacity;
              ctx.strokeStyle = 'rgba(' + opts.lineColor + ',' + op + ')';
              ctx.lineWidth = 0.6;
              ctx.beginPath();
              ctx.moveTo(a.x, a.y);
              ctx.lineTo(b.x, b.y);
              ctx.stroke();
            }
          }
        }
      }

      // draw + update stars
      for (let i = 0; i < len; i++) {
        const s = stars[i];
        s.tw += s.twSpeed;
        const twinkle = 0.5 + 0.5 * Math.sin(s.tw);
        const py = s.y + scrollOffset * 0.04; // subtle parallax

        ctx.beginPath();
        ctx.fillStyle = 'rgba(' + opts.starColor + ',' + (0.35 + twinkle * 0.45) + ')';
        ctx.arc(s.x, py, s.r, 0, Math.PI * 2);
        ctx.fill();

        if (!prefersReduced) {
          s.x += s.vx;
          s.y += s.vy;
          if (s.x < -10) s.x = w + 10;
          if (s.x > w + 10) s.x = -10;
          if (s.y < -10) s.y = h + 10;
          if (s.y > h + 10) s.y = -10;
        }
      }

      // signature gold star
      if (signatureStar) {
        const s = signatureStar;
        s.phase += 0.03;
        const glow = 0.55 + 0.45 * Math.sin(s.phase);
        const py = s.y + scrollOffset * 0.04;

        const grad = ctx.createRadialGradient(s.x, py, 0, s.x, py, 22);
        grad.addColorStop(0, 'rgba(240,180,41,' + (0.6 * glow) + ')');
        grad.addColorStop(1, 'rgba(240,180,41,0)');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(s.x, py, 22, 0, Math.PI * 2);
        ctx.fill();

        ctx.beginPath();
        ctx.fillStyle = 'rgba(255,230,160,' + (0.7 + glow * 0.3) + ')';
        ctx.arc(s.x, py, s.r, 0, Math.PI * 2);
        ctx.fill();
      }

      rafId = requestAnimationFrame(step);
    }

    function start() {
      if (rafId) cancelAnimationFrame(rafId);
      running = true;
      // For reduced motion we still draw one static frame
      if (prefersReduced) {
        running = false;
        ctx.clearRect(0, 0, w, h);
        drawStatic();
      } else {
        step();
      }
    }

    function drawStatic() {
      for (let i = 0; i < stars.length; i++) {
        const s = stars[i];
        ctx.beginPath();
        ctx.fillStyle = 'rgba(' + opts.starColor + ',0.5)';
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();
      }
      if (signatureStar) {
        ctx.beginPath();
        ctx.fillStyle = 'rgba(240,180,41,0.9)';
        ctx.arc(signatureStar.x, signatureStar.y, signatureStar.r, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // pause when tab not visible to save battery / CPU
    document.addEventListener('visibilitychange', function () {
      if (document.hidden) {
        running = false;
        if (rafId) cancelAnimationFrame(rafId);
      } else if (!prefersReduced) {
        start();
      }
    });

    return {
      resize: resize,
      start: start,
      setScroll: function (v) { scrollOffset = v; }
    };
  }

  /* ------------------------------------------------------------------ */
  document.addEventListener('DOMContentLoaded', function () {

    // Year in footer
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    // --- Background constellation (full page) ---
    const bgCanvas = document.getElementById('constellation-canvas');
    let bg = null;
    if (bgCanvas) {
      bg = createConstellation(bgCanvas, {
        density: 0.00009,
        maxStars: 150,
        signature: true,
        maxLineOpacity: 0.05
      });
      bg.resize();
      bg.start();
    }

    // --- CTA callback constellation (smaller, denser glow) ---
    const ctaCanvas = document.getElementById('cta-canvas');
    let cta = null;
    if (ctaCanvas) {
      cta = createConstellation(ctaCanvas, {
        density: 0.00012,
        maxStars: 60,
        signature: false,
        linkDist: 110,
        maxLineOpacity: 0.07
      });
      cta.resize();
      cta.start();
    }

    // Resize handling (debounced)
    let resizeTimer;
    window.addEventListener('resize', function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function () {
        if (bg) { bg.resize(); bg.start(); }
        if (cta) { cta.resize(); cta.start(); }
      }, 200);
    });

    // Parallax on scroll
    if (bg && !prefersReduced) {
      let ticking = false;
      window.addEventListener('scroll', function () {
        if (!ticking) {
          window.requestAnimationFrame(function () {
            bg.setScroll(window.scrollY);
            ticking = false;
          });
          ticking = true;
        }
      }, { passive: true });
    }

    // --- Sticky header style on scroll ---
    const header = document.getElementById('site-header');
    if (header) {
      const onScroll = function () {
        if (window.scrollY > 20) header.classList.add('scrolled');
        else header.classList.remove('scrolled');
      };
      onScroll();
      window.addEventListener('scroll', onScroll, { passive: true });
    }

    // --- Mobile nav toggle ---
    const navToggle = document.getElementById('nav-toggle');
    const mainNav = document.getElementById('main-nav');
    if (navToggle && mainNav) {
      navToggle.addEventListener('click', function () {
        const open = mainNav.classList.toggle('open');
        navToggle.classList.toggle('open', open);
        navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
        navToggle.setAttribute('aria-label', open ? 'Tutup menu' : 'Buka menu');
      });
      // close on link click
      mainNav.querySelectorAll('a').forEach(function (link) {
        link.addEventListener('click', function () {
          mainNav.classList.remove('open');
          navToggle.classList.remove('open');
          navToggle.setAttribute('aria-expanded', 'false');
        });
      });
    }

    // --- Scroll reveal ---
    const revealEls = document.querySelectorAll('.reveal');
    if ('IntersectionObserver' in window && !prefersReduced) {
      const io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            io.unobserve(entry.target);
          }
        });
      }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
      revealEls.forEach(function (el) { io.observe(el); });
    } else {
      revealEls.forEach(function (el) { el.classList.add('visible'); });
    }
  });
})();
