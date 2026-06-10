<script setup lang="ts">
import { RButton, RMessage, RModal, RPanel } from "reta-ui";
import { ref } from "vue";
import GalleryDocPage from "../components/GalleryDocPage.vue";

const previewVisible = ref(false);
const formVisible = ref(false);
</script>

<template>
  <GalleryDocPage>
    <template #effects>
      <r-panel class="doc-section" shadow="hover">
        <template #header><h2>{{ $t("gallery.sections.basic") }}</h2></template>
        <div class="overlay-row">
          <r-button @click="previewVisible = true">Preview</r-button>
          <r-button type="primary" color="primary" @click="formVisible = true">Create</r-button>
        </div>
      </r-panel>
    </template>

    <template #demo>
      <r-panel class="doc-section" shadow="hover">
        <template #header><h2>{{ $t("gallery.sections.example") }}</h2></template>
        <r-button icon="fas fa-window-restore" @click="previewVisible = true">Open Modal</r-button>
        <r-modal v-model:visible="previewVisible" header="Modal Preview" max-width="520px">
          <r-message title="Paper EU-1" color="help">
            Modal surfaces stay focused and short.
          </r-message>
        </r-modal>
        <r-modal v-model:visible="formVisible" header="Create Instance" max-width="560px">
          <r-message title="Template selected" color="success">
            Paper 1.21.1 with Java 21 runtime.
          </r-message>
        </r-modal>
      </r-panel>
    </template>
  </GalleryDocPage>
</template>

<style scoped lang="scss">
.overlay-row {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}
</style>
