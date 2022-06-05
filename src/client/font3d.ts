import * as THREE from "three";

import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";

const lod = new THREE.LOD();

//Create spheres with 3 levels of detail and create new LOD levels for them

function initfont3d(scene: THREE.Scene) {
  const loader = new FontLoader();
  const words = ["aaa", "bbbbbbbbbbbbb", "ccccc", "ddd", "e"];
  for (let i = 0; i < 5; i++) {
    loader.load("helvetiker_regular.typeface.json", function (font) {
      const geometry2 = new TextGeometry(words[i], {
        font: font,
        size: 0.3 * i,
        height: 0.01,
        curveSegments: 12,
        bevelEnabled: false,
      });
      const textMaterial = new THREE.MeshStandardMaterial({
        //color: 0x000000, //Black
        color: 0xffffff,
      }); //Light });

      var mesh = new THREE.Mesh(geometry2, textMaterial);
      mesh.position.set(-2, 1.0, 0.0);
      mesh.rotation.set(-1.57, 0, 0);

      const material = new THREE.MeshPhongMaterial({ color: 0xabcde });

      const geometry = new THREE.BoxGeometry(5 - i, 2, 2);

      // const geometry = new THREE.BoxGeometry(1, 1, 1);

      const cube = new THREE.Mesh(geometry, material);

      cube.position.x = -5;

      cube.add(mesh);

      lod.addLevel(cube, i * 5);

      scene.add(lod);

      //scene.add(mesh);
    });
  }

  return true;
}

export { initfont3d };
