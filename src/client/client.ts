import * as THREE from "three";

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { EXRLoader } from "three/examples/jsm/loaders/EXRLoader.js";

import { initlight } from "./lights";
import { initfont3d } from "./font3d";
//import { initbillboardtext } from "./billboardtext";
//import { initgui2d } from "./gui2d";
import { initfloor } from "./floor";
//import { initbarchart } from "./barchart";

import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";

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
scene.background = new THREE.Color(0xd9d9d9);

//Dark theme
//scene.background = new THREE.Color(0x222222);

/* Camera */
const camera = new THREE.PerspectiveCamera(
  50,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

camera.position.z = 11;
camera.position.y = 6;
camera.position.x = 14;

//camera.lookAt(5, 5, 5);

// Load hdr
new EXRLoader().load(
  "textures/belfast_farmhouse_1k.exr",
  function (texture: any, textureData: any) {
    texture.mapping = THREE.EquirectangularReflectionMapping;
    //scene.background = texture; // Use hdr as background
    scene.environment = texture; // This do the lighting
    render();
  }
);

/* Renderer */
const canvas = document.querySelector("#c") as HTMLCanvasElement;
const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;

renderer.outputEncoding = THREE.sRGBEncoding;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.5;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
//renderer.shadowMap.type = THREE.VSMShadowMap;

document.body.appendChild(renderer.domElement);

/* Orbitcontrols */
new OrbitControls(camera, renderer.domElement);

/*const loader = new GLTFLoader();
loader.load(
  "models/test2.glb",
  function (gltf) {*/
/* gltf.scene.traverse(function (child) {
      if ((child as THREE.Mesh).isMesh) {
        const m = child as THREE.Mesh;
        m.receiveShadow = true;
        m.castShadow = true;
      }
      if ((child as THREE.Light).isLight) {
        const l = child as THREE.Light;
        l.castShadow = true;
        l.shadow.bias = -0.003;
        l.shadow.mapSize.width = 2048;
        l.shadow.mapSize.height = 2048;
      }
    });*/
/*    scene.add(gltf.scene);
    gltf.scene.position.z = -1.5;
    gltf.scene.position.x = -1.5;
  },
  (xhr) => {
    console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
  },
  (error) => {
    console.log(error);
  }
);*/

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
  const material = new THREE.MeshStandardMaterial({ color });

  const cube = new THREE.Mesh(geometry, material);
  scene.add(cube);

  cube.position.x = x + 10;

  const elem = document.createElement("div");
  elem.textContent = name;
  if (labelContainerElem) labelContainerElem.appendChild(elem);

  return { cube, elem };
}

let shape = new THREE.Shape();
let angleStep = Math.PI * 0.5;
let radius = 0.025;

shape.absarc(0.5, 0.5, radius, angleStep * 0, angleStep * 1, false);
shape.absarc(-0.5, 0.5, radius, angleStep * 1, angleStep * 2, false);
shape.absarc(-0.5, -0.5, radius, angleStep * 2, angleStep * 3, false);
shape.absarc(0.5, -0.5, radius, angleStep * 3, angleStep * 4, false);

const loader = new THREE.CubeTextureLoader();
loader.setPath("https://threejs.org/examples/textures/cube/pisa/");

const textureCube = loader.load([
  "px.png",
  "nx.png",
  "py.png",
  "ny.png",
  "pz.png",
  "nz.png",
]);

let g = new THREE.ExtrudeGeometry(shape, {
  depth: 1,
  bevelEnabled: true,
  bevelThickness: 0.05,
  bevelSize: 0.05,
  bevelSegments: 20,
  curveSegments: 20,
});
g.center();
g.rotateX(Math.PI * -0.5);

let m = new THREE.MeshStandardMaterial({
  color: 0xd9d9d9, //
  envMap: textureCube,
  metalness: 0.9,
  roughness: 0.1,
  transparent: true,
  opacity: 0.4, // Set opacity value (0.0 to 1.0)
  side: THREE.DoubleSide,
});
let o = new THREE.Mesh(g, m);
o.castShadow = true;
o.receiveShadow = true;
scene.add(o);

