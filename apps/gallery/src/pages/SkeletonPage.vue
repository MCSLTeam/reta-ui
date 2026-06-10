<script setup lang="ts">
import { RAvatar, RPanel, RSkeleton } from "reta-ui";
import GalleryDocPage from "../components/GalleryDocPage.vue";
</script>

<template>
  <GalleryDocPage>
    <template #effects>
      <r-panel class="doc-section" shadow="hover">
        <template #header><h2>{{ $t("gallery.sections.basic") }}</h2></template>
        <div class="skeleton-stack">
          <r-skeleton :lines="3" height="14px" />
          <r-skeleton width="64%" height="16px" />
          <r-skeleton width="36%" height="28px" :rounded="false" />
        </div>
      </r-panel>
    </template>

    <template #demo>
      <r-panel class="doc-section" shadow="hover">
        <template #header><h2>{{ $t("gallery.sections.example") }}</h2></template>
        <div class="skeleton-card">
          <r-avatar text="LD" />
          <div>
            <r-skeleton width="44%" height="15px" />
            <r-skeleton :lines="3" height="12px" />
          </div>
        </div>
      </r-panel>
    </template>
  </GalleryDocPage>
</template>

<style scoped lang="scss">
.skeleton-stack {
  display: grid;
  gap: 12px;
}

.skeleton-card {
  display: grid;
  grid-template-columns: auto minmax(0, 1fr);
  gap: 14px;
  align-items: start;
}
</style>
