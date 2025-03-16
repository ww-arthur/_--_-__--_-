<script lang="ts" setup>
const props = withDefaults(
  defineProps<{
    loading?: boolean;
    src?: string;
    modelValue?: File | null;
    label?: string;
    squared?: boolean;
    height?: string;
  }>(),
  {
    loading: false,
    src: "",
    modelValue: null,
    label: "",
    squared: false,
    height: "100px",
  }
);

const emit = defineEmits<{
  (event: "update:modelValue", value?: File | null): void;
  (event: "change", value?: File | null): void;
}>();
const imageSrc = ref<string | null>(null);
const loadingImage = ref<boolean>(false);
const error = ref<boolean>(false);
const imageOpen = ref<boolean>(false);

const inputFile = ref<HTMLInputElement | null>(null);
function createImage(file: File | string | null) {
  if (!file) {
    imageSrc.value = null;
    emit("update:modelValue", null);
    return;
  }
  // const image = new Image()
  if (typeof file !== "string") {
    const reader = new FileReader();
    reader.onload = (e) => {
      loadingImage.value = true;

      imageSrc.value = (e.target?.result ?? null) as string | null;
      emit("update:modelValue", file);
      nextTick(() => {
        emit("change", file);
      });
    };
    reader.readAsDataURL(file);
  } else {
    imageSrc.value = file;
  }
}
function openOrUpload() {
  inputFile.value?.click();
}
function openImage() {
  imageOpen.value = true;
}
function handleDrop(e: DragEvent) {
  console.log(e);
  e.preventDefault();
  createImage(e.dataTransfer?.files?.[0] ?? null);
}
const isDragging = ref(false);
function handleDragStart(e: DragEvent) {
  e.preventDefault();
  isDragging.value = true;
}

onMounted(() => {
  if (props.src) loadingImage.value = true;

  nextTick(() => {
    if (!props.src) createImage(props.modelValue);
  });
});
</script>

<template>
  <div :style="{ height }" @drop.prevent="handleDrop">
    <input
      ref="inputFile"
      type="file"
      accept="image/*"
      style="display: none"
      @change="(event) => {
        const input = event.target as HTMLInputElement;
        input && createImage(input.files?.[0] ?? null);
      }"
    />
    <v-hover v-slot="{ isHovering, props }">
      <div
        v-ripple
        v-bind="props"
        :class="[{ 'rounded-circle': !squared }, { 'rounded-lg': squared }, { 'bg-text': isDragging }, { 'bg-card-darken-1': !isDragging }]"
        class="h-100 w-100 po-relative overflow-hidden d-flex justify-center align-center"
        @dragstart="handleDragStart"
        @dragover.prevent
        @dragleave="isDragging = false"
        @drop.prevent="handleDrop"
        @click="openOrUpload"
      >
        <div class="position-absolute po-top-left text-medium-emphasis pa-2">
          {{ label }}
        </div>
        <div class="position-absolute po-bottom-left text-medium-emphasis pa-2">
          {{ modelValue ? modelValue.name : getFileNameFromSrc(src) }}
        </div>
        <v-progress-circular v-if="loadingImage" indeterminate size="100" color="primary" class="position-absolute" />
        <v-img
          contain
          class="rounded elevation-2"
          style="position: absolute"
          width="100%"
          aspect-ratio="1"
          :src="imageSrc ?? src"
          @loadstart="loadingImage = true"
          @error="error = true"
          @load="loadingImage = false"
        >
          <template #placeholder>
            <slot name="placeholder" />
          </template>
        </v-img>
        <v-overlay v-if="src || imageSrc" :model-value="isHovering ?? undefined" class="align-center justify-center" scrim="card" contained>
          <div class="d-flex flex-column">
            <div class="text-caption text-medium-emphasis">File Name:</div>
            <div>
              {{ modelValue ? modelValue.name : getFileNameFromSrc(src) }}
            </div>
            <v-btn class="my-2" color="surface" variant="flat" prepend-icon="mdi-fullscreen" @click.stop="openImage"> Open Image </v-btn>
            <v-btn class="my-2" color="surface" prepend-icon="mdi-image" @click.stop="openOrUpload()"> Change Image </v-btn>
          </div>
        </v-overlay>

        <div v-if="!src && !imageSrc" class="h-100 flex-column d-flex align-center justify-center">
          <v-icon color="normal" size="4rem"> mdi-plus </v-icon>
          <span>Click to upload</span>
        </div>
      </div>
    </v-hover>
    <v-dialog v-model="imageOpen" max-width="100%" hide-overlay fullscreen>
      <div class="bg-card d-flex justify-center h-100 align-center position-relative">
        <v-btn icon="mdi-close" color="primary" class="position-absolute po-top-left ma-2" style="z-index: 1" @click="imageOpen = false" />
        <v-img width="100%" max-height="100%" contain class="rounded-lg" :src="imageSrc ?? src" />
      </div>
    </v-dialog>
  </div>
</template>
