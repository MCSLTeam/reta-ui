<script setup lang="ts">
import { computed, inject, ref, watch } from "vue";
import DropdownContent from "../../overlay/DropdownContent.vue";
import InputText from "./InputText.vue";
import type { SelectionGroup, SelectionInfo, SelectionItem } from "../../../utils/form.ts";
import type { FormFieldData } from "../FormEntry.vue";
import type { ColorType } from "../../../utils/css.ts";
import type { Size } from "../../../utils/utils.ts";

const props = withDefaults(
  defineProps<{
    options: SelectionInfo;
    placeholder?: string;
    color?: ColorType;
    size?: Size;
    disabled?: boolean;
    invalid?: boolean;
    clearable?: boolean;
    editable?: boolean;
    autocomplete?: boolean;
    multiple?: boolean;
    dropdownIcon?: string;
    prefix?: string;
    suffix?: string;
    filterMethod?: (query: string, option: SelectionItem) => boolean;
  }>(),
  {
    options: () => [],
    placeholder: "",
    color: "primary",
    size: "medium",
    disabled: false,
    invalid: false,
    clearable: true,
    editable: true,
    autocomplete: true,
    multiple: false,
    dropdownIcon: "fa fa-angle-down",
    prefix: "",
    suffix: "",
    filterMethod: undefined,
  },
);

const emit = defineEmits<{
  (e: "input", event: Event): void;
  (e: "blur", event: Event): void;
  (e: "focus", event: Event): void;
}>();

const model = defineModel<unknown>({
  default: undefined,
});

const query = defineModel<string>("query", {
  default: "",
});
const dropdownRef = ref();
const formField = inject("mcsl-form-field", undefined) as
  | FormFieldData
  | undefined;

const groupedOptions = computed(() => {
  if (props.options.length === 0) return [];
  const firstOption = props.options[0];
  if (firstOption && "group" in firstOption) {
    return props.options as SelectionGroup[];
  }
  return [{ group: "", options: props.options as SelectionItem[] }];
});

const flatOptions = computed(() =>
  groupedOptions.value.flatMap((group) => group.options),
);

const modelArray = computed<unknown[]>(() =>
  props.multiple ? (Array.isArray(model.value) ? model.value : []) : [],
);

const selectedOptions = computed(() => {
  if (props.multiple) {
    const selectedKeys = new Set(modelArray.value.map(valueKey));
    return flatOptions.value.filter((option) => selectedKeys.has(valueKey(option.value)));
  }

  return selectedOption.value ? [selectedOption.value] : [];
});

if (formField) {
  model.value = formField.field.data.value;

  watch(formField.field.data, (value) => {
    if (value != model.value) model.value = value;
  });

  watch(model, (value) => {
    if (value != formField.field.data.value) formField.field.data.value = value;
  });
}

const selectedOption = computed(() =>
  flatOptions.value.find((option) => option.value === model.value),
);

watch(
  selectedOption,
  (option) => {
    if (!props.multiple) query.value = option ? optionLabel(option) : "";
  },
  { immediate: true },
);

watch(query, (value) => {
  if (!props.multiple && !value && props.clearable && props.editable) {
    model.value = undefined;
  }
});

const filteredOptions = computed(() => {
  const keyword = query.value.trim().toLowerCase();
  const groups = groupedOptions.value.map((group) => ({
    ...group,
    options: !keyword || !props.autocomplete
      ? group.options
      : group.options.filter((option) => {
          if (props.filterMethod) return props.filterMethod(query.value, option);
          return [option.label, option.value]
            .filter((value) => value != null)
            .join(" ")
            .toLowerCase()
            .includes(keyword);
        }),
  }));

  return groups.filter((group) => group.options.length > 0);
});

const filteredOptionCount = computed(() =>
  filteredOptions.value.reduce((count, group) => count + group.options.length, 0),
);

const displayValue = computed(() => {
  if (props.multiple) {
    if (selectedOptions.value.length === 0) return "";
    return selectedOptions.value.map(optionLabel).join(", ");
  }

  if (!selectedOption.value) return "";
  return [props.prefix, optionLabel(selectedOption.value), props.suffix]
    .filter(Boolean)
    .join("");
});

