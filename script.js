// Dark Mode Toggle - Enhanced with icon switch and aria-pressed support
const darkToggle = document.getElementById('darkToggle');
const darkIconMoon = '<i class="fas fa-moon"></i>';
const darkIconSun = '<i class="fas fa-sun"></i>';

darkToggle.setAttribute('aria-pressed', 'false');
darkToggle.innerHTML = `${darkIconMoon} Dark Mode`;

darkToggle.addEventListener('click', () => {
  const isDark = document.body.classList.toggle('dark');
  darkToggle.setAttribute('aria-pressed', isDark.toString());
  darkToggle.innerHTML = isDark ? `${darkIconSun} Light Mode` : `${darkIconMoon} Dark Mode`;
});

// Hamburger menu toggle with keyboard support and aria-expanded corrected
const hamburger = document.querySelector('.hamburger');
const navBar = document.querySelector('.nav-bar');

function toggleMenu() {
  navBar.classList.toggle('responsive');
  const expanded = hamburger.getAttribute('aria-expanded') === 'true';
  hamburger.setAttribute('aria-expanded', String(!expanded));
}

hamburger.addEventListener('click', toggleMenu);
hamburger.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    toggleMenu();
  }
});

// Modal logic with improved accessibility focus trapping and keyboard support
const btnDetails = document.querySelectorAll('.btn-detail');
const modals = document.querySelectorAll('.modal');
const modalCloses = document.querySelectorAll('.modal-close');

btnDetails.forEach((btn, i) => {
  btn.addEventListener('click', () => {
    modals[i].classList.add('active');
    modals[i].focus();
  });
  // Add keyboard support for Enter and Space
  btn.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      modals[i].classList.add('active');
      modals[i].focus();
    }
  });
});

modalCloses.forEach((btn) => {
  btn.addEventListener('click', () => {
    btn.closest('.modal').classList.remove('active');
  });
  // Also add keyboard support for close button
  btn.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      btn.closest('.modal').classList.remove('active');
    }
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

// Initialize Leaflet map and spinner (unchanged)
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
    coords: [-7.168, 109.922],
    name: "Gunung Prau",
    desc: "Gunung Prau adalah destinasi hiking populer dengan pemandangan matahari terbit yang spektakuler."
  },
  {
    coords: [-7.307, 109.912],
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

<script>
  // Tangani form langganan
  document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector(".form-group");
    const emailInput = document.querySelector(".email-input");

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      const email = emailInput.value.trim();

      if (!validateEmail(email)) {
        alert("Masukkan email yang valid!");
        return;
      }

      // Simulasi pengiriman data
      alert("Terima kasih telah berlangganan, " + email + "!");
      emailInput.value = "";
    });

    function validateEmail(email) {
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return regex.test(email);
    }
  });
</script>

