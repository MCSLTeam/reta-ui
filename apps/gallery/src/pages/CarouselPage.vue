<script setup lang="ts">
import { RCarousel, RTag } from "reta-ui";
import GalleryDocPage from "../components/GalleryDocPage.vue";
import GalleryExample from "../components/GalleryExample.vue";

const slides = [
  {
    title: "Release train",
    meta: "Stable channel",
    tone: "primary",
    detail: "A calm slide transition works well for product highlights and compact dashboards.",
  },
  {
    title: "Edge rollout",
    meta: "Preview",
    tone: "help",
    detail: "Fade keeps context stable when the content density is high.",
  },
  {
    title: "Maintenance",
    meta: "Scheduled",
    tone: "warning",
    detail: "Cover mode gives the active panel a little more presence without becoming noisy.",
  },
  {
    title: "Recovery",
    meta: "Finished",
    tone: "success",
    detail: "Drag the carousel or use arrows and dots to move between items.",
  },
];
</script>

<template>
  <GalleryDocPage>
    <template #effects>
      <GalleryExample :title="$t('gallery.sections.basic')">
        <r-carousel autoplay loop height="220px" arrow-trigger="always">
          <section
            v-for="slide in slides"
            :key="slide.title"
            class="carousel-card"
          >
            <div>
              <r-tag :color="slide.tone">{{ slide.meta }}</r-tag>
              <h3>{{ slide.title }}</h3>
              <p>{{ slide.detail }}</p>
            </div>
          </section>
        </r-carousel>
      </GalleryExample>
    </template>

    <template #demo>
      <div class="carousel-examples">
        <GalleryExample title="Fade">
          <r-carousel effect="fade" trigger="hover-dot" height="180px">
            <section v-for="slide in slides" :key="slide.title" class="carousel-card carousel-card--quiet">
              <h3>{{ slide.title }}</h3>
              <p>{{ slide.detail }}</p>
            </section>
          </r-carousel>
        </GalleryExample>

        <GalleryExample title="Cover">
          <r-carousel effect="cover" :loop="false" reverse-on-end autoplay height="180px">
            <section v-for="slide in slides" :key="slide.title" class="carousel-card carousel-card--cover">
              <h3>{{ slide.title }}</h3>
              <p>{{ slide.meta }}</p>
            </section>
          </r-carousel>
        </GalleryExample>

        <GalleryExample title="Multiple & Vertical">
          <r-carousel
            direction="vertical"
            :slides-per-view="2"
            height="260px"
            dot-placement="right"
            arrow-trigger="always"
          >
            <section v-for="slide in slides" :key="slide.title" class="carousel-row">
              <strong>{{ slide.title }}</strong>
              <span>{{ slide.detail }}</span>
            </section>
          </r-carousel>
        </GalleryExample>

        <GalleryExample title="Marquee">
          <r-carousel marquee :interval="1800" :slides-per-view="2" height="150px" trigger="none">
            <section v-for="slide in slides" :key="slide.title" class="carousel-tile">
              <strong>{{ slide.title }}</strong>
              <span>{{ slide.meta }}</span>
            </section>
          </r-carousel>
        </GalleryExample>
      </div>
    </template>
  </GalleryDocPage>
</template>

<style scoped lang="scss">
.carousel-examples {
  display: grid;
  gap: 18px;
}

.carousel-card,
.carousel-row,
.carousel-tile {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  border: 1px solid color-mix(in srgb, var(--mcsl-border-color-base) 76%, transparent);
  background:
    radial-gradient(circle at 18% 20%, color-mix(in srgb, var(--mcsl-color-primary) 18%, transparent), transparent 34%),
    linear-gradient(135deg, var(--mcsl-bg-color-overlay), color-mix(in srgb, var(--mcsl-bg-color-dark) 82%, var(--mcsl-bg-color-overlay)));
}

.carousel-card {
  display: grid;
  align-items: end;
  padding: 24px;
}

.carousel-card h3,
.carousel-card p {
  margin: 0;
}

.carousel-card h3 {
  margin-top: 12px;
  color: var(--mcsl-text-color-primary);
  font-size: 1.35rem;
}

.carousel-card p {
  max-width: 34rem;
  margin-top: 8px;
  color: var(--mcsl-text-color-secondary);
  line-height: 1.55;
}

.carousel-card--quiet {
  align-items: center;
  background: var(--mcsl-bg-color-overlay);
}

.carousel-card--cover {
  place-items: center;
  text-align: center;
}

.carousel-row {
  display: grid;
  align-content: center;
  gap: 6px;
  padding: 18px;
}

.carousel-row strong,
.carousel-tile strong {
  color: var(--mcsl-text-color-primary);
}

.carousel-row span,
.carousel-tile span {
  color: var(--mcsl-text-color-secondary);
  line-height: 1.45;
}

.carousel-tile {
  display: grid;
  align-content: center;
  gap: 6px;
  padding: 18px;
  margin-right: 12px;
  border-radius: var(--mcsl-border-radius-md);
}

@media (max-width: 640px) {
  .carousel-card {
    padding: 18px;
  }

  .carousel-card h3 {
    font-size: 1.08rem;
  }
}
</style>
