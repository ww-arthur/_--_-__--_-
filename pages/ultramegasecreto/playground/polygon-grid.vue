<script lang="ts" setup>
  definePageMeta({
    layout: 'clean',
  })

  const gridSize = ref(10)

  const gridSquarePoints = computed(() => {
    const points = []
    for (let i = 0; i < gridSize.value; i++) {
      for (let j = 0; j < gridSize.value; j++) {
        points.push({
          x: i * 1000 / gridSize.value,
          y: j * 1000 / gridSize.value,
        })
      }
    }
    return points
  })
  /* The idea on this is to generate polygons that may hit the edge of the gridSize, but not go outside of it.
  if there are two dots that are on a side of the grid, then when generating a new shape, it can either use the same dots or randomize a new.
  all shapes with 2 dots need to be connected to another shape with 2 dots.
  shapes with 1 dot on a side will need to be directly connected to an empty grid square
  shapes with 0 dots on a side will need to be connected to another shape with 0 dots on a side.
  For the shape creation, we'll have an array of points {id: 'shape-0', points: [{x,y}]}
  */
  const shapes = computed(() => {
    const gridSquareSize = 1000 / gridSize.value
    const shapes = [{ id: 'blank', points: [] }, { id: 'filled', points: [{ x: 0, y: 0 }, { x: 0, y: gridSquareSize }, { x: gridSquareSize, y: gridSquareSize }, { x: gridSquareSize, y: 0 }] }]
    const down = 0
    const right = 1
    const up = 2
    const left = 3
    for (let i = 0; i < 500; i++) {
      // 0: down, 1: right, 2: up, 3: left

      const entryDirection = Math.floor(Math.random() * 4)
      const leaveDirection = Math.floor(Math.random() * 4)

      const entryPoints = [
        {
          x: entryDirection === 1 ? 0 : entryDirection === 3 ? gridSquareSize : Math.random() * gridSquareSize,
          y: entryDirection === 0 ? 0 : entryDirection === 2 ? gridSquareSize : Math.random() * gridSquareSize,
        },
        {
          x: entryDirection === 1 ? 0 : entryDirection === 3 ? gridSquareSize : Math.random() * gridSquareSize,
          y: entryDirection === 0 ? 0 : entryDirection === 2 ? gridSquareSize : Math.random() * gridSquareSize,
        },
      ]
      const leavePoints = [
        {
          x: leaveDirection === 1 ? 0 : leaveDirection === 3 ? gridSquareSize : Math.random() * gridSquareSize,
          y: leaveDirection === 0 ? 0 : leaveDirection === 2 ? gridSquareSize : Math.random() * gridSquareSize,
        },
        {
          x: leaveDirection === 1 ? 0 : leaveDirection === 3 ? gridSquareSize : Math.random() * gridSquareSize,
          y: leaveDirection === 0 ? 0 : leaveDirection === 2 ? gridSquareSize : Math.random() * gridSquareSize,
        },
      ]
      entryPoints.sort((a, b) => {
        if (entryDirection === 0 || entryDirection === 2)
          return a.x - b.x

        return a.y - b.y
      })
      leavePoints.sort((a, b) => {
        if (leaveDirection === 0 || leaveDirection === 2)
          return a.x - b.x

        return a.y - b.y
      })
      if (entryDirection === left && leaveDirection === down) {
        const points = [
          entryPoints[0],
          leavePoints[0],
          entryPoints[1],
          leavePoints[1],
        ]
        shapes.push({ id: `shape-${i}`, points })
      }
      else {
        const points = [
          entryPoints[0],
          leavePoints[0],
          leavePoints[1],
          entryPoints[1],
        ]
        shapes.push({ id: `shape-${i}`, points })
      }
    }
    return shapes
  })
  const generatedPaths = ref<string[]>([])

  function generate() {
    generatedPaths.value = []
    const squareSize = 1000 / gridSize.value
    for (let i = 0; i < gridSize.value; i++) {
      for (let j = 0; j < gridSize.value; j++) {
        const randomShape = shapes.value[Math.floor(Math.random() * shapes.value.length)]
        const shapePosition = {
          x: i * squareSize,
          y: j * squareSize,
        }
        const randomShapePoints = randomShape.points.map((point) => {
          return {
            x: point.x + shapePosition.x,
            y: point.y + shapePosition.y,
          }
        })

        /*  const randomShapeRotatedAndTranslatedPoints = randomShapeRotatedPoints.map((point) => {
          return {
            x: point.x + randomShapePosition.x,
            y: point.y + randomShapePosition.y,
          }
        }) */
        const randomShapeRotatedAndTranslatedPointsString = randomShapePoints.reduce((acc, point, i) => {
          return `${acc} ${i ? 'L' : 'M'} ${point.x},${point.y}`
        }, '')
        generatedPaths.value.push(randomShapeRotatedAndTranslatedPointsString)
      }
    }
  }
</script>

<template>
  <div style="height: 100%" class="d-flex align-stretch justify-start bg-primary px-10">
    <!--  <svg width="400" height="400" viewBox="0 0 200 200">
      <path d="M 100,50 A 50,50 0 0 1 50,100" stroke="red" fill="none" stroke-width="2" />
      <path d="M 0,50 A 50,50 0 0 1 50,0" stroke="red" fill="none" stroke-width="2" />
    </svg> -->
    <svg ref="svg" viewBox="0 0 1000 1000" style="max-height: 100vh;">
      <rect v-for="(point, i) in gridSquarePoints" :key="`point-${i}`" :width="1000 / gridSize" :height="1000 / gridSize" :x="point.x" :y="point.y" fill="none" stroke="black" stroke-width="1" />
      <path v-for="(path, i) in generatedPaths" :key="`path-${i}`" :d="path" fill="black" stroke-width="1" />
      <!-- <path :d="parsedPath" stroke="black" fill="none" :stroke-width="strokeWidth" /> -->
      <!-- <path d="M 0,400 a400,400 0 1,1 200, 200" fill="none" stroke="black" stroke-width="1" /> -->

      <!-- <path transform="scale(30)" :d="line.path" stroke="black" fill="none" :stroke-width="strokeWidth" /> -->
      <!-- <path v-for="(line, i) in lines" :key="`line-${i}`" :d="line.path" stroke="black" :stroke-width="strokeWidth" /> -->
    </svg>
    <v-navigation-drawer floating location="right" permanent width="400">
      <v-slider
        v-model="gridSize"
        class="mt-2"
        label="Iterations"
        min="0"
        max="100"
        step="1"
      >
        <template #append>
          <v-text-field
            v-model="gridSize"
            class="mt-0 pt-0"
            hide-details
            single-line
            style="width: 100px"
          />
        </template>
      </v-slider>
      <!--     <v-slider
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
      </v-slider> -->

      <template #append>
        <v-btn block @click="generate">
          Generate
        </v-btn>
      </template>
    </v-navigation-drawer>
  </div>
</template>
