<script setup lang="ts">
import { RNavTabs } from "reta-ui";
import GalleryDocPage from "../components/GalleryDocPage.vue";
import GalleryExample from "../components/GalleryExample.vue";

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
      <GalleryExample :title="$t('gallery.sections.basic')">
        <div class="tabs-stack">
          <r-nav-tabs :tabs="tabs" size="small" />
          <r-nav-tabs :tabs="tabs" />
          <r-nav-tabs :tabs="tabs" size="large" color="help" />
        </div>
      </GalleryExample>
    </template>

    <template #demo>
      <GalleryExample :title="$t('gallery.sections.example')">
        <r-nav-tabs :tabs="tabs" shadow="hover" />
      </GalleryExample>
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
