<script setup lang="ts">
import { computed, inject, ref, watch } from "vue";
import DropdownContent from "../../overlay/DropdownContent.vue";
import type { FormFieldData } from "../FormEntry.vue";
import { ColorData, type ColorType, getColorVar } from "../../../utils/css.ts";
import type { Size } from "../../../utils/utils.ts";

export type CascaderOption = {
  label: string;
  value: unknown;
  icon?: string;
  disabled?: boolean;
  children?: CascaderOption[];
};

const props = withDefaults(
  defineProps<{
    options: CascaderOption[];
    placeholder?: string;
    color?: ColorType;
    size?: Size;
    disabled?: boolean;
    invalid?: boolean;
    clearable?: boolean;
    separator?: string;
  }>(),
  {
    options: () => [],
    placeholder: "Select",
    color: "primary",
    size: "medium",
    disabled: false,
    invalid: false,
    clearable: false,
    separator: " / ",
  },
);

const emit = defineEmits<{
  (e: "change", value: unknown[], optionPath: CascaderOption[]): void;
  (e: "blur", event: FocusEvent): void;
  (e: "focus", event: FocusEvent): void;
}>();

const model = defineModel<unknown[]>({
  default: () => [],
});

const dropdownRef = ref();
const activePath = ref<unknown[]>([]);
const formField = inject("mcsl-form-field", undefined) as
  | FormFieldData
  | undefined;

if (formField) {
  model.value = Array.isArray(formField.field.data.value)
    ? formField.field.data.value
    : [];

  watch(formField.field.data, (value) => {
    if (value !== model.value) model.value = Array.isArray(value) ? value : [];
  });

  watch(model, (value) => {
    if (value !== formField.field.data.value) formField.field.data.value = value;
  });
}

const selectedOptionPath = computed(() => findPathByValuePath(props.options, model.value));
const displayLabel = computed(() =>
  selectedOptionPath.value.map((option) => option.label).join(props.separator),
);
const hasValue = computed(() => model.value.length > 0);
const columns = computed(() => {
  const result: CascaderOption[][] = [props.options];
  let currentOptions = props.options;

  for (const value of activePath.value) {
    const selected = currentOptions.find((option) => valueKey(option.value) === valueKey(value));
    if (!selected?.children?.length) break;
    currentOptions = selected.children;
    result.push(currentOptions);
  }

  return result;
});

watch(
  () => props.options,
  () => {
    activePath.value = [];
  },
);

function valueKey(value: unknown) {
  return String(value);
}

function findPathByValuePath(options: CascaderOption[], values: unknown[]) {
  const path: CascaderOption[] = [];
  let currentOptions = options;

  for (const value of values) {
    const option = currentOptions.find((item) => valueKey(item.value) === valueKey(value));
    if (!option) return [];
    path.push(option);
    currentOptions = option.children ?? [];
  }

  return path;
}

function selectOption(option: CascaderOption, columnIndex: number) {
  if (props.disabled || option.disabled) return;

  const nextPath = [
    ...activePath.value.slice(0, columnIndex),
    option.value,
  ];
  activePath.value = nextPath;

  if (option.children?.length) return;

  model.value = nextPath;
  const optionPath = findPathByValuePath(props.options, nextPath);
  emit("change", nextPath, optionPath);
  formField?.onInput(new Event("input"));
  dropdownRef.value?.close();
}

function isActive(option: CascaderOption, columnIndex: number) {
  return valueKey(activePath.value[columnIndex]) === valueKey(option.value);
}

function openDropdown(open: () => void) {
  if (props.disabled) return;
  activePath.value = [...model.value];
  open();
}

function clearValue(event: MouseEvent) {
  event.stopPropagation();
  if (!props.clearable || props.disabled) return;
  model.value = [];
  activePath.value = [];
  emit("change", [], []);
  formField?.onInput(new Event("input"));
}
</script>

