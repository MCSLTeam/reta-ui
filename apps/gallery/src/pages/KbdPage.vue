<script setup lang="ts">
import { RKbd } from "reta-ui";
import GalleryDocPage from "../components/GalleryDocPage.vue";
import GalleryExample from "../components/GalleryExample.vue";
</script>

<template>
  <GalleryDocPage>
    <template #effects>
      <GalleryExample :title="$t('gallery.sections.basic')">
        <div class="kbd-row">
          <r-kbd size="small">Esc</r-kbd>
          <r-kbd>Ctrl</r-kbd>
          <r-kbd>K</r-kbd>
          <r-kbd>Enter</r-kbd>
        </div>
      </GalleryExample>
    </template>

    <template #demo>
      <GalleryExample :title="$t('gallery.sections.example')">
        <div class="shortcut-list">
          <span><r-kbd>Ctrl</r-kbd><r-kbd>K</r-kbd></span>
          <span>Command palette</span>
          <span><r-kbd>Esc</r-kbd></span>
          <span>Close overlay</span>
        </div>
      </GalleryExample>
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
