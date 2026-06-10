<script setup lang="ts">
import { RButton, RButtonGroup, RPageHeader, RPanel } from "reta-ui";
import GalleryDocPage from "../components/GalleryDocPage.vue";
</script>

<template>
  <GalleryDocPage>
    <template #effects>
      <r-panel class="doc-section" shadow="hover">
        <template #header><h2>{{ $t("gallery.sections.basic") }}</h2></template>
        <r-page-header
          title="Instances"
          subtitle="Manage server lifecycle, runtime policy, and operational state."
        >
          <template #actions>
            <r-button type="primary" color="primary" icon="fas fa-plus">Create</r-button>
          </template>
        </r-page-header>
      </r-panel>
    </template>

    <template #demo>
      <r-panel class="doc-section" shadow="hover">
        <template #header><h2>{{ $t("gallery.sections.example") }}</h2></template>
        <r-page-header title="Paper EU-1" subtitle="Online · Java 21 · 4 GB memory">
          <template #actions>
            <r-button-group>
              <r-button icon="fas fa-rotate-right">Restart</r-button>
              <r-button type="primary" color="danger" icon="fas fa-stop">Stop</r-button>
            </r-button-group>
          </template>
        </r-page-header>
      </r-panel>
    </template>
  </GalleryDocPage>
</template>