<template>
  <DropdownContent ref="dropdownRef" class="mcsl-cascader">
    <template #triggerer="{ open, opened }">
      <button
        type="button"
        class="mcsl-cascader__trigger"
        :class="[
          `mcsl-size-${size}`,
          {
            'mcsl-cascader__trigger--has-value': hasValue,
          },
        ]"
        :disabled="disabled"
        :aria-invalid="invalid || formField?.field?.error?.value ? 'true' : undefined"
        :style="{
          '--mcsl-cascader__color': getColorVar(color),
          '--mcsl-cascader__color-light': getColorVar(new ColorData(color, 'light')),
        }"
        @click="openDropdown(open)"
        @focus="
          (event) => {
            $emit('focus', event);
            formField?.onFocus(event);
          }
        "
        @blur="
          (event) => {
            $emit('blur', event);
            formField?.onBlur(event);
          }
        "
      >
        <span
          class="mcsl-cascader__value"
          :class="{ 'mcsl-cascader__placeholder': !displayLabel }"
        >
          {{ displayLabel || placeholder }}
        </span>
        <span
          v-if="clearable && hasValue"
          class="mcsl-cascader__clear"
          role="button"
          tabindex="-1"
          @click="clearValue"
        >
          <i class="fa fa-xmark" />
        </span>
        <i class="fa fa-angle-down mcsl-cascader__arrow" :class="{ 'fa-rotate-180': opened }" />
      </button>
    </template>
    <div class="mcsl-cascader__panel">
      <div
        v-for="(column, columnIndex) in columns"
        :key="columnIndex"
        class="mcsl-cascader__column"
      >
        <button
          v-for="option in column"
          :key="valueKey(option.value)"
          type="button"
          class="mcsl-cascader__option"
          :class="{ 'mcsl-cascader__option--active': isActive(option, columnIndex) }"
          :disabled="option.disabled"
          @click="selectOption(option, columnIndex)"
        >
          <i v-if="option.icon" :class="option.icon" />
          <span>{{ option.label }}</span>
          <i
            v-if="option.children?.length"
            class="fa fa-angle-right mcsl-cascader__next"
          />
          <i
            v-else-if="isActive(option, columnIndex)"
            class="fa fa-check mcsl-cascader__check"
          />
        </button>
      </div>
    </div>
  </DropdownContent>
</template>

<style scoped lang="scss">
@use "../../../assets/css/utils";
@use "../../SmallerContent" as *;

.mcsl-cascader {
  display: block;
  width: 100%;
}

.mcsl-cascader__trigger {
  display: flex;
  align-items: center;
  box-sizing: border-box;
  width: 100%;
  min-width: 0;
  gap: var(--mcsl-spacing-2xs);
  border: 1px solid var(--mcsl-border-color-base);
  background: var(--mcsl-bg-color-overlay);
  color: var(--mcsl-text-color-primary);
  outline: 0 solid transparent;
  outline-offset: -2px;
  cursor: pointer;
  text-align: left;
  transition:
    background-color var(--mcsl-motion-duration-fast) var(--mcsl-motion-ease-standard),
    border-color var(--mcsl-motion-duration-fast) var(--mcsl-motion-ease-standard),
    box-shadow var(--mcsl-motion-duration-fast) var(--mcsl-motion-ease-standard),
    outline-color var(--mcsl-motion-duration-fast) var(--mcsl-motion-ease-standard);
}

.mcsl-cascader__trigger:hover:not(:disabled) {
  border-color: var(--mcsl-border-color-dark);
  background: color-mix(in srgb, var(--mcsl-bg-color-dark) 94%, transparent);
  box-shadow: var(--mcsl-box-shadow-light);
}

.mcsl-cascader__trigger:focus {
  border-color: color-mix(in srgb, var(--mcsl-cascader__color) 48%, var(--mcsl-border-color-base));
  outline-color: var(--mcsl-cascader__color-light);
  outline-width: 2px;
}

.mcsl-cascader__trigger[aria-invalid="true"] {
  border-color: var(--mcsl-color-danger);
}

