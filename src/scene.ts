import './style.css'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

const scene = new THREE.Scene();
export function setupScene() : {scene : THREE.Scene, camera: THREE.PerspectiveCamera, renderer: THREE.WebGLRenderer} {
    

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

    const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg'),
    })

    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.position.setZ(2);

    const pointLight = new THREE.PointLight(0xffffff,20);
    pointLight.position.set(0,2,0);

    const ambientLight = new THREE.AmbientLight(0xffffff,4);
    scene.add(pointLight, ambientLight);

    const lightHelper = new THREE.PointLightHelper(pointLight);
    scene.add(lightHelper);

    //Load the glb model
    loadModel('table.glb','textures/diffuse.jpg');

    return {scene, camera, renderer};
}

//Loads a GLB model
function loadModel(model: string, texture: string){
    
    const loader = new GLTFLoader();
    loader.load(model, function (gltf) {
        const model = gltf.scene;
        scene.add(model);

        //Texture
        model.traverse((child) => {
        if (child.isMesh) {
            // Load a new texture
            const textureLoader = new THREE.TextureLoader();
            const newTexture = textureLoader.load(texture);

            newTexture.colorSpace = THREE.SRGBColorSpace;
            child.material = new THREE.MeshStandardMaterial({
            map: newTexture,
            });
    
            child.material.needsUpdate = true;
        }
        });
    }, undefined, function (error) {
        console.error(error);
        
    });
}
