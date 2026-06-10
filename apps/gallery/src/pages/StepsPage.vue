<script setup lang="ts">
import { Message, Panel, Steps } from "@mcsl/ui";
import { ref } from "vue";
import GalleryDocPage from "../components/GalleryDocPage.vue";

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
      <Panel class="doc-section" shadow="hover">
        <template #header><h2>Steps</h2></template>
        <div class="steps-stack">
          <Steps v-model="current" :items="installSteps" clickable />
          <Steps :items="installSteps" :model-value="2" size="small" color="success" />
        </div>
      </Panel>
    </template>

    <template #demo>
      <Panel class="doc-section" shadow="hover">
        <template #header><h2>安装流程</h2></template>
        <div class="steps-demo">
          <Steps v-model="current" :items="installSteps" clickable color="primary" />
          <Message color="help" title="Selected step">
            {{ installSteps[current]?.title }} - {{ installSteps[current]?.description }}
          </Message>
          <Steps :items="taskSteps" :model-value="1" vertical color="warning" />
        </div>
      </Panel>
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
