import * as THREE from "three";

import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";

import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";

function initbarchart(scene: THREE.Scene, mydata: number[], zoffset: number) {
  /* Floor */
  /* Styling of bars. TODO: Separate file */
  const materialgreen = new THREE.MeshStandardMaterial({
    color: 0x00ff00,

    transparent: true,
    opacity: 0.5,

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

  //const cubegeometry = new THREE.BoxGeometry(1, 1, 1);

  const xOffset = 0.25;

  const loader = new FontLoader();

  for (let i = -8; i < mydata.length; i++) {
    //console.log(data[i]);
    for (let j = 0; j < 1; j++) {
      //const mesh = new THREE.Mesh(cubegeometry, materialgreen);
      const mesh = new THREE.Mesh(cubegeometry, materialgreen);
      mesh.castShadow = true; //default is false

      mesh.scale.y = mydata[i];
      //mesh.scale.y = Math.floor(Math.random() * 6.0) + 1.0;
      if (mesh.scale.y >= 4) mesh.material = materialgreen;
      else if (mesh.scale.y < 4 && mesh.scale.y > 2) {
        mesh.material = materialyellow;
      } else mesh.material = materialred;

      mesh.position.x = xDistance * i + xOffset;
      mesh.position.z = zDistance * j + zoffset;
      mesh.position.y = mesh.scale.y / 2;

      /* Text on top of each bar */

      loader.load("helvetiker_regular.typeface.json", function (font) {
        const geometry = new TextGeometry(Number(mydata[i]).toFixed(2) + "", {
          font: font,
          size: 0.2,
          height: 0.01,
          curveSegments: 12,
          bevelEnabled: false,
        });
        const textMaterial = new THREE.MeshStandardMaterial({
          color: 0x000000,
        });

        var mesh2 = new THREE.Mesh(geometry, textMaterial);
        mesh2.position.set(-0.3, 0.5, 0.15);
        mesh2.rotation.set(-1.57, 0, 0);
        mesh2.scale.z = 0.001; // Trick to flatten text. Need to properly solve

        mesh.add(mesh2);
      });

      /* Text on bottom / front of each bar */

      loader.load("helvetiker_regular.typeface.json", function (font) {
        const geometry2 = new TextGeometry("Jan", {
          font: font,
          size: 0.2,
          height: 0.01,
          curveSegments: 12,
          bevelEnabled: false,
        });
        const textMaterial = new THREE.MeshStandardMaterial({
          color: 0x000000,
        });

        var mesh3 = new THREE.Mesh(geometry2, textMaterial);
        mesh3.position.set(0.0, -0.5, 1.1);
        mesh3.rotation.set(-1.57, 0, 1.57);
        mesh3.scale.z = 0.001; // Trick to flatten text. Need to properly solve

        mesh.add(mesh3);
      });

      scene.add(mesh);
    }
  }
  //return true;
}

export { initbarchart };
