<script setup lang="ts">
import { RButton, RDataTable, RTag } from "reta-ui";
import { ref } from "vue";
import GalleryDocPage from "../components/GalleryDocPage.vue";
import GalleryExample from "../components/GalleryExample.vue";

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
      <GalleryExample title="Data Table">
        <r-data-table
          v-model:selected-keys="selectedKeys"
          v-model:sort-by="sortBy"
          v-model:sort-order="sortOrder"
          :columns="columns"
          :rows="rows"
          selectable
        >
          <template #cell-status="{ value }">
            <r-tag :color="statusColor(value)" size="small">{{ value }}</r-tag>
          </template>
          <template #actions>
            <r-button size="small" type="text">Open</r-button>
          </template>
        </r-data-table>
      </GalleryExample>
    </template>

    <template #demo>
      <GalleryExample title="States">
        <div class="datatable-stack">
          <r-data-table :columns="columns" :rows="[]" />
          <r-data-table :columns="columns" :rows="rows.slice(0, 2)" loading />
        </div>
      </GalleryExample>
    </template>
  </GalleryDocPage>
</template>

<style scoped lang="scss">
.datatable-stack {
  display: grid;
  gap: 16px;
}
</style>
