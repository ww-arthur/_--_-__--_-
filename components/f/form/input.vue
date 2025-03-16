<script lang="ts" setup>
// type Transforms = Record<keyof typeof globalTransforms, Array<string | number>>

const props = withDefaults(defineProps<{
  modelValue?: string | number
  label: string
  required?: boolean
  name?: string
  focusOnMount?: boolean
  rounded?: string
  appendInner?: string
}>(), {
  rounded: 'lg',
})

const emit = defineEmits<{
  (event: 'update:modelValue', value?: string | number): void
}>()
const theme = useThemeOptions()
const textElement = ref<HTMLInputElement | null>(null)
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
    rules.push((v: string) => !!v || `${props.label || 'This'} field is required`)

  return rules
})
const bgColor = computed(() => {
  return theme.theme.name.value === 'dark' ? 'card' : 'white'
})
onMounted(() => {
  if (props.focusOnMount)
    textElement.value?.focus()
})
</script>

<template>
  <v-text-field ref="textElement" v-model="valueLocal" :bg-color="bgColor" hide-details="auto" :name="name"
    :rules="rules" variant="outlined" :rounded="rounded">
    <template #label>
      <span class="font-weight-bold bg-card px-1 rounded">{{ label }}</span>
      <span v-if="required" class="text-error font-weight-black ml-1">*</span>
    </template>
    <template v-if="$slots.append" #append>
      <slot name="append" />
    </template>
    <template v-if="$slots?.['append-inner'] || appendInner" #append-inner>
      <slot name="append-inner">
        {{ appendInner }}

      </slot>
    </template>
  </v-text-field>
</template>
