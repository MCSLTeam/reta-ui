<script setup lang="ts">
import { RDivider, RPanel } from "reta-ui";
import GalleryDocPage from "../components/GalleryDocPage.vue";
</script>

<template>
  <GalleryDocPage>
    <template #effects>
      <r-panel class="doc-section" shadow="hover">
        <template #header><h2>{{ $t("gallery.sections.basic") }}</h2></template>
        <div class="divider-stack">
          <r-divider spacing="xs" />
          <r-divider spacing="sm" variant="dashed">Runtime</r-divider>
          <r-divider spacing="sm" variant="dotted" text-pos="start">Advanced</r-divider>
        </div>
      </r-panel>
    </template>

    <template #demo>
      <r-panel class="doc-section" shadow="hover">
        <template #header><h2>{{ $t("gallery.sections.example") }}</h2></template>
        <div class="divider-demo">
          <p>Instance settings</p>
          <r-divider spacing="md">Network</r-divider>
          <p>Port, address, and proxy configuration</p>
          <r-divider spacing="md" text-pos="end">Danger Zone</r-divider>
          <p>Destructive operations stay visually separated.</p>
        </div>
      </r-panel>
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
