import * as THREE from "three";

import Stats from "three/examples/jsm/libs/stats.module";

function initstatsandhelpers(scene: THREE.Scene) {
  const size = 15;
  const divisions = 10;

  const gridHelper = new THREE.GridHelper(
    size,
    divisions,
    "#5f5f5f",
    "#5f5f5f"
  );
  gridHelper.position.y = -0.545;
  gridHelper.position.x = 4.0;
  gridHelper.position.z = 0.5;

  scene.add(gridHelper);

  const gridHelper2 = new THREE.GridHelper(
    size,
    divisions,
    "#5f5f5f",
    "#5f5f5f"
  );
  scene.add(gridHelper2);

  gridHelper2.position.z = -0.99;
  gridHelper2.position.y = 0.92;
  gridHelper2.position.x = 4;
  gridHelper2.rotation.x = 1.57;

  const gridHelper3 = new THREE.GridHelper(
    size,
    divisions,
    "#5f5f5f",
    "#5f5f5f"
  );
  //scene.add(gridHelper3);
  gridHelper3.position.x = 10;
  gridHelper3.position.z = -0.99;
  gridHelper3.rotation.z = 1.57;

  //scene.add(new THREE.AxesHelper(10));
}

export { initstatsandhelpers };
