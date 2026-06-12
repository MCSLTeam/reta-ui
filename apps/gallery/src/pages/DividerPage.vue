<script setup lang="ts">
import { RDivider } from "reta-ui";
import GalleryDocPage from "../components/GalleryDocPage.vue";
import GalleryExample from "../components/GalleryExample.vue";
</script>

<template>
  <GalleryDocPage>
    <template #effects>
      <GalleryExample :title="$t('gallery.sections.basic')">
        <div class="divider-stack">
          <r-divider spacing="xs" />
          <r-divider spacing="sm" variant="dashed">Runtime</r-divider>
          <r-divider spacing="sm" variant="dotted" text-pos="start">Advanced</r-divider>
        </div>
      </GalleryExample>
    </template>

    <template #demo>
      <GalleryExample :title="$t('gallery.sections.example')">
        <div class="divider-demo">
          <p>Instance settings</p>
          <r-divider spacing="md">Network</r-divider>
          <p>Port, address, and proxy configuration</p>
          <r-divider spacing="md" text-pos="end">Danger Zone</r-divider>
          <p>Destructive operations stay visually separated.</p>
        </div>
      </GalleryExample>
    </template>
  </GalleryDocPage>
</template>

<style scoped lang="scss">
.divider-stack,
.divider-demo {
  display: grid;
  gap: 6px;
}

p {
  margin: 0;
  color: var(--mcsl-text-color-regular);
}
</style>
