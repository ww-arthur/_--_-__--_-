<template>
  <div>
    <!--  <v-card v-if="!currentStory" :title="currentStory.a" :subtitle="currentStory.t" :text="currentStory.r" :time="currentStory.h" elevation="0" dark class="mb-4 " color="transparent" >
      <v-card-text class="pa-0">
        <v-container fluid>
          <v-row>
            <v-col cols="12">
              <v-card variant="elevated" >
                <v-card-title> <v-icon start icon="mdi-map-marker-path" color="primary"></v-icon> {{ currentStory.t }} </v-card-title>
                <v-card-text>
                  <div v-html="currentStory.s"></div>
                  <v-divider class="my-5"></v-divider>
                  <p>
                    {{ currentStory.d[0] }}
                  </p>
                  <p>
                    {{ currentStory.d[1] }}
                  </p>
                  <p>
                    {{ currentStory.d[2] }}
                  </p>
                  <v-divider class="my-5"></v-divider>
                  <p>
                    {{ currentStory.f }}
                  </p>
                  <v-divider class="my-5"></v-divider>
                  <p>
                    {{ currentStory.g[0] }}
                  </p>
                  <p>
                    {{ currentStory.g[1] }}
                  </p>
                  <p>
                    {{ currentStory.g[2] }}
                  </p>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>

    </v-card> -->
    <v-container v-if="currentStory" fluid class="pa-0">
      <v-row no-gutters>
        <v-col cols="12">
          <v-card elevation="0" class="mb-4 px-0" color="transparent" rounded="0" >
              <v-container fluid>
                <v-row>
                  <v-col cols="12" class="px-0">
                    <v-card class="px-0" variant="elevated" color="transparent" rounded="0">
                      <div class="text-h2 font-weight-bold mb-10 mx-1">  {{ currentStory.a }} </div>
                      <div class="text-h5 font-weight-bold mb-4  mx-1">  {{ currentStory.t }} </div>
                      <div class="text-caption  font-weight-thin mb-10 mx-1 text-italics">  {{ currentStory.r }} </div>


                      <v-card-text >
                        <div v-html="currentStory.s"></div>
                        <v-divider class="my-5"></v-divider>
                        <p class="my-5 bg-purple-darken-3 pa-3 rounded-lg elevation-1">
                          {{ currentStory.d[0] }}
                        </p>
                        <p class="my-5 bg-green-darken-3 pa-3 rounded-lg elevation-1">
                          {{ currentStory.d[1] }}
                        </p>
                        <p class="my-5 bg-grey-darken-3 pa-3 rounded-lg elevation-1">
                          {{ currentStory.d[2] }}
                        </p>
                        <v-divider class="my-5"></v-divider>
                        <p class="my-5 bg-purple-darken-3 pa-3 rounded-lg elevation-1">
                          {{ currentStory.f }}
                        </p>
                        <v-divider class="my-5"></v-divider>
                        <p class="my-5 bg-green-darken-3 pa-3 rounded-lg elevation-1">
                          {{ currentStory.g[0] }}
                        </p>
                        <p class="my-5 bg-grey-darken-3 pa-3 rounded-lg elevation-1">
                          {{ currentStory.g[1] }}
                        </p>
                        <p class="my-5 bg-dark pa-3 rounded-lg elevation-1">
                          {{ currentStory.g[2] }}
                        </p>
                      </v-card-text>
                    </v-card>
                  </v-col>
                </v-row>
              </v-container>
          </v-card>
        </v-col>
        <v-col cols="12" class="d-flex justify-center">
          <v-btn rounded="0" size="x-small" class="h-100" v-if="!nextStory" @click="page = 0" color="text">{{ `THE BIG RESET` }}</v-btn>
        </v-col>
      </v-row>
    </v-container>

    <v-app-bar scroll-behavior="hide" scroll-threshold="163" app location="bottom" content-class="d-flex justify-center align-center">
      <!-- <v-btn v-if="prevStory" @click="page--" color="primary" icon="mdi-arrow-left" ></v-btn> -->
      <v-btn
        rounded="0"
        v-if="nextStory"
        @click="abrirAto()"
        color="text"
        size="x-small"
        class="flex-grow-1 h-100"
        prepend-icon="mdi-access-point"
      >
        <div class="d-flex align-center">
          <span class="font-weight-bold"> Ler </span>

          <span class="font-weight-bold mx-1">
            {{ nextStory.a }}
          </span>
          <span style="font-size: 7px !important" class="font-weight-thin"> ({{ nextStory.h }}) </span>
        </div>
      </v-btn>
      <v-btn
        :to="{ name: '_____---ato', params: { ato: nextStory.a } }"
        rounded="0"
        size="x-small"
        class="h-100"
        v-if="nextStory"
        @click="page++"
        color="text"
        >{{ nextStory.j }}</v-btn
      >
    </v-app-bar>
  </div>
