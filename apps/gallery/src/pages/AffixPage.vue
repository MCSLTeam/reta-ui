<script setup lang="ts">
import { RAffix, RButton, RMessage, RTag } from "reta-ui";
import GalleryDocPage from "../components/GalleryDocPage.vue";
import GalleryExample from "../components/GalleryExample.vue";
</script>

<template>
  <GalleryDocPage>
    <template #effects>
      <GalleryExample :title="$t('gallery.sections.basic')">
        <div class="affix-demo">
          <r-affix :offset="8">
            <div class="affix-bar">
              <r-tag color="primary">Sticky</r-tag>
              <span>Scroll this area to keep actions visible.</span>
              <r-button size="small" type="primary">Save</r-button>
            </div>
          </r-affix>
          <p v-for="item in 12" :key="item">
            Policy row {{ item }} keeps enough vertical content to demonstrate sticky positioning.
          </p>
        </div>
      </GalleryExample>
    </template>

    <template #demo>
      <GalleryExample :title="$t('gallery.sections.example')">
        <r-message color="help" title="Affix scope">
          Affix uses CSS sticky, so it respects the nearest scrolling container and does not need global listeners.
        </r-message>
      </GalleryExample>
    </template>
  </GalleryDocPage>
</template>

<style scoped lang="scss">
.affix-demo {
  display: grid;
  gap: 12px;
  max-height: 280px;
  overflow: auto;
}

.affix-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 10px 12px;
  border: 1px solid var(--mcsl-border-color-base);
  border-radius: var(--mcsl-border-radius-sm);
  background: color-mix(in srgb, var(--mcsl-bg-color-overlay) 94%, transparent);
  box-shadow: var(--mcsl-box-shadow-light);
}

.affix-bar span,
.affix-demo p {
  color: var(--mcsl-text-color-regular);
}
</style>
