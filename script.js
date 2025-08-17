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

// ✅ Backend API URL (local + render)
const IS_LOCAL =
  location.hostname === "localhost" ||
  location.hostname === "127.0.0.1" ||
  location.protocol === "file:";  // <-- agar direct file:// se open kare to bhi local API chalega

const API_BASE = IS_LOCAL
  ? "http://localhost:8800/api"
  : "https://bridge4meal.onrender.com/api"; // Render ka backend URL

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

// Partner form
document.getElementById('partnerForm')?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const fd = new FormData(e.target);
  const data = Object.fromEntries(fd.entries());
  const msg = document.getElementById('partnerMsg');
  msg.textContent = 'Submitting…';
  try{
    await postJSON(API_BASE + '/partners', data);
    msg.textContent = 'Thanks! We will contact you shortly.';
    e.target.reset();
  }catch(err){
    msg.textContent = 'Submission failed: ' + err.message;
  }
});

// Worker form
document.getElementById('workerForm')?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const fd = new FormData(e.target);
  const data = Object.fromEntries(fd.entries());
  const msg = document.getElementById('workerMsg');
  msg.textContent = 'Submitting…';
  try{
    await postJSON(API_BASE + '/workers', data);
    msg.textContent = 'Application received!';
    e.target.reset();
  }catch(err){
    msg.textContent = 'Submission failed: ' + err.message;
  }
});

// Contact form
document.getElementById('contactForm')?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const fd = new FormData(e.target);
  const data = Object.fromEntries(fd.entries());
  const msg = document.getElementById('contactMsg');
  msg.textContent = 'Sending…';
  try{
    await postJSON(API_BASE + '/messages', data);
    msg.textContent = 'Message sent. We will respond soon.';
    e.target.reset();
  }catch(err){
    msg.textContent = 'Failed: ' + err.message;
  }
});

// Footer year
document.getElementById('year').textContent = new Date().getFullYear();
