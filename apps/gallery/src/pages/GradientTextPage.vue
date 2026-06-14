<script setup lang="ts">
import { RGradientText, RText } from "reta-ui";
import GalleryDocPage from "../components/GalleryDocPage.vue";
import GalleryExample from "../components/GalleryExample.vue";
</script>

<template>
  <GalleryDocPage>
    <template #effects>
      <GalleryExample :title="$t('gallery.sections.basic')">
        <div class="gradient-stack">
          <r-gradient-text as="h3" size="xl" weight="bold">
            Gradient status headline
          </r-gradient-text>
          <r-text type="secondary">
            Use GradientText for short emphasis where a semantic color is too quiet.
          </r-text>
        </div>
      </GalleryExample>
    </template>

    <template #demo>
      <GalleryExample :title="$t('gallery.sections.example')">
        <div class="gradient-grid">
          <r-gradient-text from="primary" to="help" size="xl" weight="bold">
            Deploy Preview
          </r-gradient-text>
          <r-gradient-text from="success" to="primary" :angle="90" weight="semibold">
            Online Service
          </r-gradient-text>
          <r-gradient-text from="warning" to="danger" size="lg" weight="semibold">
            Maintenance Window
          </r-gradient-text>
        </div>
      </GalleryExample>
    </template>
  </GalleryDocPage>
</template>

<style scoped lang="scss">
.gradient-stack,
.gradient-grid {
  display: grid;
  gap: 12px;
}
</style>
