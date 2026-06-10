<script setup lang="ts">
import { computed } from "vue";
import type { Color } from "../../utils/css";
import { getColorVar } from "../../utils/css";

const props = withDefaults(
  defineProps<{
    as?: keyof HTMLElementTagNameMap;
    color?: Color;
    secondary?: boolean;
  }>(),
  {
    as: "span",
    color: "text-color-primary",
    secondary: false,
  },
);

const elementStyle = computed(() => ({
  "--mcsl-element-color": props.secondary
    ? "var(--mcsl-text-color-secondary)"
    : getColorVar(props.color),
}));
</script>

<template>
  <component :is="as" class="mcsl-element" :style="elementStyle">
    <slot />
  </component>
</template>

<style scoped lang="scss">
.mcsl-element {
  color: var(--mcsl-element-color);
  font-family: var(--mcsl-font-family-sans);
  line-height: 1.65;
}
</style>
