<script setup lang="ts">
  const props = withDefaults(defineProps<{
    svgObject: SVGObject | null
  }>(), {
    svgObject: null,
  })
</script>

<template>
  <TresMesh
    v-if="svgObject"
    cast-shadow
  >
    <TresExtrudeGeometry
      :args="[svgObject.shape, svgObject.extrudeOptions]"
    />
    <TresMeshNormalMaterial />
  <!-- <TresMeshNormalMaterial /> -->
  </TresMesh>
</template>

<style>

</style>
