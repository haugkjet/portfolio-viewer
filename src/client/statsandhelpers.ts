import * as THREE from "three";

import Stats from "three/examples/jsm/libs/stats.module";

function initstatsandhelpers(scene: THREE.Scene) {
  const size = 20;
  const divisions = 20;

  const gridHelper = new THREE.GridHelper(size, divisions);
  scene.add(gridHelper);
  scene.add(new THREE.AxesHelper(10));
}

export { initstatsandhelpers };
