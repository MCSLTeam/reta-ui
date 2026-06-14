<script setup lang="ts">
import { computed, defineComponent, onMounted, onUnmounted, ref, useSlots, watch, type VNode } from "vue";

type CarouselEffect = "slide" | "fade" | "cover";
type CarouselDirection = "horizontal" | "vertical";
type CarouselTrigger = "dot" | "hover-dot" | "none";
type CarouselDotPlacement = "top" | "bottom" | "left" | "right";
type CarouselArrowTrigger = "always" | "hover" | "never";
type CarouselArrowPlacement = "inside" | "outside";

const props = withDefaults(
  defineProps<{
    items?: unknown[];
    modelValue?: number;
    effect?: CarouselEffect;
    direction?: CarouselDirection;
    slidesPerView?: number;
    verticalSlidesPerView?: number;
    interval?: number;
    autoplay?: boolean;
    loop?: boolean;
    marquee?: boolean;
    restartOnEnd?: boolean;
    reverseOnEnd?: boolean;
    trigger?: CarouselTrigger;
    dotPlacement?: CarouselDotPlacement;
    arrowTrigger?: CarouselArrowTrigger;
    arrowPlacement?: CarouselArrowPlacement;
    draggable?: boolean;
    pauseOnHover?: boolean;
    height?: string | number;
  }>(),
  {
    items: () => [],
    modelValue: undefined,
    effect: "slide",
    direction: "horizontal",
    slidesPerView: 1,
    verticalSlidesPerView: undefined,
    interval: 3000,
    autoplay: false,
    loop: true,
    marquee: false,
    restartOnEnd: true,
    reverseOnEnd: false,
    trigger: "dot",
    dotPlacement: "bottom",
    arrowTrigger: "hover",
    arrowPlacement: "inside",
    draggable: true,
    pauseOnHover: true,
    height: undefined,
  },
);

const emit = defineEmits<{
  (e: "update:modelValue", value: number): void;
  (e: "change", value: number): void;
}>();

const slots = useSlots();
const CarouselVNode = defineComponent({
  props: {
    vnode: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    return () => props.vnode as VNode;
  },
});
const internalIndex = ref(props.modelValue ?? 0);
const reverse = ref(false);
const hovered = ref(false);
const dragStart = ref<number | null>(null);
const dragOffset = ref(0);
let timer: number | undefined;

const slotItems = computed(() => slots.default?.() ?? []);
const itemCount = computed(() =>
  slotItems.value.length > 0 ? slotItems.value.length : props.items.length,
);
const visibleCount = computed(() =>
  Math.max(1, Math.floor(
    props.direction === "vertical"
      ? (props.verticalSlidesPerView ?? props.slidesPerView)
      : props.slidesPerView,
  )),
);
const maxIndex = computed(() => Math.max(0, itemCount.value - visibleCount.value));
const currentIndex = computed(() => Math.min(internalIndex.value, maxIndex.value));
const showArrows = computed(() =>
  props.arrowTrigger !== "never" &&
  itemCount.value > visibleCount.value &&
  (props.arrowTrigger === "always" || hovered.value),
);
const showDots = computed(() =>
  props.trigger !== "none" && itemCount.value > visibleCount.value,
);
const trackStyle = computed(() => {
  const offset = currentIndex.value * (100 / visibleCount.value);
  const drag = dragOffset.value;
  const axis = props.direction === "vertical" ? "Y" : "X";
  const sign = props.direction === "vertical" ? -offset + drag : -offset + drag;
  return {
    "--mcsl-carousel__visible": String(visibleCount.value),
    transform: props.effect === "slide" || props.marquee
      ? `translate${axis}(${sign}%)`
      : undefined,
  };
});
const carouselStyle = computed(() => ({
  "--mcsl-carousel__height": normalizeSize(props.height),
}));
const isVertical = computed(() => props.direction === "vertical");

function normalizeSize(value: string | number | undefined) {
  if (value === undefined || value === "") return undefined;
  return typeof value === "number" ? `${value}px` : value;
}

function setIndex(value: number) {
  if (itemCount.value === 0) return;
  let next = value;
  if (props.loop) {
    if (next > maxIndex.value) next = 0;
    if (next < 0) next = maxIndex.value;
  } else {
    next = Math.min(maxIndex.value, Math.max(0, next));
  }
  internalIndex.value = next;
  emit("update:modelValue", next);
  emit("change", next);
}

