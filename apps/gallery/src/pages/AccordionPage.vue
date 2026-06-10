<script setup lang="ts">
import { RAccordion, RAccordionPanel, RCollapsablePanel, RMessage, RPanel } from "reta-ui";
import { ref } from "vue";
import GalleryDocPage from "../components/GalleryDocPage.vue";

const activeSingle = ref(["runtime"]);
const activeMultiple = ref(["memory", "network"]);
const collapsed = ref(false);
</script>

<template>
  <GalleryDocPage>
    <template #effects>
      <r-panel class="doc-section" shadow="hover">
        <template #header><h2>Accordion</h2></template>
        <r-accordion v-model="activeSingle" class="accordion-surface">
          <r-accordion-panel name="runtime" header="Runtime">
            Java path, launch arguments, and environment variables.
          </r-accordion-panel>
          <r-accordion-panel name="network" header="Network">
            Ports, address binding, proxy, and query visibility.
          </r-accordion-panel>
          <r-accordion-panel name="danger" header="Danger Zone" disabled>
            Disabled panels keep their context without accepting input.
          </r-accordion-panel>
        </r-accordion>
      </r-panel>
    </template>

    <template #demo>
      <r-panel class="doc-section" shadow="hover">
        <template #header><h2>{{ $t("gallery.sections.multiplePanels") }}</h2></template>
        <div class="accordion-stack">
          <r-accordion v-model="activeMultiple" multiple class="accordion-surface">
            <r-accordion-panel name="memory" header="Memory">
              Allocate a predictable heap range for the selected server profile.
            </r-accordion-panel>
            <r-accordion-panel name="network" header="Network">
              Keep public and daemon-only ports visually separated.
            </r-accordion-panel>
            <r-accordion-panel name="backup" header="Backup">
              Scheduled snapshots can be opened together with runtime settings.
            </r-accordion-panel>
          </r-accordion>

          <r-collapsable-panel v-model:collapsed="collapsed" header="Standalone Collapsible" shadow="never">
            <r-message color="help" title="Composable primitive">
              Use CollapsablePanel when a single area needs disclosure without group state.
            </r-message>
          </r-collapsable-panel>
        </div>
      </r-panel>
    </template>
  </GalleryDocPage>
</template>

<style scoped lang="scss">
.accordion-stack {
  display: grid;
  gap: 14px;
}

.accordion-surface {
  overflow: hidden;
  border: 1px solid var(--mcsl-border-color-base);
  border-radius: var(--mcsl-border-radius-sm);
  background: var(--mcsl-bg-color-overlay);
}
</style>
