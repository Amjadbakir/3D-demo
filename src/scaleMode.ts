import * as THREE from 'three';
import { selectedMesh } from './selection';

let isScalingMode = false;
let originalPositions: THREE.Vector3[] | null = null;
let initialMouseX = 0;

//Listen for mouse movement and keyboard events
export function setupInputHandlers() {
	window.addEventListener('keydown', handleKeydown);
	window.addEventListener('mousemove', handleMouseMove);
}

function handleKeydown(e: KeyboardEvent) {
	//If we are entering scale mode
	if (e.key === 's' && selectedMesh && !isScalingMode) {
		isScalingMode = true;

		const posAttr = selectedMesh.geometry.getAttribute('position');
		originalPositions = [];
		//Copy original positions of all the vertices
		for ( let i = 0; i < posAttr.count; i ++ ) {
			originalPositions.push(new THREE.Vector3().fromBufferAttribute( posAttr, i ));
		}
	}

	//Exit scaling mode and reset originalPositions (Not the actual vertices of the model)
	if (e.key === 'Enter' && isScalingMode) {
		isScalingMode = false;
		originalPositions = null;
	}

	//Reset the actual vertices of the model if pressed on escape
	if (e.key === 'Escape' && isScalingMode && selectedMesh && originalPositions) {
		const posAttr = selectedMesh.geometry.getAttribute('position');
		for (let i = 0; i < posAttr.count; i++) {
			posAttr.setX(i, originalPositions[i].x);
		}
		posAttr.needsUpdate = true;
		selectedMesh.geometry.computeVertexNormals();
		selectedMesh.geometry.computeBoundingBox();
		selectedMesh.geometry.computeBoundingSphere();
		isScalingMode = false;
		originalPositions = null;
	}
}

function handleMouseMove(e: MouseEvent) {
	if (isScalingMode && selectedMesh && originalPositions) {
		if (initialMouseX === 0) {
			initialMouseX = e.clientX;
			return;
		}

		//Adjust senstivity by multiplying with 0.01
		const delta = (e.clientX - initialMouseX) * 0.01;
		//const scaleFactor = 1 + delta;
		const movementAmount = delta;
		const posAttr = selectedMesh.geometry.getAttribute('position');

		for (let i = 0; i < posAttr.count; i++) {
			const originalX = originalPositions[i].x;
			//The following 5 lines can be replaced by the commented out line directly after
			if (originalX > 0){
				posAttr.setX(i, originalX + movementAmount);
			} else if(originalX < 0){
				posAttr.setX(i, originalX - movementAmount);
			}
			//posAttr.setX(i, originalX + scaleFactor);
		}

		//Recompute normals and boundingbox
		posAttr.needsUpdate = true;
		selectedMesh.geometry.computeVertexNormals();
		selectedMesh.geometry.computeBoundingBox();
		selectedMesh.geometry.computeBoundingSphere();
	}
}


