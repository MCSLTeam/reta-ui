<script setup lang="ts">
import { computed, inject, nextTick, onMounted, onUnmounted, ref, watch } from "vue";
import { useI18n } from "vue-i18n";
import { useRoute } from "vue-router";
import { RButton, RCode, RElement, RKbd, RMessage, RTable } from "reta-ui";
import { galleryCodeHighlighter } from "../components/galleryCodeHighlighter";

type DocsArticleKey =
  | "quick-start"
  | "installation"
  | "sfc"
  | "on-demand"
  | "platforms"
  | "controlled"
  | "guides"
  | "theme"
  | "i18n";

type DocsArticle = {
  key: DocsArticleKey;
  i18nKey: string;
};

type TocItem = {
  id: string;
  label: string;
  depth: number;
};

const articles: Record<DocsArticleKey, DocsArticle> = {
  "quick-start": { key: "quick-start", i18nKey: "quickStart" },
  installation: { key: "installation", i18nKey: "installation" },
  sfc: { key: "sfc", i18nKey: "sfc" },
  "on-demand": { key: "on-demand", i18nKey: "onDemand" },
  platforms: { key: "platforms", i18nKey: "platforms" },
  controlled: { key: "controlled", i18nKey: "controlled" },
  guides: { key: "guides", i18nKey: "guides" },
  theme: { key: "theme", i18nKey: "theme" },
  i18n: { key: "i18n", i18nKey: "i18n" },
};

const route = useRoute();
const { t, tm, locale } = useI18n();
const pageRoot = ref<HTMLElement>();
const tocItems = ref<TocItem[]>([]);
const syncAppToc = inject<((items: TocItem[]) => void) | undefined>(
  "gallery-doc-toc",
  undefined,
);

const currentArticle = computed(() => {
  const key = String(route.params.article || "quick-start") as DocsArticleKey;
  return articles[key] ?? articles["quick-start"];
});

const articleBase = computed(() => `gallery.docs.${currentArticle.value.i18nKey}`);
const articleParagraphs = computed(() => tm(`${articleBase.value}.paragraphs`) as string[]);
const articleSummary = computed(() => tm(`${articleBase.value}.summary`) as string[]);

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

const quickCode = `pnpm add reta-ui`;

const sfcCode = `<script setup lang="ts">
import { RButton, RMessage } from "reta-ui";
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
// The main entry imports Reta UI styles automatically.`;

const styleEntryCode = `// Optional: use this for deep imports or explicit style order.
import "reta-ui/style";`;

const themeSwitchCode = `import { useAppearance } from "reta-ui";

const appearance = useAppearance();

appearance.changeTheme("dark", "fade");
appearance.changeTheme("light", "fade");`;

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

const i18nCode = `import { useLocale } from "reta-ui";

const locale = useLocale();

locale.setLocale("zh-CN");
locale.setLocale("en-US");`;

function headingId(value: string, index: number) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, "-")
    .replace(/^-|-$/g, "") || `docs-heading-${index + 1}`;
}

async function collectToc() {
  await nextTick();

  const headings = Array.from(
    pageRoot.value?.querySelectorAll<HTMLElement>(".docs-page h2, .docs-page h3") ?? [],
  ).filter((heading) => heading.textContent?.trim());

  const items = headings.map((heading, index) => {
    if (!heading.id) heading.id = headingId(heading.textContent ?? "", index);

    return {
      id: heading.id,
      label: heading.textContent?.trim() ?? "",
      depth: heading.tagName === "H3" ? 3 : 2,
    };
  });

  tocItems.value = items;
  syncAppToc?.(items);
}

