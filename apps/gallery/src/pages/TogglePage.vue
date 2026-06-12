<script setup lang="ts">
import { RSwitch } from "reta-ui";
import { ref } from "vue";
import GalleryDocPage from "../components/GalleryDocPage.vue";
import GalleryExample from "../components/GalleryExample.vue";

const autoStart = ref(false);
const maintenance = ref(true);
const metrics = ref(true);
const locked = ref(false);
</script>

<template>
  <GalleryDocPage>
    <template #effects>
      <GalleryExample :title="$t('gallery.sections.basic')">
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
      </GalleryExample>
    </template>

    <template #demo>
      <GalleryExample :title="$t('gallery.sections.example')">
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
      </GalleryExample>
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
