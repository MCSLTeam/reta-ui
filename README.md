# Reta UI

Reta UI is the standalone workspace for the Reta component library and its gallery.

## Packages

- `packages/ui`: Vue component library.
- `apps/gallery`: component gallery and documentation site.
- `packages/configs`: shared TypeScript, ESLint, and Prettier configuration.
- `packages/locales`: locale resources used by the component store utilities.

## Commands

```bash
pnpm install
pnpm dev
pnpm build
pnpm test
```

The gallery is intentionally self-contained and no longer imports the Web app shared Rsbuild configuration.
