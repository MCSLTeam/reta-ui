import { createApp } from "vue";
import { createPinia } from "pinia";
import { createI18n } from "vue-i18n";
import FloatingVue from "floating-vue";
import App from "./App.vue";
import router from "./router";
import { loadUi, useLocale } from "reta-ui";
import { createGalleryI18nOptions } from "./galleryI18n";

(async () => {
  const app = createApp(App);
  const pinia = createPinia();
  app.use(pinia);

  const localeStore = useLocale();
  const i18n = createI18n(createGalleryI18nOptions(localeStore.getLocale(localeStore.locale)));
  app.use(i18n);
  localeStore.injectI18n(i18n.global as any);

  app.use(FloatingVue, {
    themes: {
      tooltip: {
        hideTriggers: (events: string[]) => events,
        overflowPadding: 1,
      },
    },
  });
  app.use(router);
  await loadUi();
  app.mount("#app");
})();
