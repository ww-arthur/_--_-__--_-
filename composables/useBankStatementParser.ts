import type { DateTime } from "luxon";
import { parse } from "vue/compiler-sfc";
import { parseDateToMillis } from "~/utils/utils";

export function parseBankStatement(lines: string[]): TransactionItem[] {
  const bankStatement: TransactionItem[] = [];

  let currentDate = "";
  let currentType: "item" = "item";
  let transactionBuffer: string[] = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    // Detecta uma nova data (formato "01 DEZ 2024")
    if (/^\d{2} \w{3} \d{4}$/.test(line)) {
      currentDate = line;
      continue;
    }

    // Identifica categorias de transação
    if (line.includes("Total de entradas")) {
      currentType = "item";
      continue;
    }
    if (line.includes("Total de saídas")) {
      currentType = "item";
      continue;
    }

    // Verifica se a linha indica um tipo de transação
    if (
      line.includes("Transferência recebida pelo Pix") ||
      line.includes("Transferência recebida") ||
      line.includes("Reembolso recebido pelo Pix") ||
      line.includes("Transferência enviada pelo Pix") ||
      line.includes("Pagamento de boleto efetuado") ||
      line.includes("Compra no débito via NuPay") ||
      line.includes("Compra no débito")
    ) {
      transactionBuffer = [line]; // Inicia um buffer para armazenar os detalhes da transação
      continue;
    }

    // Se a transação já começou a ser capturada, adiciona mais detalhes
    if (transactionBuffer.length > 0) {
      transactionBuffer.push(line);

      // Se a última linha é um valor numérico válido, processa a transação
      if (/^-?\d+,\d{2}$/.test(line)) {
        const method = transactionBuffer[0]; // O tipo está na primeira linha do buffer
        const description = transactionBuffer.slice(1, -1).join(" "); // Junta as linhas da descrição
        const value = transactionBuffer[transactionBuffer.length - 1]; // O valor está na última linha do buffer
        const newDate = parseDateToMillis(currentDate);
        console.log(newDate);

        //const category = classifyCategory(description, type);

        bankStatement.push({
          date: newDate,
          description: description,
          method: method,
          value: value? parseFloat(value.replace(",", ".")) : 0,
          type: currentType,
        });

        transactionBuffer = []; // Limpa o buffer após salvar a transação
      }
    }
  }
  const groupedTransactions = groupTransactionsByDescription(bankStatement);
  const categorizedTransactions = groupedTransactions.map(transaction => ({
    ...transaction,
    category: classifyCategory(transaction.description, transaction.type),
  }));

  return categorizedTransactions;
}