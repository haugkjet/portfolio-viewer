import * as THREE from "three";

function initfloor(scene: THREE.Scene) {
  /* Floor */
  const planegeometry = new THREE.PlaneGeometry();

  const materialgray = new THREE.MeshStandardMaterial({
    color: 0xf9f9f9, //Light
    //color: 0x111111, //Dark
    wireframe: false,
    metalness: 0.1,
    roughness: 0.7,
  });

  const plane = new THREE.Mesh(planegeometry, materialgray);

  plane.receiveShadow = true;

  scene.add(plane);

  plane.scale.x = 20;
  plane.scale.y = 20;

  plane.position.x = 1;
  plane.position.y = -0.55;

  plane.rotation.x = -1.5707;
  //return true;

  /* Wall behind*/
  const planegeometry2 = new THREE.PlaneGeometry();

  const materialgray2 = new THREE.MeshStandardMaterial({
    color: 0xa9a9a9, //Light
    //color: 0xa111111,
    wireframe: false,
    metalness: 0.1,
    roughness: 0.7,
  });

  const plane2 = new THREE.Mesh(planegeometry, materialgray2);

  plane2.receiveShadow = true;

  //scene.add(plane2);

  plane2.scale.x = 20;
  plane2.scale.y = 20;
  plane2.scale.z = 20;

  plane2.position.x = 10;
  plane2.position.z = -9;

  plane2.rotation.z = -1.5707;

  /* Wall left */
  const planegeometry3 = new THREE.PlaneGeometry();

  const materialgray3 = new THREE.MeshStandardMaterial({
    color: 0xa9a9a9, //Light
    //color: 0xa111111, // Dark
    wireframe: false,
    metalness: 0.1,
    roughness: 0.7,
  });

  const plane3 = new THREE.Mesh(planegeometry3, materialgray3);

  plane3.receiveShadow = true;

  //scene.add(plane3);

  plane3.scale.x = 20;
  plane3.scale.y = 20;
  plane3.scale.z = 20;

  plane3.position.x = 0;
  plane3.position.y = -0.01;
  plane3.position.z = 0;

  plane3.rotation.y = 1.5707;
}

export { initfloor };
