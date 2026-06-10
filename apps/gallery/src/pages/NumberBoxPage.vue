<script setup lang="ts">
import { RInputNumber, RPanel } from "reta-ui";
import { ref } from "vue";
import GalleryDocPage from "../components/GalleryDocPage.vue";

const port = ref(25565);
const memory = ref(4096);
const players = ref(20);
</script>

<template>
  <GalleryDocPage>
    <template #effects>
      <r-panel class="doc-section" shadow="hover">
        <template #header><h2>{{ $t("gallery.sections.basic") }}</h2></template>
        <div class="number-grid">
          <r-input-number v-model="port" :min="1" :max="65535" />
          <r-input-number v-model="memory" :step="512" :min="1024" />
          <r-input-number v-model="players" size="small" :min="1" :max="200" />
          <r-input-number v-model="players" disabled />
        </div>
      </r-panel>
    </template>

    <template #demo>
      <r-panel class="doc-section" shadow="hover">
        <template #header><h2>{{ $t("gallery.sections.example") }}</h2></template>
        <div class="number-grid">
          <label class="field">
            <span>Port</span>
            <r-input-number v-model="port" :min="1" :max="65535" />
          </label>
          <label class="field">
            <span>Memory</span>
            <r-input-number v-model="memory" :step="512" :min="1024" />
          </label>
        </div>
      </r-panel>
    </template>
  </GalleryDocPage>
</template>

<style scoped lang="scss">
.number-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px;
}

.field {
  display: grid;
  gap: 8px;
}

.field span {
  color: var(--mcsl-text-color-secondary);
  font-size: var(--mcsl-font-size-sm);
}

@media (max-width: 760px) {
  .number-grid {
    grid-template-columns: 1fr;
  }
}
</style>
