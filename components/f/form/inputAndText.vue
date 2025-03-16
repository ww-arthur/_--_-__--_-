<script lang="ts" setup generic="T extends any">
  // type Transforms = Record<keyof typeof globalTransforms, Array<string | number>>

  const props = withDefaults(defineProps<{
    modelValue?: any
    label?: string
    prefix?: string
    index?: number
  }>(), {
    label: '',
    index: 0,
  })

  const emit = defineEmits<{
    (event: 'update:modelValue', value?: any): void
  }>()
  const valueLocal = computed({
    get() {
      return props.modelValue
    },
    set(value) {
      emit('update:modelValue', value)
    },
  })
  const isEditing = ref(false)
  watch(isEditing, (value) => {
    if (value)
      window.addEventListener('keydown', isDone)
    else
      window.removeEventListener('keydown', isDone)
  })

  function isDone(e: KeyboardEvent) {
    if (e.key === 'Enter' || e.key === 'Escape')
      isEditing.value = false
  }
  function leaveEdit() {
    nextTick(() => {
      isEditing.value = false
    })
  }
</script>

<template>
  <aterra-input
    v-if="isEditing"
    v-model="valueLocal"
    v-click-outside="{
      handler: leaveEdit,
      closeConditional: () => isEditing,
    }"
    :prefix="prefix"
    density="compact"
    variant="solo"
    focus-on-mount
    :label="label"
    single-line
    :tabindex="index"
  />
  <div

    v-else :tabindex="index" :style="{ padding: '10px 0 10px 0' }"
    :class="{'text-disabled': !valueLocal?.toString()?.length}"
    class="flex-grow-1 text-wrap" @focus="isEditing = true" @click="isEditing = true"
  >
    {{ prefix }} {{ valueLocal }} {{ !(valueLocal?.toString()?.length) ? label : '' }}
  </div>
</template>
