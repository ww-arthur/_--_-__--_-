<script lang="ts" setup>
// type Transforms = Record<keyof typeof globalTransforms, Array<string | number>>

  const props = withDefaults(defineProps<{
    tour: TourItem
    currentTourIndex: number
  }>(), {
  })

  const emit = defineEmits<{
    (event: 'next', value: TourItem): void
    (event: 'back', value: TourItem): void
    (event: 'skip'): void
  }>()
  const mobile = useMobile()
</script>

<template>
  <aterra-modal width="500" :title="tour.title" :model-value="true" content-class="d-flex flex-column justify-center text-md-body-1 text-h6">
    <template #title-area>
      <!--      <v-btn
        variant="text" :icon="tour.order ? 'mdi-arrow-left' : 'mdi-close'" density="comfortable" class="ml-n2 mr-3"
        color="white" @click="emit('back', tour)"
      /> -->
      <div class="flex-grow-1 text-capitalize text-wrap">
        {{ tour.title }}
      </div>
    </template>
    {{ tour.description }}

    <template #actions>
      <v-row justify="space-between">
        <v-col cols="12" md="4">
          <v-btn v-show="currentTourIndex && mobile" class="flex-grow-1" prepend-icon="mdi-arrow-left" variant="tonal" @click="emit('back', tour)">
            Back
          </v-btn>
        </v-col>
        <v-col cols="12" :md="currentTourIndex && mobile ? 8 : 12">
          <v-btn block prepend-icon="mdi-arrow-right" variant="elevated" @click="emit('next', tour)">
            {{ tour.nextText }}
          </v-btn>
        </v-col>
      </v-row>
    </template>
    <template #close-button>
      <v-btn block variant="tonal" class=" mx-0 ml-0 ml-md-2 mt-2 mt-md-0 mb-2 md-md-0" @click="emit('skip')">
        Skip Tour
      </v-btn>
    </template>
  </aterra-modal>
</template>
