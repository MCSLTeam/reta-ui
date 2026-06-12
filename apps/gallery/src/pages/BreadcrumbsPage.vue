<script setup lang="ts">
import { RBreadcrumbs } from "reta-ui";
import GalleryDocPage from "../components/GalleryDocPage.vue";
import GalleryExample from "../components/GalleryExample.vue";

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
      <GalleryExample :title="$t('gallery.sections.basic')">
        <div class="crumb-stack">
          <r-breadcrumbs :items="baseCrumbs" />
          <r-breadcrumbs :items="linkedCrumbs" seperator=">" />
          <r-breadcrumbs :items="baseCrumbs" seperator="·" />
        </div>
      </GalleryExample>
    </template>

    <template #demo>
      <GalleryExample :title="$t('gallery.sections.example')">
        <r-breadcrumbs :items="linkedCrumbs" />
      </GalleryExample>
    </template>
  </GalleryDocPage>
</template>

<style scoped lang="scss">
.crumb-stack {
  display: grid;
  gap: 14px;
}
</style>