function next() {
  if (reverse.value) setIndex(currentIndex.value - 1);
  else setIndex(currentIndex.value + 1);
}

function prev() {
  if (reverse.value) setIndex(currentIndex.value + 1);
  else setIndex(currentIndex.value - 1);
}

function tick() {
  if (hovered.value && props.pauseOnHover) return;
  if (currentIndex.value >= maxIndex.value && !props.loop) {
    if (props.reverseOnEnd) {
      reverse.value = true;
      setIndex(currentIndex.value - 1);
    } else if (props.restartOnEnd) setIndex(0);
    return;
  }
  if (currentIndex.value <= 0 && reverse.value) {
    reverse.value = false;
    setIndex(currentIndex.value + 1);
    return;
  }
  next();
}

function startTimer() {
  stopTimer();
  if ((!props.autoplay && !props.marquee) || itemCount.value <= visibleCount.value) return;
  timer = window.setInterval(tick, Math.max(800, props.marquee ? props.interval / 2 : props.interval));
}

function stopTimer() {
  if (timer !== undefined) window.clearInterval(timer);
  timer = undefined;
}

function pointerCoord(event: PointerEvent) {
  return props.direction === "vertical" ? event.clientY : event.clientX;
}

function onPointerDown(event: PointerEvent) {
  if (!props.draggable || itemCount.value <= visibleCount.value) return;
  dragStart.value = pointerCoord(event);
  dragOffset.value = 0;
  (event.currentTarget as HTMLElement).setPointerCapture(event.pointerId);
}

function onPointerMove(event: PointerEvent) {
  if (dragStart.value === null) return;
  const target = event.currentTarget as HTMLElement;
  const size = props.direction === "vertical" ? target.clientHeight : target.clientWidth;
  if (!size) return;
  dragOffset.value = ((pointerCoord(event) - dragStart.value) / size) * 100;
}

function onPointerUp(event: PointerEvent) {
  if (dragStart.value === null) return;
  const target = event.currentTarget as HTMLElement;
  const size = props.direction === "vertical" ? target.clientHeight : target.clientWidth;
  const distance = pointerCoord(event) - dragStart.value;
  dragStart.value = null;
  dragOffset.value = 0;
  if (Math.abs(distance) < Math.max(28, size * 0.12)) return;
  if (distance < 0) next();
  else prev();
}

watch(
  () => props.modelValue,
  (value) => {
    if (typeof value === "number" && value !== internalIndex.value) {
      internalIndex.value = Math.min(maxIndex.value, Math.max(0, value));
    }
  },
);

watch([itemCount, visibleCount], () => {
  if (internalIndex.value > maxIndex.value) setIndex(maxIndex.value);
  startTimer();
});

watch(
  () => [props.autoplay, props.marquee, props.interval, props.loop, props.restartOnEnd, props.reverseOnEnd],
  startTimer,
);

onMounted(startTimer);
onUnmounted(stopTimer);
</script>

