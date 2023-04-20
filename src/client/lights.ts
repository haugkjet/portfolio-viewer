import * as THREE from "three";

function initlight(scene: THREE.Scene) {
  console.log("Calling lights");
  const light = new THREE.PointLight(0xffffff, 0.2, 100);
  light.position.set(-5, 5, 3);
  light.castShadow = true; // default false
  light.shadow.bias = -0.0003;
  light.shadow.mapSize.width = 2048;
  light.shadow.mapSize.height = 2048;
  light.shadow.radius = 5;
  light.shadow.blurSamples = 20;
  scene.add(light);

  const light2 = new THREE.PointLight(0xffffff, 0.1, 100);
  light2.position.set(5, 5, -4);
  light2.castShadow = true; // default false
  light2.shadow.bias = -0.0003;
  light2.shadow.mapSize.width = 2048;
  light2.shadow.mapSize.height = 2048;
  scene.add(light2);

  const light3 = new THREE.PointLight(0xffffff, 0.2, 100);
  light3.position.set(14, 7, 1);
  light3.castShadow = true; // default false
  light3.shadow.bias = -0.00003;
  light3.shadow.mapSize.width = 2048;
  light3.shadow.mapSize.height = 2048;

  scene.add(light3);

  return true;
}

export { initlight };
