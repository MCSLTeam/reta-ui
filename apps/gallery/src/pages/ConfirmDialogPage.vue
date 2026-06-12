<script setup lang="ts">
import { RButton, RConfirmDialog } from "reta-ui";
import { ref } from "vue";
import GalleryDocPage from "../components/GalleryDocPage.vue";
import GalleryExample from "../components/GalleryExample.vue";

const deleteVisible = ref(false);
const restartVisible = ref(false);
</script>

<template>
  <GalleryDocPage>
    <template #effects>
      <GalleryExample :title="$t('gallery.sections.basic')">
        <div class="overlay-row">
          <r-button color="warning" @click="restartVisible = true">Restart</r-button>
          <r-button color="danger" type="primary" @click="deleteVisible = true">Delete</r-button>
        </div>
      </GalleryExample>
    </template>

    <template #demo>
      <GalleryExample :title="$t('gallery.sections.example')">
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
