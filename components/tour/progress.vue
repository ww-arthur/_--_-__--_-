<script lang="ts" setup>
// type Transforms = Record<keyof typeof globalTransforms, Array<string | number>>

  const props = withDefaults(defineProps<{
    tour: TourItem | null
    tourItems: TourItem[]
  }>(), {
  })

  const emit = defineEmits<{
    (event: 'next', value: TourItem | null): void
    (event: 'back', value: TourItem | null): void
    (event: 'goTo', value: number): void
    (event: 'skip'): void
  }>()

  const route = useRoute()
  const router = useRouter()
  const drawers = useDrawer()
  const mobile = useMobile()
  const layout = useLayout()

  const authStore = useAuthStore()
  const planStore = usePlanStore()

  const selectedOptions = computed({
    get() {
      return planStore.options
    },
    set(value) {
      planStore.options = value
    },
  })
  const grandTotal = computed(() => {
    return planStore.grandTotal
  })
  const currentTourIndex = computed(() => {
    return props.tourItems.findIndex(tour => tour.id === props.tour?.id) ?? 0
  })

  const currentProgress = computed(() => {
    return (currentTourIndex.value + 1) / props.tourItems.length * 100
  })
  const isFullscreen = computed(() => {
    return layout.value === 'fullscreen'
  })
  const pricedOptionsComponentsLength = computed(() => {
    return planStore.pricedLayerComponents.length + planStore.pricedOptions.length
  })
  // TODO: remove this unknown after updating vuetify
  function updateTourIndex(step: number | unknown) {
    if (typeof step !== 'number')
      return
    if (step > props.tourItems.length)
      return

    emit('goTo', step)
  }
  function updateTourStep(step: number | unknown) {
    if (typeof step !== 'number')
      return
    if (step > props.tourItems.length)
      return

    emit('goTo', step - 1)
  }
  function openFinalize() {
    router.push({ name: 'clientTag-projectTag-planTag-planId-finalize', params: route.params })
  }
  function openSaveModal() {
    drawers.value.savePlan = true
  }
  function shouldShowOnMobile(index: number) {
    if (mobile.value)
      return index === currentTourIndex.value || index === currentTourIndex.value + 1 || index === currentTourIndex.value - 1 || (currentTourIndex.value === (props.tourItems.length - 1) && index === (props.tourItems.length - 2))
    return true
  }
</script>

