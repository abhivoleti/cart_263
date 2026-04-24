import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js";
import * as Tone from "https://cdn.jsdelivr.net/npm/tone@14.8.49/build/Tone.js";

let scene, camera, renderer;
let analyser, dataArray;
let streaks = [];
let osc;
let started = false;

init();
animate();

function init() {

  // ---------- THREE SETUP ----------
  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    100
  );
  camera.position.z = 5;

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  // ---------- CREATE STREAKS ----------
  const geo = new THREE.BoxGeometry(0.05, 1, 0.05);
  const mat = new THREE.MeshBasicMaterial({ color: 0x00ffff });

  for (let i = 0; i < 64; i++) {
    const bar = new THREE.Mesh(geo, mat);
    bar.position.x = (i - 32) * 0.1;
    scene.add(bar);
    streaks.push(bar);
  }

  // ---------- SPACEBAR START ----------
  window.addEventListener("keydown", async (e) => {
    if (e.code === "Space" && !started) {

      started = true;

      // unlock audio context
      await Tone.start();

      // oscillator
      osc = new Tone.Oscillator(220, "sine").start();
      osc.volume.value = -10;

      // analyser
      analyser = new Tone.Analyser("fft", 64);
      osc.connect(analyser);

      console.log("🎵 Audio started");
    }
  });

  // resize
  window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
}

function animate() {
  requestAnimationFrame(animate);

  // ---------- AUDIO REACTIVITY ----------
  if (analyser) {
    const values = analyser.getValue();

    for (let i = 0; i < streaks.length; i++) {

      const v = values[i] || -100; // Tone returns dB values
      const norm = THREE.MathUtils.clamp((v + 100) / 100, 0, 1);

      streaks[i].scale.y = 0.2 + norm * 5;
      streaks[i].position.y = norm * 2;
    }
  }

  renderer.render(scene, camera);
} 