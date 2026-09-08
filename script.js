// Mrudula Joshi portfolio interactions — vanilla JavaScript only.

const menuToggle = document.querySelector('.menu-toggle');
const siteMenu = document.querySelector('.nav-menu');

// Mobile navigation
if (menuToggle && siteMenu) {
  menuToggle.addEventListener('click', () => {
    const isOpen = siteMenu.classList.toggle('open');
    document.body.classList.toggle('menu-open', isOpen);
    menuToggle.setAttribute('aria-expanded', String(isOpen));
  });

  siteMenu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      siteMenu.classList.remove('open');
      document.body.classList.remove('menu-open');
      menuToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

// Project category filtering
const filterButtons = document.querySelectorAll('.filter-button');
const projectCards = document.querySelectorAll('.project-card');

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const filter = button.dataset.filter;

    filterButtons.forEach((item) => item.classList.remove('active'));
    button.classList.add('active');

    projectCards.forEach((card) => {
      const categories = card.dataset.category.split(' ');
      const shouldShow = filter === 'all' || categories.includes(filter);
      card.classList.toggle('hidden', !shouldShow);
    });
  });
});

// Reveal sections as they enter the viewport.
const revealItems = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealItems.forEach((item) => revealObserver.observe(item));

// Show a helpful message for links that still need the user's real URL.
const toast = document.querySelector('.toast');
let toastTimer;

function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 3200);
}

document.querySelectorAll('.is-placeholder').forEach((link) => {
  link.addEventListener('click', (event) => {
    event.preventDefault();
    showToast(link.dataset.placeholder || 'Replace this placeholder with your real link.');
  });
});

// Use a friendly fallback when the real profile photo has not been added yet.
const profileImage = document.querySelector('.profile-image');
if (profileImage) {
  profileImage.addEventListener('error', () => {
    profileImage.parentElement.classList.add('image-missing');
  });
}