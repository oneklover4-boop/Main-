(function () {
  'use strict';

  var root = document.documentElement;
  root.classList.add('js-enabled');

  var prefersReducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches;

  /* ------------------------------------------------------------------ */
  /* Mobile nav toggle                                                   */
  /* ------------------------------------------------------------------ */
  var header = document.querySelector('.site-header');
  var navToggle = document.getElementById('nav-toggle');
  var mobileNav = document.getElementById('mobile-nav');

  function closeMobileNav() {
    header.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
    navToggle.querySelector('.sr-only').textContent = 'Open menu';
  }

  if (navToggle && header && mobileNav) {
    navToggle.addEventListener('click', function () {
      var isOpen = header.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
      navToggle.querySelector('.sr-only').textContent = isOpen
        ? 'Close menu'
        : 'Open menu';
    });

    mobileNav.addEventListener('click', function (event) {
      if (event.target.tagName === 'A') closeMobileNav();
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && header.classList.contains('is-open')) {
        closeMobileNav();
        navToggle.focus();
      }
    });
  }

  /* ------------------------------------------------------------------ */
  /* Scroll reveal — skipped entirely for prefers-reduced-motion         */
  /* ------------------------------------------------------------------ */
  var revealEls = document.querySelectorAll('.reveal');

  if (!prefersReducedMotion && 'IntersectionObserver' in window && revealEls.length) {
    var revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );

    revealEls.forEach(function (el) {
      revealObserver.observe(el);
    });
  } else {
    revealEls.forEach(function (el) {
      el.classList.add('is-visible');
    });
  }

  /* ------------------------------------------------------------------ */
  /* Single scroll ticker: progress bar, header state, back-to-top       */
  /* ------------------------------------------------------------------ */
  var progressBar = document.getElementById('scroll-progress-bar');
  var scrollTopBtn = document.getElementById('scroll-top-btn');
  var logoMark = document.getElementById('logo-mark');
  var lastScrollY = window.scrollY;
  var ticking = false;
  var SHOW_BACK_TO_TOP_AT = 480;
  var HIDE_HEADER_AFTER = 120;

  // Decorative parallax layers (hero + about shapes). Cache elements and
  // their per-element speed once so the scroll handler stays cheap.
  var motionEnabled = !prefersReducedMotion;
  var parallaxLayers = motionEnabled
    ? Array.prototype.map.call(document.querySelectorAll('[data-parallax]'), function (el) {
        return { el: el, speed: parseFloat(el.getAttribute('data-parallax')) || 0.15 };
      })
    : [];

  function updateParallax() {
    if (!parallaxLayers.length) return;
    var viewportCenter = window.innerHeight / 2;
    parallaxLayers.forEach(function (layer) {
      var rect = layer.el.getBoundingClientRect();
      var elCenter = rect.top + rect.height / 2;
      var delta = (elCenter - viewportCenter) * layer.speed;
      layer.el.style.transform = 'translateY(' + (-delta).toFixed(1) + 'px)';
    });
  }

  function onScrollFrame() {
    ticking = false;
    var scrollY = window.scrollY;
    var docHeight = document.documentElement.scrollHeight - window.innerHeight;
    var progress = docHeight > 0 ? Math.min(scrollY / docHeight, 1) : 0;

    if (progressBar) {
      progressBar.style.transform = 'scaleX(' + progress + ')';
    }

    // The logo mark visibly rotates as the page scrolls — a small,
    // continuous piece of feedback tied directly to scroll position.
    if (logoMark && motionEnabled) {
      logoMark.style.transform = 'rotate(' + (progress * 360).toFixed(1) + 'deg)';
    }

    updateParallax();

    if (header) {
      header.classList.toggle('is-scrolled', scrollY > 4);

      var scrollingDown = scrollY > lastScrollY;
      if (scrollY > HIDE_HEADER_AFTER && scrollingDown && !header.classList.contains('is-open')) {
        header.classList.add('is-hidden');
      } else {
        header.classList.remove('is-hidden');
      }
    }

    if (scrollTopBtn) {
      var shouldShow = scrollY > SHOW_BACK_TO_TOP_AT;
      if (shouldShow && scrollTopBtn.hidden) {
        scrollTopBtn.hidden = false;
        requestAnimationFrame(function () {
          scrollTopBtn.classList.add('is-visible');
        });
      } else if (!shouldShow && !scrollTopBtn.hidden) {
        scrollTopBtn.classList.remove('is-visible');
        window.setTimeout(function () {
          if (!scrollTopBtn.classList.contains('is-visible')) {
            scrollTopBtn.hidden = true;
          }
        }, 250);
      }
    }

    lastScrollY = scrollY;
  }

  function requestScrollTick() {
    if (!ticking) {
      requestAnimationFrame(onScrollFrame);
      ticking = true;
    }
  }

  window.addEventListener('scroll', requestScrollTick, { passive: true });
  onScrollFrame();

  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', function () {
      window.scrollTo({
        top: 0,
        behavior: prefersReducedMotion ? 'auto' : 'smooth',
      });
    });
  }

  /* ------------------------------------------------------------------ */
  /* Active nav link (scrollspy)                                         */
  /* ------------------------------------------------------------------ */
  var navLinks = document.querySelectorAll('[data-nav-link]');
  var spySections = ['about', 'work', 'skills', 'contact']
    .map(function (id) { return document.getElementById(id); })
    .filter(Boolean);

  if ('IntersectionObserver' in window && navLinks.length && spySections.length) {
    var setActiveLink = function (id) {
      navLinks.forEach(function (link) {
        var isMatch = link.getAttribute('href') === '#' + id;
        link.classList.toggle('is-active', isMatch);
        if (isMatch) {
          link.setAttribute('aria-current', 'true');
        } else {
          link.removeAttribute('aria-current');
        }
      });
    };

    var spyObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            setActiveLink(entry.target.id);
          }
        });
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
    );

    spySections.forEach(function (section) {
      spyObserver.observe(section);
    });
  }

  /* ------------------------------------------------------------------ */
  /* Stat counters — count up once when scrolled into view               */
  /* ------------------------------------------------------------------ */
  var counters = document.querySelectorAll('[data-count-to]');

  function animateCounter(el, target) {
    var duration = 900;
    var start = null;

    function tick(timestamp) {
      if (start === null) start = timestamp;
      var elapsed = timestamp - start;
      var t = Math.min(elapsed / duration, 1);
      var eased = 1 - Math.pow(1 - t, 3); // ease-out-cubic
      el.textContent = Math.round(eased * target);
      if (t < 1) requestAnimationFrame(tick);
    }

    requestAnimationFrame(tick);
  }

  if (counters.length) {
    if (motionEnabled && 'IntersectionObserver' in window) {
      var counterObserver = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              var target = parseFloat(entry.target.getAttribute('data-count-to')) || 0;
              animateCounter(entry.target, target);
              counterObserver.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.6 }
      );
      counters.forEach(function (el) {
        counterObserver.observe(el);
      });
    } else {
      // Reduced motion (or no IntersectionObserver support): final values immediately.
      counters.forEach(function (el) {
        el.textContent = el.getAttribute('data-count-to');
      });
    }
  }

  /* ------------------------------------------------------------------ */
  /* Work card tilt — pointer-driven, desktop/mouse only                 */
  /* ------------------------------------------------------------------ */
  var supportsHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  if (supportsHover && !prefersReducedMotion) {
    var tiltCards = document.querySelectorAll('[data-tilt]');
    var TILT_MAX_DEG = 6;

    tiltCards.forEach(function (card) {
      var rafId = null;
      var targetX = 0;
      var targetY = 0;

      function applyTilt() {
        rafId = null;
        card.style.transform =
          'perspective(1000px) rotateX(' + targetY + 'deg) rotateY(' + targetX + 'deg) translateY(-4px)';
      }

      card.addEventListener('mousemove', function (event) {
        var rect = card.getBoundingClientRect();
        var px = (event.clientX - rect.left) / rect.width - 0.5;
        var py = (event.clientY - rect.top) / rect.height - 0.5;
        targetX = px * TILT_MAX_DEG * 2;
        targetY = -py * TILT_MAX_DEG * 2;
        if (!rafId) rafId = requestAnimationFrame(applyTilt);
      });

      card.addEventListener('mouseleave', function () {
        if (rafId) {
          cancelAnimationFrame(rafId);
          rafId = null;
        }
        card.style.transform = '';
      });
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
