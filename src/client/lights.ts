import * as THREE from "three";

function initlight(scene: THREE.Scene) {
  console.log("Calling lights");
  const light = new THREE.PointLight(0xffffff, 1, 100);
  light.position.set(12, 12, 7);
  light.castShadow = true; // default false
  scene.add(light);

  const light2 = new THREE.PointLight(0xffffff, 1, 100);
  light2.position.set(-2, 5, 2);
  light2.castShadow = false; // default false
  scene.add(light2);

  return true;
}

export { initlight };
