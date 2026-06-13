<script setup lang="ts">
import { computed, inject, nextTick, ref, watch } from "vue";
import type { FormFieldData } from "../FormEntry.vue";
import { ColorData, type ColorType, getColorVar } from "../../../utils/css.ts";
import type { Size } from "../../../utils/utils.ts";

const props = withDefaults(
  defineProps<{
    length?: number;
    mask?: boolean;
    numeric?: boolean;
    placeholder?: string;
    color?: ColorType;
    size?: Size;
    disabled?: boolean;
    invalid?: boolean;
  }>(),
  {
    length: 6,
    mask: false,
    numeric: true,
    placeholder: "",
    color: "primary",
    size: "medium",
    disabled: false,
    invalid: false,
  },
);

const emit = defineEmits<{
  (e: "complete", value: string): void;
  (e: "blur", event: FocusEvent): void;
  (e: "focus", event: FocusEvent): void;
}>();

const model = defineModel<string>({
  default: "",
});

const inputs = ref<HTMLInputElement[]>([]);
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

const cells = computed(() => {
  const chars = normalizeValue(model.value).slice(0, props.length).split("");
  return Array.from({ length: props.length }, (_, index) => chars[index] ?? "");
});

watch(
  () => props.length,
  () => {
    model.value = normalizeValue(model.value).slice(0, props.length);
  },
);

watch(model, (value) => {
  const next = normalizeValue(value).slice(0, props.length);
  if (next !== value) model.value = next;
  if (next.length === props.length) emit("complete", next);
});

function normalizeValue(value: string) {
  const text = String(value ?? "");
  return props.numeric ? text.replace(/\D/g, "") : text.replace(/\s/g, "");
}

function setInputRef(element: HTMLInputElement | null, index: number) {
  if (element) inputs.value[index] = element;
}

function updateChar(index: number, value: string) {
  const nextChar = normalizeValue(value).slice(-1);
  const chars = cells.value;
  chars[index] = nextChar;
  model.value = chars.join("").slice(0, props.length);
  formField?.onInput(new Event("input"));
  if (nextChar && index < props.length - 1) focusInput(index + 1);
}

function focusInput(index: number) {
  nextTick(() => {
    inputs.value[Math.min(Math.max(index, 0), props.length - 1)]?.focus();
    inputs.value[Math.min(Math.max(index, 0), props.length - 1)]?.select();
  });
}

function handleKeydown(event: KeyboardEvent, index: number) {
  if (event.key === "Backspace" && !cells.value[index] && index > 0) {
    event.preventDefault();
    const chars = cells.value;
    chars[index - 1] = "";
    model.value = chars.join("");
    focusInput(index - 1);
  } else if (event.key === "ArrowLeft") {
    event.preventDefault();
    focusInput(index - 1);
  } else if (event.key === "ArrowRight") {
    event.preventDefault();
    focusInput(index + 1);
  }
}

function handlePaste(event: ClipboardEvent, index: number) {
  const text = normalizeValue(event.clipboardData?.getData("text") ?? "");
  if (!text) return;
  event.preventDefault();
  const chars = cells.value;
  for (let offset = 0; offset < text.length && index + offset < props.length; offset++) {
    chars[index + offset] = text[offset]!;
  }
  model.value = chars.join("").slice(0, props.length);
  formField?.onInput(new Event("input"));
  focusInput(Math.min(index + text.length, props.length - 1));
}
</script>

<template>
  <div
    class="mcsl-input-otp"
    :class="[`mcsl-size-${size}`]"
    :style="{
      '--mcsl-input-otp__color': getColorVar(color),
      '--mcsl-input-otp__color-light': getColorVar(new ColorData(color, 'light')),
    }"
  >
    <input
      v-for="(_, index) in cells"
      :key="index"
      :ref="(element) => setInputRef(element as HTMLInputElement | null, index)"
      class="mcsl-input-otp__cell"
      :aria-invalid="invalid || formField?.field?.error?.value ? 'true' : undefined"
      :disabled="disabled"
      :inputmode="numeric ? 'numeric' : 'text'"
      :maxlength="1"
      :placeholder="placeholder"
      :type="mask ? 'password' : 'text'"
      :value="cells[index]"
      autocomplete="one-time-code"
      @input="updateChar(index, ($event.target as HTMLInputElement).value)"
      @keydown="handleKeydown($event, index)"
      @paste="handlePaste($event, index)"
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
    />
  </div>
</template>

<style scoped lang="scss">
@use "../../../assets/css/utils";
@use "../../SmallerContent" as *;

.mcsl-input-otp {
  display: flex;
  flex-wrap: wrap;
  gap: var(--mcsl-spacing-2xs);
  min-width: 0;
}

.mcsl-input-otp__cell {
  box-sizing: border-box;
  width: var(--mcsl-input-otp__cell-size);
  height: var(--mcsl-input-otp__cell-size);
  border: 1px solid var(--mcsl-border-color-base);
  border-radius: var(--mcsl-border-radius-sm);
  background: var(--mcsl-bg-color-overlay);
  color: var(--mcsl-text-color-primary);
  font: inherit;
  font-weight: 650;
  text-align: center;
  outline: 0 solid transparent;
  outline-offset: -2px;
  transition:
    background-color var(--mcsl-motion-duration-fast) var(--mcsl-motion-ease-standard),
    border-color var(--mcsl-motion-duration-fast) var(--mcsl-motion-ease-standard),
    box-shadow var(--mcsl-motion-duration-fast) var(--mcsl-motion-ease-standard),
    outline-color var(--mcsl-motion-duration-fast) var(--mcsl-motion-ease-standard);
}

.mcsl-input-otp__cell:hover:not(:disabled) {
  border-color: var(--mcsl-border-color-dark);
  box-shadow: var(--mcsl-box-shadow-light);
}

.mcsl-input-otp__cell:focus {
  border-color: color-mix(in srgb, var(--mcsl-input-otp__color) 52%, var(--mcsl-border-color-base));
  outline-color: var(--mcsl-input-otp__color-light);
  outline-width: 2px;
  box-shadow: var(--mcsl-box-shadow-base);
}

.mcsl-input-otp__cell[aria-invalid="true"] {
  border-color: var(--mcsl-color-danger);
}

.mcsl-input-otp__cell:disabled {
  cursor: not-allowed;
  opacity: 0.58;
}

@each $size in utils.$sizes {
  .mcsl-size-#{$size}.mcsl-input-otp {
    @if $size == "small" {
      --mcsl-input-otp__cell-size: 1.85rem;
    } @else if $size == "large" {
      --mcsl-input-otp__cell-size: 2.55rem;
    } @else {
      --mcsl-input-otp__cell-size: 2.2rem;
    }

    font-size: utils.get-size-var("font-size", $size, $vars);
  }
}
</style>
