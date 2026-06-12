<script setup lang="ts">
import { RButton, RMessage, RModal } from "reta-ui";
import { ref } from "vue";
import GalleryDocPage from "../components/GalleryDocPage.vue";
import GalleryExample from "../components/GalleryExample.vue";

const previewVisible = ref(false);
const formVisible = ref(false);
</script>

<template>
  <GalleryDocPage>
    <template #effects>
      <GalleryExample :title="$t('gallery.sections.basic')">
        <div class="overlay-row">
          <r-button @click="previewVisible = true">Preview</r-button>
          <r-button type="primary" color="primary" @click="formVisible = true">Create</r-button>
        </div>
      </GalleryExample>
    </template>

    <template #demo>
      <GalleryExample :title="$t('gallery.sections.example')">
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
      </GalleryExample>
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
