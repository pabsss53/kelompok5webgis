// Dark Mode Toggle
const darkToggle = document.getElementById('darkToggle');
darkToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  darkToggle.textContent = document.body.classList.contains('dark') ? 'Light Mode' : 'Dark Mode';
});

// Hamburger menu toggle
const hamburger = document.querySelector('.hamburger');
const navBar = document.querySelector('.nav-bar');
hamburger.addEventListener('click', () => {
  navBar.classList.toggle('responsive');
  const expanded = hamburger.getAttribute('aria-expanded') === 'true';
  hamburger.setAttribute('aria-expanded', !expanded);
});

// Modal logic
const btnDetails = document.querySelectorAll('.btn-detail');
const modals = document.querySelectorAll('.modal');
const modalCloses = document.querySelectorAll('.modal-close');

btnDetails.forEach((btn, i) => {
  btn.addEventListener('click', () => {
    modals[i].classList.add('active');
    modals[i].focus();
  });
});

modalCloses.forEach((btn) => {
  btn.addEventListener('click', () => {
    btn.closest('.modal').classList.remove('active');
  });
});

window.addEventListener('click', e => {
  modals.forEach(modal => {
    if (e.target === modal) modal.classList.remove('active');
  });
});

window.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    modals.forEach(modal => modal.classList.remove('active'));
  }
});

// Initialize Leaflet map
const spinner = document.getElementById('loadingSpinner');
spinner.classList.add('active');

const map = L.map('map').setView([-7.36, 109.91], 11);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Custom icon
const icon = L.icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/854/854878.png',
  iconSize: [36, 42],
  iconAnchor: [18, 42],
  popupAnchor: [0, -38],
});

// Locations
const places = [
  {
    coords: [-7.307, 109.912],
    name: "Gunung Prau",
    desc: "Gunung Prau adalah destinasi hiking populer dengan pemandangan matahari terbit yang spektakuler."
  },
  {
    coords: [-7.168, 109.922],
    name: "Dieng Plateau",
    desc: "Dataran tinggi Dieng menawarkan kompleks candi kuno dan fenomena alam kawah belerang."
  },
  {
    coords: [-7.397, 109.915],
    name: "Curug Surodipo",
    desc: "Air terjun eksotis yang menyegarkan dengan akses trekking yang menantang."
  }
];

places.forEach(place => {
  const marker = L.marker(place.coords, { icon }).addTo(map);
  marker.bindPopup(`<h3>${place.name}</h3><p>${place.desc}</p>`);
});

// Hide spinner when tiles loaded
map.whenReady(() => {
  spinner.classList.remove('active');
});
