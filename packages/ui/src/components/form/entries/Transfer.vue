<script setup lang="ts">
import { computed, ref, watch } from "vue";
import Button from "../../button/Button.vue";
import Checkbox from "./Checkbox.vue";
import InputText from "./InputText.vue";
import type { ColorType } from "../../../utils/css.ts";
import type { SelectionItem } from "../../../utils/form.ts";
import type { Size } from "../../../utils/utils.ts";

const props = withDefaults(
  defineProps<{
    options: SelectionItem[];
    sourceTitle?: string;
    targetTitle?: string;
    sourcePlaceholder?: string;
    targetPlaceholder?: string;
    filterable?: boolean;
    disabled?: boolean;
    color?: ColorType;
    size?: Size;
  }>(),
  {
    options: () => [],
    sourceTitle: "Available",
    targetTitle: "Selected",
    sourcePlaceholder: "Search available",
    targetPlaceholder: "Search selected",
    filterable: true,
    disabled: false,
    color: "primary",
    size: "medium",
  },
);

const model = defineModel<unknown[]>({
  default: () => [],
});

const sourceQuery = ref("");
const targetQuery = ref("");
const selectedSource = ref(new Set<string>());
const selectedTarget = ref(new Set<string>());

const selectedKeys = computed(() => new Set(model.value.map(valueKey)));
const availableOptions = computed(() =>
  props.options.filter((option) => !selectedKeys.value.has(valueKey(option.value))),
);
const chosenOptions = computed(() =>
  props.options.filter((option) => selectedKeys.value.has(valueKey(option.value))),
);

const filteredSourceOptions = computed(() =>
  filterOptions(availableOptions.value, sourceQuery.value),
);
const filteredTargetOptions = computed(() =>
  filterOptions(chosenOptions.value, targetQuery.value),
);

const sourceCheckState = computed<boolean | null>(() =>
  getCheckState(filteredSourceOptions.value, selectedSource.value),
);
const targetCheckState = computed<boolean | null>(() =>
  getCheckState(filteredTargetOptions.value, selectedTarget.value),
);

watch([availableOptions, chosenOptions], () => {
  selectedSource.value = pruneSelection(selectedSource.value, availableOptions.value);
  selectedTarget.value = pruneSelection(selectedTarget.value, chosenOptions.value);
});

function valueKey(value: unknown) {
  return String(value);
}

function optionLabel(option: SelectionItem) {
  return String(option.label ?? option.value);
}

function filterOptions(options: SelectionItem[], query: string) {
  const keyword = query.trim().toLowerCase();
  if (!keyword) return options;
  return options.filter((option) =>
    [option.label, option.value]
      .filter((value) => value != null)
      .join(" ")
      .toLowerCase()
      .includes(keyword),
  );
}

function pruneSelection(selection: Set<string>, options: SelectionItem[]) {
  const allowed = new Set(options.map((option) => valueKey(option.value)));
  return new Set([...selection].filter((key) => allowed.has(key)));
}

function getCheckState(options: SelectionItem[], selection: Set<string>) {
  const enabled = options.filter((option) => !option.disabled);
  if (enabled.length === 0) return false;
  const selectedCount = enabled.filter((option) =>
    selection.has(valueKey(option.value)),
  ).length;
  if (selectedCount === 0) return false;
  if (selectedCount === enabled.length) return true;
  return null;
}

function toggleOption(selection: "source" | "target", option: SelectionItem) {
  if (props.disabled || option.disabled) return;
  const selected = selection === "source" ? selectedSource : selectedTarget;
  const next = new Set(selected.value);
  const key = valueKey(option.value);
  if (next.has(key)) next.delete(key);
  else next.add(key);
  selected.value = next;
}

function setOptionChecked(
  selection: "source" | "target",
  option: SelectionItem,
  checked: boolean | null,
) {
  if (props.disabled || option.disabled) return;
  const selected = selection === "source" ? selectedSource : selectedTarget;
  const next = new Set(selected.value);
  const key = valueKey(option.value);
  if (checked === true) next.add(key);
  else next.delete(key);
  selected.value = next;
}

