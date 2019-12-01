## Vue-cli 构建项目后目录解析

```bash
    1. build 和 config 都是 webpack 配置文件
    2. src 存放项目源文件的目录
    3. static 存放第三方静态资源，这个里面的 .gitkeep 是当前文件夹为空时，也需要上传到服务器
```

- build                            // 项目构建(webpack)相关代码
    + build.js                     // 生产环境构建代码
    + check-version.js             // 检查node、npm等版本
    + dev-client.js                // 热重载相关
    + dev-server01.js                // 构建本地服务器
    + utils.js                     // 构建工具相关
    + webpack.base.conf.js         // webpack基础配置
    + webpack.dev.conf.js          // webpack开发环境配置
    + webpack.prod.conf.js         // webpack生产环境配置

- config                           // 项目开发环境配置
    + dev.env.js                   // 开发环境变量
    + index.js                     // 项目一些配置变量
    + prod.env.js                  // 生产环境变量
    + test.env.js                  // 测试环境变量

- src                              // 源码目录
    + assets                       // 资源目录
    + components                   // vue公共组件
    + store                        // vuex的状态管理
    + App.vue                      // 页面入口文件
    + main.js                      // 程序入口文件，加载各种公共组件

- static                           // 静态文件，比如一些图片，json数据等
    + data                         // 群聊分析得到的数据用于数据可视化

- .babelrc                         // babel的配置项 ES6语法编译配置
- .editorconfig                    // 编辑器的配置项
- .gitignore                       // 存放的是会忽略语法检查的目录
    + .postcssrc.js                // 通过JS插件装换样式的工具
- README-易错代码总结.md                        // 项目说明
- favicon.ico
- index.html                       // 入口页面
- package.json                     // 项目的描述和依赖


