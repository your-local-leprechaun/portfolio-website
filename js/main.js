// ── Year ──
document.getElementById('year').textContent = new Date().getFullYear();

// ── Nav scroll state ──
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 20);
});

// ── Mobile nav toggle ──
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('open');
    navLinks.classList.toggle('open');
});
navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
        navToggle.classList.remove('open');
        navLinks.classList.remove('open');
    });
});

// ── Active nav link on scroll ──
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            navAnchors.forEach(a => a.classList.remove('active'));
            const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
            if (active) active.classList.add('active');
        }
    });
}, { rootMargin: '-40% 0px -55% 0px' });
sections.forEach(s => observer.observe(s));

// ── Reveal on scroll ──
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            // stagger siblings
            const siblings = [...entry.target.parentElement.children].filter(el => el.classList.contains('reveal'));
            const idx = siblings.indexOf(entry.target);
            setTimeout(() => entry.target.classList.add('visible'), idx * 80);
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ── Skill bar animation ──
const barObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const fill = entry.target.querySelector('.skill-bar-fill');
            if (fill) fill.style.width = fill.dataset.width + '%';
            barObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.3 });
document.querySelectorAll('.skill-card').forEach(c => barObserver.observe(c));

// ── Typed hero role ──
const roles = [
    'Gameplay Programmer',
    'Software Engineer',
    'Game Developer',
    'Systems Thinker',
];
const typedEl = document.querySelector('.typed-text');
let ri = 0, ci = 0, deleting = false;

function type() {
    const current = roles[ri];
    if (!deleting) {
        typedEl.textContent = current.slice(0, ci + 1);
        ci++;
        if (ci === current.length) {
            deleting = true;
            setTimeout(type, 1800);
            return;
        }
    } else {
        typedEl.textContent = current.slice(0, ci - 1);
        ci--;
        if (ci === 0) {
            deleting = false;
            ri = (ri + 1) % roles.length;
        }
    }
    setTimeout(type, deleting ? 55 : 90);
}
setTimeout(type, 600);
