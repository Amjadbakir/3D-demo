// selectors.ts
import * as THREE from 'three';
export let selectedMesh: THREE.Mesh | null = null;

export function setupModelSelection(
  scene: THREE.Scene,
  camera: THREE.Camera,
  domElement: HTMLElement
) {
  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();

  //Listen for click events
  domElement.addEventListener('click', (event: MouseEvent) => {
    //Convert to NDC
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(scene.children, true);

    //If we are clicking on an object, select it
    if (intersects.length > 0) {
      const selectedObject = intersects[0].object;

      if(selectedMesh){
        extend();
      }

      selectedMesh = selectedObject as THREE.Mesh;
      selectedMesh.material.emissive.set(0x3333ff);
      
    } else { //Otherwise remove selection color
      selectedMesh?.material.emissive.set(0x000000);
      selectedMesh = null;

    }
  });
}

//Extend the selected object one discrete step
function extend(): void {
  const movementAmount = 0.2;
  const geometry = selectedMesh.geometry as THREE.BufferGeometry;
  const posAttr = geometry.getAttribute('position');

  for (let i = 0; i < posAttr.count; i++) {
    const x = posAttr.getX(i);

    //Since the x-values here are in local coordinates, we can see which ones are on the left and which are on the right of the center.
    //Left coordinates are moved to the left and right coordinates to the right.
    //Another way to do it is to multiply by a scaleFactor 
    if (x > 0){
      posAttr.setX(i, x + movementAmount);
    } else if(x < 0){
      posAttr.setX(i, x - movementAmount);
    }
  }

  //Recompute normals and boundingbox
  posAttr.needsUpdate = true;
  geometry.computeVertexNormals();
  geometry.computeBoundingBox();
  geometry.computeBoundingSphere();
}
