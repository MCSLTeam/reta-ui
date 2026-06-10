<script setup lang="ts">
import { computed } from "vue";
import { useI18n } from "vue-i18n";
import { RButton, RButtonGroup, RCode, RElement, RKbd, RMessage, RTable, RTag } from "reta-ui";
import { galleryCodeHighlighter } from "../components/galleryCodeHighlighter";

const { t, tm } = useI18n();

const installRows = [
  ["package", "reta-ui"],
  ["peer", "vue >= 3.5"],
  ["style", "reta-ui/style.css"],
];

const platformRows = computed(() => [
  tm("gallery.docs.platformRows.vue") as string[],
  tm("gallery.docs.platformRows.browser") as string[],
  tm("gallery.docs.platformRows.node") as string[],
]);

const controlledRows = computed(() => [
  tm("gallery.docs.controlled.rows.controlled") as string[],
  tm("gallery.docs.controlled.rows.uncontrolled") as string[],
  tm("gallery.docs.controlled.rows.hybrid") as string[],
]);

const guideItems = computed(() => [
  tm("gallery.docs.guides.items.jsx") as string[],
  tm("gallery.docs.guides.items.ssr") as string[],
  tm("gallery.docs.guides.items.nuxt") as string[],
  tm("gallery.docs.guides.items.vitepress") as string[],
  tm("gallery.docs.guides.items.viteSsg") as string[],
]);

const quickCode = `pnpm add reta-ui vue`;

const sfcCode = `<script setup lang="ts">
import { RButton, RMessage } from "reta-ui";
import "reta-ui/style.css";
</scr` + `ipt>

<template>
  <r-message title="Ready" color="success">
    Reta UI is available in this page.
  </r-message>
  <r-button type="primary" color="primary">
    Create instance
  </r-button>
</template>`;

const onDemandCode = `import { RButton, RTable, useAppearance } from "reta-ui";
import "reta-ui/style.css";`;

const themeSwitchCode = `import { useAppearance } from "reta-ui";

const appearance = useAppearance();

appearance.changeTheme("dark");
appearance.changeTheme("light");`;

const themeVarsCode = `import { useThemeVars } from "reta-ui";

const themeVars = useThemeVars();

console.log(themeVars.value["font-size-md"]);
console.log(themeVars.value["color-primary"]);`;

const themeComponentCode = `<script setup lang="ts">
import { RElement, useThemeVars } from "reta-ui";

const themeVars = useThemeVars();
</scr` + `ipt>

<template>
  <r-element as="span" color="primary">
    {{ themeVars["color-primary"] }}
  </r-element>
</template>

<style scoped>
.product-status {
  color: var(--mcsl-text-color-primary);
  background: var(--mcsl-bg-color-overlay);
  border: 1px solid var(--mcsl-border-color-base);
  border-radius: var(--mcsl-border-radius-sm);
}
</style>`;

const i18nCode = `const locale = useLocale();

locale.setLocale("zh-CN");
locale.setLocale("en-US");`;
</script>

