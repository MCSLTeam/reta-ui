<script setup lang="ts">
import { Accordion, AccordionPanel, CollapsablePanel, Message, Panel } from "@mcsl/ui";
import { ref } from "vue";
import GalleryDocPage from "../components/GalleryDocPage.vue";

const activeSingle = ref(["runtime"]);
const activeMultiple = ref(["memory", "network"]);
const collapsed = ref(false);
</script>

<template>
  <GalleryDocPage>
    <template #effects>
      <Panel class="doc-section" shadow="hover">
        <template #header><h2>Accordion</h2></template>
        <Accordion v-model="activeSingle" class="accordion-surface">
          <AccordionPanel name="runtime" header="Runtime">
            Java path, launch arguments, and environment variables.
          </AccordionPanel>
          <AccordionPanel name="network" header="Network">
            Ports, address binding, proxy, and query visibility.
          </AccordionPanel>
          <AccordionPanel name="danger" header="Danger Zone" disabled>
            Disabled panels keep their context without accepting input.
          </AccordionPanel>
        </Accordion>
      </Panel>
    </template>

    <template #demo>
      <Panel class="doc-section" shadow="hover">
        <template #header><h2>多面板</h2></template>
        <div class="accordion-stack">
          <Accordion v-model="activeMultiple" multiple class="accordion-surface">
            <AccordionPanel name="memory" header="Memory">
              Allocate a predictable heap range for the selected server profile.
            </AccordionPanel>
            <AccordionPanel name="network" header="Network">
              Keep public and daemon-only ports visually separated.
            </AccordionPanel>
            <AccordionPanel name="backup" header="Backup">
              Scheduled snapshots can be opened together with runtime settings.
            </AccordionPanel>
          </Accordion>

          <CollapsablePanel v-model:collapsed="collapsed" header="Standalone Collapsible" shadow="never">
            <Message color="help" title="Composable primitive">
              Use CollapsablePanel when a single area needs disclosure without group state.
            </Message>
          </CollapsablePanel>
        </div>
      </Panel>
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
