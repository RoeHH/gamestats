import "./style.css";

import * as THREE from "three/build/three.module";

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  20,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(0, 8, 30);
camera.lookAt(0, 0, 0);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#background"),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);



//light
const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(ambientLight);

//avatarTexture
/*
const avatarTexture = new THREE.TextureLoader().load("../img/avatar.jpg");

const roeh = new THREE.Mesh(
  new THREE.BoxGeometry(3, 3, 3),
  new THREE.MeshBasicMaterial({ map: avatarTexture })
);
scene.add(roeh);
*/

//Kreis
const kreisG = new THREE.RingGeometry( 4.9, 5, 30, 30, Math.PI, Math.PI);
const kreisM = new THREE.MeshBasicMaterial({
  color: 0xffffff,
  side: THREE.DoubleSide,
});
const kreis = new THREE.Mesh(kreisG, kreisM);
kreis.rotation.x = 3 * (Math.PI / 2);
scene.add(kreis);

//line
const lineG = new THREE.BoxGeometry(10, 0.08, 0.08);
const lineM = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const line = new THREE.Mesh(lineG, lineM);
scene.add(line);

//goal
const goalG = new THREE.BoxGeometry(4, 2, 1);
const goalM = new THREE.MeshBasicMaterial({ color: 0x00ffff, wireframe: true });
const goal = new THREE.Mesh(goalG, goalM);
goal.position.y = 1;
goal.position.z = -0.5;
scene.add(goal);

//helper
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
const controls = new OrbitControls(camera, renderer.domElement);

const gridHelper = new THREE.GridHelper(200, 100);
scene.add(gridHelper);
function animate() {
  requestAnimationFrame(animate);

  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;

  controls.update();

  renderer.render(scene, camera);
}
animate();