<script setup lang="ts">
import { CopyableText, Panel } from "@mcsl/ui";
import GalleryDocPage from "../components/GalleryDocPage.vue";
</script>

<template>
  <GalleryDocPage>
    <template #effects>
      <Panel class="doc-section" shadow="hover">
        <template #header><h2>基础</h2></template>
        <div class="copy-stack">
          <CopyableText size="small">mcsl-ui</CopyableText>
          <CopyableText>paper-1.21.1-43.jar</CopyableText>
          <CopyableText size="large">ws://127.0.0.1:25567/daemon</CopyableText>
        </div>
      </Panel>
    </template>

    <template #demo>
      <Panel class="doc-section" shadow="hover">
        <template #header><h2>示例</h2></template>
        <CopyableText>MCSL-UI</CopyableText>
      </Panel>
    </template>
  </GalleryDocPage>
</template>

<style scoped lang="scss">
.copy-stack {
  display: grid;
  gap: 10px;
  justify-items: start;
}
</style>
