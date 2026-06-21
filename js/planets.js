import * as THREE from 'three';
import { scene, loader } from './scene.js';

export const planets = [];

const planetData = [
  ['Mercury', 'textures/mercury.jpg',  3.5,  60,  0.047, 0.03, 0.21],
  ['Venus',   'textures/venus.jpg',    6,    90,  0.035, 0.05, 0.007],
  ['Earth',   'textures/earth.jpg',    6.5, 125,  0.029, 0.41, 0.017],
  ['Mars',    'textures/mars.jpg',     5,   165,  0.024, 0.44, 0.093],
  ['Jupiter', 'textures/jupiter.jpg', 15,   250,  0.013, 0.05, 0.049],
  ['Saturn',  'textures/saturn.jpg',  13,   350,  0.009, 0.47, 0.057],
  ['Uranus',  'textures/uranus.jpg',   9,   440,  0.006, 1.71, 0.046],
  ['Neptune', 'textures/neptune.jpg',  8.5, 520,  0.005, 0.49, 0.010],
];

// Sun
const sunGeo = new THREE.SphereGeometry(30, 32, 32);
const sunMat = new THREE.MeshBasicMaterial({ map: loader.load('textures/sun.jpg') });
export const sun = new THREE.Mesh(sunGeo, sunMat);
sun.userData.name = 'Sun';
scene.add(sun);

// Sun glow
const glowColors = [0xFDB813, 0xFF8C00, 0xFF4500];
const glowSizes = [32, 35, 39];
glowColors.forEach((color, i) => {
  const g = new THREE.Mesh(
    new THREE.SphereGeometry(glowSizes[i], 32, 32),
    new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.08 - i * 0.02, side: THREE.BackSide })
  );
  scene.add(g);
});

// Saturn ring
export const saturnRing = new THREE.Mesh(
  new THREE.RingGeometry(16, 26, 64),
  new THREE.MeshBasicMaterial({
    map: loader.load('textures/saturn_ring.jpg'),
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 0.9
  })
);
saturnRing.rotation.x = Math.PI / 3;
scene.add(saturnRing);

// Planets
planetData.forEach(([name, tex, radius, orbitRadius, speed, tilt, ecc]) => {
  const semiMajor = orbitRadius;
  const semiMinor = orbitRadius * (1 - ecc);

  const curve = new THREE.EllipseCurve(0, 0, semiMajor, semiMinor, 0, Math.PI * 2, false, 0);
  const points = curve.getPoints(128);
  const orbitGeo = new THREE.BufferGeometry().setFromPoints(points);
  const orbitLine = new THREE.Line(orbitGeo, new THREE.LineBasicMaterial({ color: 0x444444 }));
  orbitLine.rotation.x = Math.PI / 2;
  scene.add(orbitLine);

  const geo = new THREE.SphereGeometry(radius, 32, 32);
  const mat = new THREE.MeshStandardMaterial({ map: loader.load(tex) });
  const mesh = new THREE.Mesh(geo, mat);
  mesh.rotation.z = tilt;
  mesh.userData.name = name;
  scene.add(mesh);

  planets.push({ mesh, semiMajor, semiMinor, speed, angle: Math.random() * Math.PI * 2 });
});