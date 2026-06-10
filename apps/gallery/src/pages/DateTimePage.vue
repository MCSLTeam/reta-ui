<script setup lang="ts">
import { Calendar, DatePicker, Message, Panel, TimePicker } from "@mcsl/ui";
import { ref } from "vue";
import GalleryDocPage from "../components/GalleryDocPage.vue";

const date = ref("2026-06-10");
const time = ref("21:30");
const maintenanceDate = ref("");
const maintenanceTime = ref("");
</script>

<template>
  <GalleryDocPage>
    <template #effects>
      <Panel class="doc-section" shadow="hover">
        <template #header><h2>Date & Time</h2></template>
        <div class="date-grid">
          <label>
            <span>Deployment date</span>
            <DatePicker v-model="date" min="2026-01-01" max="2026-12-31" />
          </label>
          <label>
            <span>Restart time</span>
            <TimePicker v-model="time" min="00:00" max="23:59" />
          </label>
        </div>
      </Panel>
    </template>

    <template #demo>
      <Panel class="doc-section" shadow="hover">
        <template #header><h2>Maintenance Window</h2></template>
        <div class="date-stack">
          <Calendar v-model="maintenanceDate" min="2026-01-01" max="2026-12-31" />
          <div class="date-grid">
            <label>
              <span>Date</span>
              <DatePicker v-model="maintenanceDate" placeholder="Pick date" clearable />
            </label>
            <label>
              <span>Time</span>
              <TimePicker v-model="maintenanceTime" :step="300" clearable />
            </label>
          </div>
          <Message color="help" title="Selected window">
            {{ maintenanceDate || "No date" }} {{ maintenanceTime || "No time" }}
          </Message>
        </div>
      </Panel>
    </template>
  </GalleryDocPage>
</template>

<style scoped lang="scss">
.date-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px;
}

.date-stack,
label {
  display: grid;
  gap: 8px;
}

label > span {
  color: var(--mcsl-text-color-secondary);
  font-size: var(--mcsl-font-size-sm);
  font-weight: 650;
}

@media (max-width: 720px) {
  .date-grid {
    grid-template-columns: 1fr;
  }
}
</style>
