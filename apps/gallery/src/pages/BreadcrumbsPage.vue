<script setup lang="ts">
import { RBreadcrumbs, RPanel } from "reta-ui";
import GalleryDocPage from "../components/GalleryDocPage.vue";

const baseCrumbs = [
  { label: "Reta Future", icon: "fas fa-cube" },
  { label: "Instances" },
  { label: "Paper EU-1" },
];

const linkedCrumbs = [
  { label: "Gallery", link: "/components/buttons" },
  { label: "Navigation", link: "/components/navigation" },
  { label: "Breadcrumbs" },
];
</script>

<template>
  <GalleryDocPage>
    <template #effects>
      <r-panel class="doc-section" shadow="hover">
        <template #header><h2>{{ $t("gallery.sections.basic") }}</h2></template>
        <div class="crumb-stack">
          <r-breadcrumbs :items="baseCrumbs" />
          <r-breadcrumbs :items="linkedCrumbs" seperator=">" />
          <r-breadcrumbs :items="baseCrumbs" seperator="·" />
        </div>
      </r-panel>
    </template>

    <template #demo>
      <r-panel class="doc-section" shadow="hover">
        <template #header><h2>{{ $t("gallery.sections.example") }}</h2></template>
        <r-breadcrumbs :items="linkedCrumbs" />
      </r-panel>
    </template>
  </GalleryDocPage>
</template>

<style scoped lang="scss">
.crumb-stack {
  display: grid;
  gap: 14px;
}
</style>
