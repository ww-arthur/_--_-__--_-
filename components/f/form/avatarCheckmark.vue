<script lang="ts" setup>
// type Transforms = Record<keyof typeof globalTransforms, Array<string | number>>

  const props = withDefaults(defineProps<{
    modelValue?: boolean
    size?: number | string
  }>(), {
    modelValue: false,
    size: 30,
  })

  const emit = defineEmits<{
    (event: 'update:modelValue', value?: boolean): void
  }>()
  const localValue = computed({
    get() {
      return props.modelValue
    },
    set(value) {
      emit('update:modelValue', value)
    },
  })
  function toggleValue() {
    localValue.value = !localValue.value
  }
</script>

<template>
  <v-avatar :size="size" :color=" localValue ? 'green' : 'grey'" :variant="localValue ? 'flat' : 'outlined'" class="transition" @click.stop="toggleValue">
    <v-fab-transition>
      <v-icon v-if="localValue" icon="mdi-check" />
    </v-fab-transition>
  </v-avatar>
</template>
