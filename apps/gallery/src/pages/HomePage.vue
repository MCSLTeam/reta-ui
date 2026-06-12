<script setup lang="ts">
import { computed } from "vue";
import { useI18n } from "vue-i18n";
import { RButton, RButtonGroup, RCard } from "reta-ui";
import RetaLogo from "../components/RetaLogo.vue";

const { t } = useI18n();

const routes = computed(() => [
  {
    title: t("gallery.home.routes.components.title"),
    description: t("gallery.home.routes.components.description"),
    link: "/components/buttons",
    icon: "fas fa-cubes",
  },
  {
    title: t("gallery.home.routes.docs.title"),
    description: t("gallery.home.routes.docs.description"),
    link: "/docs",
    icon: "fas fa-book-open",
  },
  {
    title: t("gallery.home.routes.system.title"),
    description: t("gallery.home.routes.system.description"),
    link: "/components/page-header",
    icon: "fas fa-palette",
  },
]);
</script>

<template>
  <div class="home-page">
    <section class="home-hero">
      <div class="home-hero__copy">
        <h1>Reta UI</h1>
        <p>{{ t("gallery.home.description") }}</p>
        <r-button-group>
          <r-button link="/components/buttons" type="primary" color="primary" icon="fas fa-arrow-right">
            {{ t("gallery.home.browseComponents") }}
          </r-button>
          <r-button link="/docs" icon="fas fa-book">
            {{ t("gallery.home.readDocs") }}
          </r-button>
        </r-button-group>
      </div>
    </section>

    <section class="home-routes">
      <r-card
        v-for="item in routes"
        :key="item.link"
        :title="item.title"
        :description="item.description"
        shadow="hover"
      >
        <r-button :icon="item.icon" :link="item.link" type="text" color="primary">
          {{ t("gallery.home.routes.open") }}
        </r-button>
      </r-card>
    </section>

    <footer class="home-footer">
      <div class="home-footer__top">
        <router-link class="home-footer__brand" to="/" aria-label="Reta UI">
          <span class="home-footer__mark" aria-hidden="true">
            <RetaLogo />
          </span>
          <strong>Reta UI</strong>
        </router-link>
      </div>
      <div class="home-footer__copyright">
        <span class="home-footer__copyright-text">
          <span>
            {{ t("gallery.footer.copyrightPrefix") }}
            <a href="https://www.mcsl.com.cn/" rel="noreferrer" target="_blank">
              {{ t("gallery.footer.team") }}
            </a>.
          </span>
          <span class="home-footer__co-created">
            {{ t("gallery.footer.coCreatedWithPrefix") }}
            <a href="https://acmecloud.cn/" rel="noreferrer" target="_blank">
              {{ t("gallery.footer.company") }}
            </a>
            {{ t("gallery.footer.coCreatedWithSuffix") }}
          </span>
        </span>
        <a
          class="home-footer__source"
          href="https://github.com/MCSLTeam/reta-ui"
          rel="noreferrer"
          target="_blank"
        >
          <i class="fab fa-github" aria-hidden="true" />
          {{ t("gallery.footer.source") }}
        </a>
      </div>
    </footer>
  </div>
</template>

<style scoped lang="scss">
.home-page {
  display: flex;
  flex-direction: column;
  min-width: 0;
  min-height: calc(100vh - 56px);
  gap: 22px;
  margin: 0 38px;
}

.home-hero {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: 28px;
  align-items: center;
  min-width: 0;
  min-height: min(430px, calc(100vh - 190px));
}

.home-hero__copy {
  display: grid;
  justify-items: start;
  min-width: 0;
  gap: 20px;
}

.home-hero__copy h1 {
  margin: 0;
  max-width: 720px;
  color: var(--mcsl-text-color-primary);
  font-size: clamp(46px, 7.2vw, 96px);
  font-weight: 760;
  line-height: 0.95;
  overflow-wrap: anywhere;
}

.home-hero__copy p {
  max-width: 640px;
  color: var(--mcsl-text-color-regular);
  font-size: var(--mcsl-font-size-lg);
  line-height: 1.8;
  overflow-wrap: anywhere;
}

.home-hero__copy :deep(.mcsl-button-group) {
  flex-wrap: wrap;
}

