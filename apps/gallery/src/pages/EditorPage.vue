<script setup lang="ts">
import { RCodeEditor, RCopyableText, RPanel } from "reta-ui";
import { ref } from "vue";
import GalleryDocPage from "../components/GalleryDocPage.vue";

const value = ref(`{
  "name": "Future Paper EU-1",
  "runtime": "java-21",
  "core": "paper-1.21.1-43.jar",
  "memory": 4096
}`);
</script>

<template>
  <GalleryDocPage>
    <template #effects>
      <r-panel class="doc-section" shadow="hover">
        <template #header><h2>{{ $t("gallery.sections.basic") }}</h2></template>
        <div class="editor-meta">
          <r-copyable-text>daemon_instance.json</r-copyable-text>
          <r-copyable-text>UTF-8</r-copyable-text>
        </div>
      </r-panel>
    </template>

    <template #demo>
      <r-panel class="doc-section" shadow="hover">
        <template #header><h2>{{ $t("gallery.sections.example") }}</h2></template>
        <div class="editor-wrap">
          <r-code-editor v-model="value" default-lang="json" />
        </div>
      </r-panel>
    </template>
  </GalleryDocPage>
</template>

<style scoped lang="scss">
.editor-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.editor-wrap {
  min-height: 360px;
}
</style>
