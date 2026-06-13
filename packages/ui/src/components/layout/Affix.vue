<script setup lang="ts">
withDefaults(
  defineProps<{
    position?: "top" | "bottom";
    offset?: number | string;
    zIndex?: number;
  }>(),
  {
    position: "top",
    offset: 0,
    zIndex: 20,
  },
);

function normalizeOffset(value: number | string) {
  return typeof value === "number" ? `${value}px` : value;
}
</script>

<template>
  <div
    class="mcsl-affix"
    :class="`mcsl-affix--${position}`"
    :style="{
      '--mcsl-affix__offset': normalizeOffset(offset),
      '--mcsl-affix__z-index': zIndex,
    }"
  >
    <slot />
  </div>
</template>

<style scoped lang="scss">
.mcsl-affix {
  position: sticky;
  z-index: var(--mcsl-affix__z-index);
  min-width: 0;
}

.mcsl-affix--top {
  top: var(--mcsl-affix__offset);
}

.mcsl-affix--bottom {
  bottom: var(--mcsl-affix__offset);
}
</style>
