<script setup lang="ts">
import { RAvatar, RBadge } from "reta-ui";
import GalleryDocPage from "../components/GalleryDocPage.vue";
import GalleryExample from "../components/GalleryExample.vue";
</script>

<template>
  <GalleryDocPage>
    <template #effects>
      <GalleryExample :title="$t('gallery.sections.basic')">
        <div class="avatar-row">
          <r-avatar text="RF" :size="32" />
          <r-avatar text="WS" />
          <r-avatar text="OP" :size="56" />
          <r-badge value="3" color="success">
            <r-avatar text="AD" />
          </r-badge>
        </div>
      </GalleryExample>
    </template>

    <template #demo>
      <GalleryExample :title="$t('gallery.sections.example')">
        <div class="avatar-list">
          <div class="avatar-item"><r-avatar text="RF" /><span>Reta Future</span></div>
          <div class="avatar-item"><r-avatar text="EU" /><span>Paper EU-1</span></div>
          <div class="avatar-item"><r-avatar text="DV" /><span>Development</span></div>
        </div>
      </GalleryExample>
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
