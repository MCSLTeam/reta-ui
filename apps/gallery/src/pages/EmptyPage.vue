<script setup lang="ts">
import { RButton, REmpty } from "reta-ui";
import GalleryDocPage from "../components/GalleryDocPage.vue";
import GalleryExample from "../components/GalleryExample.vue";
</script>

<template>
  <GalleryDocPage>
    <template #effects>
      <GalleryExample :title="$t('gallery.sections.basic')">
        <div class="empty-grid">
          <r-empty title="No running instances" description="Start or import an instance to continue." />
          <r-empty title="No backups" description="Create a backup schedule before production launch." icon="fas fa-clock-rotate-left" />
        </div>
      </GalleryExample>
    </template>

    <template #demo>
      <GalleryExample :title="$t('gallery.sections.example')">
        <r-empty
          title="No running instances"
          description="Create a new instance or import an existing configuration."
        >
          <r-button type="primary" color="primary" icon="fas fa-plus">Create Instance</r-button>
        </r-empty>
      </GalleryExample>
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
