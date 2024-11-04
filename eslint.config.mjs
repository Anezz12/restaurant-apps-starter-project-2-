import globals from 'globals';
import pluginJs from '@eslint/js';
import daStyle from 'eslint-config-dicodingacademy';

export default [
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        module: true,
        require: true,
        __dirname: true,
        __filename: true,
      },
      sourceType: 'module',
    },
  },
  pluginJs.configs.recommended,
  daStyle,
  {
    env: {
      jest: true,
    },
    rules: {
      'space-infix-ops': ['error'],
      'brace-style': ['error', '1tbs'],
      'space-before-blocks': ['error', 'always'],
      'linebreak-style': 0,
    },
  },
];
