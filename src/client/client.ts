import * as THREE from "three";

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

import Stats from "three/examples/jsm/libs/stats.module";
const scene = new THREE.Scene();

scene.background = new THREE.Color(0xdadada);

const size = 20;
const divisions = 20;

const gridHelper = new THREE.GridHelper(size, divisions);
scene.add(gridHelper);

//gridHelper.position.x = 10;

scene.add(new THREE.AxesHelper(10));

const light = new THREE.PointLight(0xffffff, 3, 250);
light.position.set(7, 10, 5);
scene.add(light);

const light2 = new THREE.PointLight(0xffffff, 1.5, 100);
light2.position.set(-2, 5, 2);
scene.add(light2);

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 7;
camera.position.y = 7;
camera.position.x = 5;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

new OrbitControls(camera, renderer.domElement);

const geometry = new THREE.BoxGeometry();

const planegeometry = new THREE.PlaneGeometry();

const materialgreen = new THREE.MeshStandardMaterial({
  color: 0x00ff00,
  wireframe: false,
  metalness: 0.5,
  roughness: 0.1,
});

const materialred = new THREE.MeshStandardMaterial({
  color: 0xff0000,
  wireframe: false,
  metalness: 0.5,
  roughness: 0.1,
});

const materialgray = new THREE.MeshStandardMaterial({
  color: 0x404040,
  wireframe: false,
  metalness: 0.1,
  roughness: 0.7,
});

const materialyellow = new THREE.MeshStandardMaterial({
  color: 0xffff00,
  wireframe: false,
  metalness: 0.5,
  roughness: 0.1,
});

const cubearray = [];

const xDistance = 1;
const zDistance = 1;

const cubegeometry = new THREE.BoxGeometry(0.5, 1, 0.5);

const xOffset = 0.25;

for (let i = 0; i < 5; i++) {
  for (let j = 0; j < 2; j++) {
    const mesh = new THREE.Mesh(cubegeometry, materialgreen);
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
scene.add(plane);

plane.scale.x = 20;
plane.scale.y = 20;
plane.scale.z = 20;

plane.position.y = -0.05;

plane.rotation.x = -1.5707;

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
