<script setup lang="ts">
import { RAccordion, RAccordionPanel, RCollapsablePanel, RMessage } from "reta-ui";
import { ref } from "vue";
import GalleryDocPage from "../components/GalleryDocPage.vue";
import GalleryExample from "../components/GalleryExample.vue";

const activeSingle = ref(["runtime"]);
const activeMultiple = ref(["memory", "network"]);
const collapsed = ref(false);
</script>

<template>
  <GalleryDocPage>
    <template #effects>
      <GalleryExample title="Accordion">
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
      </GalleryExample>
    </template>

    <template #demo>
      <GalleryExample :title="$t('gallery.sections.multiplePanels')">
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
      </GalleryExample>
    </template>
  </GalleryDocPage>
</template>

<style scoped lang="scss">
.accordion-stack {
  display: grid;
  gap: 14px;
}

.accordion-surface {
  min-width: 0;
}
</style>
