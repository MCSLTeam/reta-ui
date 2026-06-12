<script setup lang="ts">
import { computed } from "vue";

type HighlightResult = {
  value: string;
};

type CodeHighlighter = {
  highlight: (
    code: string,
    options: { language: string; ignoreIllegals?: boolean },
  ) => HighlightResult;
  highlightAuto?: (code: string, languageSubset?: string[]) => HighlightResult;
  getLanguage?: (language: string) => unknown;
};

const props = withDefaults(
  defineProps<{
    code?: string;
    language?: string;
    hljs?: CodeHighlighter;
    lineNumbers?: boolean;
    maxHeight?: string;
    fontSize?: string;
    mobileFontSize?: string;
    wordWrap?: boolean;
  }>(),
  {
    code: "",
    language: "plaintext",
    hljs: undefined,
    lineNumbers: false,
    maxHeight: "32rem",
    fontSize: "var(--mcsl-font-size-sm)",
    mobileFontSize: "10px",
    wordWrap: false,
  },
);

const codeStyle = computed(() => ({
  "--mcsl-code-max-height": props.maxHeight,
  "--mcsl-code-font-size": props.fontSize,
  "--mcsl-code-mobile-font-size": props.mobileFontSize,
}));

const languageClass = computed(() => `language-${props.language || "plaintext"}`);

const highlightedCode = computed(() => {
  const highlighter = props.hljs;
  const language = props.language;

  if (!highlighter) return escapeHtml(props.code);

  try {
    if (language && highlighter.getLanguage?.(language)) {
      return highlighter.highlight(props.code, {
        language,
        ignoreIllegals: true,
      }).value;
    }

    return highlighter.highlightAuto?.(props.code).value ?? escapeHtml(props.code);
  } catch {
    return escapeHtml(props.code);
  }
});

const highlightedLines = computed(() => highlightedCode.value.split(/\n/));

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}
</script>

<template>
  <div
    class="mcsl-code"
    :class="{ 'mcsl-code--word-wrap': wordWrap }"
    :style="codeStyle"
  >
    <pre class="mcsl-code__pre"><code
      v-if="lineNumbers"
      class="mcsl-code__code hljs"
      :class="languageClass"
    ><span
      v-for="(line, index) in highlightedLines"
      :key="index"
      class="mcsl-code__line"
    ><span class="mcsl-code__gutter">{{ index + 1 }}</span><span
      class="mcsl-code__content"
      v-html="line || '&nbsp;'"
    /></span></code><code
      v-else
      class="mcsl-code__code hljs"
      :class="languageClass"
      v-html="highlightedCode"
    /></pre>
  </div>
</template>

<style scoped lang="scss">
.mcsl-code {
  min-width: 0;
  overflow: hidden;
  border: 1px solid color-mix(in srgb, var(--mcsl-border-color-base) 82%, transparent);
  border-radius: var(--mcsl-border-radius-sm);
  background: color-mix(in srgb, var(--mcsl-bg-color-dark) 54%, var(--mcsl-bg-color-overlay));
  text-size-adjust: none;
  -webkit-text-size-adjust: none;
}

.mcsl-code__pre {
  max-height: var(--mcsl-code-max-height);
  margin: 0;
  overflow: auto;
  text-size-adjust: none;
  -webkit-text-size-adjust: none;
}

.mcsl-code__code {
  display: block;
  min-width: max-content;
  padding: 13px 16px;
  color: var(--mcsl-text-color-regular);
  font-family: var(--mcsl-font-family-mono);
  font-size: var(--mcsl-code-font-size);
  line-height: 1.6;
  tab-size: 2;
  text-size-adjust: none;
  -webkit-text-size-adjust: none;
  background: transparent;
}

.mcsl-code__code * {
  font-size: inherit !important;
  line-height: inherit;
  text-size-adjust: none;
  -webkit-text-size-adjust: none;
}

.mcsl-code__line {
  display: grid;
  grid-template-columns: 3.6em minmax(0, 1fr);
  min-height: 1.6em;
}

.mcsl-code__gutter {
  box-sizing: border-box;
  padding-right: 16px;
  color: var(--mcsl-text-color-placeholder);
  font-variant-numeric: tabular-nums;
  text-align: right;
  user-select: none;
}

.mcsl-code__content {
  min-width: 0;
}

.mcsl-code--word-wrap .mcsl-code__code {
  min-width: 0;
  white-space: pre-wrap;
  overflow-wrap: anywhere;
}

.mcsl-code--word-wrap .mcsl-code__line {
  align-items: start;
}

:deep(.hljs-keyword),
:deep(.hljs-operator) {
  color: var(--mcsl-color-rose-dark);
}

:deep(.hljs-comment),
:deep(.hljs-quote) {
  color: var(--mcsl-text-color-secondary);
  font-style: italic;
}

:deep(.hljs-string),
:deep(.hljs-regexp),
:deep(.hljs-addition),
:deep(.hljs-attribute),
:deep(.hljs-meta .hljs-string) {
  color: var(--mcsl-color-lime-darker);
}

:deep(.hljs-title),
:deep(.hljs-section),
:deep(.hljs-name),
:deep(.hljs-selector-tag),
:deep(.hljs-deletion),
:deep(.hljs-subst) {
  color: var(--mcsl-color-rose);
}

:deep(.hljs-built_in),
:deep(.hljs-title.class_),
:deep(.hljs-class .hljs-title) {
  color: var(--mcsl-color-amber-dark);
}

:deep(.hljs-attr),
:deep(.hljs-variable),
:deep(.hljs-template-variable),
:deep(.hljs-type),
:deep(.hljs-selector-class),
:deep(.hljs-selector-attr),
:deep(.hljs-selector-pseudo),
:deep(.hljs-number) {
  color: var(--mcsl-color-amber);
}

:deep(.hljs-literal) {
  color: var(--mcsl-color-teal);
}

:deep(.hljs-symbol),
:deep(.hljs-bullet),
:deep(.hljs-link),
:deep(.hljs-meta),
:deep(.hljs-selector-id) {
  color: var(--mcsl-color-sky);
}

@media (max-width: 620px) {
  .mcsl-code__code {
    padding: 9px 10px;
    font-size: var(--mcsl-code-mobile-font-size) !important;
    line-height: 1.5 !important;
  }

  .mcsl-code__code * {
    font-size: inherit !important;
    line-height: inherit !important;
  }

  .mcsl-code__line {
    grid-template-columns: 2.9em minmax(0, 1fr);
    min-height: 1.5em;
  }

  .mcsl-code__gutter {
    padding-right: 8px;
  }
}
</style>
