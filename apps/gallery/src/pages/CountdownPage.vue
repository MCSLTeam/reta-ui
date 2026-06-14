<script setup lang="ts">
import { RCountdown, RMessage, RTag } from "reta-ui";
import GalleryDocPage from "../components/GalleryDocPage.vue";
import GalleryExample from "../components/GalleryExample.vue";

const launchTime = Date.now() + 1000 * 60 * 60 * 5 + 1000 * 60 * 18 + 1000 * 42;
const shortTimer = Date.now() + 1000 * 20;
</script>

<template>
  <GalleryDocPage>
    <template #effects>
      <GalleryExample :title="$t('gallery.sections.basic')">
        <div class="countdown-grid">
          <r-countdown :target="launchTime" />
          <r-countdown :target="shortTimer" format="mm:ss" color="success" />
          <r-countdown :duration="90000" format="mm:ss" color="warning" />
        </div>
      </GalleryExample>
    </template>

    <template #demo>
      <GalleryExample :title="$t('gallery.sections.example')">
        <div class="countdown-stack">
          <r-message color="help" title="Maintenance window">
            <r-countdown :target="launchTime" format="HH:mm:ss" color="primary">
              <template #default="{ text, finished }">
                <div class="custom-countdown">
                  <strong>{{ finished ? "Ready" : text }}</strong>
                  <r-tag color="primary">UTC+8</r-tag>
                </div>
              </template>
            </r-countdown>
          </r-message>
        </div>
      </GalleryExample>
    </template>
  </GalleryDocPage>
</template>

<style scoped lang="scss">
.countdown-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 14px;
}

.countdown-stack {
  display: grid;
  gap: 14px;
}

.custom-countdown {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
}

.custom-countdown strong {
  color: var(--mcsl-text-color-primary);
  font-family: var(--mcsl-font-family-mono);
  font-size: 1.35rem;
  font-weight: 700;
}

@media (max-width: 760px) {
  .countdown-grid {
    grid-template-columns: 1fr;
  }
}
</style>
