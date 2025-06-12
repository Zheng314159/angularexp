import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import json from '@eslint/json';
import markdown from '@eslint/markdown';
import css from '@eslint/css';
import { defineConfig } from 'eslint/config';
import angularEslint from '@angular-eslint/eslint-plugin';
import angularEslintTemplate from '@angular-eslint/eslint-plugin-template';
import angularEslintParser from '@angular-eslint/template-parser';

// 让 tseslint.configs.recommended 只作用于 TS 文件
const tsEslintRecommended = tseslint.configs.recommended.map((cfg) => ({
  ...cfg,
  files: ['**/*.ts'],
}));

export default defineConfig([
  { files: ['**/*.{js,mjs,cjs,ts,mts,cts}'], plugins: { js }, extends: ['js/recommended'] },
  {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts}'],
    languageOptions: { globals: { ...globals.browser, ...globals.node } },
  },
  ...tsEslintRecommended,
  { files: ['**/*.json'], plugins: { json }, language: 'json/json', extends: ['json/recommended'] },
  {
    files: ['**/*.jsonc'],
    plugins: { json },
    language: 'json/jsonc',
    extends: ['json/recommended'],
  },
  {
    files: ['**/*.json5'],
    plugins: { json },
    language: 'json/json5',
    extends: ['json/recommended'],
  },
  {
    files: ['**/*.md'],
    plugins: { markdown },
    language: 'markdown/gfm',
    extends: ['markdown/recommended'],
  },
  { files: ['**/*.css'], plugins: { css }, language: 'css/css', extends: ['css/recommended'] },
  // Angular ESLint for TS files (flat config 兼容写法，兼容 v20)
  {
    files: ['**/*.ts'],
    plugins: { '@angular-eslint': angularEslint },
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.app.json'],
        sourceType: 'module',
      },
    },
    rules: {
      // 仅保留 Angular 20 版本官方推荐规则
      '@angular-eslint/directive-selector': [
        'error',
        { type: 'attribute', prefix: 'app', style: 'camelCase' },
      ],
      '@angular-eslint/component-selector': [
        'error',
        { type: 'element', prefix: 'app', style: 'kebab-case' },
      ],
      // 你可以根据需要添加更多实际存在的规则
    },
  },
  // Angular ESLint for HTML templates (flat config 兼容写法)
  {
    files: ['**/*.html'],
    plugins: { '@angular-eslint/template': angularEslintTemplate },
    languageOptions: { parser: angularEslintParser },
    rules: {
      '@angular-eslint/template/no-negated-async': 'error',
      '@angular-eslint/template/banana-in-box': 'error',
      '@angular-eslint/template/no-call-expression': 'off',
      '@angular-eslint/template/no-distracting-elements': 'error',
      '@angular-eslint/template/no-any': 'error',
      '@angular-eslint/template/eqeqeq': 'error',
      '@angular-eslint/template/no-autofocus': 'error',
      '@angular-eslint/template/no-positive-tabindex': 'error',
      '@angular-eslint/template/conditional-complexity': 'error',
      '@angular-eslint/template/cyclomatic-complexity': 'error',
      '@angular-eslint/template/no-interpolation-in-attributes': 'error',
      // '@angular-eslint/template/i18n': 'warn',
    },
  },
  // 针对测试文件，指定 tsconfig.spec.json
  {
    files: ['**/*.spec.ts'],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.spec.json'],
        sourceType: 'module',
      },
    },
  },
  {
    files: ['vite.config.ts'],
    languageOptions: {
      parserOptions: {
        project: undefined,
        tsconfigRootDir: undefined,
      },
    },
    rules: {},
  },
]);
