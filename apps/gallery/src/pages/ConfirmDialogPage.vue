<script setup lang="ts">
import { RButton, RConfirmDialog, RPanel } from "reta-ui";
import { ref } from "vue";
import GalleryDocPage from "../components/GalleryDocPage.vue";

const deleteVisible = ref(false);
const restartVisible = ref(false);
</script>

<template>
  <GalleryDocPage>
    <template #effects>
      <r-panel class="doc-section" shadow="hover">
        <template #header><h2>{{ $t("gallery.sections.basic") }}</h2></template>
        <div class="overlay-row">
          <r-button color="warning" @click="restartVisible = true">Restart</r-button>
          <r-button color="danger" type="primary" @click="deleteVisible = true">Delete</r-button>
        </div>
      </r-panel>
    </template>

    <template #demo>
      <r-panel class="doc-section" shadow="hover">
        <template #header><h2>{{ $t("gallery.sections.example") }}</h2></template>
        <r-button color="danger" type="primary" icon="fas fa-trash" @click="deleteVisible = true">
          Delete Instance
        </r-button>
        <r-confirm-dialog
          v-model:visible="deleteVisible"
          title="Delete instance?"
          description="This removes the instance record from the launcher. Server files are not deleted automatically."
          confirm-text="Delete"
          cancel-text="Keep"
        />
        <r-confirm-dialog
          v-model:visible="restartVisible"
          title="Restart instance?"
          description="Players will be disconnected while the process restarts."
          color="warning"
          confirm-text="Restart"
          cancel-text="Cancel"
        />
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
