<script setup lang="ts">
  import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
  import type * as THREE from 'three'

  const props = withDefaults(defineProps<{
    camera: THREE.PerspectiveCamera | null
    renderer: THREE.WebGLRenderer | null
    scene: THREE.Scene | null
  }>(), {
    camera: null,
    renderer: null,
    scene: null,
  })
  let controls: OrbitControls | null = null
  function setControls() {
    console.log('setControls')
    if (!props.camera || !props.renderer)
      return
    controls = new OrbitControls(props.camera, props.renderer.domElement)
    props.renderer.setAnimationLoop(animate)
  }
  function animate() {
    if (!controls || !props.scene || !props.camera)
      return
    requestAnimationFrame(animate)

    // required if controls.enableDamping or controls.autoRotate are set to true
    controls.update()

    props.renderer?.render(props.scene, props.camera)
  }
  onMounted(() => {
    setControls()
  })
</script>

<style>

</style>
