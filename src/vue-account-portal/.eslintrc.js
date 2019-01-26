module.exports = {
  root: true,
  parserOptions: {
    sourceType: 'module',
    parser: 'babel-eslint'
  },
  env: {
    browser: true,
    es6: true
  },
  extends: ['plugin:vue/essential', 'plugin:prettier/recommended'],
  rules: {
    // this rule runs prettier when executing the esling command
    'prettier/prettier': 'error'
  }
}