<script setup lang="ts">
import { RAvatar, RSkeleton } from "reta-ui";
import GalleryDocPage from "../components/GalleryDocPage.vue";
import GalleryExample from "../components/GalleryExample.vue";
</script>

<template>
  <GalleryDocPage>
    <template #effects>
      <GalleryExample :title="$t('gallery.sections.basic')">
        <div class="skeleton-stack">
          <r-skeleton :lines="3" height="14px" />
          <r-skeleton width="64%" height="16px" />
          <r-skeleton width="36%" height="28px" :rounded="false" />
        </div>
      </GalleryExample>
    </template>

    <template #demo>
      <GalleryExample :title="$t('gallery.sections.example')">
        <div class="skeleton-card">
          <r-avatar text="LD" />
          <div>
            <r-skeleton width="44%" height="15px" />
            <r-skeleton :lines="3" height="12px" />
          </div>
        </div>
      </GalleryExample>
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
