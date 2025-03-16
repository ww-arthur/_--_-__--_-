<script lang="ts" setup>
  const props = withDefaults(defineProps<{
    modelValue: TourItem
    tourItems: TourItem[]
  }>(), {
  })
  const emit = defineEmits<{
    (event: 'update:modelValue', value: TourItem): void
    (event: 'update:tourItems', value: TourItem[]): void
    (event: 'add'): void
    (event: 'save'): void
    (event: 'saveTemplate'): void
  }>()

  const tourStore = useTourStore()

  const drag = ref(false)
  const localValue = computed({
    get() {
      return props.modelValue
    },
    set(value) {
      emit('update:modelValue', value)
    },
  })
  const localTourItems = computed({
    get() {
      return props.tourItems
    },
    set(value) {
      emit('update:tourItems', value)
    },
  })

  const planStore = usePlanStore()
</script>

<template>
  <v-navigation-drawer order="2" elevation="2" permanent floating location="right" :model-value="true" width="500">
    <v-card-title class="mt-3 d-flex align-center">
      <div>
        Steps <v-btn icon size="comfortable" color="blue" variant="text">
          <v-icon icon="mdi-information-variant" size="small" />
          <v-tooltip
            activator="parent"
            location="end"
            width="500px"
          >
            <v-card-text>
              Create a tour by adding steps. <br>
              Each step will be a different view of the plan. <br>
              You can add a step by clicking the plus button below. <br>
              You can also reorder the steps by dragging the step to the desired position. <br>
              You can delete a step by clicking the trash icon.
            </v-card-text>
          </v-tooltip>
        </v-btn>
      </div>
      <v-spacer />
      <div>
        <slot name="header-append" />
      </div>
    </v-card-title>

    <v-list>
      <draggable
        v-model="localTourItems"
        group="people"
        item-key="id"
        @start="drag = true"
        @end="drag = false"
      >
        <template #item="{ element, index }">
          <v-list-item :key="`tour-${index}`" :active="element.id === localValue.id" @click="localValue = element">
            <v-list-item-title>
              {{ index + 1 }} {{ element.progressTitle ? ' - ' : '' }} {{ element.progressTitle }}
            </v-list-item-title>
            <template #append>
              <v-btn icon="mdi-delete" density="comfortable" variant="text" @click="localTourItems.splice(index, 1)" />
            </template>
          </v-list-item>
        </template>
      </draggable>
    </v-list>
    <v-divider class="my-5" />
    <v-btn block prepend-icon="mdi-plus" variant="text" @click="emit('add')">
      Add step
    </v-btn>

    <template #append>
      <div v-if="localTourItems.length" class="d-flex justify-space-between pa-4">
        <v-btn prepend-icon="mdi-bookmark" variant="outlined" @click="emit('saveTemplate')">
          Save as template
        </v-btn>
        <v-btn prepend-icon="mdi-check" :loading="tourStore.loading" color="success" @click="emit('save')">
          Save
        </v-btn>
      </div>
    </template>
  </v-navigation-drawer>
</template>
