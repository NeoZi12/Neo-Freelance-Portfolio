import nextPlugin from "@next/eslint-plugin-next";
import reactHooks from "eslint-plugin-react-hooks";
import tsParser from "@typescript-eslint/parser";
import tsPlugin from "@typescript-eslint/eslint-plugin";

/**
 * ESLint flat config — composed directly from the underlying plugins.
 *
 * We deliberately do NOT go through `eslint-config-next` / `FlatCompat`.
 * `eslint-config-next@15.5.x` only ships the legacy `.eslintrc` format, whose
 * `index.js` does `require('@rushstack/eslint-patch/modern-module-resolution')`.
 * That patch identifies its "calling module" by walking the Node require stack,
 * which breaks under ESLint 9 flat config + pnpm's symlinked node_modules
 * ("Failed to patch ESLint because the calling module was not recognized"),
 * failing the lint gate on every file. `@next/eslint-plugin-next` ships a native
 * flat config (`flatConfig.coreWebVitals`) that keeps the patch out of the path.
 * See: https://nextjs.org/docs/app/api-reference/config/eslint
 */
const eslintConfig = [
  {
    ignores: [
      ".next/**",
      ".next-prod-check/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
      ".claude/**",
    ],
  },

  // TypeScript / TSX: parser + typescript-eslint recommended rules.
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      parser: tsParser,
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
    plugins: { "@typescript-eslint": tsPlugin },
    rules: {
      ...tsPlugin.configs.recommended.rules,
    },
  },

  // Next.js Core Web Vitals (native flat) + React Hooks, across all source.
  nextPlugin.flatConfig.coreWebVitals,
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    plugins: { "react-hooks": reactHooks },
    rules: {
      ...reactHooks.configs.recommended.rules,
    },
  },

  // ──────────────────────────────────────────────────────────────────────────
  // Quality-gate hard rules. See CLAUDE.md → "Stack-specific hard rules".
  // ──────────────────────────────────────────────────────────────────────────
  {
    files: [
      "app/**/*.{ts,tsx}",
      "sections/**/*.{ts,tsx}",
      "components/**/*.{ts,tsx}",
      "lib/**/*.{ts,tsx}",
      "contexts/**/*.{ts,tsx}",
      "hooks/**/*.{ts,tsx}",
    ],
    rules: {
      // Tailwind v4 only — no CSS-in-JS or CSS Modules. Documented in CLAUDE.md.
      "no-restricted-imports": ["error", {
        paths: [
          { name: "@emotion/react", message: "Tailwind only — no CSS-in-JS. Use Tailwind classes + tokens in app/globals.css." },
          { name: "@emotion/styled", message: "Tailwind only — no CSS-in-JS. Use Tailwind classes + tokens in app/globals.css." },
          { name: "styled-components", message: "Tailwind only — no CSS-in-JS. Use Tailwind classes + tokens in app/globals.css." },
        ],
        patterns: [
          { group: ["*.module.css", "*.module.scss"], message: "Tailwind only — no CSS Modules. Use Tailwind classes + tokens in app/globals.css." },
        ],
      }],
    },
  },

  // <Image priority> is allowed only on per-route LCP images:
  //   - sections/HeroSection.tsx          → orange-ringed avatar (homepage LCP)
  //   - app/free-guide/page.tsx           → eBook cover at top of /free-guide hero (route LCP)
  // Anywhere else, `priority` wastes preload budget and hurts LCP.
  {
    files: [
      "app/**/*.{ts,tsx}",
      "sections/**/*.{ts,tsx}",
      "components/**/*.{ts,tsx}",
    ],
    ignores: ["sections/HeroSection.tsx", "app/free-guide/page.tsx"],
    rules: {
      "no-restricted-syntax": [
        "error",
        {
          selector:
            "JSXOpeningElement[name.name='Image'] > JSXAttribute[name.name='priority']",
          message:
            "<Image priority> is allowed only on per-route LCP images (sections/HeroSection.tsx, app/free-guide/page.tsx). Below-fold priority wastes preload budget and hurts LCP.",
        },
      ],
    },
  },
];

export default eslintConfig;
