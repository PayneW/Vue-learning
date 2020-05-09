# Vue install
- 在用 Vue 构建大型应用时推荐使用 NPM 安装。 NPM 能很好地和诸如 webpack 或 Browserify 
  模块打包器配合使用。同时 Vue 也提供配套工具来开发单文件组件。 


##  目录 (Catalog)
1. 安装 `Vue` 前的的依赖软件.
2. 安装 `Vue`.
3. `Vue`命令行工具(`vue-cli`) 是什么 和 安装 `vue-cli`
    + (3.1) `vue-cli 2.x` 命令行工具
    + (3.2) `Vue-cli 3` 更新官方命令行工具(CLI) 


## 生词 (New Words)



## 内容 (Content)
### 1.  安装 `Vue` 前的的依赖软件.
- `Vue`的安装依赖 `NodeJS` 和 `Git`, 在安装 `Vue` 之前, 请先安装它们.
    + `NodeJS` 和 `Git` 的安装见仓库: `Node.js/README.md`
### 2. 安装 `Vue`.
- 安装完 `Git` 和 `Node` 后, 运行一下命令安装 `Vue`:
  ```shell
    npm install vue
  ```
  `npm install` 的意思是把 `vue` 安装到 `NodeJS` 的 `node_modules` 的包组件中,
  以便在 `Vue` 项目中直接通过 `import Vue from 'vue'` 方式引用
    + 当使用 `npm install vue` 安装 `Vue` 时, 如果此时有错误提示:
      `npm WARN saveError ENOENT: no such file or directory` 
      就使用 `npm init -f` 会在 `C:\Users\Administrator\` 下创建 `package.json`
      相对应的 `package-lock.json` 文件 (注: 这里为什么要这样操作不是很理解)  
    + Tip: 此时还没有安装 `vue-cli` (即: `npm install -g @vue/cli`), 在命令行中
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
       ```shell
        # npm
        npm install -g @vue/cli  

        # 或 yarn
        yarn global add @vue/cli
       ```
    2. 可以用此命令来检查其版本是否正确(3.x/4.x):  
        `vue --version`
    3. 创建一个 Vue 模板项目: (tip: 先使用图形界面/命令行进入到你想创建项目的父文件中)
       ```shell
        # (1) 创建一个名为 my-project 的项目
        # - 警告: 如果你在 `Windows` 上通过 `minTTY` 使用 `Git Bash`,
        #   交互提示符并不工作. 你必须通过 `winpty vue.cmd create my-project` 
        #   启动这个命令。
        vue create my-project

        # (2) 选择预设配置(preset) [注: 自行判断]
        #  - ? Please pick a preset:
        #    + default (babel, eslint)
        #    + Manually select features 
       ```
        + **Hint**: 我们都知道, 在天朝使用 npm 安装包是很慢的, 
            - (1) 如果你和我一样使用 nvm 来安装 node, 并在 `.bash_profile`
              文件的末尾中添加如下代码:
              `export NVM_NODEJS_ORG_MIRROR=https://npm.taobao.org/mirrors/node`
              来配置配置 node 的安装镜像; 
            - (2) 也参考 `https://developer.aliyun.com/mirror/NPM` 网站配置了
              npm 的镜像为 cnpm:
              ```shell
                npm install -g cnpm --registry=https://registry.npm.taobao.org
              ```
              但是, 请相信我, 你此时使用 `vue create xx` 创建模板文件还是会慢到怀疑人生,
              因为 vue 内部调用的包管理还是 npm, 我们配置 cnpm 命令后,
              安装包的命令是这样的: `cnpm install --save animate.css`;
            - (3) 此时, 你仍然需要再添加一个 shell 配置:
              ```shell
                npm config set registry https://registry.npm.taobao.org
              ```
              配置后可以通过此 shell 来验证是否设置成功:
              ```shell
                npm config get registry
              ```
              如果只想临时使用一次, 可以使用下面的 shell 命令来 `install xxx`:
              ```shell
                npm --registry https://registry.npm.taobao.org install xxxxx
              ```
              测试单次使用是否成功的 shell:
              ```shell
                npm info xxx (例如: express)
              ```
        + **Question:** 在使用 `vue create xxx` 创建项目时遇到的另一个问题: <br>
          问题是这样的, 我在上面 **Hint** 中配置 `npm` 为 `taobao` 镜像之前,
          先在 `CSS-grocery` 中创建了 `vue create css-secrets-examples` 项目,
          在创建项目时, vue 提示要不要把创建的配置选项保存为默认选项, 我就选择了是,
          这个默认配置的选项保存在 `/Users/WANG/` 的 **`.vuerc`** 中,
          先来看一下此时 `.vuerc` 中的内容:
          
          ```json
            {
                "useTaobaoRegistry": false,
                "packageManager": "npm",
                "latestVersion": "4.3.1",
                "lastChecked": 1587637239541,
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
          然后来贴出命令行中 `vue create css-secrets-examples` 的错误:
          ```base
            request to https://registy.npm.taobao.org/@vue%2fcli-plugin-router failed, reason: getaddrinfo ENOTFOUND registy.npm.taobao.org
            ......
            ......
            ......
            npm ERR! network In most cases you are behind a proxy or have bad network settings.
            npm ERR! network
            ......
          ```
          刚看到这个错误, 我以为是设置了代理的原因, 看到
          [CSDN](https://blog.csdn.net/qq_39672732/article/details/89060370)
          上的一篇文章说这样设置:
          ```shell
            # 执行下面 2 个命令看看是不是都返回 null
            npm config get proxy
            npm config get https-proxy
            
            # 如果其中一个的返回值不为 null, 继续执行:
            npm config set proxy null
            npm config set https-proxy null
          
            # 接着执行:
            npm config set registry http://registry.cnpmjs.org/
          ```
          不过很遗憾, 我执行完前 2 个命令, 都为 `null`(笑哭), 
          然后莫名的在一篇文章中说设置 `.vuerc`, 然后我就是打开 `.vuerc`
          看了一眼, 发现第一个 `"useTaobaoRegistry": false`......
          所以现在应该就已经明白了, 在上面的 **Hint** 中我设置了 `npm`
          镜像为 `taobao` 的镜像, 所以此时只需要把 `false` 改为 `true` 即可.
    4. 预设配置完成后等待 `Vue-CLI` 完成初始化后, 进入 `my-project` 并启动项目:
       ```shell
        # (3) 进入项目: 
        cd my-project
        
        # - Project setup (注: 因为我们创建项目是使用 vue create xx,
        #   此处便不需要再次使用 npm install 安装依赖了. 
        # - npm install 的使用场景是: 比如当我把项目发布到 github, 
        #   在另外一台电脑 download 后, 直接执行 npm install,
        #   此时项目便会根据 package.json 中的 dependency 和 devdependency
        #   来安装依赖.)
        npm install
        
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
