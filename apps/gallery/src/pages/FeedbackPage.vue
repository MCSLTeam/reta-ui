<script setup lang="ts">
import { REmpty, RMessage, RMeterGroup, RPanel, RResult, RSkeleton } from "reta-ui";
import GalleryDocPage from "../components/GalleryDocPage.vue";
import GalleryExample from "../components/GalleryExample.vue";

const healthyMeter = {
  length: 100,
  values: [
    { label: "CPU", length: 18, type: "success" },
    { label: "RAM", length: 42, type: "primary" },
  ],
};

const attentionMeter = {
  length: 100,
  values: [
    { label: "Latency", length: 64, type: "warning" },
    { label: "Disk", length: 51, type: "help" },
  ],
};
</script>

<template>
  <GalleryDocPage>
    <template #effects>
      <GalleryExample :title="$t('gallery.sections.basic')">
        <div class="status-grid">
          <r-panel size="small">
            <template #header><h4>Healthy</h4></template>
            <div class="feedback-card">
              <r-message color="success" title="Stable">CPU 18% · Memory 1.2 GB</r-message>
              <r-meter-group :meter="healthyMeter" />
            </div>
          </r-panel>
          <r-panel size="small">
            <template #header><h4>Attention</h4></template>
            <div class="feedback-card">
              <r-message color="warning" title="Queue rising">Latency increased.</r-message>
              <r-meter-group :meter="attentionMeter" />
            </div>
          </r-panel>
        </div>
      </GalleryExample>
    </template>

    <template #demo>
      <GalleryExample :title="$t('gallery.sections.example')">
        <div class="feedback-stack">
          <r-result title="Backup completed" description="Snapshot and metadata have been stored." status="success" />
          <r-empty title="No running instances" description="Use this state to explain the next meaningful action." />
          <r-skeleton :lines="3" height="14px" />
        </div>
      </GalleryExample>
    </template>
  </GalleryDocPage>
</template>

<style scoped lang="scss">
.status-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px;
}

.feedback-card,
.feedback-stack {
  display: grid;
  gap: 14px;
}

@media (max-width: 980px) {
  .status-grid {
    grid-template-columns: 1fr;
  }
}
</style>
