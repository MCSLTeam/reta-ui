<script setup lang="ts">
import { RButton, RMessage, RPanel, RTag } from "reta-ui";
import GalleryDocPage from "../components/GalleryDocPage.vue";
import GalleryExample from "../components/GalleryExample.vue";
</script>

<template>
  <GalleryDocPage>
    <template #effects>
      <GalleryExample :title="$t('gallery.sections.basic')">
        <div class="panel-grid">
          <r-panel header="Default panel">
            Panels group related content with a header, body, border, and optional divider.
          </r-panel>
          <r-panel header="Header extra">
            <template #header-extra>
              <r-tag color="primary">Live</r-tag>
            </template>
            Header extra content stays aligned with the title and does not affect body rhythm.
          </r-panel>
          <r-panel header="Small" size="small">
            Small panels are useful for dense controls.
          </r-panel>
          <r-panel header="Large" size="large" shadow="hover">
            Large panels have roomier spacing and optional hover elevation.
          </r-panel>
        </div>
      </GalleryExample>
    </template>

    <template #demo>
      <GalleryExample :title="$t('gallery.sections.example')">
        <div class="panel-demo-stack">
          <r-panel class="settings-panel" header="Instance policy" shadow="hover">
            <template #header-extra>
              <r-tag color="success">Online</r-tag>
            </template>
            <div class="settings-row">
              <div>
                <strong>Paper EU-1</strong>
                <p>Runtime limits, backup policy, and operator-facing actions.</p>
              </div>
            </div>
            <r-message color="help" title="Panel as a section primitive">
              Use Panel for bounded work areas where header actions and scrollable content matter.
            </r-message>
            <template #footer>
              <div class="panel-footer">
                Last policy sync: 18 minutes ago
              </div>
            </template>
            <template #action>
              <r-button icon="fas fa-rotate-right">Restart</r-button>
              <r-button type="primary" color="primary" icon="fas fa-save">Save</r-button>
            </template>
          </r-panel>
          <r-panel class="scroll-panel" header="Recent events" scrollable>
            <p v-for="index in 12" :key="index">
              Event {{ index }}: panel headers and dividers stay fixed while the body scrolls.
            </p>
          </r-panel>
        </div>
      </GalleryExample>
    </template>
  </GalleryDocPage>
</template>

<style scoped lang="scss">
.panel-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px;
}

.settings-panel {
  max-width: 680px;
}

.panel-demo-stack {
  display: grid;
  gap: 16px;
}

.settings-row {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  align-items: flex-start;
}

.settings-row strong {
  color: var(--mcsl-text-color-primary);
  font-weight: 650;
}

.settings-row p {
  margin: 6px 0 0;
  color: var(--mcsl-text-color-secondary);
  line-height: 1.6;
}

.panel-footer {
  color: var(--mcsl-text-color-secondary);
  font-size: var(--mcsl-font-size-sm);
}

.scroll-panel {
  max-width: 680px;
  height: 260px;
}

.scroll-panel p {
  margin: 0;
  color: var(--mcsl-text-color-regular);
  line-height: 1.7;
}

.scroll-panel p + p {
  margin-top: 10px;
}

@media (max-width: 820px) {
  .panel-grid {
    grid-template-columns: 1fr;
  }

  .settings-row {
    flex-direction: column;
  }
}
</style>
