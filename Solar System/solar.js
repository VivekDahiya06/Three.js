import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import starTexture from '/images/stars.jpg';
import sunTexture from '/images/sun.jpg';
import mercuryTexture from '/images/mercury.jpg';
import venusTexture from '/images/venus.webp';
import earthTexture from '/images/earth.jpg';
import marsTexture from '/images/mars.jpg';
import jupiterTexture from '/images/jupiter.jpg';
import saturnTexture from '/images/saturn.jpg';
import saturn_rings from '/images/saturn ring.png';
import uranusTexture from '/images/uranus.jpg';
import neptuneTexture from '/images/neptune.jpg';
//Adding renderer and setting up its width and height

const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

//setting up scene,camera,axis-helper and orbit-controls
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 10000);

const axisHelper = new THREE.AxesHelper(1000);

const gridHelper = new THREE.GridHelper(10000,500);

const controls = new OrbitControls(camera, renderer.domElement);

const pointLight = new THREE.PointLight(0xffffff, 2, 10000, 0.1);

// const gui = new dat.GUI();

camera.position.set(200, 100, 200);
controls.enableDamping = true;


//loading stars background to cube texture loader and setting it up as background to the scene
const loader = new THREE.CubeTextureLoader();
const texture = loader.load([
    starTexture,
    starTexture,
    starTexture,
    starTexture,
    starTexture,
    starTexture,
]);
scene.background = texture;

//(This texture loader will be used for every planet)
const txtLoader = new THREE.TextureLoader();

//function to create planets
function createPlanet(size, texture,x,y,z,rings) {
    const Txt = txtLoader.load(texture);
    const Geo = new THREE.SphereGeometry(size, 45, 45);
    const Mat = new THREE.MeshStandardMaterial({
        map: Txt,
    })
    const mesh = new THREE.Mesh(Geo, Mat);
    const Obj = new THREE.Object3D();
    // const raycaster = new THREE.Raycaster();
    // const mouse = new THREE.Vector3();

    // window.addEventListener('click', (e) => {
    //     mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
    //     mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
    //     raycaster.setFromCamera(mouse, camera);
    //     const intersects = raycaster.intersectObject(mesh);
    //     if (intersects.length > 0) {
    //         const selectedMeshPosition = mesh.position.clone();
    //         const selectedMesh = intersects[0].object;
    //         selectedMesh.position.set(0, 0, 0);
    //         Obj.children.forEach((child) =>{
    //             if (child !== selectedMesh) {
    //                 child.position.sub(selectedMeshPosition);
    //             }
    //         });
    //         sun.position.sub(selectedMeshPosition);
    //         camera.position.sub(selectedMeshPosition);
    //         intersects.splice(0, intersects.length());
    //     }
    // });

    Obj.add(mesh);
    if (rings) {
        const ringTxt = txtLoader.load(rings);
        const ringGeo = new THREE.RingGeometry(18, 29, 45);
        const ringMat = new THREE.MeshBasicMaterial({
            side: THREE.DoubleSide,
            map: ringTxt
        });
        const ring = new THREE.Mesh(ringGeo, ringMat);
        Obj.add(ring);
        ring.rotateX(-1.5708);
        ring.position.set(x,y,z);
    }
    mesh.position.set(x, y, z);
    return {mesh, Obj};
}

//Making Sun
const sunText = txtLoader.load(sunTexture);
const sunGeo = new THREE.SphereGeometry(100,45,45);
const sunMat = new THREE.MeshBasicMaterial({
    map: sunText,
});
const sun = new THREE.Mesh(sunGeo, sunMat);

//Making Mercury
const mercury = createPlanet(3, mercuryTexture, 150, 0, 0);

//Making Venus
const venus = createPlanet(9, venusTexture, 200, 0, 0);

//Making Earth
const earth = createPlanet(10, earthTexture, 250, 0, 0);

//Making Mars
const mars = createPlanet(8, marsTexture, 300, 0, 0);

//Making Jupiter
const jupiter = createPlanet(16, jupiterTexture, 350, 0, 0);

//Making Saturn
const saturn = createPlanet(14, saturnTexture, 400, 0, 0, saturn_rings);

//Making Uranus
const uranus = createPlanet(13, uranusTexture, 450, 0, 0);

//Making Neptune
const neptune = createPlanet(14, neptuneTexture, 500, 0, 0);

//Adding all components to the scene
scene.add(mercury.Obj);
scene.add(venus.Obj);
scene.add(earth.Obj);
scene.add(mars.Obj);
scene.add(jupiter.Obj);
scene.add(saturn.Obj);
scene.add(uranus.Obj);
scene.add(neptune.Obj);
scene.add(pointLight);
scene.add(sun);
// scene.add(gridHelper);
// scene.add(axisHelper);


function animate() {
    //rotation of planets and sun
    sun.rotateY(0.002);
    mercury.mesh.rotateY(0.0009);
    venus.mesh.rotateY(0.0005);
    earth.mesh.rotateY(0.001);
    mars.mesh.rotateY(0.0015);
    jupiter.mesh.rotateY(0.0025);
    saturn.mesh.rotateY(0.003);
    uranus.mesh.rotateY(0.0025);
    neptune.mesh.rotateY(0.0035);

    //revolution of planets
    mercury.Obj.rotateY((Math.PI/180)*0.515);
    venus.Obj.rotateY((Math.PI/180)*0.343);
    earth.Obj.rotateY((Math.PI/180)*0.171);
    mars.Obj.rotateY((Math.PI/180)*0.085);
    jupiter.Obj.rotateY((Math.PI/180)*0.051);
    saturn.Obj.rotateY((Math.PI/180)*0.034);
    uranus.Obj.rotateY((Math.PI/180)*0.017);
    neptune.Obj.rotateY((Math.PI/180)*0.005);

    //animation
    controls.update();
    renderer.render(scene, camera);
}
renderer.setAnimationLoop(animate);

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});