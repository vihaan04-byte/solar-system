import { controls } from './scene.js';
import { setTarget, setZooming, defaultCamPos, defaultLookAt } from './interactions.js';

// Speed slider
export let speedMultiplier = 1;
const speedSlider = document.getElementById('speedSlider');
const speedLabel = document.getElementById('speedLabel');
speedSlider.addEventListener('input', () => {
  speedMultiplier = parseFloat(speedSlider.value);
  speedLabel.textContent = speedMultiplier.toFixed(1) + 'x';
});

// Galaxy view
const galaxyOverlay = document.getElementById('galaxyOverlay');
const galaxyBtn = document.getElementById('galaxyBtn');
const homeBtn = document.getElementById('homeBtn');
const infoCard = document.getElementById('infoCard');
let galaxyView = false;

galaxyBtn.addEventListener('click', () => {
  if (!galaxyView) {
    galaxyView = true;
    galaxyBtn.textContent = '🔭 Solar System';
    homeBtn.style.display = 'none';
    infoCard.style.display = 'none';
    galaxyOverlay.style.display = 'block';
    setTimeout(() => galaxyOverlay.classList.add('visible'), 10);
    controls.enabled = false;
  } else {
    galaxyView = false;
    galaxyBtn.textContent = '🌌 Galaxy View';
    galaxyOverlay.classList.remove('visible');
    setTimeout(() => {
      galaxyOverlay.style.display = 'none';
      controls.enabled = true;
    }, 1200);
  }
});

document.getElementById('galaxyBackBtn').addEventListener('click', () => {
  galaxyView = false;
  galaxyBtn.textContent = '🌌 Galaxy View';
  galaxyOverlay.classList.remove('visible');
  setTimeout(() => {
    galaxyOverlay.style.display = 'none';
    controls.enabled = true;
  }, 1200);
});