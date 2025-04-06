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

  domElement.addEventListener('click', (event: MouseEvent) => {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(scene.children, true);

    if (intersects.length > 0) {
      const selectedObject = intersects[0].object;

      selectedMesh = selectedObject as THREE.Mesh;
      extend();
    } else {
      selectedMesh = null;
    }
  });
}

function extend(): void {
    const targetScale = 1.2;
    const geometry = selectedMesh.geometry as THREE.BufferGeometry;
    const posAttr = geometry.getAttribute('position');
  
    for (let i = 0; i < posAttr.count; i++) {
      const x = posAttr.getX(i);

      posAttr.setX(i, x * targetScale);
    }
  
    posAttr.needsUpdate = true;
    geometry.computeVertexNormals();
    geometry.computeBoundingBox();
    geometry.computeBoundingSphere();
  }
