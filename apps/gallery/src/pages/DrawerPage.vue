<script setup lang="ts">
import { RButton, RDrawer, RMessage, RPanel, RTag } from "reta-ui";
import { ref } from "vue";
import GalleryDocPage from "../components/GalleryDocPage.vue";

const rightVisible = ref(false);
const bottomVisible = ref(false);
</script>

<template>
  <GalleryDocPage>
    <template #effects>
      <r-panel class="doc-section" shadow="hover">
        <template #header><h2>{{ $t("gallery.sections.basic") }}</h2></template>
        <div class="overlay-row">
          <r-button type="primary" color="primary" @click="rightVisible = true">Right Drawer</r-button>
          <r-button @click="bottomVisible = true">Bottom Drawer</r-button>
        </div>
      </r-panel>
    </template>

    <template #demo>
      <r-panel class="doc-section" shadow="hover">
        <template #header><h2>{{ $t("gallery.sections.example") }}</h2></template>
        <r-button type="primary" color="primary" icon="fas fa-sidebar" @click="rightVisible = true">
          Open Drawer
        </r-button>
        <r-drawer v-model:visible="rightVisible" title="Instance Details">
          <div class="drawer-stack">
            <r-message title="Paper EU-1" color="success" variant="outlined">
              Running on Java 21 with 12 active players.
            </r-message>
            <div class="tag-row">
              <r-tag color="primary">Paper</r-tag>
              <r-tag color="success">Online</r-tag>
              <r-tag color="help">4 GB</r-tag>
            </div>
          </div>
          <template #footer="{ close }">
            <r-button @click="close">Close</r-button>
            <r-button type="primary" color="primary">Open Console</r-button>
          </template>
        </r-drawer>
        <r-drawer v-model:visible="bottomVisible" title="Task Queue" placement="bottom">
          <r-message title="Backup queued" color="help">The next scheduled backup starts after upload.</r-message>
        </r-drawer>
      </r-panel>
    </template>
  </GalleryDocPage>
</template>

<style scoped lang="scss">
.overlay-row,
.tag-row {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  align-items: center;
}

.drawer-stack {
  display: grid;
  gap: 14px;
}
</style>
