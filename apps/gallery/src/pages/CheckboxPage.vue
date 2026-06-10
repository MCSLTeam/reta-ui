<script setup lang="ts">
import { RCheckbox, RPanel } from "reta-ui";
import { ref } from "vue";
import GalleryDocPage from "../components/GalleryDocPage.vue";

const enabled = ref(true);
const mixed = ref<boolean | null>(null);
const snapshots = ref(true);
const backups = ref(false);
const inherited = ref<boolean | null>(null);
</script>

<template>
  <GalleryDocPage>
    <template #effects>
      <r-panel class="doc-section" shadow="hover">
        <template #header><h2>{{ $t("gallery.sections.basic") }}</h2></template>
        <div class="state-grid">
          <r-checkbox v-model="enabled">Checked</r-checkbox>
          <r-checkbox v-model="backups">Unchecked</r-checkbox>
          <r-checkbox v-model="mixed" color="help">Mixed</r-checkbox>
          <r-checkbox v-model="enabled" disabled>Disabled checked</r-checkbox>
          <r-checkbox disabled>Disabled</r-checkbox>
          <r-checkbox invalid>Invalid</r-checkbox>
        </div>
      </r-panel>
    </template>

    <template #demo>
      <r-panel class="doc-section" shadow="hover">
        <template #header><h2>{{ $t("gallery.sections.example") }}</h2></template>
        <div class="policy-list">
          <r-checkbox v-model="snapshots">Allow snapshot builds</r-checkbox>
          <r-checkbox v-model="backups" color="success">Run scheduled backups</r-checkbox>
          <r-checkbox v-model="inherited" color="help">Inherit parent policy</r-checkbox>
        </div>
      </r-panel>
    </template>
  </GalleryDocPage>
</template>

<style scoped lang="scss">
.state-grid,
.policy-list {
  display: grid;
  gap: 12px;
  align-items: start;
}

.state-grid {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

@media (max-width: 720px) {
  .state-grid {
    grid-template-columns: 1fr;
  }
}
</style>
