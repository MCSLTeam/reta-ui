<script setup lang="ts">
import { RAutoComplete, RCombobox, RMessage, RTag } from "reta-ui";
import { ref } from "vue";
import GalleryDocPage from "../components/GalleryDocPage.vue";
import GalleryExample from "../components/GalleryExample.vue";

const command = ref("restart");
const region = ref("sg");
const readonlyRegion = ref("jp");
const selectedCommands = ref(["restart", "backup"]);

const commands = [
  { label: "Restart server", value: "restart", icon: "fas fa-rotate" },
  { label: "Create backup", value: "backup", icon: "fas fa-box-archive" },
  { label: "Open console", value: "console", icon: "fas fa-terminal" },
  { label: "Stop instance", value: "stop", icon: "fas fa-power-off", disabled: true },
];

const regions = [
  { label: "Singapore", value: "sg", icon: "fas fa-location-dot" },
  { label: "Frankfurt", value: "de", icon: "fas fa-location-dot" },
  { label: "Los Angeles", value: "us", icon: "fas fa-location-dot" },
  { label: "Tokyo", value: "jp", icon: "fas fa-location-dot" },
];
</script>

<template>
  <GalleryDocPage>
    <template #effects>
      <GalleryExample title="Autocomplete">
        <div class="combo-grid">
          <label>
            <span>Command</span>
            <r-auto-complete v-model="command" :options="commands" placeholder="Type a command" />
          </label>
          <label>
            <span>Region</span>
            <r-combobox v-model="region" :options="regions" placeholder="Select region" />
          </label>
          <label>
            <span>Readonly Select</span>
            <r-combobox
              v-model="readonlyRegion"
              :options="regions"
              :editable="false"
              :autocomplete="false"
              placeholder="Select region"
            />
          </label>
          <label>
            <span>Multiple</span>
            <r-combobox
              v-model="selectedCommands"
              :options="commands"
              multiple
              placeholder="Select commands"
            />
          </label>
        </div>
      </GalleryExample>
    </template>

    <template #demo>
      <GalleryExample :title="$t('gallery.sections.boundValue')">
        <div class="combo-stack">
          <r-message color="help" title="Autocomplete keeps custom text">
            {{ command }}
          </r-message>
          <div class="tag-row">
            <r-tag color="primary">Region: {{ region }}</r-tag>
            <r-tag color="success">Readonly: {{ readonlyRegion }}</r-tag>
            <r-tag color="warning">Multiple: {{ selectedCommands.join(", ") }}</r-tag>
          </div>
        </div>
      </GalleryExample>
    </template>
  </GalleryDocPage>
</template>

<style scoped lang="scss">
.combo-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px;
}

label,
.combo-stack {
  display: grid;
  gap: 8px;
}

label > span {
  color: var(--mcsl-text-color-secondary);
  font-size: var(--mcsl-font-size-sm);
  font-weight: 650;
}

.tag-row {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

@media (max-width: 720px) {
  .combo-grid {
    grid-template-columns: 1fr;
  }
}
</style>
