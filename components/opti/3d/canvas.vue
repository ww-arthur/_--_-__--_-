<script lang="ts" setup>
  import * as THREE from 'three'
  import { STLExporter } from 'three/addons/exporters/STLExporter.js'
  import { TextGeometry } from 'three/addons/geometries/TextGeometry.js'
  import Stats from 'three/addons/libs/stats.module.js'
  const props = withDefaults(defineProps<{
    modelValue?: any
    svgObjects?: SVGObject[] | null
  }>(), {
  })

  const emit = defineEmits<{
    (event: 'update:modelValue', value: any): void
  }>()
  const container = ref<HTMLElement | null>(null)
  let stats: Stats | null = null
  let camera: THREE.PerspectiveCamera | null = null
  let scene: THREE.Scene | null = null
  let renderer: THREE.WebGLRenderer | null = null



  let mesh: THREE.Mesh | null = null

  const map = new THREE.TextureLoader().load('height-map.jpg')
  /*
  const textDefaults = {
    font: await loadFont(),
    size: 100,
    height: 50,
    curveSegments: 12,
    bevelThickness: 2,
    bevelSize: 1.5,
    bevelEnabled: true,
  } */
  const materials = [
    new THREE.MeshPhongMaterial({ map, bumpMap: map, displacementScale: 1, displacementMap: map }), // front
    new THREE.MeshPhongMaterial({ color: 0xFFFFFF, displacementMap: map }), // side
  ]

  /*   async function loadFont() {
    return new Promise<Font>((resolve) => {
      const loader = new FontLoader()
      loader.load('fonts/Inter24ptSemiBold_Italic.json', (response) => {
        resolve(response)
      })
    })
  } */

  function init() {
    if (!container.value)
      return
    camera = new THREE.PerspectiveCamera(20, window.innerWidth / window.innerHeight, 1, 10000)
    camera.position.z = 1800

    scene = new THREE.Scene()
    scene.background = new THREE.Color(0x550000)

    const light = new THREE.DirectionalLight(0xFFFFFF, 3)
    light.position.set(0, 0, 1)
    scene.add(light)

    // shadow

    const canvas = document.createElement('canvas')
    canvas.width = 128
    canvas.height = 128

    const context = canvas.getContext('2d')
    if (!context)
      return

    const gradient = context.createRadialGradient(canvas.width / 2, canvas.height / 2, 0, canvas.width / 2, canvas.height / 2, canvas.width / 2)
    gradient.addColorStop(0.1, 'rgba(210,210,210,1)')
    gradient.addColorStop(1, 'rgba(255,255,255,1)')

    context.fillStyle = gradient
    context.fillRect(0, 0, canvas.width, canvas.height)

    const shadowTexture = new THREE.CanvasTexture(canvas)

    const shadowMaterial = new THREE.MeshBasicMaterial({ map: shadowTexture, color: 0x550000 })
    const shadowGeo = new THREE.PlaneGeometry(1300, 1300, 1, 1)

    const shadowMesh = new THREE.Mesh(shadowGeo, shadowMaterial)
    shadowMesh.position.y = -250
    shadowMesh.rotation.x = -Math.PI / 2
    scene.add(shadowMesh)

    renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setSize(window.innerWidth, window.innerHeight)
    container.value.appendChild(renderer.domElement)

    stats = new Stats()
    container.value.appendChild(stats.dom)
  }
  function exportSTL() {
    if (!mesh)
      return
    const exporter = new STLExporter()
    const result = exporter.parse(mesh)
    const blob = new Blob([result], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'export.stl'
    a.click()
  }
  function generateGeometry() {
    if (!scene)
      return

    const radius = 15

    const geometry1 = new THREE.IcosahedronGeometry(radius, 0)

    const material = new THREE.MeshPhongMaterial({
      color: 0x002299,
      flatShading: true,
      shininess: 0.5,
      specular: 0x111111,
    })

    const wireframeMaterial = new THREE.MeshBasicMaterial({ color: 0x000000, wireframe: true, transparent: true })

    mesh = new THREE.Mesh(geometry1, material)
    const wireframe = new THREE.Mesh(geometry1, wireframeMaterial)

    mesh.add(wireframe)
    scene.add(mesh)
    scene.background = new THREE.Color(0x550000)
  }
  function generateExtrudeGeometry() {
    if (!scene || !props.svgObjects)
      return
    const m = new THREE.MeshPhongMaterial({ map, bumpScale: 1.3, bumpMap: map, displacementScale: 1, displacementMap: map })
    for (const svgObject of props.svgObjects) {
      const geometry = new THREE.ExtrudeGeometry(svgObject.shape, svgObject.extrudeOptions)
      mesh = new THREE.Mesh(geometry, m)
      scene.add(mesh)
    }
  }
  function createText(text: string) {
    const textGeo = new TextGeometry(text)
    if (!scene || !textGeo?.boundingBox)
      return
    textGeo.computeBoundingBox()

    const centerOffset = -0.5 * (textGeo.boundingBox.max.x - textGeo.boundingBox.min.x)

    const textMesh1 = new THREE.Mesh(textGeo, materials)

    textMesh1.position.x = centerOffset
    textMesh1.position.y = 30
    textMesh1.position.z = 0

    textMesh1.rotation.x = 0
    textMesh1.rotation.y = Math.PI * 2

    scene.add(textMesh1)
  }
  function onWindowResize() {
    if (!camera)
      return
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    if (!renderer)
      return
    renderer.setSize(window.innerWidth, window.innerHeight)
  }

  watch(() => props.svgObjects, () => {
    if (!props.svgObjects)
      return
    generateExtrudeGeometry()
  })
  onMounted(() => {
    init()
  })
</script>

<template>
  <div ref="container">
    <opti-3d-orbit-controls :camera="camera" :renderer="renderer" :scene="scene" />
  </div>
  <v-fab
    absolute icon="mdi-file-download" class="absolute bottom-4 right-4" location="bottom start"
    @click="exportSTL"
  />
</template>
