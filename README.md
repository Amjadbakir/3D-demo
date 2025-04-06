# 3D Web Demo using Three.js

This demo loads a `.glb` model into a 3D scene using Three.js. It allows the user to **select a model** and then **extend it along the X-axis** by moving the model's vertices.

### Core Features

- Load `.glb` models into the scene
- Add texture to the model
- Select individual objects in the scene via mouse click
- Extend a selected model in the X-direction by repositioning its vertices (not scaling)

### Interaction Modes
- **Left-click on a model** to select it
- **Left-click again** on a model when selected to extend it instantly (discrete step)
- **OR - Press `S` after selecting a model** to enter scale mode, then:
  - Move the mouse left/right to animate the vertex extension in real time
  - Press `Enter` to confirm the transformation or `Escape` to undo and exit the scale-mode

### Optional Features Added

1. **Selection Highlight**  
   When a model is selected, it is visually highlighted with an emissive color overlay.

2. **Blender-style Scale Mode**  
   Inspired by Blender's interaction model, pressing `S` after selection enters an interactive scaling mode where the user can move the mouse to smoothly extend the model in the X-direction.
