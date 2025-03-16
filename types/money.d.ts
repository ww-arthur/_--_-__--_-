interface TransactionCommon {
  description: string,
  type: string,
  value: number,
}

interface TransactionGroup extends TransactionCommon {
  type: 'group',
  dateRange: [number, number],
  items: Transaction[],
}

interface TransactionItem extends TransactionCommon {
  type: 'item',
  date: number,
  method: string,
}

type Transaction = TransactionGroup | TransactionItem