<template>
  <section
    class="mcsl-carousel"
    :class="[
      `mcsl-carousel--${effect}`,
      `mcsl-carousel--${direction}`,
      `mcsl-carousel--dots-${dotPlacement}`,
      `mcsl-carousel--arrows-${arrowPlacement}`,
      {
        'mcsl-carousel--marquee': marquee,
        'mcsl-carousel--dragging': dragStart !== null,
      },
    ]"
    :style="carouselStyle"
    @mouseenter="hovered = true"
    @mouseleave="hovered = false"
  >
    <div
      class="mcsl-carousel__viewport"
      @pointerdown="onPointerDown"
      @pointermove="onPointerMove"
      @pointerup="onPointerUp"
      @pointercancel="onPointerUp"
    >
      <div class="mcsl-carousel__track" :style="trackStyle">
        <template v-if="slotItems.length">
          <article
            v-for="(item, index) in slotItems"
            :key="item.key ?? index"
            class="mcsl-carousel__slide"
            :class="{
              'mcsl-carousel__slide--active': index === currentIndex,
              'mcsl-carousel__slide--near': Math.abs(index - currentIndex) <= 1,
            }"
          >
            <CarouselVNode :vnode="item" />
          </article>
        </template>
        <article
          v-for="(item, index) in items"
          v-else
          :key="index"
          class="mcsl-carousel__slide"
          :class="{
            'mcsl-carousel__slide--active': index === currentIndex,
            'mcsl-carousel__slide--near': Math.abs(index - currentIndex) <= 1,
          }"
        >
          {{ item }}
        </article>
      </div>
    </div>

    <button
      v-if="showArrows"
      class="mcsl-carousel__arrow mcsl-carousel__arrow--prev"
      type="button"
      aria-label="Previous slide"
      @click="prev"
    >
      <i :class="isVertical ? 'fa fa-angle-up' : 'fa fa-angle-left'" />
    </button>
    <button
      v-if="showArrows"
      class="mcsl-carousel__arrow mcsl-carousel__arrow--next"
      type="button"
      aria-label="Next slide"
      @click="next"
    >
      <i :class="isVertical ? 'fa fa-angle-down' : 'fa fa-angle-right'" />
    </button>

    <div v-if="showDots" class="mcsl-carousel__dots">
      <button
        v-for="index in maxIndex + 1"
        :key="index"
        type="button"
        class="mcsl-carousel__dot"
        :class="{ 'mcsl-carousel__dot--active': index - 1 === currentIndex }"
        :aria-label="`Go to slide ${index}`"
        @click="trigger === 'dot' && setIndex(index - 1)"
        @mouseenter="trigger === 'hover-dot' && setIndex(index - 1)"
      />
    </div>
  </section>
</template>

<style scoped lang="scss">
.mcsl-carousel {
  position: relative;
  display: grid;
  min-width: 0;
  height: var(--mcsl-carousel__height, auto);
  color: var(--mcsl-text-color-primary);
}

.mcsl-carousel__viewport {
  min-width: 0;
  min-height: 0;
  overflow: hidden;
  border-radius: var(--mcsl-border-radius-md);
  touch-action: pan-y;
}

.mcsl-carousel--vertical .mcsl-carousel__viewport {
  touch-action: pan-x;
}

.mcsl-carousel__track {
  display: flex;
  width: 100%;
  height: 100%;
  transition: transform var(--mcsl-motion-duration-slow) var(--mcsl-motion-ease-emphasized);
  will-change: transform;
}

.mcsl-carousel--dragging .mcsl-carousel__track,
.mcsl-carousel--marquee .mcsl-carousel__track {
  transition-duration: var(--mcsl-motion-duration-fast);
}

.mcsl-carousel--vertical .mcsl-carousel__track {
  flex-direction: column;
}

.mcsl-carousel__slide {
  position: relative;
  flex: 0 0 calc(100% / var(--mcsl-carousel__visible));
  min-width: 0;
  min-height: 0;
}

.mcsl-carousel--vertical .mcsl-carousel__slide {
  min-height: calc(100% / var(--mcsl-carousel__visible));
}

.mcsl-carousel--fade .mcsl-carousel__viewport,
.mcsl-carousel--cover .mcsl-carousel__viewport {
  position: relative;
}

.mcsl-carousel--fade .mcsl-carousel__track,
.mcsl-carousel--cover .mcsl-carousel__track {
  display: grid;
  transform: none !important;
}

.mcsl-carousel--fade .mcsl-carousel__slide,
.mcsl-carousel--cover .mcsl-carousel__slide {
  grid-area: 1 / 1;
  opacity: 0;
  pointer-events: none;
  transform: scale(0.985);
  transition:
    opacity var(--mcsl-motion-duration-slow) var(--mcsl-motion-ease-emphasized),
    transform var(--mcsl-motion-duration-slow) var(--mcsl-motion-ease-emphasized);
}

.mcsl-carousel--fade .mcsl-carousel__slide--active,
.mcsl-carousel--cover .mcsl-carousel__slide--active {
  opacity: 1;
  pointer-events: auto;
  transform: scale(1);
}

.mcsl-carousel--cover .mcsl-carousel__slide--near:not(.mcsl-carousel__slide--active) {
  opacity: 0.32;
  transform: translateX(8%) scale(0.94);
}

.mcsl-carousel__arrow,
.mcsl-carousel__dot {
  border: 0;
  cursor: pointer;
}

