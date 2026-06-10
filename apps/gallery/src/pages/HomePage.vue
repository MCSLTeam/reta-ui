<script setup lang="ts">
import {
  Button,
  ButtonGroup,
  Card,
  Message,
  MeterGroup,
  NavTabs,
  Panel,
  ProgressBar,
  Tag,
} from "@mcsl/ui";

const stats = [
  { label: "组件体系", value: "40+" },
  { label: "文档规范", value: "API" },
  { label: "主题能力", value: "2" },
];

const previewTabs = [
  { label: "Overview", icon: "fas fa-gauge" },
  { label: "Console", icon: "fas fa-terminal" },
  { label: "Backups", icon: "fas fa-clock-rotate-left" },
];

const meter = {
  length: 100,
  values: [
    { label: "CPU", length: 18, type: "success" },
    { label: "RAM", length: 42, type: "primary" },
    { label: "Disk", length: 64, type: "warning" },
  ],
};

const routes = [
  { title: "组件", description: "从基础控件、表单到浮层和数据展示，查看完整可交互示例。", link: "/components/buttons", icon: "fas fa-cubes" },
  { title: "文档", description: "安装、使用、主题和组件约定集中在同一份产品文档里。", link: "/docs", icon: "fas fa-book-open" },
  { title: "样式系统", description: "围绕控制台、运维面板和复杂工作流建立一致的视觉语言。", link: "/components/page-header", icon: "fas fa-palette" },
];
</script>

<template>
  <div class="home-page">
    <section class="home-hero">
      <div class="home-hero__copy">
        <Tag color="primary" size="small">Vue Component System</Tag>
        <h1>MCSL UI</h1>
        <p>
          面向复杂控制台、运维面板和生产工具的 Vue 组件系统。
          MCSL UI 是一个独立产品，专注把高密度信息、稳定交互和统一主题整理成可复用的界面基础设施。
        </p>
        <ButtonGroup>
          <Button link="/components/buttons" type="primary" color="primary" icon="fas fa-arrow-right">
            浏览组件
          </Button>
          <Button link="/docs" icon="fas fa-book">阅读文档</Button>
        </ButtonGroup>
      </div>

      <Panel class="home-preview" shadow="hover">
        <div class="preview-header">
          <div>
            <h2>Paper EU-1</h2>
            <div class="preview-tags">
              <Tag color="success" size="small">Online</Tag>
              <Tag color="primary" size="small">Java 21</Tag>
              <Tag color="help" size="small">Paper</Tag>
            </div>
          </div>
          <Button squared icon="fas fa-terminal" type="primary" color="primary" />
        </div>
        <NavTabs :tabs="previewTabs" />
        <div class="preview-body">
          <MeterGroup :meter="meter" />
          <ProgressBar :value="64" color="primary" />
          <Message title="Runtime stable" color="success" variant="soft">
            Dense data, clear status, and quiet controls share the same visual rhythm.
          </Message>
        </div>
      </Panel>
    </section>

    <section class="home-stats" aria-label="Gallery stats">
      <div v-for="item in stats" :key="item.label" class="home-stat">
        <strong>{{ item.value }}</strong>
        <span>{{ item.label }}</span>
      </div>
    </section>

    <section class="home-routes">
      <Card
        v-for="item in routes"
        :key="item.link"
        :title="item.title"
        :description="item.description"
        shadow="hover"
      >
        <Button :icon="item.icon" :link="item.link" type="text" color="primary">
          打开
        </Button>
      </Card>
    </section>
  </div>
</template>

<style scoped lang="scss">
.home-page {
  display: grid;
  gap: 22px;
}

.home-hero {
  display: grid;
  grid-template-columns: minmax(0, 0.95fr) minmax(420px, 0.75fr);
  gap: 34px;
  align-items: center;
  min-height: min(520px, calc(100vh - 150px));
}

.home-hero__copy {
  display: grid;
  justify-items: start;
  gap: 20px;
}

.home-hero__copy h1 {
  margin: 0;
  max-width: 720px;
  color: var(--mcsl-text-color-primary);
  font-size: clamp(46px, 7.2vw, 96px);
  font-weight: 760;
  line-height: 0.95;
}

.home-hero__copy p {
  max-width: 640px;
  color: var(--mcsl-text-color-regular);
  font-size: var(--mcsl-font-size-lg);
  line-height: 1.8;
}

.home-preview {
  align-self: stretch;
}

.preview-header {
  display: flex;
  justify-content: space-between;
  gap: 18px;
  align-items: start;
}

.preview-header h2 {
  margin: 0 0 10px;
  font-weight: 700;
}

.preview-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.preview-body {
  display: grid;
  gap: 16px;
  margin-top: 18px;
}

.home-stats {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  border: 1px solid var(--mcsl-border-color-base);
  border-radius: var(--mcsl-border-radius-sm);
  overflow: hidden;
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

@media (max-width: 1080px) {
  .home-hero,
  .home-routes {
    grid-template-columns: 1fr;
  }

  .home-hero {
    min-height: 0;
  }
}

@media (max-width: 620px) {
  .home-stats {
    grid-template-columns: 1fr;
  }

  .home-stat:not(:last-child) {
    border-right: 0;
    border-bottom: 1px solid var(--mcsl-border-color-base);
  }
}
</style>
