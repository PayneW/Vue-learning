module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',

    // 规则: error/warning 给出错误提是的方式
    // 0表示不不处理，1表示警告，2表示错误并退出
    // eslint 配置
    'indent': 'off',

    // 引号类型 `` "" ''
    "quotes": [0, "double"],

    // 0表示不不处理，1表示警告，2表示错误并退出
    // 语句强制分号结尾 (分号 semicolon)
    "semi": [0, "always"],
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
