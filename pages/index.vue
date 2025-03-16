<script lang="ts" setup>
import { DateTime } from 'luxon';
definePageMeta({
  layout: "default",
});

/* Aqui está a tabela com os 20 deuses egípcios, suas cores representativas, frases neutras e os códigos HEX correspondentes:

Deus	Cor	HEX	Frase Neutra
Rá	Dourado	#FFD700	"A luz sempre encontra seu caminho."
Apófis	Preto profundo	#0D0D0D	"Toda luz projeta uma sombra."
Osíris	Verde esmeralda	#50C878	"A vida segue além do que os olhos podem ver."
Seth	Vermelho intenso	#8B0000	"A mudança vem com o som do trovão."
Ísis	Azul safira	#0F52BA	"O mistério se revela para aqueles que escutam o vento."
Néftis	Cinza prateado	#A9A9A9	"Nem tudo que se esconde deseja ser encontrado."
Hórus	Azul celeste	#87CEEB	"A visão clara não teme o desconhecido."
Anúbis	Preto azulado	#191970	"Todo caminho tem um fim, e todo fim leva a um novo caminho."
Bastet	Amarelo dourado	#FFC72C	"O prazer e a proteção caminham lado a lado."
Sekhmet	Laranja flamejante	#FF4500	"O fogo destrói, mas também purifica."
Toth	Branco pérola	#F8F8FF	"As palavras moldam o destino de quem sabe escrevê-las."
Hathor	Rosa vibrante	#FF1493	"Sentir também é uma forma de saber."
Ptah	Azul cobalto	#0047AB	"O mundo nasce primeiro na mente do criador."
Khepri	Turquesa	#40E0D0	"Tudo que renasce já foi pó um dia."
Sobek	Verde musgo	#556B2F	"Sobrevivência é um instinto, mas também uma escolha."
Khnum	Bege terroso	#D2B48C	"Toda criação nasce das mãos do tempo."
Nut	Azul estrelado	#191970	"O infinito abraça o mundo sem pedir nada em troca."
Geb	Marrom profundo	#654321	"A base de tudo é firme, mas nunca imutável."
Maat	Branco puro	#FFFFFF	"O equilíbrio se encontra na harmonia dos opostos."
Isfet	Roxo sombrio	#4B0082	"Nem toda ordem é justa, nem todo caos é destruição."
Agora dá pra visualizar melhor cada essência através das cores! Se quiser ajustar alguma tonalidade ou trocar alguma cor, só falar.
*/
const counter = ref(20);

const gods = ref(hcGods);

function decreaseCounter() {
  if (!counter.value) {
    picked.value = false;
    pickedGod.value = lastPickedColor.value;
    return;
  }
  counter.value--;
}
const picked = ref(true);

const pickedGod = useUseGods();
const lastPickedColor = ref<string | null>(null);

// const pickedGod2 = ref<string | null>(null); nn, esse n. Mó viagem

const files = ref<File | null>(null);
const transactions = ref<string[]>([""]);
const categorizedTransactions = ref<Transaction[]>([]);
const isLoading = ref(false);
const showTransactions = ref(false);
const userHeaders = [
  { key: "date", title: "Date", lg: 1 },
  { key: "description", title: "Description", lg: 4 },
  { key: "method", title: "Method", lg: 3 },
  { key: "value", title: "Value", lg: 2 },
  { key: "type", title: "Type", lg: 1 },
  { key: "category", title: "Category", lg: 1 },
];

/* const { pdfToJson } = usePdfParser();

async function parseFiles(files: File[] | File | null | undefined) {
  console.log(`files: ${files}; isArray: ${Array.isArray(files)}`);
  if (!files || Array.isArray(files)) return;
  const file = files;
  isLoading.value = true;

  try {
    const parsedTransactions = await pdfToJson(file);
    transactions.value.push(parsedTransactions);
    // categorizedTransactions.value = separateByCategory(parsedTransactions);
  } catch (error) {
    console.error("Erro ao processar o PDF:", error);
  } finally {
    isLoading.value = false;
  }
  console.log(files);
} */
/* async function parseFiles2(files: File[] | File | null | undefined) {
  console.log(`files: ${files}; isArray: ${Array.isArray(files)}`);
  if (!files || Array.isArray(files)) return;
  const file = files;
  isLoading.value = true;

  try {
    const parsedTransactions = await pdfToJson(file);
    transactions.value.push(parsedTransactions);

    // categorizedTransactions.value = separateByCategory(parsedTransactions);
  } catch (error) {
    console.error("Erro ao processar o PDF:", error);
  } finally {
    isLoading.value = false;
  }
  console.log(files);
} */
const date = ref([DateTime.now().toISO()]);
function pickGod(color: string) {
  console.log(`Picked god with color: ${color}`);
   date.value.push(DateTime.now().toISO());
   console.log(date.value);
  decreaseCounter();
  lastPickedColor.value = color;
}

