import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';

export default [
  {
    files: ['**/*.{ts,tsx,js,jsx}'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
    },
    plugins: {
      react,
      'react-hooks': reactHooks,
    },
    rules: {
      'react/react-internal': 'off',
      'react-hooks/exhaustive-deps': 'warn',
      'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
      'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
    },
  },
  {
    files: ['**/node_modules/**'],
    rules: { 'no-unused-vars': 'off' },
  },
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parserOptions: {
        sourceType: 'module',
        ecmaFeatures: { jsx: true },
      },
      plugins: {
        react,
        'react-hooks': reactHooks,
      },
      rules: {
        ...react.configs.recommended.rules,
        ...reactHooks.configs.recommended.rules,
        'react/react-hooks': 'error',
        'react-hooks/exhaustive-deps': 'warn',
      },
    },
  },
];