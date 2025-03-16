<script setup>
import { ref } from "vue";

defineProps({
  isLoading: Boolean
});

const emit = defineEmits(["file-selected"]);
const files = ref(null);

function handleFileUpload() {
  emit("file-selected", files.value);
}
</script>

<template>
  <div>
    <h1 class="title">Organize your expenses in a simple way</h1>
    <v-row justify="center">
      <v-col cols="12" class="mt-5 text-center">
        <v-file-input v-model="files" @change="handleFileUpload" label="File input" :loading="isLoading" />
      </v-col>
    </v-row>
    <p class="subtitle">Drag and drop or click to upload your bank statement</p>
  </div>
</template>

<style lang="scss" scoped>
.title {
  font-family: 'Inter', sans-serif;
  font-size: 32px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 20px;
}

.subtitle {
  font-family: 'Inter', sans-serif;
  font-size: 16px;
  text-align: center;
  color: #666;
  margin-top: 10px;
}
</style>
