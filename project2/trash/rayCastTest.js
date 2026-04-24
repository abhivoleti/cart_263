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

// add orbit controls 
  const controls = new OrbitControls(camera, canvas)

// add three spheres to the scene

const object1 = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 16, 16),
    new THREE.MeshBasicMaterial({ color: '#ff0000' })
)
object1.position.x = -2

const object2 = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 16, 16),
    new THREE.MeshBasicMaterial({ color: '#ff0000' })
)
object2.position.x = 2


const object3 = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 16, 16),
    new THREE.MeshBasicMaterial({ color: '#ff0000' })
)

scene.add(object1,object2,object3)

// animate! 
/*window.requestAnimationFrame(animate);

function animate() { // everything (position etc) only gets set when it renders. 
  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(animate);
}*/

// HOWEVER, you can force objects into positions before theyre renderred with this
  object1.updateMatrixWorld()
  object2.updateMatrixWorld()
  object3.updateMatrixWorld()


// add raycaster object
/*const raycaster = new THREE.Raycaster() // you can change the ray caster (orgin?) by changing the values in here.
const rayOrigin = new THREE.Vector3(- 3, 0, 0) // ray will start somewhere on left of the spheres
const rayDirection = new THREE.Vector3(10, 0, 0)  //reduce magnitude BUT keep direction //right (positive x)
console.log(rayDirection.length()) // //set direction only (has length ==1)
rayDirection.normalize()
console.log(rayDirection.length())
raycaster.set(rayOrigin, rayDirection)//raycaster has been oriented
*/

// add raycaster object (all thats needed to be established for mouse pos)
const raycaster = new THREE.Raycaster() // set just this, no need to set anything else 


// add raycaster object (dif position)
/*const rayOrigin_n_2 = new THREE.Vector3(-2, 5, 0);
const rayDirection_2 = new THREE.Vector3(0, -10, 0); //point down
rayDirection_2.normalize();
raycaster.set(rayOrigin_n_2, rayDirection_2);*/ //raycaster has been oriented

 //cast a ray - check intersection with ONLY object 1
const intersect = raycaster.intersectObject(object1)
console.log(intersect)

// cast a ray - check intersection with obj1, obj2 and obj 3 
//const intersects = raycaster.intersectObjects([object1, object2, object3]) // comented out, instead its changed colours inside animation function so its live updating instead of once 
//console.log(intersects)


  
window.requestAnimationFrame(animate);

/*function animate(timer) {
  controls.update();
    object1.position.y = Math.sin(timer/1000 *.5 ) * 3
    object2.position.y = Math.sin(timer/1000  *.4) * 3
    object3.position.y = Math.sin(timer/1000 *.3) *  3
    const objectsToTest = [object1, object2, object3]
    const intersects = raycaster.intersectObjects(objectsToTest)
    for(const object of objectsToTest)
    {
        object.material.color.set('#ff0000')
    }
    for(const intersect of intersects)
    {
        intersect.object.material.color.set('#0000ff') // changes colour when it hits the zero mark 
    }
  renderer.render(scene, camera);
  window.requestAnimationFrame(animate);
}*/

// new, to update colour based on mouse position 

/// FOR MOUSE ENTER AND MOUSE LEAVE
let currentIntersectedObj = null

 function animate(timer) {
  controls.update();

  raycaster.setFromCamera(mouse, camera);

  const objectsToTest = [object1, object2, object3];
  const intersects = raycaster.intersectObjects(objectsToTest);

  if (intersects.length > 0) {
      //there was none so we enter
      if (currentIntersectedObj === null) {
        currentIntersectedObj = intersects[0]; //take first
        console.log("mouse enter");
        currentIntersectedObj.object.material.color.set("#00c3ff");
      }
      else{
      
       //the currently selected one is NO LONGER IN THE LIST
       if (intersects.find(findIfCurrentObjIsActive) === undefined) {
        currentIntersectedObj.object.material.color.set("#ff0000");
        currentIntersectedObj = intersects[0]; //take first
        currentIntersectedObj.object.material.color.set("#00c3ff");

       }
    }
  }
  //no intersections
 else{
    // check if NOT null (so there was one just over)
     if(currentIntersectedObj!==null){
       // console.log("mouse out")
        currentIntersectedObj.object.material.color.set("#ff1900");
        currentIntersectedObj =null

     }

 }
function findIfCurrentObjIsActive(intersect){
        return intersect.object === currentIntersectedObj.object;
      }

      window.addEventListener("click", function (event) { // when mouse is over and you click, the object your mouse is over turns yellow. 
  console.log("click")
    if(currentIntersectedObj!==null){
         currentIntersectedObj.object.material.color.set("#ffe600");
    }
})
  renderer.render(scene, camera);
  window.requestAnimationFrame(animate);
}



  
  const mouse = new THREE.Vector2();
  window.addEventListener("mousemove", function(event) {
  mouse.x = (event.clientX / sizes.width) * 2 - 1; //map to between -1,1 (where the mouse can be)
  mouse.y = -(event.clientY / sizes.height) * 2 + 1; //map to between -1,1 (where the mouse can be)
  //console.log(mouse);
  });

