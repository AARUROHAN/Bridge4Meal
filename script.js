// =======================
// script.js
// =======================

// Smooth scroll + mobile nav
const hamburger = document.querySelector('.hamburger');
const nav = document.querySelector('.nav');
hamburger?.addEventListener('click', () => {
  const open = nav.style.display === 'flex';
  nav.style.display = open ? 'none' : 'flex';
  hamburger.setAttribute('aria-expanded', (!open).toString());
});

// Reveal on scroll
const revealEls = document.querySelectorAll('.reveal');
const reveal = () => {
  const h = window.innerHeight;
  revealEls.forEach(el => {
    const { top } = el.getBoundingClientRect();
    if (top < h - 80) el.classList.add('visible');
  });
};
window.addEventListener('scroll', reveal);
window.addEventListener('load', reveal);

// Impact counters
const counters = document.querySelectorAll('.num');
const startCounters = () => {
  counters.forEach(c => {
    const target = +c.dataset.target;
    let cur = 0;
    const step = Math.ceil(target / 100);
    const tick = () => {
      cur += step;
      if (cur > target) cur = target;
      c.textContent = cur.toLocaleString();
      if (cur < target) requestAnimationFrame(tick);
    };
    tick();
  });
};
const impactSection = document.querySelector('#impact');
let started = false;
const onScroll = () => {
  const rect = impactSection.getBoundingClientRect();
  if(!started && rect.top < window.innerHeight) { started = true; startCounters(); }
};
window.addEventListener('scroll', onScroll);
onScroll();

// =======================
// Backend API URL
// =======================
const IS_LOCAL =
  location.hostname === "localhost" ||
  location.hostname === "127.0.0.1" ||
  location.protocol === "file:";
const API_BASE = IS_LOCAL
  ? "http://localhost:8800/api"
  : "https://bridge4meal.onrender.com/api";

// Helper function to POST JSON
async function postJSON(url, data){
  const res = await fetch(url, {
    method: 'POST',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify(data)
  });
  if(!res.ok) throw new Error(await res.text());
  return res.json();
}

// =======================
// Form submission handler (scroll-safe)
// =======================
function handleFormSubmit(formId, msgId, apiEndpoint, successMsg) {
  document.getElementById(formId)?.addEventListener('submit', async (e) => {
    e.preventDefault(); // prevent page reload
    const fd = new FormData(e.target);
    const data = Object.fromEntries(fd.entries());
    const msg = document.getElementById(msgId);
    msg.textContent = 'Submitting…';

    try {
      await postJSON(API_BASE + apiEndpoint, data);
      msg.textContent = successMsg;
      e.target.reset();

      // Smooth scroll to message div without jumping to top
      msg.scrollIntoView({ behavior: 'smooth', block: 'start' });

    } catch(err) {
      msg.textContent = 'Submission failed: ' + err.message;
    }
  });
}

// Contact Form
handleFormSubmit('contactForm', 'contactMsg', '/messages', 'Message sent. We will respond soon.');

// Worker Form
handleFormSubmit('workerForm', 'workerMsg', '/workers', 'Application received!');

// Partner Form
handleFormSubmit('partnerForm', 'partnerMsg', '/partners', 'Thanks! We will contact you shortly.');

// Footer year
document.getElementById('year').textContent = new Date().getFullYear();
