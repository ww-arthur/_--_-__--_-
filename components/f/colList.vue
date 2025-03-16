<script setup lang="ts" generic="T extends ObjectModel">
const props = withDefaults(defineProps<{
  title?: string
  density?: 'default' | 'comfortable' | 'compact'
  selectable?: boolean
  expand?: boolean
  hideHeaderMobile?: boolean
  cols: Array<ColObject>
  rows: T[]
  clickable?: boolean
  to?: string
  modelValue?: string[]
  color?: string
  loading?: boolean
  search?: string
  height?: string | number
  customFilter?: (v: string, q: string, i: T) => boolean;

}>(), {
  title: '',
  dense: false,
  selectable: false,
  expand: false,
  hideHeaderMobile: false,
  clickable: false,
  to: '',
  hideNotFound: false,
  color: 'card',
  loading: false,
  search: '',
  customFilter: (v: string, q: string, i: T) => {
    function getObjectValues(obj: T): string {
      if(obj == null)
        return ''
      return Object.values(obj).map(o => {
        if (typeof o === 'object')
          return getObjectValues(o)
        if(Array.isArray(o)) {
          return ''
        }
        return o
      }).join(' ')
    }
  if (v == null || q == null)
    return false
  const itemText = getObjectValues(i)

  return itemText.toString().toLocaleLowerCase().indexOf(q.toLocaleLowerCase()) > -1
},
})
const isDark = useCookie<boolean>('dark')

const selectAll = ref(false)
const selected = ref(props.modelValue)
const expanded = ref<number[]>([])

const allExpanded = computed(() => {
  return expanded.value.length >= props.rows.length
})
watch(
  () => props.rows,
  () => {
    selected.value = []
    expanded.value = []
  },
  { deep: true },
)

function changeExpansion(index: number) {
  if (expanded.value.includes(index)) {
    expanded.value.splice(
      expanded.value.findIndex(i => i === index),
      1,
    )
  }
  else {
    expanded.value.push(index)
  }
}
function expandAll() {
  if (allExpanded.value)
    expanded.value = []
  else
    expanded.value = props.rows.map((row, i) => i)
}


</script>

