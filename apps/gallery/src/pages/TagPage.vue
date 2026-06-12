<script setup lang="ts">
import { RBadge, RButton, RTag } from "reta-ui";
import GalleryDocPage from "../components/GalleryDocPage.vue";
import GalleryExample from "../components/GalleryExample.vue";
</script>

<template>
  <GalleryDocPage>
    <template #effects>
      <GalleryExample :title="$t('gallery.sections.basic')">
        <div class="tag-row">
          <r-tag color="surface">Surface</r-tag>
          <r-tag color="primary">Primary</r-tag>
          <r-tag color="success">Healthy</r-tag>
          <r-tag color="warning">Warning</r-tag>
          <r-tag color="danger">Danger</r-tag>
          <r-tag color="help">Help</r-tag>
        </div>
      </GalleryExample>
    </template>

    <template #demo>
      <GalleryExample :title="$t('gallery.sections.example')">
        <div class="tag-row">
          <r-badge value="8" color="danger">
            <r-button icon="fas fa-bell">Notifications</r-button>
          </r-badge>
          <r-tag color="success">Running</r-tag>
          <r-tag color="primary">Java 21</r-tag>
          <r-tag color="help">Paper</r-tag>
        </div>
      </GalleryExample>
    </template>
  </GalleryDocPage>
</template>

<style scoped lang="scss">
.tag-row {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  align-items: center;
}
</style>
