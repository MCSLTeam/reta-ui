<script setup lang="ts">
import { RButton, RButtonGroup, RDropdownMenu, RPanel } from "reta-ui";
import GalleryDocPage from "../components/GalleryDocPage.vue";

const menu = [
  { label: "Open settings", icon: "fas fa-gear" },
  { label: "Duplicate instance", icon: "fas fa-copy" },
  { label: "Archive", icon: "fas fa-box-archive", disabled: true },
];

const groupedMenu = [
  {
    group: "Instance",
    items: [
      { label: "Start", icon: "fas fa-play" },
      { label: "Restart", icon: "fas fa-rotate-right" },
    ],
  },
  {
    group: "Danger",
    items: [{ label: "Delete", icon: "fas fa-trash", color: "danger" }],
  },
];
</script>

<template>
  <GalleryDocPage>
    <template #effects>
      <r-panel class="doc-section" shadow="hover">
        <template #header><h2>{{ $t("gallery.sections.basic") }}</h2></template>
        <div class="overlay-row">
          <r-dropdown-menu :menu="menu">
            <template #triggerer="{ toggle }">
              <r-button icon="fas fa-ellipsis" @click="toggle">Default</r-button>
            </template>
          </r-dropdown-menu>
          <r-dropdown-menu :menu="groupedMenu" default-pos="top">
            <template #triggerer="{ toggle }">
              <r-button icon="fas fa-arrow-up" @click="toggle">Top</r-button>
            </template>
          </r-dropdown-menu>
        </div>
      </r-panel>
    </template>

    <template #demo>
      <r-panel class="doc-section" shadow="hover">
        <template #header><h2>{{ $t("gallery.sections.example") }}</h2></template>
        <r-button-group>
          <r-button type="primary" color="primary">Start</r-button>
          <r-dropdown-menu :menu="groupedMenu">
            <template #triggerer="{ toggle }">
              <r-button icon="fas fa-angle-down" squared @click="toggle" />
            </template>
          </r-dropdown-menu>
        </r-button-group>
      </r-panel>
    </template>
  </GalleryDocPage>
</template>

<style scoped lang="scss">
.overlay-row {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  align-items: center;
}
</style>
