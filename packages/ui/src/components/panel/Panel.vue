<script lang="ts" setup>
import { Comment, computed, useSlots, type VNode } from "vue";
import type { Size } from "../../utils/utils.ts";

const props = withDefaults(
  defineProps<{
    header?: string;
    headerDivider?: boolean;
    shadow?: "always" | "hover" | "never";
    size?: Size;
    headerClass?: string;
    headerStyle?: string;
    bodyClass?: string;
    bodyStyle?: string;
    scrollable?: boolean;
  }>(),
  {
    size: "medium",
    headerDivider: true,
    shadow: "never",
    headerClass: "",
    headerStyle: "",
    bodyClass: "",
    bodyStyle: "",
    scrollable: false,
  },
);

const slots = useSlots();

function hasRenderableNode(node: VNode | string | number | boolean | null | undefined): boolean {
  if (node === null || node === undefined || typeof node === "boolean") return false;
  if (typeof node === "string") return node.trim().length > 0;
  if (typeof node === "number") return true;
  if (node.type === Comment) return false;
  if (Array.isArray(node.children)) return node.children.some((child) => hasRenderableNode(child as VNode));
  if (typeof node.children === "string") return node.children.trim().length > 0;

  return true;
}

function hasRenderableSlot(name: "header" | "footer" | "action") {
  return slots[name]?.().some((node) => hasRenderableNode(node)) ?? false;
}

const hasHeader = computed(() => Boolean(props.header || hasRenderableSlot("header")));
const hasFooter = computed(() => hasRenderableSlot("footer"));
const hasAction = computed(() => hasRenderableSlot("action"));
</script>

<template>
  <div
    :class="{
      [`mcsl-size-${size}`]: true,
      [`mcsl-panel__shadow-${shadow}`]: shadow !== 'never',
      'mcsl-panel__segmented': headerDivider && hasHeader,
      'mcsl-panel__has-header': hasHeader,
      'mcsl-panel__has-footer': hasFooter,
      'mcsl-panel__has-action': hasAction,
      'mcsl-panel__scrollable': scrollable,
    }"
    class="mcsl-panel"
  >
    <slot name="contextmenu" />
    <div
      v-if="hasHeader"
      :class="headerClass"
      :style="headerStyle"
      class="mcsl-panel__header"
    >
      <div class="mcsl-panel__header-main">
        <slot name="header">
          <h2>{{ header }}</h2>
        </slot>
      </div>
      <div v-if="$slots['header-extra']" class="mcsl-panel__header-extra">
        <slot name="header-extra" />
      </div>
    </div>
    <div class="mcsl-panel__body-wrapper">
      <div :class="bodyClass" :style="bodyStyle" class="mcsl-panel__body">
        <slot />
      </div>
    </div>
    <div v-if="hasFooter" class="mcsl-panel__footer">
      <slot name="footer" />
    </div>
    <div v-if="hasAction" class="mcsl-panel__action">
      <slot name="action" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use "Panel" as *;
@use "../../assets/css/utils";

.mcsl-panel {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  width: 100%;
  min-width: 0;
  position: relative;
  border: 1px solid var(--mcsl-border-color-light);
  background: var(--mcsl-bg-color-overlay);
  color: var(--mcsl-text-color-regular);
  overflow: hidden;
  line-height: 1.6;
  word-break: break-word;

  outline: 0 solid transparent;
  outline-offset: -2px; // 覆盖 border
  transition:
    background-color var(--mcsl-motion-duration-fast) var(--mcsl-motion-ease-standard),
    border-color var(--mcsl-motion-duration-fast) var(--mcsl-motion-ease-standard),
    box-shadow var(--mcsl-motion-duration-fast) var(--mcsl-motion-ease-standard),
    outline-color var(--mcsl-motion-duration-fast) var(--mcsl-motion-ease-standard);

  &:focus-visible {
    outline: 3px solid var(--mcsl-color-help);
  }
}

