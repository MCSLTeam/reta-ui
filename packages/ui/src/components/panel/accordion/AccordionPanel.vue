<script lang="ts" setup>
import { computed, inject } from "vue";
import type { Size } from "../../../utils/utils.ts";

const props = withDefaults(
  defineProps<{
    name: string;
    disabled?: boolean;
    header?: string;
    headerDivider?: boolean;
    size?: Size;
    headerClass?: string;
    headerStyle?: string;
    bodyClass?: string;
    bodyStyle?: string;
    scrollable?: boolean;
  }>(),
  {
    disabled: false,
    headerDivider: false,
    size: "medium",
  },
);

const accordion = inject<{
  activate: (name: string) => void;
  deactivate: (name: string) => void;
  isActive: (name: string) => boolean;
  toggle: (name: string) => void;
}>("mcsl-accordion");

const emit = defineEmits<{
  (e: "collapse"): void;
  (e: "expand"): void;
}>();

const expanded = computed(() => accordion?.isActive(props.name) ?? false);

function togglePanel() {
  if (props.disabled || !accordion) return;

  if (expanded.value) {
    accordion.deactivate(props.name);
    emit("collapse");
  } else {
    accordion.activate(props.name);
    emit("expand");
  }
}
</script>

<template>
  <section
    class="mcsl-accordion-panel"
    :class="{
      'mcsl-accordion-panel--expanded': expanded,
      'mcsl-accordion-panel--disabled': disabled,
      [`mcsl-size-${size}`]: true,
    }"
  >
    <button
      class="mcsl-accordion-panel__header"
      :class="headerClass"
      :disabled="disabled"
      :style="headerStyle"
      type="button"
      @click="togglePanel"
    >
      <i class="mcsl-accordion-panel__arrow fas fa-chevron-right" aria-hidden="true" />
      <span class="mcsl-accordion-panel__title">
        <slot name="header">
          {{ header }}
        </slot>
      </span>
      <span class="mcsl-accordion-panel__actions">
        <slot name="contextmenu" />
      </span>
    </button>

    <div class="mcsl-accordion-panel__body-wrapper">
      <div
        class="mcsl-accordion-panel__body"
        :class="bodyClass"
        :style="bodyStyle"
      >
        <slot />
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@use "../../../assets/css/utils";
@use "../../Content" as *;

.mcsl-accordion-panel {
  min-width: 0;
  border-bottom: 1px solid var(--mcsl-border-color-base);
  color: var(--mcsl-text-color-regular);
}

.mcsl-accordion-panel + .mcsl-accordion-panel {
  margin-top: 0;
}

.mcsl-accordion-panel__header {
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  min-width: 0;
  border: 0;
  background: transparent;
  color: var(--mcsl-text-color-primary);
  cursor: pointer;
  font: inherit;
  font-weight: 600;
  line-height: 1.35;
  text-align: left;
  transition:
    color var(--mcsl-motion-duration-fast) var(--mcsl-motion-ease-enter);
}

@each $size in utils.$sizes {
  .mcsl-accordion-panel.mcsl-size-#{$size} .mcsl-accordion-panel__header {
    $spacing: utils.get-size-var("spacing", $size, $vars);
    $height: utils.get-size-var("height", $size, $vars);
    min-height: $height;
    padding: 0 calc($spacing * 0.5);
  }

  .mcsl-accordion-panel.mcsl-size-#{$size} .mcsl-accordion-panel__body {
    $spacing: utils.get-size-var("spacing", $size, $vars);
    padding: 0 calc($spacing * 0.5) calc($spacing * 1.25) calc($spacing * 0.5 + 22px);
  }
}

.mcsl-accordion-panel__header:hover {
  color: var(--mcsl-text-color-primary);
}

.mcsl-accordion-panel__header:focus-visible {
  outline: none;
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--mcsl-color-help) 18%, transparent);
}

.mcsl-accordion-panel__title {
  flex: 1 1 auto;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.mcsl-accordion-panel__title :deep(h1),
.mcsl-accordion-panel__title :deep(h2),
.mcsl-accordion-panel__title :deep(h3),
.mcsl-accordion-panel__title :deep(h4),
.mcsl-accordion-panel__title :deep(p) {
  margin: 0;
  font: inherit;
}

.mcsl-accordion-panel__actions {
  display: inline-flex;
  flex: none;
  align-items: center;
  gap: 8px;
}

.mcsl-accordion-panel__arrow {
  flex: none;
  width: 12px;
  font-size: 11px;
  opacity: 0.68;
  transform: rotate(0deg);
  transition:
    transform var(--mcsl-motion-duration-fast) var(--mcsl-motion-ease-enter),
    opacity var(--mcsl-motion-duration-fast) var(--mcsl-motion-ease-enter);
}

.mcsl-accordion-panel--expanded .mcsl-accordion-panel__arrow {
  opacity: 0.86;
  transform: rotate(90deg);
}

.mcsl-accordion-panel__body-wrapper {
  overflow: hidden;
  max-height: 0;
  opacity: 0;
  transition:
    max-height var(--mcsl-motion-duration-base) var(--mcsl-motion-ease-enter),
    opacity var(--mcsl-motion-duration-fast) var(--mcsl-motion-ease-enter);
}

.mcsl-accordion-panel--expanded .mcsl-accordion-panel__body-wrapper {
  max-height: 640px;
  opacity: 1;
}

.mcsl-accordion-panel__body {
  min-width: 0;
  color: var(--mcsl-text-color-regular);
  line-height: 1.65;
}

.mcsl-accordion-panel--disabled {
  opacity: var(--mcsl-opacity-disabled);
}

.mcsl-accordion-panel--disabled .mcsl-accordion-panel__header {
  cursor: not-allowed;
}
</style>
