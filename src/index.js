// import Scene from "../../src/Scene";
// import RayShaderProgram from "../../src/shaders/RayShaderProgram";
// import { addRayTracingRenderPass } from "../../src/renderers/raytracing";
// import flight from "../../src/controls/flight";

import { Scene } from "PotatoEngine";
import flight from "PotatoEngine/src/controls/flight";
import { addRayTracingRenderPass } from "PotatoEngine/src/renderers";
import { RayShaderProgram } from "PotatoEngine/src/shaders";

const SHADER_PROGRAM_RAY = "ray";

const scene = new Scene("glcanvas");
scene.camera.move(0, -2.5, -5);
scene.rotationX += Math.PI / 6;

scene.createProgram(
  SHADER_PROGRAM_RAY,
  "./PotatoEngine/src/shaders/vertex/ray.vert",
  "./PotatoEngine/src/shaders/fragment/ray.frag",
  RayShaderProgram,
);

/**
 * Attach event listeners to the html elements
 */
function setupInputControls() {}

/**
 * Initalize all the objects in the starting scene
 * - the segments of the arm
 */
function initSceneObjects() {}

flight.setupMouseControls(scene);
const cameraCB = flight.setupKeyboardControls(scene);

function updateScene(dt) {
  cameraCB(dt);
}

scene.setUpdateCB(updateScene);

/**
 * Main init function
 * - load the scene shaders
 * - init all objects
 * - initialize buffers
 * - attach keyboard, mouse, input listeners
 * - start animation loop
 */
async function main() {
  await scene.load();

  addRayTracingRenderPass(scene, SHADER_PROGRAM_RAY);

  initSceneObjects();

  setInterval(() => {
    scene.render();
  }, 30);
}

main();
