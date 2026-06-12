<script setup lang="ts">
import { RBreadcrumbs, RNavTabs, RPanel, RSidebar } from "reta-ui";
import GalleryDocPage from "../components/GalleryDocPage.vue";
import GalleryExample from "../components/GalleryExample.vue";

const crumbs = [
  { label: "Reta Future", icon: "fas fa-cube" },
  { label: "Gallery" },
  { label: "Navigation" },
];

const pages = [
  { label: "Overview", description: "Status", icon: "fas fa-gauge", link: "/components/navigation" },
  { label: "Instances", description: "Fleet", icon: "fas fa-server" },
  { label: "Settings", description: "Policy", icon: "fas fa-gear" },
];

const tabs = [
  { label: "Details", icon: "fas fa-circle-info" },
  { label: "Metrics", icon: "fas fa-chart-line" },
  { label: "History", icon: "fas fa-clock-rotate-left" },
];
</script>

<template>
  <GalleryDocPage>
    <template #effects>
      <GalleryExample :title="$t('gallery.sections.basic')">
        <div class="navigation-stack">
          <r-breadcrumbs :items="crumbs" />
          <r-nav-tabs :tabs="tabs" />
        </div>
      </GalleryExample>
    </template>

    <template #demo>
      <GalleryExample :title="$t('gallery.sections.example')">
        <div class="nav-grid">
          <r-panel size="small">
            <template #header><h4>Sidebar</h4></template>
            <r-sidebar :pages="pages" />
          </r-panel>
          <r-panel size="small">
            <template #header><h4>Top Navigation</h4></template>
            <div class="navigation-stack">
              <r-breadcrumbs :items="crumbs" />
              <r-nav-tabs :tabs="tabs" shadow="hover" />
            </div>
          </r-panel>
        </div>
      </GalleryExample>
    </template>
  </GalleryDocPage>
</template>

<style scoped lang="scss">
.navigation-stack {
  display: grid;
  gap: 14px;
  justify-items: start;
}

.nav-grid {
  display: grid;
  grid-template-columns: minmax(220px, 0.7fr) minmax(0, 1.3fr);
  gap: 14px;
}

@media (max-width: 920px) {
  .nav-grid {
    grid-template-columns: 1fr;
  }
}
</style>
