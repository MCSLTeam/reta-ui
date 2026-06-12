<script setup lang="ts">
import { RSlider } from "reta-ui";
import { ref } from "vue";
import GalleryDocPage from "../components/GalleryDocPage.vue";
import GalleryExample from "../components/GalleryExample.vue";

const memory = ref(36);
const cpu = ref(72);
</script>

<template>
  <GalleryDocPage>
    <template #effects>
      <GalleryExample :title="$t('gallery.sections.basic')">
        <div class="slider-stack">
          <r-slider v-model="memory" :min="0" :max="100" />
          <r-slider v-model="cpu" :min="0" :max="100" :step="4" />
        </div>
      </GalleryExample>
    </template>

    <template #demo>
      <GalleryExample :title="$t('gallery.sections.example')">
        <div class="slider-stack">
          <r-slider v-model="memory" :min="0" :max="100" />
          <r-slider v-model="cpu" :min="0" :max="100" disabled />
        </div>
      </GalleryExample>
    </template>
  </GalleryDocPage>
</template>

<style scoped lang="scss">
.slider-stack {
  display: grid;
  gap: 18px;
}
</style>
