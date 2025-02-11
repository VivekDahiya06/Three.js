import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { Control_Panel } from './Control_Panel';
const App = () => {


  if (document.querySelector('canvas')) {
    document.querySelector('canvas').remove();
  }

  //Setting up Renderer
  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  document.body.appendChild(renderer.domElement)





  //Setting up Scene, Camera, Controls
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    200
  );
  const controls = new OrbitControls(camera, renderer.domElement);
  const axisHelper = new THREE.AxesHelper(8);
  controls.enableDamping = true;
  camera.position.set(4, 2, 4);





  //Making Mesh
  const geo = new THREE.BoxGeometry(2, 2, 2);
  const mat = new THREE.MeshBasicMaterial({
    color: 0xff0000
  });
  const mesh = new THREE.Mesh(geo, mat);




  //Adding all the objects to scene
  scene.add(mesh);
  scene.add(axisHelper);



  //Adding GUI
  Control_Panel(mesh);



  //Function to call animation
  const animate = () => {
    requestAnimationFrame(animate)
    controls.update();
    renderer.render(scene, camera);
  }
  animate()






  //Adding action_listener to Window resize
  window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
  
}
App();
