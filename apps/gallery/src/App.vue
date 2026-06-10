<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { usePreferredReducedMotion } from "@vueuse/core";
import { useI18n } from "vue-i18n";
import { AnimatePresence, Motion } from "motion-v";
import { Button } from "@mcsl/ui";
import { InputText } from "@mcsl/ui";
import { Sidebar } from "@mcsl/ui";
import { Switch } from "@mcsl/ui";
import { Tag } from "@mcsl/ui";
import { useAppearance } from "@mcsl/ui";
import { NotificationTemplate } from "@mcsl/ui";
import { NotificationOverlay } from "@mcsl/ui";
import { ContextmenuOverlay } from "@mcsl/ui";
import { useRoute, useRouter } from "vue-router";

const showDense = ref(false);
const showStrongAccent = ref(false);
const search = ref("");
const t = useI18n().t;
const appearance = useAppearance();
const route = useRoute();
const router = useRouter();
const preferredReducedMotion = usePreferredReducedMotion();
const galleryVersion = "v0.1.0";

const topNavItems = [
  { label: "首页", link: "/" },
  { label: "文档", link: "/docs" },
  { label: "组件", link: "/components/buttons" },
];

const pageClass = computed(() => ({
  "gallery--dense": showDense.value,
  "gallery--strong-accent": showStrongAccent.value,
}));

const routeMotionEnabled = computed(
  () => preferredReducedMotion.value !== "reduce",
);

const routeMotionInitial = computed(() =>
  routeMotionEnabled.value
    ? { opacity: 0, y: 10, filter: "blur(5px)" }
    : { opacity: 1, y: 0, filter: "blur(0px)" },
);

const routeMotionAnimate = computed(() => ({
  opacity: 1,
  y: 0,
  filter: "blur(0px)",
}));

const routeMotionExit = computed(() =>
  routeMotionEnabled.value
    ? { opacity: 0, y: -6, filter: "blur(3px)" }
    : { opacity: 1, y: 0, filter: "blur(0px)" },
);

const routeMotionTransition = computed(() => ({
  duration: routeMotionEnabled.value ? 0.22 : 0,
  ease: [0.16, 1, 0.3, 1],
}));

const darkTheme = computed({
  get: () => appearance.actualTheme === "dark",
  set: (value: boolean) => {
    appearance.changeTheme(value ? "dark" : "light", "none");
  },
});

