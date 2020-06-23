# Vue CLI


- [Vue CLI 3 官网文档](https://cli.vuejs.org/zh/guide/)


## Catalog
1. 安装
2. 基础
    + 2.1 快速原型开发
    + 2.2 创建一个项目
        - 2.2.1 vue create
        - 2.2.2 使用图形化界面
        - 2.2.3 拉取 2.x 模板(旧版本)
    + 2.3 插件和 Preset
        - 2.3.1 插件
            + 2.3.1.1 在现有的项目中安装插件
            + 2.3.1.2 项目本地的插件   
        - 2.3.2 Preset
            + 2.3.2.1 Preset 插件的版本你管理
            + 2.3.2.2 允许插件的命令提示 
            + 2.3.2.2 远程 Preset
            + 2.3.2.3 加载文件系统中的 Preset
    + 2.4 CLI 服务
        - 2.4.1 使用命令
        - 2.4.2 vue-cli-service serve
        - 2.4.3 vue-cli-service build
        - 2.4.4 vue-cli-service inspect
        - 2.4.5 查看所有的可用命令
        - 2.4.6 缓存和并行处理 
        - 2.4.7 Git Hook
        - 2.4.8 配置是无需 Eject
3. 开发
    + 3.1 浏览器兼容性
        - 3.1.1 browserslist
        - 3.1.2 Polyfill
            + 3.1.2.1 useBuiltIns: 'usage'
            + 3.1.2.2 构建库或是 Web
            + 3.1.2.3 Component 时的 Polyfills
        - 3.1.3 现代模式
    + 3.2 HTML 和静态资源
        - 3.2.1 HTML
            + 3.2.1.1 Index 文件
            + 3.2.1.2 插值
            + 3.2.1.3 Preload
            + 3.2.1.4 Prefetch
            + 3.2.1.5 不生成 index 
            + 3.2.1.6 构建一个多页应用
        - 3.2.2 处理静态资源
            + 3.2.2.1 从相对路径导入
            + 3.2.2.2 URL 转换规则
            + 3.2.2.3 public 文件夹
            + 3.2.2.4 何时使用 public 文件夹
    + 3.3 CSS 相关
        - 3.3.1 引用静态资源 
        - 3.3.2 预处理器
            + 3.3.2.1 自动化导入
        - 3.3.3 PostCSS
        - 3.3.4 CSS Modules
        - 3.3.5 向预处理器 Loader 传递选项
    + 3.4 webpack 相关
        - 3.4.1 简单的配置方式
        - 3.4.2 链式操作(高级)
            + 3.4.2.1 修改 Loader 选项
            + 3.4.2.2 添加一个新的 Loader
            + 3.4.2.3 替换一个规则里的 Loader
            + 3.4.2.4 修改插件选型
        - 3.4.3 审查项目的 webpack 配置
        - 3.4.4 以一个文件的方式使用解析好的配置
    + 3.5 环境变量和模式
        - 3.5.1 模式
        - 3.5.2 示例: Staging 模式
        - 3.5.3 在客户端侧代码中使用环境变量
        - 3.5.4 只在本地有效的变量
    + 3.6 构建目标
        - 3.6.1 应用
        - 3.6.2 库
            + 3.6.2.1 
        - 3.6.3 Web Components 组件
            + 3.6.3.1 注册多个 Web Components 组件的包
            + 3.6.3.1 异步 Web Components 组件
    + 3.7 部署
        - 3.7.1 本地预览
        - 3.7.2 使用 history.pushState 的路由
        - 3.7.3 CORS
        - 3.7.4 PWA
        - 3.7.5 平台指南
            + 3.7.5.1 Github Pages
            + 3.7.5.2 GitLab Pages
            + 3.7.5.3 Netlify
            + 3.7.5.4 Render
            + 3.7.5.5 Amazon S3
            + 3.7.5.6 Firebase
            + 3.7.5.7 ZEIT Now
            + 3.7.5.8 Stdlib
            + 3.7.5.9 Heroku
            + 3.7.5.10 Surge
            + 3.7.5.11 Bitbucket Cloud
            + 3.7.5.12 Docker(Nginx)




## New Words
- **serve [sɝv] --vt.服务; 招待; 供应. --vi.服役; 服务; 适合.**
    + serve(vt) a master. 服侍主任.
    + serve God. 侍奉上帝.
    + serve mankind. 为人类服务.
    + Can I serve you in any way? 我能为你效劳吗?
    + Robert serves(vi) in the army. 罗伯特在服兵役.
- **preset [priː'set] --vt.预置 --n.预调装置  --adj.预先调整的**






## Content
### 1. 安装
- 本节笔记见: `../../Vue-安装.md`

### 2. 基础
#### 2.1 快速原型开发
- 你可以使用 `vue serve` 和 `vue build` 命令对单个 `*.vue` 文件进行快速原型开发,
  不过这需要先额外安装一个全局的扩展:
  ```shell
    npm install -g @vue/cli-service-global
  ```
  `vue serve` 的缺点就是它需要安装全局依赖,
  这使得它在不同机器上的一致性不能得到保证. 因此这只适用于快速原型开发.
  
- **vue serve** (启动服务)
  ```text
    Usage: serve [options] [entry]
    
    在开发环境模式下零配置为 .js 或 .vue 文件启动一个服务器
    
    Options:
        -o, --open  打开浏览器
        -c, --copy  将本地 URL 复制到剪切板
        -h, --help  输出用法信息
  ```
  你所需要的仅仅是一个 `App.vue` 文件：
  ```vue
    <template>
        <h1>Hello!</h1>
    </template>
  ```
  然后在这个 `App.vue` 文件所在的目录下运行：
  ```shell
    vue serve
  ```
  `vue serve` 使用了和 `vue create` 创建的项目相同的默认设置
  (webpack、Babel、PostCSS 和 ESLint). 它会在当前目录自动推导入口文件——入口可以是
  `main.js`、`index.js`、`App.vue` 或 `app.vue` 中的一个. 你也可以显式地指定入口文件:
  ```shell
    vue serve MyComponent.vue
  ```
  如果需要，你还可以提供一个 `index.html`、`package.json`、安装并使用本地依赖、
  甚至通过相应的配置文件配置 Babel、PostCSS 和 ESLint. 
  
- **vue build** (编译)
  ```text
    Usage: build [options] [entry]
    
    在生产环境模式下零配置构建一个 .js 或 .vue 文件
    
    Options:
        -t, --target <target>  构建目标 (app | lib | wc | wc-async, 默认值：app)
        -n, --name <name>      库的名字或 Web Components 组件的名字 (默认值：入口文件名)
        -d, --dest <dir>       输出目录 (默认值：dist)
        -h, --help             输出用法信息
  ```
  你也可以使用 `vue build` 将目标文件构建成一个生产环境的包并用来部署:
  (提示: 在本地可以预览编译后的文件, 后面会讲到.)
  ```bash
    vue build MyComponent.vue
  ```
  `vue build` 也提供了将组件构建成为一个库或一个 Web Components 组件的能力.
  查阅[构建目标](https://cli.vuejs.org/zh/guide/build-targets.html)了解更多. 

#### 2.2 创建一个项目

##### 2.2.1 vue create

- 运行以下命令来创建一个新项目：
  ```bash
    vue create hello-world
  ```

  **警告**: 如果你在 Windows 上通过 minTTY 使用 Git Bash，交互提示符并不工作。
  你必须通过 `winpty vue.cmd create hello-world` 启动这个命令。不过，
  如果你仍想使用 `vue create hello-world`，则可以通过在 `~/.bashrc` 
  文件中添加以下行来为命令添加别名。 `alias vue='winpty vue.cmd'` 
  你需要重新启动 Git Bash 终端会话以使更新后的 bashrc 文件生效。

  你会被提示选取一个 preset。你可以选默认的包含了基本的 Babel + ESLint 设置的 preset,
  也可以选“手动选择特性”来选取需要的特性。

  `default` 默认的设置非常适合快速创建一个新项目的原型，而手动设置则提供了更多的选项，
  它们是面向生产的项目更加需要的。

  如果你决定手动选择特性，在操作提示的最后你可以选择将已选项保存为一个将来可复用的 preset.
  我们会在下一个章节讨论 preset 和插件。
  
  **~/.vuerc**: 被保存的 preset 将会存在用户的 home 目录下一个名为 `.vuerc`
  的 JSON 文件里。如果你想要修改被保存的 preset / 选项，可以编辑这个文件。

  在项目创建的过程中，你也会被提示选择喜欢的包管理器或使用
  [淘宝 npm 镜像源](https://npm.taobao.org/)以更快地安装依赖。
  这些选择也将会存入 `~/.vuerc`.
    + **Added:** 比如自己本机的 `.vuerc` 文件的内容如下:
      ```js
        {
            "useTaobaoRegistry": true,
            "packageManager": "npm",
            "latestVersion": "4.4.5",
            "lastChecked": 1592914103601,
            "presets": {
                "vue-default-project": {
                "useConfigFiles": false,
                "plugins": {
                    "@vue/cli-plugin-babel": {},
                    "@vue/cli-plugin-router": {
                    "historyMode": true
                    },
                    "@vue/cli-plugin-vuex": {},
                    "@vue/cli-plugin-eslint": {
                    "config": "standard",
                    "lintOn": [
                        "save"
                    ]
                    }
                },
                "cssPreprocessor": "stylus"
                }
            }
        }
      ```

  `vue create` 命令有一些可选项，你可以通过运行以下命令进行探索：
  ```bash
    vue create --help
    用法：create [options] <app-name>

    创建一个由 `vue-cli-service` 提供支持的新项目

    选项：
    -p, --preset <presetName>       忽略提示符并使用已保存的或远程的预设选项
    -d, --default                   忽略提示符并使用默认预设选项
    -i, --inlinePreset <json>       忽略提示符并使用内联的 JSON 字符串预设选项
    -m, --packageManager <command>  在安装依赖时使用指定的 npm 客户端
    -r, --registry <url>            在安装依赖时使用指定的 npm registry
    -g, --git [message]             强制 / 跳过 git 初始化，并可选的指定初始化提交信息
    -n, --no-git                    跳过 git 初始化
    -f, --force                     覆写目标目录可能存在的配置
    -c, --clone                     使用 git clone 获取远程预设选项
    -x, --proxy                     使用指定的代理创建项目
    -b, --bare                      创建项目时省略默认组件中的新手指导信息
    -h, --help                      输出使用帮助信息
  ```

##### 2.2.2 使用图形化界面
- 你也可以通过 `vue ui` 命令以图形化界面创建和管理项目：
  ```bash
    vue ui
  ```
  上述命令会打开一个浏览器窗口，并以图形化界面将你引导至项目创建的流程。

##### 2.2.3 拉取 2.x 模板(旧版本)
- Vue CLI >= 3 和旧版使用了相同的 `vue` 命令，所以 Vue CLI 2(`vue-cli`)
  被覆盖了。如果你仍然需要使用旧版本的 `vue init` 功能，你可以全局安装一个桥接工具：
  ```bash
    npm install -g @vue/cli-init
    # `vue init` 的运行效果将会跟 `vue-cli@2.x` 相同
    vue init webpack my-project
  ```




#### 2.3 插件和 Preset
##### 2.3.1 插件
###### 2.3.1.1 在现有的项目中安装插件
###### 2.3.1.2 项目本地的插件   
##### 2.3.2 Preset
###### 2.3.2.1 Preset 插件的版本你管理
###### 2.3.2.2 允许插件的命令提示 
###### 2.3.2.2 远程 Preset
###### 2.3.2.3 加载文件系统中的 Preset
#### 2.4 CLI 服务
##### 2.4.1 使用命令
##### 2.4.2 vue-cli-service serve
##### 2.4.3 vue-cli-service build
##### 2.4.4 vue-cli-service inspect
##### 2.4.5 查看所有的可用命令
##### 2.4.6 缓存和并行处理 
##### 2.4.7 Git Hook
##### 2.4.8 配置是无需 Eject


### 3. 开发
#### 3.1 浏览器兼容性
##### 3.1.1 browserslist
##### 3.1.2 Polyfill
###### 3.1.2.1 useBuiltIns: 'usage'
###### 3.1.2.2 构建库或是 Web
###### 3.1.2.3 Component 时的 Polyfills
##### 3.1.3 现代模式

#### 3.2 HTML 和静态资源
##### 3.2.1 HTML
###### 3.2.1.1 Index 文件
###### 3.2.1.2 插值
###### 3.2.1.3 Preload
###### 3.2.1.4 Prefetch
###### 3.2.1.5 不生成 index 
###### 3.2.1.6 构建一个多页应用
##### 3.2.2 处理静态资源
###### 3.2.2.1 从相对路径导入
###### 3.2.2.2 URL 转换规则
###### 3.2.2.3 public 文件夹
###### 3.2.2.4 何时使用 public 文件夹

#### 3.3 CSS 相关
##### 3.3.1 引用静态资源 
##### 3.3.2 预处理器
###### 3.3.2.1 自动化导入
##### 3.3.3 PostCSS
##### 3.3.4 CSS Modules
##### 3.3.5 向预处理器 Loader 传递选项

#### 3.4 webpack 相关
##### 3.4.1 简单的配置方式
##### 3.4.2 链式操作(高级)
###### 3.4.2.1 修改 Loader 选项
###### 3.4.2.2 添加一个新的 Loader
###### 3.4.2.3 替换一个规则里的 Loader
###### 3.4.2.4 修改插件选型
##### 3.4.3 审查项目的 webpack 配置
##### 3.4.4 以一个文件的方式使用解析好的配置

#### 3.5 环境变量和模式
##### 3.5.1 模式
##### 3.5.2 示例: Staging 模式
##### 3.5.3 在客户端侧代码中使用环境变量
##### 3.5.4 只在本地有效的变量

#### 3.6 构建目标
##### 3.6.1 应用
##### 3.6.2 库
###### 3.6.2.1 
##### 3.6.3 Web Components 组件
###### 3.6.3.1 注册多个 Web Components 组件的包
###### 3.6.3.1 异步 Web Components 组件

#### 3.7 部署
##### 3.7.1 本地预览
##### 3.7.2 使用 history.pushState 的路由
##### 3.7.3 CORS
##### 3.7.4 PWA
##### 3.7.5 平台指南
###### 3.7.5.1 Github Pages
###### 3.7.5.2 GitLab Pages
###### 3.7.5.3 Netlify
###### 3.7.5.4 Render
###### 3.7.5.5 Amazon S3
###### 3.7.5.6 Firebase
###### 3.7.5.7 ZEIT Now
###### 3.7.5.8 Stdlib
###### 3.7.5.9 Heroku
###### 3.7.5.10 Surge
###### 3.7.5.11 Bitbucket Cloud
###### 3.7.5.12 Docker(Nginx)
