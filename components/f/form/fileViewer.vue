<script lang="ts" setup>
  const props = withDefaults(defineProps<{
    loading?: boolean
    modelValue?: File | null
    src?: string

  }>(), {
    loading: false,
    src: '',
    modelValue: null,
    label: '',
    squared: false,
    height: '100px',
  })

  const emit = defineEmits<{
    (event: 'update:modelValue', value?: string | File | null): void
  }>()
  const imageSrc = ref<string | null>(null)
  const loadingImage = ref<boolean>(false)
  const error = ref<boolean>(false)

  const inputFile = ref<HTMLInputElement | null>(null)
  function createImage(file: File | string | null) {
    if (!file) {
      imageSrc.value = props.src ?? null
      emit('update:modelValue', null)
      return
    }
    // const image = new Image()
    if (typeof file !== 'string') {
      const reader = new FileReader()
      reader.onload = (e) => {
        loadingImage.value = true

        imageSrc.value = (e.target?.result ?? null) as string | null
        emit('update:modelValue', file)
      }
      reader.readAsDataURL(file)
    }
    else {
      imageSrc.value = file
      emit('update:modelValue', file)
    }
  }
  function openOrUpload() {
    inputFile.value?.click()
  }

  watch(() => props.modelValue, () => {
    createImage(props.modelValue)
  })
  onMounted(() => {
    createImage(props.modelValue)
  })
</script>

<template>
  <v-img
    class="rounded elevation-2" :src="imageSrc ?? undefined"
    @loadstart="error = false" @error="error = true" @load="loadingImage = false"
  >
    <template #placeholder>
      <div v-if="loadingImage" class="d-flex align-center justify-center fill-height">
        <v-progress-circular
          color="grey-lighten-4"
          indeterminate
        />
      </div>
    </template>
  </v-img>
</template>
