/**
 * hatman -> https://sketchfab.com/3d-models/the-traveler-065fc05398bf4bcc915ed6ac36d844c5
 */


// generic import controls 
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

// for visual effects 
import { UnrealBloomPass } from 'https://unpkg.com/three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { ShaderPass } from "https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/postprocessing/ShaderPass.js";
import { HorizontalBlurShader } from "https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/shaders/HorizontalBlurShader.js";
import { VerticalBlurShader } from "https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/shaders/VerticalBlurShader.js";
import { GodraysPass } from "https://unpkg.com/three-good-godrays@0.8.1/build/three-good-godrays.esm.js";
// for background
import { RGBELoader } from 'https://cdn.jsdelivr.net/npm/three@0.160/examples/jsm/loaders/RGBELoader.js';

// for trees/ perlin noise 
import { createNoise2D } from "https://cdn.skypack.dev/simplex-noise";

// for blur 
import { BokehPass } from "https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/postprocessing/BokehPass.js";
import { EffectComposer } from 'https://unpkg.com/three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'https://unpkg.com/three/examples/jsm/postprocessing/RenderPass.js';



// fade in
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

fadeOverlay.style.transition = "opacity 3s ease";

// add to page
document.body.appendChild(fadeOverlay);

// trigger fade after a short delay (or call whenever you want)
setTimeout(() => {
  fadeOverlay.style.opacity = "0";
}, 300);



// create scene 
const scene = new THREE.Scene();
scene.fog = new THREE.Fog(0xDAB1DA, 10, 80); // add fog 
scene.background = new THREE.Color(0xDAB1DA);
//scene.environment = null;



// Directional light
const directionalLight = new THREE.DirectionalLight(0xFFFF00, 3);
directionalLight.position.set(50, 50, 1);
directionalLight.castShadow = true;
directionalLight.shadow.mapSize.width = 2048; // we can make them more efficient, but needs to be by factors of 2
directionalLight.shadow.mapSize.height = 2048;
directionalLight.shadow.radius = 15; // adds bluring effect

scene.add(directionalLight)


// to see, ambient light 
const light = new THREE.AmbientLight( 0xe6d7ff, 9); // soft white light
light.distance = 500; 
scene.add( light );


// camera 
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100,
);
camera.position.x = 8;
camera.position.y = 34;
camera.position.z = 8;
scene.add(camera);


//RENDER
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 0.5;
document.body.appendChild(renderer.domElement);

renderer.setSize(sizes.width, sizes.height);
renderer.shadowMap.enabled = true;

// HDR background 
// create refleuctive material 
const loaderEnviron = new RGBELoader();

/*loaderEnviron.load('media/street/underwater-light-rays.jpg', (texture) => {
  texture.mapping = THREE.EquirectangularReflectionMapping;

  scene.environment = texture; // reflections
  scene.background = texture;  // visible skybox
}); */

// CONTROLS
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.autoRotate= true; 
controls.rotateSpeed=0.05; 
camera.lookAt(0,30,0)


// EFFECT COMPOSER 
const composer = new EffectComposer(renderer);
composer.addPass(new RenderPass(scene, camera));

// blur 
  const bokeh = new BokehPass(scene, camera, {
    focus: 20.0,        // distance where image is sharp
    aperture: 0.0005,  // blur strength (smaller = subtle blur)
    maxblur: 0.01      // max blur allowed
  });
  composer.addPass(bokeh);


// create vars
let trees = []; 

// load in 
createRoom(); 
//createWildFlowers(); 
//createFlowerField(); 

// cam 
let angle = 0;
const radius = 8;
const speed = -0.2; // controls rotation speed
const clock = new THREE.Clock();


// animate 
window.requestAnimationFrame(animate);
function animate() {

  // cam 
  const delta = clock.getDelta();
  angle += delta * speed;

  camera.position.x = radius * Math.cos(angle);
  camera.position.z = radius * Math.sin(angle);

  camera.lookAt(0, 30, 0); // look at center

  renderer.render(scene, camera);

  // controls updating (always)
  controls.update();
  composer.render();
  window.requestAnimationFrame(animate);
  window.addEventListener("resize", onWindowResize);

}


function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}



