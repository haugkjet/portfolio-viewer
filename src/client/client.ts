import * as THREE from "three";

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";

import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";

import { initlight } from "./lights";
import { initfont3d } from "./font3d";
import { initbillboardtext } from "./billboardtext";
import { initgui2d } from "./gui2d";
import { initfloor } from "./floor";

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

/* Styling of bars. TODO: Separate file */
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

const materialyellow = new THREE.MeshStandardMaterial({
  color: 0xffff00,
  wireframe: false,
  metalness: 0.1,
  roughness: 0.3,
});

/* Bar logic. TODO: Separate file */
const cubearray = [];
const xDistance = 1.1;
const zDistance = 1;

const cubegeometry = new RoundedBoxGeometry(1, 1, 1);

const xOffset = 0.25;

const loader = new FontLoader();

for (let i = -8; i < 8; i++) {
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

    loader.load("helvetiker_regular.typeface.json", function (font) {
      const geometry = new TextGeometry("25", {
        font: font,
        size: 0.4,
        height: 0.01,
        curveSegments: 12,
        bevelEnabled: false,
      });
      const textMaterial = new THREE.MeshStandardMaterial({ color: 0x000000 });

      var mesh2 = new THREE.Mesh(geometry, textMaterial);
      mesh2.position.set(-0.3, 0.5, 0.15);
      mesh2.rotation.set(-1.57, 0, 0);

      mesh.add(mesh2);
    });

    scene.add(mesh);
  }
}

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

  stats.update();
  render();
}

function render() {
  renderer.render(scene, camera);
}

animate();
