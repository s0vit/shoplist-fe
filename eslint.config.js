import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import react from 'eslint-plugin-react';
import hooksPlugin from 'eslint-plugin-react-hooks';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import esllintConfigPrettier from 'eslint-config-prettier';
import eslintPluginUnicorn from 'eslint-plugin-unicorn';
import stylisticJs from '@stylistic/eslint-plugin-js';
import { fixupPluginRules } from '@eslint/compat';
import i18next from 'eslint-plugin-i18next';

export default [
  pluginJs.configs.recommended,
  eslintPluginPrettierRecommended,
  esllintConfigPrettier,
  ...tseslint.configs.recommended,
  { files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'] },
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.es2023,
        ...globals.node,
        ...globals.jest,
        ...globals.react,
      },
      parserOptions: {
        ecmaVersion: 2023,
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
  },
  { ignores: ['dist', '.eslintrc.cjs', 'public', 'playwright-report', 'node_modules', 'scripts'] },

  {
    plugins: {
      unicorn: eslintPluginUnicorn,
      react: react,
      'react-hooks': fixupPluginRules(hooksPlugin),
      stylisticJs: stylisticJs,
      i18next: i18next,
    },
    rules: {
      ...hooksPlugin.configs.recommended.rules,
      ...tseslint.configs.recommended.rules,
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          vars: 'all',
          varsIgnorePattern: '^_',
          args: 'all',
          argsIgnorePattern: '^_',
          caughtErrors: 'all',
        },
      ],
      'no-console': ['warn', { allow: ['warn', 'error', 'info'] }],
      'react/react-in-jsx-scope': 'off',
      'react/jsx-uses-react': 'off',
      'no-restricted-syntax': [
        'error',
        {
          selector: "ImportDeclaration[source.value='react'] ImportSpecifier[imported.name='useCallback']",
          message: "Please use `import { useStableCallback } from 'src/utils/hooks/useStableCallback.ts'` instead.",
        },
      ],
      '@typescript-eslint/naming-convention': [
        'warn',
        { selector: 'typeAlias', format: ['PascalCase'], prefix: ['T'] },
        { selector: 'typeAlias', format: ['PascalCase', 'camelCase'], filter: { regex: '^T', match: false } },
      ],
      'react/jsx-curly-brace-presence': ['error', { props: 'never', children: 'never' }],
      'unicorn/filename-case': 'off',
      'unicorn/prevent-abbreviations': 'off',
      'unicorn/prefer-top-level-await': 'off',
      'unicorn/no-process-exit': 'off',
      'unicorn/prefer-module': 'off',
      'unicorn/no-await-expression-member': 'off',
      'unicorn/no-null': 'off',
      'unicorn/prefer-spread': 'off',
      'stylisticJs/template-curly-spacing': 'error',
      'stylisticJs/padding-line-between-statements': [
        'error',
        { blankLine: 'always', prev: '*', next: 'return' },
        { blankLine: 'always', prev: 'block-like', next: '*' },
        { blankLine: 'always', prev: 'import', next: '*' },
        { blankLine: 'always', prev: '*', next: 'import' },
        { blankLine: 'any', prev: 'import', next: 'import' },
      ],
      'i18next/no-literal-string': 1,
    },
  },
  {
    files: ['**/*.stories.tsx'],
    rules: {
      'i18next/no-literal-string': 'off',
    },
  },
];
