module.exports = {
  extends: [
    'standard',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'prettier/@typescript-eslint',
    'prettier/standard'
  ],
  plugins: ['import', 'prettier', 'standard'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  },
  settings: {
    react: {
      version: 'detect'
    }
  },
  env: {
    node: true,
    es6: true,
    jest: true
  },
  rules: {
    'space-before-function-paren': 0,
    'new-cap': 0,
    'prettier/prettier': 2
  }
}
