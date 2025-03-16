<script lang="ts" setup>
  import simplify from 'simplify-js'

  definePageMeta({
    layout: 'clean',
  })

  const svg = ref(null)

  const numPaths = ref(100)
  const strokeWidth = ref(1)
  const points = ref<ParsedPosition[]>([])

  const parsedPath = computed(() => {
    if (points.value.length < 2)
      return ''
    const simplified = simplify(points.value, 5, true)
    const randomStart = {
      x: Math.random() * 400,
      y: Math.random() * 400,
    }
    return `M ${randomStart.x} ${randomStart.y} ${simplified.map((p, i) => {
      const previousPoint = simplified[i - 1] ?? p
      const midPoint = {
        x: (previousPoint.x + p.x) / 2,
        y: (previousPoint.y + p.y) / 2,
      }
      return `Q ${previousPoint.x} ${previousPoint.y} ${midPoint.x} ${midPoint.y}`
    }).join(' ')}`
  })
  const rawPath = computed(() => {
    return points.value.reduce((acc, point, i) => {
      return `${acc} ${i ? 'L' : 'M'} ${point.x},${point.y}`
    }, '')
  })

  function generateRandomPath() {
    const generatedPoints = []
    points.value = []
    let accumulator = 0
    for (let i = 0; i < numPaths.value + accumulator; i++) {
      const x = Math.random() * 400
      const y = Math.random() * 400
      const lastGeneratedPoint = generatedPoints[generatedPoints.length - 1] ?? { x: 0, y: 0 }
      if (!isLineIntersectingPolygon([{ x, y }, lastGeneratedPoint], generatedPoints))
        generatedPoints.push({ x, y })
      else
        accumulator++
    }
    // generatedPoints.push(generatedPoints[0])
    points.value = generatedPoints
  }
  function isLineIntersectingPolygon(line: ParsedPosition[], polygon: ParsedPosition[]) {
    for (let i = 0; i < polygon.length; i++) {
      const point1 = polygon[i]
      const point2 = polygon[i + 1] ?? polygon[0]
      if (doLinesIntersect(line[0], line[1], point1, point2))
        return true
    }
    return false
  }
  function doLinesIntersect(point1: ParsedPosition, point2: ParsedPosition, point3: ParsedPosition, point4: ParsedPosition) {
    const x1 = point1.x
    const y1 = point1.y
    const x2 = point2.x
    const y2 = point2.y
    const x3 = point3.x
    const y3 = point3.y
    const x4 = point4.x
    const y4 = point4.y

    // Checks if points are vertices of the same line, returns false if true
    if ((x1 === x3 && y1 === y3) || (x1 === x4 && y1 === y4) || (x2 === x3 && y2 === y3) || (x2 === x4 && y2 === y4))
      return false

    // Calculate the direction vectors of the two lines
    const dx1 = x2 - x1
    const dy1 = y2 - y1
    const dx2 = x4 - x3
    const dy2 = y4 - y3

    // Calculate the determinants
    const det = dx1 * dy2 - dx2 * dy1
    if (det === 0)
      return false // Lines are parallel

    // Calculate the parameters for the intersection point
    const t1 = ((x3 - x1) * dy2 - (y3 - y1) * dx2) / det
    const t2 = ((x3 - x1) * dy1 - (y3 - y1) * dx1) / det

    // Check if the intersection point is within both line segments
    return t1 >= 0 && t1 <= 1 && t2 >= 0 && t2 <= 1
  }
 /*  onMounted(() => {
    generateRandomPath()
  }) */
</script>

<template>
  <v-main>
    <div style="height: 100%" class="d-flex align-stretch justify-center pa-10">
      <!--  <svg width="400" height="400" viewBox="0 0 200 200">
      <path d="M 100,50 A 50,50 0 0 1 50,100" stroke="red" fill="none" stroke-width="2" />
      <path d="M 0,50 A 50,50 0 0 1 50,0" stroke="red" fill="none" stroke-width="2" />
    </svg> -->
      <svg ref="svg" viewBox="0 0 400 400" style="width: 50%; aspect-ratio: 1;">
        <path :d="parsedPath" stroke="black" fill="none" :stroke-width="strokeWidth" />
      <!-- <path d="M 0,400 a400,400 0 1,1 200, 200" fill="none" stroke="black" stroke-width="1" /> -->

      <!-- <path transform="scale(30)" :d="line.path" stroke="black" fill="none" :stroke-width="strokeWidth" /> -->
      <!-- <path v-for="(line, i) in lines" :key="`line-${i}`" :d="line.path" stroke="black" :stroke-width="strokeWidth" /> -->
      </svg>
      <svg ref="svg" viewBox="0 0 400 400" style="width: 50%; aspect-ratio: 1;">
        <path :d="rawPath" stroke="black" fill="none" :stroke-width="strokeWidth" />
      <!-- <path d="M 0,400 a400,400 0 1,1 200, 200" fill="none" stroke="black" stroke-width="1" /> -->

      <!-- <path transform="scale(30)" :d="line.path" stroke="black" fill="none" :stroke-width="strokeWidth" /> -->
      <!-- <path v-for="(line, i) in lines" :key="`line-${i}`" :d="line.path" stroke="black" :stroke-width="strokeWidth" /> -->
      </svg>
    </div>
  </v-main>
  <v-navigation-drawer location="right" permanent floating width="400">
    <v-slider
      v-model="numPaths"
      class="mt-2"
      label="Iterations"
      min="0"
      max="300"
      step="1"
    >
      <template #append>
        <v-text-field
          v-model="numPaths"
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

    <template #append>
      <v-btn block @click="generateRandomPath">
        Generate
      </v-btn>
    </template>
  </v-navigation-drawer>
</template>