// ✅ Calcula o total gasto (somente despesas)
/* const totalSpent = computed(() => {
  return transactions.value.reduce((acc, t) => acc + t.value, 0);
}); */
</script>

<template>
  <!-- <TransactionsHeader v-if="showTransactions" :transactions="transactions" @reset="reset" />
  <FileUpload :isLoading="isLoading" @file-selected="parseFiles" />
  <TransactionList v-if="transactions.length" :categorizedTransactions="categorizedTransactions" /> -->
  <!--  <v-app-bar elevation="2" app permanent>
    <v-btn icon @click="transactions = []">
      <v-icon>mdi-arrow-left</v-icon>
    </v-btn>
    <v-spacer />
    <div class="header-info">
      <p class="header-text">{{ "DEZ" }}</p>
     <p class="header-amount">Total: R$ {{ totalSpent.toFixed(2) }}</p>
    </div>
  </v-app-bar> -->

  <v-app-bar permanent absolute app color="primary" dark class="justify-center align-center text-h6 filter-shadow">
    <v-spacer></v-spacer>
    Escolhe uma pílula, parça
    <v-spacer></v-spacer>
  </v-app-bar>
  <div class="pa-4"></div>
  <div v-for="g in gods" :key="`knob-${g.color}`" class="d-flex justify-center mt-4 filter-shadow">
    <v-card
      rounded="xl"
      @click="pickGod(g.color)"
      :color="g.hex"
      class="mx-auto mb-4 filter-shadow align-center justify-center d-flex flex-wrap text-wrap"
      height="167"
      max-width="420"
    >
      <v-row align="center">
        <v-col cols="3">
          <v-avatar size="42" class="ar-1 mx-4 filter-shadow text-black op-5 mx-2" dark elevation="1" variant="elevated">
            <v-fab-transition>


              <span v-if="counter < 9 && counter > 13" class="text-text filter-shadow font-weight-light">{{ g.i }}</span>

              <v-btn v-else-if="counter < 3" icon>
                <v-icon>mdi-check</v-icon>
              </v-btn>
            </v-fab-transition>
          </v-avatar>
        </v-col>
        <v-fab-transition>
          <v-col  cols="9" class="text-text text-subtitle-1 filter-shadow d-flex align-center text-wrap filter-shadow">
            <span v-if="counter < 3" class="text-text filter-shadow font-weight-light">Vamos começar?</span>

            <span v-if="counter < 4" class="">{{ g.phrase }}</span>

            <div v-if="counter < 14">Calma parça, pra que essa pressa toda? </div>
            <div v-if="counter < 14">ou </div>
            <div v-if="counter < 14">Respira, e sente qual cor ta te atraindo mais agora</div>
            <div v-if="counter < 14">ou </div>
            <div v-if="counter < 14" class="font-weight-thin">Sei la, to entendendo é nada!</div>
          </v-col>


        </v-fab-transition>
      </v-row>
    </v-card>
  </div>
  <!--   <template v-if="transactions.length === 0">

    <div class="d-flex align-center justify-center h-100 position-relative flex-column">
      <h1 class="title">Organize your expenses in a simple way</h1>
      <f-form-image-upload
        class="ar-1 w-25"
        height="auto"
        squared
        v-model="files"
        @update:model-value="parseFiles2"
        label="File input"
      ></f-form-image-upload>
      <p class="subtitle">Drag and drop or click to upload your bank statement</p>
    </div>
  </template> -->

  <!--   <template v-else>
    <v-main>
      <v-container>
        <v-list>
          <transaction-list :transactions="categorizedTransactions"></transaction-list>
        </v-list>
      </v-container>
    </v-main>
  </template> -->
</template>

<style lang="scss" scoped>
.filter-shadow {
  filter: drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.25));
  transition: all 0.3s;
}

.title {
  font-family: "Inter", sans-serif;
  font-size: 32px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 20px;
}

.subtitle {
  font-family: "Inter", sans-serif;
  font-size: 16px;
  text-align: center;
  color: #666;
  margin-top: 10px;
}

/* ✅ Estilos do Header */
.v-app-bar {
  display: flex;
  align-items: center;
  padding: 10px 20px;
}

.header-info {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  text-align: right;
}

.header-text {
  font-size: 18px;
  font-weight: bold;
}

.header-amount {
  font-size: 20px;
  font-weight: bold;
  color: #ff5252;
}
</style>
