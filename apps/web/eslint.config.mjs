import js from '@eslint/js'
import globals from 'globals'
import tseslint from '@typescript-eslint/eslint-plugin'
import tsParser from '@typescript-eslint/parser'
import nextPlugin from '@next/eslint-plugin-next'
import jsxA11y from 'eslint-plugin-jsx-a11y'
import tailwind from 'eslint-plugin-tailwindcss'
import boundaries from 'eslint-plugin-boundaries'

export default [
  js.configs.recommended,
  {
    // next-env.d.ts is Next.js-generated boilerplate that always uses a
    // triple-slash reference — Next's own eslint config excludes it too.
    ignores: ['.next/**', 'node_modules/**', 'drizzle/**', 'next-env.d.ts'],
  },
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
      // Route handlers/config run on Node; components run in the browser.
      // One shared config for the whole app, so both globals are declared.
      globals: { ...globals.browser, ...globals.node, ...globals.es2022 },
    },
    plugins: {
      '@typescript-eslint': tseslint,
      '@next/next': nextPlugin,
      'jsx-a11y': jsxA11y,
      tailwindcss: tailwind,
      boundaries,
    },
    settings: {
      tailwindcss: {
        callees: ['cn', 'cva'],
      },
      'boundaries/elements': [
        { type: 'app', pattern: 'src/app/**' },
        { type: 'sections', pattern: 'src/sections/**' },
        { type: 'scenes', pattern: 'src/scenes/**' },
        { type: 'components', pattern: 'src/components/**' },
        { type: 'lib', pattern: 'src/lib/**' },
      ],
    },
    rules: {
      ...tseslint.configs.recommended.rules,
      ...nextPlugin.configs.recommended.rules,
      ...jsxA11y.configs.recommended.rules,

      // design-system.md: tokens are the only source of values.
      'tailwindcss/no-arbitrary-value': 'error',
      'tailwindcss/no-custom-classname': 'off',

      // repo-structure.md §3: dependencies point one direction —
      // app -> sections -> components -> lib. lib never imports JSX-bearing code.
      'boundaries/element-types': [
        'error',
        {
          default: 'disallow',
          rules: [
            { from: 'app', allow: ['app', 'sections', 'scenes', 'components', 'lib'] },
            { from: 'sections', allow: ['sections', 'scenes', 'components', 'lib'] },
            { from: 'scenes', allow: ['scenes', 'components', 'lib'] },
            { from: 'components', allow: ['components', 'lib'] },
            { from: 'lib', allow: ['lib'] },
          ],
        },
      ],

      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    },
  },
]
