<script setup lang="ts">
import { RKbd, RPanel } from "reta-ui";
import GalleryDocPage from "../components/GalleryDocPage.vue";
</script>

<template>
  <GalleryDocPage>
    <template #effects>
      <r-panel class="doc-section" shadow="hover">
        <template #header><h2>{{ $t("gallery.sections.basic") }}</h2></template>
        <div class="kbd-row">
          <r-kbd size="small">Esc</r-kbd>
          <r-kbd>Ctrl</r-kbd>
          <r-kbd>K</r-kbd>
          <r-kbd>Enter</r-kbd>
        </div>
      </r-panel>
    </template>

    <template #demo>
      <r-panel class="doc-section" shadow="hover">
        <template #header><h2>{{ $t("gallery.sections.example") }}</h2></template>
        <div class="shortcut-list">
          <span><r-kbd>Ctrl</r-kbd><r-kbd>K</r-kbd></span>
          <span>Command palette</span>
          <span><r-kbd>Esc</r-kbd></span>
          <span>Close overlay</span>
        </div>
      </r-panel>
    </template>
  </GalleryDocPage>
</template>

<style scoped lang="scss">
.kbd-row,
.shortcut-list span:first-child,
.shortcut-list span:nth-child(3) {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  align-items: center;
}

.shortcut-list {
  display: grid;
  grid-template-columns: auto minmax(0, 1fr);
  gap: 12px 16px;
  align-items: center;
  color: var(--mcsl-text-color-regular);
}
</style>
