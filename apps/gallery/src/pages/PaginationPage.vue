<script setup lang="ts">
import { RItemsPagination, RPagination, RPanel } from "reta-ui";
import { ref } from "vue";
import GalleryDocPage from "../components/GalleryDocPage.vue";

const shortPage = ref(2);
const longPage = ref(8);
const itemPage = ref(3);
</script>

<template>
  <GalleryDocPage>
    <template #effects>
      <r-panel class="doc-section" shadow="hover">
        <template #header><h2>{{ $t("gallery.sections.basic") }}</h2></template>
        <div class="pagination-stack">
          <r-pagination v-model:page="shortPage" :length="5" size="small" />
          <r-pagination v-model:page="longPage" :length="16" />
          <r-pagination v-model:page="longPage" :length="128" size="large" />
        </div>
      </r-panel>
    </template>

    <template #demo>
      <r-panel class="doc-section" shadow="hover">
        <template #header><h2>{{ $t("gallery.sections.example") }}</h2></template>
        <div class="pagination-stack">
          <r-pagination v-model:page="longPage" :length="16" />
          <r-items-pagination v-model:page="itemPage" :item-per-page="20" :total="240" />
        </div>
      </r-panel>
    </template>
  </GalleryDocPage>
</template>

<style scoped lang="scss">
.pagination-stack {
  display: grid;
  gap: 16px;
  justify-items: start;
}
</style>
