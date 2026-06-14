<script setup lang="ts">
import { computed } from "vue";
import { ColorData, type ColorType, getColorVar } from "../../utils/css.ts";

const props = withDefaults(
  defineProps<{
    as?: string;
    color?: ColorType;
    textColor?: ColorType | "default";
    size?: "xs" | "sm" | "md" | "lg" | "xl";
    weight?: "regular" | "medium" | "semibold" | "bold";
    round?: boolean;
    block?: boolean;
  }>(),
  {
    as: "span",
    color: "warning",
    textColor: "default",
    size: "md",
    weight: "regular",
    round: false,
    block: false,
  },
);

const highlightStyle = computed(() => ({
  "--mcsl-highlight-text__color": props.textColor === "default"
    ? "var(--mcsl-text-color-primary)"
    : getColorVar(props.textColor),
  "--mcsl-highlight-text__bg": new ColorData(props.color, "default", 0.16).getCss(),
  "--mcsl-highlight-text__line": new ColorData(props.color, "default", 0.34).getCss(),
}));
</script>

<template>
  <component
    :is="as"
    class="mcsl-highlight-text"
    :class="[
      `mcsl-highlight-text--${size}`,
      `mcsl-highlight-text--${weight}`,
      {
        'mcsl-highlight-text--round': round,
        'mcsl-highlight-text--block': block,
      },
    ]"
    :style="highlightStyle"
  >
    <slot />
  </component>
</template>

<style scoped lang="scss">
.mcsl-highlight-text {
  padding: 0 0.24em;
  border-radius: var(--mcsl-border-radius-2xs);
  background: var(--mcsl-highlight-text__bg);
  box-shadow: inset 0 -1px 0 var(--mcsl-highlight-text__line);
  color: var(--mcsl-highlight-text__color);
  line-height: 1.55;
}

.mcsl-highlight-text--block {
  display: block;
}

.mcsl-highlight-text--round {
  border-radius: var(--mcsl-border-radius-full);
}

.mcsl-highlight-text--xs { font-size: var(--mcsl-font-size-xs); }
.mcsl-highlight-text--sm { font-size: var(--mcsl-font-size-sm); }
.mcsl-highlight-text--md { font-size: var(--mcsl-font-size-md); }
.mcsl-highlight-text--lg { font-size: var(--mcsl-font-size-lg); }
.mcsl-highlight-text--xl { font-size: var(--mcsl-font-size-xl); }

.mcsl-highlight-text--regular { font-weight: var(--mcsl-font-weight-base); }
.mcsl-highlight-text--medium { font-weight: 550; }
.mcsl-highlight-text--semibold { font-weight: 650; }
.mcsl-highlight-text--bold { font-weight: var(--mcsl-font-weight-bold); }
</style>