.mcsl-cascader__trigger:disabled {
  cursor: not-allowed;
  opacity: 0.58;
}

.mcsl-cascader__value {
  flex: 1;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.mcsl-cascader__placeholder,
.mcsl-cascader__arrow,
.mcsl-cascader__clear {
  color: var(--mcsl-text-color-secondary);
}

.mcsl-cascader__arrow {
  transition: transform var(--mcsl-motion-duration-fast) var(--mcsl-motion-ease-standard);
}

.mcsl-cascader__arrow.fa-rotate-180 {
  transform: rotate(180deg);
}

.mcsl-cascader__clear {
  display: grid;
  place-items: center;
  width: 1.35rem;
  height: 1.35rem;
  border-radius: 999px;
  transition:
    background-color var(--mcsl-motion-duration-fast) var(--mcsl-motion-ease-standard),
    color var(--mcsl-motion-duration-fast) var(--mcsl-motion-ease-standard);
}

.mcsl-cascader__clear:hover {
  background: color-mix(in srgb, var(--mcsl-bg-color-dark) 82%, transparent);
  color: var(--mcsl-text-color-primary);
}

.mcsl-cascader__panel {
  display: inline-flex;
  box-sizing: border-box;
  width: max-content;
  max-width: calc(100vw - 2 * var(--mcsl-spacing-md));
  max-height: 20rem;
  overflow: auto;
  padding: var(--mcsl-spacing-4xs);
  border: 1px solid var(--mcsl-border-color-base);
  border-radius: var(--mcsl-border-radius-sm);
  background: var(--mcsl-bg-color-overlay);
  box-shadow: var(--mcsl-box-shadow-base);
}

.mcsl-cascader__column {
  display: grid;
  align-content: start;
  min-width: 11rem;
  gap: 1px;
}

.mcsl-cascader__column + .mcsl-cascader__column {
  margin-left: var(--mcsl-spacing-4xs);
  padding-left: var(--mcsl-spacing-4xs);
  border-left: 1px solid color-mix(in srgb, var(--mcsl-border-color-base) 72%, transparent);
}

.mcsl-cascader__option {
  display: grid;
  grid-template-columns: auto minmax(0, 1fr) auto;
  align-items: center;
  min-height: 2rem;
  gap: var(--mcsl-spacing-2xs);
  padding: 0 var(--mcsl-spacing-xs);
  border: 0;
  border-radius: var(--mcsl-border-radius-sm);
  background: transparent;
  color: var(--mcsl-text-color-regular);
  cursor: pointer;
  text-align: left;
  transition:
    background-color var(--mcsl-motion-duration-fast) var(--mcsl-motion-ease-standard),
    color var(--mcsl-motion-duration-fast) var(--mcsl-motion-ease-standard);
}

.mcsl-cascader__option span {
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.mcsl-cascader__option:hover:not(:disabled),
.mcsl-cascader__option--active {
  background: color-mix(in srgb, var(--mcsl-cascader__color) 9%, var(--mcsl-bg-color-overlay));
  color: var(--mcsl-text-color-primary);
}

.mcsl-cascader__option:disabled {
  cursor: not-allowed;
  opacity: 0.52;
}

.mcsl-cascader__next,
.mcsl-cascader__check {
  color: var(--mcsl-text-color-secondary);
  font-size: 0.86em;
}

.mcsl-cascader__option--active .mcsl-cascader__check {
  color: var(--mcsl-cascader__color);
}

@each $size in utils.$sizes {
  .mcsl-size-#{$size}.mcsl-cascader__trigger {
    height: utils.get-size-var("height", $size, $vars);
    padding: 0 calc(utils.get-size-var("spacing", $size, $vars) * 1.2);
    border-radius: utils.get-size-var("border-radius", $size, $vars);
    font-size: utils.get-size-var("font-size", $size, $vars);
  }
}

@media (max-width: 560px) {
  .mcsl-cascader__column {
    min-width: 9.5rem;
  }
}
</style>
