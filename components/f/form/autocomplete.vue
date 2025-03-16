<script lang="ts" setup generic="T">
// type Transforms = Record<keyof typeof globalTransforms, Array<string | number>>

const props = withDefaults(defineProps<{
  modelValue?: any
  label: string
  items: Array<T>
  required?: boolean
  returnObject?: boolean
  multiple?: boolean
  rounded?: string
  autoSelectFirst?: boolean
}>(), {
  rounded: 'lg',
})

const emit = defineEmits<{
  (event: 'update:modelValue', value?: any): void
}>()
const theme = useThemeOptions()
const rules = computed(() => {
  const rules = [] as Array<(v: string) => boolean | string>
  if (props.required)
    rules.push((v: string) => !!v || 'This field is required')

  return rules
})
const valueLocal = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit('update:modelValue', value)
  },
})
const bgColor = computed(() => {
  return theme.theme.name.value === 'dark' ? 'card' : 'white'
  })
</script>

<template>
  <VAutocomplete v-model="valueLocal" :auto-select-first="autoSelectFirst" :multiple="multiple" :chips="multiple"
    :closable-chips="multiple" :return-object="returnObject" :items="props.items" variant="outlined" :bg-color="bgColor"
    :rules="rules" :rounded="rounded">
    <template #label>
      <span class="font-weight-bold">{{ label }}</span>
      <span v-if="required" class="text-error font-weight-black ml-1">*</span>
    </template>
  </VAutocomplete>
</template>