function createRoom() {
    const loader = new GLTFLoader();



// plane 
const textureLoader = new THREE.TextureLoader();
const texture = textureLoader.load("media/bedroom/check.jpg");

// enable tiling
texture.wrapS = THREE.RepeatWrapping;
texture.wrapT = THREE.RepeatWrapping;
texture.repeat.set(7, 5);

const geometryP = new THREE.PlaneGeometry(50, 50);
//const geometryW = new THREE.PlaneGeometry(50, 25)

const materialP = new THREE.MeshStandardMaterial({
  map: texture,
  color: 0x555555
});

const plane = new THREE.Mesh(geometryP, materialP);
const wall1 = new THREE.Mesh(geometryP, materialP);
wall1.position.set(0, 0, -25)

const wall2 = new THREE.Mesh(geometryP, materialP);
wall2.rotation.y = Math.PI/2; 
wall2.position.set(-25, 0, 0)


const wall3 = new THREE.Mesh(geometryP, materialP);
wall3.rotation.y = -Math.PI/2; 
wall3.position.set(25, 0, 0)




plane.rotation.x = -Math.PI / 2;

scene.add(plane);  
scene.add(wall1)
scene.add(wall2)
scene.add(wall3)


// bed 
    loader.load("media/bedroom/messy_bed_2.0_with_wall_mounted_backboard/scene.gltf", function(gltf) {
        const bed = gltf.scene; 

        bed.scale.set(7,7,7)
        bed.position.set(0, 0, -10)
        scene.add(bed)
    
    }); 

    // forest 
    loader.load("media/bedroom/shiny_forest.glb", function(gltf) {
        const forest = gltf.scene; 


        forest.traverse((child) => {
        if (child.isMesh) {
            child.material = new THREE.MeshPhysicalMaterial({
                 color: 0x000000,

                metalness: 0.6,      // metallic look
                roughness: 0.1,      // smooth surface

                transmission: 0.6,   // 🔥 makes it translucent (glass effect)
                transparent: true,
                opacity: 0.8, 

                ior: 5,            // refraction index (glass-like bending)
                thickness: 7.0,      // how deep light travels

                envMapIntensity: 6 // refle
            });
        }
        });

console.log(gltf);
        forest.scale.set(5,5,5)
        forest.rotation.y = Math.PI; 
        forest.position.set(0, -3, 0)
        scene.add(forest)

    
    }); 



}


function createFlowerField() {
  const center = new THREE.Vector3(0, 0, 0); 
  const innerClearRadius = 25; 
  const ringCount = 9; 
  const flowersPerRing = 7; 
  const startRadius = 30;
  const ringSpacing = 3;
  const baseScale = 12; 


const loader = new GLTFLoader(); // loader for all of the gltf files 


  loader.load("media/bedroom/simple_purple_bush/scene.gltf", (gltf) => {

    const baseModel = gltf.scene;

    const group = new THREE.Group();
    scene.add(group);

    for (let ring = 0; ring < ringCount; ring++) {

      const radius = startRadius + ring * ringSpacing;

      // smaller as we go outward
      const scale = baseScale * (1 - ring * 0.15);

      for (let i = 0; i < flowersPerRing; i++) {

        const angle = (i / flowersPerRing) * Math.PI * 2;

        const x = center.x + Math.cos(angle) * radius;
        const z = center.z + Math.sin(angle) * radius;

        const flower = baseModel.clone(true);

        flower.position.set(x, center.y, z);

        flower.scale.set(scale, scale, scale);

        // random rotation for variation
        flower.rotation.y = Math.random() * Math.PI * 2;

        group.add(flower);
      }
    }

    // optional: keep center empty marker (debug)
    const debugCircle = new THREE.Mesh(
      new THREE.RingGeometry(innerClearRadius, innerClearRadius + 0.5, 64),
      new THREE.MeshBasicMaterial({ color: 0x00ff00, side: THREE.DoubleSide })
    );
    debugCircle.rotation.x = -Math.PI / 2;
    debugCircle.position.copy(center);
    scene.add(debugCircle);

  });
}



// create trees
function createWildFlowers() {

  const noise2D = createNoise2D();
  const loader = new GLTFLoader();

  loader.load("media/bedroom/as17_rhododendron_ponticum_common_rhododendron/scene.gltf", function(gltf) {

    const baseTree = gltf.scene;
    baseTree.scale.set(0.05, 0.05, 0.05);

    const size = 90;
    const half = size / 2;

    const centerClear = 40; 
    const step = 4;         // spacing grid resolution
    const heightJitter = 0.02;

    for (let x = -half; x < half; x += step) {
      for (let z = -half; z < half; z += step) {

        if (Math.abs(x) < centerClear && Math.abs(z) < centerClear) {
          continue;
        }

        // Perlin noise mask (organic clustering)
        const n = noise2D(x * 0.1, z * 0.1);

        if (n < -0.15) continue;

        const tree = baseTree.clone(true);

        tree.position.set(
          x + Math.random() * 0.5,
          0,
          z + Math.random() * 0.5
        );

        // variation
        const s = 0.1 + Math.random() * 0.03;
        tree.scale.set(s, s + Math.random() * heightJitter, s);

        tree.rotation.y = Math.random() * Math.PI * 2;

        scene.add(tree);
      }
    }

  });
}