function toggleAll(selection: "source" | "target", checked: boolean | null) {
  if (props.disabled) return;
  const options =
    selection === "source" ? filteredSourceOptions.value : filteredTargetOptions.value;
  const target = selection === "source" ? selectedSource : selectedTarget;
  const enabledKeys = options
    .filter((option) => !option.disabled)
    .map((option) => valueKey(option.value));
  target.value = checked === true ? new Set(enabledKeys) : new Set();
}

function moveToTarget() {
  if (props.disabled || selectedSource.value.size === 0) return;
  const moving = availableOptions.value
    .filter((option) => selectedSource.value.has(valueKey(option.value)))
    .map((option) => option.value);
  model.value = [...model.value, ...moving];
  selectedSource.value = new Set();
}

function moveToSource() {
  if (props.disabled || selectedTarget.value.size === 0) return;
  const removing = selectedTarget.value;
  model.value = model.value.filter((value) => !removing.has(valueKey(value)));
  selectedTarget.value = new Set();
}
</script>

<template>
  <div
    class="mcsl-transfer"
    :class="[`mcsl-size-${size}`, { 'mcsl-transfer--disabled': disabled }]"
  >
    <section class="mcsl-transfer__pane">
      <header class="mcsl-transfer__header">
        <Checkbox
          :model-value="sourceCheckState"
          :disabled="disabled || filteredSourceOptions.length === 0"
          :color="color"
          :size="size"
          @update:model-value="toggleAll('source', $event)"
        >
          {{ sourceTitle }}
        </Checkbox>
        <small>{{ filteredSourceOptions.length }}</small>
      </header>
      <InputText
        v-if="filterable"
        v-model="sourceQuery"
        clearable
        :disabled="disabled"
        :placeholder="sourcePlaceholder"
        :size="size"
      />
      <div class="mcsl-transfer__list">
        <div
          v-for="option in filteredSourceOptions"
          :key="valueKey(option.value)"
          class="mcsl-transfer__option"
          :class="{ 'mcsl-transfer__option--disabled': disabled || option.disabled }"
          :aria-disabled="disabled || option.disabled ? 'true' : undefined"
          role="button"
          :tabindex="disabled || option.disabled ? -1 : 0"
          @click="toggleOption('source', option)"
          @keydown.enter.prevent="toggleOption('source', option)"
          @keydown.space.prevent="toggleOption('source', option)"
        >
          <Checkbox
            :model-value="selectedSource.has(valueKey(option.value))"
            :disabled="disabled || option.disabled"
            :color="color"
            :size="size"
            @click.stop
            @update:model-value="setOptionChecked('source', option, $event)"
          />
          <i v-if="option.icon" :class="option.icon" />
          <span>{{ optionLabel(option) }}</span>
        </div>
        <p v-if="filteredSourceOptions.length === 0" class="mcsl-transfer__empty">
          No items
        </p>
      </div>
    </section>

    <div class="mcsl-transfer__actions">
      <Button
        icon="fas fa-angle-right"
        rounded
        :disabled="disabled || selectedSource.size === 0"
        :size="size"
        type="default"
        @click="moveToTarget"
      />
      <Button
        icon="fas fa-angle-left"
        rounded
        :disabled="disabled || selectedTarget.size === 0"
        :size="size"
        type="default"
        @click="moveToSource"
      />
    </div>

    <section class="mcsl-transfer__pane">
      <header class="mcsl-transfer__header">
        <Checkbox
          :model-value="targetCheckState"
          :disabled="disabled || filteredTargetOptions.length === 0"
          :color="color"
          :size="size"
          @update:model-value="toggleAll('target', $event)"
        >
          {{ targetTitle }}
        </Checkbox>
        <small>{{ filteredTargetOptions.length }}</small>
      </header>
      <InputText
        v-if="filterable"
        v-model="targetQuery"
        clearable
        :disabled="disabled"
        :placeholder="targetPlaceholder"
        :size="size"
      />
      <div class="mcsl-transfer__list">
        <div
          v-for="option in filteredTargetOptions"
          :key="valueKey(option.value)"
          class="mcsl-transfer__option"
          :class="{ 'mcsl-transfer__option--disabled': disabled || option.disabled }"
          :aria-disabled="disabled || option.disabled ? 'true' : undefined"
          role="button"
          :tabindex="disabled || option.disabled ? -1 : 0"
          @click="toggleOption('target', option)"
          @keydown.enter.prevent="toggleOption('target', option)"
          @keydown.space.prevent="toggleOption('target', option)"
        >
          <Checkbox
            :model-value="selectedTarget.has(valueKey(option.value))"
            :disabled="disabled || option.disabled"
            :color="color"
            :size="size"
            @click.stop
            @update:model-value="setOptionChecked('target', option, $event)"
          />
          <i v-if="option.icon" :class="option.icon" />
          <span>{{ optionLabel(option) }}</span>
        </div>
        <p v-if="filteredTargetOptions.length === 0" class="mcsl-transfer__empty">
          No items
        </p>
      </div>
    </section>
  </div>
