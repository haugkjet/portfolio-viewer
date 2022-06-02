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
const billboard = initbillboardtext(scene);
const gui2d = initgui2d();
const statsandhelpers = initstatsandhelpers(scene);
const floor = initfloor(scene);

scene.background = new THREE.Color(0xdadada);

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
const renderer = new THREE.WebGLRenderer({ antialias: true });
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

const stats = Stats();
document.body.appendChild(stats.dom);

//const data = [8, 9, 5, 3, 6, 6.0, 6.1, 5, 4, 2];
//let chart = initbarchart(scene, data, -8);

const data2 = [1.6, 2, 4, -3.0, -4.1, 5, 4, 2];
let chart2 = initbarchart(scene, data2, 0);

const data3 = [0.24, 0.31, -0.09, 0.13, -3.2, 2.1];
let chart3 = initbarchart(scene, data3, 7);

function animate() {
  requestAnimationFrame(animate);

  stats.update();
  render();
}

function render() {
  renderer.render(scene, camera);
}

animate();
