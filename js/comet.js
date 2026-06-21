import * as THREE from 'three';
import { scene, loader } from './scene.js';

// Comet mesh
const cometGeo = new THREE.SphereGeometry(4, 8, 8);
const cometPositions = cometGeo.attributes.position;
for (let i = 0; i < cometPositions.count; i++) {
  cometPositions.setXYZ(
    i,
    cometPositions.getX(i) * (0.7 + Math.random() * 0.6),
    cometPositions.getY(i) * (0.5 + Math.random() * 0.8),
    cometPositions.getZ(i) * (0.7 + Math.random() * 0.6)
  );
}
cometGeo.computeVertexNormals();

const cometMat = new THREE.MeshStandardMaterial({
  map: loader.load('textures/comet.jpg'),
  emissive: new THREE.Color(0x4488ff),
  emissiveIntensity: 0.3
});
export const comet = new THREE.Mesh(cometGeo, cometMat);
comet.userData.name = 'Comet';
scene.add(comet);

// Comet glow
export const cometGlow = new THREE.Mesh(
  new THREE.SphereGeometry(6, 32, 32),
  new THREE.MeshBasicMaterial({ color: 0x88ccff, transparent: true, opacity: 0.15, side: THREE.BackSide })
);
scene.add(cometGlow);

// Comet tail
export const tailCount = 300;
const tailGeo = new THREE.BufferGeometry();
const tailPositions = new Float32Array(tailCount * 3);
tailGeo.setAttribute('position', new THREE.BufferAttribute(tailPositions, 3));
export const tail = new THREE.Points(tailGeo, new THREE.PointsMaterial({
  color: 0x88ccff,
  size: 2.5,
  transparent: true,
  opacity: 0.5
}));
scene.add(tail);

// Pulsing indicator ring
const indicatorGeo = new THREE.RingGeometry(5.5, 6, 32);
const indicatorMat = new THREE.MeshBasicMaterial({
  color: 0x88ccff,
  side: THREE.DoubleSide,
  transparent: true,
  opacity: 0.4
});
export const cometIndicator = new THREE.Mesh(indicatorGeo, indicatorMat);
scene.add(cometIndicator);

// Orbit parameters
export let cometAngle = 0;
export const cometSemiMajor = 600;
export const cometSemiMinor = 120;
export const cometSpeed = 0.003;