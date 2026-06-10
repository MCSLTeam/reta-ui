<script setup lang="ts">
import { computed, nextTick, onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";
import { Code } from "@mcsl/ui";
import GalleryApiTable from "./GalleryApiTable.vue";
import { galleryCodeHighlighter } from "./galleryCodeHighlighter";
import { defaultGalleryApiDocs, galleryApiDocs } from "./galleryApiDocs";
import { galleryPageSources } from "./galleryPageSources";

type PageMeta = {
  title: string;
  name: string;
  description: string;
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
    apiTitle: "API / Props",
    apiDescription: "",
  },
);

const route = useRoute();
const apiItems = computed(() => galleryApiDocs[route.path] ?? defaultGalleryApiDocs);
const pageSource = computed(() => galleryPageSources[route.path]?.trim() ?? "");
const exampleCode = computed(() => extractComponentExample(pageSource.value));
const pageRoot = ref<HTMLElement>();
const tocItems = ref<TocItem[]>([]);

const pageMeta: Record<string, PageMeta> = {
  "/components/page-header": {
    title: "页头",
    name: "PageHeader",
    description: "承载页面标题、说明和主要操作，适合详情页与工作台顶部区域。",
  },
  "/components/buttons": {
    title: "按钮",
    name: "Button",
    description: "按钮用于触发操作，支持语义颜色、图标、加载和组合使用。",
  },
  "/components/input": {
    title: "输入框",
    name: "Input",
    description: "用于录入文本、密码、多行内容和可调整尺寸的编辑区域。",
  },
  "/components/number-box": {
    title: "数字输入",
    name: "NumberBox",
    description: "用于录入带上下限和步进控制的数值。",
  },
  "/components/select": {
    title: "选择器",
    name: "Select",
    description: "从一组明确选项中选择值，适合表单和筛选场景。",
  },
  "/components/combobox": {
    title: "组合框",
    name: "Combobox",
    description: "组合输入与选择能力，支持搜索、补全和自定义筛选。",
  },
  "/components/date-time": {
    title: "日期时间",
    name: "Date & Time",
    description: "处理日期、时间和时间窗口选择。",
  },
  "/components/slider": {
    title: "滑块",
    name: "Slider",
    description: "在连续或离散范围内调整数值。",
  },
  "/components/radio": {
    title: "单选框",
    name: "Radio",
    description: "在互斥选项中选择一个值。",
  },
  "/components/checkbox": {
    title: "复选框",
    name: "Checkbox",
    description: "表示独立布尔状态，也支持三态选择。",
  },
  "/components/toggle": {
    title: "开关",
    name: "Toggle",
    description: "用于立即启用或关闭一个设置。",
  },
  "/components/result": {
    title: "结果",
    name: "Result",
    description: "展示操作完成、失败或需要关注后的总结状态。",
  },
  "/components/empty": {
    title: "空状态",
    name: "Empty",
    description: "在没有数据或没有可操作对象时提供清晰反馈。",
  },
  "/components/divider": {
    title: "分割线",
    name: "Divider",
    description: "分隔内容区域，建立轻量的视觉层级。",
  },
  "/components/copyable-text": {
    title: "可复制文本",
    name: "CopyableText",
    description: "展示短文本并提供复制反馈。",
  },
  "/components/code": {
    title: "代码",
    name: "Code",
    description: "展示源码片段。组件接收外部 hljs 实例，不内置高亮包。",
  },
  "/components/skeleton": {
    title: "骨架屏",
    name: "Skeleton",
    description: "在内容加载前占位，降低布局跳动和等待感。",
  },
  "/components/display": {
    title: "展示",
    name: "Display",
    description: "用于信息展示、空状态和结果状态的基础组合。",
  },
  "/components/feedback": {
    title: "反馈",
    name: "Feedback",
    description: "组织消息、结果、空状态和进度反馈。",
  },
  "/components/navigation": {
    title: "导航",
    name: "Navigation",
    description: "帮助用户在页面、模块和层级之间移动。",
  },
  "/components/breadcrumbs": {
    title: "面包屑",
    name: "Breadcrumbs",
    description: "展示当前位置的层级路径。",
  },
  "/components/sidebar": {
    title: "侧边栏",
    name: "Sidebar",
    description: "用于承载页面级或模块级导航。",
  },
  "/components/nav-tabs": {
    title: "导航标签",
    name: "NavTabs",
    description: "在同一上下文内切换平级视图。",
  },
  "/components/steps": {
    title: "步骤条",
    name: "Steps",
    description: "表达流程进度和当前步骤。",
  },
  "/components/dropdown": {
    title: "下拉菜单",
    name: "Dropdown",
    description: "在触发器附近展示一组可选操作。",
  },
  "/components/drawer": {
    title: "抽屉",
    name: "Drawer",
    description: "从屏幕边缘展开补充内容或表单。",
  },
  "/components/confirm-dialog": {
    title: "确认对话框",
    name: "ConfirmDialog",
    description: "在高影响操作前请求用户确认。",
  },
  "/components/tooltip": {
    title: "文字提示",
    name: "Tooltip",
    description: "为控件提供短提示或补充说明。",
  },
  "/components/popover": {
    title: "气泡卡片",
    name: "Popover",
    description: "在触发器附近展示轻量内容。",
  },
  "/components/modal": {
    title: "模态框",
    name: "Modal",
    description: "聚焦展示需要立即处理的内容。",
  },
  "/components/contextmenu": {
    title: "右键菜单",
    name: "Contextmenu",
    description: "在上下文位置展示相关操作。",
  },
  "/components/overlays": {
    title: "浮层",
    name: "Overlays",
    description: "组合展示弹出层、提示层和确认层。",
  },
  "/components/progress": {
    title: "进度",
    name: "Progress",
    description: "展示确定或不确定任务的推进状态。",
  },
  "/components/pagination": {
    title: "分页",
    name: "Pagination",
    description: "在大量数据中分页导航。",
  },
  "/components/upload": {
    title: "上传",
    name: "Upload",
    description: "选择、拖放和展示待上传文件。",
  },
  "/components/avatar": {
    title: "头像",
    name: "Avatar",
    description: "表示用户、实例或实体身份。",
  },
  "/components/tag": {
    title: "标签",
    name: "Tag",
    description: "展示短状态、分类或属性。",
  },
  "/components/table": {
    title: "表格",
    name: "Table",
    description: "展示结构化数据和基础列表信息。",
  },
  "/components/data-table": {
    title: "数据表格",
    name: "DataTable",
    description: "展示可排序、可组织的大量行列数据。",
  },
  "/components/message": {
    title: "消息",
    name: "Message",
    description: "展示状态提示、说明和可关闭反馈。",
  },
  "/components/kbd": {
    title: "键盘键",
    name: "Kbd",
    description: "表示快捷键或键盘输入。",
  },
  "/components/editor": {
    title: "编辑器",
    name: "Editor",
    description: "承载配置、脚本或大段文本编辑。",
  },
  "/components/accordion": {
    title: "折叠面板",
    name: "Accordion",
    description: "组织可展开和收起的内容组。",
  },
  "/components/tree": {
    title: "树",
    name: "Tree",
    description: "展示文件、配置或实体的层级结构。",
  },
  "/components/compositions": {
    title: "组合示例",
    name: "Compositions",
    description: "展示多个组件在真实界面中的组合方式。",
  },
};

