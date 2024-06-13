module.exports = {
  root: true,
  settings: { react: { version: 'detect' } },
  env: { browser: true, es2023: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'plugin:react/recommended',
    'plugin:prettier/recommended',
    "prettier"
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh', 'unicorn', 'import', 'unused-imports'],
  rules: {
    'no-console': ['warn', { allow: ['warn', 'error','info'] }],
    'padding-line-between-statements': [
      'error',
      { blankLine: 'always', prev: '*', next: 'return' },
      { blankLine: 'always', prev: '*', next: 'block-like' },
      { blankLine: 'always', prev: 'block-like', next: '*' },
      { blankLine: 'always', prev: '*', next: 'block-like' },
      { blankLine: 'always', prev: 'block-like', next: '*' },
      { blankLine: 'always', prev: 'block-like', next: 'block-like' },
      { blankLine: 'always', prev: 'import', next: '*' },
      { blankLine: 'always', prev: '*', next: 'import' },
      { blankLine: 'any', prev: 'import', next: 'import' },
    ],
    'unused-imports/no-unused-imports': 'error',
    'import/prefer-default-export': 'error',
    'import/no-unused-modules': 'error',
    'react/react-in-jsx-scope': 'off',
    'react/jsx-uses-react': 'off',
    'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    'import/no-relative-parent-imports': 'error',
    'no-restricted-syntax': [
      'error',
      {
        selector: "ImportDeclaration[source.value='react'] ImportSpecifier[imported.name='useCallback']",
        message: "Please use `import { useStableCallback } from 'src/utils/hooks/useStableCallback.ts'` instead.",
      },
    ],
    'react/jsx-curly-brace-presence': ['error', { props: 'never', children: 'never' }],
    '@typescript-eslint/naming-convention': ['warn', { selector: 'typeAlias', format: ['PascalCase'], prefix: ['T'] }],
    'unicorn/filename-case': 'off',
    'unicorn/prevent-abbreviations': 'off',
    'unicorn/prefer-top-level-await': 'off',
    'unicorn/no-process-exit': 'off',
    'unicorn/prefer-module': 'off',
    'unicorn/no-await-expression-member': 'off',
    'unicorn/no-null': 'off',
    'unicorn/prefer-spread': 'off', // triggers for tensorflow .concat()
    'unicorn/no-useless-undefined': 'off', // triggers for _.without(..., undefined)
  },
};
