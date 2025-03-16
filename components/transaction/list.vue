<script lang="ts" setup>
const componentProps = withDefaults(
  defineProps<{
    transactions: Transaction[];
    child?: boolean;
  }>(),
  {}
);

function parseType(transactions: Transaction[]): TransactionItem[] {
  return transactions as TransactionItem[];
}
</script>

<template>
  <template v-for="(transaction, i) in transactions">
    <v-divider v-if="i && !child" :key="`transaction-${i}`" />

    <v-list-group v-if="transaction.type === 'group' && transaction?.items" :key="`transaction-${i}`" :value="`transaction-${i}`">
      <template #activator="{ props, isOpen }">
        <v-list-item :height="child ? undefined : '60px'" v-bind="props" :class="isOpen ? 'bg-highlight' : ''">
          <v-list-item-subtitle class="font-weight-bold op-1 text-text">
            {{ transaction.description }}
          </v-list-item-subtitle>
          <template #append>
            {{ formatCurrency(Number(transaction.value)) }}
          </template>
        </v-list-item>
      </template>
      <transaction-list child :transactions="parseType(transaction.items)" />
    </v-list-group>
    <v-list-item v-else :key="`transaction-child-${i}`" color="grey">
      <v-list-item-subtitle class="op-1 text-text">
        {{ transaction.description }}
      </v-list-item-subtitle>
      <template #append>
        {{ formatCurrency(Number(transaction.value)) }}
      </template>
    </v-list-item>
  </template>
</template>
