<script setup lang="ts">
import { RAvatar, RCopyableText, REmpty, RMessage, RPanel, RResult, RSkeleton, RTable, RTag } from "reta-ui";
import GalleryDocPage from "../components/GalleryDocPage.vue";
import GalleryExample from "../components/GalleryExample.vue";

const columns = ["Name", "Status", "Version"];
const rows = [
  ["Paper EU-1", "Running", "1.21.1"],
  ["Fabric Dev", "Stopped", "1.20.4"],
];
</script>

<template>
  <GalleryDocPage>
    <template #effects>
      <GalleryExample :title="$t('gallery.sections.basic')">
        <div class="display-grid">
          <r-panel size="small">
            <template #header><h4>Identity</h4></template>
            <div class="inline-row">
              <r-avatar text="RF" />
              <r-tag color="primary">Primary Tag</r-tag>
              <r-tag color="success">Healthy</r-tag>
            </div>
          </r-panel>
          <r-panel size="small">
            <template #header><h4>Text</h4></template>
            <r-copyable-text>reta-ui</r-copyable-text>
          </r-panel>
          <r-panel size="small" class="display-grid__wide">
            <template #header><h4>Empty</h4></template>
            <r-empty title="No resources yet" description="Display components should communicate state with calm hierarchy." />
          </r-panel>
        </div>
      </GalleryExample>
    </template>

    <template #demo>
      <GalleryExample :title="$t('gallery.sections.example')">
        <div class="display-stack">
          <r-message title="Heads up" color="warning">
            This is a lightweight message surface for inline guidance.
          </r-message>
          <r-result title="Deployment completed" description="Use result states for larger success or failure summaries." status="success" />
          <r-table :columns="columns" :rows="rows" />
          <r-skeleton :lines="4" height="14px" />
        </div>
      </GalleryExample>
    </template>
  </GalleryDocPage>
</template>

<style scoped lang="scss">
.display-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px;
}

.display-grid__wide {
  grid-column: 1 / -1;
}

.display-stack {
  display: grid;
  gap: 16px;
}

.inline-row {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  align-items: center;
}

@media (max-width: 860px) {
  .display-grid {
    grid-template-columns: 1fr;
  }
}
</style>
