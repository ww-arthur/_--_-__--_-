<script lang="ts" setup>
const color = ref<string>('#0f0f12')
</script>
<template>
  <div class="h-100vh flex-grow-1 d-flex align-center justify-center" :style="{ backgroundColor: color }">

<v-card class="mx-auto" max-width="500">
  <v-color-picker v-model="color" />
  </v-card>

  </div>
</template>



<style>

</style>
