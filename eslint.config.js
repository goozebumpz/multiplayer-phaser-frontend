import globals from 'globals'
import eslint from '@eslint/js'
import tsEslint from 'typescript-eslint'
import eslintPrettierConfig from 'eslint-config-prettier'
import stylisticEslint from '@stylistic/eslint-plugin'

export default tsEslint.config(
    ...tsEslint.configs.strict,
    ...tsEslint.configs.stylistic,
    {
      ...eslint.configs.recommended,
      languageOptions: {
        ecmaVersion: 2022,
        sourceType: 'module',
        globals: {
          ...globals.browser,
          ...globals.node,
          myCustomGlobal: 'readonly',
        },
      },
      extends: [
        stylisticEslint.configs['recommended-flat'],
        eslintPrettierConfig,
      ],
    },
)