<template>
  <div>
    <v-app-bar v-if="density==='default'" order="2" elevation="1" :color="`primary-${isDark ? 'lighten-2' : 'darken-3'}`"  density="compact" >
      <v-card-title class="font-weight-bold" :class="`text-background`">
        {{ title }}
      </v-card-title>
      <v-divider vertical />
      <v-spacer />
      <template #append>
        <div class="mr-4">
          <slot name="header-append" />
        </div>
      </template>
    </v-app-bar>
    <div v-else class="mb-0 mb-md-n6">
      <v-card-title class="text-primary font-weight-bold">
        {{ title }}
      </v-card-title>
      <v-divider />
    </div>
    <div>
      <slot name="filters" />
    </div>
    <v-row v-if="$slots.options" align="center">
      <v-col cols="12">
        <slot name="options" />
      </v-col>
    </v-row>
    <v-row v-if="loading && !rows.length" align="center">
      <v-col cols="12">
        <v-skeleton-loader type="avatar" color="card" :rows="3" />
      </v-col>
    </v-row>
    <v-row v-show="!loading && !rows.length" class="mb-2">
      <v-col>
        <v-row justify="center" align="center">
          <v-col cols="6" justify="center" align="center">
            <h2 class="text-center primary--text text--lighten-1 mt-6">
              No results found
            </h2>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-row class="d-none d-lg-block mb-5">
      <v-col v-show="rows.length">
        <v-card-text class="d-flex ">
          <div v-if="selectable" class="d-flex align-center mr-2">
            <v-checkbox v-model="selectAll" class="ma-0 pa-0" hide-details :dense="density==='default'" />
          </div>
          <div v-if="expand" class="d-none d-md-flex align-center my-n2 mr-2 ml-n2">
            <v-btn icon color="transparent">
              <v-icon>mdi-chevron-down</v-icon>
            </v-btn>
          </div>
          <v-row class="d-none d-lg-flex flex-grow-1">
            <v-col v-for="(col, i) in cols" :key="`header_${col.key}${i}`" :cols="col.cols ? col.cols : ''"
              :lg="col.lg ? col.lg : ''" :class="`align-self-${col.align ? col.align : 'center'
                } d-flex ${col.justify ? `justify-${col.justify}` : 'start'}`
                ">
              <label>
                <strong>{{ col.title }}</strong>
              </label>
            </v-col>
          </v-row>
        </v-card-text>
        <v-progress-linear v-if="loading" color="primary" indeterminate />
        <v-divider v-else />
      </v-col>
    </v-row>

    <v-data-iterator :custom-filter="(v, q, i) => customFilter(v, q, i?.raw ?? null)" items-per-page="999"
      :search="search" :items="rows">
      <template #default="{ items }">
        <v-row class="mb-3" no-gutters>
          <v-virtual-scroll :items="items" :height="height">
            <template #default="{ item: row, index }">
              <v-col :key="`row_${index}${row.raw.id}`" :class="density==='default' ? 'py-0' : 'pt-1 pb-4'" cols="12" class="px-0" >
                <v-card :rounded="density==='default' ? '0' : 'lg'" :elevation="density==='default' ? 0 : '1'" :color="color"
                  :ripple="clickable ? true : false">
                  <v-card-text class="d-flex justify-center normal--text text-break py-1" :class="density==='default' ? 'py-3' : ''">
                    <div v-if="selectable" class="d-flex align-center mr-2 my-1">
                      <v-checkbox v-model="selected" :value="row" multiple class="ma-0 pa-0" hide-details
                        :dense="density==='default'" />
                    </div>
                    <div v-if="expand" class="d-none d-md-flex align-center mr-2 ml-n2">
                      <v-btn :class="expanded.includes(index) ? 'rotate' : ''" icon @click="changeExpansion(index)">
                        <v-icon>mdi-chevron-down</v-icon>
                      </v-btn>
                    </div>
                    <v-row class="flex-grow-1 flex-wrap maw-100" :class="`item px-0 ${density==='default' ? 'py-0' : ''
                      }${clickable ? ' cursor-pointer' : ''}`
                      " @click="clickable ? $emit('clickItem', row) : null">
                      <v-col v-for="(col, i) in cols" :key="`row_col_${i}${col.key}${row.raw.id}`"
                        :cols="col.cols ? col.cols : ''" :lg="col.lg ? col.lg : ''" :class="`align-self-${col.align ? col.align : 'center'
                          } ${col.customClass}
                            d-flex ${col.justify ? `justify-${col.justify}` : 'start'}
                            `
                          ">
                        <div>
                          <label v-if="!hideHeaderMobile" class="d-lg-none">
                            <strong>{{ col.title }}</strong>
                            <br>
                          </label>
                          <div>
                            <slot :name="col.key" :row="row.raw" :index="index">
                              {{ row.raw[col.key] }}
                            </slot>
                          </div>
                        </div>
                      </v-col>
                      <v-col v-if="expand" cols="12" class="d-block d-md-none">
                        <v-btn variant="text" block @click="changeExpansion(index)">
                          <v-icon :class="expanded.includes(index) ? 'rotate' : ''">
                            mdi-chevron-down
                          </v-icon>
                        </v-btn>
                      </v-col>
                    </v-row>
                  </v-card-text>
                  <v-expand-transition>
                    <div v-if="expanded.includes(index)" class="mx-4 pb-4">
                      <v-divider class="my-4" />
                      <slot name="extra" :row="row" :index="index" />
                    </div>
                  </v-expand-transition>
                </v-card>
                <v-divider v-if="density==='default' && index !== items.length - 1" />
              </v-col>
            </template>
          </v-virtual-scroll>
        </v-row>
      </template>
    </v-data-iterator>
  </div>
</template>

<style lang="scss">
.item {
  padding: 8px;
}

.rotate {
  transform: rotate(180deg);
}
</style>
