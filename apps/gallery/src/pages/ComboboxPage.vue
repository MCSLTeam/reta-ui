<script setup lang="ts">
import { AutoComplete, Combobox, Message, Panel, Tag } from "@mcsl/ui";
import { ref } from "vue";
import GalleryDocPage from "../components/GalleryDocPage.vue";

const command = ref("restart");
const region = ref("sg");

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
      <Panel class="doc-section" shadow="hover">
        <template #header><h2>Autocomplete</h2></template>
        <div class="combo-grid">
          <label>
            <span>Command</span>
            <AutoComplete v-model="command" :options="commands" placeholder="Type a command" />
          </label>
          <label>
            <span>Region</span>
            <Combobox v-model="region" :options="regions" placeholder="Select region" />
          </label>
        </div>
      </Panel>
    </template>

    <template #demo>
      <Panel class="doc-section" shadow="hover">
        <template #header><h2>绑定值</h2></template>
        <div class="combo-stack">
          <Message color="help" title="Autocomplete keeps custom text">
            {{ command }}
          </Message>
          <div class="tag-row">
            <Tag color="primary">Region: {{ region }}</Tag>
          </div>
        </div>
      </Panel>
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
