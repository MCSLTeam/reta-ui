<script setup lang="ts">
import { RText } from "reta-ui";
import GalleryDocPage from "../components/GalleryDocPage.vue";
import GalleryExample from "../components/GalleryExample.vue";
</script>

<template>
  <GalleryDocPage>
    <template #effects>
      <GalleryExample :title="$t('gallery.sections.basic')">
        <div class="text-stack">
          <r-text as="h3" size="xl" weight="semibold">Operational text rhythm</r-text>
          <r-text type="secondary">
            Text keeps dense interfaces readable without creating new layout primitives.
          </r-text>
          <r-text type="tertiary" size="sm">Secondary metadata can stay quiet and scannable.</r-text>
        </div>
      </GalleryExample>
    </template>

    <template #demo>
      <GalleryExample :title="$t('gallery.sections.example')">
        <div class="text-grid">
          <r-text gradient size="xl" weight="bold">Gradient status headline</r-text>
          <r-text highlight highlight-color="warning">Highlighted maintenance window</r-text>
          <r-text code>java -Xmx4G -jar server.jar</r-text>
          <r-text type="success" weight="semibold">Deployment completed</r-text>
          <r-text type="danger" delete>Deprecated endpoint</r-text>
          <r-text underline type="help">Linked inline guidance</r-text>
        </div>
      </GalleryExample>
    </template>
  </GalleryDocPage>
</template>

<style scoped lang="scss">
.text-stack,
.text-grid {
  display: grid;
  gap: 12px;
}

.text-grid {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

@media (max-width: 720px) {
  .text-grid {
    grid-template-columns: 1fr;
  }
}
</style>
