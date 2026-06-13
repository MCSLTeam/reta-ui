<script setup lang="ts">
import { RCascader, RMessage, RTag } from "reta-ui";
import { computed, ref } from "vue";
import GalleryDocPage from "../components/GalleryDocPage.vue";
import GalleryExample from "../components/GalleryExample.vue";

const runtimePath = ref(["minecraft", "java", "paper"]);
const regionPath = ref(["asia", "singapore"]);

const runtimeOptions = [
  {
    label: "Minecraft",
    value: "minecraft",
    icon: "fas fa-cube",
    children: [
      {
        label: "Java",
        value: "java",
        children: [
          { label: "Paper", value: "paper", icon: "fas fa-leaf" },
          { label: "Forge", value: "forge", icon: "fas fa-hammer" },
          { label: "Fabric", value: "fabric", icon: "fas fa-layer-group" },
        ],
      },
      {
        label: "Proxy",
        value: "proxy",
        children: [
          { label: "Velocity", value: "velocity", icon: "fas fa-network-wired" },
          { label: "Waterfall", value: "waterfall", disabled: true },
        ],
      },
    ],
  },
  {
    label: "Console",
    value: "console",
    icon: "fas fa-terminal",
    children: [
      { label: "Shell", value: "shell" },
      { label: "Log tail", value: "log" },
    ],
  },
];

const regionOptions = [
  {
    label: "Asia",
    value: "asia",
    children: [
      { label: "Singapore", value: "singapore" },
      { label: "Tokyo", value: "tokyo" },
    ],
  },
  {
    label: "Europe",
    value: "europe",
    children: [
      { label: "Frankfurt", value: "frankfurt" },
      { label: "London", value: "london" },
    ],
  },
  {
    label: "America",
    value: "america",
    children: [
      { label: "Los Angeles", value: "los-angeles" },
      { label: "Virginia", value: "virginia" },
    ],
  },
];

const runtimeValue = computed(() => runtimePath.value.join(" / "));
</script>

<template>
  <GalleryDocPage>
    <template #effects>
      <GalleryExample :title="$t('gallery.sections.basic')">
        <div class="cascader-grid">
          <label>
            <span>Runtime target</span>
            <r-cascader
              v-model="runtimePath"
              :options="runtimeOptions"
              clearable
              placeholder="Choose runtime"
            />
          </label>
          <label>
            <span>Deployment region</span>
            <r-cascader
              v-model="regionPath"
              :options="regionOptions"
              color="success"
              placeholder="Choose region"
            />
          </label>
        </div>
      </GalleryExample>
    </template>

    <template #demo>
      <GalleryExample :title="$t('gallery.sections.boundValue')">
        <div class="cascader-stack">
          <r-message color="help" title="Selected path">
            {{ runtimeValue || "No runtime selected" }}
          </r-message>
          <div class="tag-row">
            <r-tag color="primary">Runtime: {{ runtimePath.join(" / ") }}</r-tag>
            <r-tag color="success">Region: {{ regionPath.join(" / ") }}</r-tag>
          </div>
        </div>
      </GalleryExample>
    </template>
  </GalleryDocPage>
</template>

<style scoped lang="scss">
.cascader-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px;
}

label,
.cascader-stack {
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
  .cascader-grid {
    grid-template-columns: 1fr;
  }
}
</style>
