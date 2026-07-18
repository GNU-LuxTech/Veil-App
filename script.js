/* =============================================
   VEIL — script.js
   Interactions & animations
   ============================================= */

'use strict';

// ─── NAV SCROLL EFFECT ──────────────────────────────────
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('nav-toggle');
const navLinks = document.getElementById('nav-links');

window.addEventListener('scroll', () => {
  if (window.scrollY > 40) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
}, { passive: true });

// Mobile nav toggle
if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', isOpen);
    const spans = navToggle.querySelectorAll('span');
    if (isOpen) {
      spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
    } else {
      spans[0].style.transform = '';
      spans[1].style.opacity = '';
      spans[2].style.transform = '';
    }
  });

  // Close nav on link click
  navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      navLinks.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
      const spans = navToggle.querySelectorAll('span');
      spans[0].style.transform = '';
      spans[1].style.opacity = '';
      spans[2].style.transform = '';
    });
  });
}

// ─── SMOOTH ANCHOR SCROLL ────────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const navH = navbar ? navbar.offsetHeight : 0;
      const top = target.getBoundingClientRect().top + window.scrollY - navH - 16;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// ─── SCROLL REVEAL ───────────────────────────────────────
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ─── HERO TERMINAL TYPING ANIMATION ─────────────────────
const typedText = document.getElementById('typed-text');

const typingMessages = [
  'incoming connection from veil7x3k9mq2...onion',
  'accept? /accept | /reject',
  'performing key handshake...',
  'session established. exchange is ephemeral.',
];

let msgIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingTimeout = null;

function typeMessage() {
  if (!typedText) return;
  const currentMsg = typingMessages[msgIndex];

  if (!isDeleting) {
    typedText.textContent = currentMsg.substring(0, charIndex + 1);
    charIndex++;
    if (charIndex === currentMsg.length) {
      typingTimeout = setTimeout(() => {
        isDeleting = true;
        typeMessage();
      }, 2200);
      return;
    }
  } else {
    typedText.textContent = currentMsg.substring(0, charIndex - 1);
    charIndex--;
    if (charIndex === 0) {
      isDeleting = false;
      msgIndex = (msgIndex + 1) % typingMessages.length;
    }
  }

  const speed = isDeleting ? 28 : 52;
  typingTimeout = setTimeout(typeMessage, speed);
}

setTimeout(typeMessage, 1800);

// ─── HOW IT WORKS — STEP TERMINALS ──────────────────────
const stepTerminalBody = document.getElementById('step-terminal-body');
const stepTerminalTitle = document.getElementById('step-terminal-title');

const stepTerminalHTML = [
  `<div><span class="t-dim">$ </span><span class="t-green">veil --init</span></div>
   <div><span class="t-dim">[VEIL] </span><span class="t-accent">generating Ed25519 keypair...</span></div>
   <div><span class="t-dim">[VEIL] </span><span class="t-accent">deriving onion address...</span></div>
   <div>&nbsp;</div>
   <div><span class="t-dim">[VEIL] </span><span class="t-white">your address:</span></div>
   <div><span class="t-purple">  veilzf8n1abc4xyz7pq3m9de2...onion</span></div>
   <div>&nbsp;</div>
   <div><span class="t-dim">[VEIL] </span><span class="t-green">keypair saved. identity locked.</span></div>`,

  `<div><span class="t-dim"># Share your address out-of-band.</span></div>
   <div><span class="t-dim"># Signal, paper, spoken — never in-app.</span></div>
   <div>&nbsp;</div>
   <div><span class="t-white">Your onion address:</span></div>
   <div><span class="t-purple">  veilzf8n1abc4xyz7pq3m9de2...onion</span></div>
   <div>&nbsp;</div>
   <div><span class="t-dim">$ </span><span class="t-accent">veil --listen</span></div>
   <div><span class="t-dim">[VEIL] </span><span class="t-green">ready. waiting for connections...</span></div>`,

  `<div><span class="t-dim">[VEIL] </span><span class="t-accent">incoming connection from</span></div>
   <div><span class="t-purple">       veil7x3k9mq2p...onion</span></div>
   <div>&nbsp;</div>
   <div><span class="t-dim">[VEIL] </span><span class="t-white">accept or reject? </span><span class="t-green">/accept</span><span class="t-white"> | </span><span class="t-red">/reject</span></div>
   <div>&nbsp;</div>
   <div><span class="t-dim">&gt; </span><span class="t-green">/accept</span></div>
   <div>&nbsp;</div>
   <div><span class="t-dim">[VEIL] </span><span class="t-green">connection accepted.</span></div>`,

  `<div><span class="t-dim">[VEIL] </span><span class="t-accent">performing key handshake...</span></div>
   <div><span class="t-dim">[VEIL] </span><span class="t-green">session established. ephemeral.</span></div>
   <div><span class="t-dim">────────────────────────────────────</span></div>
   <div><span class="t-dim">[veil7x] </span><span class="t-white">yo</span></div>
   <div><span class="t-dim">[you]    </span><span class="t-green">hey. what do you need?</span></div>
   <div><span class="t-dim">[veil7x] </span><span class="t-white">/disconnect</span></div>
   <div><span class="t-dim">[VEIL]   </span><span class="t-accent">session terminated. no record kept.</span></div>
   <div><span class="t-dim">────────────────────────────────────</span></div>`
];

const stepTitles = [
  'veil --init',
  'share — out of band',
  'veil — incoming connection',
  'veil — encrypted session'
];

function activateStep(index) {
  document.querySelectorAll('.how-step').forEach((el, i) => {
    el.classList.toggle('active', i === index);
  });

  if (stepTerminalBody) {
    stepTerminalBody.style.opacity = '0';
    stepTerminalBody.style.transform = 'translateY(8px)';
    setTimeout(() => {
      stepTerminalBody.innerHTML = stepTerminalHTML[index];
      stepTerminalBody.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
      stepTerminalBody.style.opacity = '1';
      stepTerminalBody.style.transform = 'translateY(0)';
    }, 180);
  }

  if (stepTerminalTitle) {
    stepTerminalTitle.textContent = stepTitles[index];
  }
}

// Initialize first step
activateStep(0);

// Auto-advance steps
let autoStepInterval = null;
let currentStep = 0;

const howSection = document.getElementById('how');
if (howSection) {
  const stepObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        autoStepInterval = setInterval(() => {
          currentStep = (currentStep + 1) % 4;
          activateStep(currentStep);
        }, 3500);
      } else {
        if (autoStepInterval) clearInterval(autoStepInterval);
      }
    });
  }, { threshold: 0.4 });

  stepObserver.observe(howSection);
}

// Manual step click (stops auto-advance)
document.querySelectorAll('.how-step').forEach((step, index) => {
  step.addEventListener('click', () => {
    if (autoStepInterval) clearInterval(autoStepInterval);
    currentStep = index;
    activateStep(index);
  });
});

// ─── ACTIVE NAV LINK TRACKING ────────────────────────────
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-links a[href^="#"]');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navItems.forEach(link => {
        link.style.color = link.getAttribute('href') === `#${id}`
          ? 'var(--color-text)'
          : '';
      });
    }
  });
}, { threshold: 0.5 });

sections.forEach(s => sectionObserver.observe(s));

// ─── PRINCIPLE CARDS STAGGER ─────────────────────────────
const principleCards = document.querySelectorAll('.principle-card');
const principleObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }, i * 80);
      principleObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

principleCards.forEach(card => {
  card.style.opacity = '0';
  card.style.transform = 'translateY(20px)';
  card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  principleObserver.observe(card);
});
