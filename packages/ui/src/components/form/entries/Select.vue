<script lang="ts" setup>
import { inject, watch } from "vue";
import type { ColorType } from "../../../utils/css.ts";
import type { SelectionInfo } from "../../../utils/form.ts";
import type { Size } from "../../../utils/utils.ts";
import type { FormFieldData } from "../FormEntry.vue";
import Combobox from "./Combobox.vue";

const props = withDefaults(
  defineProps<{
    options: SelectionInfo;
    color?: ColorType;
    invalid?: boolean;
    disabled?: boolean;
    prefix?: string;
    suffix?: string;
    placeholder?: string;
    size?: Size;
    clearable?: boolean;
  }>(),
  {
    size: "medium",
    color: "primary",
    invalid: false,
    disabled: false,
    prefix: "",
    suffix: "",
    placeholder: "",
    clearable: false,
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

const formField = inject("mcsl-form-field", undefined) as
  | FormFieldData
  | undefined;

if (formField) {
  model.value = formField.field.data.value;

  watch(formField.field.data, (value) => {
    if (value != model.value) model.value = value;
  });

  watch(model, (value) => {
    if (value != formField.field.data.value) formField.field.data.value = value;
  });
}

function forwardInput(event: Event) {
  emit("input", event);
  formField?.onInput(event);
}

function forwardBlur(event: Event) {
  emit("blur", event);
  formField?.onBlur(event);
}

function forwardFocus(event: Event) {
  emit("focus", event);
  formField?.onFocus(event);
}
</script>

<template>
  <Combobox
    v-model="model"
    class="mcsl-select"
    :clearable="clearable"
    :color="color"
    :disabled="disabled"
    :editable="false"
    :autocomplete="false"
    :invalid="invalid"
    :options="options"
    :placeholder="placeholder"
    :prefix="prefix"
    :size="size"
    :suffix="suffix"
    @blur="forwardBlur"
    @focus="forwardFocus"
    @input="forwardInput"
  >
    <template #header>
      <slot name="header" />
    </template>
  </Combobox>
</template>

<style lang="scss" scoped>
.mcsl-select {
  flex: 1;
}
</style>
