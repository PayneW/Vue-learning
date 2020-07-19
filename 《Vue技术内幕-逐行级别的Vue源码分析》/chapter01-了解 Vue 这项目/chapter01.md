# Chapter01 -- 了解 Vue 这个项目

## 目录
- 1. 了解 Vue 这个项目
    + 1.1 目录及文件
    + 1.2 Vue 的不同构建输出
        - 从 Vue 的构建配置了解其不同的构建输出
        - 不同构建输出的区别与作用
    + 1.3 package.json


## 生词 
- **release [rɪ'liːs] --v.推出，释放，发布，发行  --n.释放，版本**
    + release a new single. 发售一张新的单曲唱片
    + a quick-release button. 快速释放按钮。
    + a pre-release version of the software. 该软件的预发行版本。
    + His release from prison took place yesterday. 他昨天被释放出狱。
- **renderer --n.渲染器; 描绘器**
- **render ['rɛndɚ] --vt.给(ji)予; 渲染; 提供;**
    + render a bill. 开账单.
    + render assistance. 给予援助.




## 内容
### 1. 了解 Vue 这个项目
#### 1.1 目录及文件
- 1.1.1 Vue 源码的详细目录介绍如下:  
  ```base
    |-- scripts ----------------------------- 构建相关的文件, 一般情况下我们不需要动.
    |   |-- git-hooks ----------------------- 存放 git 钩子的目录.
    |   |-- alias.js ------------------------ 别名配置.
    |   |-- config.js ----------------------- 生成 rollup 配置的文件.
    |   |-- build.js ------------------------ 对 config.js 中所有的 rollup 配置进行构建.
    |   |-- ci.sh --------------------------- 持续集成运行的脚本.
    |   |-- release.sh ---------------------- 用于自动发布新版本的脚本. 
    |-- dist -------------------------------- 构建后文件的输出目录.
    |-- examples ---------------------------- 存放一些使用 Vue 开发的应用案例.
    |-- flow -------------------------------- 类型声明, 使用开源项目 [Flow](https://flowtype.org/).
    |-- packages ---------------------------- 存放独立发布的包的目录.
    |-- test -------------------------------- 包含所有测试文件.
    |-- src  -------------------------------- 这个是我们最应该关注的目录, 包含了源码.
    |   |-- compiler ------------------------ 编译器代码的存放目录, 将 template 编译为 render 函数.
    |   |-- core ---------------------------- 存放通用的, 与平台无关的代码.
    |   |   |-- observer -------------------- 响应系统, 包含数据观测的核心代码.
    |   |   |-- vdom ------------------------ 包含虚拟 DOM 创建 (creation) 和打补丁 (patching) 的代码.
    |   |   |-- instance -------------------- 包含 Vue 构造函数设计相关的代码.
    |   |   |-- global-api ------------------ 包含给 Vue 构造函数挂载全局方法(静态方法)或属性的代码.
    |   |   |-- components ------------------ 包含抽象出来的通用组件.
    |   |-- server -------------------------- 包含服务端渲染(server-side rendering) 的相关代码.
    |   |-- platforms ----------------------- 包含平台特有的相关代码, 不同平台的不同构建的入口文件也在这里.
    |   |   |-- web ------------------------- web 平台.
    |   |   |   |-- entry.runtime.js -------- 运行时构建的入口, 不包含模板(template) 到 render
    |   |   |   |                             函数的编译器, 所以不支持 `template` 选项, 我们使用 Vue
    |   |   |   |                             默认导出的就是这个运行时的版本. 大家使用的时候要注意. 
    |   |   |   |-- entry-runtime-with-compiler.js - 独立构建版本的入口, 它在 entry-runtime.js 的基础上添加了模板
    |   |   |   |                                    (template) 到 render 函数的编译器    
    |   |   |   |-- entry-compiler.js ------- vue-template-compiler 包的入口文件
    |   |   |   |-- entry-server-renderer.js - vue-server-renderer 包的入口文件
    |   |   |   |-- entry-server-basic-renderer.js - 输出 packages/vue-server-renderer/basic.js
    |   |   |-- weex ------------------------ 混合应用
    |   |-- sfc ----------------------------- .vue 单文件组件解析, 用于vue-template-compiler包 
    |   |-- shared -------------------------- 包含整个代码库通用的代码
    |-- package.json ------------------------ 不解释
    |-- yarn.lock --------------------------- yarn 的锁定文件
    |-- .editorconfig ----------------------- 针对不编辑器的编码风格配置文件
    |-- .flowconfig ------------------------- flow 的配置文件
    |-- .babelrc ---------------------------- babel 配置文件
    |-- .eslintrc --------------------------- eslint 配置文件
    |-- .eslintignore ----------------------- eslint 忽略配置
    |-- .gitignore -------------------------- git 忽略配置
  ```
#### 1.2 Vue 的不同构建输出
- 1.2.1 从 Vue 的构建配置了解其不同的构建输出
    + 如果按照输出的模式形式分类, 那么 Vue 有 3 种不同的构建输出, 分别是: `UMD`,
      `CommonJS` 以及 `ES Module`, 我们可以在 Vue 的 Rollup 构建配置中得知,
      打开 `scripts/config.js` 文件, 如下图: 
    + 上图中的三个构建配置的入口是相同的，即 `web/entry-runtime.js` 文件，
      但是输出的格式(format)是不同的，分别是 cjs、es 以及 umd。
    + 每种模块形式又分别输出了 运行时版 以及 完整版，如下图：
    + 上图中，cjs 模块分别输出了 `运行时版` 以及 `完整版` 两个版本，
      es 模块也做了同样的事情，我们观察运行时版本与完整版本的区别：
        - 运行时的入口文件名字为：`entry-runtime.js`
        - 完整版的入口文件名字为：`entry-runtime-with-compiler.js`
    + 通过名字，我们就可以猜到，完整版比运行时版本多了一个传说中的 compiler，
      而 compiler 在我们介绍目录结构的时候说过，它的作用是：
      编译器代码的存放目录，将 template 编译为 render 函数。
    + 上图中只介绍了 cjs 与 es 版本的输出，对于 umd 模块格式的输出，同样也分为
      运行时版 与 完整版，并且还分为 生产环境 与 开发环境，如下图：
- 1.2.2 不同构建输出的区别与作用
    + 相比于知道 Vue 的不同构建输出，我们更关心的是：不同的构建输出有什么区别，
      为什么要输出这么多不同的版本，有什么作用？
    + 为什么要分`运行时版`与`完整版`? 首先你要知道一个公式:
      `运行时版 + Compiler = 完整版`。也就是说完整版比运行时版多了一个 `Compiler`,
      一个将字符串模板编译为 `render` 函数的家伙, 大家想一想: 将字符串模板编译为 render
      函数的这个过程，是不是一定要在代码运行的时候再去做? 当然不是,
      实际上这个过程在构建的时候就可以完成，这样真正运行的代码就免去了这样一个步骤,
      提升了性能. 同时, 将 `Compiler` 抽离为单独的包，还减小了库的体积.
    + 那么为什么需要完整版呢？说白了就是允许你在代码运行的时候去现场编译模板,
      在不配合构建工具的情况下可以直接使用，但是更多的时候推荐你配合构建工具使用运行时版本。
    + 除了运行时版与完整版之外, 为什么还要输出不同形式的模块的包? 比如 `cjs`、`es` 和
      `umd`? 其中 `umd` 是使得你可以直接使用 `<script>` 标签引用 Vue 的模块形式.
      但我们使用 Vue 的时候更多的是结合构建工具，比如 webpack 之类的,
      而 cjs 形式的模块就是为 browserify 和 webpack 1 提供的,
      他们在加载模块的时候不能直接加载 ES Module. 而 webpack2+ 以及 Rollup
      是可以直接加载 ES Module 的，所以就有了 es 形式的模块输出。
#### 1.3 package.json
- `package.json` 文件被 npm 用于存储项目的元数据，以便将此项目发布为npm模块.
  我们来看几个此文件中重要的字段:
  ```json
    {
        "main": "dist/vue.runtime.common.js",
        "module": "dist/vue.runtime.esm.js",
        "scripts": {}
    }
  ```
  `main` 和 `module` 指向的都是运行时版的 Vue, 不同的是: 前者是 `cjs` 模块,
  后者是 `es` 模块.

  其中 `main` 字段和 `module` 字段分别用于 `borowserify`/`webpack 1` 和
  `webpack 2+`/`Rollup`, 后者可以直接加载 `ES Module` 且会根据 `module`
  字段的配置进行加载, 关于 `module` 可以参考这里:
  https://github.com/rollup/rollup/wiki/pkg.module.

  然后我们看一下 `scripts` 字段如下, 这里去掉了测试相关以及 weex 相关的脚本配置:
  ```json
    {
        "scripts": {
            // - 构建完整版 umd 模块的 Vue
            "dev": "rollup -w -c scripts/config.js --environment TARGET:web-full-dev",
            // - 构建运行时 cjs 模块的 Vue
            "dev:cjs": "rollup -w -c scripts/config.js --environment TARGET:web-runtime-cjs",
            // - 构建运行时 es 模块的 Vue
            "dev:esm": "rollup -w -c scripts/config.js --environment TARGET:web-runtime-esm",
            // - 构建 web-server-renderer 包
            "dev:ssr": "rollup -w -c scripts/config.js --environment TARGET:web-server-renderer",
            // - 构建 Complier 包
            "dev:compiler": "rollup -w -c scripts/config.js --environment TARGET:web-server-renderer",
            "build": "node scripts/build.js",
            "build:ssr": "npm run build -- vue.runtime.common.js, vue-server-renderer",
            "lint": "eslint src build test",
            "flow": "flow check",
            "release": "bash scripts/release.sh",
            "release:note": "node scripts/get-release-note.js",
            "commit": "git-cz"
        }
    }
  ```
  说明: 这套源码分析的文章, 大多数时候是基于 dev 脚本的 (即: `npm run dev`),
  也就是完整版的 umd 模块的 Vue. 原因是方便我们直接引用并使用, 且完整版带了 `compiler`
  我们就不用单独去分析了.