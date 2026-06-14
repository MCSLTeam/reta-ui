<script setup lang="ts">
import { computed } from "vue";
import { getColorVar } from "../../utils/css.ts";

const props = withDefaults(
  defineProps<{
    as?: string;
    type?: "default" | "secondary" | "tertiary" | "success" | "warning" | "danger" | "help";
    size?: "xs" | "sm" | "md" | "lg" | "xl";
    weight?: "regular" | "medium" | "semibold" | "bold";
    italic?: boolean;
    code?: boolean;
    delete?: boolean;
    underline?: boolean;
    block?: boolean;
    ellipsis?: boolean;
  }>(),
  {
    as: "span",
    type: "default",
    size: "md",
    weight: "regular",
    italic: false,
    code: false,
    delete: false,
    underline: false,
    block: false,
    ellipsis: false,
  },
);

const textColor = computed(() => {
  switch (props.type) {
    case "secondary":
      return getColorVar("text-color-secondary");
    case "tertiary":
      return getColorVar("text-color-light");
    case "success":
      return getColorVar("success");
    case "warning":
      return getColorVar("warning");
    case "danger":
      return getColorVar("danger");
    case "help":
      return getColorVar("help");
    default:
      return getColorVar("text-color-primary");
  }
});

const textStyle = computed(() => ({
  "--mcsl-text__color": textColor.value,
}));

const textClass = computed(() => [
  `mcsl-text--${props.size}`,
  `mcsl-text--${props.weight}`,
  {
    "mcsl-text--italic": props.italic,
    "mcsl-text--code": props.code,
    "mcsl-text--delete": props.delete,
    "mcsl-text--underline": props.underline,
    "mcsl-text--block": props.block,
    "mcsl-text--ellipsis": props.ellipsis,
  },
]);
</script>

<template>
  <component
    :is="as"
    class="mcsl-text"
    :class="textClass"
    :style="textStyle"
  >
    <slot />
  </component>
</template>

<style scoped lang="scss">
.mcsl-text {
  color: var(--mcsl-text__color);
  font-size: inherit;
  line-height: 1.55;
}

.mcsl-text--block {
  display: block;
}

.mcsl-text--ellipsis {
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.mcsl-text--xs {
  font-size: var(--mcsl-font-size-xs);
}

.mcsl-text--sm {
  font-size: var(--mcsl-font-size-sm);
}

.mcsl-text--md {
  font-size: var(--mcsl-font-size-md);
}

.mcsl-text--lg {
  font-size: var(--mcsl-font-size-lg);
}

.mcsl-text--xl {
  font-size: var(--mcsl-font-size-xl);
}

.mcsl-text--regular {
  font-weight: var(--mcsl-font-weight-base);
}

.mcsl-text--medium {
  font-weight: 550;
}

.mcsl-text--semibold {
  font-weight: 650;
}

.mcsl-text--bold {
  font-weight: var(--mcsl-font-weight-bold);
}

.mcsl-text--italic {
  font-style: italic;
}

.mcsl-text--code {
  padding: 0.08em 0.32em;
  border: 1px solid color-mix(in srgb, var(--mcsl-border-color-base) 74%, transparent);
  border-radius: var(--mcsl-border-radius-2xs);
  background: var(--mcsl-bg-color-dark);
  font-family: var(--mcsl-font-family-mono);
  font-size: 0.92em;
}

.mcsl-text--delete {
  text-decoration: line-through;
}

.mcsl-text--underline {
  text-decoration: underline;
  text-underline-offset: 0.18em;
}
</style>
