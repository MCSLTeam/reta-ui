<script setup lang="ts">
import { RAvatar, RBadge, RPanel } from "reta-ui";
import GalleryDocPage from "../components/GalleryDocPage.vue";
</script>

<template>
  <GalleryDocPage>
    <template #effects>
      <r-panel class="doc-section" shadow="hover">
        <template #header><h2>{{ $t("gallery.sections.basic") }}</h2></template>
        <div class="avatar-row">
          <r-avatar text="RF" :size="32" />
          <r-avatar text="WS" />
          <r-avatar text="OP" :size="56" />
          <r-badge value="3" color="success">
            <r-avatar text="AD" />
          </r-badge>
        </div>
      </r-panel>
    </template>

    <template #demo>
      <r-panel class="doc-section" shadow="hover">
        <template #header><h2>{{ $t("gallery.sections.example") }}</h2></template>
        <div class="avatar-list">
          <div class="avatar-item"><r-avatar text="RF" /><span>Reta Future</span></div>
          <div class="avatar-item"><r-avatar text="EU" /><span>Paper EU-1</span></div>
          <div class="avatar-item"><r-avatar text="DV" /><span>Development</span></div>
        </div>
      </r-panel>
    </template>
  </GalleryDocPage>
</template>

<style scoped lang="scss">
.avatar-row,
.avatar-list {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  align-items: center;
}

.avatar-list {
  flex-direction: column;
  align-items: stretch;
}

.avatar-item {
  display: flex;
  align-items: center;
  gap: 12px;
  color: var(--mcsl-text-color-regular);
}
</style>
