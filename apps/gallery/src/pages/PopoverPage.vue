<script setup lang="ts">
import { RButton, RMessage, RPanel, RPopover, RTag } from "reta-ui";
import GalleryDocPage from "../components/GalleryDocPage.vue";
</script>

<template>
  <GalleryDocPage>
    <template #effects>
      <r-panel class="doc-section" shadow="hover">
        <template #header><h2>{{ $t("gallery.sections.basic") }}</h2></template>
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
      </r-panel>
    </template>

    <template #demo>
      <r-panel class="doc-section" shadow="hover">
        <template #header><h2>{{ $t("gallery.sections.example") }}</h2></template>
        <r-popover title="Inspector">
          <template #triggerer="{ toggle }">
            <r-button icon="fas fa-magnifying-glass-chart" @click="toggle">Open Popover</r-button>
          </template>
          <div class="popover-body">
            <r-tag color="success">Running</r-tag>
            <span>12 players · 41 ms latency</span>
          </div>
        </r-popover>
      </r-panel>
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
