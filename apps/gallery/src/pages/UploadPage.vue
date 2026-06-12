<script setup lang="ts">
import { RFileDropper, RFileInfo, RMessage } from "reta-ui";
import { ref } from "vue";
import GalleryDocPage from "../components/GalleryDocPage.vue";
import GalleryExample from "../components/GalleryExample.vue";

const files = ref<File[]>([]);
</script>

<template>
  <GalleryDocPage>
    <template #effects>
      <GalleryExample :title="$t('gallery.sections.basic')">
        <div class="upload-stack">
          <r-message title="Upload policy" color="help">
            Up to five files are accepted in this gallery sample.
          </r-message>
          <r-file-dropper v-model="files" :config="{ maxCount: 5 }" :file-info="false" />
        </div>
      </GalleryExample>
    </template>

    <template #demo>
      <GalleryExample :title="$t('gallery.sections.example')">
        <div class="upload-stack">
          <r-file-dropper v-model="files" :config="{ maxCount: 5 }" />
          <r-file-info v-model="files" />
        </div>
      </GalleryExample>
    </template>
  </GalleryDocPage>
</template>

<style scoped lang="scss">
.upload-stack {
  display: grid;
  gap: 14px;
}
</style>
