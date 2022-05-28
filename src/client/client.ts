import * as THREE from "three";

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";

import Stats from "three/examples/jsm/libs/stats.module";
const scene = new THREE.Scene();

scene.background = new THREE.Color(0xdadada);

const size = 20;
const divisions = 20;

const gridHelper = new THREE.GridHelper(size, divisions);
scene.add(gridHelper);

//gridHelper.position.x = 10;

scene.add(new THREE.AxesHelper(10));

const light = new THREE.PointLight(0xffffff, 1, 100);
light.position.set(12, 12, 7);
light.castShadow = true; // default false
scene.add(light);

const light2 = new THREE.PointLight(0xffffff, 1, 100);
light2.position.set(-2, 5, 2);
light2.castShadow = false; // default false
scene.add(light2);

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  50
);
camera.position.z = 9;
camera.position.y = 6;
camera.position.x = -3;

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

document.body.appendChild(renderer.domElement);

new OrbitControls(camera, renderer.domElement);

const planegeometry = new THREE.PlaneGeometry();

const materialgreen = new THREE.MeshStandardMaterial({
  color: 0x00ff00,
  wireframe: false,
  metalness: 0.1,
  roughness: 0.4,
});

const materialred = new THREE.MeshStandardMaterial({
  color: 0xff0000,
  wireframe: false,
  metalness: 0.1,
  roughness: 0.5,
});

const materialgray = new THREE.MeshStandardMaterial({
  color: 0xdadada,
  wireframe: false,
  metalness: 0.1,
  roughness: 0.7,
});

const materialyellow = new THREE.MeshStandardMaterial({
  color: 0xffff00,
  wireframe: false,
  metalness: 0.1,
  roughness: 0.3,
});

/*const normalTexture = new THREE.TextureLoader().load(
  "Plastic_Rough_001_normal.jpg"
);
light.castShadow = true; // default false
normalTexture.wrapS = THREE.RepeatWrapping;
normalTexture.wrapT = THREE.RepeatWrapping;
normalTexture.repeat.set(1, 1);

materialgreen.normalMap = normalTexture;
materialgreen.normalScale.set(1, 1);

materialred.normalMap = normalTexture;
materialred.normalScale.set(1, 1);

materialyellow.normalMap = normalTexture;
materialyellow.normalScale.set(1, 1);*/

const cubearray = [];

const xDistance = 1.1;
const zDistance = 1;

const cubegeometry = new RoundedBoxGeometry(1, 1, 1);

const xOffset = 0.25;

for (let i = 0; i < 8; i++) {
  for (let j = 0; j < 1; j++) {
    const mesh = new THREE.Mesh(cubegeometry, materialgreen);
    mesh.castShadow = true; //default is false

    mesh.scale.y = Math.floor(Math.random() * 6.0) + 1.0;
    if (mesh.scale.y >= 4) mesh.material = materialgreen;
    else if (mesh.scale.y < 4 && mesh.scale.y > 2) {
      mesh.material = materialyellow;
    } else mesh.material = materialred;

    mesh.position.x = xDistance * i + xOffset;
    mesh.position.z = zDistance * j;
    mesh.position.y = mesh.scale.y / 2;

    scene.add(mesh);
  }
}

const plane = new THREE.Mesh(planegeometry, materialgray);

plane.receiveShadow = true;

scene.add(plane);

plane.scale.x = 20;
plane.scale.y = 20;
plane.scale.z = 20;

plane.position.y = -0.01;

plane.rotation.x = -1.5707;

const helper = new THREE.CameraHelper(light.shadow.camera);
scene.add(helper);

const helper2 = new THREE.CameraHelper(light2.shadow.camera);
scene.add(helper);

window.addEventListener("resize", onWindowResize, false);
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);

  render();
}

const stats = Stats();
document.body.appendChild(stats.dom);

function animate() {
  requestAnimationFrame(animate);

  //cube1.rotation.x += 0.01;
  //cube1.rotation.y += 0.01;
  //cube2.rotation.y += 0.01;
  //cube3.rotation.y += 0.01;

  stats.update();

  render();
}

function render() {
  renderer.render(scene, camera);
}

animate();
