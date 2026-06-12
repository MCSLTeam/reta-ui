<script setup lang="ts">
import { computed, inject, ref } from "vue";
import { useI18n } from "vue-i18n";
import { RButton, RCode } from "reta-ui";
import { galleryCodeHighlighter } from "./galleryCodeHighlighter";

type GalleryExampleProvider = {
  next: () => string;
  lineNumbers: { value: boolean };
};

const props = withDefaults(
  defineProps<{
    title?: string;
    description?: string;
    code?: string;
    codeLanguage?: string;
  }>(),
  {
    title: "",
    description: "",
    code: "",
    codeLanguage: "xml",
  },
);

const t = useI18n().t;
const provider = inject<GalleryExampleProvider | undefined>(
  "gallery-example-source",
  undefined,
);
const visible = ref(false);
const providedCode = provider?.next() ?? "";
const resolvedCode = computed(() => props.code || providedCode);
const hasCode = computed(() => Boolean(resolvedCode.value.trim()));
</script>

<template>
  <section class="gallery-example">
    <header v-if="title || description || hasCode" class="gallery-example__header">
      <div v-if="title || description" class="gallery-example__meta">
        <h3 v-if="title">{{ title }}</h3>
        <p v-if="description">{{ description }}</p>
      </div>

      <RButton
        v-if="hasCode"
        class="gallery-example__code-toggle"
        type="text"
        size="small"
        :icon="visible ? 'fas fa-code' : 'fas fa-code'"
        @click="visible = !visible"
      >
        {{ visible ? t("gallery.controls.hideCode") : t("gallery.controls.showCode") }}
      </RButton>
    </header>

    <div class="gallery-example__preview">
      <slot />
    </div>

    <div v-if="hasCode && visible" class="gallery-example__code">
      <RCode
        :code="resolvedCode"
        :language="codeLanguage"
        :hljs="galleryCodeHighlighter"
        :line-numbers="provider?.lineNumbers.value ?? true"
        max-height="min(62vh, 38rem)"
        font-size="12px"
        mobile-font-size="11px"
        word-wrap
      />
    </div>
  </section>
</template>

<style scoped lang="scss">
.gallery-example {
  min-width: 0;
  overflow: hidden;
  border: 1px solid color-mix(in srgb, var(--mcsl-border-color-base) 86%, transparent);
  border-radius: var(--mcsl-border-radius-sm);
  background: color-mix(in srgb, var(--mcsl-bg-color-overlay) 98%, transparent);
}

.gallery-example__header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
  padding: 14px 16px;
  border-bottom: 1px solid color-mix(in srgb, var(--mcsl-border-color-base) 78%, transparent);
}

.gallery-example__meta {
  display: grid;
  min-width: 0;
  gap: 5px;
}

.gallery-example__meta h3 {
  margin: 0;
  color: var(--mcsl-text-color-primary);
  font-size: 1.04rem;
  font-weight: 680;
  letter-spacing: 0;
  line-height: 1.35;
}

.gallery-example__meta p {
  margin: 0;
  color: var(--mcsl-text-color-secondary);
  font-size: var(--mcsl-font-size-sm);
  line-height: 1.55;
}

.gallery-example__code-toggle {
  flex: 0 0 auto;
}

.gallery-example__preview {
  min-width: 0;
  padding: 18px 16px;
}

.gallery-example__code {
  min-width: 0;
  border-top: 1px solid color-mix(in srgb, var(--mcsl-border-color-base) 78%, transparent);
}

.gallery-example__code :deep(.mcsl-code) {
  border: 0;
  border-radius: 0;
}

@media (max-width: 720px) {
  .gallery-example__header {
    align-items: stretch;
    gap: 10px;
    padding: 12px;
  }

  .gallery-example__meta h3 {
    font-size: 0.98rem;
  }

  .gallery-example__preview {
    padding: 14px 12px;
  }
}
</style>
