import './common';

const urlParams = new URLSearchParams(window.location.search);
const flash = urlParams.get('flash');

if (flash) {
  const flashComponent = document.getElementById('flash');

  flashComponent.innerText = flash;
  flashComponent.style.display = '';
}
