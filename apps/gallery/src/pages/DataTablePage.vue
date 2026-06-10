<script setup lang="ts">
import { Button, DataTable, Panel, Tag } from "@mcsl/ui";
import { ref } from "vue";
import GalleryDocPage from "../components/GalleryDocPage.vue";

const selectedKeys = ref<string[]>(["paper-eu"]);
const sortBy = ref("players");
const sortOrder = ref<"asc" | "desc" | null>("desc");

const columns = [
  { key: "name", title: "Name", sortable: true, width: "minmax(180px, 1.2fr)" },
  { key: "status", title: "Status", sortable: true, width: "120px" },
  { key: "version", title: "Version", width: "120px" },
  { key: "players", title: "Players", sortable: true, align: "right" as const, width: "110px" },
];

const rows = [
  { id: "paper-eu", name: "Paper EU-1", status: "Online", version: "1.21.5", players: 12 },
  { id: "forge-us", name: "Forge US-2", status: "Installing", version: "1.20.1", players: 0 },
  { id: "proxy-sg", name: "Velocity SG", status: "Online", version: "3.4.0", players: 48 },
  { id: "fabric-cn", name: "Fabric CN-Dev", status: "Offline", version: "1.21.4", players: 0 },
];

function statusColor(status: unknown) {
  if (status === "Online") return "success";
  if (status === "Installing") return "warning";
  return "surface";
}
</script>

<template>
  <GalleryDocPage>
    <template #effects>
      <Panel class="doc-section" shadow="hover">
        <template #header><h2>Data Table</h2></template>
        <DataTable
          v-model:selected-keys="selectedKeys"
          v-model:sort-by="sortBy"
          v-model:sort-order="sortOrder"
          :columns="columns"
          :rows="rows"
          selectable
        >
          <template #cell-status="{ value }">
            <Tag :color="statusColor(value)" size="small">{{ value }}</Tag>
          </template>
          <template #actions>
            <Button size="small" type="text">Open</Button>
          </template>
        </DataTable>
      </Panel>
    </template>

    <template #demo>
      <Panel class="doc-section" shadow="hover">
        <template #header><h2>States</h2></template>
        <div class="datatable-stack">
          <DataTable :columns="columns" :rows="[]" />
          <DataTable :columns="columns" :rows="rows.slice(0, 2)" loading />
        </div>
      </Panel>
    </template>
  </GalleryDocPage>
</template>

<style scoped lang="scss">
.datatable-stack {
  display: grid;
  gap: 16px;
}
</style>
