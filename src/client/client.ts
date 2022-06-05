import * as THREE from "three";

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

import { initlight } from "./lights";
import { initfont3d } from "./font3d";
import { initbillboardtext } from "./billboardtext";
import { initgui2d } from "./gui2d";
import { initfloor } from "./floor";
import { initbarchart } from "./barchart";

import { initstatsandhelpers } from "./statsandhelpers";
import Stats from "three/examples/jsm/libs/stats.module";

const scene = new THREE.Scene();

const lights = initlight(scene);
const font3d = initfont3d(scene);
//const billboard = initbillboardtext(scene);
//const gui2d = initgui2d();
const statsandhelpers = initstatsandhelpers(scene);
const floor = initfloor(scene);

//Light theme
scene.background = new THREE.Color(0xdadada);

//Dark theme
scene.background = new THREE.Color(0x222222);

/* Camera */
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 9;
camera.position.y = 6;
camera.position.x = -3;

/* Renderer */
const canvas = document.querySelector("#c") as HTMLCanvasElement;
const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
document.body.appendChild(renderer.domElement);

/* Orbitcontrols */
new OrbitControls(camera, renderer.domElement);

window.addEventListener("resize", onWindowResize, false);
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  render();
}

const boxWidth = 1;
const boxHeight = 1;
const boxDepth = 1;
const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);

const labelContainerElem = document.querySelector("#labels");

function makeInstance(geometry: any, color: any, x: any, name: any) {
  const material = new THREE.MeshPhongMaterial({ color });

  const cube = new THREE.Mesh(geometry, material);
  scene.add(cube);

  cube.position.x = x + 10;

  const elem = document.createElement("div");
  elem.textContent = name;
  if (labelContainerElem) labelContainerElem.appendChild(elem);

  return { cube, elem };
}

const cubes = [
  makeInstance(geometry, 0x44aa88, 0, "Aqua"),
  makeInstance(geometry, 0x8844aa, -2, "Purple"),
  makeInstance(geometry, 0xaa8844, 2, "Gold"),
];

//CI = P*(1 + R/n) (nt) – P
const principal = 2; //staring capital
const time = 8; // years
const rate = 0.1; // 10 %
const n = 1; // 1 termin / year
const compoundInterest = (
  p: number,
  t: number,
  r: number,
  n: number
): number => {
  const amount = p * Math.pow(1 + r / n, n * t);
  const interest = amount - p;
  //  console.log(`Amount: ${amount} Interest: ${interest}`);

  //return interest;
  return amount;
};

let amountarray: number[] = [0.0];
for (let i = 0; i <= time; i++) {
  let x = compoundInterest(principal, i, rate, n);
  amountarray.push(x);
}

//const data = [8, 9, 5, 3, 6, 6.0, 6.1, 5, 4, 2];
let chart = initbarchart(scene, amountarray, -8);

//console.log(compoundInterest(principal, time, rate, n));

//const stats = Stats();
//document.body.appendChild(stats.dom);

//const data = [8, 9, 5, 3, 6, 6.0, 6.1, 5, 4, 2];
//let chart = initbarchart(scene, data, -8);

const data2 = [1.6, 2, 4, -3.0, -4.1, 5, 4, 2];
let chart2 = initbarchart(scene, data2, 0);

const data21 = [1.6, 2, 4, 3.0, -4.1, 5, 4, 2];
let chart21 = initbarchart(scene, data21, -6);

const data22 = [1.6, 2, 4, -3.0, 4.1, 5, 4, 2];
let chart22 = initbarchart(scene, data22, -4);

const data23 = [1.6, 2, 4, 3.0, -4.1, 5, 4, 2];
let chart23 = initbarchart(scene, data23, 0 - 2);

const data3 = [0.24, 0.31, 0.09, 0.13, -3.2, 2.1];
let chart3 = initbarchart(scene, data3, 7);

function animate() {
  requestAnimationFrame(animate);

  //stats.update();
  render();
}

const tempV = new THREE.Vector3();

function render() {
  // get the position of the center of the cube
  cubes.forEach((cubeInfo, ndx) => {
    const { cube, elem } = cubeInfo;
    const speed = 1 + ndx * 0.1;
    const rot = time * speed;
    cube.rotation.x = rot;
    cube.rotation.y = rot;

    // get the position of the center of the cube
    cube.updateWorldMatrix(true, false);
    cube.getWorldPosition(tempV);

    // get the normalized screen coordinate of that position
    // x and y will be in the -1 to +1 range with x = -1 being
    // on the left and y = -1 being on the bottom
    tempV.project(camera);

    // convert the normalized position to CSS coordinates
    const x = (tempV.x * 0.5 + 0.5) * canvas.clientWidth;
    const y = (tempV.y * -0.5 + 0.5) * canvas.clientHeight;

    // move the elem to that position
    elem.style.transform = `translate(-50%, -50%) translate(${x}px,${y}px)`;
  });

  renderer.render(scene, camera);
}

animate();
