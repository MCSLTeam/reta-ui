<script setup lang="ts">
import { Button, ButtonGroup, PageHeader, Panel } from "@mcsl/ui";
import GalleryDocPage from "../components/GalleryDocPage.vue";
</script>

<template>
  <GalleryDocPage>
    <template #effects>
      <Panel class="doc-section" shadow="hover">
        <template #header><h2>基础</h2></template>
        <PageHeader
          title="Instances"
          subtitle="Manage server lifecycle, runtime policy, and operational state."
        >
          <template #actions>
            <Button type="primary" color="primary" icon="fas fa-plus">Create</Button>
          </template>
        </PageHeader>
      </Panel>
    </template>

    <template #demo>
      <Panel class="doc-section" shadow="hover">
        <template #header><h2>示例</h2></template>
        <PageHeader title="Paper EU-1" subtitle="Online · Java 21 · 4 GB memory">
          <template #actions>
            <ButtonGroup>
              <Button icon="fas fa-rotate-right">Restart</Button>
              <Button type="primary" color="danger" icon="fas fa-stop">Stop</Button>
            </ButtonGroup>
          </template>
        </PageHeader>
      </Panel>
    </template>
  </GalleryDocPage>
</template>
