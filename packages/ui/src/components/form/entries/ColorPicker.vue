<script setup lang="ts">
import { computed, inject, ref, watch } from "vue";
import DropdownContent from "../../overlay/DropdownContent.vue";
import InputText from "./InputText.vue";
import type { FormFieldData } from "../FormEntry.vue";
import type { Size } from "../../../utils/utils.ts";

type ColorFormat = "hex" | "rgb";

const props = withDefaults(
  defineProps<{
    format?: ColorFormat;
    showAlpha?: boolean;
    presets?: string[];
    placeholder?: string;
    size?: Size;
    disabled?: boolean;
    invalid?: boolean;
    clearable?: boolean;
  }>(),
  {
    format: "hex",
    showAlpha: false,
    presets: () => [
      "#3c83f6",
      "#22c55e",
      "#f59e0b",
      "#ef4444",
      "#8b5cf6",
      "#14b8a6",
      "#111827",
      "#f8fafc",
    ],
    placeholder: "Select color",
    size: "medium",
    disabled: false,
    invalid: false,
    clearable: false,
  },
);

const emit = defineEmits<{
  (e: "change", value: string): void;
  (e: "blur", event: FocusEvent): void;
  (e: "focus", event: FocusEvent): void;
}>();

const model = defineModel<string>({
  default: "",
});

const dropdownRef = ref();
const inputValue = ref("");
const alpha = ref(100);
const formField = inject("mcsl-form-field", undefined) as
  | FormFieldData
  | undefined;

if (formField) {
  model.value = String(formField.field.data.value ?? "");

  watch(formField.field.data, (value) => {
    if (value !== model.value) model.value = String(value ?? "");
  });

  watch(model, (value) => {
    if (value !== formField.field.data.value) formField.field.data.value = value;
  });
}

const normalizedHex = computed(() => normalizeHex(model.value) ?? "#3c83f6");
const displayValue = computed(() => model.value || "");
const swatchStyle = computed(() => {
  const hex = normalizeHex(model.value);
  if (!hex) return "transparent";
  return props.showAlpha ? hexToRgba(hex, alpha.value / 100) : hex;
});

watch(
  () => model.value,
  (value) => {
    inputValue.value = value;
    const parsedAlpha = parseAlpha(value);
    if (typeof parsedAlpha === "number") alpha.value = parsedAlpha;
  },
  { immediate: true },
);

