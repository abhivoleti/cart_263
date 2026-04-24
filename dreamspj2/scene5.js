


import * as THREE from "https://unpkg.com/three@0.182.0/build/three.module.js";
import { OrbitControls } from "https://unpkg.com/three@0.182.0/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
// water
import { Water } from 'https://unpkg.com/three@0.182.0/examples/jsm/objects/Water.js';

import { createNoise2D } from "https://cdn.skypack.dev/simplex-noise";

import { BokehPass } from "https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/postprocessing/BokehPass.js";
import { EffectComposer } from 'https://unpkg.com/three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'https://unpkg.com/three/examples/jsm/postprocessing/RenderPass.js';


// fadein 
const fadeOverlay = document.getElementById("fade")

fadeOverlay.style.position = "fixed";
fadeOverlay.style.top = "0";
fadeOverlay.style.left = "0";
fadeOverlay.style.width = "100vw";
fadeOverlay.style.height = "100vh";

fadeOverlay.style.background = "black";
fadeOverlay.style.opacity = "1";
fadeOverlay.style.pointerEvents = "none";
fadeOverlay.style.zIndex = "9999";
fadeOverlay.style.opacity = "1";

fadeOverlay.style.transition = "opacity 3s ease";

// add to page
document.body.appendChild(fadeOverlay);

// trigger fade after a short delay (or call whenever you want)
setTimeout(() => {
  fadeOverlay.style.opacity = "0";
}, 300);



let scene, camera, renderer, controls;

  // Scene
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0xFF00D0)
  scene.fog = new THREE.Fog(0xFF00D0, 80, 400); // new fog, darker, shorter range
  

// light
// Directional light
const directionalLight = new THREE.DirectionalLight(0xffffff, 0);
directionalLight.position.set(50, 50, 1);
directionalLight.castShadow = true;
directionalLight.shadow.mapSize.width = 2048; // we can make them more efficient, but needs to be by factors of 2
directionalLight.shadow.mapSize.height = 2048;
directionalLight.shadow.radius = 1; // adds bluring effect

//scene.add(directionalLight)


// to see, ambient light 
const light = new THREE.AmbientLight( 0x00FF59, 1 ); // soft white light
light.distance = 500; 
scene.add( light );


  // plane 
  const geometry = new THREE.PlaneGeometry(10, 10);

