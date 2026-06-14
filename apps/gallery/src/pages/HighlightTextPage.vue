<script setup lang="ts">
import { RHighlightText, RText } from "reta-ui";
import GalleryDocPage from "../components/GalleryDocPage.vue";
import GalleryExample from "../components/GalleryExample.vue";
</script>

<template>
  <GalleryDocPage>
    <template #effects>
      <GalleryExample :title="$t('gallery.sections.basic')">
        <div class="highlight-stack">
          <r-text>
            The current runtime is
            <r-highlight-text color="success" weight="semibold">Java 21</r-highlight-text>
            with a stable memory profile.
          </r-text>
          <r-text type="secondary">
            HighlightText keeps inline notes visible without turning them into badges.
          </r-text>
        </div>
      </GalleryExample>
    </template>

    <template #demo>
      <GalleryExample :title="$t('gallery.sections.example')">
        <div class="highlight-grid">
          <r-highlight-text color="warning">Scheduled restart at 03:00</r-highlight-text>
          <r-highlight-text color="danger" text-color="danger" weight="semibold">
            Deprecated endpoint
          </r-highlight-text>
          <r-highlight-text color="primary" round>Primary keyword</r-highlight-text>
          <r-highlight-text color="help" block>
            Block highlight can mark longer explanatory copy.
          </r-highlight-text>
        </div>
      </GalleryExample>
    </template>
  </GalleryDocPage>
</template>

<style scoped lang="scss">
.highlight-stack,
.highlight-grid {
  display: grid;
  gap: 12px;
}
</style>