const hasValue = computed(() =>
  props.multiple ? modelArray.value.length > 0 : model.value !== undefined && model.value !== "",
);

const triggerText = computed(() =>
  displayValue.value || props.placeholder,
);

function optionLabel(option: SelectionItem) {
  return String(option.label ?? option.value);
}

function valueKey(value: unknown) {
  return String(value);
}

function selectOption(option: SelectionItem) {
  if (option.disabled) return;
  if (props.multiple) {
    const next = [...modelArray.value];
    const key = valueKey(option.value);
    const existingIndex = next.findIndex((value) => valueKey(value) === key);
    if (existingIndex >= 0) next.splice(existingIndex, 1);
    else next.push(option.value);
    model.value = next;
    query.value = "";
  } else {
    model.value = option.value;
    query.value = optionLabel(option);
    dropdownRef.value?.close();
  }
  const event = new Event("input");
  emit("input", event);
  formField?.onInput(event);
}

function isSelected(option: SelectionItem) {
  if (props.multiple) {
    return modelArray.value.some((value) => valueKey(value) === valueKey(option.value));
  }
  return option.value === model.value;
}

function clearValue(event?: MouseEvent) {
  event?.stopPropagation();
  if (!props.clearable || props.disabled) return;
  model.value = props.multiple ? [] : undefined;
  query.value = "";
  const inputEvent = new Event("input");
  emit("input", inputEvent);
  formField?.onInput(inputEvent);
}
</script>

<template>
  <DropdownContent ref="dropdownRef" class="mcsl-combobox">
    <template #triggerer="{ open, opened }">
      <div
        class="mcsl-combobox__trigger"
        :class="{
          [`mcsl-size-${size}`]: true,
          'mcsl-combobox__trigger--editable': editable,
          'mcsl-combobox__trigger--select': !editable,
          'mcsl-combobox__trigger--has-value': hasValue,
        }"
      >
        <InputText
          v-if="editable"
          v-model="query"
          :clearable="false"
          :color="color"
          :disabled="disabled"
          :invalid="invalid"
          :placeholder="placeholder"
          :size="size"
          @focus="
            (event) => {
              open();
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
          @input="
            (event) => {
              open();
              $emit('input', event);
            }
          "
        />
        <button
          v-else
          :aria-invalid="invalid || formField?.field?.error?.value ? 'true' : undefined"
          :disabled="disabled"
          class="mcsl-combobox__select-trigger"
          type="button"
          @blur="
            (event) => {
              $emit('blur', event);
              formField?.onBlur(event);
            }
          "
          @click="open"
          @focus="
            (event) => {
              $emit('focus', event);
              formField?.onFocus(event);
            }
          "
        >
          <span :class="{ 'mcsl-combobox__placeholder': !displayValue }">
            {{ triggerText }}
          </span>
        </button>
        <button
          class="mcsl-combobox__action"
          :disabled="disabled"
          type="button"
          @click="hasValue && clearable ? clearValue($event) : open()"
        >
          <i
            :class="[
              ...dropdownIcon.split(' '),
              'mcsl-combobox__dropdown-icon',
              { 'fa-rotate-180': opened },
            ]"
          />
          <i
            v-if="hasValue && clearable"
            class="fa fa-xmark mcsl-combobox__clear-icon"
          />
        </button>
      </div>
    </template>
    <div
      class="mcsl-combobox__panel"
      :style="{
        width: dropdownRef?.triggererPos?.width
          ? `max(${dropdownRef.triggererPos.width}px, 14rem)`
          : '14rem',
      }"
    >
      <div v-if="$slots.header" class="mcsl-combobox__header">
        <slot name="header" />
      </div>
      <section
        v-for="group in filteredOptions"
        :key="group.group || 'ungrouped'"
        class="mcsl-combobox__group"
      >
        <div v-if="group.group" class="mcsl-combobox__group-title">
          {{ group.group }}
        </div>
        <button
          v-for="option in group.options"
          :key="String(option.value)"
          type="button"
          class="mcsl-combobox__option"
          :class="{ 'mcsl-combobox__option--selected': isSelected(option) }"
          :disabled="option.disabled"
          @click="selectOption(option)"
        >
          <i v-if="option.icon" :class="option.icon" />
          <span>
            {{ optionLabel(option) }}
            <small v-if="isSelected(option) && (prefix || suffix)">
              {{ displayValue }}
            </small>
          </span>
          <i v-if="isSelected(option)" class="fas fa-check" />
        </button>
      </section>
      <div v-if="filteredOptionCount === 0" class="mcsl-combobox__empty">
        No matches
      </div>
    </div>
  </DropdownContent>
