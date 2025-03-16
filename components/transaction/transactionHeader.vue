<script setup>
import { computed } from "vue";
import { parseDateToMonthYear } from "@/utils/dateUtils";

defineProps({
  transactions: Array,
});

const emit = defineEmits(["reset"]);

const totalSpent = computed(() =>
  transactions
    .filter((t) => t.movement === "Saída")
    .reduce((acc, t) => acc + t.value, 0)
);

const monthYear = computed(() => {
  if (transactions.length === 0) return "N/A";
  return parseDateToMonthYear(transactions[0].date);
});
</script>

<template>
  <v-app-bar elevation="1" color="primary" density="comfortable">
    <v-btn icon @click="emit('reset')">
      <v-icon>mdi-arrow-left</v-icon>
    </v-btn>

    <v-toolbar-title>{{ monthYear }}</v-toolbar-title>

    <v-spacer />

    <v-toolbar-title class="text-white">
      Total Gasto: R$ {{ totalSpent.toFixed(2) }}
    </v-toolbar-title>
  </v-app-bar>
</template>
