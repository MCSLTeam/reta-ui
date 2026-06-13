<script setup lang="ts">
withDefaults(
  defineProps<{
    as?: string;
    direction?: "row" | "column" | "row-reverse" | "column-reverse";
    align?: "start" | "center" | "end" | "stretch" | "baseline";
    justify?: "start" | "center" | "end" | "between" | "around" | "evenly";
    gap?: "none" | "4xs" | "2xs" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "4xl";
    wrap?: boolean;
    inline?: boolean;
  }>(),
  {
    as: "div",
    direction: "row",
    align: "stretch",
    justify: "start",
    gap: "sm",
    wrap: false,
    inline: false,
  },
);
</script>

<template>
  <component
    :is="as"
    class="mcsl-flex"
    :class="[
      `mcsl-flex--direction-${direction}`,
      `mcsl-flex--align-${align}`,
      `mcsl-flex--justify-${justify}`,
      `mcsl-flex--gap-${gap}`,
      {
        'mcsl-flex--wrap': wrap,
        'mcsl-flex--inline': inline,
      },
    ]"
  >
    <slot />
  </component>
</template>

<style scoped lang="scss">
.mcsl-flex {
  display: flex;
  min-width: 0;
}

.mcsl-flex--inline {
  display: inline-flex;
}

.mcsl-flex--wrap {
  flex-wrap: wrap;
}

.mcsl-flex--direction-row {
  flex-direction: row;
}

.mcsl-flex--direction-column {
  flex-direction: column;
}

.mcsl-flex--direction-row-reverse {
  flex-direction: row-reverse;
}

.mcsl-flex--direction-column-reverse {
  flex-direction: column-reverse;
}

.mcsl-flex--align-start {
  align-items: flex-start;
}

.mcsl-flex--align-center {
  align-items: center;
}

.mcsl-flex--align-end {
  align-items: flex-end;
}

.mcsl-flex--align-stretch {
  align-items: stretch;
}

.mcsl-flex--align-baseline {
  align-items: baseline;
}

.mcsl-flex--justify-start {
  justify-content: flex-start;
}

.mcsl-flex--justify-center {
  justify-content: center;
}

.mcsl-flex--justify-end {
  justify-content: flex-end;
}

.mcsl-flex--justify-between {
  justify-content: space-between;
}

.mcsl-flex--justify-around {
  justify-content: space-around;
}

.mcsl-flex--justify-evenly {
  justify-content: space-evenly;
}

.mcsl-flex--gap-none {
  gap: 0;
}

@each $gap in "4xs", "2xs", "xs", "sm", "md", "lg", "xl", "2xl", "4xl" {
  .mcsl-flex--gap-#{$gap} {
    gap: var(--mcsl-spacing-#{$gap});
  }
}
</style>
