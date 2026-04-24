/**
 * 
 * Credits: 
 *  water -> https://github.com/franky-adl/water-ripples
 */


import * as THREE from "https://unpkg.com/three@0.182.0/build/three.module.js";
import { OrbitControls } from "https://unpkg.com/three@0.182.0/examples/jsm/controls/OrbitControls.js";


// water
import { Water } from 'https://unpkg.com/three@0.182.0/examples/jsm/objects/Water.js';

let scene, camera, renderer, controls;

//animate();


  // Scene
  scene = new THREE.Scene();

  // Camera
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    100000
  );
  camera.position.set(0, 4, 0); // slightly forward

  camera.layers.enable(1); // Main camera sees 0 and 1




  // Renderer
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.toneMapping = THREE.NoToneMapping; // try to make corners invisible
renderer.shadowMap.enabled = true;
  document.body.appendChild(renderer.domElement);


  // wataer

const waterGeometry = new THREE.PlaneGeometry(1000, 1000);

const water = new Water(waterGeometry, {
  textureWidth: 512,
  textureHeight: 512,
  waterNormals: new THREE.TextureLoader().load('https://images.unsplash.com/photo-1476897017502-219c9169bd6f?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8d2F0ZXIlMjB0ZXh0dXJlfGVufDB8fDB8fHww', function (texture) {
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  }),
  sunDirection: new THREE.Vector3(),
  sunColor: 0xffffff,
  waterColor: 0x001e0f,
  distortionScale: 3.7,
  fog: scene.fog !== undefined
});

water.rotation.x = -Math.PI / 2; // make it horizontal
scene.add(water);

  
  //  Skybox
  const loader = new THREE.CubeTextureLoader();
  const skyboxTexture = loader.load([
    "./textures/skybox/bluecloud_ft.jpg", // pz (front)
             "./textures/skybox/bluecloud_bk.jpg", // nz (back)


"./textures/skybox/bluecloud_up.jpg", // py (top)
  "./textures/skybox/bluecloud_dn.jpg", // ny (bottom)
   
    "./textures/skybox/bluecloud_rt.jpg", // px (right)

"./textures/skybox/bluecloud_lf.jpg" // nx (left) 
  ]);
  
  scene.background = skyboxTexture;
//scene.fog = new THREE.Fog(0xcccccc, 10, 100);
  //document.body.style.filter = 'saturate(0.3)';

  //  Controls 
  controls = new OrbitControls(camera, renderer.domElement);
  controls.enableZoom = true;
  controls.enablePan = false; // keeps it like a head-turning camera
  controls.rotateSpeed = 0.5;

  window.addEventListener("resize", onWindowResize);

// Load texture from URL
const texture = new THREE.TextureLoader().load(
  'https://cdn.creazilla.com/cliparts/7863723/silhouette-of-man-standing-and-facing-forward-clipart-md.png'
);

// randomly generate figures 
/*
const people = [];
const spread = 200; // how far people spread from center
const pop = 40 // how many 

for (let i = 0; i < pop; i++) { 
  const person = new THREE.Vector3(
    (Math.random() - 0.5) * spread,
    (Math.random() - 0.5) * spread,
    (Math.random() - 0.5) * spread
  );

  people.push(person); // add to array 
}

const geometryS = new THREE.BufferGeometry().setFromPoints(stars);
const materialS = new THREE.PointsMaterial({ color: 0xFFf, size: 0.5 });
const starsMap = new THREE.Points(geometryS, materialS);
const positionsS = geometryP.attributes.position; // Store original positions
const originalPositionsS = positions.array.slice(); // copy
scene.add(starsMap);
*/


// Create sprite material
const spriteMaterial = new THREE.SpriteMaterial({ map: texture, transparent: true });


// Create sprite (2D object)
const sprite = new THREE.Sprite(spriteMaterial);
sprite.scale.set(2, 5, 2); // size
sprite.position.set(1, 1, 1);
sprite.castShadow = false;
sprite.receiveShadow = false;
sprite.layers.set(1); // put on a separate layer
scene.add(sprite);


// camera oo



animate()

function animate() {
  requestAnimationFrame(animate);

  controls.update(); // important

  water.material.uniforms['time'].value += 0.3/ 60.0;

  renderer.render(scene, camera);
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}