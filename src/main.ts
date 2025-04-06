import './style.css'
import * as THREE from 'three'

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
canvas: document.querySelector('#bg'),
})

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

const pointLight = new THREE.PointLight(0xffffff,20);
pointLight.position.set(0,2,0);

const ambientLight = new THREE.AmbientLight(0xffffff,4);
scene.add(pointLight, ambientLight);

const lightHelper = new THREE.PointLightHelper(pointLight);
scene.add(lightHelper);

const geometry = new THREE.TorusGeometry(10,3,16,100);
const material = new THREE.MeshBasicMaterial({color: 0xFFFFFF, wireframe: true});
const torus = new THREE.Mesh(geometry,material);

scene.add(torus);

renderer.render(scene,camera);

function animate(){
  requestAnimationFrame(animate);

  renderer.render(scene,camera);
}

animate();


//Load the glb model
//loadModel('table.glb','textures/diffuse.jpg');