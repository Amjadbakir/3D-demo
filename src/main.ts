import './style.css'
import * as THREE from 'three'
import {setupScene} from './scene';

const {scene, camera, renderer} = setupScene();

function animate(){
  requestAnimationFrame(animate);

  renderer.render(scene,camera);
}

animate();