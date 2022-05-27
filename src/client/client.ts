import * as THREE from "three";

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

import Stats from "three/examples/jsm/libs/stats.module";
const scene = new THREE.Scene();

//scene.background = new THREE.Color(0x4488ff);

const size = 20;
const divisions = 20;

const gridHelper = new THREE.GridHelper(size, divisions);
scene.add(gridHelper);

//gridHelper.position.x = 10;

scene.add(new THREE.AxesHelper(10));

const light3 = new THREE.AmbientLight();
scene.add(light3);

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 10;
camera.position.y = 6;
camera.position.x = 4;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

new OrbitControls(camera, renderer.domElement);

const geometry = new THREE.BoxGeometry();

const planegeometry = new THREE.PlaneGeometry();

const materialgreen = new THREE.MeshStandardMaterial({
  color: 0x00ff00,
  wireframe: false,
});

const materialred = new THREE.MeshStandardMaterial({
  color: 0xff0000,
  wireframe: false,
});

const materialgray = new THREE.MeshStandardMaterial({
  color: 0x404040,
  wireframe: false,
});

const cube1 = new THREE.Mesh(geometry, materialgreen);
scene.add(cube1);

const cube2 = new THREE.Mesh(geometry, materialred);
scene.add(cube2);

const cube3 = new THREE.Mesh(geometry, materialgreen);
scene.add(cube3);

const plane = new THREE.Mesh(planegeometry, materialgray);
scene.add(plane);

plane.scale.x = 20;
plane.scale.y = 20;
plane.scale.z = 20;

plane.position.y = -0.05;

plane.rotation.x = -1.5707;

cube1.position.x = 0.5;
cube1.position.y = 0.5;
cube1.position.z = 0.5;

cube2.position.x = 1.7;
cube2.position.y = 1.0;
cube2.position.z = 0.5;

cube2.scale.y = 2;

cube3.position.x = 2.9;
cube3.position.y = 2;
cube3.position.z = 0.5;

cube3.scale.y = 4;

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