function normalizeHex(value: string) {
  const trimmed = value.trim();
  if (/^#([0-9a-fA-F]{3})$/.test(trimmed)) {
    const [, short] = trimmed.match(/^#([0-9a-fA-F]{3})$/)!;
    return `#${short!.split("").map((item) => item + item).join("")}`.toLowerCase();
  }
  if (/^#([0-9a-fA-F]{6})$/.test(trimmed)) return trimmed.toLowerCase();
  const rgb = trimmed.match(/^rgba?\(([^)]+)\)$/i);
  if (rgb) {
    const parts = rgb[1]!.split(",").map((part) => Number.parseFloat(part.trim()));
    if (parts.length >= 3 && parts.slice(0, 3).every((part) => Number.isFinite(part))) {
      return rgbToHex(parts[0]!, parts[1]!, parts[2]!);
    }
  }
  return undefined;
}

function parseAlpha(value: string) {
  const match = value.trim().match(/^rgba\([^,]+,[^,]+,[^,]+,\s*([0-9.]+)\)$/i);
  if (!match) return undefined;
  const parsed = Number.parseFloat(match[1]!);
  if (!Number.isFinite(parsed)) return undefined;
  return Math.round(Math.min(Math.max(parsed, 0), 1) * 100);
}

function rgbToHex(r: number, g: number, b: number) {
  return `#${[r, g, b]
    .map((part) => Math.min(Math.max(Math.round(part), 0), 255).toString(16).padStart(2, "0"))
    .join("")}`;
}

function hexToRgb(hex: string) {
  const value = normalizeHex(hex) ?? "#000000";
  return [
    Number.parseInt(value.slice(1, 3), 16),
    Number.parseInt(value.slice(3, 5), 16),
    Number.parseInt(value.slice(5, 7), 16),
  ] as const;
}

function hexToRgba(hex: string, opacity: number) {
  const [r, g, b] = hexToRgb(hex);
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}

function formatColor(hex: string) {
  if (props.format === "rgb") {
    const [r, g, b] = hexToRgb(hex);
    if (props.showAlpha) return `rgba(${r}, ${g}, ${b}, ${alpha.value / 100})`;
    return `rgb(${r}, ${g}, ${b})`;
  }
  return hex;
}

function commitColor(value: string) {
  const hex = normalizeHex(value);
  if (!hex) {
    inputValue.value = model.value;
    return;
  }
  model.value = formatColor(hex);
  inputValue.value = model.value;
  emit("change", model.value);
  formField?.onInput(new Event("input"));
}

function clearValue(event: MouseEvent) {
  event.stopPropagation();
  if (!props.clearable || props.disabled) return;
  model.value = "";
  inputValue.value = "";
  emit("change", "");
  formField?.onInput(new Event("input"));
}
</script>

<template>
  <DropdownContent ref="dropdownRef" class="mcsl-color-picker">
    <template #triggerer="{ open, opened }">
      <button
        type="button"
        class="mcsl-color-picker__trigger"
        :class="[`mcsl-size-${size}`, { 'mcsl-color-picker__trigger--empty': !model }]"
        :disabled="disabled"
        :aria-invalid="invalid || formField?.field?.error?.value ? 'true' : undefined"
        @click="open"
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
        <span class="mcsl-color-picker__swatch" :style="{ background: swatchStyle }" />
        <span class="mcsl-color-picker__value">
          {{ displayValue || placeholder }}
        </span>
        <span
          v-if="clearable && model"
          class="mcsl-color-picker__clear"
          role="button"
          tabindex="-1"
          @click="clearValue"
        >
          <i class="fa fa-xmark" />
        </span>
        <i class="fa fa-angle-down mcsl-color-picker__arrow" :class="{ 'fa-rotate-180': opened }" />
      </button>
    </template>
    <div class="mcsl-color-picker__panel">
      <div class="mcsl-color-picker__native">
        <input
          type="color"
          :value="normalizedHex"
          :disabled="disabled"
          @input="commitColor(($event.target as HTMLInputElement).value)"
        />
        <InputText
          v-model="inputValue"
          :disabled="disabled"
          :size="size"
          placeholder="#3c83f6"
          @blur="commitColor(inputValue)"
          @keydown.enter="commitColor(inputValue)"
        />
      </div>
      <label v-if="showAlpha" class="mcsl-color-picker__alpha">
        <span>Alpha</span>
        <input
          v-model.number="alpha"
          type="range"
          min="0"
          max="100"
          :disabled="disabled"
          @input="commitColor(normalizedHex)"
        />
        <strong>{{ alpha }}%</strong>
      </label>
      <div v-if="presets.length" class="mcsl-color-picker__presets">
        <button
          v-for="preset in presets"
          :key="preset"
          type="button"
          class="mcsl-color-picker__preset"
          :style="{ background: preset }"
          :aria-label="preset"
          :disabled="disabled"
          @click="commitColor(preset)"
        />
      </div>
    </div>
  </DropdownContent>
</template>

<style scoped lang="scss">
@use "../../../assets/css/utils";
@use "../../SmallerContent" as *;

.mcsl-color-picker {
  display: block;
  width: 100%;
}

.mcsl-color-picker__trigger {
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

.mcsl-color-picker__trigger:hover:not(:disabled) {
  border-color: var(--mcsl-border-color-dark);
  box-shadow: var(--mcsl-box-shadow-light);
}

.mcsl-color-picker__trigger:focus {
  outline-color: color-mix(in srgb, var(--mcsl-color-primary) 35%, transparent);
  outline-width: 2px;
}

.mcsl-color-picker__trigger[aria-invalid="true"] {
  border-color: var(--mcsl-color-danger);
}

.mcsl-color-picker__trigger:disabled {
  cursor: not-allowed;
  opacity: 0.58;
}

.mcsl-color-picker__swatch {
  width: 1.15rem;
  height: 1.15rem;
  flex: 0 0 auto;
  border: 1px solid color-mix(in srgb, var(--mcsl-border-color-base) 85%, transparent);
  border-radius: var(--mcsl-border-radius-xs);
  background:
    linear-gradient(45deg, #ddd 25%, transparent 25%),
    linear-gradient(-45deg, #ddd 25%, transparent 25%),
    linear-gradient(45deg, transparent 75%, #ddd 75%),
    linear-gradient(-45deg, transparent 75%, #ddd 75%);
  background-position:
    0 0,
    0 5px,
    5px -5px,
    -5px 0;
  background-size: 10px 10px;
}

.mcsl-color-picker__value {
  flex: 1;
  min-width: 0;
  overflow: hidden;
  color: inherit;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.mcsl-color-picker__trigger--empty .mcsl-color-picker__value,
.mcsl-color-picker__clear,
.mcsl-color-picker__arrow {
  color: var(--mcsl-text-color-secondary);
}

.mcsl-color-picker__clear {
  display: grid;
  place-items: center;
  width: 1.35rem;
  height: 1.35rem;
  border-radius: 999px;
}

.mcsl-color-picker__clear:hover {
  background: color-mix(in srgb, var(--mcsl-bg-color-dark) 82%, transparent);
  color: var(--mcsl-text-color-primary);
}

.mcsl-color-picker__arrow {
  transition: transform var(--mcsl-motion-duration-fast) var(--mcsl-motion-ease-standard);
}

.mcsl-color-picker__arrow.fa-rotate-180 {
  transform: rotate(180deg);
}

.mcsl-color-picker__panel {
  display: grid;
  box-sizing: border-box;
  width: min(18rem, calc(100vw - 2 * var(--mcsl-spacing-md)));
  gap: var(--mcsl-spacing-xs);
  padding: var(--mcsl-spacing-xs);
  border: 1px solid var(--mcsl-border-color-base);
  border-radius: var(--mcsl-border-radius-sm);
  background: var(--mcsl-bg-color-overlay);
  box-shadow: var(--mcsl-box-shadow-base);
}

.mcsl-color-picker__native {
  display: grid;
  grid-template-columns: 2.6rem minmax(0, 1fr);
  gap: var(--mcsl-spacing-xs);
  align-items: center;
}

.mcsl-color-picker__native input[type="color"] {
  width: 2.6rem;
  height: 2.35rem;
  padding: 2px;
  border: 1px solid var(--mcsl-border-color-base);
  border-radius: var(--mcsl-border-radius-sm);
  background: var(--mcsl-bg-color-overlay);
  cursor: pointer;
}

.mcsl-color-picker__alpha {
  display: grid;
  grid-template-columns: auto minmax(0, 1fr) auto;
  align-items: center;
  gap: var(--mcsl-spacing-xs);
  color: var(--mcsl-text-color-secondary);
  font-size: var(--mcsl-font-size-sm);
}

.mcsl-color-picker__alpha strong {
  color: var(--mcsl-text-color-primary);
  font-variant-numeric: tabular-nums;
}

.mcsl-color-picker__presets {
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  gap: var(--mcsl-spacing-3xs);
}

.mcsl-color-picker__preset {
  aspect-ratio: 1;
  border: 1px solid color-mix(in srgb, var(--mcsl-border-color-base) 80%, transparent);
  border-radius: var(--mcsl-border-radius-xs);
  cursor: pointer;
  box-shadow: inset 0 1px 0 color-mix(in srgb, #fff 24%, transparent);
  transition:
    border-color var(--mcsl-motion-duration-fast) var(--mcsl-motion-ease-standard),
    transform var(--mcsl-motion-duration-fast) var(--mcsl-motion-ease-standard);
}

.mcsl-color-picker__preset:hover:not(:disabled) {
  border-color: var(--mcsl-text-color-primary);
  transform: translateY(-1px);
}

@each $size in utils.$sizes {
  .mcsl-size-#{$size}.mcsl-color-picker__trigger {
    height: utils.get-size-var("height", $size, $vars);
    padding: 0 calc(utils.get-size-var("spacing", $size, $vars) * 1.2);
    border-radius: utils.get-size-var("border-radius", $size, $vars);
    font-size: utils.get-size-var("font-size", $size, $vars);
  }
}
</style>
