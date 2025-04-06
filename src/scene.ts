import './style.css'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

const scene = new THREE.Scene();

//Setup the scene and return scene, camera and renderer.
export function setupScene(): { scene: THREE.Scene, camera: THREE.PerspectiveCamera, renderer: THREE.WebGLRenderer } {


  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

  //Render on element with id: bg
  const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg') as HTMLCanvasElement,
  })

  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.position.setZ(2);

  const pointLight = new THREE.PointLight(0xffffff, 10);
  pointLight.position.set(1, 2, 2);

  const ambientLight = new THREE.AmbientLight(0xffffff, 1);
  scene.add(pointLight, ambientLight);

  //const lightHelper = new THREE.PointLightHelper(pointLight);
  //scene.add(lightHelper);

  //Load the glb model
  loadModel('table.glb', 'textures/diffuse.jpg');

  return { scene, camera, renderer };
}

//Loads a GLB model
function loadModel(model: string, texture: string) {

  const loader = new GLTFLoader();
  loader.load(model, function (gltf) {
    const model = gltf.scene;
    scene.add(model);

    //Texture
    model.traverse((child) => {
      if(child instanceof THREE.Mesh){
        // Load a new texture
        const textureLoader = new THREE.TextureLoader();
        const newTexture = textureLoader.load(texture);

        newTexture.colorSpace = THREE.SRGBColorSpace;
        child.material = new THREE.MeshStandardMaterial({
          //Map the loaded texture to the object's material
          map: newTexture,
          roughness: 0.5,
          metalness: 0.0,
        });

        child.material.needsUpdate = true;
      }
      
    });
  }, undefined, function (error) {
    console.error(error);

  });
}
