import { FlatCompat } from "@eslint/eslintrc";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const compat = new FlatCompat({ baseDirectory: __dirname });

const eslintConfig = [
  // Next.js's recommended rule sets for v15. FlatCompat shims the legacy
  // `.eslintrc` format that `eslint-config-next` 15 still ships under the
  // hood so it works with flat config.
  ...compat.extends("next/core-web-vitals", "next/typescript"),

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

  {
    ignores: [
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
      ".claude/**",
    ],
  },
];

export default eslintConfig;
