<script setup lang="ts">
import { RTable } from "reta-ui";
import GalleryDocPage from "../components/GalleryDocPage.vue";
import GalleryExample from "../components/GalleryExample.vue";

const columns = ["Name", "Status", "Version", "Players"];
const rows = [
  ["Paper EU-1", "Running", "1.21.1", 12],
  ["Fabric Dev", "Stopped", "1.20.4", 0],
  ["Velocity Edge", "Starting", "3.4.0", 48],
];

const denseRows = [
  ["CPU", "18%", "Normal"],
  ["Memory", "4.1 GB", "Normal"],
  ["Disk", "72%", "Warning"],
  ["Network", "41 ms", "Normal"],
];
</script>

<template>
  <GalleryDocPage>
    <template #effects>
      <GalleryExample :title="$t('gallery.sections.basic')">
        <r-table :columns="columns" :rows="rows" />
      </GalleryExample>
    </template>

    <template #demo>
      <GalleryExample :title="$t('gallery.sections.example')">
        <div class="table-stack">
          <r-table :columns="columns" :rows="rows" />
          <r-table :columns="['Metric', 'Value', 'State']" :rows="denseRows" />
        </div>
      </GalleryExample>
    </template>
  </GalleryDocPage>
</template>

<style scoped lang="scss">
.table-stack {
  display: grid;
  gap: 16px;
}
</style>
