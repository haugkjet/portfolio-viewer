import * as THREE from "three";

function initfloor(scene: THREE.Scene) {
  /* Floor */
  const planegeometry = new THREE.PlaneGeometry();

  const materialgray = new THREE.MeshStandardMaterial({
    color: 0xdadada,
    wireframe: false,
    metalness: 0.1,
    roughness: 0.7,
  });

  const plane = new THREE.Mesh(planegeometry, materialgray);

  plane.receiveShadow = true;

  scene.add(plane);

  plane.scale.x = 20;
  plane.scale.y = 20;
  plane.scale.z = 20;

  plane.position.y = -0.01;

  plane.rotation.x = -1.5707;
  //return true;
}

export { initfloor };