.home-stat {
  display: grid;
  gap: 4px;
  padding: 18px 20px;
  background: color-mix(in srgb, var(--mcsl-bg-color-overlay) 96%, transparent);
}

.home-stat:not(:last-child) {
  border-right: 1px solid var(--mcsl-border-color-base);
}

.home-stat strong {
  color: var(--mcsl-text-color-primary);
  font-size: var(--mcsl-font-size-3xl);
  font-weight: 720;
}

.home-stat span {
  color: var(--mcsl-text-color-secondary);
  font-size: var(--mcsl-font-size-sm);
}

.home-routes {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 14px;
}

.home-footer {
  display: grid;
  gap: 10px;
  margin: auto -38px 0;
  padding: 18px 0 24px;
  border-top: 1px solid color-mix(in srgb, var(--mcsl-border-color-base) 82%, transparent);
  background:
    linear-gradient(
      180deg,
      color-mix(in srgb, var(--mcsl-bg-color-dark) 38%, transparent),
      transparent 64px
    );
  color: var(--mcsl-text-color-secondary);
  font-size: var(--mcsl-font-size-sm);
  line-height: 1.55;
}

.home-footer__top {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  min-width: 0;
}

.home-footer__top,
.home-footer__copyright {
  margin: 0 38px;
}

.home-footer__top {
  justify-content: flex-start;
  gap: 10px 22px;
}

.home-footer__brand {
  display: inline-flex;
  align-items: center;
  gap: 9px;
  min-width: 0;
  color: var(--mcsl-text-color-primary);
  text-decoration: none;
}

.home-footer__mark {
  display: block;
  width: 24px;
  height: 24px;
  flex: 0 0 24px;
  border-radius: 7px;
  box-shadow:
    0 6px 14px color-mix(in srgb, var(--mcsl-color-primary) 14%, transparent),
    0 0 0 1px color-mix(in srgb, var(--mcsl-border-color-base) 36%, transparent);
}

.home-footer__brand strong {
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: var(--mcsl-font-size-md);
  font-weight: 680;
  white-space: nowrap;
}

.home-footer__copyright {
  display: flex;
  align-items: end;
  justify-content: space-between;
  gap: 12px 24px;
  color: var(--mcsl-text-color-secondary);
  font-size: var(--mcsl-font-size-xs);
}

.home-footer__copyright-text {
  display: grid;
  gap: 4px;
  min-width: 0;
}

.home-footer__copyright a {
  color: var(--mcsl-text-color-regular);
  text-decoration: none;
  transition: color var(--mcsl-motion-duration-fast) var(--mcsl-motion-ease-standard);
}

.home-footer__copyright a:hover,
.home-footer__copyright a:focus-visible {
  color: var(--mcsl-color-primary);
}

.home-footer__co-created {
  min-width: 0;
}

.home-footer__source {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  flex: none;
  width: fit-content;
}

@media (max-width: 1080px) {
  .home-hero,
  .home-routes {
    grid-template-columns: 1fr;
  }

  .home-hero__copy {
    margin-top: 60px;
  }
  
  .home-hero {
    min-height: 0;
  }
}

@media (max-width: 620px) {
  .home-page {
    gap: 18px;
    margin: 0 28px;
  }

  .home-hero {
    gap: 24px;
  }

  .home-hero__copy {
    margin-top: 60px;
  }

  .home-hero__copy h1 {
    font-size: clamp(42px, 18vw, 72px);
  }

  .home-hero__copy p {
    font-size: var(--mcsl-font-size-md);
  }

  .home-stat:not(:last-child) {
    border-right: 0;
    border-bottom: 1px solid var(--mcsl-border-color-base);
  }

  .home-footer {
    margin-right: -28px;
    margin-left: -28px;
    padding: 16px 0 22px;
  }

  .home-footer__top,
  .home-footer__copyright {
    margin: 0 28px;
  }

  .home-footer__top {
    display: grid;
    gap: 12px;
  }

  .home-footer__copyright {
    min-width: 0;
    overflow-wrap: anywhere;
  }

  .home-footer__copyright {
    display: grid;
    justify-content: start;
    gap: 8px;
    line-height: 1.55;
  }

  .home-footer__source {
    justify-self: start;
  }
}

</style>
