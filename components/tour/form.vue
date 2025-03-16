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

  const planStore = usePlanStore()
  const mobile = useMobile()

  const finalizeData = computed<FinalizeData | null>({
    get() {
      return planStore.finalizeData
    },
    set(value: FinalizeData | null) {
      if (!value)
        return

      planStore.finalizeData = value
    },
  })

  const garageOrientation = [
    {
      title: 'Left',
      value: 'left',
    },
    {
      title: 'Right',
      value: 'right',
    },
  ]
  watch(() => finalizeData.value?.garageOrientation, (value) => {
    if (!finalizeData.value)
      return

    if (value === 'left')
      planStore.planSvgData.flipped.horizontal = planStore.plan.planInfo?.garageSide === 'right'
    else
      planStore.planSvgData.flipped.horizontal = planStore.plan.planInfo?.garageSide === 'left'
  })

  onMounted(() => {
    if (!finalizeData.value)
      return

    if (planStore.planSvgData.flipped.horizontal)
      finalizeData.value.garageOrientation = planStore.plan.planInfo?.garageSide === 'left' ? 'right' : 'left'

    else
      finalizeData.value.garageOrientation = planStore.plan.planInfo?.garageSide === 'left' ? 'left' : 'right'
  })
</script>

<template>
  <aterra-modal width="500" :title="tour.title" :model-value="true">
    <template #title-area>
      <!--   <v-btn
        variant="text" icon="mdi-arrow-left" density="comfortable" class="ml-n2 mr-3"
        color="white" @click="emit('back', tour)"
      /> -->
      <div class="flex-grow-1 text-capitalize">
        {{ tour.title }}
      </div>
    </template>
    {{ tour.description }}
    <v-divider v-if="tour.description" class="mt-4 mb-8" />
    <aterra-select
      v-if="finalizeData && tour.finalizeFields?.includes('garageOrientation')"
      v-model="finalizeData.garageOrientation" required :items="garageOrientation" label="Garage Orientation"
    />

    <ifp-button-save-plan v-if="tour.finalizeFields?.includes('savePlanButton')" />
    <template #actions>
      <v-row justify="space-between">
        <v-col cols="12" md="4">
          <v-btn v-show="currentTourIndex && mobile" block prepend-icon="mdi-arrow-left" variant="tonal" @click="emit('back', tour)">
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
