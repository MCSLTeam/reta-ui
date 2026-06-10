<script setup lang="ts">
import { RButton, RPanel, RTooltip } from "reta-ui";
import GalleryDocPage from "../components/GalleryDocPage.vue";
</script>

<template>
  <GalleryDocPage>
    <template #effects>
      <r-panel class="doc-section" shadow="hover">
        <template #header><h2>{{ $t("gallery.sections.basic") }}</h2></template>
        <div class="overlay-row">
          <r-tooltip content="Start the selected instance.">
            <template #triggerer="{ open, close }">
              <r-button @mouseenter="open" @mouseleave="close">Top</r-button>
            </template>
          </r-tooltip>
          <r-tooltip content="Opens in a side panel." default-pos="right">
            <template #triggerer="{ open, close }">
              <r-button @mouseenter="open" @mouseleave="close">Right</r-button>
            </template>
          </r-tooltip>
        </div>
      </r-panel>
    </template>

    <template #demo>
      <r-panel class="doc-section" shadow="hover">
        <template #header><h2>{{ $t("gallery.sections.example") }}</h2></template>
        <r-tooltip content="Helpful detail for this action.">
          <template #triggerer="{ open, close }">
            <r-button icon="fas fa-circle-info" @mouseenter="open" @mouseleave="close">
              Hover me
            </r-button>
          </template>
        </r-tooltip>
      </r-panel>
    </template>
  </GalleryDocPage>
</template>

<style scoped lang="scss">
.overlay-row {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}
</style>