let g11 = new THREE.ExtrudeGeometry(shape, {
  depth: 0.2,
  bevelEnabled: false,
  bevelThickness: 0.05,
  bevelSize: 0.05,
  bevelSegments: 20,
  curveSegments: 20,
});

g11.rotateX(Math.PI * -0.5);

let m11 = new THREE.MeshStandardMaterial({
  color: "green", //
  envMap: textureCube,
  metalness: 0,
  roughness: 0.1,
  transparent: false,
  opacity: 0.4, // Set opacity value (0.0 to 1.0)
});
let o11 = new THREE.Mesh(g11, m11);
scene.add(o11);

o11.scale.x = 0.1;
o11.scale.z = 0.1;

o11.position.y = -0.5;
o11.position.x = -0.4;

let g12 = new THREE.ExtrudeGeometry(shape, {
  depth: 0.7,
  bevelEnabled: false,
  bevelThickness: 0.05,
  bevelSize: 0.05,
  bevelSegments: 20,
  curveSegments: 20,
});

g12.rotateX(Math.PI * -0.5);

let m12 = new THREE.MeshStandardMaterial({
  color: "blue", //
  envMap: textureCube,
  metalness: 0,
  roughness: 0.1,
  transparent: false,
  opacity: 0.4, // Set opacity value (0.0 to 1.0)
});
let o12 = new THREE.Mesh(g12, m12);
scene.add(o12);

o12.scale.x = 0.1;
o12.scale.z = 0.1;

o12.position.y = -0.5;
o12.position.x = -0.2;

let g2 = new THREE.ExtrudeGeometry(shape, {
  depth: 2,
  bevelEnabled: true,
  bevelThickness: 0.05,
  bevelSize: 0.05,
  bevelSegments: 20,
  curveSegments: 20,
});
g2.center();
g2.rotateX(Math.PI * -0.5);

let m2 = new THREE.MeshStandardMaterial({
  color: 0x50e0ff,
  envMap: textureCube,
  metalness: 0.9,
  roughness: 0.1,
  transparent: true,
  opacity: 0.4, // Set opacity value (0.0 to 1.0)
});
let o2 = new THREE.Mesh(g2, m2);
scene.add(o2);
o2.castShadow = true;
o2.receiveShadow = true;
o2.position.x = 1.5;
o2.position.y = 0.5;

let m3 = new THREE.MeshStandardMaterial({
  color: 0x0096ff,
  envMap: textureCube,
  metalness: 0.9,
  roughness: 0.1,
  transparent: true,
  opacity: 0.4, // Set opacity value (0.0 to 1.0)
});

let g3 = new THREE.ExtrudeGeometry(shape, {
  depth: 3,
  bevelEnabled: true,
  bevelThickness: 0.05,
  bevelSize: 0.05,
  bevelSegments: 20,
  curveSegments: 20,
});
g3.center();
g3.rotateX(Math.PI * -0.5);
let o3 = new THREE.Mesh(g3, m3);
scene.add(o3);
o3.castShadow = true;
o3.receiveShadow = true;
o3.position.x = 3;
o3.position.y = 1;

let m4 = new THREE.MeshStandardMaterial({
  color: "green",
  envMap: textureCube,
  metalness: 0.9,
  roughness: 0.1,
  transparent: true,
  opacity: 0.4, // Set opacity value (0.0 to 1.0)
});
let g4 = new THREE.ExtrudeGeometry(shape, {
  depth: 4,
  bevelEnabled: true,
  bevelThickness: 0.05,
  bevelSize: 0.05,
  bevelSegments: 20,
  curveSegments: 20,
});
g4.center();
g4.rotateX(Math.PI * -0.5);
let o4 = new THREE.Mesh(g4, m4);
o4.castShadow = true;
o4.receiveShadow = true;
scene.add(o4);
o4.position.x = 4.5;
o4.position.y = 1.5;

