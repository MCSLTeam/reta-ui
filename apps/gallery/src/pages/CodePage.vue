<script setup lang="ts">
import { RCode, RMessage } from "reta-ui";
import GalleryDocPage from "../components/GalleryDocPage.vue";
import GalleryExample from "../components/GalleryExample.vue";
import { galleryCodeHighlighter } from "../components/galleryCodeHighlighter";

const vueExample = `<script setup lang="ts">
import { RButton, RCode } from "reta-ui";

const snippet = "const status = 'running';";
` + "</scr" + `ipt>

<template>
  <r-code :code="snippet" language="typescript" />
  <r-button type="primary">Deploy</r-button>
</template>`;

const tsExample = `type InstanceStatus = "running" | "stopped";

export function formatStatus(status: InstanceStatus) {
  return status === "running" ? "Online" : "Offline";
}`;

const plainExample = `Reta UI Code component
- Does not bundle highlight.js
- Accepts an external hljs-compatible highlighter
- Falls back to escaped plain text`;
</script>

<template>
  <GalleryDocPage>
    <template #effects>
      <GalleryExample title="Code">
        <div class="code-stack">
          <r-code
            :code="vueExample"
            language="xml"
            :hljs="galleryCodeHighlighter"
            line-numbers
          />
          <r-code
            :code="plainExample"
            language="plaintext"
            max-height="12rem"
            font-size="12px"
            word-wrap
          />
        </div>
      </GalleryExample>
    </template>

    <template #demo>
      <GalleryExample :title="$t('gallery.sections.externalHighlighter')">
        <div class="code-stack">
          <r-message color="help" title="No bundled highlighter">
            Code only receives an hljs-compatible object from the application.
          </r-message>
          <r-code
            :code="tsExample"
            language="typescript"
            :hljs="galleryCodeHighlighter"
            line-numbers
          />
        </div>
      </GalleryExample>
    </template>
  </GalleryDocPage>
</template>

<style scoped lang="scss">
.code-stack {
  display: grid;
  gap: 14px;
}
</style>
