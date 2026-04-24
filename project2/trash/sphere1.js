import * as THREE from 'three';

// Scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x202030);

// Camera
const camera = new THREE.PerspectiveCamera(75, innerWidth / innerHeight, 0.1, 1000);

// Renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(innerWidth, innerHeight);
document.body.appendChild(renderer.domElement);

// Light
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(10, 10, 10);
scene.add(light);

// Planet
const RADIUS = 5;
const planet = new THREE.Mesh(
  new THREE.SphereGeometry(RADIUS, 64, 64),
  new THREE.MeshStandardMaterial({ color: 0x339933 })
);
scene.add(planet);

// Player state
const player = {
  position: new THREE.Vector3(0, RADIUS + 0.2, 0),
  velocity: new THREE.Vector3(),
  yaw: 0,
  pitch: 0
};

// Input
const keys = {};
addEventListener('keydown', e => keys[e.code] = true);
addEventListener('keyup', e => keys[e.code] = false);

// Mouse look
addEventListener('mousemove', e => {
  if (document.pointerLockElement) {
    player.yaw -= e.movementX * 0.002;
    player.pitch -= e.movementY * 0.002;
    player.pitch = Math.max(-Math.PI/2, Math.min(Math.PI/2, player.pitch));
  }
});

addEventListener('click', () => {
  document.body.requestPointerLock();
});

// Vectors
const up = new THREE.Vector3();
const forward = new THREE.Vector3();
const right = new THREE.Vector3();

function updatePlayer() {
  // Up = from center of planet
  up.copy(player.position).normalize();

  // Build camera direction from yaw/pitch
  const dir = new THREE.Vector3(
    Math.cos(player.pitch) * Math.sin(player.yaw),
    Math.sin(player.pitch),
    Math.cos(player.pitch) * Math.cos(player.yaw)
  );

  // Project forward onto tangent plane
  forward.copy(dir).projectOnPlane(up).normalize();

  // Right vector
  right.crossVectors(forward, up).normalize();

  let move = new THREE.Vector3();

  if (keys['KeyW']) move.add(forward);
  if (keys['KeyS']) move.sub(forward);
  if (keys['KeyA']) move.sub(right);
  if (keys['KeyD']) move.add(right);

  if (move.length() > 0) {
    move.normalize().multiplyScalar(0.05);
    player.velocity.add(move);
  }

  // Gravity toward center
  player.velocity.add(up.clone().multiplyScalar(-0.02));

  // Move
  player.position.add(player.velocity);

  // Stick to surface
  player.position.normalize().multiplyScalar(RADIUS + 0.2);

  // Damping
  player.velocity.multiplyScalar(0.9);
}

function updateCamera() {
  const upDir = player.position.clone().normalize();

  camera.position.copy(player.position);
  camera.up.copy(upDir);
// Build look direction
const lookDir = new THREE.Vector3(
  Math.cos(player.pitch) * Math.sin(player.yaw),
  Math.sin(player.pitch),
  Math.cos(player.pitch) * Math.cos(player.yaw)
);

// Project onto sphere surface
forward.copy(lookDir).projectOnPlane(up);

// 🚨 FIX: if too small, regenerate a valid forward
if (forward.lengthSq() < 0.0001) {
  forward.crossVectors(up, new THREE.Vector3(1, 0, 0));

  // If still bad (edge case at poles)
  if (forward.lengthSq() < 0.0001) {
    forward.crossVectors(up, new THREE.Vector3(0, 0, 1));
  }
}

  const target = player.position.clone().add(lookDir);
  camera.lookAt(target);
}

function animate() {
  requestAnimationFrame(animate);

  updatePlayer();
  updateCamera();

  renderer.render(scene, camera);
}

animate();

// Resize fix
addEventListener('resize', () => {
  camera.aspect = innerWidth / innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(innerWidth, innerHeight);
});