</template>

<script lang="ts" setup>
import { useAtoStore } from "~/stores/atoStore";
const story = [
  {
    a: "Ato-23",
    t: "A Noite da Escolha",
    r: "Os Três da Encruzilhada descobrem que seus destinos estão prestes a se separar.",
    s: "<v-container fluid>\n  <v-row>\n    <v-col cols='12'>\n      <v-card variant='outlined'>\n        <v-card-title>\n          🛤️ A Noite da Escolha\n        </v-card-title>\n        <v-card-text>\n          <p class='my-5'>\n            O <strong>Mercado da Pedra</strong> fervia sob o peso da noite. Nas vielas estreitas, três figuras caminhavam como sombras que não pertenciam a ninguém.\n          </p>\n          <p class='my-5'>\n            🌊 O primeiro era <strong>Caique do Mar</strong>, um espírito solto, fluindo entre a ordem e o caos. Um <v-chip color='cyan' variant='elevated'>Janus reencarnado</v-chip> com os pés na areia e a mente nas estrelas.\n          </p>\n          <p class='my-5'>\n            🛡️ O segundo, <strong>Dário Roxo</strong>, era a firmeza, a estrutura, a certeza. \n            Um <v-chip color='purple' variant='elevated'>pilar de ordem</v-chip> no meio do imprevisível.\n          </p>\n          <p class='my-5'>\n            ⚡ O terceiro, <strong>Seketi</strong>, era o trovão que não pedia permissão para cair. O <v-chip color='red' variant='elevated'>caos encarnado</v-chip>, sempre à frente, sempre pronto para o impacto.\n          </p>\n          <v-divider class='my-5'></v-divider>\n          <p class='my-5'>\n            Mas naquela noite, <strong>o rumor correu pelo vento.</strong>\n          </p>\n          <v-alert type='info' density='compact' class='my-5'>\n            🗣️ <em>“Um navio parte ao amanhecer, levando algo que pode mudar tudo. O Elixir da Transformação, extraído das profundezas do oceano, capaz de dar alma ao que não tem. Fogo que sente. Ferro que pensa.”</em>\n          </v-alert>\n          <p class='my-5'>\n            🔥 O caos falou primeiro.\n          </p>\n          <v-alert type='warning' density='compact' class='my-5'>\n            <strong>“Se isso for verdade, não podemos deixar passar.”</strong>\n          </v-alert>\n          <p class='my-5'>\n            🌊 Caique sentiu o mar puxando.\n          </p>\n          <v-alert type='success' density='compact' class='my-5'>\n            <strong>“Bora então.”</strong>\n          </v-alert>\n          <v-divider class='my-5'></v-divider>\n          <p class='my-5'>\n            Mas, no instante em que disse isso, <strong>ele viu algo.</strong>\n          </p>\n          <p class='my-5'>\n            📖 No alto da viela, entre as sombras dos templos antigos, \n            <v-chip color='orange' variant='elevated'>uma bruxa corria</v-chip>, segurando um livro coberto. Mesmo escondido, <strong>ele brilhava.</strong>\n          </p>\n          <p class='my-5'>\n            👁️ O brilho bateu no olhar de Caique. <strong>Ele já tinha visto aquilo antes.</strong>\n          </p>\n          <p class='my-5'>\n            O mar dentro dele se agitou.\n          </p>\n          <v-alert type='info' density='compact' class='my-5'>\n            🏃 <strong>“Vai na frente, eu tenho que ver um bagulho.”</strong>\n          </v-alert>\n          <p class='my-5'>\n            E foi ali que a <v-chip color='blue-darken-4' variant='elevated'>Jornada do Bifurcado</v-chip> começou.\n          </p>\n        </v-card-text>\n      </v-card>\n    </v-col>\n  </v-row>\n</v-container>",
    d: [
      'Dário Roxo observa Caique partir e diz: "Cada um tem seu caminho. O meu ainda está aqui." Ele decide ficar e proteger o que já conhece.',
      "Caique hesita por um momento, sentindo o chamado do livro, mas também o do navio. Ele precisa escolher rápido.",
      'Seketi ri e grita: "O tempo não espera! Quem fica pra trás, some." Ele parte sem olhar para trás.',
    ],
    f: "Os Três da Encruzilhada nunca mais seriam os mesmos. Um seguiu o livro, outro ficou na terra, e o terceiro navegou para o desconhecido. Cada um agora era um pedaço de algo maior do que eles podiam imaginar.",
    g: [
      "Caique descobre que o livro não é só um livro, mas um mapa para algo ainda mais antigo que o Elixir.",
      "O navio nunca chega ao seu destino. Algo no mar os devora antes que possam entender o que carregavam.",
      "Dário Roxo, ao ficar, percebe que sua luta na terra não será contra homens, mas contra algo invisível que sempre controlou tudo.",
    ],
    h: "3 min",
    j: "Seguir o fluxo",
  },
  {
    a: "Ato-22",
    t: "🔥 A Bruxa e a Porta de Fogo",
    r: "Caique segue a bruxa misteriosa até um beco e a encurrala diante de um castelo flamejante.",
    s: "<v-container fluid>\n  <v-row>\n    <v-col cols='12'>\n      <v-card variant='outlined'>\n        <v-card-title>\n          🔥 A Bruxa e a Porta de Fogo\n        </v-card-title>\n        <v-card-text>\n          <p class='my-5'>\n            🌑 O beco era estreito, escuro, um caminho feito pra quem conhece as sombras. \n            A bruxinha corria, segurando o livro contra o peito. Mas <strong>Caique do Mar não era só um andarilho.</strong>\n          </p>\n          <p class='my-5'>\n            🕵️‍♂️ Ele sabia como o tempo fluía, sabia quando pisar leve, sabia quando o mundo não queria que ele fosse visto.\n          </p>\n          <p class='my-5'>\n            Se moveu no silêncio, deslizando entre a noite. <strong>Chegou perto, quase ao alcance da bruxa.</strong>\n          </p>\n          <p class='my-5'>\n            ⚡ Ela sentiu. Girou no susto, os olhos arregalados. Caique viu o medo ali, mas viu outra coisa também: <strong>determinação.</strong>\n          </p>\n          <p class='my-5'>\n            🚀 Antes que ele pudesse dizer algo, <strong>ela saiu correndo de novo.</strong>\n          </p>\n          <v-divider class='my-5'></v-divider>\n          <p class='my-5'>\n            🏔️ Subiu um morro de pedra, os pés ágeis, até que <strong>parou de repente.</strong>\n          </p>\n          <p class='my-5'>\n            🏰 Diante dela, um <strong>castelo de tijolos flamejantes e pedra cinza</strong> se erguia. A luz do fogo brilhava nas paredes, refletindo no livro que ela segurava.\n          </p>\n          <p class='my-5'>\n            📖 Ela olhou pra porta. **Olhou pro mago se aproximando.**\n          </p>\n          <p class='my-5'>\n            ❌ **Não havia saída. Ou ela entrava, ou enfrentava ele.**\n          </p>\n        </v-card-text>\n      </v-card>\n    </v-col>\n  </v-row>\n</v-container>",
    d: [
      "🚪 Ela abre a porta do castelo, sem saber o que há do outro lado, mas preferindo o desconhecido a ser capturada.",
      "👀 Ela encara Caique, respira fundo e decide tentar dialogar, mesmo sem saber se pode confiar nele.",
      "✨ Ela segura o livro contra o peito e invoca uma magia, tentando escapar com um feitiço desesperado.",
    ],
    f: "A bruxa sabia que a decisão dela não era apenas sobre fugir ou lutar. Era sobre o destino do próprio conhecimento que carregava.",
    g: [
      "🏰 O castelo esconde algo mais profundo do que apenas paredes de fogo. Algo que não deveria ser desperto.",
      "🧑‍🦰 Caique descobre que a bruxa não está sozinha e que alguém mais já sabia sobre sua chegada.",
      "📜 O livro carrega uma profecia, e o nome de Caique está escrito nela.",
    ],
    h: "3 min",
    j: "🔓 Abrir a próxima porta",
  },
  {
    a: "Ato-21",
    t: "🌈 A Escada Brilhante e o Olhar Invisível",
    r: "A bruxa entra no castelo e sobe uma escada luminosa, mas percebe que não está sozinha.",
    s: "<v-container fluid>\n  <v-row>\n    <v-col cols='12'>\n      <v-card variant='outlined'>\n        <v-card-title>\n          🌈 A Escada Brilhante e o Olhar Invisível\n        </v-card-title>\n        <v-card-text>\n          <p class='my-5'>\n            📖 A bruxa segurou firme o livro contra o peito e empurrou a porta. <strong>Ela rangeu, mas cedeu.</strong>\n          </p>\n          <p class='my-5'>\n            🏰 Lá dentro, uma <strong>escadaria de madeira</strong> se erguia no silêncio, subindo para o desconhecido. Mas <strong>havia algo diferente ali.</strong>\n          </p>\n          <p class='my-5'>\n            🔥 As chamas das tochas ao lado da escada <strong>não eram normais.</strong> Uma queimava em tons frios, azulados, enquanto a outra era puro vermelho. \n            <v-chip color='blue' variant='elevated'>Gelo</v-chip> + \n            <v-chip color='red' variant='elevated'>Fogo</v-chip> = \n            <v-chip color='white' variant='elevated'>Luz pura</v-chip>, como se ela tivesse encontrado o fim do arco-íris.\n          </p>\n          <p class='my-5'>\n            🪵 O chão de madeira brilhava, apesar da idade, como se cada degrau estivesse marcado por uma energia antiga. <strong>Algo a chamava para cima.</strong>\n          </p>\n          <p class='my-5'>\n            ⬆️ <strong>Ela subiu.</strong>\n          </p>\n          <v-divider class='my-5'></v-divider>\n          <p class='my-5'>\n            🏚️ Ao chegar no topo, viu um cômodo vazio. <strong>Não havia ninguém.</strong>\n          </p>\n          <p class='my-5'>\n            ⏳ Ela sabia que <strong>tinha pouco tempo.</strong> Se aquele mago estivesse atrás dela, ele viria logo. <strong>Precisava se proteger.</strong>\n          </p>\n          <p class='my-5'>\n            🌿 Pegou as ervas da sua bolsa e começou o feitiço. <strong>Uma barreira mágica</strong>, sutil, mas forte o bastante para manter o desconhecido do lado de fora.\n          </p>\n          <p class='my-5'>\n            🔮 Ela sussurrou as palavras certas, o cheiro das ervas queimando no ar, a energia se espalhando. <strong>Estava quase terminando...</strong>\n          </p>\n          <v-divider class='my-5'></v-divider>\n          <p class='my-5'>\n            👁️ **Foi quando sentiu.**\n          </p>\n          <p class='my-5'>\n            ⚡ Alguém <strong>a observava.</strong>\n          </p>\n          <p class='my-5'>\n            ❄️ O arrepio subiu pela espinha.\n          </p>\n          <p class='my-5'>\n            😨 Ela girou o corpo, o coração acelerado.\n          </p>\n          <v-alert type='error' density='compact' class='my-5'>\n            **“AAAAAAH!”**\n          </v-alert>\n          <p class='my-5'>\n            🔊 Um grito rasgou o silêncio. <strong>**E não era dela.**</strong>\n          </p>\n        </v-card-text>\n      </v-card>\n    </v-col>\n  </v-row>\n</v-container>",
    d: [
      '🛡️ Ela recua, levanta as mãos prontas para se defender e pergunta: "Quem está aí?!"',
      "👀 Ela agarra o livro e se esconde, tentando descobrir quem a observava antes que seja tarde.",
      "✨ Ela termina o feitiço às pressas e se prepara para fugir, mas algo dentro dela diz que precisa encarar o que está acontecendo.",
    ],
    f: "O castelo não estava vazio. E o que quer que estivesse lá dentro sabia que ela havia chegado.",
    g: [
      "👹 A voz que gritou não era humana.",
      "🕰️ O verdadeiro dono do castelo acaba de acordar.",
      "🌊 O grito era de Caique do Mar, que entrou sem ela perceber.",
    ],
    h: "3 min",
    j: "👀 Encarar o desconhecido",
  },
  {
    a: "Ato-20",
    t: "🍵 O Guardião do Castelo e o Chá do Destino",
    r: "A bruxa descobre que estava sendo guiada para o castelo o tempo todo e recebe um convite inusitado.",
    s: "<v-container fluid>\n  <v-row>\n    <v-col cols='12'>\n      <v-card variant='outlined'>\n        <v-card-title>\n          🍵 O Guardião do Castelo e o Chá do Destino\n        </v-card-title>\n        <v-card-text>\n          <p class='my-5'>\n            🔊 O grito ecoou pelo salão, e a bruxa sentiu o coração saltar.\n          </p>\n          <v-alert type='error' density='compact' class='my-5'>\n            **“EI! PARA COM ISSO AGORA!”**\n          </v-alert>\n          <p class='my-5'>\n            😨 Ela congelou. <strong>O mago estava ali, ofegante, olhando para a fumaça que subia das ervas queimadas.</strong>\n          </p>\n          <v-alert type='warning' density='compact' class='my-5'>\n            **“Você não pode acender esse tipo de erva aqui! Tem um feiticeiro do mal que fareja isso a quilômetros. Se ele sentir esse cheiro, ele vai vir queimar tudo, inclusive você.”**\n          </v-alert>\n          <p class='my-5'>\n            😳 O choque fez a bruxa reagir no reflexo. <strong>Com um movimento rápido, abriu sua bolsa do infinito e sugou toda a fumaça para dentro.</strong> O ar limpou em segundos, e ela finalmente conseguiu respirar.\n          </p>\n          <p class='my-5'>\n            😵‍💫 Virou-se para o mago e perguntou, sem fôlego:\n          </p>\n          <v-alert type='info' density='compact' class='my-5'>\n            **“Desculpa, senhor bruxo… é você que guarda esse castelo?”**\n          </v-alert>\n          <p class='my-5'>\n            🧐 O mago cruzou os braços, levantando uma sobrancelha.\n          </p>\n          <v-alert type='success' density='compact' class='my-5'>\n            **“Sim. E você não sabe que tem campainha, não?”**\n          </v-alert>\n          <p class='my-5'>\n            🙈 **“Ai, meu Deus… desculpa mesmo! Não queria me intrometer, é que eu tava fugindo.”**\n          </p>\n          <p class='my-5'>\n            🤨 Ele estreitou os olhos. <strong>“Fugindo de mim?”</strong>\n          </p>\n          <p class='my-5'>\n            🤔 A bruxa piscou. <strong>“Ah… então era você?”</strong>\n          </p>\n          <p class='my-5'>\n            🤣 O mago jogou a cabeça pra trás e soltou uma gargalhada.\n          </p>\n          <v-alert type='success' density='compact' class='my-5'>\n            **“Ahahahahahah! Sim, era eu, porra! Fiz um spell pra te trazer aqui no meu templo.”**\n          </v-alert>\n          <p class='my-5'>\n            😳 A bruxa arregalou os olhos. <strong>“Então… você me chamou aqui?”</strong>\n          </p>\n          <p class='my-5'>\n            😏 Ele sorriu de canto e deu de ombros. <strong>“E já que você tá aqui… quer um cafezin?”</strong>\n          </p>\n          <p class='my-5'>\n            😃 O susto sumiu do rosto dela, e no lugar veio um brilho nos olhos. <strong>Ela nunca tinha sido convidada para um templo assim.</strong>\n          </p>\n          <v-alert type='info' density='compact' class='my-5'>\n            **“Quero sim, por favor!”**\n          </v-alert>\n          <p class='my-5'>\n            ✨ O mago acenou com a mão e uma chaleira flutuante veio das sombras. <strong>O cheiro do chá preencheu o ar.</strong>\n          </p>\n          <p class='my-5'>\n            🌌 Os dois se sentaram na varanda, <strong>olhando a noite estrelada, como se o destino já tivesse escrito aquele encontro muito antes deles perceberem.</strong>\n          </p>\n        </v-card-text>\n      </v-card>\n    </v-col>\n  </v-row>\n</v-container>",
    d: [
      "🤔 A bruxa aproveita o momento e pergunta ao mago por que ele a trouxe até ali.",
      "🔮 O mago sorri e diz que o destino deles já estava selado, mas que ela precisa entender o que está acontecendo.",
      "🍵 Os dois bebem o chá em silêncio, esperando que a conversa revele o próximo passo.",
    ],
    f: "🌙 A noite avançava, mas o verdadeiro mistério só estava começando. O encontro deles não era um acaso.",
    g: [
      "📜 O mago explica que a bruxa carrega algo que ele precisa.",
      "🌀 A bruxa percebe que já esteve naquele castelo antes, mas não se lembra quando.",
      "🔥 O feiticeiro que fareja a fumaça começa a se mover na direção deles.",
    ],
    h: "4 min",
    j: "🍵 Tomar um gole e continuar",
  },
  {
    a: "Ato-19",
    t: "🎭 O Feitiço do Medo e a Tiração de Onda",
    r: "A bruxa descobre que foi enganada e decide dar o troco no mago.",
    s: "<v-container fluid>\n  <v-row>\n    <v-col cols='12'>\n      <v-card variant='outlined'>\n        <v-card-title>\n          🎭 O Feitiço do Medo e a Tiração de Onda\n        </v-card-title>\n        <v-card-text>\n          <p class='my-5'>\n            ☕ O café tava quente, a brisa soprava leve, e a conversa fluiu sem pressa. O mago pegou um punhado de ervas da mesa, amassou entre os dedos e falou casualmente:\n          </p>\n          <v-alert type='info' density='compact' class='my-5'>\n            **“Vou acender um aqui pra nossa proteção.”**\n          </v-alert>\n          <p class='my-5'>\n            😨 A bruxa travou na hora. Os olhos arregalaram, e a xícara quase escorregou da mão.\n          </p>\n          <v-alert type='warning' density='compact' class='my-5'>\n            **“Apaga isso! Tenho medo do feiticeiro do mal do fim do morro!”**\n          </v-alert>\n          <p class='my-5'>\n            🤣 O mago congelou por um segundo. Depois, <strong>se jogou pra trás numa gargalhada tão forte que quase caiu da cadeira.</strong>\n          </p>\n          <v-alert type='success' density='compact' class='my-5'>\n            **“AHAHAHAHAHAHAHAHAH! MEU DEUS, BRUXINHA, TU CAIU BONITO!”**\n          </v-alert>\n          <p class='my-5'>\n            😡 A bruxa ficou vermelha na hora. <strong>“Tô falando sério, eu tenho medo real!”</strong>\n          </p>\n          <p class='my-5'>\n            🤭 O mago enxugou uma lágrima do olho e balançou a cabeça, ainda rindo.\n          </p>\n          <v-alert type='success' density='compact' class='my-5'>\n            **“Eu tava tirando onda com a sua cara, bruxinha. Não tem feiticeiro nenhum.”**\n          </v-alert>\n          <v-divider class='my-5'></v-divider>\n          <p class='my-5'>\n            😶 O silêncio bateu. A bruxa piscou, encarou ele por um segundo. Depois, <strong>se levantou de um pulo e conjurou um feitiço na cara do mago.</strong>\n          </p>\n          <p class='my-5'>\n            💜✨ Uma luz roxa brilhou no ar e **BUM!**\n          </p>\n          <p class='my-5'>\n            🍅 **O rosto do mago ficou completamente vermelho.**\n          </p>\n          <v-alert type='info' density='compact' class='my-5'>\n            **“Agora você vai ver!”**, disse a bruxa, cruzando os braços, segurando um sorriso.\n          </v-alert>\n          <p class='my-5'>\n            😱 O mago olhou pro próprio reflexo no chá, viu a cara vermelha igual pimenta e arregalou os olhos.\n          </p>\n          <v-alert type='error' density='compact' class='my-5'>\n            **“EITA, BRUXINHA, O QUE QUE TU FEZ?!”**\n          </v-alert>\n        </v-card-text>\n      </v-card>\n    </v-col>\n  </v-row>\n</v-container>",
    d: [
      "🔄 O mago tenta reverter o feitiço, mas a bruxa ri e diz que vai deixar ele assim por um tempo.",
      "🤝 O mago aceita a brincadeira e diz que agora são oficialmente amigos de verdade.",
      "💰 A bruxa, ainda emburrada, diz que o mago precisa compensá-la por ter pregado essa peça nela.",
    ],
    f: "✨ A magia que começou como um truque virou o primeiro elo entre os dois. Eles ainda não sabiam, mas algo maior os ligava agora.",
    g: [
      "😈 O mago decide se vingar e prepara um feitiço pra devolver a brincadeira.",
      "📖 A bruxa revela que esse feitiço foi ensinado por alguém muito especial pra ela.",
      "🚪 A brincadeira é interrompida por um barulho estranho vindo do lado de fora.",
    ],
    h: "3 min",
    j: "😂 Ver a reação do mago",
  },
  {
    a: "Ato-18",
    t: "🌕 O Feitiço do Brilho e a Verdade do Tempo",
    r: "A bruxa descobre que o equilíbrio vem da transformação, e o mago a convida para algo maior.",
    s: "<v-container fluid>\n  <v-row>\n    <v-col cols='12'>\n      <v-card variant='outlined'>\n        <v-card-title>\n          🌕 O Feitiço do Brilho e a Verdade do Tempo\n        </v-card-title>\n        <v-card-text>\n          <p class='my-5'>\n            🔥 O mago ainda tentava se acostumar com a própria cara vermelha, enquanto a bruxa cruzava os braços, tentando manter a pose.\n          </p>\n          <v-alert type='error' density='compact' class='my-5'>\n            **“Isso não é justo!”**, ele resmungou, coçando o rosto quente.\n          </v-alert>\n          <v-alert type='success' density='compact' class='my-5'>\n            **“Justíssimo.”**, a bruxa retrucou, segurando o riso.\n          </v-alert>\n          <p class='my-5'>\n            😆 Eles riram e brigaram ao mesmo tempo, uma energia leve fluindo entre eles, como se fossem <strong>duas forças que sempre existiram, mas só agora tinham se encontrado.</strong>\n          </p>\n          <p class='my-5'>\n            🛑 De repente, o mago pausou. Seu olhar ficou distante.\n          </p>\n          <v-alert type='info' density='compact' class='my-5'>\n            **“Olha pro céu.”**\n          </v-alert>\n          <p class='my-5'>\n            🌕 A bruxa, ainda meio desconfiada, ergueu o rosto.\n          </p>\n          <p class='my-5'>\n            ✨ <strong>A lua brilhava como nunca.</strong>\n          </p>\n          <p class='my-5'>\n            Era um brilho antigo, um brilho primordial. <strong>Uma força que falava direto com a alma.</strong>\n          </p>\n          <p class='my-5'>\n            💫 Por um instante, <strong>a bruxa sentiu algo que não sentia há muito tempo.</strong> Como se um fio invisível a ligasse a tudo ao redor. O vento, a luz, a própria terra.\n          </p>\n          <p class='my-5'>\n            😌 O mago viu o encanto nos olhos dela e sorriu.\n          </p>\n          <v-alert type='success' density='compact' class='my-5'>\n            **“É assim que eu entro em equilíbrio com você.”**\n          </v-alert>\n          <p class='my-5'>\n            🤨 A bruxa o encarou, sem entender.\n          </p>\n          <v-alert type='info' density='compact' class='my-5'>\n            **“Te fiz ficar vermelha pra você conseguir brilhar agora.”**\n          </v-alert>\n          <p class='my-5'>\n            💡 A bruxa olhou para as próprias mãos, para a luz ao seu redor. <strong>O feitiço da vermelhidão virou o feitiço do brilho.</strong>\n          </p>\n          <p class='my-5'>\n            😊 Ela sorriu, sentindo a energia pulsar dentro dela.\n          </p>\n          <p class='my-5'>\n            ⏳ O mago cruzou os braços e completou:\n          </p>\n          <v-alert type='info' density='compact' class='my-5'>\n            **“A ordem certa dos fatores importa quando você entende como o tempo funciona.”**\n          </v-alert>\n          <p class='my-5'>\n            🕰️ Ele respirou fundo e então disse, mais sério:\n          </p>\n          <v-alert type='warning' density='compact' class='my-5'>\n            **“E não podemos perder tempo. Tenho algo pra te mostrar.”**\n          </v-alert>\n        </v-card-text>\n      </v-card>\n    </v-col>\n  </v-row>\n</v-container>",
    d: [
      "😊 A bruxa sorri e segue o mago, curiosa para saber o que ele quer mostrar.",
      "🤔 A bruxa hesita e pergunta ao mago se ela pode realmente confiar nele.",
      "🌕 A bruxa olha para a lua mais uma vez e sente que tem algo maior em jogo, mas não sabe se deve seguir.",
    ],
    f: "✨ O brilho da lua revelou mais do que um momento. Foi um sinal de que o destino deles já estava entrelaçado.",
    g: [
      "📚 O mago a leva até uma biblioteca secreta, onde guardam os registros perdidos do tempo.",
      "👁️ O mago revela que há um terceiro mago, observando-os de longe.",
      "🌀 O tempo começa a se distorcer ao redor deles, mostrando que algo maior está se movendo.",
    ],
    h: "4 min",
    j: "🚀 Seguir o mago",
  },
];

const page = ref(0);
const route = useRoute();
const currentStory = computed(() => story.find((a) => a.a === route.params.ato));
const nextStory = computed(() => story.find((a) => a.a === `Ato-${parseInt(String(route.params.ato).split("-")[1]) - 1}`));
// const shouldOpen = computed(() => !currentStory.value)
const atoStore = useAtoStore();

function abrirAto() {
  if (!currentStory.value) return;
  atoStore.atosLidos.push(currentStory.value.a);
  if (!nextStory.value) return;
  atoStore.abrirAto(nextStory.value.a);
  page.value++;
  const router = useRouter();
  router.push(`/_____--/${nextStory.value.a}`);
}
</script>

<style></style>
