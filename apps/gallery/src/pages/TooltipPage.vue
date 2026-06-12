<script setup lang="ts">
import { RButton, RTooltip } from "reta-ui";
import GalleryDocPage from "../components/GalleryDocPage.vue";
import GalleryExample from "../components/GalleryExample.vue";
</script>

<template>
  <GalleryDocPage>
    <template #effects>
      <GalleryExample :title="$t('gallery.sections.basic')">
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
      </GalleryExample>
    </template>

    <template #demo>
      <GalleryExample :title="$t('gallery.sections.example')">
        <r-tooltip content="Helpful detail for this action.">
          <template #triggerer="{ open, close }">
            <r-button icon="fas fa-circle-info" @mouseenter="open" @mouseleave="close">
              Hover me
            </r-button>
          </template>
        </r-tooltip>
      </GalleryExample>
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