function scrollToSection(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

const docsSidebarGroups = [
  {
    label: "文档",
    pages: [
      { label: "介绍", description: "Introduction", link: "/docs" },
      { label: "安装", description: "Installation", onClick: () => scrollToSection("docs-installation") },
      { label: "使用", description: "Usage", onClick: () => scrollToSection("docs-usage") },
      { label: "主题", description: "Theme", onClick: () => scrollToSection("docs-theme") },
      { label: "组件", description: "Components", onClick: () => scrollToSection("docs-components") },
    ],
  },
];

const componentSidebarGroups = [
  {
    label: "概览",
    pages: [
      { label: "页头", description: "PageHeader", link: "/components/page-header" },
      { label: "组合", description: "Compositions", link: "/components/compositions" },
    ],
  },
  {
    label: "通用",
    pages: [
      { label: "按钮", description: "Buttons", link: "/components/buttons" },
      { label: "头像", description: "Avatar", link: "/components/avatar" },
      { label: "标签", description: "Tag", link: "/components/tag" },
      { label: "键盘键", description: "Kbd", link: "/components/kbd" },
    ],
  },
  {
    label: "表单",
    pages: [
      { label: "输入框", description: "Input", link: "/components/input" },
      { label: "数字输入", description: "NumberBox", link: "/components/number-box" },
      { label: "选择器", description: "Select", link: "/components/select" },
      { label: "自动完成", description: "Combobox", link: "/components/combobox" },
      { label: "日期时间", description: "Date & Time", link: "/components/date-time" },
      { label: "滑块", description: "Slider", link: "/components/slider" },
      { label: "单选框", description: "Radio", link: "/components/radio" },
      { label: "复选框", description: "Checkbox", link: "/components/checkbox" },
      { label: "开关", description: "Toggle", link: "/components/toggle" },
    ],
  },
  {
    label: "展示",
    pages: [
      { label: "表格", description: "Table", link: "/components/table" },
      { label: "数据表格", description: "DataTable", link: "/components/data-table" },
      { label: "分割线", description: "Divider", link: "/components/divider" },
      { label: "折叠面板", description: "Accordion", link: "/components/accordion" },
      { label: "可复制文本", description: "CopyableText", link: "/components/copyable-text" },
      { label: "代码", description: "Code", link: "/components/code" },
      { label: "展示", description: "Display", link: "/components/display" },
      { label: "编辑器", description: "Editor", link: "/components/editor" },
    ],
  },
  {
    label: "反馈",
    pages: [
      { label: "消息", description: "Message", link: "/components/message" },
      { label: "结果", description: "Result", link: "/components/result" },
      { label: "空状态", description: "Empty", link: "/components/empty" },
      { label: "骨架屏", description: "Skeleton", link: "/components/skeleton" },
      { label: "反馈", description: "Feedback", link: "/components/feedback" },
      { label: "进度", description: "Progress", link: "/components/progress" },
      { label: "上传", description: "Upload", link: "/components/upload" },
    ],
  },
  {
    label: "导航",
    pages: [
      { label: "面包屑", description: "Breadcrumbs", link: "/components/breadcrumbs" },
      { label: "侧边栏", description: "Sidebar", link: "/components/sidebar" },
      { label: "树", description: "Tree", link: "/components/tree" },
      { label: "导航标签", description: "NavTabs", link: "/components/nav-tabs" },
      { label: "步骤条", description: "Steps", link: "/components/steps" },
      { label: "分页", description: "Pagination", link: "/components/pagination" },
      { label: "导航", description: "Navigation", link: "/components/navigation" },
    ],
  },
  {
    label: "浮层",
    pages: [
      { label: "下拉菜单", description: "Dropdown", link: "/components/dropdown" },
      { label: "抽屉", description: "Drawer", link: "/components/drawer" },
      { label: "确认对话框", description: "ConfirmDialog", link: "/components/confirm-dialog" },
      { label: "文字提示", description: "Tooltip", link: "/components/tooltip" },
      { label: "气泡卡片", description: "Popover", link: "/components/popover" },
      { label: "模态框", description: "Modal", link: "/components/modal" },
      { label: "右键菜单", description: "Contextmenu", link: "/components/contextmenu" },
      { label: "浮层", description: "Overlays", link: "/components/overlays" },
    ],
  },
];

const activeSidebarGroups = computed(() => {
  if (route.path.startsWith("/components")) return componentSidebarGroups;
  if (route.path === "/docs") return docsSidebarGroups;
  return [];
});

const hasSidebar = computed(() => activeSidebarGroups.value.length > 0);

const searchPlaceholder = computed(() => {
  if (route.path.startsWith("/components")) return "搜索组件";
  return "搜索文档导航";
});

const filteredSidebarGroups = computed(() => {
  const keyword = search.value.trim().toLowerCase();
  if (!keyword) return activeSidebarGroups.value;

  return activeSidebarGroups.value
    .map((group) => ({
      ...group,
      pages: group.pages.filter((page) =>
        [page.label, page.description, page.link]
          .join(" ")
          .toLowerCase()
          .includes(keyword),
      ),
    }))
    .filter((group) => group.pages.length > 0);
});

function isTopNavActive(link: string) {
  if (link === "/components/buttons") return route.path.startsWith("/components");
  return route.path === link;
}

function navigateTopbar(link: string) {
  if (route.path !== link) router.push(link);
}

watch(
  () => route.path,
  () => {
    search.value = "";
  },
);
</script>

<template>
  <div :class="pageClass" class="gallery-page">
    <header class="gallery-topbar">
      <div
        class="gallery-topbar__inner"
        :class="{ 'gallery-topbar__inner--no-search': !hasSidebar }"
      >
        <div class="gallery-brand">
          <img
            class="gallery-brand__mark"
            src="https://images.mcsl.com.cn/new/MCSLTeam.webp"
            alt="MCSLTeam"
          />
          <strong>MCSL UI</strong>
        </div>

        <nav class="gallery-topnav" aria-label="Primary">
          <Button
            v-for="item in topNavItems"
            :key="item.link"
            :class="{ 'is-active': isTopNavActive(item.link) }"
            size="small"
            type="text"
            @click="navigateTopbar(item.link)"
          >
            {{ item.label }}
          </Button>
        </nav>

        <InputText
          v-if="hasSidebar"
          v-model="search"
          class="gallery-search-input"
          clearable
          :placeholder="searchPlaceholder"
          size="medium"
        />

        <div class="gallery-controls">
          <label class="gallery-toggle">
            <Switch v-model="showDense" size="small" />
            <span>Dense</span>
          </label>
          <label class="gallery-toggle">
            <Switch v-model="showStrongAccent" size="small" color="help" />
            <span>Accent</span>
          </label>
          <label class="gallery-toggle">
            <Switch v-model="darkTheme" size="small" color="primary" />
            <span>{{ darkTheme ? "深色" : "浅色" }}</span>
          </label>
          <Button
            icon="fab fa-github"
            link="https://github.com/MCSLTeam/MCSL-UI"
            :router-link="false"
            size="small"
            type="text"
          >
            GitHub
          </Button>
          <Tag size="small">{{ galleryVersion }}</Tag>
        </div>
      </div>
    </header>

    <main class="gallery-shell">
      <section class="gallery-docs" :class="{ 'gallery-docs--full': !hasSidebar }">
        <aside v-if="hasSidebar" class="gallery-docs__sidebar">
          <div class="gallery-sidebar-groups">
            <section
              v-for="group in filteredSidebarGroups"
              :key="group.label"
              class="gallery-sidebar-group"
            >
              <h4>{{ group.label }}</h4>
              <Sidebar :pages="group.pages" size="small" />
            </section>
          </div>
        </aside>

        <section class="gallery-docs__content">
          <RouterView v-slot="{ Component, route: viewRoute }">
            <AnimatePresence mode="wait" :initial="false">
              <Motion
                :key="viewRoute.fullPath"
                as="div"
                class="gallery-route-motion"
                :initial="routeMotionInitial"
                :animate="routeMotionAnimate"
                :exit="routeMotionExit"
                :transition="routeMotionTransition"
              >
                <component :is="Component" />
              </Motion>
            </AnimatePresence>
          </RouterView>
        </section>
      </section>
    </main>

    <NotificationTemplate
      id="default"
      :props="
        (notif) => ({
          ...notif.settings.data,
          inAnim:
            'var(--mcsl-motion-duration-base) var(--mcsl-motion-ease-enter) both mcsl-notification-in',
        })
      "
    >
      <template v-slot="notif">
        <p>{{ notif.settings.data.message }}</p>
      </template>
    </NotificationTemplate>
    <NotificationTemplate id="do-not-show-again">
      <template v-slot="notif">
        <div>
          <p>{{ notif.settings.data.message }}</p>
          <Button
            class="gallery-notif-btn"
            type="primary"
            :color="notif.settings.data.color"
            @click="
              () => {
                notif.settings.data.onClick();
                notif.close();
              }
            "
            size="small"
          >
            {{ t("ui.common.do-not-show-again") }}
          </Button>
        </div>
      </template>
    </NotificationTemplate>
    <NotificationOverlay />
    <ContextmenuOverlay />
  </div>
</template>

<style scoped lang="scss">
:global(html),
:global(body),
:global(#app) {
  display: block !important;
  width: 100%;
  height: 100% !important;
  min-height: 0 !important;
  overflow: hidden !important;
  align-items: stretch !important;
  justify-content: flex-start !important;
  background: var(--mcsl-bg-color-main) !important;
}

.gallery-page {
  min-height: 100vh;
  background: var(--mcsl-bg-color-main);
  color: var(--mcsl-text-color-primary);
}

.gallery-topbar {
  position: sticky;
  top: 0;
  z-index: 20;
  height: 56px;
  border-bottom: 1px solid var(--mcsl-border-color-base);
  background: color-mix(in srgb, var(--mcsl-bg-color-main) 96%, transparent);
  backdrop-filter: blur(12px);
}

.gallery-topbar__inner {
  display: grid;
  grid-template-columns: auto auto minmax(180px, 280px) minmax(0, 1fr);
  align-items: center;
  gap: 24px;
  width: min(1500px, 100%);
  height: 100%;
  margin: 0 auto;
  padding: 0 18px;
  box-sizing: border-box;
}

.gallery-topbar__inner--no-search {
  grid-template-columns: auto auto minmax(0, 1fr);
}

.gallery-brand,
.gallery-topnav,
.gallery-controls,
.gallery-toggle {
  display: flex;
  align-items: center;
}

.gallery-brand {
  gap: 10px;
  min-width: 168px;
}

.gallery-brand__mark {
  width: 28px;
  height: 28px;
  display: block;
  border-radius: 7px;
  object-fit: cover;
}

.gallery-brand strong {
  color: var(--mcsl-text-color-primary);
  font-size: 20px;
  font-weight: 650;
}

.gallery-topnav {
  gap: 4px;
}

:deep(.gallery-topnav .mcsl-button.is-active) {
  color: var(--mcsl-color-primary);
}

.gallery-search-input {
  min-width: 0;
  width: 100%;
}

.gallery-controls {
  justify-content: flex-end;
  gap: 18px;
  min-width: 0;
}

.gallery-toggle {
  gap: 7px;
  color: var(--mcsl-text-color-regular);
  font-size: var(--mcsl-font-size-sm);
  white-space: nowrap;
}

.gallery-shell {
  width: min(1500px, 100%);
  height: calc(100vh - 56px);
  margin: 0 auto;
  box-sizing: border-box;
}

.gallery-docs {
  display: grid;
  grid-template-columns: 260px minmax(0, 1fr);
  height: 100%;
  min-height: 0;
}

.gallery-docs--full {
  grid-template-columns: minmax(0, 1fr);
}

.gallery-docs__sidebar {
  min-height: 0;
  overflow-y: auto;
  border-right: 1px solid var(--mcsl-border-color-base);
  background: var(--mcsl-bg-color-main);
}

.gallery-sidebar-groups {
  display: grid;
  gap: 18px;
  padding: 20px 18px 32px;
}

.gallery-sidebar-group {
  display: grid;
  gap: 8px;
}

.gallery-sidebar-group h4 {
  margin: 0 0 3px;
  padding-left: 8px;
  color: var(--mcsl-text-color-secondary);
  font-size: 13px;
  font-weight: 650;
}

:deep(.gallery-sidebar-group .sidebar__btn) {
  min-height: 2.05rem;
}

:deep(.gallery-sidebar-group .sidebar__label) {
  justify-content: space-between;
  width: 100%;
}

.gallery-docs__content {
  min-width: 0;
  min-height: 0;
  overflow-y: auto;
  padding: 28px 34px 56px;
}

.gallery-route-motion {
  min-height: 100%;
  transform-origin: 50% 0;
  will-change: opacity, transform, filter;
}

.gallery--dense .gallery-topbar__inner,
.gallery--dense .gallery-shell {
  width: min(1360px, 100%);
}

.gallery--dense .gallery-docs {
  grid-template-columns: 230px minmax(0, 1fr);
}

.gallery--dense .gallery-docs--full {
  grid-template-columns: minmax(0, 1fr);
}

.gallery-notif-btn {
  margin: var(--mcsl-spacing-4xs) var(--mcsl-spacing-2xs) 0 auto;
}

@media (max-width: 1080px) {
  .gallery-topbar {
    height: auto;
  }

  .gallery-topbar__inner {
    grid-template-columns: auto minmax(180px, 1fr);
    gap: 10px 18px;
    min-height: 56px;
    padding: 10px 14px;
  }

  .gallery-topbar__inner--no-search {
    grid-template-columns: auto minmax(0, 1fr);
  }

  .gallery-topnav {
    order: 3;
    grid-column: 1 / -1;
  }

  .gallery-controls {
    gap: 12px;
  }

  .gallery-shell {
    height: calc(100vh - 104px);
  }
}

@media (max-width: 820px) {
  :global(html),
  :global(body),
  :global(#app) {
    overflow-y: auto !important;
  }

  .gallery-topbar {
    position: relative;
  }

  .gallery-topbar__inner {
    grid-template-columns: 1fr;
    align-items: stretch;
  }

  .gallery-brand {
    min-width: 0;
  }

  .gallery-topnav,
  .gallery-controls {
    justify-content: flex-start;
    overflow-x: auto;
    padding-bottom: 2px;
  }

  .gallery-search-input {
    width: 100%;
    box-sizing: border-box;
  }

  .gallery-shell {
    height: auto;
    min-height: calc(100vh - 170px);
  }

  .gallery-docs {
    grid-template-columns: 1fr;
    height: auto;
  }

  .gallery-docs__sidebar {
    position: sticky;
    top: 0;
    z-index: 5;
    overflow-x: auto;
    overflow-y: hidden;
    border-right: 0;
    border-bottom: 1px solid var(--mcsl-border-color-base);
  }

  .gallery-sidebar-groups {
    display: flex;
    gap: 16px;
    width: max-content;
    min-width: 100%;
    padding: 12px 14px;
  }

  .gallery-sidebar-group {
    min-width: 190px;
  }

  .gallery-docs__content {
    overflow-y: visible;
    padding: 18px 14px 32px;
  }
}

@media (max-width: 460px) {
  .gallery-controls {
    gap: 10px;
  }

  .gallery-controls :deep(.mcsl-tag) {
    display: none;
  }
}
</style>
