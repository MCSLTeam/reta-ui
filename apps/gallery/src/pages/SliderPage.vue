<script setup lang="ts">
import { RPanel, RSlider } from "reta-ui";
import { ref } from "vue";
import GalleryDocPage from "../components/GalleryDocPage.vue";

const memory = ref(36);
const cpu = ref(72);
</script>

<template>
  <GalleryDocPage>
    <template #effects>
      <r-panel class="doc-section" shadow="hover">
        <template #header><h2>{{ $t("gallery.sections.basic") }}</h2></template>
        <div class="slider-stack">
          <r-slider v-model="memory" :min="0" :max="100" />
          <r-slider v-model="cpu" :min="0" :max="100" :step="4" />
        </div>
      </r-panel>
    </template>

    <template #demo>
      <r-panel class="doc-section" shadow="hover">
        <template #header><h2>{{ $t("gallery.sections.example") }}</h2></template>
        <div class="slider-stack">
          <r-slider v-model="memory" :min="0" :max="100" />
          <r-slider v-model="cpu" :min="0" :max="100" disabled />
        </div>
      </r-panel>
    </template>
  </GalleryDocPage>
</template>

<style scoped lang="scss">
.slider-stack {
  display: grid;
  gap: 18px;
}
</style>
