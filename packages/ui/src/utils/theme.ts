import { computed, onMounted, onUnmounted, ref } from "vue";

const THEME_VAR_NAMES = [
  "font-family-sans",
  "font-family-mono",
  "font-size-sm",
  "font-size-md",
  "font-size-lg",
  "font-weight-base",
  "font-weight-bold",
  "border-radius-sm",
  "border-radius-md",
  "border-radius-lg",
  "motion-ease-standard",
  "motion-ease-enter",
  "motion-ease-exit",
  "bg-color-main",
  "bg-color-overlay",
  "bg-color-dark",
  "border-color-base",
  "border-color-dark",
  "text-color-primary",
  "text-color-regular",
  "text-color-secondary",
  "color-primary",
  "color-primary-light",
  "color-primary-dark",
  "color-success",
  "color-warning",
  "color-danger",
  "color-help",
] as const;

export type ThemeVarName = (typeof THEME_VAR_NAMES)[number];
export type ThemeVars = Record<ThemeVarName, string>;

function readThemeVars(): ThemeVars {
  if (typeof window === "undefined") {
    return Object.fromEntries(THEME_VAR_NAMES.map((name) => [name, ""])) as ThemeVars;
  }

  const styles = window.getComputedStyle(document.documentElement);
  return Object.fromEntries(
    THEME_VAR_NAMES.map((name) => [
      name,
      styles.getPropertyValue(`--mcsl-${name}`).trim(),
    ]),
  ) as ThemeVars;
}

export function useThemeVars() {
  const version = ref(0);

  function update() {
    version.value += 1;
  }

  onMounted(() => {
    document.addEventListener("theme:change", update);
    window.addEventListener("resize", update);
  });

  onUnmounted(() => {
    document.removeEventListener("theme:change", update);
    window.removeEventListener("resize", update);
  });

  return computed(() => {
    version.value;
    return readThemeVars();
  });
}
