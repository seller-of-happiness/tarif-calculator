module.exports = {
  root: true,
  env: {
    es6: true,
    node: true,
  },
  parserOptions: {
    parser: '@babel/eslint-parser',
    requireConfigFile: false,
  },
  extends: [
    'prettier',
    'plugin:prettier/recommended',
    'plugin:nuxt/recommended',
  ],
  plugins: ['prettier'],
  // add your custom rules here
  rules: {
    quotes: [2, 'single', { avoidEscape: true }],
    'prettier/prettier': ['warn', { singleQuote: true }],
    'vue/require-prop-types': 0,
  },
}
