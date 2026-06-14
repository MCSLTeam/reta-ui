<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from "vue";
import { type Color, getColorVar } from "../../utils/css.ts";
import type { Size } from "../../utils/utils.ts";

const props = withDefaults(
  defineProps<{
    target?: string | number | Date;
    duration?: number;
    autoStart?: boolean;
    interval?: number;
    format?: string;
    prefix?: string;
    suffix?: string;
    finishText?: string;
    color?: Color;
    size?: Size;
  }>(),
  {
    target: undefined,
    duration: 0,
    autoStart: true,
    interval: 1000,
    format: "HH:mm:ss",
    prefix: "",
    suffix: "",
    finishText: "",
    color: "text-color-primary",
    size: "medium",
  },
);

const emit = defineEmits<{
  (e: "change", remaining: number): void;
  (e: "finish"): void;
}>();

const running = ref(false);
const deadline = ref(0);
const now = ref(Date.now());
let timer: number | undefined;

const remaining = computed(() => Math.max(0, deadline.value - now.value));
const finished = computed(() => remaining.value <= 0);
const parts = computed(() => {
  const totalSeconds = Math.ceil(remaining.value / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return {
    D: days,
    DD: String(days).padStart(2, "0"),
    H: hours,
    HH: String(hours).padStart(2, "0"),
    m: minutes,
    mm: String(minutes).padStart(2, "0"),
    s: seconds,
    ss: String(seconds).padStart(2, "0"),
  };
});

const text = computed(() => {
  if (finished.value && props.finishText) return props.finishText;
  return props.format.replace(/DD|D|HH|H|mm|m|ss|s/g, (token) =>
    String(parts.value[token as keyof typeof parts.value]),
  );
});

function resolveDeadline() {
  if (props.target !== undefined) {
    const targetTime = props.target instanceof Date
      ? props.target.getTime()
      : typeof props.target === "number"
        ? props.target
        : new Date(props.target).getTime();
    return Number.isFinite(targetTime) ? targetTime : Date.now();
  }
  return Date.now() + Math.max(0, props.duration);
}

function stop() {
  running.value = false;
  if (timer !== undefined) window.clearInterval(timer);
  timer = undefined;
}

function tick() {
  now.value = Date.now();
  emit("change", remaining.value);
  if (remaining.value <= 0) {
    stop();
    emit("finish");
  }
}

function start() {
  stop();
  deadline.value = resolveDeadline();
  now.value = Date.now();
  if (remaining.value <= 0) {
    emit("finish");
    return;
  }
  running.value = true;
  timer = window.setInterval(tick, Math.max(16, props.interval));
}

function restart() {
  start();
}

watch(
  () => [props.target, props.duration, props.interval] as const,
  () => {
    if (props.autoStart || running.value) start();
    else {
      deadline.value = resolveDeadline();
      now.value = Date.now();
    }
  },
);

onMounted(() => {
  deadline.value = resolveDeadline();
  if (props.autoStart) start();
});

onUnmounted(stop);

defineExpose({
  start,
  stop,
  restart,
  running,
  remaining,
});
</script>

<template>
  <span
    class="mcsl-countdown"
    :class="[`mcsl-countdown--${size}`, { 'mcsl-countdown--finished': finished }]"
    :style="{ '--mcsl-countdown__color': getColorVar(color) }"
  >
    <slot
      :finished="finished"
      :remaining="remaining"
      :running="running"
      :text="text"
      v-bind="parts"
    >
      <span v-if="prefix" class="mcsl-countdown__affix">{{ prefix }}</span>
      <span class="mcsl-countdown__text">{{ text }}</span>
      <span v-if="suffix" class="mcsl-countdown__affix">{{ suffix }}</span>
    </slot>
  </span>
</template>

<style scoped lang="scss">
.mcsl-countdown {
  display: inline-flex;
  align-items: baseline;
  min-width: 0;
  gap: var(--mcsl-spacing-3xs);
  color: var(--mcsl-countdown__color);
  font-variant-numeric: tabular-nums;
}

.mcsl-countdown__text {
  color: inherit;
  font-family: var(--mcsl-font-family-mono);
  font-weight: 650;
}

.mcsl-countdown__affix {
  color: var(--mcsl-text-color-secondary);
  font-size: var(--mcsl-font-size-sm);
}

.mcsl-countdown--finished {
  color: var(--mcsl-text-color-secondary);
}

.mcsl-countdown--small {
  font-size: var(--mcsl-font-size-sm);
}

.mcsl-countdown--medium {
  font-size: var(--mcsl-font-size-md);
}

.mcsl-countdown--large {
  font-size: var(--mcsl-font-size-lg);
}
</style>