const fallbackMeta = computed<PageMeta>(() => ({
  title: route.path
    .split("/")
    .filter(Boolean)
    .pop()
    ?.replaceAll("-", " ") ?? "组件",
  name: "",
  description: "MCSL UI 组件示例与 API 文档。",
}));

const resolvedMeta = computed(() => pageMeta[route.path] ?? fallbackMeta.value);
const resolvedTitle = computed(() => props.title || resolvedMeta.value.title);
const resolvedName = computed(() => resolvedMeta.value.name);
const resolvedDescription = computed(
  () => props.description || resolvedMeta.value.description,
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

function extractComponentExample(source: string) {
  if (!source) return "";

  const scriptClose = "</scr" + "ipt>";
  const script =
    source.match(new RegExp(`<script setup[^>]*>([\\s\\S]*?)${scriptClose}`))?.[1] ?? "";
  const templateStart = source.indexOf("<template>");
  const templateEnd = source.lastIndexOf("</template>");
  const template =
    templateStart >= 0 && templateEnd > templateStart
      ? source.slice(templateStart + "<template>".length, templateEnd)
      : "";
  const componentTemplate = extractComponentTemplate(template);
  const componentScript = cleanScriptSetup(script, componentTemplate);

  return [
    componentScript ? `<script setup lang="ts">\n${componentScript}\n${scriptClose}` : "",
    `<template>\n${indentBlock(componentTemplate, "  ")}\n</template>`,
  ]
    .filter(Boolean)
    .join("\n\n")
    .trim();
}

function extractComponentTemplate(template: string) {
  const output: string[] = [];
  let skippingHeader = false;

  for (const line of template.split("\n")) {
    if (/^\s*<GalleryDocPage\b/.test(line) || /^\s*<\/GalleryDocPage>/.test(line)) {
      continue;
    }

    if (/^\s*<template #(effects|demo)>/.test(line) || /^ {4}<\/template>$/.test(line)) {
      continue;
    }

    if (skippingHeader) {
      if (/^\s*<\/template>/.test(line)) skippingHeader = false;
      continue;
    }

    if (/^\s*<template #header>/.test(line)) {
      skippingHeader = !/<\/template>/.test(line);
      continue;
    }

    if (/^ {6}<Panel\b[^>]*class="doc-section"/.test(line) || /^ {6}<\/Panel>$/.test(line)) {
      continue;
    }

    output.push(line);
  }

  return trimBlankLines(dedentBlock(output.join("\n")));
}

function cleanScriptSetup(script: string, componentTemplate: string) {
  const cleanedLines = script
    .split("\n")
    .filter((line) => !/from "\.\.\/components\/GalleryDocPage\.vue";/.test(line))
    .join("\n")
    .replace(
      /import\s+\{([^}]+)\}\s+from\s+"@repo\/ui";/g,
      (_, imports: string) => {
        const usedImports = imports
          .split(",")
          .map((item: string) => item.trim())
          .filter(Boolean)
          .filter((item: string) => {
            const localName = item.split(/\s+as\s+/).pop()?.trim() ?? item;

            return new RegExp(`<${escapeRegExp(localName)}(?:\\s|>|/)`).test(componentTemplate);
          });

        return usedImports.length ? `import { ${usedImports.join(", ")} } from "@mcsl/ui";` : "";
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

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

async function collectToc() {
  await nextTick();

  const headings = Array.from(
    pageRoot.value?.querySelectorAll<HTMLElement>(".gallery-doc-main h2, .gallery-doc-main h3") ?? [],
  ).filter((heading) => heading.textContent?.trim());

  tocItems.value = headings.map((heading, index) => {
    if (!heading.id) heading.id = headingId(heading.textContent ?? "", index);

    return {
      id: heading.id,
      label: heading.textContent?.trim() ?? "",
      depth: heading.tagName === "H3" ? 3 : 2,
    };
  });
}

watch(() => route.path, collectToc);
onMounted(collectToc);
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
        <h2>演示</h2>

        <div class="page-shell">
          <slot name="effects">
            <div class="doc-section__fallback">No effects preview.</div>
          </slot>

          <slot name="demo">
            <div class="doc-section__fallback">No live demo.</div>
          </slot>
        </div>
      </section>

      <section v-if="exampleCode" class="gallery-doc-chapter gallery-code-section">
        <h2>示例代码</h2>
        <Code
          :code="exampleCode"
          language="xml"
          :hljs="galleryCodeHighlighter"
          line-numbers
        />
      </section>

      <slot name="api">
        <section class="gallery-doc-chapter">
          <h2>API</h2>
          <p v-if="apiDescription" class="gallery-doc-chapter__description">
            {{ apiDescription }}
          </p>
          <GalleryApiTable :items="apiItems" />
        </section>
      </slot>
    </article>

    <aside v-if="tocItems.length" class="gallery-doc-toc" aria-label="On this page">
      <nav>
        <button
          v-for="item in tocItems"
          :key="item.id"
          :class="{ 'gallery-doc-toc__item--sub': item.depth === 3 }"
          class="gallery-doc-toc__item"
          type="button"
          @click="scrollToHeading(item.id)"
        >
          {{ item.label }}
        </button>
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
  max-width: 1180px;
}

.gallery-doc-main {
  min-width: 0;
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
  max-width: 680px;
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

.doc-section__fallback {
  color: var(--mcsl-text-color-secondary);
}

:deep(.doc-section.mcsl-panel) {
  padding: 0;
  overflow: visible;
  border: 0;
  border-radius: 0;
  background: transparent;
  box-shadow: none !important;
}

:deep(.doc-section.mcsl-panel > .mcsl-divider) {
  display: none;
}

:deep(.doc-section.mcsl-panel > .mcsl-panel__header) {
  display: block;
  margin: 0 0 14px;
}

:deep(.doc-section.mcsl-panel > .mcsl-panel__body-wrapper) {
  overflow: visible;
}

:deep(.doc-section.mcsl-panel > .mcsl-panel__body-wrapper > .mcsl-panel__body) {
  padding: 0;
}

:deep(.doc-section .mcsl-panel__header h2),
:deep(.doc-section .mcsl-panel__header h3),
:deep(.doc-section .mcsl-panel__header h4) {
  margin: 0;
  color: var(--mcsl-text-color-primary);
  font-size: 1.18rem;
  font-weight: 680;
  letter-spacing: 0;
  line-height: 1.35;
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
  max-height: calc(100vh - 112px);
  overflow: auto;
  padding: 1px 0 8px;
}

.gallery-doc-toc nav {
  display: grid;
  gap: 2px;
}

.gallery-doc-toc__item {
  width: 100%;
  padding: 5px 0;
  border: 0;
  background: transparent;
  color: var(--mcsl-text-color-regular);
  font: inherit;
  font-size: var(--mcsl-font-size-sm);
  line-height: 1.35;
  text-align: left;
  cursor: pointer;
  transition:
    color var(--mcsl-motion-duration-fast) var(--mcsl-motion-ease-standard),
    transform var(--mcsl-motion-duration-fast) var(--mcsl-motion-ease-standard);
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

@media (max-width: 720px) {
  .gallery-doc-layout {
    grid-template-columns: 1fr;
    gap: 0;
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

  .page-shell {
    gap: 18px;
  }

  :deep(.doc-section .mcsl-panel__header h2) {
    font-size: 1.08rem;
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
