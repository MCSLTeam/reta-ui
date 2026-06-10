<script setup lang="ts">
import { RCopyableText, RPanel } from "reta-ui";
import GalleryDocPage from "../components/GalleryDocPage.vue";
</script>

<template>
  <GalleryDocPage>
    <template #effects>
      <r-panel class="doc-section" shadow="hover">
        <template #header><h2>{{ $t("gallery.sections.basic") }}</h2></template>
        <div class="copy-stack">
          <r-copyable-text size="small">reta-ui</r-copyable-text>
          <r-copyable-text>paper-1.21.1-43.jar</r-copyable-text>
          <r-copyable-text size="large">ws://127.0.0.1:25567/daemon</r-copyable-text>
        </div>
      </r-panel>
    </template>

    <template #demo>
      <r-panel class="doc-section" shadow="hover">
        <template #header><h2>{{ $t("gallery.sections.example") }}</h2></template>
        <r-copyable-text>Reta UI</r-copyable-text>
      </r-panel>
    </template>
  </GalleryDocPage>
</template>

<style scoped lang="scss">
.copy-stack {
  display: grid;
  gap: 10px;
  justify-items: start;
}
</style>
