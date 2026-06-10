<script setup lang="ts">
import { Panel, ProgressBar, Spinner } from "@mcsl/ui";
import GalleryDocPage from "../components/GalleryDocPage.vue";
</script>

<template>
  <GalleryDocPage>
    <template #effects>
      <Panel class="doc-section" shadow="hover">
        <template #header><h2>基础</h2></template>
        <div class="progress-stack">
          <ProgressBar :progress="64" status="loading" />
          <ProgressBar :progress="100" status="success" />
          <ProgressBar :progress="42" status="warning" />
        </div>
      </Panel>
    </template>

    <template #demo>
      <Panel class="doc-section" shadow="hover">
        <template #header><h2>示例</h2></template>
        <div class="progress-stack">
          <ProgressBar variant="indeterminate" status="loading" />
          <ProgressBar variant="circle" :progress="72" status="loading" />
          <Spinner label="Syncing" />
        </div>
      </Panel>
    </template>
  </GalleryDocPage>
</template>

<style scoped lang="scss">
.progress-stack {
  display: grid;
  gap: 16px;
}
</style>
