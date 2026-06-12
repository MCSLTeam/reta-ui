<script setup lang="ts">
import { RCodeEditor, RCopyableText } from "reta-ui";
import { ref } from "vue";
import GalleryDocPage from "../components/GalleryDocPage.vue";
import GalleryExample from "../components/GalleryExample.vue";

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
      <GalleryExample :title="$t('gallery.sections.basic')">
        <div class="editor-meta">
          <r-copyable-text>daemon_instance.json</r-copyable-text>
          <r-copyable-text>UTF-8</r-copyable-text>
        </div>
      </GalleryExample>
    </template>

    <template #demo>
      <GalleryExample :title="$t('gallery.sections.example')">
        <div class="editor-wrap">
          <r-code-editor v-model="value" default-lang="json" />
        </div>
      </GalleryExample>
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
