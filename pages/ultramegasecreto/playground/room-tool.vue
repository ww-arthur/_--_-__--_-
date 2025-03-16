<script lang="ts" setup>
  const text = ref('')
  function genereteObject() {
    const lines = text.value.replaceAll('\n', '').split('|')
    const object: ObjectModel = {}
    lines.forEach((line) => {
      const [key, value] = line.split('=')
      if (key && value)
        object[value] = key
    })
  }
</script>

<template>
  <v-container class="d-flex flex-column ">
    <oz-text-area
      v-model="text"
      label="Text"
      placeholder="Enter text here"
      rows="5"
    />
    <v-btn color="purple" size="x-large" rounded="xl" @click="genereteObject">
      Generate Object
    </v-btn>
  </v-container>
</template>

<style>

</style>
