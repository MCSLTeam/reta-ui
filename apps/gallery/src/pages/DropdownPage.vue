<script setup lang="ts">
import { RButton, RButtonGroup, RDropdown } from "reta-ui";
import GalleryDocPage from "../components/GalleryDocPage.vue";
import GalleryExample from "../components/GalleryExample.vue";

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
      <GalleryExample :title="$t('gallery.sections.basic')">
        <div class="overlay-row">
          <r-dropdown :menu="menu">
            <template #triggerer="{ toggle }">
              <r-button icon="fas fa-ellipsis" @click="toggle">Default</r-button>
            </template>
          </r-dropdown>
          <r-dropdown :menu="groupedMenu" default-pos="top">
            <template #triggerer="{ toggle }">
              <r-button icon="fas fa-arrow-up" @click="toggle">Top</r-button>
            </template>
          </r-dropdown>
        </div>
      </GalleryExample>
    </template>

    <template #demo>
      <GalleryExample :title="$t('gallery.sections.example')">
        <r-button-group>
          <r-button type="primary" color="primary">Start</r-button>
          <r-dropdown :menu="groupedMenu">
            <template #triggerer="{ toggle }">
              <r-button icon="fas fa-angle-down" squared @click="toggle" />
            </template>
          </r-dropdown>
        </r-button-group>
      </GalleryExample>
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
