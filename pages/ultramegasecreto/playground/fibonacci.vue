<script lang="ts" setup>
  interface SvgLine {
    path: string
    al: number
    ol: number
  }

  definePageMeta({
    layout: 'svg-edit',
  })

  const svg = ref(null)

  const angle = ref(4)
  const side = ref(100)
  const numSquares = ref(100)
  const strokeWidth = ref(1)
  const startingAngle = ref(1)

  const line = computed(() => {
    let a = 0
    let b = 1
    let x = 0
    let y = 0
    let path = `M ${x},${y}`

    const angle = Math.PI / 2.61803398875 // golden angle

    for (let i = 0; i < 100; i++) {
      const newX = x + Math.cos(angle * i) * b
      const newY = y + Math.sin(angle * i) * b
      const rx = b / 2 // half of the segment length
      const ry = rx
      const largeArcFlag = b > a ? 1 : 0
      const sweepFlag = 1
      const xAxisRotation = angle * i * 180 / Math.PI
      const cX = x + Math.cos(angle * i - angle / 2) * (b / 2)
      const cY = y + Math.sin(angle * i - angle / 2) * (b / 2)
      const qCommand = `Q ${cX},${cY} ${newX},${newY}`
      path += qCommand
      a = b
      b = newX
      x = newX
      y = newY
    }
    return { path }
  })
</script>

<template>
  <v-navigation-drawer
    expand-on-hover
    rail
  >
    <v-divider />

    <v-list density="compact" nav color="primary">
      <v-list-item prepend-icon="mdi-flip-horizontal" title="Flip" value="1" />
      <v-list-item prepend-icon="mdi-format-text" title="Text" value="2" />
      <v-list-item prepend-icon="mdi-vector-curve" title="Line/Arc" value="3" />
      <v-list-item prepend-icon="mdi-draw" title="Draw" value="4" />
      <v-list-item prepend-icon="mdi-cloud-outline" title="Rev. Cloud" value="5" />
      <v-list-item prepend-icon="mdi-square-outline" title="Wipeout" value="6" />
      <v-list-item prepend-icon="mdi-cursor-move" title="Move" value="7" />
      <v-list-item prepend-icon="mdi-magnify" title="Zoom" value="8" />
    </v-list>
  </v-navigation-drawer>
  <div style="height: 100%" class="d-flex align-stretch justify-center">
    <svg width="400" height="400" viewBox="0 0 200 200">
      <path d="M 100,50 A 50,50 0 0 1 50,100" stroke="red" fill="none" stroke-width="2" />
      <path d="M 0,50 A 50,50 0 0 1 50,0" stroke="red" fill="none" stroke-width="2" />
    </svg>
    <svg ref="svg" viewBox="0 0 400 400" width="400" height="400">

      <path d="M 0,400 a400,400 0 1,1 200, 200" fill="none" stroke="black" stroke-width="1" />

      <!-- <path transform="scale(30)" :d="line.path" stroke="black" fill="none" :stroke-width="strokeWidth" /> -->
      <!-- <path v-for="(line, i) in lines" :key="`line-${i}`" :d="line.path" stroke="black" :stroke-width="strokeWidth" /> -->
    </svg>
  </div>
  <v-navigation-drawer location="right" permanent width="400">
    <v-tabs grow align-tabs="center">
      <v-tab>Layers</v-tab>
      <v-tab>Components</v-tab>
    </v-tabs>

    <v-slider
      v-model="angle"
      class="mt-2"
      label="Angle"
      min="1"
      max="89"
    >
      <template #append>
        <v-text-field
          v-model="angle"
          class="mt-0 pt-0"
          hide-details
          single-line
          style="width: 100px"
        />
      </template>
    </v-slider>

    <v-slider
      v-model="side"
      class="mt-2"
      label="Side"
      min="0"
      max="300"
    >
      <template #append>
        <v-text-field
          v-model="side"
          class="mt-0 pt-0"
          hide-details
          single-line
          style="width: 100px"
        />
      </template>
    </v-slider>

    <v-slider
      v-model="numSquares"
      class="mt-2"
      label="Iterations"
      min="0"
      max="300"
      step="1"
    >
      <template #append>
        <v-text-field
          v-model="numSquares"
          class="mt-0 pt-0"
          hide-details
          single-line
          style="width: 100px"
        />
      </template>
    </v-slider>
    <v-slider
      v-model="strokeWidth"
      class="mt-2"
      label="Stroke"
      min="0"
      max="5"
      step="0.1"
    >
      <template #append>
        <v-text-field
          v-model="strokeWidth"
          class="mt-0 pt-0"
          hide-details
          single-line
          style="width: 100px"
        />
      </template>
    </v-slider>
    <v-slider
      v-model="startingAngle"
      class="mt-2"
      label="Starting Angle"
      min="0"
      max="89"
      step="1"
    >
      <template #append>
        <v-text-field
          v-model="startingAngle"
          class="mt-0 pt-0"
          hide-details
          single-line
          style="width: 100px"
        />
      </template>
    </v-slider>
  </v-navigation-drawer>
</template>
