import * as THREE from "three";

import Stats from "three/examples/jsm/libs/stats.module";

function initstatsandhelpers(scene: THREE.Scene) {
  const size = 20;
  const divisions = 20;

  const gridHelper = new THREE.GridHelper(
    size,
    divisions,
    "#00b3fe",
    "#00b3fe"
  );

  scene.add(gridHelper);

  const gridHelper2 = new THREE.GridHelper(
    size,
    divisions,
    "#fe00fe",
    "#fe00fe"
  );
  scene.add(gridHelper2);

  gridHelper2.position.z = -8.9;
  gridHelper2.rotation.x = 1.57;

  const gridHelper3 = new THREE.GridHelper(
    size,
    divisions,
    "#fe00fe",
    "#fe00fe"
  );
  scene.add(gridHelper3);
  gridHelper3.position.x = -9.9;
  gridHelper3.rotation.z = 1.57;

  scene.add(new THREE.AxesHelper(10));
}

export { initstatsandhelpers };