<template>
  <div class="docs-page">
    <section class="docs-hero" id="docs-quick-start">
      <r-tag color="primary" size="small">{{ t("gallery.docs.eyebrow") }}</r-tag>
      <h1>{{ t("gallery.docs.title") }}</h1>
      <p>{{ t("gallery.docs.intro") }}</p>
      <r-button-group>
        <r-button link="/components/buttons" type="primary" color="primary" icon="fas fa-cubes">
          {{ t("gallery.docs.viewComponents") }}
        </r-button>
        <r-button link="/" icon="fas fa-house">
          {{ t("gallery.docs.backHome") }}
        </r-button>
      </r-button-group>
    </section>

    <section class="docs-section">
      <h2>{{ t("gallery.docs.quickStart.title") }}</h2>
      <p>{{ t("gallery.docs.quickStart.description") }}</p>
      <r-code :code="quickCode" language="bash" :hljs="galleryCodeHighlighter" />
    </section>

    <section id="docs-installation" class="docs-section">
      <h2>{{ t("gallery.docs.installation.title") }}</h2>
      <p>{{ t("gallery.docs.installation.description") }}</p>
      <r-table :columns="tm('gallery.docs.installation.columns') as string[]" :rows="installRows" />
    </section>

    <section id="docs-sfc" class="docs-section">
      <h2>{{ t("gallery.docs.sfc.title") }}</h2>
      <p>{{ t("gallery.docs.sfc.description") }}</p>
      <r-code :code="sfcCode" language="xml" :hljs="galleryCodeHighlighter" line-numbers />
    </section>

    <section id="docs-on-demand" class="docs-section">
      <h2>{{ t("gallery.docs.onDemand.title") }}</h2>
      <p>{{ t("gallery.docs.onDemand.description") }}</p>
      <r-code :code="onDemandCode" language="typescript" :hljs="galleryCodeHighlighter" />
    </section>

    <section id="docs-platforms" class="docs-section">
      <h2>{{ t("gallery.docs.platforms.title") }}</h2>
      <p>{{ t("gallery.docs.platforms.description") }}</p>
      <r-table :columns="tm('gallery.docs.platforms.columns') as string[]" :rows="platformRows" />
    </section>

    <section id="docs-controlled" class="docs-section">
      <h2>{{ t("gallery.docs.controlled.title") }}</h2>
      <p>{{ t("gallery.docs.controlled.description") }}</p>
      <r-table :columns="tm('gallery.docs.controlled.columns') as string[]" :rows="controlledRows" />
    </section>

    <section id="docs-guides" class="docs-section">
      <h2>{{ t("gallery.docs.guides.title") }}</h2>
      <p>{{ t("gallery.docs.guides.description") }}</p>
      <div class="docs-list">
        <div v-for="item in guideItems" :key="item[0]" class="docs-list__item">
          <r-kbd size="small">{{ item[0] }}</r-kbd>
          <span>{{ item[1] }}</span>
        </div>
      </div>
    </section>

    <section id="docs-theme" class="docs-section">
      <h2>{{ t("gallery.docs.theme.title") }}</h2>
      <p>{{ t("gallery.docs.theme.description") }}</p>
      <div class="docs-theme-grid">
        <div class="docs-theme-card">
          <h3>{{ t("gallery.docs.theme.switchTitle") }}</h3>
          <p>{{ t("gallery.docs.theme.switchDescription") }}</p>
          <r-code :code="themeSwitchCode" language="typescript" :hljs="galleryCodeHighlighter" />
        </div>
        <div class="docs-theme-card">
          <h3>{{ t("gallery.docs.theme.varsTitle") }}</h3>
          <p>{{ t("gallery.docs.theme.varsDescription") }}</p>
          <r-code :code="themeVarsCode" language="typescript" :hljs="galleryCodeHighlighter" />
        </div>
      </div>
      <div class="docs-theme-card">
        <h3>{{ t("gallery.docs.theme.componentTitle") }}</h3>
        <p>{{ t("gallery.docs.theme.componentDescription") }}</p>
        <r-code :code="themeComponentCode" language="xml" :hljs="galleryCodeHighlighter" line-numbers />
      </div>
      <div class="docs-element-demo">
        <r-element as="span" color="primary">{{ t("gallery.docs.theme.elementPrimary") }}</r-element>
        <r-element as="span" secondary>{{ t("gallery.docs.theme.elementSecondary") }}</r-element>
      </div>
      <r-message :title="t('gallery.docs.theme.boundaryTitle')" color="primary" variant="soft">
        {{ t("gallery.docs.theme.boundary") }}
      </r-message>
    </section>

    <section id="docs-i18n" class="docs-section">
      <h2>{{ t("gallery.docs.i18n.title") }}</h2>
      <p>{{ t("gallery.docs.i18n.description") }}</p>
      <r-code :code="i18nCode" language="typescript" :hljs="galleryCodeHighlighter" />
    </section>
  </div>
</template>

<style scoped lang="scss">
.docs-page {
  display: grid;
  gap: 36px;
  max-width: 860px;
}

.docs-hero,
.docs-section {
  scroll-margin-top: 82px;
}

.docs-hero {
  display: grid;
  gap: 18px;
  justify-items: start;
  padding: 18px 0 8px;
}

.docs-hero h1 {
  margin: 0;
  color: var(--mcsl-text-color-primary);
  font-size: clamp(38px, 5vw, 68px);
  font-weight: 750;
  line-height: 1;
}

.docs-hero p,
.docs-section p {
  margin: 0;
  color: var(--mcsl-text-color-regular);
  line-height: 1.8;
}

.docs-hero p {
  max-width: 780px;
  font-size: var(--mcsl-font-size-lg);
}

.docs-section {
  display: grid;
  gap: 16px;
  padding-top: 2px;
}

.docs-section + .docs-section {
  border-top: 1px solid var(--mcsl-border-color-base);
  padding-top: 34px;
}

.docs-section h2 {
  margin: 0;
  color: var(--mcsl-text-color-primary);
  font-size: 1.72rem;
  font-weight: 720;
  line-height: 1.25;
}

.docs-list,
.docs-theme-grid {
  display: grid;
  gap: 12px;
}

.docs-list__item {
  display: grid;
  grid-template-columns: 116px minmax(0, 1fr);
  gap: 14px;
  align-items: start;
  padding: 12px 0;
  border-bottom: 1px solid var(--mcsl-border-color-base);
}

.docs-list__item span {
  color: var(--mcsl-text-color-regular);
  line-height: 1.7;
}

.docs-theme-grid {
  grid-template-columns: repeat(2, minmax(0, 1fr));
  align-items: start;
}

.docs-theme-card,
.docs-element-demo {
  display: grid;
  gap: 12px;
  min-width: 0;
}

.docs-theme-card h3 {
  margin: 0;
  color: var(--mcsl-text-color-primary);
  font-size: var(--mcsl-font-size-lg);
  font-weight: 680;
}

.docs-theme-card p {
  font-size: var(--mcsl-font-size-md);
}

.docs-element-demo {
  grid-template-columns: repeat(2, minmax(0, max-content));
  gap: 14px;
  align-items: center;
}

@media (max-width: 720px) {
  .docs-page {
    max-width: none;
    gap: 28px;
  }

  .docs-list__item {
    grid-template-columns: 1fr;
    gap: 8px;
  }

  .docs-theme-grid,
  .docs-element-demo {
    grid-template-columns: 1fr;
  }
}
</style>
