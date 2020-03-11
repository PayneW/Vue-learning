# Vue install
- 在用 Vue 构建大型应用时推荐使用 NPM 安装。 NPM 能很好地和诸如 webpack 或 Browserify 
  模块打包器配合使用。同时 Vue 也提供配套工具来开发单文件组件。 


##  目录 (Catalog)
1. 安装 `Vue`
2. `npm install vue` 安装到哪里?
3. `Vue`命令行工具(`vue-cli`) 是什么 和 安装 `vue-cli`
    + (3.1) `vue-cli 2.x` 命令行工具
    + (3.2) `Vue-cli 3` 更新官方命令行工具(CLI) 


## 生词 (New Words)



## 内容 (Content)
### 1. 安装 `Vue`
- `Vue`的安装依赖 `NodeJS` 和 `Git`, 在安装 `Vue` 之前, 请先安装它们.
    + `NodeJS` 和 `Git` 的安装见仓库: `Node.js/README.md`
### 2. `npm install vue` 安装到哪里?
- `npm install vue` 的意思是把 `vue` 安装到 `Node.js` 的` node_modules` 这个
  大的包组件中, 以便在 `Vue` 项目中直接通过 `import Vue from 'vue'` 方式引用
    + 当使用 `npm install vue` 安装 `Vue` 时, 如果此时有错误提示:
      `npm WARN saveError ENOENT: no such file or directory` 
      就使用 `npm init -f` 会在 `C:\Users\Administrator\` 下创建 `package.json`
      相对应的 `package-lock.json` 文件 (注: 这里为什么要这样操作不是很理解)  
    + Tip: 若此时还没有安装 `vue-cli` (即: `npm install -g @vue/cli`), 在命令行中
      `vue --version` 是找不到的, 一定要安装了 `cli` 才会正常显示 `Vue` 的版本号。  

### 3. `Vue`命令行工具(`vue-cli`) 是什么 和 安装 `vue-cli`
- Vue 提供一个官方命令行工具, 可`用于快速搭建大型单页应用`.
  该工具为现代的前端开发工作流提供了开箱即用的`构建配置`. 只需几分钟可创建并启动一个带热重载,
  保存时静态检查以及可用于生产环境的构建配置的项目.

#### (3.1) `vue-cli 2.x` 命令行工具
- 安装及使用:
    + `#` 全局安装 `vue-cli`: `npm install --global vue-cli`
    + `#` 创建一个基于 webpack 模板的新项目: `vue init webpack my-project`
    + `#` 进入项目安装依赖: 
        - `cd my-project`
        - `npm install`
    + `#` 运行: `npm run dev` 
- [Vue-cli2.x 命令行工具文档](https://github.com/vuejs/vue-cli/tree/v2#vue-cli--) 

#### (3.2) `Vue-cli3` 更新官方命令行工具(CLI)   
- 关于旧版本:
    + `Vue CLI` 的包名称由 `vue-cli` 改成了 `@vue/cli`. 如果你已经全局安装了旧版本的
      `vue-cli (1.x 或 2.x)`, 你需要先通过 `npm uninstall vue-cli-g` 或
      `yarn global remove vue-cli` 卸载它.    
- `Node` 版本要求:
    + `Vue CLI` 需要 `Node.js 8.9` 或更高版本 (推荐 `8.11.0+`). 你可以使用 `nvm`
      或者 `nvm-windows` 在同一台电脑中管理多个 `Node` 版本。
- `@vue/cli` 安装及使用:
    1. 可以使用下列任一命令安装这个新的包(下面的安装方式都是把 `@vue/cli`
       安装到 `Node` 的全局 `node-modules` 中):  
      `npm install -g @vue/cli` [注: install 可以简写为 i]  
      or  
      `yarn global add @vue/cli` <br/>
    1. 可以用此命令来检查其版本是否正确(3.x/4.x):  
      `vue --version`
    1. 创建一个项目 `vue create`: 例如:  
      `vue create my-project`
        - 警告: 如果你在 `Windows` 上通过 `minTTY` 使用 `Git Bash`,
          交互提示符并不工作. 你必须通过 `winpty vue.cmd create my-project` 
          启动这个命令。
    1. 选择预设配置(preset) [注: 自行判断]
        - ? Please pick a preset:
            + default (babel, eslint)
            + Manually select features 
    1. 预设配置完成后等待 `Vue-CLI` 完成初始化后, 进入 `my-project` 并启动项目:
      ```base
        # 进入项目: 
        cd my-project
        
        # Project setup (注: cli3.0 的教程里没有这行命令，可以忽略)
        ~~npm install~~
        
        # Compiles and hot-reloads for development (编译和热重启为开发环境):
        npm run serve
        
        # Compiles and minifies for production (打包压缩):
        npm run build
        
        # Lints and fixes files (整理和修复文件):
        npm run lint
      ```
    6. 在现有的项目中安装插件: 如果想在一个已经被创建好的项目中安装一个插件, 可以使用
       `vue add` 命令, 例如:
        - `vue add @vue/eslint` 上一行的命令等价于
          `vue add @vue/cli-plugin-eslint` 然后从 npm 安装它, 调用它的生成器.
          也等价与 `vue-cli 2.x` 的 `npm install eslint`.  
- [Vue-cli3 使用指南](https://cli.vuejs.org/zh/guide/)
- [使用Vue-cli 3.0搭建Vue项目](https://www.jianshu.com/p/6307c568832d)
