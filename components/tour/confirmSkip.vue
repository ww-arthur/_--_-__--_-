<script lang="ts" setup>
// type Transforms = Record<keyof typeof globalTransforms, Array<string | number>>

  const props = withDefaults(defineProps<{
    modelValue: boolean
  }>(), {
  })

  const emit = defineEmits<{
    (event: 'skip', value: 'partial' | 'all'): void
    (event: 'update:modelValue', value: boolean): void
  }>()
  const show = computed({
    get() {
      return props.modelValue
    },
    set(value) {
      emit('update:modelValue', value)
    },
  })
</script>

<template>
  <aterra-modal v-model="show" width="500" title="Skip tour">
    <template #title>
      Are you sure you want to skip the tour?
    </template>
    You can skip the tour partially or completely. <br>
    If you skip the tour partially, you will be able to continue the tour in other pages.

    <template #actions>
      <v-row justify="space-between">
        <v-col cols="12" md="6">
          <v-btn prepend-icon="mdi-check" block variant="tonal" @click="emit('skip', 'partial')">
            Skip partially
          </v-btn>
        </v-col>
        <v-col cols="12" md="6">
          <v-btn block prepend-icon="mdi-check-all" variant="elevated" @click="emit('skip', 'all')">
            Skip all
          </v-btn>
        </v-col>
      </v-row>
    </template>
  </aterra-modal>
</template>
