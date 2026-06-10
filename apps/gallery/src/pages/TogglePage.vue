<script setup lang="ts">
import { RPanel, RSwitch } from "reta-ui";
import { ref } from "vue";
import GalleryDocPage from "../components/GalleryDocPage.vue";

const autoStart = ref(false);
const maintenance = ref(true);
const metrics = ref(true);
const locked = ref(false);
</script>

<template>
  <GalleryDocPage>
    <template #effects>
      <r-panel class="doc-section" shadow="hover">
        <template #header><h2>{{ $t("gallery.sections.basic") }}</h2></template>
        <div class="toggle-grid">
          <label class="toggle-row">
            <r-switch v-model="autoStart" size="small" />
            <span>Small</span>
          </label>
          <label class="toggle-row">
            <r-switch v-model="maintenance" color="warning" />
            <span>Warning</span>
          </label>
          <label class="toggle-row">
            <r-switch v-model="metrics" color="success" size="large" />
            <span>Large</span>
          </label>
          <label class="toggle-row">
            <r-switch v-model="locked" disabled />
            <span>Disabled</span>
          </label>
        </div>
      </r-panel>
    </template>

    <template #demo>
      <r-panel class="doc-section" shadow="hover">
        <template #header><h2>{{ $t("gallery.sections.example") }}</h2></template>
        <div class="toggle-stack">
          <label class="toggle-row">
            <r-switch v-model="autoStart" />
            <span>Auto-start daemon</span>
          </label>
          <label class="toggle-row">
            <r-switch v-model="maintenance" color="warning" />
            <span>Maintenance mode</span>
          </label>
          <label class="toggle-row">
            <r-switch v-model="metrics" color="success" />
            <span>Collect metrics</span>
          </label>
        </div>
      </r-panel>
    </template>
  </GalleryDocPage>
</template>

<style scoped lang="scss">
.toggle-grid,
.toggle-stack {
  display: grid;
  gap: 14px;
}

.toggle-grid {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.toggle-row {
  display: flex;
  align-items: center;
  gap: 12px;
  color: var(--mcsl-text-color-regular);
}

@media (max-width: 720px) {
  .toggle-grid {
    grid-template-columns: 1fr;
  }
}
</style>
