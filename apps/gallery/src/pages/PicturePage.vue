<script setup lang="ts">
import { RPicture } from "reta-ui";
import GalleryDocPage from "../components/GalleryDocPage.vue";
import GalleryExample from "../components/GalleryExample.vue";

const images = [
  "https://images.mcsl.com.cn/new/MCSLTeam.webp",
  "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=900&q=80",
];
</script>

<template>
  <GalleryDocPage>
    <template #effects>
      <GalleryExample :title="$t('gallery.sections.basic')">
        <div class="picture-grid">
          <r-picture :src="images[0]" alt="Reta UI brand" width="220px" height="140px" />
          <r-picture :src="images[1]" alt="Code workspace" width="220px" height="140px" radius="large" />
          <r-picture :src="images[2]" alt="Server rack" width="220px" height="140px" object-fit="contain" />
        </div>
      </GalleryExample>
    </template>

    <template #demo>
      <GalleryExample :title="$t('gallery.sections.example')">
        <div class="picture-grid">
          <r-picture src="/missing-image.png" width="220px" height="140px" fallback-text="No preview" />
          <r-picture :src="images[1]" width="140px" height="140px" radius="round" alt="Round preview" />
          <r-picture :src="images[2]" width="320px" height="140px" :preview="false" alt="Preview disabled" />
        </div>
      </GalleryExample>
    </template>
  </GalleryDocPage>
</template>

<style scoped lang="scss">
.picture-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
  align-items: center;
}
</style>
