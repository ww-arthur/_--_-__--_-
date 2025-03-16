<script lang="ts" setup>
import type * as THREE from 'three'
import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader.js'


const svgFile = ref<File | null>(null);
const svgShapes = ref<SVGObject["shape"] | null>(null);
const svgObjects = ref<SVGObject[] | null>(null);

function populateSvgObjects(svgShapes: SVGObject["shape"] | null) {
  if (!svgShapes) return;
  svgObjects.value = svgShapes.map((shape) => ({
    shape,
    extrudeOptions: { depth: 4, bevelEnabled: false, bevelThickness: 2, bevelSize: 2, bevelSegments: 5 },
    material: { color: "#0f0f12" },
  }));
}

async function onFileChange() {
  svgShapes.value = (await svgToShapes(svgFile.value)) ?? null;
  populateSvgObjects(svgShapes.value);
}
function updateSvgObjects() {
  const svgObjectsCopy = svgObjects.value;
  svgObjects.value = [];
  setTimeout(() => {
    svgObjects.value = svgObjectsCopy;
  }, 0);
}
async function svgToShapes(svgFile: File | null) {
  if (!svgFile) return;
  const url = URL.createObjectURL(svgFile);
  const loader = new SVGLoader();
  return new Promise<THREE.Shape[]>((resolve, reject) => {
    loader.load(
      // resource URL
      url,
      // called when the resource is loaded
      (data) => {
        const paths = data.paths;
        const pathShapes = [];
        for (let i = 0; i < paths.length; i++) {
          const path = paths[i];
          const shapes = SVGLoader.createShapes(path);
          pathShapes.push(...shapes);

          /*   for (let j = 0; j < shapes.length; j++) {
          const shape = shapes[j]
          const geometry = new THREE.ShapeGeometry(shape)
          const mesh = new THREE.Mesh(geometry, material)
          group.add(mesh)
        } */
        }
        console.log(data);

        resolve(pathShapes);
      },
      // called when loading is in progresses
      (xhr) => {
        console.log(`${(xhr.loaded / xhr.total) * 100}% loaded`);
      },
      // called when loading has errors
      (error) => {
        console.log(error);
        reject(error);
      }
    );
  });
}
</script>

<template>
  <opti-3d-canvas :svg-objects="svgObjects" />
  <v-navigation-drawer location="right" permanent width="400">
    <v-file-input v-model="svgFile" label="Upload SVG" accept=".svg" @change="onFileChange" />
    <v-divider />
    <v-list>
      <v-list-item v-for="(svgObject, i) in svgObjects" :key="i">
        <v-list-item-content>
          <v-list-item-title>{{ svgObject.shape.uuid }}</v-list-item-title>
        </v-list-item-content>
        <v-list-item-action class="d-flex flex-column align-stretch">
          <v-slider v-model="svgObject.extrudeOptions.depth" label="Height" min="0" max="10" step="0.1" @pointerup="updateSvgObjects" />
          <f-form-input v-model="svgObject.extrudeOptions.depth" label="Height"/>
        </v-list-item-action>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>
