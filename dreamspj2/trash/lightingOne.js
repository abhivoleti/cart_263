import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'


// set up scene, camera, renderer
const scene = new THREE.Scene() // start scene 
const sizes = {
    width: 800,
    height: 600
}
const canvas = document.querySelector('canvas#three-ex')
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 3;
scene.add(camera)

const renderer = new THREE.WebGLRenderer({ // renderes canvas 
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height) // sizes defined at top 
const controls = new OrbitControls(camera, canvas)

const material = new THREE.MeshStandardMaterial({}); // add material that interacts with light, needs light (black screen otherwise)
const geometry = new THREE.BoxGeometry(1, 1, 1);  // width, height, depth

const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

const mesh_2 = new THREE.Mesh(geometry, material)
scene.add(mesh_2)
mesh_2.position.x = -2

//NEW for casting shadows add a plane:)
const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(5, 5),
    material
)
scene.add(plane)
plane.rotation.x = - Math.PI * 0.5
plane.position.y = -.5;
plane.position.z = 1;
plane.position.x = -1;


// ADD LIGHT 
/*const ambientLight = new THREE.AmbientLight(); // adds non-directional light, enough to light up the items (omnidirectional)
scene.add(ambientLight); 
ambientLight.color = new THREE.Color(0xff0000);  // you can also use rgb 
ambientLight.intensity = .5;
*/


// directional light, animated in animate() 
const directionalLight = new THREE.DirectionalLight() // default, above light
directionalLight.color = new THREE.Color(0xFFA500)
scene.add(directionalLight)
directionalLight.position.set(-5,5, 0)



// point light  
/*const pointLight = new THREE.PointLight(0xff9000, 1.5)
scene.add(pointLight)
console.log(pointLight.position) // default position is 0,0,0
pointLight.position.set(0,1,0) //set y 
pointLight.intensity = 5 //set the intensity too
pointLight.distance = 1
pointLight.distance =0
pointLight.decay = .5
*/

// moving the light 

/*const spotLight = new THREE.SpotLight(0x78ff00, 4.5, 10, Math.PI * 0.1, 0.25, 1)
spotLight.position.set(0, 2, 3)
scene.add(spotLight)
scene.add(spotLight.target)
spotLight.target.position.x = -2 // updates the target position, default is 0,0
*/

  

window.requestAnimationFrame(animate);


 function animate(timer) {
  controls.update();

  let x = directionalLight.position.x // move light source
  x+=.02
  directionalLight.position.set(x,5, 0)


  renderer.render(scene, camera);
  window.requestAnimationFrame(animate);
}

