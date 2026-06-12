<script setup lang="ts">
import { RProgressBar, RSpinner } from "reta-ui";
import GalleryDocPage from "../components/GalleryDocPage.vue";
import GalleryExample from "../components/GalleryExample.vue";
</script>

<template>
  <GalleryDocPage>
    <template #effects>
      <GalleryExample :title="$t('gallery.sections.basic')">
        <div class="progress-stack">
          <r-progress-bar :progress="64" status="loading" />
          <r-progress-bar :progress="100" status="success" />
          <r-progress-bar :progress="42" status="warning" />
        </div>
      </GalleryExample>
    </template>

    <template #demo>
      <GalleryExample :title="$t('gallery.sections.example')">
        <div class="progress-stack">
          <r-progress-bar variant="indeterminate" status="loading" />
          <r-progress-bar variant="circle" :progress="72" status="loading" />
          <r-spinner label="Syncing" />
        </div>
      </GalleryExample>
    </template>
  </GalleryDocPage>
</template>

<style scoped lang="scss">
.progress-stack {
  display: grid;
  gap: 16px;
}
</style>
