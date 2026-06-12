<script setup lang="ts">
import { RMessage, RTag, RTransfer } from "reta-ui";
import { computed, ref } from "vue";
import GalleryDocPage from "../components/GalleryDocPage.vue";
import GalleryExample from "../components/GalleryExample.vue";

const enabledServices = ref(["console", "backup"]);
const selectedRegions = ref(["sg"]);

const serviceOptions = [
  { label: "Console access", value: "console", icon: "fas fa-terminal" },
  { label: "Scheduled backup", value: "backup", icon: "fas fa-box-archive" },
  { label: "Metrics exporter", value: "metrics", icon: "fas fa-chart-line" },
  { label: "Webhook alerts", value: "webhook", icon: "fas fa-bell" },
  { label: "Danger zone", value: "danger", icon: "fas fa-triangle-exclamation", disabled: true },
];

const regionOptions = [
  { label: "Singapore", value: "sg", icon: "fas fa-location-dot" },
  { label: "Frankfurt", value: "de", icon: "fas fa-location-dot" },
  { label: "Los Angeles", value: "us", icon: "fas fa-location-dot" },
  { label: "Tokyo", value: "jp", icon: "fas fa-location-dot" },
  { label: "Sydney", value: "au", icon: "fas fa-location-dot" },
];

const selectedServiceLabels = computed(() =>
  serviceOptions
    .filter((option) => enabledServices.value.includes(option.value))
    .map((option) => option.label),
);
</script>

<template>
  <GalleryDocPage>
    <template #effects>
      <GalleryExample :title="$t('gallery.sections.basic')">
        <r-transfer
          v-model="enabledServices"
          :options="serviceOptions"
          source-title="Disabled services"
          target-title="Enabled services"
          source-placeholder="Search disabled"
          target-placeholder="Search enabled"
        />
      </GalleryExample>
    </template>

    <template #demo>
      <GalleryExample :title="$t('gallery.sections.example')">
        <div class="transfer-demo">
          <r-transfer
            v-model="selectedRegions"
            :options="regionOptions"
            color="success"
            source-title="Available regions"
            target-title="Deployment targets"
          />
          <r-message color="success" title="Selected services">
            <div class="transfer-tags">
              <r-tag
                v-for="label in selectedServiceLabels"
                :key="label"
                color="success"
                size="small"
              >
                {{ label }}
              </r-tag>
            </div>
          </r-message>
        </div>
      </GalleryExample>
    </template>
  </GalleryDocPage>
</template>

<style scoped lang="scss">
.transfer-demo {
  display: grid;
  gap: 16px;
}

.transfer-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
</style>
