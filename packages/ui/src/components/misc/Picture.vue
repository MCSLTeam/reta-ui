<script setup lang="ts">
import { computed, ref } from "vue";
import Modal from "../overlay/Modal.vue";

const props = withDefaults(
  defineProps<{
    src?: string;
    alt?: string;
    width?: string | number;
    height?: string | number;
    objectFit?: "cover" | "contain" | "fill" | "none" | "scale-down";
    radius?: "none" | "small" | "medium" | "large" | "round";
    preview?: boolean;
    lazy?: boolean;
    fallbackSrc?: string;
    fallbackText?: string;
  }>(),
  {
    src: "",
    alt: "",
    width: undefined,
    height: undefined,
    objectFit: "cover",
    radius: "medium",
    preview: true,
    lazy: true,
    fallbackSrc: "",
    fallbackText: "Image unavailable",
  },
);

const failed = ref(false);
const previewOpen = ref(false);
const displaySrc = computed(() =>
  failed.value && props.fallbackSrc ? props.fallbackSrc : props.src,
);

function normalizeSize(value: string | number | undefined) {
  if (value === undefined || value === "") return undefined;
  return typeof value === "number" ? `${value}px` : value;
}

function openPreview() {
  if (!props.preview || !displaySrc.value || failed.value && !props.fallbackSrc) return;
  previewOpen.value = true;
}
</script>

<template>
  <figure
    class="mcsl-picture"
    :class="[
      `mcsl-picture--${radius}`,
      {
        'mcsl-picture--previewable': preview,
        'mcsl-picture--failed': failed && !fallbackSrc,
      },
    ]"
    :style="{
      width: normalizeSize(width),
      height: normalizeSize(height),
      '--mcsl-picture__fit': objectFit,
    }"
    @click="openPreview"
  >
    <img
      v-if="displaySrc && !(failed && !fallbackSrc)"
      :src="displaySrc"
      :alt="alt"
      :loading="lazy ? 'lazy' : 'eager'"
      @error="failed = true"
    />
    <div v-else class="mcsl-picture__fallback">
      <i class="fa fa-image" />
      <span>{{ fallbackText }}</span>
    </div>
    <div v-if="preview && displaySrc && !(failed && !fallbackSrc)" class="mcsl-picture__mask">
      <i class="fa fa-magnifying-glass-plus" />
    </div>
  </figure>

  <Modal v-model="previewOpen" class="mcsl-picture-preview" :title="alt || 'Preview'">
    <img :src="displaySrc" :alt="alt" />
  </Modal>
</template>

<style scoped lang="scss">
.mcsl-picture {
  position: relative;
  display: inline-grid;
  place-items: center;
  box-sizing: border-box;
  width: 12rem;
  height: 8rem;
  margin: 0;
  overflow: hidden;
  border: 1px solid color-mix(in srgb, var(--mcsl-border-color-base) 82%, transparent);
  background:
    linear-gradient(45deg, color-mix(in srgb, var(--mcsl-bg-color-dark) 72%, transparent) 25%, transparent 25%),
    linear-gradient(-45deg, color-mix(in srgb, var(--mcsl-bg-color-dark) 72%, transparent) 25%, transparent 25%),
    linear-gradient(45deg, transparent 75%, color-mix(in srgb, var(--mcsl-bg-color-dark) 72%, transparent) 75%),
    linear-gradient(-45deg, transparent 75%, color-mix(in srgb, var(--mcsl-bg-color-dark) 72%, transparent) 75%);
  background-position: 0 0, 0 8px, 8px -8px, -8px 0;
  background-size: 16px 16px;
  color: var(--mcsl-text-color-secondary);
}

.mcsl-picture--none {
  border-radius: 0;
}

.mcsl-picture--small {
  border-radius: var(--mcsl-border-radius-xs);
}

.mcsl-picture--medium {
  border-radius: var(--mcsl-border-radius-sm);
}

.mcsl-picture--large {
  border-radius: var(--mcsl-border-radius-md);
}

.mcsl-picture--round {
  border-radius: var(--mcsl-border-radius-full);
}

.mcsl-picture img {
  width: 100%;
  height: 100%;
  object-fit: var(--mcsl-picture__fit);
}

.mcsl-picture--previewable {
  cursor: zoom-in;
}

.mcsl-picture__mask {
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
  background: color-mix(in srgb, black 42%, transparent);
  opacity: 0;
  transition: opacity var(--mcsl-motion-duration-fast) var(--mcsl-motion-ease-standard);
}

.mcsl-picture__mask i {
  color: white;
  font-size: 1.2rem;
}

.mcsl-picture:hover .mcsl-picture__mask {
  opacity: 1;
}

.mcsl-picture__fallback {
  display: grid;
  justify-items: center;
  gap: var(--mcsl-spacing-2xs);
  padding: var(--mcsl-spacing-sm);
  text-align: center;
}

.mcsl-picture__fallback i {
  color: var(--mcsl-text-color-light);
  font-size: 1.3rem;
}

.mcsl-picture__fallback span {
  color: var(--mcsl-text-color-secondary);
  font-size: var(--mcsl-font-size-sm);
}

.mcsl-picture-preview :deep(.mcsl-modal__body) {
  display: grid;
  place-items: center;
}

.mcsl-picture-preview img {
  display: block;
  max-width: min(78vw, 980px);
  max-height: 72vh;
  object-fit: contain;
  border-radius: var(--mcsl-border-radius-sm);
}
</style>
