(function () {
  'use strict';

  var root = document.documentElement;
  root.classList.add('js-enabled');

  /* ------------------------------------------------------------------ */
  /* Mobile nav toggle                                                   */
  /* ------------------------------------------------------------------ */
  var header = document.querySelector('.site-header');
  var navToggle = document.getElementById('nav-toggle');
  var mobileNav = document.getElementById('mobile-nav');

  if (navToggle && header && mobileNav) {
    navToggle.addEventListener('click', function () {
      var isOpen = header.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
      navToggle.querySelector('.sr-only').textContent = isOpen
        ? 'Close menu'
        : 'Open menu';
    });

    // Close the mobile menu after choosing a link, and on Escape.
    mobileNav.addEventListener('click', function (event) {
      if (event.target.tagName === 'A') {
        header.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.querySelector('.sr-only').textContent = 'Open menu';
      }
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && header.classList.contains('is-open')) {
        header.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.querySelector('.sr-only').textContent = 'Open menu';
        navToggle.focus();
      }
    });
  }

  /* ------------------------------------------------------------------ */
  /* Scroll reveal — skipped entirely for prefers-reduced-motion         */
  /* ------------------------------------------------------------------ */
  var prefersReducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches;

  var revealEls = document.querySelectorAll('.reveal');

  if (!prefersReducedMotion && 'IntersectionObserver' in window && revealEls.length) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );

    revealEls.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    revealEls.forEach(function (el) {
      el.classList.add('is-visible');
    });
  }

  /* ------------------------------------------------------------------ */
  /* Footer year                                                         */
  /* ------------------------------------------------------------------ */
  var yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  /* ------------------------------------------------------------------ */
  /* Contact form — client-side only (no backend wired up)               */
  /* ------------------------------------------------------------------ */
  var form = document.getElementById('contact-form');
  if (!form) return;

  var status = document.getElementById('form-status');

  var fields = {
    name: {
      input: document.getElementById('name'),
      error: document.getElementById('name-error'),
      validate: function (value) {
        return value.trim().length > 0 ? '' : 'Please enter your name.';
      },
    },
    email: {
      input: document.getElementById('email'),
      error: document.getElementById('email-error'),
      validate: function (value) {
        var pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!value.trim()) return 'Please enter your email.';
        if (!pattern.test(value.trim())) return 'Please enter a valid email address.';
        return '';
      },
    },
    message: {
      input: document.getElementById('message'),
      error: document.getElementById('message-error'),
      validate: function (value) {
        return value.trim().length > 0 ? '' : 'Please enter a message.';
      },
    },
  };

  function setFieldError(field, message) {
    var row = field.input.closest('.form-row');
    if (message) {
      row.classList.add('has-error');
      field.error.textContent = message;
      field.error.hidden = false;
      field.input.setAttribute('aria-invalid', 'true');
    } else {
      row.classList.remove('has-error');
      field.error.textContent = '';
      field.error.hidden = true;
      field.input.removeAttribute('aria-invalid');
    }
  }

  Object.keys(fields).forEach(function (key) {
    var field = fields[key];
    field.input.addEventListener('blur', function () {
      setFieldError(field, field.validate(field.input.value));
    });
  });

  form.addEventListener('submit', function (event) {
    event.preventDefault();

    var isValid = true;
    Object.keys(fields).forEach(function (key) {
      var field = fields[key];
      var message = field.validate(field.input.value);
      setFieldError(field, message);
      if (message) isValid = false;
    });

    if (!isValid) {
      status.textContent = 'Please fix the highlighted fields.';
      status.classList.remove('is-success');
      var firstInvalid = form.querySelector('.has-error input, .has-error textarea');
      if (firstInvalid) firstInvalid.focus();
      return;
    }

    // No backend is wired up on this demo site — acknowledge locally.
    status.textContent = "Thanks! This is a demo form, so no message was actually sent — reach me directly at hello@julesbennett.design.";
    status.classList.add('is-success');
    form.reset();
  });
})();
