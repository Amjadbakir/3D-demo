import './style.css'
import * as THREE from 'three'
import { setupScene } from './scene';
import { setupModelSelection } from './selection';
import { setupInputHandlers } from './scaleMode';

const { scene, camera, renderer } = setupScene();
setupModelSelection(scene, camera, renderer.domElement);
setupInputHandlers();

function animate() {
  requestAnimationFrame(animate);

  renderer.render(scene, camera);
}

animate();