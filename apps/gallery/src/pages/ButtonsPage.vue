<script setup lang="ts">
import { RBadge, RButton, RButtonGroup, RPanel, RSplitButton } from "reta-ui";
import GalleryDocPage from "../components/GalleryDocPage.vue";

const menu = [
  { label: "Duplicate", icon: "fas fa-copy" },
  { label: "Export", icon: "fas fa-arrow-up-from-bracket" },
  { label: "Archive", icon: "fas fa-box-archive", disabled: true },
];
</script>

<template>
  <GalleryDocPage>
    <template #effects>
      <r-panel class="doc-section" shadow="hover">
        <template #header>
          <div class="doc-heading">
            <h2>{{ $t("gallery.sections.basic") }}</h2>
          </div>
        </template>

        <div class="button-layout">
          <div class="button-row">
            <r-button type="primary" color="primary" icon="fas fa-check">
              Primary
            </r-button>
            <r-button icon="fas fa-sliders">Default</r-button>
            <r-button type="dashed" icon="fas fa-plus">Dashed</r-button>
            <r-button type="text" icon="fas fa-ellipsis">Text</r-button>
          </div>

          <div class="button-row">
            <r-button color="success" icon="fas fa-circle-check">Success</r-button>
            <r-button color="warning" icon="fas fa-triangle-exclamation">
              Warning
            </r-button>
            <r-button color="danger" icon="fas fa-trash">Danger</r-button>
            <r-button disabled icon="fas fa-ban">Disabled</r-button>
          </div>
        </div>
      </r-panel>
    </template>

    <template #demo>
      <r-panel class="doc-section" shadow="hover">
        <template #header><h2>{{ $t("gallery.sections.example") }}</h2></template>

        <div class="button-layout">
          <section class="button-demo-block">
            <h3>{{ $t("gallery.sections.buttonGroup") }}</h3>
            <r-button-group>
              <r-button type="primary" color="primary">Start</r-button>
              <r-button>Restart</r-button>
              <r-button>Stop</r-button>
              <r-button type="text" icon="fas fa-gear" squared />
            </r-button-group>
          </section>

          <section class="button-demo-block">
            <h3>{{ $t("gallery.sections.splitButton") }}</h3>
            <r-split-button color="primary" type="primary" :dropdown-menu="menu">
              Deploy
            </r-split-button>
          </section>

          <section class="button-demo-block">
            <h3>{{ $t("gallery.sections.iconButton") }}</h3>
            <div class="button-row button-row--compact">
              <r-button icon="fas fa-rotate-right" squared />
              <r-button icon="fas fa-download" squared />
              <r-button icon="fas fa-arrow-up-right-from-square" squared />
              <r-button icon="fas fa-xmark" color="danger" squared />
            </div>
          </section>

          <section class="button-demo-block">
            <h3>{{ $t("gallery.sections.loading") }}</h3>
            <div class="button-row">
              <r-button loading type="primary" color="primary">Saving</r-button>
              <r-button loading loading-icon-pos="left">Checking</r-button>
            </div>
          </section>
        </div>
      </r-panel>
    </template>
  </GalleryDocPage>
</template>

<style scoped lang="scss">
.doc-heading {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.button-layout {
  display: grid;
  gap: 18px;
}

.button-row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
}

.button-row--compact {
  gap: 8px;
}

.button-demo-block {
  display: grid;
  gap: 10px;
}

.button-demo-block h3 {
  margin: 0;
  color: var(--mcsl-text-color-secondary);
  font-size: var(--mcsl-font-size-sm);
  font-weight: 600;
}
</style>
