<script setup lang="ts">
import { RPanel, RProgressBar, RSpinner } from "reta-ui";
import GalleryDocPage from "../components/GalleryDocPage.vue";
</script>

<template>
  <GalleryDocPage>
    <template #effects>
      <r-panel class="doc-section" shadow="hover">
        <template #header><h2>{{ $t("gallery.sections.basic") }}</h2></template>
        <div class="progress-stack">
          <r-progress-bar :progress="64" status="loading" />
          <r-progress-bar :progress="100" status="success" />
          <r-progress-bar :progress="42" status="warning" />
        </div>
      </r-panel>
    </template>

    <template #demo>
      <r-panel class="doc-section" shadow="hover">
        <template #header><h2>{{ $t("gallery.sections.example") }}</h2></template>
        <div class="progress-stack">
          <r-progress-bar variant="indeterminate" status="loading" />
          <r-progress-bar variant="circle" :progress="72" status="loading" />
          <r-spinner label="Syncing" />
        </div>
      </r-panel>
    </template>
  </GalleryDocPage>
</template>

<style scoped lang="scss">
.progress-stack {
  display: grid;
  gap: 16px;
}
</style>
