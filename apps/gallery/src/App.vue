<script setup lang="ts">
import { computed, provide, ref, watch } from "vue";
import { usePreferredReducedMotion } from "@vueuse/core";
import { useI18n } from "vue-i18n";
import { AnimatePresence, Motion } from "motion-v";
import { RButton } from "reta-ui";
import { RInputText } from "reta-ui";
import { RPopover } from "reta-ui";
import { RSidebar } from "reta-ui";
import { RSelect } from "reta-ui";
import { RSwitch } from "reta-ui";
import { RTag } from "reta-ui";
import { useAppearance } from "reta-ui";
import { useLocale } from "reta-ui";
import { RNotificationTemplate } from "reta-ui";
import { RNotificationOverlay } from "reta-ui";
import { RContextmenuOverlay } from "reta-ui";
import { useRoute, useRouter } from "vue-router";
import RetaLogo from "./components/RetaLogo.vue";

type GalleryTocItem = {
  id: string;
  label: string;
  depth: number;
};

const search = ref("");
const i18n = useI18n();
const t = i18n.t;
const appearance = useAppearance();
const localeStore = useLocale();
const route = useRoute();
const router = useRouter();
const preferredReducedMotion = usePreferredReducedMotion();
const galleryVersion = "v0.1.0";
const currentTocItems = ref<GalleryTocItem[]>([]);
const collapsedMobileMenuSections = ref(new Set<string>());
const collapsedSidebarGroups = ref(new Set<string>());
const mobileMenuSectionsInitialized = ref(false);
const sidebarGroupsInitialized = ref(false);

provide("gallery-doc-toc", (items: GalleryTocItem[]) => {
  currentTocItems.value = items;
});

const topNavItems = computed(() => [
  { label: t("gallery.nav.home"), link: "/" },
  { label: t("gallery.nav.docs"), link: "/docs" },
  { label: t("gallery.nav.components"), link: "/components/buttons" },
]);

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

const languageOptions = [
  { label: "中文", value: "zh-CN" },
  { label: "English", value: "en-US" },
];

const galleryLanguage = computed({
  get: () => (String(i18n.locale.value).startsWith("zh") ? "zh-CN" : "en-US"),
  set: (value: string) => {
    localeStore.setLocale(value as "zh-CN" | "en-US");
  },
});

