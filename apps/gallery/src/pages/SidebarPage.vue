<script setup lang="ts">
import { RPanel, RSidebar } from "reta-ui";
import GalleryDocPage from "../components/GalleryDocPage.vue";

const pages = [
  { label: "Overview", description: "Status", icon: "fas fa-gauge", link: "/components/sidebar" },
  { label: "Instances", description: "Fleet", icon: "fas fa-server" },
  { label: "Backups", description: "Jobs", icon: "fas fa-clock-rotate-left" },
  { label: "Settings", description: "Policy", icon: "fas fa-gear", disabled: true },
];
</script>

<template>
  <GalleryDocPage>
    <template #effects>
      <r-panel class="doc-section" shadow="hover">
        <template #header><h2>{{ $t("gallery.sections.basic") }}</h2></template>
        <div class="sidebar-grid">
          <r-panel size="small">
            <template #header><h4>Expanded</h4></template>
            <r-sidebar :pages="pages" />
          </r-panel>
          <r-panel size="small" class="collapsed-card">
            <template #header><h4>Collapsed</h4></template>
            <r-sidebar :pages="pages" collapsed />
          </r-panel>
        </div>
      </r-panel>
    </template>

    <template #demo>
      <r-panel class="doc-section" shadow="hover">
        <template #header><h2>{{ $t("gallery.sections.example") }}</h2></template>
        <r-sidebar :pages="pages" />
      </r-panel>
    </template>
  </GalleryDocPage>
</template>

<style scoped lang="scss">
.sidebar-grid {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 96px;
  gap: 14px;
  align-items: start;
}

.collapsed-card {
  justify-self: start;
  width: 78px;
}

@media (max-width: 760px) {
  .sidebar-grid {
    grid-template-columns: 1fr;
  }
}
</style>
