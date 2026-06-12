<script setup lang="ts">
import { ref } from "vue";
import { RButton, RCheckbox, RInputNumber, RInputText, RSelect, RTextarea } from "reta-ui";
import GalleryDocPage from "../components/GalleryDocPage.vue";
import GalleryExample from "../components/GalleryExample.vue";

const instanceName = ref("Future Paper EU-1");
const runtime = ref("java-21");
const core = ref("paper-1.21.1-43");
const port = ref(25565);
const memory = ref(4096);
const backups = ref(true);
const note = ref("Production profile with scheduled backup and metrics enabled.");

const runtimeOptions = [
  { label: "Java 21 · Temurin", value: "java-21" },
  { label: "Java 17 · Temurin", value: "java-17" },
  { label: "Java 8 · Zulu", value: "java-8" },
];

const coreOptions = [
  { label: "paper-1.21.1-43.jar", value: "paper-1.21.1-43" },
  { label: "fabric-loader-0.16.9.jar", value: "fabric-0.16.9" },
  { label: "forge-1.20.1-47.3.0.jar", value: "forge-1.20.1" },
];
</script>

<template>
  <GalleryDocPage>
    <template #effects>
      <GalleryExample :title="$t('gallery.sections.basic')">
        <div class="form-grid">
          <label class="field">
            <span>Instance Name</span>
            <r-input-text v-model="instanceName" placeholder="Future Paper EU-1" />
          </label>
          <label class="field">
            <span>Runtime</span>
            <r-select v-model="runtime" :options="runtimeOptions" />
          </label>
          <label class="field">
            <span>Port</span>
            <r-input-number v-model="port" :min="1" :max="65535" />
          </label>
          <label class="field">
            <span>Memory</span>
            <r-input-number v-model="memory" :step="512" :min="1024" />
          </label>
        </div>
      </GalleryExample>
    </template>

    <template #demo>
      <GalleryExample :title="$t('gallery.sections.example')">
        <div class="form-grid form-grid--wide">
          <label class="field">
            <span>Server Core</span>
            <r-select v-model="core" :options="coreOptions" />
          </label>
          <label class="field">
            <span>Runtime</span>
            <r-select v-model="runtime" :options="runtimeOptions" />
          </label>
          <label class="field field--full">
            <span>Notes</span>
            <r-textarea v-model="note" resizeable />
          </label>
          <r-checkbox v-model="backups">Enable scheduled backups</r-checkbox>
          <div class="actions">
            <r-button type="primary" color="primary" icon="fas fa-floppy-disk">
              Save
            </r-button>
            <r-button icon="fas fa-eye">Preview</r-button>
          </div>
        </div>
      </GalleryExample>
    </template>
  </GalleryDocPage>
</template>

<style scoped lang="scss">
.form-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px;
  align-items: start;
}

.form-grid--wide {
  gap: 16px;
}

.field {
  display: grid;
  gap: 8px;
  min-width: 0;
}

.field--full {
  grid-column: 1 / -1;
}

.field span {
  color: var(--mcsl-text-color-secondary);
  font-size: var(--mcsl-font-size-sm);
}

.actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  flex-wrap: wrap;
}

@media (max-width: 820px) {
  .form-grid {
    grid-template-columns: 1fr;
  }
}
</style>
