
const navWrap = document.getElementById('navWrap');
const progressBar = document.getElementById('scrollProgress');

// ===== Mobile menu toggle =====
const burger = document.getElementById('burger');
const mobileMenu = document.getElementById('mobileMenu');

burger.addEventListener('click', () => {
  const isOpen = mobileMenu.classList.toggle('open');
  burger.classList.toggle('open', isOpen);
  burger.setAttribute('aria-expanded', isOpen);
  document.body.style.overflow = isOpen ? 'hidden' : '';
});

document.querySelectorAll('.mobile-link').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    burger.classList.remove('open');
    burger.setAttribute('aria-expanded', false);
    document.body.style.overflow = '';
  });
});

// ===== Active nav link on scroll (scroll-spy) =====
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navLinks.forEach(link => {
        link.classList.toggle('active', link.dataset.section === id);
      });
    }
  });
}, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });

sections.forEach(section => sectionObserver.observe(section));

// ===== Scroll reveal for [data-reveal] elements =====
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('[data-reveal]').forEach(el => revealObserver.observe(el));

// ===== Skill bars fill when their group enters view =====
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      skillObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.35 });

document.querySelectorAll('.skill-group').forEach(el => skillObserver.observe(el));

// ===== Animated stat counters =====
const statObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const target = parseInt(el.dataset.count, 10);
      let current = 0;
      const duration = 900;
      const stepTime = Math.max(Math.floor(duration / Math.max(target, 1)), 40);
      const timer = setInterval(() => {
        current += 1;
        el.textContent = current;
        if (current >= target) clearInterval(timer);
      }, stepTime);
      statObserver.unobserve(el);
    }
  });
}, { threshold: 0.6 });

document.querySelectorAll('.stat-num').forEach(el => statObserver.observe(el));

// ===== Typing effect in hero =====
const typeTarget = document.getElementById('typeTarget');
const phrases = ['responsive interfaces.', 'accessible UIs.', 'React experiences.', 'MERN-ready apps.'];
let phraseIndex = 0, charIndex = 0, deleting = false;

function typeLoop(){
  // Pause the animation while the user is selecting text anywhere on the
  // page, so it never interrupts copying.
  const sel = window.getSelection ? window.getSelection().toString() : '';
  if (sel.length > 0) {
    setTimeout(typeLoop, 300);
    return;
  }

  const current = phrases[phraseIndex];

  if (!deleting) {
    charIndex++;
    typeTarget.textContent = current.slice(0, charIndex);
    if (charIndex === current.length) {
      deleting = true;
      setTimeout(typeLoop, 1400);
      return;
    }
  } else {
    charIndex--;
    typeTarget.textContent = current.slice(0, charIndex);
    if (charIndex === 0) {
      deleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
    }
  }
  setTimeout(typeLoop, deleting ? 35 : 55);
}
typeLoop();

// ===== Cursor glow (desktop only) =====
const glow = document.getElementById('cursorGlow');
if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
  document.addEventListener('mousemove', (e) => {
    glow.style.left = e.clientX + 'px';
    glow.style.top = e.clientY + 'px';
  });
}

// ===== Banner photo fallback (if profile.jpg is missing) =====
const bannerPhoto = document.getElementById('bannerPhoto');
bannerPhoto.addEventListener('error', () => {
  bannerPhoto.classList.add('broken');
});

// ===== Contact form (front-end only demo) =====
const form = document.getElementById('contactForm');
const status = document.getElementById('formStatus');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const btn = form.querySelector('button[type="submit"]');
  const label = btn.querySelector('.btn-label');
  const originalText = label.textContent;

  label.textContent = 'Sending...';
  btn.disabled = true;

  setTimeout(() => {
    label.textContent = originalText;
    btn.disabled = false;
    status.textContent = `Thanks! This form is a front-end demo — connect it to a real email service (e.g. Formspree, EmailJS) to receive messages.`;
    form.reset();
  }, 900);
});


// ===== Footer year =====
document.getElementById('year').textContent = new Date().getFullYear();
