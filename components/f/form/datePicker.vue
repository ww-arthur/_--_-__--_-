<script lang="ts" setup>
  // import { DateTime } from 'luxon'
  // const currentDate = DateTime.local().toLocaleString({ month: '2-digit', day: '2-digit', year: 'numeric' })

  const componentProps = withDefaults(defineProps<{
    label: string
    pickerValue?: number
  }>(), {
    label: '',

  })
  const emit = defineEmits<{
    (event: 'update:modelValue', value?: string): void
    (event: 'update:pickerValue', value?: number): void
  }>()

  const theme = useThemeOptions()
  const textElement = ref<HTMLInputElement | null>(null)
  const pickerValueLocal = computed<Date | undefined>({
    get: () => {
      if (!componentProps.pickerValue)
        return undefined
      const date = new Date(componentProps.pickerValue)
      return date
    },
    set: (value: Date | undefined) => emit('update:pickerValue', value?.getTime()),
  })
  const bgColor = computed(() => {
    return theme.theme.name.value === 'dark' ? 'card' : 'white'
  })
  /*   const shownValue = computed({
    get: () => pickerValueLocal.value ? new Date(pickerValueLocal.value)?.toLocaleDateString?.() : '',
    set: (value: string) => {
      if (!value)
        pickerValueLocal.value = undefined
      const valueParts = value.split('/')
      if (valueParts.length !== 3)
        return

      if (valueParts[0].length < 1 || valueParts[1].length < 1 || valueParts[2].length !== 4)
        return

      const date = new Date(value)
      if (!isNaN(date.getTime()))
        pickerValueLocal.value = date.getTime()
    },
  }) */
  onMounted(() => {
    console.log(pickerValueLocal.value)
  })
</script>

<template>
  <v-date-input
    v-model="pickerValueLocal"
    hide-details="auto"
    variant="outlined"
    :bg-color="bgColor"
    rounded="lg"
    :label="label" color="primary"
  />

<!--   <v-menu
    location="bottom end"
    location-strategy="connected"
    :close-on-content-click="false"
  >
    <template #activator="{ props }">
      <aterra-input
        v-model="shownValue"
        :label="label"
        v-bind="props"
        color="primary"
      />
    </template>

    <v-date-picker color="primary" width="400" rounded="xl" show-adjacent-months :model-value="pickerValueLocal" @update:model-value="event => pickerValueLocal = event" />
  </v-menu> -->
</template>

<style>

</style>
