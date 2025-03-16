<script lang="ts" setup>
  definePageMeta({
    title: 'SVG',
    description: 'SVG',
    layout: 'clean',
  })
  interface LineElement { startX: number; startY: number; endX: number; endY: number; color: string }
  const colors = [
    '#00FF00',
    '#FFFF00',
    '#FF6600',
    '#FF00FF',
  ]
  const points = [
    // big hexagons
    /*  { x: 799, y: 68.2 },
    { x: 391.6, y: 68.2 },
    { x: 187.9, y: 420.9 },
    { x: 391.6, y: 773.7 },
    { x: 799, y: 773.7 },
    { x: 1002.6, y: 420.9 },

    { x: 948, y: 624.6 },
    { x: 948, y: 217.3 },
    { x: 595.2, y: 13.6 },
    { x: 242.4, y: 217.3 },
    { x: 242.4, y: 624.6 },
    { x: 595.2, y: 828.3 },

    // small hexagons
    { x: 493.4, y: 244.6 },
    { x: 289.8, y: 244.6 },
    { x: 187.9, y: 420.9 },
    { x: 289.8, y: 597.3 },
    { x: 493.4, y: 597.3 },
    { x: 595.3, y: 420.9 },

    { x: 900.8, y: 244.6 },
    { x: 697.1, y: 244.6 },
    { x: 595.3, y: 420.9 },
    { x: 697.1, y: 597.3 },
    { x: 900.8, y: 597.3 },
    { x: 1002.6, y: 420.9 },

    { x: 771.6, y: 319.1 },
    { x: 771.6, y: 115.4 },
    { x: 595.2, y: 13.6 },
    { x: 418.8, y: 115.4 },
    { x: 418.8, y: 319.1 },
    { x: 595.2, y: 420.9 },

    { x: 771.6, y: 726.5 },
    { x: 771.6, y: 522.8 },
    { x: 595.2, y: 420.9 },
    { x: 418.8, y: 522.8 },
    { x: 418.8, y: 726.5 },
    { x: 595.2, y: 828.3 }, */
    {
      x: 926.71,
      y: 211.22,
    },
    {
      x: 508.98,
      y: 211.22,
    },
    {
      x: 508.98,
      y: 350.07,
    },
    {
      x: 547.35,
      y: 350.07,
    },
    {
      x: 547.35,
      y: 321.05,
    },
    {
      x: 892.88,
      y: 321.05,
    },
    {
      x: 892.88,
      y: 441.49,
    },
    {
      x: 926.71,
      y: 441.49,
    },
  ]
  const point2 = {
    x: 858.8033238337198,
    y: 345.473466937117,
  }

  function pointsToLines(points: { x: number; y: number }[]) {
    const lines: LineElement[] = []
    let startX = 0
    let startY = 0
    let endX = 0
    let endY = 0
    let lineColor = ''

    for (let i = 0; i < points.length; i++) {
      startX = points[i].x
      startY = points[i].y
      lineColor = randomColor()
      for (let j = 0; j < points.length; j++) {
        if (i !== j && !lines.find((line) => {
          return (line.startX === points[j].x && line.startY === points[j].y && line.endX === points[i].x && line.endY === points[i].y)
        })) {
          endX = points[j].x
          endY = points[j].y
          lines.push({ startX, startY, endX, endY, color: lineColor })
        }
      }
    }
    return lines
  }
  const lines = ref<Array<{ startX: number; startY: number; endX: number; endY: number; color: string }>>([])
  const allLines = pointsToLines(points)
  function renderLines() {
    lines.value = []
    for (let i = 0; i < allLines.length; i++) {
      setTimeout(() => {
        lines.value.push(allLines?.[i] ?? {})
      }, i * 10)
    }
  }

  function randomColor() {
    return colors[Math.floor(Math.random() * colors.length)]
  }

  onMounted(() => {
    renderLines()
  })
</script>

<template>
  <v-row no-gutters align="center" justify="center" class="svg-wrapper">
    <v-col cols="8">
      <svg
        width="100%" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
        x="0px" y="0px" viewBox="0 0 1190.6 841.9" style="enable-background:new 0 0 1190.6 841.9;" xml:space="preserve"
      >
        <transition-group name="strokeDash">

          <line
            v-for="(line, i) in lines" :key="`line=${i}`" class="st0" :stroke="line.color" :x1="line.startX"
            :y1="line.startY" :x2="line.endX" :y2="line.endY" @mouseenter="lines.splice(i, 1)"
          />
          <circle v-for="point in points" :key="point.x + point.y" fill="red" r="10" :cx="point.x" :cy="point.y" />
          <circle fill="blue" r="10" :cx="point2.x" :cy="point2.y" />
        </transition-group>
        <!-- <circle v-for="(point, i) in points" :key="`point=${i}`" class="st0" :cx="point.x" :cy="point.y" r="10" /> -->
        <!--  <polygon class="st0" points="799,68.2 391.6,68.2 187.9,420.9 391.6,773.7 799,773.7 1002.6,420.9 " />
      <polygon class="st0" points="493.4,244.6 289.8,244.6 187.9,420.9 289.8,597.3 493.4,597.3 595.3,420.9 " />
      <polygon class="st0" points="900.8,244.6 697.1,244.6 595.3,420.9 697.1,597.3 900.8,597.3 1002.6,420.9 " />
      <polygon class="st1" points="948,624.6 948,217.3 595.2,13.6 242.4,217.3 242.4,624.6 595.2,828.3 " />
      <polygon class="st1" points="771.6,319.1 771.6,115.4 595.2,13.6 418.8,115.4 418.8,319.1 595.2,420.9 " />
      <polygon class="st1" points="771.6,726.5 771.6,522.8 595.2,420.9 418.8,522.8 418.8,726.5 595.2,828.3 " /> -->
      </svg>
    </v-col>
  </v-row>
</template>

<style lang="scss" scoped>
.svg-wrapper {
  background-color: black;
}

.st0 {
  fill: #FFFFFF;
  stroke-width: 1;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-miterlimit: 10;
}

.st1 {
  fill: none;
  stroke: #000000;
  stroke-width: 3;
  stroke-miterlimit: 10;
}

.strokeDash-enter-active {
  animation: strokeDash 3s ease-in-out forwards;
}

.strokeDash-leave-active {
  animation: strokeDash 3s ease-in-out reverse forwards;
}

@keyframes strokeDash {
  0% {
    stroke-dasharray: 0 1000;
  }

  100% {
    stroke-dasharray: 1000 0;
  }
}
</style>
