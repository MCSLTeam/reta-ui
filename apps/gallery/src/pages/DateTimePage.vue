<script setup lang="ts">
import { RCalendar, RDatePicker, RMessage, RTimePicker } from "reta-ui";
import { ref } from "vue";
import GalleryDocPage from "../components/GalleryDocPage.vue";
import GalleryExample from "../components/GalleryExample.vue";

const date = ref("2026-06-10");
const time = ref("21:30");
const maintenanceDate = ref("");
const maintenanceTime = ref("");
</script>

<template>
  <GalleryDocPage>
    <template #effects>
      <GalleryExample title="Date & Time">
        <div class="date-grid">
          <label>
            <span>Deployment date</span>
            <r-date-picker v-model="date" min="2026-01-01" max="2026-12-31" />
          </label>
          <label>
            <span>Restart time</span>
            <r-time-picker v-model="time" min="00:00" max="23:59" />
          </label>
        </div>
      </GalleryExample>
    </template>

    <template #demo>
      <GalleryExample title="Maintenance Window">
        <div class="date-stack">
          <r-calendar v-model="maintenanceDate" min="2026-01-01" max="2026-12-31" />
          <div class="date-grid">
            <label>
              <span>Date</span>
              <r-date-picker v-model="maintenanceDate" placeholder="Pick date" clearable />
            </label>
            <label>
              <span>Time</span>
              <r-time-picker v-model="maintenanceTime" :step="300" clearable />
            </label>
          </div>
          <r-message color="help" title="Selected window">
            {{ maintenanceDate || "No date" }} {{ maintenanceTime || "No time" }}
          </r-message>
        </div>
      </GalleryExample>
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
