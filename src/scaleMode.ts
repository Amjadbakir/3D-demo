import * as THREE from 'three';
import { selectedMesh } from './selection';

let isScalingMode = false;
let originalPositions: THREE.Vector3[] | null = null;
let initialMouseX = 0;

function handleKeydown(e: KeyboardEvent) {
	if (e.key === 's' && selectedMesh && !isScalingMode) {
		isScalingMode = true;

		const posAttr = selectedMesh.geometry.getAttribute('position');
		originalPositions = [];
		for ( let i = 0; i < posAttr.count; i ++ ) {
			originalPositions.push(new THREE.Vector3().fromBufferAttribute( posAttr, i ));
		}
	}

	if (e.key === 'Enter' && isScalingMode) {
		isScalingMode = false;
		originalPositions = null;
	}

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

		const delta = (e.clientX - initialMouseX) * 0.01;
		const scaleFactor = 1 + delta;
		const posAttr = selectedMesh.geometry.getAttribute('position');

		for (let i = 0; i < posAttr.count; i++) {
			const originalX = originalPositions[i].x;
			posAttr.setX(i, originalX * scaleFactor);
		}

		posAttr.needsUpdate = true;
		selectedMesh.geometry.computeVertexNormals();
		selectedMesh.geometry.computeBoundingBox();
		selectedMesh.geometry.computeBoundingSphere();
	}
}


export function setupInputHandlers() {
	window.addEventListener('keydown', handleKeydown);
	window.addEventListener('mousemove', handleMouseMove);
}