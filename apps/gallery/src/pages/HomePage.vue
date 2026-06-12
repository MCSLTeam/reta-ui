<script setup lang="ts">
import { computed } from "vue";
import { useI18n } from "vue-i18n";
import { RBadge, RButton, RButtonGroup, RCard, RMessage, RMeterGroup, RNavTabs, RPanel, RProgressBar, RTag } from "reta-ui";
import RetaLogo from "../components/RetaLogo.vue";

const { t } = useI18n();

const previewTabs = [
  { label: "Runtime", icon: "fas fa-gauge" },
  { label: "Tasks", icon: "fas fa-list-check" },
  { label: "Network", icon: "fas fa-diagram-project" },
];

const meter = {
  length: 100,
  values: [
    { label: "CPU", length: 22, type: "success" },
    { label: "RAM", length: 46, type: "primary" },
    { label: "Disk", length: 68, type: "warning" },
  ],
};

const previewJobs = computed(() => [
  { label: t("gallery.home.preview.jobs.backup"), value: "02:18", color: "primary" },
  { label: t("gallery.home.preview.jobs.sync"), value: "64%", color: "success" },
  { label: t("gallery.home.preview.jobs.alert"), value: "1", color: "warning" },
]);

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

      <section class="home-preview" aria-label="Reta UI example">
        <div class="preview-window">
          <div class="preview-window__bar">
            <span />
            <span />
            <span />
          </div>
          <div class="preview-header">
            <div>
              <h2>{{ t("gallery.home.preview.title") }}</h2>
              <p>{{ t("gallery.home.preview.subtitle") }}</p>
            </div>
            <r-badge value="3" color="success">
              <r-button squared icon="fas fa-terminal" type="primary" color="primary" />
            </r-badge>
          </div>

          <r-nav-tabs :tabs="previewTabs" />

          <div class="preview-grid">
            <r-panel size="small">
              <template #header><h3>{{ t("gallery.home.preview.health") }}</h3></template>
              <div class="preview-health">
                <div class="preview-health__status">
                  <strong>99.98%</strong>
                  <r-tag color="success" size="small">{{ t("gallery.home.preview.online") }}</r-tag>
                </div>
                <r-meter-group :meter="meter" />
              </div>
            </r-panel>

            <r-panel size="small">
              <template #header><h3>{{ t("gallery.home.preview.queue") }}</h3></template>
              <div class="preview-jobs">
                <div v-for="job in previewJobs" :key="job.label" class="preview-job">
                  <span>{{ job.label }}</span>
                  <r-tag :color="job.color as any" size="small">{{ job.value }}</r-tag>
                </div>
              </div>
            </r-panel>
          </div>

          <div class="preview-footer">
            <r-message :title="t('gallery.home.preview.messageTitle')" color="success" variant="soft">
              {{ t("gallery.home.preview.message") }}
            </r-message>
            <r-progress-bar :value="64" color="primary" />
          </div>
        </div>
      </section>
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
  grid-template-columns: minmax(0, 0.95fr) minmax(420px, 0.75fr);
  gap: 34px;
  align-items: center;
  min-width: 0;
  min-height: min(520px, calc(100vh - 150px));
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

.home-preview {
  align-self: center;
  min-width: 0;
}

.preview-window {
  display: grid;
  box-sizing: border-box;
  width: 100%;
  min-width: 0;
  gap: 18px;
  padding: 16px;
  border: 1px solid var(--mcsl-border-color-base);
  border-radius: var(--mcsl-border-radius-md);
  background:
    linear-gradient(180deg, color-mix(in srgb, var(--mcsl-bg-color-overlay) 94%, transparent), var(--mcsl-bg-color-main)),
    var(--mcsl-bg-color-overlay);
  box-shadow: 0 18px 60px color-mix(in srgb, var(--mcsl-color-primary) 12%, transparent);
}

.preview-window__bar {
  display: flex;
  gap: 7px;
}

.preview-window__bar span {
  width: 9px;
  height: 9px;
  border-radius: 99px;
  background: var(--mcsl-border-color-dark);
}

.preview-header {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 18px;
  align-items: start;
  min-width: 0;
}

.preview-header > div {
  flex: 1 1 0;
  min-width: 0;
  max-width: 100%;
}

.preview-header :deep(.mcsl-badge) {
  flex: none;
  max-width: 100%;
}

.preview-header h2 {
  margin: 0 0 6px;
  font-weight: 700;
  overflow-wrap: anywhere;
}

.preview-header p {
  margin: 0;
  color: var(--mcsl-text-color-secondary);
  line-height: 1.6;
  overflow-wrap: anywhere;
}

.preview-grid {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 0.8fr);
  gap: 12px;
  min-width: 0;
}

.preview-health,
.preview-jobs,
.preview-footer {
  display: grid;
  gap: 14px;
}

.preview-health__status,
.preview-job {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}

.preview-health__status strong {
  color: var(--mcsl-text-color-primary);
  font-size: var(--mcsl-font-size-3xl);
}

.preview-job span {
  min-width: 0;
  color: var(--mcsl-text-color-regular);
  font-size: var(--mcsl-font-size-sm);
  overflow-wrap: anywhere;
}

.preview-window :deep(.mcsl-panel),
.preview-window :deep(.mcsl-message),
.preview-window :deep(.mcsl-nav-tabs),
.preview-window :deep(.mcsl-meter-group),
.preview-window :deep(.mcsl-progress-bar) {
  min-width: 0;
}

.preview-window :deep(.mcsl-panel__header),
.preview-window :deep(.mcsl-panel__body-wrapper),
.preview-window :deep(.mcsl-message__content),
.preview-window :deep(.mcsl-message__body),
.preview-window :deep(.mcsl-nav-tabs__tab) {
  min-width: 0;
}

.preview-window :deep(.mcsl-panel__header h1),
.preview-window :deep(.mcsl-panel__header h2),
.preview-window :deep(.mcsl-panel__header h3),
.preview-window :deep(.mcsl-message__title),
.preview-window :deep(.mcsl-message__body),
.preview-window :deep(.mcsl-nav-tabs__tab),
.preview-window :deep(.mcsl-nav-tabs__tab span) {
  white-space: normal;
  overflow-wrap: anywhere;
  word-break: break-word;
}

.preview-window :deep(.mcsl-button__label),
.preview-window :deep(.mcsl-tag) {
  min-width: 0;
  white-space: normal;
  overflow-wrap: anywhere;
  word-break: break-word;
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
  .home-routes,
  .preview-grid {
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

  .preview-window {
    padding: 12px;
  }

  .preview-header {
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto;
    gap: 12px;
  }

  .preview-health__status,
  .preview-job {
    align-items: flex-start;
    gap: 8px;
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
