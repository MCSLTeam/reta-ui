<script setup lang="ts">
import { Message, Panel, Tree, TreeSelect } from "@mcsl/ui";
import { ref } from "vue";
import GalleryDocPage from "../components/GalleryDocPage.vue";

const expandedKeys = ref(["instances", "configs"]);
const selectedKeys = ref(["paper-eu"]);
const selectedFile = ref("server-properties");

const treeItems = [
  {
    key: "instances",
    label: "Instances",
    icon: "fas fa-server",
    children: [
      { key: "paper-eu", label: "Paper EU-1", icon: "fas fa-cube" },
      { key: "forge-us", label: "Forge US-2", icon: "fas fa-cube" },
    ],
  },
  {
    key: "configs",
    label: "Configs",
    icon: "fas fa-folder",
    children: [
      { key: "server-properties", label: "server.properties", icon: "fas fa-file-lines" },
      { key: "permissions", label: "permissions.yml", icon: "fas fa-file-code" },
      { key: "locked", label: "locked.yml", icon: "fas fa-lock", disabled: true },
    ],
  },
  {
    key: "backups",
    label: "Backups",
    icon: "fas fa-box-archive",
    children: [
      { key: "daily", label: "Daily snapshots", icon: "fas fa-clock" },
      { key: "manual", label: "Manual exports", icon: "fas fa-download" },
    ],
  },
];
</script>

<template>
  <GalleryDocPage>
    <template #effects>
      <Panel class="doc-section" shadow="hover">
        <template #header><h2>Tree</h2></template>
        <Tree
          v-model:expanded-keys="expandedKeys"
          v-model:selected-keys="selectedKeys"
          :items="treeItems"
        />
      </Panel>
    </template>

    <template #demo>
      <Panel class="doc-section" shadow="hover">
        <template #header><h2>树选择器</h2></template>
        <div class="tree-stack">
          <TreeSelect v-model="selectedFile" :items="treeItems" placeholder="Choose file" />
          <Message color="help" title="Selected key">{{ selectedFile }}</Message>
        </div>
      </Panel>
    </template>
  </GalleryDocPage>
</template>

<style scoped lang="scss">
.tree-stack {
  display: grid;
  gap: 14px;
}
</style>
