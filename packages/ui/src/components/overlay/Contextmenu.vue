<script lang="ts" setup>
import { nextTick, onMounted, onUnmounted, ref, watch } from "vue";
import { type MenuInfo } from "../panel/Menu.vue";
import type { Size } from "../../utils/utils.ts";
import { openContextmenu } from "../../utils/internal.ts";

defineOptions({
  inheritAttrs: false,
});

const props = defineProps<{
  menu: MenuInfo;
  parent?: HTMLElement | "global" | string;
  inAnim?: string;
  outAnim?: string;
  header?: string;
  headerDivider?: boolean;
  size?: Size;
  headerClass?: string;
  headerStyle?: string;
  bodyClass?: string;
  bodyStyle?: string;
  scrollable?: boolean;
}>();

const wrapperEl = ref();
let listenedElement: HTMLElement | undefined;

function handleContextmenu(event: MouseEvent) {
  openContextmenu(event, props);
  event.preventDefault();
  event.stopImmediatePropagation();
}

function resolveParent() {
  if (props.parent instanceof HTMLElement) {
    return props.parent;
  }
  if (props.parent === "global") return document.body;
  if (typeof props.parent === "string") {
    return document.querySelector<HTMLElement>(props.parent) ?? undefined;
  }
  return wrapperEl.value?.parentElement;
}

function bindContextmenu() {
  const nextElement = resolveParent();
  if (!nextElement || nextElement === listenedElement) return;

  listenedElement?.removeEventListener("contextmenu", handleContextmenu);
  listenedElement = nextElement;
  nextElement.addEventListener("contextmenu", handleContextmenu);
}

onMounted(async () => {
  await nextTick();
  bindContextmenu();
});

watch(() => props.parent, () => nextTick(bindContextmenu), { flush: "post" });

onUnmounted(() => {
  listenedElement?.removeEventListener?.("contextmenu", handleContextmenu);
});
</script>

<template>
  <div ref="wrapperEl" class="mcsl-contextmenu"></div>
</template>

<style lang="scss"></style>
