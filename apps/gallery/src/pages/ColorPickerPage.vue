<script setup lang="ts">
import { RColorPicker, RMessage, RTag } from "reta-ui";
import { ref } from "vue";
import GalleryDocPage from "../components/GalleryDocPage.vue";
import GalleryExample from "../components/GalleryExample.vue";

const primaryColor = ref("#3c83f6");
const statusColor = ref("#22c55e");
const overlayColor = ref("rgba(60, 131, 246, 0.72)");

const presets = [
  "#3c83f6",
  "#22c55e",
  "#f59e0b",
  "#ef4444",
  "#8b5cf6",
  "#14b8a6",
  "#111827",
  "#f8fafc",
];
</script>

<template>
  <GalleryDocPage>
    <template #effects>
      <GalleryExample :title="$t('gallery.sections.basic')">
        <div class="color-grid">
          <label>
            <span>Primary color</span>
            <r-color-picker v-model="primaryColor" clearable :presets="presets" />
          </label>
          <label>
            <span>Status color</span>
            <r-color-picker v-model="statusColor" size="small" />
          </label>
          <label>
            <span>RGBA output</span>
            <r-color-picker v-model="overlayColor" format="rgb" show-alpha />
          </label>
        </div>
      </GalleryExample>
    </template>

    <template #demo>
      <GalleryExample :title="$t('gallery.sections.example')">
        <div class="color-stack">
          <div class="preview" :style="{ '--preview-color': primaryColor }">
            <strong>Theme swatch</strong>
            <span>{{ primaryColor }}</span>
          </div>
          <r-message color="help" title="Selected colors">
            <div class="tag-row">
              <r-tag color="primary">{{ primaryColor }}</r-tag>
              <r-tag color="success">{{ statusColor }}</r-tag>
              <r-tag color="help">{{ overlayColor }}</r-tag>
            </div>
          </r-message>
        </div>
      </GalleryExample>
    </template>
  </GalleryDocPage>
</template>

<style scoped lang="scss">
.color-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 14px;
}

label,
.color-stack {
  display: grid;
  gap: 8px;
}

label > span {
  color: var(--mcsl-text-color-secondary);
  font-size: var(--mcsl-font-size-sm);
  font-weight: 650;
}

.preview {
  display: grid;
  gap: 4px;
  width: min(100%, 340px);
  padding: 18px;
  border: 1px solid color-mix(in srgb, var(--preview-color) 48%, var(--mcsl-border-color-base));
  border-radius: var(--mcsl-border-radius-md);
  background: color-mix(in srgb, var(--preview-color) 12%, var(--mcsl-bg-color-overlay));
  color: var(--mcsl-text-color-primary);
}

.preview span {
  color: var(--mcsl-text-color-secondary);
  font-family: var(--mcsl-font-family-mono);
}

.tag-row {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

@media (max-width: 860px) {
  .color-grid {
    grid-template-columns: 1fr;
  }
}
</style>
