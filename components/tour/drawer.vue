<script lang="ts" setup>
// type Transforms = Record<keyof typeof globalTransforms, Array<string | number>>

  const props = withDefaults(defineProps<{
    tour: TourItem
  }>(), {
  })

  const emit = defineEmits<{
    (event: 'next', value: TourItem): void
    (event: 'back', value: TourItem): void
    (event: 'skip'): void
  }>()

  const mobile = useMobile()

  const planStore = usePlanStore()
  const activeDrawer = useActiveDrawer()
  const layout = useLayout()

  const activeDrawerLocal = ref<string>('')

  const viewData = computed(() => {
    return planStore.plan.views.find(view => (view?.type === props.tour.view?.type && (view.floor === planStore.selectedFloor || !view.floor)))
  })
  const selectedGalleryOption = computed({
    get() {
      return planStore.selectedGalleryOption
    },
    set(value: Option | null) {
      planStore.selectedGalleryOption = value
    },
  })
  const selectedOptions = computed({
    get() {
      return planStore.options
    },
    set(value) {
      planStore.options = value
    },
  })

  const options = computed(() => {
    const optionsGroup = planStore.plan.wrappedOptions?.find(group => (group.viewId === viewData.value?.id && ((group.typeCode === 'opt' && viewData.value.type === 'svg') || viewData.value.type !== 'svg')))
    if (!optionsGroup?.options)
      return []
    return props.tour.optionIds?.map((id) => {
      return planStore.deepFindOptionById(id, optionsGroup)
    })?.sort((a, b) => {
      return (a?.displayOrder ?? 0) - (b?.displayOrder ?? 0)
    }) as Option[]
  })
  const isFullscreen = computed(() => {
    return layout.value === 'fullscreen'
  })

  watch(() => props.tour, () => {
    activeDrawer.value = ''
    nextTick(() => {
      activeDrawer.value = 'activeDrawer'
    })
  }, { deep: true })
  onMounted(() => {
    activeDrawer.value = ''
    nextTick(() => {
      activeDrawer.value = 'activeDrawer'
    })
  })
</script>

<template>
  <v-navigation-drawer :order="mobile ? '12' : '2'" elevation="2" permanent floating :location="mobile ? 'bottom' : 'left'" :model-value="!isFullscreen" width="325" touchless>
    <div id="activeDrawer" style="overflow-y: scroll; max-height: 100%">
      <v-card-title class="mt-3 d-flex align-center">
        <!--    <v-btn
        variant="text" :icon="tour.order ? 'mdi-arrow-left' : 'mdi-close'" density="comfortable" class="ml-n2 mr-3"
        @click="emit('back', tour)"
      /> -->
        <div class="text-capitalize">
          {{ tour.title }}
        </div>
      </v-card-title>
      <v-card-text>
        <v-fade-transition leave-absolute>
          <span :key="tour.description">
            {{ tour.description }}
          </span>
        </v-fade-transition>
      </v-card-text>

      <v-list v-if="tour.view?.type === 'svg'" lines="two">
        <list-option v-model="selectedOptions" :options="options" />
      </v-list>
      <v-list v-if="tour.view?.type === 'ext' || tour.view?.type === 'imgs'" lines="two">
        <list-gallery v-model="selectedGalleryOption" :options="options" />
      </v-list>
    </div>
  </v-navigation-drawer>
</template>
