import * as THREE from "three";

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";

import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";

//import {
//  CSS2DRenderer,
//  CSS2DObject,
//} from "three/examples/jsm/renderers/CSS2DRenderer";

import Stats from "three/examples/jsm/libs/stats.module";
const scene = new THREE.Scene();

const loader = new FontLoader();

loader.load("helvetiker_regular.typeface.json", function (font) {
  const geometry = new TextGeometry("Portfolio", {
    font: font,
    size: 0.8,
    height: 0.01,
    curveSegments: 12,
    bevelEnabled: false,
  });
  const textMaterial = new THREE.MeshStandardMaterial({ color: 0x000000 });

  var mesh = new THREE.Mesh(geometry, textMaterial);
  mesh.position.set(-2, 0.01, 2.0);
  mesh.rotation.set(-1.57, 0, 0);

  scene.add(mesh);
});

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

let index = 0;
const btns = document.getElementById("btns") as HTMLButtonElement | null;
if (btns)
  btns.childNodes.forEach((btn) => {
    btn.addEventListener("click", function handleClick(event) {
      console.log("button clicked");
    });
    index++;
  });

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
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

const plane = new THREE.Mesh(planegeometry, materialgray);

plane.receiveShadow = true;

scene.add(plane);

plane.scale.x = 20;
plane.scale.y = 20;
plane.scale.z = 20;

plane.position.y = -0.01;

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
