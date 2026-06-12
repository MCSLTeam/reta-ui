<script setup lang="ts">
import { RSegmented, RSelect } from "reta-ui";
import { ref } from "vue";
import GalleryDocPage from "../components/GalleryDocPage.vue";
import GalleryExample from "../components/GalleryExample.vue";

const runtime = ref("java21");
const flavor = ref("paper");
const region = ref("eu");
const features = ref(["console", "backup"]);

const runtimeOptions = [
  { label: "Java 21", value: "java21", icon: "fas fa-mug-hot" },
  { label: "Java 17", value: "java17", icon: "fas fa-mug-saucer" },
  { label: "Java 8", value: "java8", disabled: true },
];

const flavorOptions = [
  { label: "Paper", value: "paper", icon: "fas fa-layer-group" },
  { label: "Fabric", value: "fabric", icon: "fas fa-puzzle-piece" },
  { label: "NeoForge", value: "neoforge", icon: "fas fa-fire" },
];

const regionOptions = [
  {
    group: "Europe",
    options: [
      { label: "Frankfurt", value: "eu" },
      { label: "London", value: "uk" },
    ],
  },
  {
    group: "Asia",
    options: [
      { label: "Singapore", value: "sg" },
      { label: "Tokyo", value: "jp" },
    ],
  },
];

const featureOptions = [
  { label: "Console", value: "console" },
  { label: "Backup", value: "backup" },
  { label: "Metrics", value: "metrics" },
];
</script>

<template>
  <GalleryDocPage>
    <template #effects>
      <GalleryExample :title="$t('gallery.sections.basic')">
        <div class="select-grid">
          <r-select v-model="runtime" :options="runtimeOptions" prefix="Runtime: " />
          <r-select v-model="region" :options="regionOptions" placeholder="Region" />
          <r-segmented v-model="flavor" :options="flavorOptions" />
          <r-segmented v-model="features" :options="featureOptions" multiple />
        </div>
      </GalleryExample>
    </template>

    <template #demo>
      <GalleryExample :title="$t('gallery.sections.example')">
        <div class="select-grid">
          <r-select v-model="flavor" :options="flavorOptions" placeholder="Server flavor" />
          <r-select disabled placeholder="Disabled select" :options="runtimeOptions" />
          <r-segmented v-model="flavor" :options="flavorOptions" />
          <r-segmented v-model="features" :options="featureOptions" multiple nullable />
        </div>
      </GalleryExample>
    </template>
  </GalleryDocPage>
</template>

<style scoped lang="scss">
.select-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px;
  align-items: start;
}

@media (max-width: 860px) {
  .select-grid {
    grid-template-columns: 1fr;
  }
}
</style>
