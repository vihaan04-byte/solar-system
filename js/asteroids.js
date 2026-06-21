import * as THREE from 'three';
import { scene, loader } from './scene.js';

export const asteroidBelt = new THREE.Group();

const rockTextures = [
  loader.load('textures/rock1.jpg'),
  loader.load('textures/rock2.jpg'),
  loader.load('textures/rock3.jpg')
];

const asteroidGeo = new THREE.SphereGeometry(1.5, 6, 6);

for (let i = 0; i < 800; i++) {
  const asteroidMat = new THREE.MeshStandardMaterial({
    map: rockTextures[Math.floor(Math.random() * rockTextures.length)],
    color: new THREE.Color(0.8 + Math.random() * 0.2, 0.75 + Math.random() * 0.15, 0.7 + Math.random() * 0.1)
  });
  const asteroid = new THREE.Mesh(asteroidGeo, asteroidMat);

  const angle = Math.random() * Math.PI * 2;
  const radius = 195 + Math.random() * 35;
  const semiMinor = radius * (1 - 0.05);

  asteroid.position.x = Math.cos(angle) * radius;
  asteroid.position.z = Math.sin(angle) * semiMinor;
  asteroid.position.y = (Math.random() - 0.5) * 8;

  asteroid.rotation.x = Math.random() * Math.PI;
  asteroid.rotation.y = Math.random() * Math.PI;

  const scale = 0.8 + Math.random() * 1.2;
  asteroid.scale.set(scale, scale * 0.7, scale);

  asteroid.userData.orbitRadius = radius;
  asteroid.userData.semiMinor = semiMinor;
  asteroid.userData.angle = angle;
  asteroid.userData.speed = 0.018 + Math.random() * 0.004;

  asteroidBelt.add(asteroid);
}

scene.add(asteroidBelt);