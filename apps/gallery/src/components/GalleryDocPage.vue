<script setup lang="ts">
import { computed, inject, nextTick, onMounted, onUnmounted, provide, ref, watch } from "vue";
import { useRoute } from "vue-router";
import { useI18n } from "vue-i18n";
import { RButton } from "reta-ui";
import GalleryApiTable from "./GalleryApiTable.vue";
import { defaultGalleryApiDocs, galleryApiDocs } from "./galleryApiDocs";
import { galleryPageSources } from "./galleryPageSources";

type PageMeta = {
  titleKey: string;
  name: string;
  descriptionKey: string;
};

type TocItem = {
  id: string;
  label: string;
  depth: number;
};

const props = withDefaults(
  defineProps<{
    title?: string;
    description?: string;
    apiTitle?: string;
    apiDescription?: string;
  }>(),
  {
    title: "",
    description: "",
    apiTitle: "",
    apiDescription: "",
  },
);

const route = useRoute();
const i18n = useI18n();
const t = i18n.t;
const apiItems = computed(() => galleryApiDocs[route.path] ?? defaultGalleryApiDocs);
const pageSource = computed(() => galleryPageSources[route.path]?.trim() ?? "");
const exampleCodes = computed(() => extractComponentExamples(pageSource.value));
const pageRoot = ref<HTMLElement>();
const tocItems = ref<TocItem[]>([]);
const exampleCodeLineNumbers = ref(true);
const exampleCodeCursor = ref(0);
const syncAppToc = inject<((items: TocItem[]) => void) | undefined>(
  "gallery-doc-toc",
  undefined,
);
let exampleCodeMediaQuery: MediaQueryList | undefined;
let syncExampleCodeDensity: (() => void) | undefined;

provide("gallery-example-source", {
  next: () => exampleCodes.value[exampleCodeCursor.value++] ?? "",
  lineNumbers: exampleCodeLineNumbers,
});

