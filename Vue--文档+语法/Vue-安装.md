## Vue install (Vue 安装)
  在用 Vue 构建大型应用时推荐使用 NPM 安装。 NPM 能很好地和诸如 webpack 或 Browserify 模块打包器配合使用。
  同时 Vue 也提供配套工具来开发单文件组件。 
 
   ```base
      # 最新稳定版 
      npm install vue
   ```
      
  + [vue.js是什么？为什么要在nodejs中安装？](https://segmentfault.com/q/1010000006170385)
  + npm install vue 他这里说的意思应该是把 vue 安装到 node.js 的 node_modules 这个大的包组件中,
    以便再 Vue 项目中直接通过 import Vue from 'vue' 方式引用
    
### **20190210-更新: 安装 vue**
- 1、下载 Node 的 msi 安装包，正常安装会自动把 node 添加到系统变量中
    + 默认的 Node 的安装路径为: C:\Program Files\nodejs
    + 来看另外 2 个目录， npm 和 npm-cache, 默认 Node 的本地仓库跑在系统 C 盘的用户目录中 
      (C:\Users\Administrator\AppData\Roaming)，不过是可以更改的，
      [详见这里](https://www.cnblogs.com/laizhouzhou/p/8027908.html), 我们通过 npm install 
      安装的组件和库都会在 npm 文件夹下的 mode_modules 文件夹中看到
      
- 2、下载 GitBash 安装后，把 git 添加到环境变量: 
    ```把git添加到系统环境变量path中，计算机-->属性-->高级系统设置-->环境变量-->系统变量-->path-->添加: C:\Program Files\Git\bin``` 

- 3、Ctrl+R 打开运行，输入 cmd 后输入: 
    + `node --version` 查看 node 的版本号 
    + `npm --version` 查看 npm 的版本号
    
- 4、安装 vue: `npm install vue` 
    + 此时如果有错误提示: `npm WARN saveError ENOENT: no such file or directory` 
      就使用 `npm init -f` 在 C:\Users\Administrator\ 下创建 package.json 相对应的
      package-lock.json 文件 (注: 这里为什么要这样操作不是很理解)  
    + 注: 此时还没有安装 npm install -g @vue/cli 所以在命令行中 vue --version 是找不到的
    一定要安装了额 cli 才会正常显示 vue 的版本号。   
  
  
## 命令行工具(CLI)
  Vue 提供一个官方命令行工具，可用于快速搭建大型单页应用。该工具为现代的前端开发工作流提供了开箱即用
  的构建配置。只需几分钟可创建并启动一个带热重载、保存时静态检查以及可用于生产环境的构建配置的项目: 
   
  ##### vue-cli 2.x 命令行工具
   ```base
      # 全局安装 vue-cli 
      npm install --global vue-cli
        
      # 创建一个基于 webpack 模板的新项目
      vue init webpack my-project
        
      # 进入项目安装依赖
      cd my-project
      npm install 
        
      # 运行
      npm run dev  
   ```
   - [Vue-cli2.x 命令行工具github文档](https://github.com/vuejs/vue-cli/tree/v2#vue-cli--) 
  
  ##### Vue-cli3 更新官方命令行工具(CLI)   
  - Vue CLI 是一个基于 Vue.js 进行快速开发的完整系统，提供: .......
  - 关于旧版本:
      + Vue CLI 的包名称由 vue-cli 改成了 @vue/cli。如果你已经全局安装了旧版本的 vue-cli (1.x 或 2.x ),
       你需要先通过 npm uninstall vue-cli-g 或 yarn global remove vue-cli 卸载它。    
  - Node 版本要求:
      + Vue CLI 需要 Node.js 8.9 或更高版本 (推荐 8.11.0+)。你可以使用 nvm 或者 nvm-windows 在同一台电脑中管理多个 Node 版本。
  ```base
     # 可以使用下列任一命令安装这个新的包:
     npm install -g @vue/cli  [注: install 可以简写位 i]
     # OR
     yarn global add @vue/cli
     
     # 可以用此命令来检查其版本是否正确(3.x):
     vue --version   
     
     # 创建一个项目: vue create
     vue create my-project
     
     # 警告: 如果你在 Windows 上通过 minTTY 使用 Git Bash，交互提示符并不工作。 你必须通过 
     winpty vue.cmd create my-project 启动这个命令。
    
     # 选择预设配置(preset) [注: 自行判断]
     ? Please pick a preset:
        default (babel, eslint)
        Manually select features 
     
     # 预设配置完成后等待 Vue-cli 完成初始化后，进入 my-project 并启动项目
       // 进入项目cd 
       cd my-project
       
       ## Project setup (注: cli3.0 d的教程里没有这行命令，可以忽略)
       npm install
      
       ### Compiles and hot-reloads for development
       npm run serve
       
       ### Compiles and minifies for production (打包压缩)
       npm run build
       
       ### Lints and fixes files
       npm run lint
        
        
     # 在现有的项目中安装插件: 如果想在一个已经被创建好的项目中安装一个插件，可以使用 vue add 命令
      vue add @vue/eslint 
      # 上一行的命令等价于 
      vue add @vue/cli-plugin-eslint 然后从 npm 安装它，调用它的生成器。
      # 也等价与 vue-cli 2.x 的 
      npm install eslint   
        
  ``` 
  - [Vue-cli3 创建命令行](https://cli.vuejs.org/zh/guide/)
 
  - Vue-CLI3 快速原型开发 (单独构建vue组件)
      + 详细内容见上面的链接
      

### [使用Vue-cli 3.0搭建Vue项目](https://www.jianshu.com/p/6307c568832d)
  
  
    
  

        
      
      
      
      
      
[在vue中使用sass的配置的方法 ](https://blog.csdn.net/lily2016n/article/details/75309492)