<script setup lang="ts">
import { RCheckbox } from "reta-ui";
import { ref } from "vue";
import GalleryDocPage from "../components/GalleryDocPage.vue";
import GalleryExample from "../components/GalleryExample.vue";

const enabled = ref(true);
const mixed = ref<boolean | null>(null);
const snapshots = ref(true);
const backups = ref(false);
const inherited = ref<boolean | null>(null);
</script>

<template>
  <GalleryDocPage>
    <template #effects>
      <GalleryExample :title="$t('gallery.sections.basic')">
        <div class="state-grid">
          <r-checkbox v-model="enabled">Checked</r-checkbox>
          <r-checkbox v-model="backups">Unchecked</r-checkbox>
          <r-checkbox v-model="mixed" color="help">Mixed</r-checkbox>
          <r-checkbox v-model="enabled" disabled>Disabled checked</r-checkbox>
          <r-checkbox disabled>Disabled</r-checkbox>
          <r-checkbox invalid>Invalid</r-checkbox>
        </div>
      </GalleryExample>
    </template>

    <template #demo>
      <GalleryExample :title="$t('gallery.sections.example')">
        <div class="policy-list">
          <r-checkbox v-model="snapshots">Allow snapshot builds</r-checkbox>
          <r-checkbox v-model="backups" color="success">Run scheduled backups</r-checkbox>
          <r-checkbox v-model="inherited" color="help">Inherit parent policy</r-checkbox>
        </div>
      </GalleryExample>
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