const pageMeta: Record<string, PageMeta> = {
  "/components/page-header": {
    titleKey: "gallery.sidebar.pageHeader",
    name: "PageHeader",
    descriptionKey: "gallery.componentMeta.pageHeader",
  },
  "/components/panel": {
    titleKey: "gallery.sidebar.panel",
    name: "Panel",
    descriptionKey: "gallery.componentMeta.panel",
  },
  "/components/buttons": {
    titleKey: "gallery.sidebar.buttons",
    name: "Button",
    descriptionKey: "gallery.componentMeta.buttons",
  },
  "/components/input": {
    titleKey: "gallery.sidebar.input",
    name: "InputText",
    descriptionKey: "gallery.componentMeta.input",
  },
  "/components/number-box": {
    titleKey: "gallery.sidebar.numberBox",
    name: "InputNumber",
    descriptionKey: "gallery.componentMeta.numberBox",
  },
  "/components/combobox": {
    titleKey: "gallery.sidebar.combobox",
    name: "Combobox",
    descriptionKey: "gallery.componentMeta.combobox",
  },
  "/components/date-time": {
    titleKey: "gallery.sidebar.dateTime",
    name: "DatePicker / TimePicker",
    descriptionKey: "gallery.componentMeta.dateTime",
  },
  "/components/slider": {
    titleKey: "gallery.sidebar.slider",
    name: "Slider",
    descriptionKey: "gallery.componentMeta.slider",
  },
  "/components/radio": {
    titleKey: "gallery.sidebar.radio",
    name: "RadioGroup",
    descriptionKey: "gallery.componentMeta.radio",
  },
  "/components/checkbox": {
    titleKey: "gallery.sidebar.checkbox",
    name: "Checkbox",
    descriptionKey: "gallery.componentMeta.checkbox",
  },
  "/components/toggle": {
    titleKey: "gallery.sidebar.toggle",
    name: "Switch",
    descriptionKey: "gallery.componentMeta.toggle",
  },
  "/components/transfer": {
    titleKey: "gallery.sidebar.transfer",
    name: "Transfer",
    descriptionKey: "gallery.componentMeta.transfer",
  },
  "/components/result": {
    titleKey: "gallery.sidebar.result",
    name: "Result",
    descriptionKey: "gallery.componentMeta.result",
  },
  "/components/empty": {
    titleKey: "gallery.sidebar.empty",
    name: "Empty",
    descriptionKey: "gallery.componentMeta.empty",
  },
  "/components/divider": {
    titleKey: "gallery.sidebar.divider",
    name: "Divider",
    descriptionKey: "gallery.componentMeta.divider",
  },
  "/components/copyable-text": {
    titleKey: "gallery.sidebar.copyableText",
    name: "CopyableText",
    descriptionKey: "gallery.componentMeta.copyableText",
  },
  "/components/code": {
    titleKey: "gallery.sidebar.code",
    name: "Code",
    descriptionKey: "gallery.componentMeta.code",
  },
  "/components/skeleton": {
    titleKey: "gallery.sidebar.skeleton",
    name: "Skeleton",
    descriptionKey: "gallery.componentMeta.skeleton",
  },
  "/components/display": {
    titleKey: "gallery.sidebar.displayPage",
    name: "Display",
    descriptionKey: "gallery.componentMeta.displayPage",
  },
  "/components/feedback": {
    titleKey: "gallery.sidebar.feedback",
    name: "Feedback",
    descriptionKey: "gallery.componentMeta.feedback",
  },
  "/components/navigation": {
    titleKey: "gallery.sidebar.navigation",
    name: "Navigation",
    descriptionKey: "gallery.componentMeta.navigation",
  },
  "/components/breadcrumbs": {
    titleKey: "gallery.sidebar.breadcrumbs",
    name: "Breadcrumbs",
    descriptionKey: "gallery.componentMeta.breadcrumbs",
  },
  "/components/sidebar": {
    titleKey: "gallery.sidebar.sidebar",
    name: "Sidebar",
    descriptionKey: "gallery.componentMeta.sidebar",
  },
  "/components/nav-tabs": {
    titleKey: "gallery.sidebar.navTabs",
    name: "NavTabs",
    descriptionKey: "gallery.componentMeta.navTabs",
  },
  "/components/steps": {
    titleKey: "gallery.sidebar.steps",
    name: "Steps",
    descriptionKey: "gallery.componentMeta.steps",
  },
  "/components/dropdown": {
    titleKey: "gallery.sidebar.dropdown",
    name: "DropdownMenu",
    descriptionKey: "gallery.componentMeta.dropdown",
  },
  "/components/drawer": {
    titleKey: "gallery.sidebar.drawer",
    name: "Drawer",
    descriptionKey: "gallery.componentMeta.drawer",
  },
  "/components/confirm-dialog": {
    titleKey: "gallery.sidebar.confirmDialog",
    name: "ConfirmDialog",
    descriptionKey: "gallery.componentMeta.confirmDialog",
  },
  "/components/tooltip": {
    titleKey: "gallery.sidebar.tooltip",
    name: "Tooltip",
    descriptionKey: "gallery.componentMeta.tooltip",
  },
  "/components/popover": {
    titleKey: "gallery.sidebar.popover",
    name: "Popover",
    descriptionKey: "gallery.componentMeta.popover",
  },
  "/components/modal": {
    titleKey: "gallery.sidebar.modal",
    name: "Modal",
    descriptionKey: "gallery.componentMeta.modal",
  },
  "/components/contextmenu": {
    titleKey: "gallery.sidebar.contextmenu",
    name: "Contextmenu",
    descriptionKey: "gallery.componentMeta.contextmenu",
  },
  "/components/overlays": {
    titleKey: "gallery.sidebar.overlays",
    name: "Overlays",
    descriptionKey: "gallery.componentMeta.overlays",
  },
  "/components/progress": {
    titleKey: "gallery.sidebar.progress",
    name: "ProgressBar / RSpinner",
    descriptionKey: "gallery.componentMeta.progress",
  },
  "/components/pagination": {
    titleKey: "gallery.sidebar.pagination",
    name: "Pagination",
    descriptionKey: "gallery.componentMeta.pagination",
  },
  "/components/upload": {
    titleKey: "gallery.sidebar.upload",
    name: "FileDropper / RFileInfo",
    descriptionKey: "gallery.componentMeta.upload",
  },
  "/components/avatar": {
    titleKey: "gallery.sidebar.avatar",
    name: "Avatar",
    descriptionKey: "gallery.componentMeta.avatar",
  },
  "/components/tag": {
    titleKey: "gallery.sidebar.tag",
    name: "Tag",
    descriptionKey: "gallery.componentMeta.tag",
  },
  "/components/table": {
    titleKey: "gallery.sidebar.table",
    name: "Table",
    descriptionKey: "gallery.componentMeta.table",
  },
  "/components/data-table": {
    titleKey: "gallery.sidebar.dataTable",
    name: "DataTable",
    descriptionKey: "gallery.componentMeta.dataTable",
  },
  "/components/message": {
    titleKey: "gallery.sidebar.message",
    name: "Message",
    descriptionKey: "gallery.componentMeta.message",
  },
  "/components/kbd": {
    titleKey: "gallery.sidebar.kbd",
    name: "Kbd",
    descriptionKey: "gallery.componentMeta.kbd",
  },
  "/components/editor": {
    titleKey: "gallery.sidebar.editor",
    name: "CodeEditor",
    descriptionKey: "gallery.componentMeta.editor",
  },
  "/components/accordion": {
    titleKey: "gallery.sidebar.accordion",
    name: "Accordion",
    descriptionKey: "gallery.componentMeta.accordion",
  },
  "/components/tree": {
    titleKey: "gallery.sidebar.tree",
    name: "Tree",
    descriptionKey: "gallery.componentMeta.tree",
  },
  "/components/compositions": {
    titleKey: "gallery.sidebar.compositions",
    name: "Compositions",
    descriptionKey: "gallery.componentMeta.compositions",
  },
};

