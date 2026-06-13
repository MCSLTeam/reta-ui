<script setup lang="ts">
import { RContextmenu, RTag } from "reta-ui";
import { ref } from "vue";
import GalleryDocPage from "../components/GalleryDocPage.vue";
import GalleryExample from "../components/GalleryExample.vue";

const basicTarget = ref<HTMLElement | null>(null);
const target = ref<HTMLElement | null>(null);
const menu = [
  { label: "Rename", icon: "fas fa-pen" },
  { label: "Duplicate", icon: "fas fa-copy" },
  { label: "Delete", icon: "fas fa-trash", disabled: true },
];
</script>

<template>
  <GalleryDocPage>
    <template #effects>
      <GalleryExample :title="$t('gallery.sections.basic')">
        <div ref="basicTarget" class="context-target context-target--small">
          <r-tag color="help">Right click</r-tag>
          <span>Scoped menu target</span>
        </div>
        <r-contextmenu :parent="basicTarget as any" :menu="menu" />
      </GalleryExample>
    </template>

    <template #demo>
      <GalleryExample :title="$t('gallery.sections.example')">
        <div ref="target" class="context-target">
          <r-tag color="primary">Instance</r-tag>
          <span>Right click this area</span>
        </div>
        <r-contextmenu :parent="target as any" :menu="menu" />
      </GalleryExample>
    </template>
  </GalleryDocPage>
</template>

<style scoped lang="scss">
.context-target {
  min-height: 140px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 10px;
  border: 1px dashed color-mix(in srgb, var(--mcsl-border-color-base) 86%, transparent);
  border-radius: var(--mcsl-border-radius-sm);
  color: var(--mcsl-text-color-secondary);
  background: color-mix(in srgb, var(--mcsl-bg-color-overlay) 94%, transparent);
}

.context-target--small {
  min-height: 92px;
}
</style>