</template>

<style scoped lang="scss">
@use "../../../assets/css/utils";
@use "../../SmallerContent" as *;

.mcsl-combobox {
  display: block;
  width: 100%;
}

.mcsl-combobox__trigger {
  position: relative;
  box-sizing: border-box;
  width: 100%;
  min-width: 0;
}

.mcsl-combobox__trigger--editable :deep(.mcsl-input-text) {
  width: 100%;
  min-width: 0;
}

.mcsl-combobox__trigger--editable :deep(.mcsl-input-text > input) {
  padding-right: 2.8rem !important;
}

.mcsl-combobox__select-trigger {
  box-sizing: border-box;
  width: 100%;
  min-width: 0;
  margin: 0;
  padding: 0 2.8rem 0 var(--mcsl-spacing-sm);
  border: 1px solid var(--mcsl-border-color-base);
  border-radius: var(--mcsl-border-radius-sm);
  outline: 0 solid transparent;
  outline-offset: -2px;
  background: var(--mcsl-bg-color-overlay);
  color: var(--mcsl-text-color-primary);
  cursor: pointer;
  text-align: left;
  transition:
    background-color var(--mcsl-motion-duration-fast) var(--mcsl-motion-ease-standard),
    border-color var(--mcsl-motion-duration-fast) var(--mcsl-motion-ease-standard),
    outline-color var(--mcsl-motion-duration-fast) var(--mcsl-motion-ease-standard),
    box-shadow var(--mcsl-motion-duration-fast) var(--mcsl-motion-ease-standard);
}

.mcsl-combobox__select-trigger span {
  display: block;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.mcsl-combobox__placeholder {
  color: var(--mcsl-text-color-secondary);
}

.mcsl-combobox__select-trigger:hover {
  border-color: var(--mcsl-border-color-dark);
  background: color-mix(in srgb, var(--mcsl-bg-color-dark) 94%, transparent);
  box-shadow: var(--mcsl-box-shadow-light);
}

.mcsl-combobox__select-trigger:focus {
  outline-color: color-mix(in srgb, var(--mcsl-color-primary) 36%, transparent);
  outline-width: 2px;
}

.mcsl-combobox__select-trigger:disabled {
  cursor: not-allowed;
  opacity: 0.58;
}

.mcsl-combobox__select-trigger[aria-invalid="true"] {
  border-color: var(--mcsl-color-danger);
}

.mcsl-combobox__action {
  position: absolute;
  right: 4px;
  top: 50%;
  display: grid;
  place-items: center;
  width: 2rem;
  height: calc(100% - 8px);
  border: 0;
  border-radius: var(--mcsl-border-radius-sm);
  background: transparent;
  color: var(--mcsl-text-color-secondary);
  cursor: pointer;
  transform: translateY(-50%);
  transition:
    background-color var(--mcsl-motion-duration-fast) var(--mcsl-motion-ease-standard),
    color var(--mcsl-motion-duration-fast) var(--mcsl-motion-ease-standard);
}

.mcsl-combobox__action:hover:not(:disabled) {
  background: color-mix(in srgb, var(--mcsl-bg-color-dark) 80%, transparent);
  color: var(--mcsl-text-color-primary);
}

.mcsl-combobox__action:disabled {
  cursor: not-allowed;
  opacity: 0.45;
}

.mcsl-combobox__action i {
  grid-area: 1 / 1;
  transition: transform var(--mcsl-motion-duration-fast) var(--mcsl-motion-ease-standard);
}

.mcsl-combobox__action i.fa-rotate-180 {
  transform: rotate(180deg);
}

.mcsl-combobox__action i:not(.fa-rotate-180) {
  transform: rotate(0deg);
}

.mcsl-combobox__clear-icon {
  opacity: 0;
  transition:
    opacity var(--mcsl-motion-duration-fast) var(--mcsl-motion-ease-standard),
    transform var(--mcsl-motion-duration-fast) var(--mcsl-motion-ease-standard);
}

.mcsl-combobox__trigger--has-value .mcsl-combobox__action:hover .mcsl-combobox__dropdown-icon {
  opacity: 0;
}

.mcsl-combobox__trigger--has-value .mcsl-combobox__action:hover .mcsl-combobox__clear-icon {
  opacity: 1;
}

@each $size in utils.$sizes {
  .mcsl-combobox__trigger--select.mcsl-size-#{$size} .mcsl-combobox__select-trigger {
    height: utils.get-size-var("height", $size, $vars);
    font-size: utils.get-size-var("font-size", $size, $vars);
  }
}