const fallbackMeta = computed<PageMeta>(() => ({
  titleKey: "",
  name: route.path
    .split("/")
    .filter(Boolean)
    .pop()
    ?.replaceAll("-", " ") ?? "",
  descriptionKey: "gallery.componentMeta.fallbackDescription",
}));

const resolvedMeta = computed(() => pageMeta[route.path] ?? fallbackMeta.value);
const resolvedTitle = computed(() =>
  props.title || (resolvedMeta.value.titleKey ? t(resolvedMeta.value.titleKey) : t("gallery.componentMeta.fallbackTitle")),
);
const resolvedName = computed(() => resolvedMeta.value.name);
const resolvedDescription = computed(
  () => props.description || t(resolvedMeta.value.descriptionKey),
);

function scrollToHeading(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function headingId(text: string, index: number) {
  const slug = text
    .trim()
    .toLowerCase()
    .replace(/[^\p{Letter}\p{Number}]+/gu, "-")
    .replace(/^-|-$/g, "");

  return `gallery-${slug || "section"}-${index}`;
}

function extractComponentExamples(source: string) {
  if (!source) return [];

  const scriptClose = "</scr" + "ipt>";
  const script =
    source.match(new RegExp(`<script setup[^>]*>([\\s\\S]*?)${scriptClose}`))?.[1] ?? "";
  const templateStart = source.indexOf("<template>");
  const templateEnd = source.lastIndexOf("</template>");
  const template =
    templateStart >= 0 && templateEnd > templateStart
      ? source.slice(templateStart + "<template>".length, templateEnd)
      : "";
  return extractComponentExampleTemplates(template).map((componentTemplate) => {
    const componentScript = cleanScriptSetup(script, componentTemplate);

    return [
      componentScript ? `<script setup lang="ts">\n${componentScript}\n${scriptClose}` : "",
      `<template>\n${indentBlock(componentTemplate, "  ")}\n</template>`,
    ]
      .filter(Boolean)
      .join("\n\n")
      .trim();
  });
}

function extractComponentExampleTemplates(template: string) {
  const examples: string[] = [];
  const output: string[][] = [];
  let activeOutput: string[] | undefined;
  let depth = 0;

  for (const line of template.split("\n")) {
    if (/^\s*<GalleryDocPage\b/.test(line) || /^\s*<\/GalleryDocPage>/.test(line)) {
      continue;
    }

    if (/^\s*<template #(effects|demo)>/.test(line) || /^ {4}<\/template>$/.test(line)) {
      continue;
    }

    const isExampleOpen = /^\s*<GalleryExample\b/.test(line);
    const isExampleClose = /^\s*<\/GalleryExample>$/.test(line) && activeOutput && depth === 1;

    if (isExampleOpen) {
      activeOutput = [];
      output.push(activeOutput);
      depth = 1;
      continue;
    }

    if (!activeOutput) continue;

    if (isExampleClose) {
      activeOutput = undefined;
      depth = 0;
      continue;
    }

    activeOutput.push(line);
    depth += countComponentTagDelta(line);
  }

  for (const block of output) {
    const cleaned = trimBlankLines(dedentBlock(block.join("\n")));
    if (cleaned) examples.push(cleaned);
  }

  return examples;
}

function cleanScriptSetup(script: string, componentTemplate: string) {
  const cleanedLines = script
    .split("\n")
    .filter((line) => !/from "\.\.\/components\/GalleryDocPage\.vue";/.test(line))
    .filter((line) => !/from "\.\.\/components\/GalleryExample\.vue";/.test(line))
    .join("\n")
    .replace(
      /import\s+\{([^}]+)\}\s+from\s+"(?:@(repo|mcsl)\/ui|reta-ui)";/g,
      (_, imports: string) => {
        const usedImports = imports
          .split(",")
          .map((item: string) => item.trim())
          .filter(Boolean)
          .filter((item: string) => {
            const localName = item.split(/\s+as\s+/).pop()?.trim() ?? item;
            const kebabName = toKebabCase(localName);

            return new RegExp(`<(${escapeRegExp(localName)}|${escapeRegExp(kebabName)})(?:\\s|>|/)`).test(componentTemplate);
          });

        return usedImports.length ? `import { ${usedImports.join(", ")} } from "reta-ui";` : "";
      },
    );

  return trimBlankLines(cleanedLines).replace(/\n{3,}/g, "\n\n");
}

