interface ExtrudeGeometryOptions {
  curveSegments?: number
  steps?: number
  depth?: number
  bevelEnabled?: boolean
  bevelThickness?: number
  bevelSize?: number
  bevelOffset?: number
  bevelSegments?: number
  extrudePath?: THREE.Curve<THREE.Vector3>
  UVGenerator?: any
}
interface SVGObject {
  shape: THREE.Shape[]
  extrudeOptions: ExtrudeGeometryOptions
  material: THREE.Material
}
