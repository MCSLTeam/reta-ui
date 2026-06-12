<script setup lang="ts">
import { RButton, RMessage, RPopover, RTag } from "reta-ui";
import GalleryDocPage from "../components/GalleryDocPage.vue";
import GalleryExample from "../components/GalleryExample.vue";
</script>

<template>
  <GalleryDocPage>
    <template #effects>
      <GalleryExample :title="$t('gallery.sections.basic')">
        <div class="overlay-row">
          <r-popover title="Inspector">
            <template #triggerer="{ toggle }">
              <r-button @click="toggle">Bottom</r-button>
            </template>
            <r-message color="help" variant="text">Compact contextual content.</r-message>
          </r-popover>
          <r-popover title="Status" default-pos="right">
            <template #triggerer="{ toggle }">
              <r-button @click="toggle">Right</r-button>
            </template>
            <r-tag color="success">Online</r-tag>
          </r-popover>
        </div>
      </GalleryExample>
    </template>

    <template #demo>
      <GalleryExample :title="$t('gallery.sections.example')">
        <r-popover title="Inspector">
          <template #triggerer="{ toggle }">
            <r-button icon="fas fa-magnifying-glass-chart" @click="toggle">Open Popover</r-button>
          </template>
          <div class="popover-body">
            <r-tag color="success">Running</r-tag>
            <span>12 players · 41 ms latency</span>
          </div>
        </r-popover>
      </GalleryExample>
    </template>
  </GalleryDocPage>
</template>

<style scoped lang="scss">
.overlay-row,
.popover-body {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  align-items: center;
}

.popover-body {
  color: var(--mcsl-text-color-regular);
}
</style>
