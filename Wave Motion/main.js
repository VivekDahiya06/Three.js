import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import texture from '/8.png'
import GUI from "lil-gui";



//Setting up constants
const count = 20000;
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};



//Setting up renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(sizes.width, sizes.height);
document.body.appendChild(renderer.domElement);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));



//Setting up Scene, Camera and Orbit-Controls
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  500,
);
const controls = new OrbitControls(camera, renderer.domElement);
const axisHelper = new THREE.AxesHelper(5);
camera.position.z = 6;
controls.enableDamping = true;




//Loading Texture
const textureLoader = new THREE.TextureLoader();
const particleTexture = textureLoader.load(texture);




//Setting up Points
const Geo = new THREE.BufferGeometry();
const positions = new Float32Array(count * 3);
const colors = new Float32Array(count * 3);
for (let i = 0; i < count * 3; i++) {
  positions[i] = (Math.random() - 0.5) * 10;
  colors[i] = Math.random();
}
Geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
Geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));




//Setting up Material
const Mat = new THREE.PointsMaterial({
  size: 0.1,
  sizeAttenuation: true,
  transparent: true,
  alphaMap: particleTexture,
  // alphaTest: 0.001,
  // depthTest: false,
  depthWrite: false,
  vertexColors: true,
  blending: THREE.AdditiveBlending,
});



//Creating Mesh
const particles = new THREE.Points(Geo, Mat);

const gui = new GUI();

const Objects = {
  wavelength: 1,
  amplitude: 1,
  function: Math.sin
}

const changeFunction = (Math_function) => {
  switch (Math_function) {
    case "Cos":
      Objects.function = Math.cos;
      break;
    case "Tan":
      Objects.function = Math.tan;
      break;
    default:
      Objects.function = Math.sin;
      break;
  }
}

gui.add(Objects, 'wavelength', 0.005, 3, 0.01)
  .name('Wavelength')
  .onChange((value) => wavelength = value);


gui.add(Objects, 'amplitude', 0.2, 6, 0.01)
  .name('Amplitude')
  .onChange((value) => amplitude = value);


gui.add({ function: "Sin" }, "function", ["Sin", "Cos", "Tan"])
  .name("Function")
  .onChange(changeFunction);


gui.add(particles, 'visible').name('Visibility');

//Adding Objects to scene
scene.add(particles);
scene.add(axisHelper);




//function for animation
const clock = new THREE.Clock();
const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  for (let i = 0; i < count; i++) {
    const i3 = i * 3;
    const x = Geo.attributes.position.array[i3];
    Geo.attributes.position.array[i3 + 1] = Objects.function(elapsedTime + x / Objects.wavelength) * Objects.amplitude;
  }

  Geo.attributes.position.needsUpdate = true;


  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(tick);
};
tick();



//Setting up window resize actionListener
window.addEventListener("resize", () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});
