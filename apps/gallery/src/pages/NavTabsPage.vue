<script setup lang="ts">
import { RNavTabs, RPanel } from "reta-ui";
import GalleryDocPage from "../components/GalleryDocPage.vue";

const tabs = [
  { label: "Details", icon: "fas fa-circle-info" },
  { label: "Metrics", icon: "fas fa-chart-line" },
  { label: "History", icon: "fas fa-clock-rotate-left" },
  { label: "Danger", icon: "fas fa-triangle-exclamation", disabled: true },
];
</script>

<template>
  <GalleryDocPage>
    <template #effects>
      <r-panel class="doc-section" shadow="hover">
        <template #header><h2>{{ $t("gallery.sections.basic") }}</h2></template>
        <div class="tabs-stack">
          <r-nav-tabs :tabs="tabs" size="small" />
          <r-nav-tabs :tabs="tabs" />
          <r-nav-tabs :tabs="tabs" size="large" color="help" />
        </div>
      </r-panel>
    </template>

    <template #demo>
      <r-panel class="doc-section" shadow="hover">
        <template #header><h2>{{ $t("gallery.sections.example") }}</h2></template>
        <r-nav-tabs :tabs="tabs" shadow="hover" />
      </r-panel>
    </template>
  </GalleryDocPage>
</template>

<style scoped lang="scss">
.tabs-stack {
  display: grid;
  gap: 14px;
  justify-items: start;
}
</style>
