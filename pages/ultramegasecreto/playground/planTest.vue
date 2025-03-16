<script lang="ts" setup>
  definePageMeta({
    layout: 'clean',
  })
  const planStore = usePlanStore()
  // planStore.getPlan()
  const plan = ref(planStore.plan)
</script>

<template>
  <div>
    {{ plan }}
  </div>
</template>
