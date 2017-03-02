let scene, camera, renderer, element,  effect, controls, light, geometry, material, object, manager

function init() {
  // SCENE
  scene = new THREE.Scene()

  // RENDERER
  renderer = new THREE.WebGLRenderer({
    antialias: true
  })

  element = renderer.domElement
  document.body.appendChild(element)

  // CAMERA
  camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.001, 10000)

  // LIGHT
  light = new THREE.SpotLight(0xffffff)
  light.position.set(3, 4, 8)
  scene.add(light)
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

  // VR Controls
  controls = new THREE.VRControls(object)
  controls.standing = true
  camera.position.set(0, controls.userHeight, 6)

  // VR Effect
  effect = new THREE.VREffect(renderer, element)

  // WebVRManager
  manager = new WebVRManager(renderer, effect, {
    hideButton: false
  })

}

init()
animate()

function animate() {
  requestAnimationFrame(animate)

  controls.update()
  resize()
  manager.render(scene, camera)
}


function resize() {
  var width = window.innerWidth
  var height = window.innerHeight

  camera.aspect = width / height
  camera.updateProjectionMatrix()

  effect.setSize(width, height)
}


