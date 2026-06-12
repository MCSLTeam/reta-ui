import { defineStore } from "pinia";
import {
  useLocalStorage,
  useMediaQuery,
  usePreferredColorScheme,
  usePreferredLanguages,
} from "@vueuse/core";
import { computed, ref, watch } from "vue";
import { type Composer } from "vue-i18n";

export type Theme = "system" | "light" | "dark";
export type ThemeTransition = "viewTransition" | "fade" | "none";
export type Rendering = "advanced" | "basic" | "fast";

export const useAppearance = defineStore("appearance", () => {
  const themeStorage = useLocalStorage<Theme>("theme", "system");
  const renderingStorage = useLocalStorage<Rendering>(
    "rendering",
    useMediaQuery("(prefers-reduced-motion: reduce)").value
      ? "basic"
      : "advanced",
  );
  const actualTheme = computed(() => getActualTheme(themeStorage.value));

  function getActualTheme(theme: Theme) {
    if (theme === "system")
      return usePreferredColorScheme().value == "dark" ? "dark" : "light";
    else return theme;
  }

  let prevActualTheme = "none";
  function changeTheme(theme: Theme, transition?: ThemeTransition): void {
    themeStorage.value = theme;
    const currActualTheme = getActualTheme(theme);
    if (currActualTheme == prevActualTheme) return;

    const set = () => {
      document.documentElement.classList.remove(prevActualTheme);
      document.documentElement.classList.add(currActualTheme);
      prevActualTheme = currActualTheme;
      document.dispatchEvent(new Event("theme:change"));
    };

    const style = document.createElement("style");
    document.head.appendChild(style);

    if (!transition)
      switch (renderingStorage.value) {
        case "advanced":
          transition = "viewTransition";
          break;
        case "basic":
          transition = "fade";
          break;
        case "fast":
          transition = "none";
          break;
      }

    switch (transition) {
      case "none":
        style.innerHTML = `
          * {
              transition: none !important;
          }
          `;
        set();
        break;
      case "fade":
        style.innerHTML = `
          * {
              transition-property: background-color, border-color, color, fill, stroke, box-shadow, outline-color, opacity !important;
              transition-duration: var(--mcsl-motion-duration-slower) !important;
              transition-timing-function: var(--mcsl-motion-ease-standard) !important;
          }
          `;
        set();
        break;
      case "viewTransition":
        if (!document.startViewTransition) {
          changeTheme(theme, "fade");
          return;
        }
        (() => {
          style.innerHTML = `
          * {
              transition: none !important;
          }
          `;

          const viewTransition = document.startViewTransition(set);

          const mouseX = useMousePosition().x;
          const mouseY = useMousePosition().y;

          const endRadius = Math.hypot(
            Math.max(mouseX, innerWidth - mouseX),
            Math.max(mouseY, innerHeight - mouseY),
          );
          viewTransition.ready.then(() => {
            const easing =
              getComputedStyle(document.documentElement)
                .getPropertyValue("--mcsl-motion-ease-standard")
                .trim() || "cubic-bezier(0.2, 0, 0, 1)";
            const clipPath = [
              `circle(0px at ${mouseX}px ${mouseY}px)`,
              `circle(${endRadius}px at ${mouseX}px ${mouseY}px)`,
            ];
            document.documentElement.animate(
              {
                clipPath:
                  currActualTheme == "dark"
                    ? clipPath
                    : [...clipPath].reverse(),
              },
              {
                duration: 360,
                easing,
                pseudoElement:
                  currActualTheme == "dark"
                    ? "::view-transition-new(root)"
                    : "::view-transition-old(root)",
              },
            );
          });
        })();
        break;
    }

    setTimeout(() => style.remove(), 360);
  }

  function load() {
    const currentTheme = getActualTheme(themeStorage.value);
    if (!document.documentElement.classList.contains(currentTheme)) {
      changeTheme(themeStorage.value, "none");
    } else {
      prevActualTheme = currentTheme;
    }
    setRendering(renderingStorage.value);
  }

  watch(usePreferredColorScheme(), () => {
    changeTheme(themeStorage.value, "fade");
  });

  let prevRendering = "none";
  function setRendering(rendering: Rendering) {
    renderingStorage.value = rendering;
    if (rendering == prevRendering) return;
    document.documentElement.classList.remove(`rendering-${prevRendering}`);
    document.documentElement.classList.add(`rendering-${rendering}`);
    prevRendering = rendering;
  }

  return {
    load,
    changeTheme,
    setRendering,
    actualTheme,
    rendering: computed(() => renderingStorage.value),
    theme: computed(() => themeStorage.value),
  };
});

export const LOCALES = [
  "en-US",
  "zh-CN",
] as const;

export type Locale = (typeof LOCALES)[number] | "system";

export const useLocale = defineStore("locale", () => {
  const locale = useLocalStorage<Locale>("locale", "system");
  let i18n: Composer | undefined = undefined;

  function injectI18n(composer: Composer) {
    i18n = composer;
  }

  function getI18n() {
    return i18n!;
  }

  function getLocale(locale: Locale) {
    return locale == "system"
      ? ((usePreferredLanguages().value[0] as Locale) ?? "en-US")
      : locale;
  }

  function setLocale(l: Locale) {
    locale.value = l;
    getI18n().locale.value = getLocale(l);
  }

  return {
    locale,
    injectI18n,
    getI18n,
    getLocale,
    setLocale,
  };
});

export type ScreenWidth = "lg" | "md" | "sm";

export const useScreenWidth = defineStore("screenWidth", () => {
  const isXs = useMediaQuery("(max-width: 450px)");
  const isSm = useMediaQuery("(max-width: 768px)");
  const isMd = useMediaQuery("(max-width: 1024px)");

  const width = computed(() => {
    if (isXs.value) return "xs";
    if (isSm.value) return "sm";
    if (isMd.value) return "md";
    return "lg";
  });

  return {
    width,
    isXsOrSm: computed(() => isXs.value || isSm.value),
  };
});

export const useMousePosition = defineStore("mousePosition", () => {
  const mousePosition = ref({ x: 0, y: 0 });

  function onMouseMove(e: MouseEvent) {
    mousePosition.value.x = e.clientX;
    mousePosition.value.y = e.clientY;
  }

  function onMouseOut() {
    mousePosition.value.x = -999;
    mousePosition.value.y = -999;
  }

  return {
    onMouseMove,
    onMouseOut,
    x: computed(() => mousePosition.value.x),
    y: computed(() => mousePosition.value.y),
  };
});
