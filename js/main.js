import * as THREE from 'three';
import { scene, camera, renderer, controls } from './scene.js';
import { sun, planets, saturnRing } from './planets.js';
import { asteroidBelt } from './asteroids.js';
import { comet, cometGlow, tail, tailCount, cometIndicator, cometSemiMajor, cometSemiMinor, cometSpeed } from './comet.js';
import { targetPosition, targetLookAt, zooming, setZooming } from './interactions.js';
import { speedMultiplier } from './ui.js';

let cometAngle = 0;

function animate() {
  requestAnimationFrame(animate);

  sun.rotation.y += 0.001;

  // Planets
  planets.forEach(p => {
    p.angle += p.speed * 0.01 * speedMultiplier;
    p.mesh.position.x = Math.cos(p.angle) * p.semiMajor;
    p.mesh.position.z = Math.sin(p.angle) * p.semiMinor;
    p.mesh.rotation.y += 0.005;
    if (p.mesh.userData.name === 'Saturn') {
      saturnRing.position.copy(p.mesh.position);
    }
  });

  // Asteroids
  asteroidBelt.children.forEach(asteroid => {
    asteroid.userData.angle += asteroid.userData.speed * 0.01 * speedMultiplier;
    asteroid.position.x = Math.cos(asteroid.userData.angle) * asteroid.userData.orbitRadius;
    asteroid.position.z = Math.sin(asteroid.userData.angle) * asteroid.userData.semiMinor;
    asteroid.rotation.y += 0.01;
  });

  // Comet
  cometAngle += cometSpeed * 0.01 * speedMultiplier;
  comet.position.x = Math.cos(cometAngle) * cometSemiMajor;
  comet.position.z = Math.sin(cometAngle) * cometSemiMinor;
  comet.rotation.y += 0.01;
  cometGlow.position.copy(comet.position);
  cometIndicator.position.copy(comet.position);
  cometIndicator.lookAt(camera.position);
  const pulse = 1 + 0.2 * Math.sin(Date.now() * 0.005);
  cometIndicator.scale.set(pulse, pulse, pulse);

  // Comet tail
  const sunDir = comet.position.clone().normalize();
  const tailPositionsArr = tail.geometry.attributes.position.array;
  for (let i = 0; i < tailCount; i++) {
    const t = i / tailCount;
    const spread = t * 2;
    tailPositionsArr[i * 3]     = comet.position.x + sunDir.x * t * 80 + (Math.random() - 0.5) * spread * 8;
    tailPositionsArr[i * 3 + 1] = comet.position.y + sunDir.y * t * 80 + (Math.random() - 0.5) * spread * 4;
    tailPositionsArr[i * 3 + 2] = comet.position.z + sunDir.z * t * 80 + (Math.random() - 0.5) * spread * 8;
  }
  tail.geometry.attributes.position.needsUpdate = true;

  // Camera zoom
  if (zooming && targetPosition && targetLookAt) {
    camera.position.lerp(targetPosition, 0.05);
    controls.target.lerp(targetLookAt, 0.05);
    if (camera.position.distanceTo(targetPosition) < 0.5) setZooming(false);
  }

  controls.update();
  renderer.render(scene, camera);
}

animate();