let m5 = new THREE.MeshStandardMaterial({
  color: 0xffcd01,
  envMap: textureCube,
  metalness: 0.9,
  roughness: 0.1,
  transparent: true,
  opacity: 0.4, // Set opacity value (0.0 to 1.0)
});
let g5 = new THREE.ExtrudeGeometry(shape, {
  depth: 5,
  bevelEnabled: true,
  bevelThickness: 0.05,
  bevelSize: 0.05,
  bevelSegments: 20,
  curveSegments: 20,
});
g5.center();
g5.rotateX(Math.PI * -0.5);
let o5 = new THREE.Mesh(g5, m5);
scene.add(o5);
o5.castShadow = true;
o5.receiveShadow = true;
o5.position.x = 6;
o5.position.y = 2;

let m6 = new THREE.MeshStandardMaterial({
  color: 0xf28c28,
  envMap: textureCube,
  metalness: 0.9,
  roughness: 0.1,
  transparent: true,
  opacity: 0.4, // Set opacity value (0.0 to 1.0)
});
let g6 = new THREE.ExtrudeGeometry(shape, {
  depth: 4,
  bevelEnabled: true,
  bevelThickness: 0.05,
  bevelSize: 0.05,
  bevelSegments: 20,
  curveSegments: 20,
});
g6.center();
g6.rotateX(Math.PI * -0.5);
let o6 = new THREE.Mesh(g6, m6);
scene.add(o6);
o6.castShadow = true;
o6.receiveShadow = true;
o6.position.x = 7.5;
o6.position.y = 1.5;

let m7 = new THREE.MeshStandardMaterial({
  color: "red",
  envMap: textureCube,
  metalness: 0.9,
  roughness: 0.1,
  transparent: true,
  opacity: 0.4, // Set opacity value (0.0 to 1.0)
});
let g7 = new THREE.ExtrudeGeometry(shape, {
  depth: 4,
  bevelEnabled: true,
  bevelThickness: 0.05,
  bevelSize: 0.05,
  bevelSegments: 20,
  curveSegments: 20,
});
g7.center();
g7.rotateX(Math.PI * -0.5);
let o7 = new THREE.Mesh(g7, m7);
scene.add(o7);
o7.castShadow = true;
o7.receiveShadow = true;
o7.position.x = 9;
o7.position.y = 1.5;

/*let m8 = new THREE.MeshStandardMaterial({
  color: "red",
  envMap: textureCube,
  metalness: 0,
  roughness: 0.1,
});
let g8 = new THREE.ExtrudeGeometry(shape, {
  depth: 4,
  bevelEnabled: true,
  bevelThickness: 0.05,
  bevelSize: 0.05,
  bevelSegments: 20,
  curveSegments: 20,
});
g8.center();
g8.rotateX(Math.PI * -0.5);
let o8 = new THREE.Mesh(g8, m8);
scene.add(o8);
o8.castShadow = true;
o8.receiveShadow = true;
o8.position.x = 5;
o8.position.y = 1.5;
o8.position.z = -5;*/

/*const cubes = [
  makeInstance(geometry, 0x44aa88, 0, "Aqua"),
  makeInstance(geometry, 0x8844aa, -2, "Purple"),
  makeInstance(geometry, 0xaa8844, 2, "Gold"),
];*/

//create a blue LineBasicMaterial
//const material = new THREE.LineBasicMaterial({ color: 0x0000ff });

// Create a cylinder geometry to represent the thick line
const cylinderGeometry = new THREE.CylinderBufferGeometry(0.1, 0.1, 10, 8);
const cylinderMaterial = new THREE.MeshStandardMaterial({
  color: "black",
  envMap: textureCube,
  metalness: 0.95,
  roughness: 0.1,
  transparent: true,
  opacity: 0.4, // Set opacity value (0.0 to 1.0)
});
const cylinderMesh = new THREE.Mesh(cylinderGeometry, cylinderMaterial);

// Add the cylinder to the scene
scene.add(cylinderMesh);

cylinderMesh.position.x = 1;
cylinderMesh.position.y = 3;

cylinderMesh.rotateZ(-0.98);

