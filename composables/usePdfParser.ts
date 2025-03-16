import { getDocument, GlobalWorkerOptions } from 'pdfjs-dist';

GlobalWorkerOptions.workerSrc = '/pdf.worker.mjs';

export function usePdfParser() {
  function uint8ArrayToBase64(uint8Array: Uint8Array): string {
    let binary = '';
    uint8Array.forEach(byte => binary += String.fromCharCode(byte));
    return btoa(binary);
}
  async function pdfToJson(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = async () => {
        try {
          const typedArray = new Uint8Array(reader.result as ArrayBuffer);

          // Carregar o PDF usando pdfjs
          const pdf = await uint8ArrayToBase64(typedArray );
          let textContent = pdf;
          resolve(textContent);

      /*     for (let i = 1; i <= pdf.numPages; i++) {
            const page = await pdf.getPage(i);
            const text = await page.getTextContent();
            text.items.forEach((item: any) => {
              textContent += (item.str + "\n");
            });
          } */

       /*    const lines = textContent.split("\n").map(line => line.trim()).filter(line => line);
          console.log(lines);
          const transactions = parseBankStatement(lines);
          const categorizedTransactions = separateByCategory(transactions);
          console.log(categorizedTransactions);

          resolve(transactions); */
        } catch (err) {
          reject(err);
        }
      };

      reader.readAsArrayBuffer(file);
    });
  }
  return { pdfToJson };
}