function scrollToSection(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

const docsSidebarGroups = computed(() => [
  {
    label: t("gallery.sidebar.docs"),
    pages: [
      { label: t("gallery.docs.nav.quickStart"), onClick: () => scrollToSection("docs-quick-start") },
      { label: t("gallery.docs.nav.installation"), onClick: () => scrollToSection("docs-installation") },
      { label: t("gallery.docs.nav.sfc"), onClick: () => scrollToSection("docs-sfc") },
      { label: t("gallery.docs.nav.onDemand"), onClick: () => scrollToSection("docs-on-demand") },
      { label: t("gallery.docs.nav.platforms"), onClick: () => scrollToSection("docs-platforms") },
      { label: t("gallery.docs.nav.controlled"), onClick: () => scrollToSection("docs-controlled") },
      { label: t("gallery.docs.nav.guides"), onClick: () => scrollToSection("docs-guides") },
      { label: t("gallery.docs.nav.theme"), onClick: () => scrollToSection("docs-theme") },
      { label: t("gallery.docs.nav.i18n"), onClick: () => scrollToSection("docs-i18n") },
    ],
  },
]);

const componentSidebarGroups = computed(() => [
  {
    label: t("gallery.sidebar.general"),
    pages: [
      { label: t("gallery.sidebar.buttons"), description: "Buttons", link: "/components/buttons" },
      { label: t("gallery.sidebar.avatar"), description: "Avatar", link: "/components/avatar" },
      { label: t("gallery.sidebar.tag"), description: "Tag", link: "/components/tag" },
      { label: t("gallery.sidebar.kbd"), description: "Kbd", link: "/components/kbd" },
    ],
  },
  {
    label: t("gallery.sidebar.layout"),
    pages: [
      { label: t("gallery.sidebar.panel"), description: "Panel", link: "/components/panel" },
      { label: t("gallery.sidebar.pageHeader"), description: "PageHeader", link: "/components/page-header" },
      { label: t("gallery.sidebar.divider"), description: "Divider", link: "/components/divider" },
      { label: t("gallery.sidebar.accordion"), description: "Accordion", link: "/components/accordion" },
      { label: t("gallery.sidebar.compositions"), description: "Compositions", link: "/components/compositions" },
    ],
  },
  {
    label: t("gallery.sidebar.form"),
    pages: [
      { label: t("gallery.sidebar.input"), description: "Input", link: "/components/input" },
      { label: t("gallery.sidebar.numberBox"), description: "NumberBox", link: "/components/number-box" },
      { label: t("gallery.sidebar.combobox"), description: "Combobox", link: "/components/combobox" },
      { label: t("gallery.sidebar.select"), description: "Select", link: "/components/select" },
      { label: t("gallery.sidebar.dateTime"), description: "Date & Time", link: "/components/date-time" },
      { label: t("gallery.sidebar.slider"), description: "Slider", link: "/components/slider" },
      { label: t("gallery.sidebar.radio"), description: "Radio", link: "/components/radio" },
      { label: t("gallery.sidebar.checkbox"), description: "Checkbox", link: "/components/checkbox" },
      { label: t("gallery.sidebar.toggle"), description: "Toggle", link: "/components/toggle" },
      { label: t("gallery.sidebar.transfer"), description: "Transfer", link: "/components/transfer" },
    ],
  },
  {
    label: t("gallery.sidebar.dataDisplay"),
    pages: [
      { label: t("gallery.sidebar.table"), description: "Table", link: "/components/table" },
      { label: t("gallery.sidebar.dataTable"), description: "DataTable", link: "/components/data-table" },
      { label: t("gallery.sidebar.tree"), description: "Tree", link: "/components/tree" },
      { label: t("gallery.sidebar.copyableText"), description: "CopyableText", link: "/components/copyable-text" },
      { label: t("gallery.sidebar.code"), description: "Code", link: "/components/code" },
      { label: t("gallery.sidebar.displayPage"), description: "Display", link: "/components/display" },
      { label: t("gallery.sidebar.editor"), description: "Editor", link: "/components/editor" },
    ],
  },
  {
    label: t("gallery.sidebar.feedback"),
    pages: [
      { label: t("gallery.sidebar.message"), description: "Message", link: "/components/message" },
      { label: t("gallery.sidebar.result"), description: "Result", link: "/components/result" },
      { label: t("gallery.sidebar.empty"), description: "Empty", link: "/components/empty" },
      { label: t("gallery.sidebar.skeleton"), description: "Skeleton", link: "/components/skeleton" },
      { label: t("gallery.sidebar.feedback"), description: "Feedback", link: "/components/feedback" },
      { label: t("gallery.sidebar.progress"), description: "Progress", link: "/components/progress" },
      { label: t("gallery.sidebar.upload"), description: "Upload", link: "/components/upload" },
    ],
  },
  {
    label: t("gallery.sidebar.navigation"),
    pages: [
      { label: t("gallery.sidebar.breadcrumbs"), description: "Breadcrumbs", link: "/components/breadcrumbs" },
      { label: t("gallery.sidebar.sidebar"), description: "Sidebar", link: "/components/sidebar" },
      { label: t("gallery.sidebar.navTabs"), description: "NavTabs", link: "/components/nav-tabs" },
      { label: t("gallery.sidebar.steps"), description: "Steps", link: "/components/steps" },
      { label: t("gallery.sidebar.pagination"), description: "Pagination", link: "/components/pagination" },
      { label: t("gallery.sidebar.navigation"), description: "Navigation", link: "/components/navigation" },
    ],
  },
  {
    label: t("gallery.sidebar.overlay"),
    pages: [
      { label: t("gallery.sidebar.dropdown"), description: "Dropdown", link: "/components/dropdown" },
      { label: t("gallery.sidebar.drawer"), description: "Drawer", link: "/components/drawer" },
      { label: t("gallery.sidebar.confirmDialog"), description: "ConfirmDialog", link: "/components/confirm-dialog" },
      { label: t("gallery.sidebar.tooltip"), description: "Tooltip", link: "/components/tooltip" },
      { label: t("gallery.sidebar.popover"), description: "Popover", link: "/components/popover" },
      { label: t("gallery.sidebar.modal"), description: "Modal", link: "/components/modal" },
      { label: t("gallery.sidebar.contextmenu"), description: "Contextmenu", link: "/components/contextmenu" },
      { label: t("gallery.sidebar.overlays"), description: "Overlays", link: "/components/overlays" },
    ],
  },
]);

const activeSidebarGroups = computed(() => {
  if (route.path.startsWith("/components")) return componentSidebarGroups.value;
  if (route.path === "/docs") return docsSidebarGroups.value;
  return [];
});

const hasSidebar = computed(() => activeSidebarGroups.value.length > 0);

const shellClass = computed(() => ({
  "gallery-shell--home": route.path === "/",
  "gallery-shell--docs": route.path === "/docs",
  "gallery-shell--components": route.path.startsWith("/components"),
}));

const searchPlaceholder = computed(() => {
  if (route.path.startsWith("/components")) return t("gallery.controls.searchComponents");
  return t("gallery.controls.searchDocs");
});

const filteredSidebarGroups = computed(() => {
  const keyword = search.value.trim().toLowerCase();
  if (!keyword) return activeSidebarGroups.value;

  return activeSidebarGroups.value
    .map((group) => ({
      ...group,
      pages: group.pages.filter((page) =>
        [
          page.label,
          "description" in page ? page.description : "",
          "link" in page ? page.link : "",
        ]
          .join(" ")
          .toLowerCase()
          .includes(keyword),
      ),
    }))
    .filter((group) => group.pages.length > 0);
});

const visibleMobileSidebarGroups = computed(() =>
  filteredSidebarGroups.value.filter((group) => group.pages.length > 0),
);

const activeMobileSidebarGroupLabel = computed(() => {
  for (const group of visibleMobileSidebarGroups.value) {
    if (group.pages.some((page) => isSidebarPageActive(page))) return group.label;
  }
  return visibleMobileSidebarGroups.value[0]?.label;
});

function mobileSectionKey(type: string, label = "") {
  return label ? `${type}:${label}` : type;
}

function isMobileMenuSectionCollapsed(type: string, label = "") {
  return collapsedMobileMenuSections.value.has(mobileSectionKey(type, label));
}

function toggleMobileMenuSection(type: string, label = "") {
  const key = mobileSectionKey(type, label);
  const next = new Set(collapsedMobileMenuSections.value);
  if (next.has(key)) {
    next.delete(key);
  } else {
    next.add(key);
  }
  collapsedMobileMenuSections.value = next;
}

function resetMobileMenuSections() {
  const next = new Set<string>();
  for (const group of visibleMobileSidebarGroups.value) {
    if (group.label !== activeMobileSidebarGroupLabel.value) {
      next.add(mobileSectionKey("sidebar", group.label));
    }
  }
  collapsedMobileMenuSections.value = next;
}

function expandActiveMobileSidebarGroup() {
  const activeLabel = activeMobileSidebarGroupLabel.value;
  if (!activeLabel) return;

  const next = new Set(collapsedMobileMenuSections.value);
  next.delete(mobileSectionKey("sidebar", activeLabel));
  collapsedMobileMenuSections.value = next;
}

function sidebarGroupKey(label: string) {
  return `sidebar:${label}`;
}

function isSidebarGroupCollapsed(label: string) {
  return collapsedSidebarGroups.value.has(sidebarGroupKey(label));
}

function toggleSidebarGroup(label: string) {
  const key = sidebarGroupKey(label);
  const next = new Set(collapsedSidebarGroups.value);
  if (next.has(key)) {
    next.delete(key);
  } else {
    next.add(key);
  }
  collapsedSidebarGroups.value = next;
}

function resetSidebarGroups() {
  if (route.path === "/docs") {
    collapsedSidebarGroups.value = new Set();
    return;
  }

  const keyword = search.value.trim();
  if (keyword) {
    collapsedSidebarGroups.value = new Set();
    return;
  }

  const next = new Set<string>();
  for (const group of filteredSidebarGroups.value) {
    if (!group.pages.some((page) => isSidebarPageActive(page))) {
      next.add(sidebarGroupKey(group.label));
    }
  }
  collapsedSidebarGroups.value = next;
}

function syncMobileMenuSectionsForRoute() {
  if (!visibleMobileSidebarGroups.value.length) return;

  if (!mobileMenuSectionsInitialized.value) {
    resetMobileMenuSections();
    mobileMenuSectionsInitialized.value = true;
    return;
  }

  expandActiveMobileSidebarGroup();
}

function syncSidebarGroupsForRoute() {
  if (!filteredSidebarGroups.value.length) return;

  if (!sidebarGroupsInitialized.value) {
    resetSidebarGroups();
    sidebarGroupsInitialized.value = true;
    return;
  }

  expandActiveSidebarGroup();
}

function expandActiveSidebarGroup() {
  const activeGroup = filteredSidebarGroups.value.find((group) =>
    group.pages.some((page) => isSidebarPageActive(page)),
  );
  if (!activeGroup) return;

  const next = new Set(collapsedSidebarGroups.value);
  next.delete(sidebarGroupKey(activeGroup.label));
  collapsedSidebarGroups.value = next;
}

function isTopNavActive(link: string) {
  if (link === "/components/buttons") return route.path.startsWith("/components");
  return route.path === link;
}

function navigateTopbar(link: string) {
  if (route.path !== link) router.push(link);
}

function activateSidebarPage(page: { link?: string; onClick?: () => void }) {
  if (page.link) navigateTopbar(page.link);
  page.onClick?.();
}

function isSidebarPageActive(page: unknown) {
  return (
    typeof page === "object" &&
    page !== null &&
    "link" in page &&
    typeof page.link === "string" &&
    route.path === page.link
  );
}

function scrollToTocItem(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

watch(
  () => route.path,
  () => {
    search.value = "";
    currentTocItems.value = [];
    syncMobileMenuSectionsForRoute();
    syncSidebarGroupsForRoute();
  },
  { immediate: true },
);

watch(search, () => {
  resetMobileMenuSections();
  resetSidebarGroups();
});

</script>

<template>
  <div class="gallery-page">
    <header class="gallery-topbar">
      <div
        class="gallery-topbar__inner"
        :class="{ 'gallery-topbar__inner--no-search': !hasSidebar }"
      >
        <router-link
          class="gallery-brand"
          to="/"
          aria-label="Reta UI"
        >
          <div class="gallery-brand__content">
            <span class="gallery-brand__mark" aria-hidden="true">
              <RetaLogo />
            </span>
            <span class="gallery-brand__copy">
              <strong>Reta UI</strong>
            </span>
          </div>
        </router-link>

        <nav class="gallery-topnav" :aria-label="t('gallery.nav.primary')">
          <r-button
            v-for="item in topNavItems"
            :key="item.link"
            :class="{ 'is-active': isTopNavActive(item.link) }"
            size="small"
            type="text"
            @click="navigateTopbar(item.link)"
          >
            {{ item.label }}
          </r-button>
        </nav>

        <r-input-text
          v-if="hasSidebar"
          v-model="search"
          class="gallery-search-input gallery-search-input--desktop"
          clearable
          search
          :placeholder="searchPlaceholder"
          size="medium"
        />

        <div class="gallery-controls gallery-controls--desktop">
          <label class="gallery-language">
            <span>{{ t("gallery.controls.language") }}</span>
            <r-select
              v-model="galleryLanguage"
              :options="languageOptions"
              class="gallery-language__select"
              size="small"
            />
          </label>
          <label class="gallery-toggle">
            <r-switch v-model="darkTheme" size="small" color="primary" />
            <span>{{
              darkTheme
                ? t("gallery.controls.themeDark")
                : t("gallery.controls.themeLight")
            }}</span>
          </label>
          <r-button
            icon="fab fa-github"
            link="https://github.com/MCSLTeam/reta-ui"
            :router-link="false"
            size="small"
            type="text"
          >
            GitHub
          </r-button>
          <r-tag size="small">{{ galleryVersion }}</r-tag>
        </div>

        <r-popover class="gallery-mobile-menu" :title="t('gallery.controls.more')">
          <template #triggerer="{ toggle }">
            <r-button
              :aria-label="t('gallery.controls.more')"
              icon="fas fa-ellipsis"
              squared
              type="text"
              @click="toggle"
            />
          </template>

          <div class="gallery-mobile-menu__body">
            <section class="gallery-mobile-menu__section gallery-mobile-menu__settings">
              <label class="gallery-language gallery-mobile-menu__row">
                <span>{{ t("gallery.controls.language") }}</span>
                <r-select
                  v-model="galleryLanguage"
                  :options="languageOptions"
                  class="gallery-language__select"
                  size="small"
                />
              </label>

              <label class="gallery-toggle gallery-mobile-menu__row">
                <r-switch v-model="darkTheme" size="small" color="primary" />
                <span>{{
                  darkTheme
                    ? t("gallery.controls.themeDark")
                    : t("gallery.controls.themeLight")
                }}</span>
              </label>

              <div class="gallery-mobile-menu__actions">
                <r-button
                  icon="fab fa-github"
                  link="https://github.com/MCSLTeam/reta-ui"
                  :router-link="false"
                  size="small"
                  type="text"
                >
                  GitHub
                </r-button>
                <r-tag size="small">{{ galleryVersion }}</r-tag>
              </div>
            </section>

            <section class="gallery-mobile-menu__section">
              <h3>{{ t("gallery.nav.primary") }}</h3>
              <div class="gallery-mobile-menu__nav">
                <r-button
                  v-for="item in topNavItems"
                  :key="item.link"
                  :class="{ 'is-active': isTopNavActive(item.link) }"
                  align="left"
                  type="text"
                  @click="navigateTopbar(item.link)"
                >
                  {{ item.label }}
                </r-button>
              </div>
            </section>

            <r-input-text
              v-if="hasSidebar"
              v-model="search"
              clearable
              search
              :placeholder="searchPlaceholder"
              size="medium"
            />

            <section
              v-if="hasSidebar && visibleMobileSidebarGroups.length"
              class="gallery-mobile-menu__section gallery-mobile-menu__section--flush"
            >
              <div class="gallery-mobile-sidebar-groups">
                <section
                  v-for="group in visibleMobileSidebarGroups"
                  :key="group.label"
                  class="gallery-mobile-sidebar-group"
                >
                  <button
                    class="gallery-mobile-menu__heading"
                    type="button"
                    @click="toggleMobileMenuSection('sidebar', group.label)"
                  >
                    <span>{{ group.label }}</span>
                    <i
                      class="fas fa-chevron-down"
                      :class="{ 'is-collapsed': isMobileMenuSectionCollapsed('sidebar', group.label) }"
                    />
                  </button>
                  <div
                    v-show="!isMobileMenuSectionCollapsed('sidebar', group.label)"
                    class="gallery-mobile-menu__nav"
                  >
                    <r-button
                      v-for="page in group.pages"
                      :key="page.label"
                      :class="{ 'is-active': isSidebarPageActive(page) }"
                      align="left"
                      type="text"
                      @click="activateSidebarPage(page)"
                    >
                      <span>{{ page.label }}</span>
                      <small v-if="'description' in page">{{ page.description }}</small>
                    </r-button>
                  </div>
                </section>
              </div>
            </section>
          </div>
        </r-popover>
      </div>
    </header>

    <div v-if="currentTocItems.length" class="gallery-mobile-toc-bar">
      <r-popover class="gallery-mobile-toc" :title="t('gallery.sections.onThisPage')">
        <template #triggerer="{ toggle }">
          <r-button
            align="left"
            class="gallery-mobile-toc__trigger"
            icon="fas fa-list-ul"
            type="text"
            @click="toggle"
          >
            {{ t("gallery.sections.onThisPage") }}
          </r-button>
        </template>

        <div class="gallery-mobile-toc__body">
          <r-button
            v-for="item in currentTocItems"
            :key="item.id"
            :class="{ 'gallery-mobile-toc__item--sub': item.depth === 3 }"
            align="left"
            class="gallery-mobile-toc__item"
            type="text"
            @click="scrollToTocItem(item.id)"
          >
            {{ item.label }}
          </r-button>
        </div>
      </r-popover>
    </div>

    <main class="gallery-shell" :class="shellClass">
      <section class="gallery-docs" :class="{ 'gallery-docs--full': !hasSidebar }">
        <aside v-if="hasSidebar" class="gallery-docs__sidebar">
          <div class="gallery-sidebar-groups">
            <section
              v-for="group in filteredSidebarGroups"
              :key="group.label"
              class="gallery-sidebar-group"
            >
              <button
                class="gallery-sidebar-group__heading"
                type="button"
                @click="toggleSidebarGroup(group.label)"
              >
                <span>{{ group.label }}</span>
                <i
                  class="fas fa-chevron-down"
                  :class="{ 'is-collapsed': isSidebarGroupCollapsed(group.label) }"
                />
              </button>
              <r-sidebar
                v-show="!isSidebarGroupCollapsed(group.label)"
                :pages="group.pages"
                size="small"
              />
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

    <r-notification-template
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
    </r-notification-template>
    <r-notification-template id="do-not-show-again">
      <template v-slot="notif">
        <div>
          <p>{{ notif.settings.data.message }}</p>
          <r-button
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
          </r-button>
        </div>
      </template>
    </r-notification-template>
    <r-notification-overlay />
    <r-contextmenu-overlay />
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
  padding: 0;
  box-sizing: border-box;
}

.gallery-topbar__inner--no-search {
  grid-template-columns: auto auto minmax(0, 1fr);
}

.gallery-brand,
.gallery-topnav,
.gallery-controls,
.gallery-toggle,
.gallery-language {
  display: flex;
  align-items: center;
}

.gallery-brand {
  width: fit-content;
  max-width: 150px;
  white-space: nowrap;
  padding: 0;
  border: 0;
  background: transparent;
  color: inherit;
  cursor: pointer;
  font: inherit;
  text-align: left;
  text-decoration: none;
  min-width: 0;
  flex: 0 1 min(172px, calc(100vw - 96px));
}

.gallery-brand__content {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 11px;
  margin-left: 11px;
  max-width: 100%;
  flex-wrap: nowrap;
  min-width: 0;
  white-space: nowrap;
}

.gallery-brand:hover strong {
  color: var(--mcsl-color-primary);
}

.gallery-brand__mark {
  width: 34px;
  height: 34px;
  flex: 0 0 34px;
  display: block;
  border-radius: 9px;
  box-shadow:
    0 8px 18px color-mix(in srgb, var(--mcsl-color-primary) 20%, transparent),
    0 0 0 1px color-mix(in srgb, var(--mcsl-border-color-base) 42%, transparent);
}

.gallery-brand__copy {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  flex: 1 1 auto;
  min-width: 0;
  gap: 1px;
  line-height: 1.05;
}

.gallery-brand strong {
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  color: var(--mcsl-text-color-primary);
  font-size: 18px;
  font-weight: 650;
  white-space: nowrap;
}

.gallery-brand small {
  color: var(--mcsl-text-color-secondary);
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0;
  white-space: nowrap;
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

.gallery-mobile-menu {
  display: none;
}

:deep(.gallery-mobile-menu > .mcsl-button) {
  margin-right: 16px;
}

.gallery-mobile-menu__body {
  display: grid;
  gap: 10px;
  box-sizing: border-box;
  width: min(78vw, 19rem);
  max-height: min(70vh, 38rem);
  min-width: 0;
  max-width: 100%;
  overflow-x: hidden;
  overflow-y: auto;
}

.gallery-mobile-menu__row {
  justify-content: space-between;
  width: 100%;
}

.gallery-mobile-menu__settings {
  padding-bottom: 10px;
  border-bottom: 1px solid var(--mcsl-border-color-base);
}

.gallery-mobile-menu__section,
.gallery-mobile-sidebar-groups,
.gallery-mobile-sidebar-group,
.gallery-mobile-menu__nav {
  display: grid;
  min-width: 0;
  width: 100%;
}

.gallery-mobile-menu__section,
.gallery-mobile-sidebar-groups {
  gap: 8px;
}

.gallery-mobile-menu__section--flush {
  gap: 6px;
}

.gallery-mobile-sidebar-group,
.gallery-mobile-menu__nav {
  gap: 2px;
}

.gallery-mobile-menu__section h3,
.gallery-mobile-sidebar-group h3 {
  margin: 0;
  padding: 2px 4px;
  color: var(--mcsl-text-color-secondary);
  font-size: var(--mcsl-font-size-sm);
  font-weight: 680;
  line-height: 1.35;
}

.gallery-mobile-menu__heading {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  width: 100%;
  min-width: 0;
  min-height: 30px;
  padding: 0 4px;
  border: 0;
  border-radius: var(--mcsl-border-radius-sm);
  background: transparent;
  color: var(--mcsl-text-color-secondary);
  cursor: pointer;
  font: inherit;
  font-size: var(--mcsl-font-size-sm);
  font-weight: 680;
  line-height: 1.35;
  text-align: left;
  transition:
    background-color var(--mcsl-motion-duration-fast) var(--mcsl-motion-ease-enter),
    color var(--mcsl-motion-duration-fast) var(--mcsl-motion-ease-enter);
}

.gallery-mobile-menu__heading:hover {
  background: color-mix(in srgb, var(--mcsl-bg-color-dark) 74%, transparent);
  color: var(--mcsl-text-color-primary);
}

.gallery-mobile-menu__heading span {
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.gallery-mobile-menu__heading i {
  flex: none;
  font-size: 11px;
  opacity: 0.72;
  transform: rotate(0deg);
  transition: transform var(--mcsl-motion-duration-fast) var(--mcsl-motion-ease-enter);
}

.gallery-mobile-menu__heading i.is-collapsed {
  transform: rotate(-90deg);
}

.gallery-mobile-menu__nav :deep(.mcsl-button) {
  justify-content: flex-start;
  min-width: 0;
  width: 100%;
  max-width: 100%;
}

.gallery-mobile-menu__nav :deep(.mcsl-button.is-active) {
  color: var(--mcsl-color-primary);
}

.gallery-mobile-menu__nav :deep(.mcsl-button__label) {
  display: flex;
  align-items: baseline;
  gap: 8px;
  min-width: 0;
  width: 100%;
  text-align: left;
}

.gallery-mobile-menu__nav small {
  flex: none;
  color: var(--mcsl-text-color-secondary);
  font-size: var(--mcsl-font-size-xs);
  line-height: 1.35;
  opacity: 0.82;
  white-space: nowrap;
}

.gallery-mobile-menu__nav span {
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.gallery-mobile-menu__toc-sub {
  padding-left: 14px;
}

.gallery-mobile-menu__actions {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  min-width: 0;
}

.gallery-mobile-menu__actions :deep(.mcsl-button) {
  min-width: 0;
  max-width: 100%;
}

.gallery-mobile-toc-bar {
  display: none;
}

.gallery-mobile-toc__body {
  display: grid;
  gap: 3px;
  width: min(82vw, 22rem);
  max-height: min(60vh, 32rem);
  overflow: auto;
}

.gallery-mobile-toc__trigger,
.gallery-mobile-toc__item {
  width: 100%;
}

.gallery-mobile-toc__item--sub {
  padding-left: 14px;
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

.gallery-language {
  gap: 8px;
  color: var(--mcsl-text-color-regular);
  font-size: var(--mcsl-font-size-sm);
  white-space: nowrap;
}

.gallery-language__select {
  width: 116px;
  flex: none;
}

.gallery-shell {
  height: calc(100vh - 56px);
  padding: 0;
  box-sizing: border-box;
}

.gallery-docs {
  display: grid;
  grid-template-columns: 260px minmax(0, 1fr);
  column-gap: 30px;
  height: 100%;
  min-height: 0;
}

.gallery-docs--full {
  grid-template-columns: minmax(0, 1fr);
  column-gap: 0;
}

.gallery-docs__sidebar {
  box-sizing: border-box;
  min-height: 0;
  padding: 0 10px;
  overflow-x: hidden;
  overflow-y: auto;
  border-right: 1px solid var(--mcsl-border-color-base);
  background: var(--mcsl-bg-color-main);
}

.gallery-sidebar-groups {
  display: grid;
  gap: 18px;
  padding: 20px 0 32px;
}

.gallery-sidebar-group {
  display: grid;
  gap: 8px;
}

.gallery-sidebar-group__heading {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  width: 100%;
  min-height: 30px;
  margin: 0 0 3px;
  padding: 0 8px;
  border: 0;
  border-radius: var(--mcsl-border-radius-sm);
  background: transparent;
  color: var(--mcsl-text-color-secondary);
  cursor: pointer;
  font: inherit;
  font-size: 13px;
  font-weight: 650;
  text-align: left;
  transition:
    background-color var(--mcsl-motion-duration-fast) var(--mcsl-motion-ease-standard),
    color var(--mcsl-motion-duration-fast) var(--mcsl-motion-ease-standard);
}

.gallery-sidebar-group__heading:hover {
  background: color-mix(in srgb, var(--mcsl-bg-color-dark) 68%, transparent);
  color: var(--mcsl-text-color-primary);
}

.gallery-sidebar-group__heading span {
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.gallery-sidebar-group__heading i {
  flex: none;
  font-size: 11px;
  opacity: 0.72;
  transition: transform var(--mcsl-motion-duration-fast) var(--mcsl-motion-ease-standard);
}

.gallery-sidebar-group__heading i.is-collapsed {
  transform: rotate(-90deg);
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
}

.gallery-route-motion {
  min-height: 100%;
  transform-origin: 50% 0;
  will-change: opacity, transform, filter;
}

.gallery-notif-btn {
  margin: var(--mcsl-spacing-4xs) var(--mcsl-spacing-2xs) 0 auto;
}

@media (max-width: 1180px) {
  .gallery-topbar__inner {
    grid-template-columns: auto minmax(0, 1fr) auto;
    gap: 14px;
    min-height: 56px;
  }

  .gallery-topbar__inner--no-search {
    grid-template-columns: auto minmax(0, 1fr) auto;
  }

  .gallery-topnav {
    grid-column: 2;
    justify-content: center;
    min-width: 0;
    overflow-x: auto;
    scrollbar-width: none;
  }

  .gallery-topnav::-webkit-scrollbar {
    display: none;
  }

  .gallery-mobile-menu {
    grid-column: 3;
    justify-self: end;
    display: flex;
    justify-content: flex-end;
    width: auto;
    min-width: 0;
  }

  .gallery-search-input--desktop,
  .gallery-controls--desktop {
    display: none;
  }

  .gallery-shell {
    height: calc(100vh - 56px);
  }
}

@media (max-width: 1080px) {
  .gallery-mobile-toc-bar {
    position: sticky;
    top: 56px;
    z-index: 19;
    display: block;
    border-bottom: 1px solid var(--mcsl-border-color-base);
    background: color-mix(in srgb, var(--mcsl-bg-color-main) 96%, transparent);
    backdrop-filter: blur(12px);
  }

  .gallery-mobile-toc {
    display: block;
    width: 100%;
  }

  .gallery-mobile-toc__trigger {
    min-height: 38px;
    padding-left: 18px;
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
    height: auto;
  }

  .gallery-topbar__inner {
    grid-template-columns: minmax(0, 1fr) auto;
    grid-template-areas:
      "brand menu";
    gap: 10px 14px;
    align-items: center;
    min-height: 56px;
    padding: 10px 0;
  }

  .gallery-brand {
    grid-area: brand;
    // margin-left: 14px; 114514
    min-width: 0;
    justify-self: start;
  }

  .gallery-topnav {
    grid-area: nav;
    grid-column: auto;
    display: none;
    justify-content: flex-start;
    overflow-x: auto;
    padding-bottom: 2px;
  }

  .gallery-mobile-menu {
    grid-area: menu;
    grid-column: auto;
    justify-self: end;
    align-self: center;
  }

  .gallery-shell {
    height: auto;
    min-height: calc(100vh - 112px);
  }

  // .gallery-shell--home {
  //   padding: 18px;
  // }

  .gallery-shell--docs,
  .gallery-shell--components {
    padding: 0 0 0 14px;
  }

  .gallery-mobile-toc-bar {
    position: relative;
    top: auto;
  }

  .gallery-mobile-toc__trigger {
    min-height: 36px;
    padding-left: 14px;
  }

  .gallery-docs {
    grid-template-columns: 1fr;
    column-gap: 0;
    height: auto;
  }

  .gallery-docs__sidebar {
    display: none;
  }

  .gallery-sidebar-groups {
    display: grid;
    gap: 16px;
    width: 100%;
    min-width: 0;
    padding: 12px 0;
  }

  .gallery-sidebar-group {
    min-width: 0;
    width: 100%;
  }

  .gallery-docs__content {
    overflow-y: visible;
    padding: 0 0 32px;
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
