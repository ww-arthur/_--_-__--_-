export function classifyCategory(description: string, type: string): string {
    const categories = {
      food: ["ifood", "restaurante", "mc donalds", "zé delivery", "mercado", "conveniencia", "padaria"],
      recreation: ["netflix", "google", "spotify", "jogos", "playstation", "parque", "loja"],
      bills: ["boleto", "companhia", "imobiliaria", "internet", "aluguel", "condominio"],
      transport: ["uber", "99pop", "gasolina", "metrô", "ônibus", "pedágio"],
      weed: ["augusto mazzero"],
    };
  
    const lowerDesc = description.toLowerCase();
  
    for (const [category, keywords] of Object.entries(categories)) {
      if (keywords.some(keyword => lowerDesc.includes(keyword))) {
        return category;
      }
    }

    return "Outros";
  }

  export function groupTransactionsByDescription(transactions: any[]) {
    const groupedTransactions: { [description: string]: any } = {};
  
    transactions.forEach(transaction => {
      const { description, date, type, value, movement } = transaction;
  
      if (!groupedTransactions[description]) {
        groupedTransactions[description] = {
          date,
          description,
          type,
          value: 0,
          movement,
          count: 0, // Contador para saber quantas transações foram agrupadas
        };
      }
  
      // Somamos os valores das transações agrupadas
      groupedTransactions[description].value += value;
      groupedTransactions[description].count += 1;
    });
  
    // Retorna os valores agrupados como um array
    return Object.values(groupedTransactions);
  }
  

  // export function separateByCategory(transactions: TransactionItem[]): Transaction[] {
  //   const parsedTransactions = transactions.reduce((parsed, transaction) => {
  //     const category = classifyCategory(transaction.description, transaction.type);
  //     const group = parsed.find(group => group.type === 'group' && group.description === category) as TransactionGroup | undefined;
  //     if (group) {
  //       group.value += transaction.value;
  //       group.items.push(transaction);
  //     } else {
  //       parsed.push({
  //         type: 'group',
  //         dateRange: [0, 0],
  //         description: category,
  //         value: transaction.value,
  //         items: [transaction],
  //       });
  //     }
  //     return parsed;
  //   }, [] as Transaction[]);
  //   console.log('parsedTransactions', parsedTransactions);
  //   return parsedTransactions;
  // }

  export function separateByCategory(transactions: TransactionItem[]): Transaction[]  {
    return transactions.reduce((parsed, transaction) => {
      const category = classifyCategory(transaction.description, transaction.type);
      const foundGroup = parsed.find(group => group.type === 'group' && group.description === category) as TransactionGroup | undefined;

      if (!foundGroup) {
        parsed.push({
          type: 'group',
          dateRange: [transaction.date, transaction.date],
          description: category,
          value: transaction.value,
          items: [transaction],
        });
       return parsed
      }

      foundGroup.value += transaction.value;
      foundGroup.dateRange[0] = Math.min(foundGroup.dateRange[0], transaction.date);
      foundGroup.dateRange[1] = Math.max(foundGroup.dateRange[1], transaction.date);
      foundGroup.items.push(transaction);
      
      return parsed;
  
    }, [] as Transaction[] );
  }

  export function unwrapGroup(options: FsPlanOption[], group: FsPlanOptionGroup | null = null): FsPlanOption[] {
    const flatOptions = options.flatMap(option => {
      if (option.type === 'group' && option.options) {
        for (const opt of option.options) {
          opt.depth = (group?.depth || 0) + 1
        }
      }
      return option.type === 'group' ? unwrapGroup(option.options, option) : option
    })
    return group ? [group as FsPlanOption].concat(flatOptions) : flatOptions
  }