<script setup lang="ts">
import { RFileDropper, RFileInfo, RMessage, RPanel } from "reta-ui";
import { ref } from "vue";
import GalleryDocPage from "../components/GalleryDocPage.vue";

const files = ref<File[]>([]);
</script>

<template>
  <GalleryDocPage>
    <template #effects>
      <r-panel class="doc-section" shadow="hover">
        <template #header><h2>{{ $t("gallery.sections.basic") }}</h2></template>
        <div class="upload-stack">
          <r-message title="Upload policy" color="help">
            Up to five files are accepted in this gallery sample.
          </r-message>
          <r-file-dropper v-model="files" :config="{ maxCount: 5 }" :file-info="false" />
        </div>
      </r-panel>
    </template>

    <template #demo>
      <r-panel class="doc-section" shadow="hover">
        <template #header><h2>{{ $t("gallery.sections.example") }}</h2></template>
        <div class="upload-stack">
          <r-file-dropper v-model="files" :config="{ maxCount: 5 }" />
          <r-file-info v-model="files" />
        </div>
      </r-panel>
    </template>
  </GalleryDocPage>
</template>

<style scoped lang="scss">
.upload-stack {
  display: grid;
  gap: 14px;
}
</style>
