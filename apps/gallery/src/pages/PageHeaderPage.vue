<script setup lang="ts">
import { RButton, RButtonGroup, RPageHeader } from "reta-ui";
import GalleryDocPage from "../components/GalleryDocPage.vue";
import GalleryExample from "../components/GalleryExample.vue";
</script>

<template>
  <GalleryDocPage>
    <template #effects>
      <GalleryExample :title="$t('gallery.sections.basic')">
        <r-page-header
          title="Instances"
          subtitle="Manage server lifecycle, runtime policy, and operational state."
        >
          <template #actions>
            <r-button type="primary" color="primary" icon="fas fa-plus">Create</r-button>
          </template>
        </r-page-header>
      </GalleryExample>
    </template>

    <template #demo>
      <GalleryExample :title="$t('gallery.sections.example')">
        <r-page-header title="Paper EU-1" subtitle="Online · Java 21 · 4 GB memory">
          <template #actions>
            <r-button-group>
              <r-button icon="fas fa-rotate-right">Restart</r-button>
              <r-button type="primary" color="danger" icon="fas fa-stop">Stop</r-button>
            </r-button-group>
          </template>
        </r-page-header>
      </GalleryExample>
    </template>
  </GalleryDocPage>
</template>