@each $size in utils.$sizes {
  .mcsl-size-#{$size}.mcsl-panel {
    $spacing: utils.get-size-var("spacing", $size, $vars);
    $header-spacing: utils.get-size-var("header-spacing", $size, $vars);
    $action-spacing: utils.get-size-var("action-spacing", $size, $vars);
    $font-size: utils.get-size-var("font-size", $size, $vars);
    $title-font-size: utils.get-size-var("title-font-size", $size, $vars);

    border-radius: utils.get-size-var("border-radius", $size, $vars);
    font-size: $font-size;

    &.mcsl-panel__shadow-always,
    &.mcsl-panel__shadow-hover:hover,
    &.mcsl-panel__shadow-hover:focus-visible {
      box-shadow: utils.get-size-var("box-shadow", $size, $vars);
      border-color: color-mix(in srgb, var(--mcsl-border-color-base) 92%, transparent);
    }

    & > .mcsl-panel__header {
      padding: $header-spacing $spacing calc($header-spacing * 0.78);
    }

    & > .mcsl-panel__body-wrapper > .mcsl-panel__body {
      padding: 0 $spacing $spacing;
    }

    &:not(.mcsl-panel__has-header) > .mcsl-panel__body-wrapper > .mcsl-panel__body {
      padding-top: $spacing;
    }

    &.mcsl-panel__segmented > .mcsl-panel__body-wrapper {
      border-top: 1px solid var(--mcsl-border-color-light);
    }

    &.mcsl-panel__segmented > .mcsl-panel__body-wrapper > .mcsl-panel__body {
      padding-top: $spacing;
    }

    & > .mcsl-panel__footer {
      padding: 0 $spacing $spacing;
    }

    &.mcsl-panel__has-footer > .mcsl-panel__footer,
    &.mcsl-panel__has-action > .mcsl-panel__action {
      border-top: 1px solid var(--mcsl-border-color-light);
    }

    &.mcsl-panel__has-footer > .mcsl-panel__footer {
      padding-top: $spacing;
    }

    & > .mcsl-panel__action {
      padding: $action-spacing $spacing;
    }

    & > .mcsl-panel__header .mcsl-panel__header-main {
      font-size: $title-font-size;
    }
  }
}

.mcsl-panel__header {
  box-sizing: border-box;
  display: flex;
  align-items: center;
  gap: var(--mcsl-spacing-xs);
  min-width: 0;

  &,
  & * {
    color: var(--mcsl-text-color-primary);
  }
}

.mcsl-panel__header-main {
  flex: 1 1 auto;
  min-width: 0;
  font-weight: var(--mcsl-font-weight-bold);

  & > :first-child {
    margin-top: 0;
  }

  & > :last-child {
    margin-bottom: 0;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: 0;
    font: inherit;
    color: inherit;
  }
}

.mcsl-panel__header-extra {
  flex: 0 0 auto;
  display: flex;
  align-items: center;
  min-width: 0;
  color: var(--mcsl-text-color-secondary);
  font-size: var(--mcsl-font-size-sm);
  font-weight: var(--mcsl-font-weight-base);
}

.mcsl-panel__body-wrapper {
  box-sizing: border-box;
  min-width: 0;
  transition: border-color var(--mcsl-motion-duration-base) var(--mcsl-motion-ease-standard);
}

.mcsl-panel__body {
  box-sizing: border-box;
  min-width: 0;

  & > :first-child {
    margin-top: 0;
  }

  & > :last-child {
    margin-bottom: 0;
  }
}

.mcsl-panel__scrollable {
  & > .mcsl-panel__body-wrapper {
    flex: 1 1 auto;
    min-height: 0;
    min-width: 0;
    width: 100%;
    max-height: 100%;
    overflow-x: hidden;
    overflow-y: auto;
  }
}

.mcsl-panel__footer {
  box-sizing: border-box;
  min-width: 0;
  color: var(--mcsl-text-color-regular);
  transition: border-color var(--mcsl-motion-duration-base) var(--mcsl-motion-ease-standard);
}

.mcsl-panel__action {
  box-sizing: border-box;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  flex-wrap: wrap;
  gap: var(--mcsl-spacing-2xs);
  min-width: 0;
  background: var(--mcsl-bg-color-dark);
  transition:
    background-color var(--mcsl-motion-duration-base) var(--mcsl-motion-ease-standard),
    border-color var(--mcsl-motion-duration-base) var(--mcsl-motion-ease-standard);
}
</style>
