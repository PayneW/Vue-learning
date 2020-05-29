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

      /** 添加配置: 0表示不处理，1表示警告，2表示错误并退出*/
      // 缩进风格
      indent: ["error", 4],
      // 箭头函数用小括号括起来
      'arrow-parens': 0,
      // 箭头前/后 括号
      'arrow-spacing': 0,
      // 引号类型: single / double
      'quotes': [0, 'single'],
      // 生成器函数 * 的前后空格
      'generator-star-spacing': 0,
      // 语句强制分号结尾 (分号 semicolon)
      'semi': [0, 'always'],
      // 文件末尾强制换行
      'eol-last': 0,
      // 函数括号前面要不要有空格
      // parentheses /pə'rɛnθəsɪz/** n.括号，圆括号
      'space-before-function-paren': 0

  },
  parserOptions: {
    parser: 'babel-eslint'
  }
};
