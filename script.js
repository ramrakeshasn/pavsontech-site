/* ============================================================
   Pavsontech – Main JavaScript
   ============================================================ */

(function () {
  'use strict';

  // ---------- Navbar scroll behavior ----------
  const navbar = document.getElementById('navbar');

  function updateNavbar() {
    if (window.scrollY > 20) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', updateNavbar, { passive: true });
  updateNavbar();

  // ---------- Mobile hamburger menu ----------
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('nav-links');

  hamburger.addEventListener('click', function () {
    const isOpen = navLinks.classList.toggle('open');
    hamburger.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', String(isOpen));
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  // Close menu when a nav link is clicked
  navLinks.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      navLinks.classList.remove('open');
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });

  // ---------- Smooth-scroll offset for fixed navbar ----------
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const navH = parseInt(getComputedStyle(document.documentElement)
        .getPropertyValue('--nav-h'), 10) || 72;
      const top  = target.getBoundingClientRect().top + window.scrollY - navH;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

  // ---------- Scroll-reveal animations ----------
  const revealEls = document.querySelectorAll(
    '.service-card, .portfolio-card, .about-card, .about-text, .contact-info, .contact-form'
  );

  revealEls.forEach(function (el) {
    el.classList.add('fade-up');
  });

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    revealEls.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    // Fallback: show everything immediately
    revealEls.forEach(function (el) {
      el.classList.add('visible');
    });
  }

  // ---------- Contact form ----------
  const form    = document.getElementById('contact-form');
  const success = document.getElementById('form-success');

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      success.textContent = '';

      const name    = form.elements['name'].value.trim();
      const email   = form.elements['email'].value.trim();
      const message = form.elements['message'].value.trim();

      if (!name || !email || !message) {
        success.style.color = '#f87171';
        success.textContent = 'Please fill in all required fields.';
        return;
      }

      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        success.style.color = '#f87171';
        success.textContent = 'Please enter a valid email address.';
        return;
      }

      // Simulate a successful submission (replace with real API call)
      const btn = form.querySelector('button[type="submit"]');
      btn.disabled = true;
      btn.textContent = 'Sending…';

      setTimeout(function () {
        form.reset();
        btn.disabled = false;
        btn.textContent = 'Send Message';
        success.style.color = '#4ade80';
        success.textContent = '✓ Thank you! We\'ll be in touch soon.';
      }, 1200);
    });
  }

  // ---------- Footer year ----------
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
})();