function dedentBlock(value: string) {
  const lines = value.split("\n");
  const nonEmptyLines = lines.filter((line) => line.trim());
  if (!nonEmptyLines.length) return "";

  const indent = Math.min(
    ...nonEmptyLines.map((line) => line.match(/^\s*/)?.[0].length ?? 0),
  );

  return lines.map((line) => line.slice(indent)).join("\n");
}

function indentBlock(value: string, indent: string) {
  return value
    .split("\n")
    .map((line) => (line ? `${indent}${line}` : line))
    .join("\n");
}

function trimBlankLines(value: string) {
  return value.replace(/^\s*\n/, "").replace(/\n\s*$/, "").trim();
}

function countComponentTagDelta(line: string) {
  const opened = line.match(/<(?:r-[\w-]+|GalleryExample)(?:\s|>|$)/g)?.length ?? 0;
  const closed = line.match(/<\/(?:r-[\w-]+|GalleryExample)>/g)?.length ?? 0;
  const selfClosed = line.match(/<(?:r-[\w-]+|GalleryExample)[^>]*\/>/g)?.length ?? 0;

  return opened - closed - selfClosed;
}

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function toKebabCase(value: string) {
  return value
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
    .replace(/([A-Z])([A-Z][a-z])/g, "$1-$2")
    .toLowerCase();
}

