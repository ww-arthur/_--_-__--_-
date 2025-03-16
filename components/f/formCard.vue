<script lang="ts" setup>
  import { VForm } from 'vuetify/components'

  const props = withDefaults(defineProps<{
    title: string
    tabs?: Array<string>
    disabledTabs?: Array<string>
    loading?: boolean
    fullHeight?: boolean
    tab?: string
  }>(), {
    title: '',
    tabs: () => [],
    loading: false,
    fullHeight: true,
    tab: ''
  })
  const emit = defineEmits<{
    (event: 'save'): void
    (event: 'update:tab', value: string): void
  }>()
  const isDark = useCookie<boolean>('dark')
  const isValid = defineModel<boolean>({ default: true })

  const defaultTab = props.tabs[0] ?? 1
  const undTab = ref<string>(defaultTab)
  // const tab = defineModel<string>('')
  // tab.value = defaultTab
  const form = ref<InstanceType<typeof VForm> | null>(null)


  const tabLocal = computed({
    get: () => props.tab || undTab.value,
    set: value => (props.tab ? emit('update:tab', value) : undTab.value = value),
  })


  async function save() {
    if(form.value === null) return

   const {valid} =  await form.value.validate()
    nextTick(() => {
      if(!valid){
        //const notification = useNotification()
        // form.value?.errors.forEach((e) => {
        //   setTimeout(() => {
        //     notification.value = {
        //     message: e.errorMessages[0],
        //     type: 'warning',
        //   }
        //   }, 50)

        // })
        return
    }
    emit('save')
  })
  }
  const showSave = ref(true)
/*   let lastScroll = 0
  async function processScroll(e: WheelEvent) {
    // if is scrolling down, then set showSave to true
    // if is scrolling up, then set showSave to false
    if ((e.target as HTMLElement)?.scrollTop === lastScroll)
      return

    lastScroll = (e.target as HTMLElement)?.scrollTop
    const scrollDelta = e.deltaY

    if (scrollDelta >= 0)
      showSave.value = true
    else
      showSave.value = false
    console.log(e)
  // console.log('scroll')
  }
  onMounted(() => {
    document.addEventListener('wheel', processScroll)
  })
  onUnmounted(() => {
    document.removeEventListener('wheel', processScroll)
  }) */
</script>

<template>
  <v-form v-model="isValid" @submit.prevent="save" validate-on="submit" ref="form" :class="{ 'h-100': fullHeight }"  >
  <v-container :class="{ 'h-100': fullHeight }" fluid >

    <v-card color="background" variant="flat" height="100%" max-height="100%" class="d-flex flex-column ">
      <v-app-bar class="bg-gradient-primary"  order="2" elevation="1" variant="outlined" :color="`primary-${isDark ? 'lighten-2' : 'darken-3'}`" density="compact">
        <v-row no-gutters align="center">
          <v-col cols="12" md="2">
            <v-card-title :title="title" class="text-white  font-weight-bold text-background" >
              {{ title }}
            </v-card-title>
          </v-col>
          <v-divider vertical />
          <v-col>
            <v-tabs v-model="tabLocal" color="background" selected-class="font-weight-black">
              <v-tab v-for="t in tabs" active-color="text" :key="t" :disabled="disabledTabs?.includes(t)" :value="'normalizeName(t)'">
                {{ t }}
              </v-tab>
            </v-tabs>
          </v-col>
          <v-col cols="12" md="2" class="d-flex align-center justify-end">
            <slot name="header-append" />
          </v-col>
        </v-row>
      </v-app-bar>
      <v-card-text class="pa-0">
        <v-window v-model="tabLocal" class="h-100">
          <v-window-item v-for="t in tabs" :key="t" :value="'normalizeName(t)'" class="ma-2 flex-grow-1">
            <slot :name="'normalizeName(t)'" :selected="'normalizeName(t)' === tabLocal" />
          </v-window-item>
        </v-window>
      </v-card-text>
      <admin-loading :model-value="loading" />

      <v-app-bar v-model="showSave" app color="card" height="72" location="bottom" order="0">
        <slot name="actions-left" />
        <v-spacer />
        <div />
        <slot name="actions" />
        <v-divider v-if="$slots.actions" vertical class="mx-5" />
        <slot name="save">
          <v-btn
            :loading="loading" prepend-icon="mdi-content-save" color="success" variant="flat" size="large"
            class="mr-5  px-4" rounded="lg" type="submit"
          >
            Save
          </v-btn>
        </slot>
      </v-app-bar>
    </v-card>
  </v-container>
</v-form>
</template>
