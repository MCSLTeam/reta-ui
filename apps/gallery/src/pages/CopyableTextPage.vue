<script setup lang="ts">
import { RCopyableText } from "reta-ui";
import GalleryDocPage from "../components/GalleryDocPage.vue";
import GalleryExample from "../components/GalleryExample.vue";
</script>

<template>
  <GalleryDocPage>
    <template #effects>
      <GalleryExample :title="$t('gallery.sections.basic')">
        <div class="copy-stack">
          <r-copyable-text size="small">reta-ui</r-copyable-text>
          <r-copyable-text>paper-1.21.1-43.jar</r-copyable-text>
          <r-copyable-text size="large">ws://127.0.0.1:25567/daemon</r-copyable-text>
        </div>
      </GalleryExample>
    </template>

    <template #demo>
      <GalleryExample :title="$t('gallery.sections.example')">
        <r-copyable-text>Reta UI</r-copyable-text>
      </GalleryExample>
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
