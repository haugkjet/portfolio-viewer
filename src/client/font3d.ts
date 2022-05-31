import * as THREE from "three";

import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";

function initfont3d(scene: THREE.Scene) {
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

  return true;
}

export { initfont3d };
