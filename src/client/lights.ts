import * as THREE from "three";

function initlight(scene: THREE.Scene) {
  console.log("Calling lights");
  const light = new THREE.PointLight(0xffffff, 0.4, 100);
  light.position.set(5, 5, 7);
  light.castShadow = true; // default false
  light.shadow.bias = -0.00003;
  light.shadow.mapSize.width = 4096;
  light.shadow.mapSize.height = 4096;
  scene.add(light);

  const light3 = new THREE.PointLight(0xffffff, 0.4, 100);
  light3.position.set(5, 12, -7);
  light3.castShadow = true; // default false
  light3.shadow.bias = -0.00003;
  light3.shadow.mapSize.width = 4096;
  light3.shadow.mapSize.height = 4096;
  scene.add(light3);

  return true;
}

export { initlight };
