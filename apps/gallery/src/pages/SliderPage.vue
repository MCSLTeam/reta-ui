<script setup lang="ts">
import { Panel, Slider } from "@mcsl/ui";
import { ref } from "vue";
import GalleryDocPage from "../components/GalleryDocPage.vue";

const memory = ref(36);
const cpu = ref(72);
</script>

<template>
  <GalleryDocPage>
    <template #effects>
      <Panel class="doc-section" shadow="hover">
        <template #header><h2>基础</h2></template>
        <div class="slider-stack">
          <Slider v-model="memory" :min="0" :max="100" />
          <Slider v-model="cpu" :min="0" :max="100" :step="4" />
        </div>
      </Panel>
    </template>

    <template #demo>
      <Panel class="doc-section" shadow="hover">
        <template #header><h2>示例</h2></template>
        <div class="slider-stack">
          <Slider v-model="memory" :min="0" :max="100" />
          <Slider v-model="cpu" :min="0" :max="100" disabled />
        </div>
      </Panel>
    </template>
  </GalleryDocPage>
</template>

<style scoped lang="scss">
.slider-stack {
  display: grid;
  gap: 18px;
}
</style>
