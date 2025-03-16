<script lang="ts" setup>
  const route = useRoute()
  const router = useRouter()

  const planStore = usePlanStore()
  const tourStore = useTourStore()
  const authStore = useAuthStore()
  const drawer = useDrawer()

  const showConfirm = ref(false)
  const nextRouteName = ref<string | null>('')

  const userRole = computed(() => {
    return authStore?.role ?? ''
  })

  const tourItems = computed({
    get() {
      return tourStore.tour?.tourItems ?? []
    },
    set(value) {
      if (tourStore.tour)
        tourStore.tour.tourItems = value
    },
  })

  const activeTourItems = computed(() => {
    const uRole = userRole.value
    return tourItems.value.filter(tour => authStore.hasRole(tour.role))
  })

  const activeRoute = computed(() => {
    return route.name
  })

  const selectedGalleryOption = computed({
    get() {
      return planStore.selectedGalleryOption
    },
    set(value: Option | null) {
      planStore.selectedGalleryOption = value
    },
  })

  const activeTour = computed({
    get() {
      if (activeRoute.value === 'clientTag-projectTag-planTag-planId-svg')
        return null
      return activeTourItems.value?.find?.(tour => (!tour.skipped) && authStore.hasRole(tour.role)) ?? null
    },
    set(value: TourItem | null) {
      if (!value)
        return
      const index = tourItems.value.findIndex(tour => tour.id === value.id)
      tourItems.value[index] = value
    },
  })
  const activeIndex = computed(() => {
    return activeTourItems.value.findIndex(tour => tour.id === activeTour.value?.id)
  })

  watch(activeTour, () => {
    if (!activeTour.value)
      return

    if (activeTour.value.selectedOptionId) {
      const option = planStore.deepFindOptionById(activeTour.value.selectedOptionId) as Option
      if (option)
        selectedGalleryOption.value = option
    }
  }, { immediate: true })

  watch(() => activeTour.value?.view?.type, (newType, oldType) => {
    if (newType && newType !== 'any' && newType !== oldType && activeTour.value) {
      const routeParams = (activeTour.value.view.type === 'imgs' || activeTour.value.view.type === 'url') ? { ...route.params, viewId: activeTour.value.view.id } : route.params
      router.push({ name: hcViewTypeRoutes[newType], params: routeParams })
    }
  })
  watch(activeRoute, () => {
    findTourInRoute()
  })

  function previousTour() {
    if (!activeTour.value)
      return

    const activeIndex = activeTourItems.value.findIndex(tour => tour.id === activeTour.value?.id)
    if (activeIndex === -1)
      return activeTour.value.skipped = true

    const previousTour = activeTourItems.value[activeIndex - 1]
    goToIndex(activeIndex - 1)
    activeTour.value = previousTour
  }

  function nextTour() {
    if (!activeTour.value)
      return
    setLayoutMode('presentation')
    const activeIndex = activeTourItems.value.findIndex(tour => tour.id === activeTour.value?.id)
    const nextTour = activeTourItems.value[activeIndex + 1]
    if ((activeIndex + 1) === activeTourItems.value.length) {
      if (authStore.isAdmin)
        router.push({ name: 'clientTag-projectTag-planTag-planId-finalize', params: route.params })
      else
        drawer.value.savePlan = true
      return
    }

    goToIndex(activeIndex + 1)
  }
  function goToIndex(index: number) {
    if (!activeTour.value || !tourStore.tour)
      return
    const realIndex = tourItems.value.findIndex(tour => tour.id === activeTourItems.value[index]?.id)
    tourStore.tour.tourItems = tourStore.tour.tourItems.map((tour, i) => {
      if (i < realIndex)
        tour.skipped = true
      else
        tour.skipped = false
      return tour
    })
  }
  function skipTour() {
    setLayoutMode('default')
    skipHandler('all')
  }
  function skipHandler(skipType: 'partial' | 'all') {
    if (skipType === 'all') {
      tourItems.value = tourItems.value.map((tour) => {
        tour.skipped = true
        return tour
      })
    }
    else if (skipType === 'partial') {
      tourItems.value = tourItems.value.map((tour) => {
        if (tour.view?.type === activeTour.value?.view?.type)
          tour.skipped = true

        return tour
      })
    }
    showConfirm.value = false
  }
  function findTourInRoute() {
    let tourIndex = activeTourItems.value.findIndex(tour => route.name?.toString().includes(tour.view?.type) && !tour.skipped)
    if (tourIndex === -1)
      tourIndex = activeTourItems.value.findIndex(tour => route.name?.toString().includes(tour.view?.type))
    if (tourIndex > -1)
      goToIndex(tourIndex)
  }
  onMounted(() => {
    findTourInRoute()
  })
</script>

<template>
  <tour-modal v-if="activeTour && activeTour.type === 'modal'" :tour="activeTour" :current-tour-index="activeIndex" @next="nextTour" @skip="skipTour" @back="previousTour" />
  <tour-form v-if="activeTour && activeTour.type === 'form'" :tour="activeTour" :current-tour-index="activeIndex" @next="nextTour" @skip="skipTour" @back="previousTour" />
  <tour-drawer v-if="activeTour && activeTour.type === 'drawer'" :tour="activeTour" @next="nextTour" @skip="skipTour" @back="previousTour" />
  <tour-progress v-if="activeTour" :tour-items="activeTourItems" :tour="activeTour" @next="nextTour" @skip="skipTour" @back="previousTour" @go-to="goToIndex" />
</template>
