<script setup lang="ts">
import { computed, ref, watch } from "vue";

const props = withDefaults(
  defineProps<{
    orientation?: "horizontal" | "vertical";
    draggable?: boolean;
    min?: number;
    max?: number;
    size?: number;
  }>(),
  {
    orientation: "horizontal",
    draggable: false,
    min: 80,
    max: 720,
    size: 240,
  },
);

const emit = defineEmits<{
  (e: "resize", value: number): void;
}>();

const model = defineModel<number | undefined>({
  default: undefined,
});

const currentSize = ref(model.value ?? props.size);
const dragging = ref(false);

watch(model, (value) => {
  if (typeof value === "number") currentSize.value = value;
});

watch(
  () => props.size,
  (value) => {
    if (model.value === undefined) currentSize.value = value;
  },
);

const panelStyle = computed(() => {
  const value = `${currentSize.value}px`;
  return props.orientation === "vertical"
    ? { width: value }
    : { height: value };
});

function clamp(value: number) {
  return Math.min(Math.max(value, props.min), props.max);
}

function startDrag(event: PointerEvent) {
  if (!props.draggable) return;
  dragging.value = true;
  const start = props.orientation === "vertical" ? event.clientX : event.clientY;
  const initial = currentSize.value;

  function move(moveEvent: PointerEvent) {
    const next = props.orientation === "vertical"
      ? initial + moveEvent.clientX - start
      : initial + moveEvent.clientY - start;
    currentSize.value = clamp(next);
    model.value = currentSize.value;
    emit("resize", currentSize.value);
  }

  function stop() {
    dragging.value = false;
    window.removeEventListener("pointermove", move);
    window.removeEventListener("pointerup", stop);
  }

  window.addEventListener("pointermove", move);
  window.addEventListener("pointerup", stop, { once: true });
}
</script>

<template>
  <div
    class="mcsl-separator"
    :class="[
      `mcsl-separator--${orientation}`,
      {
        'mcsl-separator--draggable': draggable,
        'mcsl-separator--dragging': dragging,
      },
    ]"
  >
    <div class="mcsl-separator__first" :style="panelStyle">
      <slot name="first" />
    </div>
    <div
      class="mcsl-separator__bar"
      role="separator"
      :aria-orientation="orientation"
      @pointerdown.prevent="startDrag"
    />
    <div class="mcsl-separator__second">
      <slot name="second" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.mcsl-separator {
  display: grid;
  min-width: 0;
  min-height: 0;
}

.mcsl-separator--vertical {
  grid-template-columns: auto auto minmax(0, 1fr);
}

.mcsl-separator--horizontal {
  grid-template-rows: auto auto minmax(0, 1fr);
}

.mcsl-separator__first,
.mcsl-separator__second {
  min-width: 0;
  min-height: 0;
  overflow: auto;
}

.mcsl-separator__bar {
  background: color-mix(in srgb, var(--mcsl-border-color-base) 86%, transparent);
  transition:
    background-color var(--mcsl-motion-duration-fast) var(--mcsl-motion-ease-standard),
    box-shadow var(--mcsl-motion-duration-fast) var(--mcsl-motion-ease-standard);
}

.mcsl-separator--vertical .mcsl-separator__bar {
  width: 1px;
}

.mcsl-separator--horizontal .mcsl-separator__bar {
  height: 1px;
}

.mcsl-separator--draggable.mcsl-separator--vertical .mcsl-separator__bar {
  width: 7px;
  cursor: col-resize;
}

.mcsl-separator--draggable.mcsl-separator--horizontal .mcsl-separator__bar {
  height: 7px;
  cursor: row-resize;
}

.mcsl-separator--draggable .mcsl-separator__bar:hover,
.mcsl-separator--dragging .mcsl-separator__bar {
  background: color-mix(in srgb, var(--mcsl-color-primary) 42%, var(--mcsl-border-color-base));
  box-shadow: 0 0 0 2px color-mix(in srgb, var(--mcsl-color-primary) 14%, transparent);
}
</style>
