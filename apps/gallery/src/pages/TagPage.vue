<script setup lang="ts">
import { RBadge, RButton, RPanel, RTag } from "reta-ui";
import GalleryDocPage from "../components/GalleryDocPage.vue";
</script>

<template>
  <GalleryDocPage>
    <template #effects>
      <r-panel class="doc-section" shadow="hover">
        <template #header><h2>{{ $t("gallery.sections.basic") }}</h2></template>
        <div class="tag-row">
          <r-tag color="surface">Surface</r-tag>
          <r-tag color="primary">Primary</r-tag>
          <r-tag color="success">Healthy</r-tag>
          <r-tag color="warning">Warning</r-tag>
          <r-tag color="danger">Danger</r-tag>
          <r-tag color="help">Help</r-tag>
        </div>
      </r-panel>
    </template>

    <template #demo>
      <r-panel class="doc-section" shadow="hover">
        <template #header><h2>{{ $t("gallery.sections.example") }}</h2></template>
        <div class="tag-row">
          <r-badge value="8" color="danger">
            <r-button icon="fas fa-bell">Notifications</r-button>
          </r-badge>
          <r-tag color="success">Running</r-tag>
          <r-tag color="primary">Java 21</r-tag>
          <r-tag color="help">Paper</r-tag>
        </div>
      </r-panel>
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
