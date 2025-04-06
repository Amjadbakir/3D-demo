import './style.css'
import * as THREE from 'three'
import {setupScene} from './scene';
import { setupModelSelection } from './selection';

const {scene, camera, renderer} = setupScene();
setupModelSelection(scene,camera,renderer.domElement);

function animate(){
  requestAnimationFrame(animate);

  renderer.render(scene,camera);
}

animate();