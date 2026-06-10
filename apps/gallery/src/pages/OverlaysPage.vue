<script setup lang="ts">
import { RButton, RDropdownMenu, RPanel, RPopover, RTooltip } from "reta-ui";
import GalleryDocPage from "../components/GalleryDocPage.vue";

const menu = [
  { label: "Open settings", icon: "fas fa-gear" },
  { label: "Duplicate instance", icon: "fas fa-copy" },
  { label: "Archive", icon: "fas fa-box-archive", disabled: true },
];
</script>

<template>
  <GalleryDocPage>
    <template #effects>
      <r-panel class="doc-section" shadow="hover">
        <template #header><h2>{{ $t("gallery.sections.basic") }}</h2></template>
        <div class="overlay-demo">
          <r-dropdown-menu :menu="menu">
            <template #triggerer="{ toggle }">
              <r-button @click="toggle">Dropdown</r-button>
            </template>
          </r-dropdown-menu>
          <r-tooltip content="Fast inline hint.">
            <template #triggerer="{ open, close }">
              <r-button @mouseenter="open" @mouseleave="close">Tooltip</r-button>
            </template>
          </r-tooltip>
          <r-popover title="Inspector">
            <template #triggerer="{ toggle }">
              <r-button @click="toggle">Popover</r-button>
            </template>
            <p class="overlay-note">Compact contextual surface.</p>
          </r-popover>
        </div>
      </r-panel>
    </template>

    <template #demo>
      <r-panel class="doc-section" shadow="hover">
        <template #header><h2>{{ $t("gallery.sections.example") }}</h2></template>
        <div class="overlay-demo">
          <r-dropdown-menu :menu="menu">
            <template #triggerer="{ toggle }">
              <r-button icon="fas fa-ellipsis" @click="toggle">Open Menu</r-button>
            </template>
          </r-dropdown-menu>
          <r-popover title="Instance">
            <template #triggerer="{ toggle }">
              <r-button icon="fas fa-circle-info" @click="toggle">Inspect</r-button>
            </template>
            <p class="overlay-note">Paper EU-1 · Online · 12 players</p>
          </r-popover>
        </div>
      </r-panel>
    </template>
  </GalleryDocPage>
</template>

<style scoped lang="scss">
.overlay-demo {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  align-items: center;
}

.overlay-note {
  margin: 0;
  color: var(--mcsl-text-color-regular);
  line-height: 1.6;
}
</style>
