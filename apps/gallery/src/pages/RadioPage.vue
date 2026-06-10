<script setup lang="ts">
import { RPanel, RRadioGroup } from "reta-ui";
import { ref } from "vue";
import GalleryDocPage from "../components/GalleryDocPage.vue";

const flavor = ref("paper");
const channel = ref("stable");

const flavorOptions = [
  { label: "Paper", value: "paper" },
  { label: "Fabric", value: "fabric" },
  { label: "NeoForge", value: "neoforge" },
];

const channelOptions = [
  { label: "Stable", value: "stable" },
  { label: "Snapshot", value: "snapshot" },
  { label: "Experimental", value: "experimental", disabled: true },
];
</script>

<template>
  <GalleryDocPage>
    <template #effects>
      <r-panel class="doc-section" shadow="hover">
        <template #header><h2>{{ $t("gallery.sections.basic") }}</h2></template>
        <div class="radio-stack">
          <r-radio-group v-model="flavor" :options="flavorOptions" size="small" />
          <r-radio-group v-model="flavor" :options="flavorOptions" />
          <r-radio-group v-model="flavor" :options="flavorOptions" size="large" />
        </div>
      </r-panel>
    </template>

    <template #demo>
      <r-panel class="doc-section" shadow="hover">
        <template #header><h2>{{ $t("gallery.sections.example") }}</h2></template>
        <div class="radio-stack">
          <r-radio-group v-model="flavor" :options="flavorOptions" />
          <r-radio-group v-model="channel" :options="channelOptions" />
          <r-radio-group v-model="channel" :options="channelOptions" disabled />
        </div>
      </r-panel>
    </template>
  </GalleryDocPage>
</template>

<style scoped lang="scss">
.radio-stack {
  display: grid;
  gap: 16px;
}
</style>
