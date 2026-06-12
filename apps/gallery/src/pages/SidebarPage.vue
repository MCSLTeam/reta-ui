<script setup lang="ts">
import { RPanel, RSidebar } from "reta-ui";
import GalleryDocPage from "../components/GalleryDocPage.vue";
import GalleryExample from "../components/GalleryExample.vue";

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
      <GalleryExample :title="$t('gallery.sections.basic')">
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
      </GalleryExample>
    </template>

    <template #demo>
      <GalleryExample :title="$t('gallery.sections.example')">
        <r-sidebar :pages="pages" />
      </GalleryExample>
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
