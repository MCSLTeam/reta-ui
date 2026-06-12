<script setup lang="ts">
import { RMessage, RSteps } from "reta-ui";
import { ref } from "vue";
import GalleryDocPage from "../components/GalleryDocPage.vue";
import GalleryExample from "../components/GalleryExample.vue";

const current = ref(1);

const installSteps = [
  { title: "Profile", description: "Select loader and version" },
  { title: "Resources", description: "Allocate memory and ports" },
  { title: "Review", description: "Confirm launch settings" },
  { title: "Launch", description: "Start the instance" },
];

const taskSteps = [
  { title: "Queued", description: "Waiting for daemon slot" },
  { title: "Downloading", description: "Fetching server artifacts" },
  { title: "Verify", description: "Hash and metadata checks", status: "error" as const },
  { title: "Done", description: "Ready to launch", disabled: true },
];
</script>

<template>
  <GalleryDocPage>
    <template #effects>
      <GalleryExample title="Steps">
        <div class="steps-stack">
          <r-steps v-model="current" :items="installSteps" clickable />
          <r-steps :items="installSteps" :model-value="2" size="small" color="success" />
        </div>
      </GalleryExample>
    </template>

    <template #demo>
      <GalleryExample :title="$t('gallery.sections.installFlow')">
        <div class="steps-demo">
          <r-steps v-model="current" :items="installSteps" clickable color="primary" />
          <r-message color="help" title="Selected step">
            {{ installSteps[current]?.title }} - {{ installSteps[current]?.description }}
          </r-message>
          <r-steps :items="taskSteps" :model-value="1" vertical color="warning" />
        </div>
      </GalleryExample>
    </template>
  </GalleryDocPage>
</template>

<style scoped lang="scss">
.steps-stack,
.steps-demo {
  display: grid;
  gap: 18px;
}
</style>
