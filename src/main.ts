import "./style.css";

import * as THREE from "three/build/three.module";

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  20,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

setCamEagleView(11);
function setCamEagleView(x:number) {
  camera.position.set(-12, x, x * 2);
  camera.setViewOffset( window.innerWidth, window.innerHeight, 0, 0, window.innerWidth, window.innerHeight );
}
function setCamGoalView() {
  camera.position.set(0, 5, 10);
  camera.setViewOffset( window.innerWidth, window.innerHeight, 0, -180, window.innerWidth, window.innerHeight );
}


const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#background"),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);





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
const lineM = new THREE.MeshBasicMaterial({ color: 0xffffff });
const line = new THREE.Mesh(lineG, lineM);
scene.add(line);

//goal
const goalM = new THREE.MeshBasicMaterial({ color: 0x00ffff });
const goal:any [] = Array();
const late = new THREE.Mesh(new THREE.BoxGeometry(3, 0.2, 0.2), goalM);
late.position.y = 1.5;
late.position.z = -0.1;
goal[goal.length + 1] = late;
const s1 = new THREE.Mesh(new THREE.BoxGeometry(0.2, 1.5, 0.2), goalM);
s1.position.y = 0.75;
s1.position.x = 1.4;
s1.position.z = -0.1;
goal[goal.length + 1] = s1;
const s2 = new THREE.Mesh(new THREE.BoxGeometry(0.2, 1.5, 0.2), goalM);
s2.position.y = 0.75;
s2.position.x = -1.4;
s2.position.z = -0.1;
goal[goal.length + 1] = s2;

for (const mesh of goal) {
  scene.add(mesh);
}



//helper
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
const controls = new OrbitControls(camera, renderer.domElement);

//const gridHelper = new THREE.GridHelper(50, 100);
//scene.add(gridHelper);
function animate() {
  requestAnimationFrame(animate);

  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;

  controls.update();
  //console.log(camera);
  

  renderer.render(scene, camera);
}
animate();