.mcsl-combobox__panel {
  box-sizing: border-box;
  max-width: calc(100vw - 2 * var(--mcsl-spacing-md));
  max-height: 18rem;
  overflow: auto;
  padding: var(--mcsl-spacing-4xs);
  border: 1px solid var(--mcsl-border-color-base);
  border-radius: var(--mcsl-border-radius-sm);
  background: var(--mcsl-bg-color-overlay);
  box-shadow: var(--mcsl-box-shadow-base);
}

.mcsl-combobox__header {
  padding: var(--mcsl-spacing-2xs) var(--mcsl-spacing-xs);
  border-bottom: 1px solid color-mix(in srgb, var(--mcsl-border-color-base) 70%, transparent);
  margin-bottom: var(--mcsl-spacing-3xs);
}

.mcsl-combobox__group + .mcsl-combobox__group {
  margin-top: var(--mcsl-spacing-3xs);
  padding-top: var(--mcsl-spacing-3xs);
  border-top: 1px solid color-mix(in srgb, var(--mcsl-border-color-base) 70%, transparent);
}

.mcsl-combobox__group-title {
  padding: var(--mcsl-spacing-4xs) var(--mcsl-spacing-xs);
  color: var(--mcsl-text-color-secondary);
  font-size: var(--mcsl-font-size-xs);
  font-weight: 680;
  line-height: 1.35;
}

.mcsl-combobox__option {
  display: grid;
  grid-template-columns: auto minmax(0, 1fr) auto;
  align-items: center;
  width: 100%;
  gap: var(--mcsl-spacing-2xs);
  min-height: 2rem;
  padding: 0 var(--mcsl-spacing-xs);
  border: 0;
  border-radius: var(--mcsl-border-radius-sm);
  background: transparent;
  color: var(--mcsl-text-color-regular);
  text-align: left;
  cursor: pointer;
  transition:
    background-color var(--mcsl-motion-duration-fast) var(--mcsl-motion-ease-standard),
    color var(--mcsl-motion-duration-fast) var(--mcsl-motion-ease-standard);
}

.mcsl-combobox__option span {
  display: grid;
  min-width: 0;
  gap: 1px;
}

.mcsl-combobox__option small {
  overflow: hidden;
  color: var(--mcsl-text-color-secondary);
  font-size: var(--mcsl-font-size-xs);
  font-weight: 500;
  line-height: 1.25;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.mcsl-combobox__option:hover:not(:disabled),
.mcsl-combobox__option--selected {
  background: color-mix(in srgb, var(--mcsl-color-primary) 9%, var(--mcsl-bg-color-overlay));
  color: var(--mcsl-text-color-primary);
}

.mcsl-combobox__option:disabled {
  cursor: not-allowed;
  opacity: 0.52;
}

.mcsl-combobox__empty {
  padding: var(--mcsl-spacing-sm);
  color: var(--mcsl-text-color-secondary);
  font-size: var(--mcsl-font-size-sm);
  text-align: center;
}
</style>
