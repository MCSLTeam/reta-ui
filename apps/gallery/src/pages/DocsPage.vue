<script setup lang="ts">
import { Button, ButtonGroup, Card, Code, Kbd, Message, Panel, Table, Tag } from "@mcsl/ui";
import { galleryCodeHighlighter } from "../components/galleryCodeHighlighter";

const installRows = [
  ["Package", "@mcsl/ui"],
  ["Peer", "vue >= 3.5"],
  ["Style", "@mcsl/ui/style.css"],
];

const usageRows = [
  ["局部引入", "适合业务页面和文档示例，依赖关系最清楚。"],
  ["组合优先", "复杂界面优先用 ButtonGroup、Panel、Table 等基础件组合。"],
  ["API 文档", "每个组件页都展示 props 表和真实源码示例。"],
];

const themeRows = [
  ["light / dark", "通过 useAppearance 切换，避免刷新和切页闪白。"],
  ["density", "组件尺寸使用统一 size token，而不是页面局部硬改。"],
  ["semantic color", "primary、success、warning、danger 等语义色跨组件一致。"],
];

const componentGroups = [
  { title: "基础", description: "按钮、标签、头像、键盘键等低层控件。", link: "/components/buttons" },
  { title: "表单", description: "输入、选择、日期时间、滑块、单选和复选。", link: "/components/input" },
  { title: "浮层", description: "Dropdown、Tooltip、Popover、Modal、Drawer 和菜单。", link: "/components/dropdown" },
  { title: "数据", description: "Table、DataTable、Tree、Pagination 和状态展示。", link: "/components/table" },
];

const installCode = `import { Button, Panel } from "@mcsl/ui";
import "@mcsl/ui/style.css";`;

const usageCode = `<Button type="primary" color="primary" icon="fas fa-plus">
  新建实例
</Button>`;
</script>

<template>
  <div class="docs-page">
    <section class="docs-hero">
      <div class="docs-hero__copy">
        <Tag color="primary" size="small">Documentation</Tag>
        <h1>MCSL UI 文档</h1>
        <p>
          这份文档面向正在接入 MCSL UI 的应用。它覆盖安装、基础使用、
          主题系统和组件索引，让组件库可以作为独立产品被理解和维护。
        </p>
        <ButtonGroup>
          <Button link="/components/buttons" type="primary" color="primary" icon="fas fa-cubes">
            查看组件
          </Button>
          <Button link="/" icon="fas fa-house">回到首页</Button>
        </ButtonGroup>
      </div>
      <Panel class="docs-cheatsheet" shadow="hover">
        <template #header><h2>快速入口</h2></template>
        <div class="cheatsheet-list">
          <div><Kbd size="small">1</Kbd><span>安装样式和组件包</span></div>
          <div><Kbd size="small">2</Kbd><span>在 Vue 页面内按需引入</span></div>
          <div><Kbd size="small">3</Kbd><span>通过主题 token 控制视觉</span></div>
        </div>
      </Panel>
    </section>

    <section class="docs-body">
      <Panel id="docs-installation" class="docs-section" shadow="hover">
        <template #header><h2>安装</h2></template>
        <div class="docs-stack">
          <p>
            在当前 monorepo 内，MCSL UI 作为 workspace package 使用。
            接入应用需要依赖组件入口和全局样式入口。
          </p>
          <Table :columns="['项目', '值']" :rows="installRows" />
          <Code
            :code="installCode"
            language="typescript"
            :hljs="galleryCodeHighlighter"
          />
        </div>
      </Panel>

      <Panel id="docs-usage" class="docs-section" shadow="hover">
        <template #header><h2>使用</h2></template>
        <div class="docs-stack">
          <p>
            组件以 Vue SFC 为主要使用场景。页面应该优先组合自有组件，
            再在必要时补充局部样式，避免业务页面重新发明按钮、浮层和状态提示。
          </p>
          <Table :columns="['方式', '说明']" :rows="usageRows" />
          <Code :code="usageCode" language="xml" :hljs="galleryCodeHighlighter" />
        </div>
      </Panel>

      <Panel id="docs-theme" class="docs-section docs-section--wide" shadow="hover">
        <template #header><h2>主题</h2></template>
        <div class="docs-stack">
          <p>
            主题由 CSS token、语义色和 appearance store 共同驱动。
            深浅色切换应改变 token，而不是在组件内部写死背景和文字颜色。
          </p>
          <Table :columns="['能力', '约定']" :rows="themeRows" />
          <Message title="样式边界" color="primary" variant="soft">
            业务应用可以改变 token 和布局密度，但不应该绕开组件状态直接覆盖内部结构。
          </Message>
        </div>
      </Panel>

      <section id="docs-components" class="docs-components">
        <Card
          v-for="item in componentGroups"
          :key="item.title"
          :title="item.title"
          :description="item.description"
          shadow="hover"
        >
          <Button :link="item.link" type="text" color="primary" icon="fas fa-arrow-right">
            打开
          </Button>
        </Card>
      </section>
    </section>
  </div>
</template>

<style scoped lang="scss">
.docs-page {
  display: grid;
  gap: 22px;
}

.docs-hero {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 340px;
  gap: 28px;
  align-items: end;
  padding: 16px 0 8px;
}

.docs-hero__copy {
  display: grid;
  gap: 16px;
  justify-items: start;
}

.docs-hero h1 {
  margin: 0;
  color: var(--mcsl-text-color-primary);
  font-size: clamp(40px, 6vw, 76px);
  font-weight: 750;
  line-height: 0.98;
}

.docs-hero p {
  max-width: 780px;
  color: var(--mcsl-text-color-regular);
  font-size: var(--mcsl-font-size-lg);
  line-height: 1.75;
}

.cheatsheet-list {
  display: grid;
  gap: 12px;
}

.cheatsheet-list > div {
  display: flex;
  gap: 10px;
  align-items: center;
}

.cheatsheet-list span {
  color: var(--mcsl-text-color-regular);
}

.docs-principles {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 14px;
}

.docs-body {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(360px, 0.82fr);
  gap: 18px;
  align-items: start;
}

.docs-section--wide,
.docs-components {
  grid-column: 1 / -1;
}

.docs-stack {
  display: grid;
  gap: 14px;
}

.docs-stack p {
  margin: 0;
  color: var(--mcsl-text-color-regular);
  line-height: 1.75;
}

.docs-components {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 14px;
}

@media (max-width: 1080px) {
  .docs-hero,
  .docs-principles,
  .docs-body,
  .docs-components {
    grid-template-columns: 1fr;
  }
}
</style>
