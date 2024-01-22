import * as THREE from "three";

import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";

const lod = new THREE.LOD();

//Create spheres with 3 levels of detail and create new LOD levels for them

function initfont3d(scene: THREE.Scene) {
  const loader = new FontLoader();
  const words = [" ", "Welcome\nTo\n3DChart", "Welcome\nTo", "Welcome", "NO"];

  let shape = new THREE.Shape();
  let angleStep = Math.PI * 0.5;
  let radius = 0.025;

  shape.absarc(0.5, 0.5, radius, angleStep * 0, angleStep * 1, false);
  shape.absarc(-0.5, 0.5, radius, angleStep * 1, angleStep * 2, false);
  shape.absarc(-0.5, -0.5, radius, angleStep * 2, angleStep * 3, false);
  shape.absarc(0.5, -0.5, radius, angleStep * 3, angleStep * 4, false);

  for (let i = 0; i < 5; i++) {
    loader.load("helvetiker_regular.typeface.json", function (font) {
      const geometry2 = new TextGeometry(words[i], {
        font: font,
        size: 0.3 * i * 0.5,
        height: 0.01,
        curveSegments: 12,
        bevelEnabled: false,
      });
      const textMaterial = new THREE.MeshStandardMaterial({
        //color: 0x000000, //Black
        color: 0xffffff,
      }); //Light });

      var mesh = new THREE.Mesh(geometry2, textMaterial);
      mesh.position.set(-2 + i * 0.4, 0.52, 0.0);
      mesh.rotation.set(-1.57, 0, 0);

      //const material = new THREE.MeshPhongMaterial({ color: 0xabcde });

      const material = new THREE.MeshStandardMaterial({
        color: "green",
        metalness: 0,
        roughness: 0.1,
      });

      let g = new THREE.ExtrudeGeometry(shape, {
        depth: 5 - i,
        bevelEnabled: false,
        bevelThickness: 0.05,
        bevelSize: 0.05,
        bevelSegments: 20,
        curveSegments: 20,
      });
      g.center();
      g.rotateY(Math.PI * -0.5);

      let m = new THREE.MeshStandardMaterial({
        color: 0xf229f9, //
        metalness: 0,
        roughness: 0.1,
      });
      let o = new THREE.Mesh(g, m);
      o.castShadow = true;
      o.receiveShadow = true;
      //scene.add(o);

      //const geometry = new THREE.BoxGeometry(5 - i, 2, 2);

      // const geometry = new THREE.BoxGeometry(1, 1, 1);

      const cube = new THREE.Mesh(g, material);

      cube.position.z = 3;
      cube.position.x = 3;

      cube.add(mesh);

      lod.addLevel(cube, i * 5);

      scene.add(lod);

      //scene.add(mesh);
    });
  }

  return true;
}

export { initfont3d };
