<script setup lang="ts">
import { computed } from "vue";
import { type ColorType, getColorVar } from "../../utils/css.ts";

const props = withDefaults(
  defineProps<{
    as?: string;
    from?: ColorType;
    to?: ColorType;
    angle?: number;
    size?: "xs" | "sm" | "md" | "lg" | "xl";
    weight?: "regular" | "medium" | "semibold" | "bold";
    block?: boolean;
  }>(),
  {
    as: "span",
    from: "primary",
    to: "help",
    angle: 120,
    size: "md",
    weight: "semibold",
    block: false,
  },
);

const gradientStyle = computed(() => ({
  "--mcsl-gradient-text__from": getColorVar(props.from),
  "--mcsl-gradient-text__to": getColorVar(props.to),
  "--mcsl-gradient-text__angle": `${props.angle}deg`,
}));
</script>

<template>
  <component
    :is="as"
    class="mcsl-gradient-text"
    :class="[
      `mcsl-gradient-text--${size}`,
      `mcsl-gradient-text--${weight}`,
      { 'mcsl-gradient-text--block': block },
    ]"
    :style="gradientStyle"
  >
    <slot />
  </component>
</template>

<style scoped lang="scss">
.mcsl-gradient-text {
  background: linear-gradient(
    var(--mcsl-gradient-text__angle),
    var(--mcsl-gradient-text__from),
    var(--mcsl-gradient-text__to)
  );
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  line-height: 1.55;
}

.mcsl-gradient-text--block {
  display: block;
}

.mcsl-gradient-text--xs { font-size: var(--mcsl-font-size-xs); }
.mcsl-gradient-text--sm { font-size: var(--mcsl-font-size-sm); }
.mcsl-gradient-text--md { font-size: var(--mcsl-font-size-md); }
.mcsl-gradient-text--lg { font-size: var(--mcsl-font-size-lg); }
.mcsl-gradient-text--xl { font-size: var(--mcsl-font-size-xl); }

.mcsl-gradient-text--regular { font-weight: var(--mcsl-font-weight-base); }
.mcsl-gradient-text--medium { font-weight: 550; }
.mcsl-gradient-text--semibold { font-weight: 650; }
.mcsl-gradient-text--bold { font-weight: var(--mcsl-font-weight-bold); }
</style>
