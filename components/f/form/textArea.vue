<script lang="ts" setup>
// type Transforms = Record<keyof typeof globalTransforms, Array<string | number>>

  const props = withDefaults(defineProps<{
    modelValue?: string | number
    label: string
    required?: boolean
    name?: string
  }>(), {
  })

  const emit = defineEmits<{
    (event: 'update:modelValue', value?: string | number): void
  }>()

  const theme = useThemeOptions()

  const valueLocal = computed({
    get() {
      return props.modelValue
    },
    set(value) {
      emit('update:modelValue', value)
    },
  })
  const rules = computed(() => {
    const rules = [] as Array<(v: string) => boolean | string>
    if (props.required)
      rules.push((v: string) => !!v || 'This field is required')

    return rules
  })
  const bgColor = computed(() => {
    return theme.theme.name.value === 'dark' ? 'card' : 'white'
  })
</script>

<template>
  <v-textarea v-model="valueLocal" :bg-color="bgColor" rows="7" :name="name" :rules="rules" variant="outlined">
    <template #label>
      <span class="font-weight-bold">{{ label }}</span>
      <span v-if="required" class="text-error font-weight-black ml-1">*</span>
    </template>
  </v-textarea>
</template>