const material = new THREE.MeshStandardMaterial({
  color: 0x222222,
  side: THREE.DoubleSide
});



  // Camera
  camera = new THREE.PerspectiveCamera(
    90,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.set(0, 6, 10); 
  camera.lookAt(100, 40, 100); 
  //camera.layers.enable(1); // Main camera sees 0 and 1


  // Renderer
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.toneMapping = THREE.NoToneMapping; // try to make corners invisible
renderer.shadowMap.enabled = true;
  document.body.appendChild(renderer.domElement);




  //  Controls 
  controls = new OrbitControls(camera, renderer.domElement);
  controls.enableZoom = true;
  controls.enablePan = false; // keeps it like a head-turning camera
  //controls.autoRotate = true;
  //controls.autoRotateSpeed = 3.0;

  window.addEventListener("resize", onWindowResize);



// EFFECT COMPOSER 
const composer = new EffectComposer(renderer);
composer.addPass(new RenderPass(scene, camera));

  const bokeh = new BokehPass(scene, camera, {
    focus: 50.0,        // distance where image is sharp
    aperture: 0.0001,  // blur strength (smaller = subtle blur)
    maxblur: 0.01      // max blur allowed
  });
  composer.addPass(bokeh);
  


let lotWidth = 240; 
let lotLength = 200; 
let stLight = new THREE.Object3D();

// 
 const lightBulbMat = new THREE.MeshStandardMaterial({
  color: 0x111111,
  emissive: 0x111111,
  emissiveIntensity: 5
});

const lightBulbGeo = new THREE.SphereGeometry(0.2, 16, 16);

// kiss 
const kissGroup = new THREE.Object3D(); 
let car; 

// flowers 
const flowers = []; 



createParkingLot(); 
createScene(); 
createWildFlowers(); 


animate()
function animate() {
  requestAnimationFrame(animate);

  // animate flowers 
  flowers.forEach((flower) => {
    const target = 1;

    if (flower.position.y < target) {
      // move up gradually
      flower.position.y += Math.random() * 0.05;

      // clamp so it doesn't overshoot
      if (flower.position.y > target) {
        flower.position.y = target;
      }
    }

});
// camera
  if(camera.position.z<75) {
    camera.position.z += 0.05; // increase slowly → zoom out
    camera.position.x +=0.01
  }

  controls.update(); // important
  composer.render();
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}



function createParkingLot() {

  const textureLoader = new THREE.TextureLoader();
  const roadTexture = textureLoader.load('media/parking_lot/parkinglot.jpg');

  
  roadTexture.repeat.set(1, 2); 
  roadTexture.wrapS = THREE.RepeatWrapping;
  roadTexture.wrapT = THREE.RepeatWrapping;
  
  const roadGeo = new THREE.PlaneGeometry(lotWidth, lotLength);
  const roadMat = new THREE.MeshStandardMaterial({ map: roadTexture });
  
  const road = new THREE.Mesh(roadGeo, roadMat);
  road.rotation.x = -Math.PI / 2; // make it horizontal
  scene.add(road);

}


function createScene() {
  // load church (commented out)  
  const loader = new GLTFLoader(); // loader for all of the gltf files 
loader.load("media/parking_lot/street_light/scene.gltf", function(gltf) {


  const stLightMain = gltf.scene;

  stLightMain.scale.set(0.04, 0.04, 0.04); // uniform scale
  stLightMain.position.set(0+6.9, 0, 0);

  // 1. Create the light (Color, Intensity, Distance, Decay)
  const light = new THREE.SpotLight(0x00FF59, 80, 30, 4);
  light.position.set(0, 4, 0+5.5);

  light.target.position.set(0, 0, 5); // aim at ground

  const lightBulb = new THREE.Mesh(lightBulbGeo, lightBulbMat);

  lightBulb.position.set(0, 14.6, 0+5.5); 

  stLight.add(light);
  stLight.add(light.target); // IMPORTANT
  stLight.add(lightBulb); 
  stLight.add(stLightMain)

  scene.add(stLight)
}); 


loader.load("media/parking_lot/brooklyn_street_row_buildings_low_poly/scene.gltf", function(gltf) {


  const cityMain = gltf.scene;
  cityMain.position.set(100, 0.01, 0); 
  cityMain.scale.set(4.8, 4.8, 4.8); // uniform scale

  cityMain.rotation.y = Math.PI;

  gltf.scene.traverse((child) => {
  if (child.isMesh) {
    child.material.transparent = true;
    child.material.opacity =1;
    child.material.depthWrite = true;
    
  }
});


// OPTIONAL: hide original mesh
scene.remove(cityMain);


  const cityBack = cityMain.clone(true); 
  cityBack.position.set(-100, 0.01, 0); 
  cityBack.rotation.y = Math.PI; 

  const cityLeft = cityMain.clone(); 
  cityLeft.position.set(0, 0.01, -100)
  cityLeft.rotation.y = -Math.PI/2; 

  const cityRight = cityMain.clone(); 
  cityRight.position.set(0, 0.01, 100)
  cityRight.rotation.y = Math.PI/2; 

  

  scene.add(cityMain)
  scene.add(cityBack)
  scene.add(cityLeft)
  scene.add(cityRight)
}); 

loader.load("media/parking_lot/love_a_kiss/scene.gltf", function(gltf) {


  const kissMain = gltf.scene;

  kissMain.position.set(10, 0.01, 0)
  kissMain.scale.set(8, 8, 8); // uniform scale
  kissMain.traverse((child) => {
    if (child.isMesh) {

     child.material = new THREE.MeshStandardMaterial({
  color: 0xFFC0CB,            // 
  emissive: 0xFFC0CB,         // 
  emissiveIntensity: 1,       // brightness of glow
  roughness: 0.5,
  metalness: 0.1
});

    }
  });


  const kissBack = kissMain.clone(true)
  kissBack.scale.z *= -1;
  kissBack.position.set(10, 0.01, -4.6)

  kissGroup.position.set(-7.2, 1.7, 6)
  kissGroup.scale.set(0.75, 0.75, 0.75)


  kissGroup.add(kissMain)
  kissGroup.add(kissBack)
  scene.add(kissGroup)
}); 

loader.load("media/parking_lot/1965_ford_mustang_convertible/scene.gltf", function(gltf) {
  car = gltf.scene;

  car.position.set(1, 0, 6)
  car.scale.set(0.19, 0.19, 0.19); // uniform scale

  
scene.remove(car);

  kissGroup.add(car)
  scene.add(car)
}); 
}


// turn to particles 
function extractPositionsFromGLTF(model) {
  let positions = [];

  model.traverse((child) => {
    if (child.isMesh && child.geometry.attributes.position) {
      const attr = child.geometry.attributes.position;
      for (let i = 0; i < attr.count; i++) {
        positions.push(attr.getX(i), attr.getY(i), attr.getZ(i));
      }
    }
  });

  return new THREE.Float32BufferAttribute(positions, 3);
}

// create particles 
function createParticleModel(model, color = 0xffffff, size = 0.1) {
  const positions = extractPositionsFromGLTF(model);

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", positions);

  const material = new THREE.PointsMaterial({
    color: color,
    size: size,
  });

  const points = new THREE.Points(geometry, material);

  // match transform
  points.position.copy(model.position);
  points.rotation.copy(model.rotation);
  points.scale.copy(model.scale);

  return points;
}


function createWildFlowers() {
  const noise2D = createNoise2D(); // generate the perlin noise

const loader = new GLTFLoader(); // loader for all of the gltf files 

loader.load("media/parking_lot/realistic_hd_large-leaved_lupine_1418/scene.gltf", function(gltf) {

const baseFlower = gltf.scene;
baseFlower.scale.set(20, 20, 20);

const size = 200;
const half = size / 2;

// 🔥 increase this for density
const count = 2000;

for (let i = 0; i < count; i++) {

  // 🎯 square distribution
  const x = (Math.random() - 0.5) * size;
  const z = (Math.random() - 0.5) * size;

  // noise filter (controls clustering)
  const n = noise2D(x * 0.03, z * 0.03);

  if (n > 0.1) { // lower threshold = more flowers, dont generate if on the car
    const flower = baseFlower.clone(true); // 

    flower.position.set(x, -10, z);

    // variation (makes it look natural)
    const s = 15 + Math.random() * 10;
    flower.scale.set(s, s, s);

    flower.rotation.y = Math.random() * Math.PI * 2;

    scene.add(flower);
    flowers.push(flower);
  }
}
}); 

}