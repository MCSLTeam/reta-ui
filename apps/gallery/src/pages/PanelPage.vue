<script setup lang="ts">
import { RButton, RMessage, RPanel, RTag } from "reta-ui";
import GalleryDocPage from "../components/GalleryDocPage.vue";
</script>

<template>
  <GalleryDocPage>
    <template #effects>
      <r-panel class="doc-section" shadow="hover">
        <template #header><h2>{{ $t("gallery.sections.basic") }}</h2></template>
        <div class="panel-grid">
          <r-panel header="Default panel">
            Panels group related content with a header, body, border, and optional divider.
          </r-panel>
          <r-panel header="No divider" :header-divider="false">
            The body can visually connect with the header when the divider is disabled.
          </r-panel>
          <r-panel header="Small" size="small">
            Small panels are useful for dense controls.
          </r-panel>
          <r-panel header="Large" size="large" shadow="hover">
            Large panels have roomier spacing and optional hover elevation.
          </r-panel>
        </div>
      </r-panel>
    </template>

    <template #demo>
      <r-panel class="doc-section" shadow="hover">
        <template #header><h2>{{ $t("gallery.sections.example") }}</h2></template>
        <r-panel class="settings-panel" header="Instance policy" shadow="hover">
          <div class="settings-row">
            <div>
              <strong>Paper EU-1</strong>
              <p>Runtime limits, backup policy, and operator-facing actions.</p>
            </div>
            <r-tag color="success">Online</r-tag>
          </div>
          <r-message color="help" title="Panel as a section primitive">
            Use Panel for bounded work areas where header actions and scrollable content matter.
          </r-message>
          <div class="action-row">
            <r-button icon="fas fa-rotate-right">Restart</r-button>
            <r-button type="primary" color="primary" icon="fas fa-save">Save</r-button>
          </div>
        </r-panel>
      </r-panel>
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

.action-row {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 14px;
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
