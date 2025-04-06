import './style.css'
import { setupScene } from './scene';
import { setupModelSelection } from './selection';
import { setupInputHandlers } from './scaleMode';

//Setup the scene and get the references to important scene variables
const { scene, camera, renderer } = setupScene();

//Handles selection and discrete-extension 
setupModelSelection(scene, camera, renderer.domElement);

//scale-mode listeners and logic
setupInputHandlers();

//Adjust size when window size changes
window.addEventListener('resize', () => {
  const width = window.innerWidth;
  const height = window.innerHeight;

  camera.aspect = width / height;
  camera.updateProjectionMatrix();

  renderer.setSize(width, height);
});

function animate() {
  requestAnimationFrame(animate);

  renderer.render(scene, camera);
}

animate();