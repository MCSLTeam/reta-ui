<script setup lang="ts">
import { Code, Message, Panel } from "@mcsl/ui";
import GalleryDocPage from "../components/GalleryDocPage.vue";
import { galleryCodeHighlighter } from "../components/galleryCodeHighlighter";

const vueExample = `<script setup lang="ts">
import { Button, Code } from "@mcsl/ui";

const snippet = "const status = 'running';";
` + "</scr" + `ipt>

<template>
  <Code :code="snippet" language="typescript" />
  <Button type="primary">Deploy</Button>
</template>`;

const tsExample = `type InstanceStatus = "running" | "stopped";

export function formatStatus(status: InstanceStatus) {
  return status === "running" ? "Online" : "Offline";
}`;

const plainExample = `MCSL UI Code component
- Does not bundle highlight.js
- Accepts an external hljs-compatible highlighter
- Falls back to escaped plain text`;
</script>

<template>
  <GalleryDocPage>
    <template #effects>
      <Panel class="doc-section" shadow="hover">
        <template #header><h2>Code</h2></template>
        <div class="code-stack">
          <Code
            :code="vueExample"
            language="xml"
            :hljs="galleryCodeHighlighter"
            line-numbers
          />
          <Code :code="plainExample" language="plaintext" max-height="12rem" />
        </div>
      </Panel>
    </template>

    <template #demo>
      <Panel class="doc-section" shadow="hover">
        <template #header><h2>外部高亮器</h2></template>
        <div class="code-stack">
          <Message color="help" title="No bundled highlighter">
            Code only receives an hljs-compatible object from the application.
          </Message>
          <Code
            :code="tsExample"
            language="typescript"
            :hljs="galleryCodeHighlighter"
            line-numbers
          />
        </div>
      </Panel>
    </template>
  </GalleryDocPage>
</template>

<style scoped lang="scss">
.code-stack {
  display: grid;
  gap: 14px;
}
</style>
