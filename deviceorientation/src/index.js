let scene, camera, renderer, element,  effect, controls, light, geometry, material, object

function init() {
  // SCENE
  scene = new THREE.Scene()

  // RENDERER
  renderer = new THREE.WebGLRenderer({
    antialias: true
  })

  element = renderer.domElement
  document.body.appendChild(element);

  // CAMERA
  camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.001, 10000)
  camera.position.set(0, 0, 6);

  // LIGHT
  light = new THREE.SpotLight(0xffffff);
  light.position.set(3, 4, 8)
  scene.add(light);
  scene.add(new THREE.AmbientLight(0xaaaaaa, 0.3))

  // GEOMERTRY
  geometry = new THREE.BoxGeometry(1, 1, 1)

  // MATERIAL
  material = new THREE.MeshLambertMaterial({
    color: 0xabcdef
  })

  // MESH
  object = new THREE.Mesh(geometry, material)
  scene.add(object)

  // StereoEffect
  effect = new THREE.StereoEffect(renderer);

  // Our initial control fallback with mouse/touch events in case DeviceOrientation is not enabled
  controls = new THREE.OrbitControls(camera, element);
  controls.enablePan = false;
  controls.enableZoom = false;

  function setOrientationControls(e) {
    if (!e.alpha) {
      return;
    }

    // option is object or camera
    controls = new THREE.DeviceOrientationControls(object, false);
    controls.connect();
    controls.update();
    window.removeEventListener('deviceorientation', setOrientationControls, true);

  }
  window.addEventListener('deviceorientation', setOrientationControls, true);

}

init()
animate()

function animate() {
  requestAnimationFrame(animate);
  // for device orientation
  controls.update();
  // for device landscape
  resize();
  // render mode effect.render and renderer.render
  effect.render(scene, camera)
}

function resize() {
  var width = window.innerWidth
  var height = window.innerHeight

  camera.aspect = width / height;
  camera.updateProjectionMatrix();

  renderer.setSize(width, height);
  effect.setSize(width, height);
}