<template>
  <v-app-bar order="11" elevation="2" permanent floating location="bottom" :model-value="!isFullscreen" :height="mobile ? '140' : '140'">
    <v-stepper editable position="absolute" class="po-top-left align-self-start d-flex flex-column justify-center" elevation="0" height="55px" max-width="100%" width="100%" non-linear :model-value="currentTourIndex + 1" @update:model-value="updateTourStep">
      <v-stepper-header class="position-relative">
        <v-tabs height="55" elevation="0" center-active grow :model-value="currentTourIndex" @update:model-value="updateTourIndex">
          <v-tab v-for="(item, i) in tourItems" :key="`${item.id}${i}`" class="fi-blur-0 mx-md-4" :value="i" min-width="50">
            <div class="mr-2">
              <v-avatar v-if="i < currentTourIndex" size="22" color="secondary">
                <v-icon>mdi-check</v-icon>
              </v-avatar>
              <v-avatar v-else color="secondary" size="22" :variant="currentTourIndex + 1 < i + 1 ? 'outlined' : 'flat'">
                <span>
                  {{ i + 1 }}
                </span>
              </v-avatar>
            </div>

            <span v-if="!mobile || i === currentTourIndex" class="text-truncate"> {{ item.progressTitle }} </span>
          </v-tab>
          <v-tab v-if="authStore.isAdmin" class="fi-blur-0 mx-md-4" @click="openFinalize">
            <div class="mr-2">
              <v-avatar v-if="currentTourIndex === tourItems.length + 1" size="22" color="secondary">
                <v-icon>mdi-check</v-icon>
              </v-avatar>
              <v-avatar v-else color="secondary" size="22" :variant="currentTourIndex < tourItems.length ? 'outlined' : 'flat'">
                <span>
                  {{ tourItems.length + 1 }}
                </span>
              </v-avatar>
            </div>
            <span class="text-truncate"> Finalize </span>
          </v-tab>
          <v-tab v-else class="fi-blur-0 mx-md-4" @click="openSaveModal">
            <div class="mr-2">
              <v-avatar v-if="currentTourIndex === tourItems.length + 1" size="22" color="secondary">
                <v-icon>mdi-check</v-icon>
              </v-avatar>
              <v-avatar v-else color="secondary" size="22" :variant="currentTourIndex < tourItems.length ? 'outlined' : 'flat'">
                <span>
                  {{ tourItems.length + 1 }}
                </span>
              </v-avatar>
            </div>
            <span class="text-truncate"> Save </span>
          </v-tab>
          <!-- <v-divider v-show="shouldShowOnMobile(i) && (i !== currentTourIndex + 1 || !mobile)" :color="i < currentTourIndex ? 'secondary' : 'grey'" thickness="2" /> -->
          <!--    <template v-if="shouldShowOnMobile(tourItems.length)">
            <v-divider :color="currentTourIndex === tourItems.length - 1 ? 'secondary' : 'grey'" thickness="2" />
            <v-stepper-item v-if="authStore.isAdmin" :value="tourItems.length + 1" color="white" @click="openFinalize">
              <template #icon="{ step }">
                <v-avatar color="secondary" size="22" variant="outlined">
                  <span>
                    {{ step }}
                  </span>
                </v-avatar>
              </template>
              <template #title>
                <span class="text-truncate"> Finalize </span>
              </template>
            </v-stepper-item>
            <v-stepper-item v-else color="white" :value="tourItems.length + 1" @click="openSaveModal">
              <template #icon="{ step }">
                <v-avatar color="secondary" size="22" variant="outlined">
                  <span>
                    {{ step }}
                  </span>
                </v-avatar>
              </template>
              <template #title>
                <span class="text-truncate"> Save </span>
              </template>
            </v-stepper-item>
          </template> -->
        </v-tabs>
      </v-stepper-header>
    </v-stepper>
    <v-row class="ma-2 align-self-end" :no-gutters="mobile">
      <v-col v-ripple cols="12" md="6" class="cursor-click d-flex align-end mb-2 mb-sm-0 mx-2 mx-sm-0" @click="drawers.pricingList = !drawers.pricingList">
        <div class="text-md-h6 font-weight-bold d-flex align-center">
          <v-badge color="card" bordered class="pa-0" offset-x="-2" offset-y="-2" location="bottom left" :content="pricedOptionsComponentsLength">
            <v-icon class="mr-4" size="small">
              mdi-cart
            </v-icon>
          </v-badge>

          Total
        </div>
        <v-divider vertical class="mx-6" />
        <div v-if="grandTotal" class=" font-weight-thin text-h6 ">
          {{ parseCurrency(grandTotal) }}
        </div>
      </v-col>

      <v-col cols="12" md="6" class="d-flex align-stretch align-lg-center justify-md-end">
        <v-btn variant="text" @click="emit('skip') ">
          Skip Tour
        </v-btn>
        <v-divider vertical class="mx-2 mx-md-4" />
        <v-btn
          v-if="currentTourIndex > 0"
          :variant="mobile ? 'text' : 'tonal'" :size="mobile ? 'medium' : 'large'" prepend-icon="mdi-arrow-left "
          class="ml-n2 mr-3 flex-grow-1"
          @click="emit('back', tour)"
        >
          Back
        </v-btn>
        <v-btn class="flex-grow-1" append-icon="mdi-arrow-right" variant="elevated" color="secondary" :size="mobile ? 'medium' : 'large'" @click="emit('next', tour)">
          {{ tour?.nextText }}
        </v-btn>
      </v-col>
    </v-row>
  </v-app-bar>
</template>
