<script lang="ts" setup>
import Panel from "./Panel.vue";
import Button from "../button/Button.vue";
import type { ColorType } from "../../utils/css.ts";
import type { Size } from "../../utils/utils.ts";
import { computed } from "vue";

export type MenuItem = {
  label: "default" | string;
  icon?: string;
  iconPos?: "left" | "right";
  onClick?: (event: MouseEvent) => void | Promise<void>;
  disabled?: boolean;
  type?: "default" | "primary" | "dashed" | "text";
  color?: ColorType;
  buttonType?: "submit" | "reset" | "button";
};

export type MenuInfo =
  | {
      group: string;
      items: MenuItem[];
    }[]
  | MenuItem[];

const props = withDefaults(
  defineProps<{
    menu: MenuInfo;
    header?: string;
    headerDivider?: boolean;
    shadow?: boolean;
    size?: Size;
    headerClass?: string;
    headerStyle?: string;
    bodyClass?: string;
    bodyStyle?: string;
    scrollable?: boolean;
  }>(),
  {
    shadow: false,
    headerDivider: true,
  },
);

defineEmits<{
  (e: "click", event: MouseEvent): void;
}>();

const menuInfo = computed(() => {
  if (props.menu.length == 0) return [];

  let info: { group?: string; items: MenuItem[] }[];
  if ((props.menu as any)[0].group) {
    info = props.menu as any;
  } else {
    info = [
      {
        items: props.menu as MenuItem[],
      },
    ];
  }
  return info;
});
</script>

<template>
  <Panel
    :body-class="bodyClass"
    :body-style="bodyStyle"
    :header="header"
    :header-class="headerClass"
    :header-divider="headerDivider"
    :header-style="headerStyle"
    :scrollable="scrollable"
    :shadow="shadow ? 'always' : 'never'"
    :size="size"
    class="mcsl-menu"
  >
    <template #header>
      <slot name="header" />
    </template>
    <template #contextmenu>
      <slot name="contextmenu" />
    </template>
    <div
      v-for="(item, index) in menuInfo"
      :key="index"
      class="mcsl-menu__group"
      :class="{ 'mcsl-menu__group--named': item?.group }"
    >
      <h5 v-if="item?.group">
        {{ item.group }}
      </h5>
      <div class="mcsl-menu__items">
        <Button
          v-for="button in item.items"
          :key="button.label"
          :btn-type="button.buttonType"
          :color="button.color"
          :disabled="button.disabled"
          :icon="button.icon"
          :icon-pos="button.iconPos"
          :type="button.type ?? 'text'"
          align="left"
          @click="
            (e) => {
              button?.onClick?.(e);
              $emit('click', e);
            }
          "
        >
          {{ button.label }}
        </Button>
      </div>
    </div>
  </Panel>
</template>

<style lang="scss" scoped>
@use "../../assets/css/utils";
@use "sass:map";
@use "Panel";

$vars: map.merge(
  Panel.$vars,
  (
    "spacing": (
      "small": var(--mcsl-spacing-4xs),
      "medium": var(--mcsl-spacing-4xs),
      "large": var(--mcsl-spacing-2xs),
    ),
    "width": (
      "small": 10rem,
      "medium": 12rem,
      "large": 14rem,
    ),
  )
);

@each $size in utils.$sizes {
  $spacing: utils.get-size-var("spacing", $size, $vars);
  .mcsl-size-#{$size} {
    &.mcsl-panel.mcsl-menu {
      min-width: calc(utils.get-size-var("width", $size, $vars) - 2 * $spacing);
      border-radius: utils.get-size-var("border-radius", $size, $vars);
      padding: $spacing;
    }

    .mcsl-menu__group + .mcsl-menu__group {
      margin-top: calc($spacing + var(--mcsl-spacing-4xs));
      padding-top: calc($spacing + var(--mcsl-spacing-4xs));
    }

    .mcsl-menu__items {
      gap: 1px;

      & > button {
        min-height: calc(utils.get-size-var("height", $size, Panel.$vars) - 4px);
      }
    }
  }
}

.mcsl-menu__group {
  position: relative;
  min-width: 0;
}

.mcsl-menu__group + .mcsl-menu__group {
  border-top: 1px solid color-mix(in srgb, var(--mcsl-border-color-base) 68%, transparent);
}

.mcsl-menu__group > h5 {
  margin: 0 0 2px;
  padding: 3px var(--mcsl-spacing-2xs) 2px;
  color: var(--mcsl-text-color-secondary);
  font-size: var(--mcsl-font-size-xs);
  font-weight: 620;
  letter-spacing: 0;
  line-height: 1.45;
  text-transform: none;
}

.mcsl-menu__group--named .mcsl-menu__items > button {
  min-width: 9.5rem;
}

.mcsl-menu__items {
  display: flex;
  flex-direction: column;

  & > button {
    width: 100%;
    justify-content: flex-start;
    border-radius: calc(var(--mcsl-border-radius-sm) - 1px);
    &:focus-visible {
      z-index: 10; // 避免outline被遮挡
    }
  }
}
</style>

<style lang="scss">
.mcsl-panel.mcsl-menu.mcsl-menu.mcsl-menu > .mcsl-panel__body-wrapper > .mcsl-panel__body {
  padding: 0;
}
</style>
