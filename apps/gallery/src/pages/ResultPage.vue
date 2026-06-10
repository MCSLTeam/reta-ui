<script setup lang="ts">
import { RButton, RPanel, RResult } from "reta-ui";
import GalleryDocPage from "../components/GalleryDocPage.vue";
</script>

<template>
  <GalleryDocPage>
    <template #effects>
      <r-panel class="doc-section" shadow="hover">
        <template #header><h2>{{ $t("gallery.sections.basic") }}</h2></template>
        <div class="result-grid">
          <r-result title="Completed" description="Deployment image was published." status="success" />
          <r-result title="Needs attention" description="Two plugins need review." status="warning" />
        </div>
      </r-panel>
    </template>

    <template #demo>
      <r-panel class="doc-section" shadow="hover">
        <template #header><h2>{{ $t("gallery.sections.example") }}</h2></template>
        <r-result
          title="Deployment completed"
          description="The server image has been rebuilt and published."
          status="success"
        >
          <div class="result-actions">
            <r-button type="primary" color="primary">Open Instance</r-button>
            <r-button>View Logs</r-button>
          </div>
        </r-result>
      </r-panel>
    </template>
  </GalleryDocPage>
</template>

<style scoped lang="scss">
.result-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px;
}

.result-actions {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
  margin-top: 12px;
}

@media (max-width: 860px) {
  .result-grid {
    grid-template-columns: 1fr;
  }
}
</style>
