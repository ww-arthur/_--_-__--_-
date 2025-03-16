<script lang="ts" setup>
// const userStore = useUserStore();
// const filterStore = useFilterStore();
// const builderStore = useBuilderStore();
const userHeaders = [
  {
    key: "fullName",
    title: "User",
    lg: 4,
  },
  {
    key: "email",
    title: "Email",
    lg: 3,
  },
  {
    key: "builder",
    title: "Builder",
    lg: 3,
  },

  {
    lg: 2,
    key: "action",
    justify: "end",
    title: "",
    sortable: false,
    class: "d-flex justify-end",
  },
];

// const filters = ref(filterStore.users);
const search = ref("");

// const users = computed(() => userStore.users);

const listUsers = async () => {
//   await userStore.listUsers(filters.value);
};
// watch(
//   () => filters.value,
//   () => listUsers(),
//   { deep: true }
// );

onMounted(() => {
//   filters.value = filterStore.users;
  listUsers();
});
</script>

<template>
  <div>
    <v-container>
      <v-card class="mb-10" title="Users" flat color="transparent">
        <!-- <aterra-col-list title="Users" :cols="userHeaders" :rows="users" :search="search">
          <template #filters>
            <v-row align="center" no-gutters>
              <v-col cols="12">
                <div class="mr-6 mb-4 d-flex align-center">
                  <aterra-input v-model="search" label="Search" append-inner-icon="mdi-magnify" />
                </div>
              </v-col>
              <v-col cols="12" md="6">
                <aterra-autocomplete
                  v-model="filters.builderId"
                  density="compact"
                  clearable
                  :items="builderStore.autocompleteBuilders"
                  label="Builder"
                />
              </v-col>
            </v-row>
          </template>
          <template #displayName="{ row }">
            <div class="d-flex align-center">
              <admin-user-avatar :user-id="row.id" size="50" />
              <p class="ml-3 font-weight-bold text-h6">
                {{ row.displayName }}
              </p>
            </div>
          </template>
          <template #builder="{ row }">
            <admin-builder-avatar :builder-id="row.builderId" />
          </template>
          <template #action="{ row }">
            <div class="d-flex justify-end">
              <v-btn :to="`/admin/user/${row.id}`" color="primary" icon="mdi-pencil"> </v-btn>
            </div>
          </template>
        </aterra-col-list> -->
        <!-- <aterra-table :headers="builderHeaders" :items="builders" /> -->
        <!--     <div class="text-center pa-5">
          <v-btn
            rounded="lg" variant="tonal" color="default"
            class="mr-2"
            prepend-icon="mdi-table"
          >
            View plans
          </v-btn>

          <v-btn prepend-icon="mdi-plus" rounded="lg" variant="tonal" color="success" class="ml-2">
            Create plan

          </v-btn>
        </div> -->
      </v-card>
    </v-container>
  </div>
</template>