.mcsl-carousel__arrow {
  position: absolute;
  z-index: 2;
  display: grid;
  place-items: center;
  width: 2rem;
  height: 2rem;
  border-radius: var(--mcsl-border-radius-full);
  background: color-mix(in srgb, var(--mcsl-bg-color-overlay) 88%, transparent);
  box-shadow: var(--mcsl-box-shadow-base);
  color: var(--mcsl-text-color-primary);
  transition:
    background-color var(--mcsl-motion-duration-fast) var(--mcsl-motion-ease-standard),
    color var(--mcsl-motion-duration-fast) var(--mcsl-motion-ease-standard),
    transform var(--mcsl-motion-duration-fast) var(--mcsl-motion-ease-standard);
}

.mcsl-carousel__arrow:hover {
  background: var(--mcsl-color-primary);
  color: white;
}

.mcsl-carousel--horizontal .mcsl-carousel__arrow--prev,
.mcsl-carousel--horizontal .mcsl-carousel__arrow--next {
  top: 50%;
  transform: translateY(-50%);
}

.mcsl-carousel--horizontal .mcsl-carousel__arrow--prev {
  left: var(--mcsl-spacing-xs);
}

.mcsl-carousel--horizontal .mcsl-carousel__arrow--next {
  right: var(--mcsl-spacing-xs);
}

.mcsl-carousel--vertical .mcsl-carousel__arrow--prev,
.mcsl-carousel--vertical .mcsl-carousel__arrow--next {
  left: 50%;
  transform: translateX(-50%);
}

.mcsl-carousel--vertical .mcsl-carousel__arrow--prev {
  top: var(--mcsl-spacing-xs);
}

.mcsl-carousel--vertical .mcsl-carousel__arrow--next {
  bottom: var(--mcsl-spacing-xs);
}

.mcsl-carousel--arrows-outside.mcsl-carousel--horizontal .mcsl-carousel__arrow--prev {
  left: calc(-1 * var(--mcsl-spacing-md));
}

.mcsl-carousel--arrows-outside.mcsl-carousel--horizontal .mcsl-carousel__arrow--next {
  right: calc(-1 * var(--mcsl-spacing-md));
}

.mcsl-carousel__dots {
  position: absolute;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 6px;
}

.mcsl-carousel--dots-bottom .mcsl-carousel__dots,
.mcsl-carousel--dots-top .mcsl-carousel__dots {
  left: 50%;
  transform: translateX(-50%);
}

.mcsl-carousel--dots-bottom .mcsl-carousel__dots {
  bottom: var(--mcsl-spacing-xs);
}

.mcsl-carousel--dots-top .mcsl-carousel__dots {
  top: var(--mcsl-spacing-xs);
}

.mcsl-carousel--dots-left .mcsl-carousel__dots,
.mcsl-carousel--dots-right .mcsl-carousel__dots {
  top: 50%;
  flex-direction: column;
  transform: translateY(-50%);
}

.mcsl-carousel--dots-left .mcsl-carousel__dots {
  left: var(--mcsl-spacing-xs);
}

.mcsl-carousel--dots-right .mcsl-carousel__dots {
  right: var(--mcsl-spacing-xs);
}

.mcsl-carousel__dot {
  width: 1.25rem;
  height: 0.22rem;
  padding: 0;
  border-radius: var(--mcsl-border-radius-full);
  background: color-mix(in srgb, white 58%, transparent);
  box-shadow: 0 0 0 1px color-mix(in srgb, black 10%, transparent);
  transition:
    width var(--mcsl-motion-duration-fast) var(--mcsl-motion-ease-emphasized),
    background-color var(--mcsl-motion-duration-fast) var(--mcsl-motion-ease-standard);
}

.mcsl-carousel--dots-left .mcsl-carousel__dot,
.mcsl-carousel--dots-right .mcsl-carousel__dot {
  width: 0.24rem;
  height: 1.25rem;
}

.mcsl-carousel__dot--active {
  width: 1.8rem;
  background: var(--mcsl-color-primary);
}

.mcsl-carousel--dots-left .mcsl-carousel__dot--active,
.mcsl-carousel--dots-right .mcsl-carousel__dot--active {
  width: 0.24rem;
  height: 1.8rem;
}
</style>