function scrollToHeading(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

watch(() => [route.path, locale.value], collectToc);
onMounted(collectToc);
onUnmounted(() => {
  syncAppToc?.([]);
});
</script>

<template>
  <div ref="pageRoot" class="docs-layout">
    <article class="docs-page">
      <header class="docs-article-header">
        <h1>{{ t(`${articleBase}.title`) }}</h1>
        <p>{{ t(`${articleBase}.description`) }}</p>
        <ul v-if="articleSummary.length" class="docs-summary">
          <li v-for="item in articleSummary" :key="item">{{ item }}</li>
        </ul>
      </header>

      <section class="docs-section">
        <h2>{{ t(`${articleBase}.detailsTitle`) }}</h2>
        <p v-for="paragraph in articleParagraphs" :key="paragraph">
          {{ paragraph }}
        </p>
      </section>

      <section v-if="currentArticle.key === 'quick-start'" class="docs-section">
        <h2>{{ t("gallery.docs.quickStart.flowTitle") }}</h2>
        <div class="docs-list">
          <div class="docs-list__item">
            <r-kbd size="small">1</r-kbd>
            <span>{{ t("gallery.docs.quick.install") }}</span>
          </div>
          <div class="docs-list__item">
            <r-kbd size="small">2</r-kbd>
            <span>{{ t("gallery.docs.quick.import") }}</span>
          </div>
          <div class="docs-list__item">
            <r-kbd size="small">3</r-kbd>
            <span>{{ t("gallery.docs.quick.theme") }}</span>
          </div>
        </div>
      </section>

      <section v-if="currentArticle.key === 'installation'" class="docs-section">
        <h2>{{ t("gallery.docs.installation.commandTitle") }}</h2>
        <r-code :code="quickCode" language="bash" :hljs="galleryCodeHighlighter" />
        <r-message color="help" variant="soft">
          {{ t("gallery.docs.installation.styleNote") }}
        </r-message>
      </section>

      <section v-if="currentArticle.key === 'sfc'" class="docs-section">
        <h2>{{ t("gallery.docs.sfc.exampleTitle") }}</h2>
        <r-code :code="sfcCode" language="xml" :hljs="galleryCodeHighlighter" line-numbers />
        <r-message color="help" variant="soft">
          {{ t("gallery.docs.sfc.styleNote") }}
        </r-message>
      </section>

      <section v-if="currentArticle.key === 'on-demand'" class="docs-section">
        <h2>{{ t("gallery.docs.onDemand.exampleTitle") }}</h2>
        <r-code :code="onDemandCode" language="typescript" :hljs="galleryCodeHighlighter" />
        <r-code :code="styleEntryCode" language="typescript" :hljs="galleryCodeHighlighter" />
      </section>

      <section v-if="currentArticle.key === 'platforms'" class="docs-section">
        <h2>{{ t("gallery.docs.platforms.matrixTitle") }}</h2>
        <r-table :columns="tm('gallery.docs.platforms.columns') as string[]" :rows="platformRows" />
      </section>

      <section v-if="currentArticle.key === 'controlled'" class="docs-section">
        <h2>{{ t("gallery.docs.controlled.matrixTitle") }}</h2>
        <r-table :columns="tm('gallery.docs.controlled.columns') as string[]" :rows="controlledRows" />
      </section>

      <section v-if="currentArticle.key === 'guides'" class="docs-section">
        <h2>{{ t("gallery.docs.guides.matrixTitle") }}</h2>
        <div class="docs-list">
          <div v-for="item in guideItems" :key="item[0]" class="docs-list__item">
            <r-kbd size="small">{{ item[0] }}</r-kbd>
            <span>{{ item[1] }}</span>
          </div>
        </div>
      </section>

      <section v-if="currentArticle.key === 'theme'" class="docs-section">
        <h2>{{ t("gallery.docs.theme.switchTitle") }}</h2>
        <p>{{ t("gallery.docs.theme.switchDescription") }}</p>
        <r-code :code="themeSwitchCode" language="typescript" :hljs="galleryCodeHighlighter" />
      </section>

      <section v-if="currentArticle.key === 'theme'" class="docs-section">
        <h2>{{ t("gallery.docs.theme.varsTitle") }}</h2>
        <p>{{ t("gallery.docs.theme.varsDescription") }}</p>
        <r-code :code="themeVarsCode" language="typescript" :hljs="galleryCodeHighlighter" />
      </section>

      <section v-if="currentArticle.key === 'theme'" class="docs-section">
        <h2>{{ t("gallery.docs.theme.componentTitle") }}</h2>
        <p>{{ t("gallery.docs.theme.componentDescription") }}</p>
        <r-code :code="themeComponentCode" language="xml" :hljs="galleryCodeHighlighter" line-numbers />
        <div class="docs-element-demo">
          <r-element as="span" color="primary">{{ t("gallery.docs.theme.elementPrimary") }}</r-element>
          <r-element as="span" secondary>{{ t("gallery.docs.theme.elementSecondary") }}</r-element>
        </div>
        <r-message :title="t('gallery.docs.theme.boundaryTitle')" color="primary" variant="soft">
          {{ t("gallery.docs.theme.boundary") }}
        </r-message>
      </section>

      <section v-if="currentArticle.key === 'i18n'" class="docs-section">
        <h2>{{ t("gallery.docs.i18n.exampleTitle") }}</h2>
        <r-code :code="i18nCode" language="typescript" :hljs="galleryCodeHighlighter" />
      </section>
    </article>

    <aside
      v-if="tocItems.length"
      class="docs-toc"
      :aria-label="t('gallery.sections.onThisPage')"
    >
      <nav>
        <RButton
          v-for="item in tocItems"
          :key="item.id"
          :class="{ 'docs-toc__item--sub': item.depth === 3 }"
          align="left"
          class="docs-toc__item"
          type="text"
          @click="scrollToHeading(item.id)"
        >
          {{ item.label }}
        </RButton>
      </nav>
    </aside>
  </div>
</template>

<style scoped lang="scss">
.docs-layout {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 180px;
  gap: 44px;
  align-items: start;
  width: 100%;
  min-width: 0;
}

.docs-page {
  display: grid;
  gap: 30px;
  width: 100%;
  min-width: 0;
  padding: 28px 0;
}

.docs-article-header,
.docs-section {
  display: grid;
  gap: 16px;
  min-width: 0;
}

.docs-article-header {
  justify-items: start;
  padding-bottom: 4px;
}

.docs-article-header h1 {
  margin: 0;
  color: var(--mcsl-text-color-primary);
  font-size: clamp(1.72rem, 2vw, 2.08rem);
  font-weight: 720;
  line-height: 1.2;
}

.docs-article-header p,
.docs-section p {
  max-width: 920px;
  margin: 0;
  color: var(--mcsl-text-color-regular);
  line-height: 1.82;
}

.docs-article-header p {
  color: var(--mcsl-text-color-secondary);
  font-size: var(--mcsl-font-size-md);
}

.docs-summary {
  display: grid;
  gap: 10px;
  width: min(100%, 880px);
  margin: 4px 0 0;
  padding: 0;
  list-style: none;
}

.docs-summary li {
  position: relative;
  padding-left: 18px;
  color: var(--mcsl-text-color-regular);
  line-height: 1.7;
}

.docs-summary li::before {
  position: absolute;
  top: 0.72em;
  left: 0;
  width: 6px;
  height: 6px;
  border-radius: 999px;
  background: var(--mcsl-color-primary);
  content: "";
}

.docs-section {
  border-top: 1px solid var(--mcsl-border-color-base);
  padding-top: 30px;
  scroll-margin-top: 82px;
}

.docs-section h2 {
  margin: 0;
  color: var(--mcsl-text-color-primary);
  font-size: 1.52rem;
  font-weight: 700;
  line-height: 1.25;
}

.docs-list {
  display: grid;
  gap: 12px;
  max-width: 920px;
}

.docs-list__item {
  display: grid;
  grid-template-columns: 130px minmax(0, 1fr);
  gap: 14px;
  align-items: start;
  padding: 12px 0;
  border-bottom: 1px solid var(--mcsl-border-color-base);
}

.docs-list__item span {
  min-width: 0;
  color: var(--mcsl-text-color-regular);
  line-height: 1.72;
  overflow-wrap: anywhere;
}

.docs-element-demo {
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
  align-items: center;
}

.docs-toc {
  position: sticky;
  top: 88px;
  align-self: start;
  width: 100%;
  min-width: 0;
  max-height: calc(100vh - 112px);
  overflow-x: hidden;
  overflow-y: auto;
  padding: 1px 0 8px;
  box-sizing: border-box;
}

.docs-toc nav {
  display: grid;
  min-width: 0;
  gap: 2px;
}

.docs-toc__item {
  width: 100%;
  min-width: 0;
  max-width: 100%;
  box-sizing: border-box;
  padding: 5px 0;
  border: 0;
  background: transparent;
  color: var(--mcsl-text-color-regular);
  font: inherit;
  font-size: var(--mcsl-font-size-sm);
  line-height: 1.35;
  text-align: left;
  overflow-wrap: anywhere;
  cursor: pointer;
  transition:
    color var(--mcsl-motion-duration-fast) var(--mcsl-motion-ease-standard),
    transform var(--mcsl-motion-duration-fast) var(--mcsl-motion-ease-standard);
}

.docs-toc__item:hover,
.docs-toc__item:focus-visible {
  color: var(--mcsl-color-primary);
}

.docs-toc__item:focus-visible {
  outline: 2px solid color-mix(in srgb, var(--mcsl-color-primary) 45%, transparent);
  outline-offset: 2px;
}

:deep(.docs-toc__item .mcsl-button__label) {
  justify-content: flex-start;
  width: 100%;
  min-width: 0;
  text-align: left;
  overflow-wrap: anywhere;
  white-space: normal;
}

.docs-toc__item--sub {
  padding-left: 12px;
  color: var(--mcsl-text-color-secondary);
}

@media (max-width: 720px) {
  .docs-layout {
    grid-template-columns: 1fr;
    gap: 0;
  }

  .docs-page {
    gap: 28px;
    padding-bottom: 28px;
  }

  .docs-toc {
    display: none;
  }

  .docs-article-header h1 {
    font-size: 1.62rem;
  }

  .docs-article-header p {
    font-size: var(--mcsl-font-size-md);
  }

  .docs-list__item {
    grid-template-columns: 1fr;
    gap: 8px;
  }
}
</style>
