<script setup lang="ts">
import { RRadioGroup } from "reta-ui";
import { ref } from "vue";
import GalleryDocPage from "../components/GalleryDocPage.vue";
import GalleryExample from "../components/GalleryExample.vue";

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
      <GalleryExample :title="$t('gallery.sections.basic')">
        <div class="radio-stack">
          <r-radio-group v-model="flavor" :options="flavorOptions" size="small" />
          <r-radio-group v-model="flavor" :options="flavorOptions" />
          <r-radio-group v-model="flavor" :options="flavorOptions" size="large" />
        </div>
      </GalleryExample>
    </template>

    <template #demo>
      <GalleryExample :title="$t('gallery.sections.example')">
        <div class="radio-stack">
          <r-radio-group v-model="flavor" :options="flavorOptions" />
          <r-radio-group v-model="channel" :options="channelOptions" />
          <r-radio-group v-model="channel" :options="channelOptions" disabled />
        </div>
      </GalleryExample>
    </template>
  </GalleryDocPage>
</template>

<style scoped lang="scss">
.radio-stack {
  display: grid;
  gap: 16px;
}
</style>