</template>

<style scoped lang="scss">
.mcsl-transfer {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto minmax(0, 1fr);
  align-items: stretch;
  gap: var(--mcsl-spacing-sm);
  min-width: 0;
  width: 100%;
}

.mcsl-transfer__pane {
  display: grid;
  grid-template-rows: auto auto minmax(0, 1fr);
  gap: var(--mcsl-spacing-2xs);
  min-width: 0;
  min-height: 17rem;
  border: 1px solid color-mix(in srgb, var(--mcsl-border-color-base) 92%, transparent);
  border-radius: var(--mcsl-border-radius-md);
  background: color-mix(in srgb, var(--mcsl-bg-color-overlay) 98%, transparent);
  overflow: hidden;
}

.mcsl-transfer__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--mcsl-spacing-xs);
  min-width: 0;
  min-height: 2.35rem;
  padding: 0 var(--mcsl-spacing-sm);
  border-bottom: 1px solid color-mix(in srgb, var(--mcsl-border-color-base) 76%, transparent);
  background: color-mix(in srgb, var(--mcsl-bg-color-dark) 44%, transparent);
}

.mcsl-transfer__header small {
  flex: none;
  color: var(--mcsl-text-color-secondary);
  font-size: var(--mcsl-font-size-xs);
  font-weight: 650;
}

.mcsl-transfer__pane > :deep(.mcsl-input-text) {
  width: auto;
  min-width: 0;
  margin: 0 var(--mcsl-spacing-xs);
}

.mcsl-transfer__list {
  display: grid;
  align-content: start;
  gap: 2px;
  min-height: 0;
  padding: var(--mcsl-spacing-3xs);
  overflow: auto;
}

.mcsl-transfer__option {
  display: grid;
  grid-template-columns: auto auto minmax(0, 1fr);
  align-items: center;
  gap: var(--mcsl-spacing-2xs);
  min-width: 0;
  min-height: 2rem;
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

.mcsl-transfer__option:hover:not(.mcsl-transfer__option--disabled) {
  background: color-mix(in srgb, var(--mcsl-color-primary) 8%, var(--mcsl-bg-color-overlay));
  color: var(--mcsl-text-color-primary);
}

.mcsl-transfer__option--disabled {
  cursor: not-allowed;
  opacity: 0.5;
  pointer-events: none;
}

.mcsl-transfer__option span {
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.mcsl-transfer__actions {
  display: grid;
  align-content: center;
  gap: var(--mcsl-spacing-xs);
}

.mcsl-transfer__empty {
  margin: 0;
  padding: var(--mcsl-spacing-md);
  color: var(--mcsl-text-color-secondary);
  font-size: var(--mcsl-font-size-sm);
  text-align: center;
}

.mcsl-transfer--disabled {
  opacity: 0.78;
}

@media (max-width: 720px) {
  .mcsl-transfer {
    grid-template-columns: 1fr;
  }

  .mcsl-transfer__actions {
    grid-template-columns: repeat(2, auto);
    justify-content: center;
  }

  .mcsl-transfer__actions :deep(.fa-angle-right) {
    transform: rotate(90deg);
  }

  .mcsl-transfer__actions :deep(.fa-angle-left) {
    transform: rotate(90deg);
  }
}
</style>
