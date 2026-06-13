<script setup lang="ts">
import { RSeparator, RTag } from "reta-ui";
import { ref } from "vue";
import GalleryDocPage from "../components/GalleryDocPage.vue";
import GalleryExample from "../components/GalleryExample.vue";

const sidebarWidth = ref(190);
const headerHeight = ref(96);
</script>

<template>
  <GalleryDocPage>
    <template #effects>
      <GalleryExample :title="$t('gallery.sections.basic')">
        <r-separator class="separator-box" orientation="vertical" :size="160">
          <template #first>
            <div class="pane">Navigation</div>
          </template>
          <template #second>
            <div class="pane pane--main">Content area</div>
          </template>
        </r-separator>
      </GalleryExample>
    </template>

    <template #demo>
      <GalleryExample :title="$t('gallery.sections.example')">
        <div class="separator-stack">
          <r-separator
            v-model="sidebarWidth"
            class="separator-box"
            orientation="vertical"
            draggable
            :min="120"
            :max="360"
          >
            <template #first>
              <div class="pane">
                <r-tag color="primary">Resizable</r-tag>
                Width: {{ sidebarWidth }}px
              </div>
            </template>
            <template #second>
              <div class="pane pane--main">Drag the separator to resize the sidebar.</div>
            </template>
          </r-separator>

          <r-separator
            v-model="headerHeight"
            class="separator-box separator-box--horizontal"
            orientation="horizontal"
            draggable
            :min="64"
            :max="180"
          >
            <template #first>
              <div class="pane">Header: {{ headerHeight }}px</div>
            </template>
            <template #second>
              <div class="pane pane--main">Body panel</div>
            </template>
          </r-separator>
        </div>
      </GalleryExample>
    </template>
  </GalleryDocPage>
</template>

<style scoped lang="scss">
.separator-stack {
  display: grid;
  gap: 16px;
}

.separator-box {
  height: 220px;
  border: 1px solid var(--mcsl-border-color-base);
  border-radius: var(--mcsl-border-radius-sm);
  overflow: hidden;
}

.separator-box--horizontal {
  height: 260px;
}

.pane {
  display: grid;
  align-content: start;
  gap: 8px;
  min-height: 100%;
  padding: 12px;
  background: var(--mcsl-bg-color-overlay);
  color: var(--mcsl-text-color-primary);
}

.pane--main {
  background: color-mix(in srgb, var(--mcsl-bg-color-dark) 48%, var(--mcsl-bg-color-overlay));
}
</style>