async function collectToc() {
  await nextTick();

  const headings = Array.from(
    pageRoot.value?.querySelectorAll<HTMLElement>(".gallery-doc-main h2, .gallery-doc-main h3") ?? [],
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

watch(() => [route.path, i18n.locale.value], collectToc);
watch(() => route.path, () => {
  exampleCodeCursor.value = 0;
}, { flush: "sync" });
onMounted(collectToc);
onMounted(() => {
  exampleCodeMediaQuery = window.matchMedia("(min-width: 721px)");
  syncExampleCodeDensity = () => {
    exampleCodeLineNumbers.value = exampleCodeMediaQuery?.matches ?? true;
  };

  syncExampleCodeDensity();
  exampleCodeMediaQuery.addEventListener("change", syncExampleCodeDensity);
});
onUnmounted(() => {
  syncAppToc?.([]);
  if (syncExampleCodeDensity) {
    exampleCodeMediaQuery?.removeEventListener("change", syncExampleCodeDensity);
  }
});
</script>

<template>
  <div ref="pageRoot" class="gallery-doc-layout">
    <article class="gallery-doc-main">
      <header class="gallery-doc-hero">
        <h1>
          <span>{{ resolvedTitle }}</span>
          <small v-if="resolvedName">{{ resolvedName }}</small>
        </h1>
        <p v-if="resolvedDescription">{{ resolvedDescription }}</p>
      </header>

      <section class="gallery-doc-chapter">
        <h2>{{ t("gallery.sections.demo") }}</h2>

        <div class="page-shell">
          <slot name="effects">
            <div class="doc-section__fallback">{{ t("gallery.sections.noEffects") }}</div>
          </slot>

          <slot name="demo">
            <div class="doc-section__fallback">{{ t("gallery.sections.noDemo") }}</div>
          </slot>
        </div>
      </section>

      <slot name="api">
        <section class="gallery-doc-chapter">
          <h2>{{ apiTitle || t("gallery.sections.api") }}</h2>
          <p v-if="apiDescription" class="gallery-doc-chapter__description">
            {{ apiDescription }}
          </p>
          <GalleryApiTable :items="apiItems" />
        </section>
      </slot>
    </article>

    <aside
      v-if="tocItems.length"
      class="gallery-doc-toc"
      :aria-label="t('gallery.sections.onThisPage')"
    >
      <nav>
        <RButton
          v-for="item in tocItems"
          :key="item.id"
          :class="{ 'gallery-doc-toc__item--sub': item.depth === 3 }"
          class="gallery-doc-toc__item"
          align="left"
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
.gallery-doc-layout {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 180px;
  gap: 44px;
  align-items: start;
}

.gallery-doc-main {
  min-width: 0;
  padding: 28px 0;
}

.gallery-doc-hero {
  margin-bottom: 30px;
}

.gallery-doc-hero h1 {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 8px;
  margin: 0;
  color: var(--mcsl-text-color-primary);
  font-size: clamp(1.72rem, 2vw, 2.08rem);
  font-weight: 720;
  letter-spacing: 0;
  line-height: 1.2;
}

.gallery-doc-hero small {
  color: var(--mcsl-text-color-primary);
  font-size: 0.92em;
  font-weight: 650;
}

.gallery-doc-hero__link {
  align-self: center;
  margin-left: 1px;
  opacity: 0.68;
}

.gallery-doc-hero p {
  margin: 26px 0 0;
  color: var(--mcsl-text-color-regular);
  font-size: var(--mcsl-font-size-md);
  line-height: 1.75;
}

.gallery-doc-chapter {
  min-width: 0;
  scroll-margin-top: 82px;
}

.gallery-doc-chapter + .gallery-doc-chapter {
  margin-top: 34px;
}

.gallery-doc-chapter > h2 {
  margin: 0 0 20px;
  color: var(--mcsl-text-color-primary);
  font-size: 1.52rem;
  font-weight: 700;
  letter-spacing: 0;
  line-height: 1.25;
}

.gallery-doc-chapter__description {
  margin: -8px 0 16px;
  color: var(--mcsl-text-color-secondary);
  line-height: 1.65;
}

.page-shell {
  display: grid;
  gap: 24px;
}

.gallery-example-code {
  min-width: 0;
}

.gallery-example-code__block {
  min-width: 0;
}

.doc-section__fallback {
  color: var(--mcsl-text-color-secondary);
}

:deep(.doc-note) {
  color: var(--mcsl-text-color-regular);
  line-height: 1.7;
}

:deep(.doc-stack) {
  display: grid;
  gap: 14px;
}

:deep(.doc-api-table) {
  display: grid;
  border: 1px solid color-mix(in srgb, var(--mcsl-border-color-base) 88%, transparent);
  border-radius: var(--mcsl-border-radius-sm);
  overflow: hidden;
}

:deep(.doc-api-row) {
  display: grid;
  grid-template-columns: 200px minmax(0, 1fr);
}

:deep(.doc-api-row:not(:last-child)) {
  border-bottom: 1px solid color-mix(in srgb, var(--mcsl-border-color-base) 88%, transparent);
}

:deep(.doc-api-cell) {
  padding: 12px 14px;
}

:deep(.doc-api-cell--head) {
  background: color-mix(in srgb, var(--mcsl-bg-color-overlay) 96%, transparent);
  color: var(--mcsl-text-color-secondary);
}

:deep(.api-table),
:deep(.api-row),
:deep(.api-cell) {
  display: contents;
}

.gallery-doc-toc {
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

.gallery-doc-toc nav {
  display: grid;
  min-width: 0;
  gap: 2px;
}

.gallery-doc-toc__item {
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

:deep(.gallery-doc-toc__item .mcsl-button__label) {
  justify-content: flex-start;
  width: 100%;
  min-width: 0;
  text-align: left;
  overflow-wrap: anywhere;
  white-space: normal;
}

.gallery-doc-toc__item:hover,
.gallery-doc-toc__item:focus-visible {
  color: var(--mcsl-color-primary);
}

.gallery-doc-toc__item:focus-visible {
  outline: 2px solid color-mix(in srgb, var(--mcsl-color-primary) 45%, transparent);
  outline-offset: 2px;
}

.gallery-doc-toc__item--sub {
  padding-left: 12px;
  color: var(--mcsl-text-color-secondary);
}

@media (max-width: 1080px) {
  .gallery-doc-layout {
    grid-template-columns: 1fr;
    gap: 0;
  }

  .gallery-doc-main {
    padding: 28px 0;
  }

  .gallery-doc-hero {
    margin-bottom: 24px;
  }

  .gallery-doc-hero h1 {
    font-size: 1.62rem;
  }

  .gallery-doc-hero p {
    margin-top: 18px;
  }

  .gallery-doc-toc {
    display: none;
  }
}

@media (max-width: 720px) {

  .page-shell {
    gap: 18px;
  }

  .gallery-example-code {
    overflow: hidden;
  }

  :deep(.doc-stack) {
    gap: 12px;
  }

  :deep(.doc-api-table) {
    gap: 0;
  }

  :deep(.doc-api-row) {
    grid-template-columns: 1fr;
  }

  :deep(.doc-api-cell) {
    padding: 10px 12px;
  }

  :deep(.doc-api-cell--head) {
    padding-bottom: 4px;
    background: color-mix(in srgb, var(--mcsl-bg-color-dark) 94%, transparent);
    font-size: var(--mcsl-font-size-xs);
    font-weight: 650;
  }

  :deep(.doc-api-cell:not(.doc-api-cell--head)) {
    padding-top: 6px;
  }

  :deep(.button-row),
  :deep(.overlay-row),
  :deep(.tag-row),
  :deep(.avatar-row) {
    gap: 8px;
  }

  :deep(.select-grid),
  :deep(.number-grid),
  :deep(.form-grid),
  :deep(.state-grid),
  :deep(.toggle-grid),
  :deep(.display-grid),
  :deep(.status-grid),
  :deep(.result-grid),
  :deep(.empty-grid),
  :deep(.nav-grid),
  :deep(.sidebar-grid) {
    grid-template-columns: 1fr !important;
  }

  :deep(.field--full),
  :deep(.display-grid__wide) {
    grid-column: auto;
  }
}
</style>
