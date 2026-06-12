import { defineConfig } from "@rsbuild/core";
import { pluginSass } from "@rsbuild/plugin-sass";
import { pluginVue } from "@rsbuild/plugin-vue";
import { pluginSvg } from "rsbuild-plugin-svg";

export default defineConfig({
  plugins: [
    pluginVue(),
    pluginSass(),
    pluginSvg({
      svgoConfig: {
        plugins: [
          {
            name: "preset-default",
            params: {
              overrides: {
                removeViewBox: false,
              },
            },
          },
        ],
      },
    }),
  ],
  html: {
    title: "Reta UI Gallery",
    mountId: "app",
    meta: {
      viewport: "width=device-width, initial-scale=1, viewport-fit=cover",
    },
    tags: [
      {
        tag: "style",
        head: true,
        append: false,
        children:
          "html,body,#app{width:100%;height:100%;margin:0;background:#f8fafc;color-scheme:light;}html.dark,html.dark body,html.dark #app{background:#09090b;color-scheme:dark;}html.light,html.light body,html.light #app{background:#f8fafc;color-scheme:light;}",
      },
      {
        tag: "script",
        head: true,
        append: false,
        children:
          "(()=>{try{const t=localStorage.getItem('theme')||'system';const d=window.matchMedia('(prefers-color-scheme: dark)').matches;const isDark=t==='dark'||t==='\"dark\"'||((t==='system'||t==='\"system\"')&&d);const c=isDark?'dark':'light';document.documentElement.classList.remove(isDark?'light':'dark');document.documentElement.classList.add(c);document.documentElement.style.colorScheme=c;}catch(e){}})();",
      },
    ],
  },
  source: {
    define: {
      "import.meta.env.APP_VERSION_NAME": JSON.stringify("Reta UI"),
      "import.meta.env.APP_VERSION": JSON.stringify("0.1.0"),
      "import.meta.env.APP_VERSION_APP": JSON.stringify("ui"),
      "import.meta.env.APP_VERSION_WEB": JSON.stringify("gallery"),
      "import.meta.env.IS_ACTION_BUILD": JSON.stringify(
        process.env.IS_ACTION_BUILD === "true",
      ),
      "import.meta.env.BUILD_TIME": JSON.stringify(new Date().toISOString()),
      "import.meta.env.COMMIT_HASH": JSON.stringify(
        process.env.COMMIT_HASH ?? "",
      ),
      "import.meta.env.COMMIT_BRANCH": JSON.stringify(
        process.env.COMMIT_BRANCH ?? "",
      ),
    },
    entry: {
      index: "./src/index.ts",
    },
  },
});
