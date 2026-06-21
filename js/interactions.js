import * as THREE from 'three';
import { camera, controls } from './scene.js';
import { sun, planets } from './planets.js';
import { comet } from './comet.js';
import { planetInfo } from '../planetData.js';

export const defaultCamPos = new THREE.Vector3(0, 200, 600);
export const defaultLookAt = new THREE.Vector3(0, 0, 0);

export let targetPosition = null;
export let targetLookAt = null;
export let zooming = false;

export function setTarget(pos, lookAt) {
  targetPosition = pos;
  targetLookAt = lookAt;
  zooming = true;
}

export function setZooming(val) {
  zooming = val;
}

const clickable = [sun, comet, ...planets.map(p => p.mesh)];

const homeBtn = document.getElementById('homeBtn');
const infoCard = document.getElementById('infoCard');

homeBtn.addEventListener('click', () => {
  setTarget(defaultCamPos.clone(), defaultLookAt.clone());
  homeBtn.style.display = 'none';
  infoCard.style.display = 'none';
  controls.enabled = true;
  setTimeout(() => setZooming(false), 1500);
});

document.getElementById('closeCard').addEventListener('click', () => {
  infoCard.style.display = 'none';
});

window.addEventListener('click', (e) => {
  if (e.target === homeBtn || e.target === document.getElementById('closeCard')) return;

  const mouse = new THREE.Vector2(
    (e.clientX / window.innerWidth) * 2 - 1,
    -(e.clientY / window.innerHeight) * 2 + 1
  );

  const raycaster = new THREE.Raycaster();
  raycaster.setFromCamera(mouse, camera);
  const hits = raycaster.intersectObjects(clickable);

  if (hits.length > 0) {
    const obj = hits[0].object;
    const name = obj.userData.name || 'Sun';
    const pos = obj.position.clone();
    const radius = obj.geometry.parameters.radius || 4;

    setTarget(
      pos.clone().add(new THREE.Vector3(0, radius * 2, radius * 5)),
      pos.clone()
    );

    homeBtn.style.display = 'block';
    controls.enabled = false;

    const info = planetInfo[name];
    if (info) {
      document.getElementById('cardTitle').textContent = name;
      document.getElementById('cardDiameter').textContent = info.diameter;
      document.getElementById('cardTemp').textContent = info.temp;
      document.getElementById('cardMoons').textContent = info.moons;
      document.getElementById('cardFact').textContent = info.fact;
      infoCard.style.display = 'block';
    }
  } else {
    infoCard.style.display = 'none';
  }
});