// Create a cylinder geometry to represent the thick line
const cylinderGeometry2 = new THREE.CylinderBufferGeometry(0.1, 0.1, 7, 8);
const cylinderMaterial2 = new THREE.MeshStandardMaterial({
  color: "red",
  envMap: textureCube,
  metalness: 0,
  roughness: 0.1,
  transparent: true,
  opacity: 0.3, // Set opacity value (0.0 to 1.0)
});
const cylinderMesh2 = new THREE.Mesh(cylinderGeometry2, cylinderMaterial2);

// Add the cylinder to the scene
scene.add(cylinderMesh2);

cylinderMesh2.position.x = 8.3;
cylinderMesh2.position.y = 4.6;

cylinderMesh2.rotateZ(1.2);

// Define control points for the cubic Bezier curve
const controlPoint1 = new THREE.Vector3(0, 0, 0);
const controlPoint2 = new THREE.Vector3(5, 5, 0);
const controlPoint3 = new THREE.Vector3(4, 8, 0);
const controlPoint4 = new THREE.Vector3(8, 5, 0);

// Create a CubicBezierCurve3
const curve = new THREE.CubicBezierCurve3(
  controlPoint1,
  controlPoint2,
  controlPoint3,
  controlPoint4
);

// Get points along the curve
const points = curve.getPoints(200);

// Create cylinders along the smoothed curve
const cylinderRadius = 0.05;
const cylinderHeight = 0.1;

points.forEach((point) => {
  // Create a cylinder geometry
  const cylinderGeometry = new THREE.CylinderGeometry(
    cylinderRadius,
    cylinderRadius,
    cylinderHeight,
    8
  );

  // Create a material
  const cylinderMaterial = new THREE.MeshStandardMaterial({
    color: "red",
    envMap: textureCube,
    metalness: 0,
    roughness: 0.1,
    transparent: false,
    opacity: 0.3, // Set opacity value (0.0 to 1.0)
  });

  // Create a cylinder mesh
  const cylinderMesh = new THREE.Mesh(cylinderGeometry, cylinderMaterial);

  // Set the position of the cylinder
  cylinderMesh.position.copy(point);

  // Orient the cylinder along the tangent of the curve at the current point
  const tangent = curve.getTangentAt(points.indexOf(point) / 200).normalize();
  cylinderMesh.quaternion.setFromUnitVectors(
    new THREE.Vector3(0, 1, 0),
    tangent
  );

  // Add the cylinder to the scene
  scene.add(cylinderMesh);
});

// Create text geometry

//CI = P*(1 + R/n) (nt) – P
const principal = 2; //staring capital
const time = 12; // years
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
//let chart = initbarchart(scene, amountarray, -2);

//console.log(compoundInterest(principal, time, rate, n));

const stats = Stats();
document.body.appendChild(stats.dom);

//const data = [8, 9, 5, 3, 6, 6.0, 6.1, 5, 4, 2];
//let chart = initbarchart(scene, data, -8);

//const data2 = [1.6, 2, 4, -3.0, -4.1, 5, 4, 2];
//let chart2 = initbarchart(scene, data2, 0);

//const data21 = [1.6, 2, 4, 3.0, -4.1, 5, 4, 2];
//let chart21 = initbarchart(scene, data21, -6);

//const data22 = [1.6, 2, 4, -3.0, 4.1, 5, 4, 2];
//let chart22 = initbarchart(scene, data22, -4);

//const data23 = [1.6, 2, 4, 3.0, -4.1, 5, 4, 2];
//let chart23 = initbarchart(scene, data23, 0 - 2);

//const data3 = [0.24, 0.31, 0.09, 0.13, -3.2, 2.1];
//let chart3 = initbarchart(scene, data3, 7);

function animate() {
  requestAnimationFrame(animate);

  stats.update();
  render();
}

const tempV = new THREE.Vector3();
let time2 = 1;

function render() {
  // get the position of the center of the cube
  /*cubes.forEach((cubeInfo, ndx) => {
    time2 += 0.0005;
    const { cube, elem } = cubeInfo;
    const speed = 1 + ndx * 0.1;
    const rot = time2 * speed;
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
  });*/

  renderer.render(scene, camera);
}

animate();
