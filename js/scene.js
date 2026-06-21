import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

export const scene = new THREE.Scene();

export const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 100000);
camera.position.set(0, 200, 600);

export const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement);

export const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

export const loader = new THREE.TextureLoader();

// Background
scene.background = loader.load('textures/space.jpg');

// Lighting
scene.add(new THREE.PointLight(0xffffff, 2, 3000));
scene.add(new THREE.AmbientLight(0xffffff, 1.5));

// Starfield
const starGeo = new THREE.BufferGeometry();
const starCount = 8000;
const positions = new Float32Array(starCount * 3);
for (let i = 0; i < starCount * 3; i++) positions[i] = (Math.random() - 0.5) * 10000;
starGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
scene.add(new THREE.Points(starGeo, new THREE.PointsMaterial({ color: 0xffffff, size: 0.7 })));

// Resize handler
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});