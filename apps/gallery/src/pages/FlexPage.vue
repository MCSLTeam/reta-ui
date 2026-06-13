<script setup lang="ts">
import { RButton, RFlex, RTag } from "reta-ui";
import GalleryDocPage from "../components/GalleryDocPage.vue";
import GalleryExample from "../components/GalleryExample.vue";
</script>

<template>
  <GalleryDocPage>
    <template #effects>
      <GalleryExample :title="$t('gallery.sections.basic')">
        <r-flex align="center" justify="between" gap="md" wrap>
          <r-flex align="center" gap="xs" wrap>
            <r-tag color="primary">Paper</r-tag>
            <r-tag color="success">Online</r-tag>
            <r-tag color="help">Java 21</r-tag>
          </r-flex>
          <r-flex gap="xs" wrap>
            <r-button icon="fas fa-rotate-right">Restart</r-button>
            <r-button type="primary" icon="fas fa-terminal">Console</r-button>
          </r-flex>
        </r-flex>
      </GalleryExample>
    </template>

    <template #demo>
      <GalleryExample :title="$t('gallery.sections.example')">
        <r-flex direction="column" gap="md">
          <r-flex gap="sm" wrap>
            <div v-for="item in 6" :key="item" class="flex-cell">Node {{ item }}</div>
          </r-flex>
          <r-flex justify="end" gap="xs">
            <r-button>Cancel</r-button>
            <r-button type="primary">Apply</r-button>
          </r-flex>
        </r-flex>
      </GalleryExample>
    </template>
  </GalleryDocPage>
</template>

<style scoped lang="scss">
.flex-cell {
  min-width: 7rem;
  padding: 12px;
  border: 1px solid var(--mcsl-border-color-base);
  border-radius: var(--mcsl-border-radius-sm);
  background: var(--mcsl-bg-color-overlay);
  color: var(--mcsl-text-color-primary);
}
</style>
