<script setup lang="ts">
import { RButton, REmpty, RPanel } from "reta-ui";
import GalleryDocPage from "../components/GalleryDocPage.vue";
</script>

<template>
  <GalleryDocPage>
    <template #effects>
      <r-panel class="doc-section" shadow="hover">
        <template #header><h2>{{ $t("gallery.sections.basic") }}</h2></template>
        <div class="empty-grid">
          <r-empty title="No running instances" description="Start or import an instance to continue." />
          <r-empty title="No backups" description="Create a backup schedule before production launch." icon="fas fa-clock-rotate-left" />
        </div>
      </r-panel>
    </template>

    <template #demo>
      <r-panel class="doc-section" shadow="hover">
        <template #header><h2>{{ $t("gallery.sections.example") }}</h2></template>
        <r-empty
          title="No running instances"
          description="Create a new instance or import an existing configuration."
        >
          <r-button type="primary" color="primary" icon="fas fa-plus">Create Instance</r-button>
        </r-empty>
      </r-panel>
    </template>
  </GalleryDocPage>
</template>

<style scoped lang="scss">
.empty-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px;
}

@media (max-width: 860px) {
  .empty-grid {
    grid-template-columns: 1fr;
  }
}
</style>
