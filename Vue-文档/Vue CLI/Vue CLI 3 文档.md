[详细解说见 Vue CLI 3 文档](https://cli.vuejs.org/zh/guide/)

```base
    1. serve /sɜːv/  vt & vi 服务, 帮助
    2. server /'sɜːvə/ n.服务器
    3. split /split/ vt.分裂，分离
    4. scope /skəʊp/ n.范围 视野
    5. unscoped 无范围
``` 


## 文档目录结构: 
  - 1 介绍
  - 2 安装
  
  - 3 基础
    + (3-1) 快速原型开发  
    
    + (3-2) 创建一个项目
        - (3-2-1) vue create
        - (3-2-2) 使用图形化界面
        - (3-2-3) 拉取 2.x 模板 (旧版本)
         
    + (3-3) 插件和 Preset
        - (3-3-1) 插件
            + (3-3-1-1) 在现有的项目中安装插件
                - ``` vue add @vue/eslint ```
                - 如果不带 @vue 前缀，该命令会换作解析一个 unscoped(无范围) 的包。例如以下命令会安装第三方插件 
                    vue-cli-plugin-apollo :
                    ``` # 安装并调用 vue-cli-plugin-apollo --> vue add apollo ```
                - 你也可以基于一个指定的 scope 使用第三方插件。例如如果一个插件名为 @foo/vue-li-plugin-bar，
                    你可以这样添加它:
                    ``` vue add @foo/bar ```
                - 你可以向被安装的插件传递生成器选项 (这样做会跳过命令提示):
                    ``` vue add @vue/eslint --config airbnb -- linton save ```
                - vue-router 和 vuex 的情况比价特殊 —— 它们并没有自己的插件，但是你仍然可以这样添加他们:
                    ``` vue add router / vue add vuex ```      
            + (3-3-1-2) 项目本地的插件
            
        - (3-3-2) Preset
            + (3-3-2-1) Preset 插件的版本管理
            + (3-3-2-2) 允许插件的命令提示
            + (3-3-2-3) 远程 Preset
            + (3-3-2-4) 加载文件系统中的 Preset
            
    + (3-4) CLI 服务
        - (3-4-1) 使用命令
        - (3-4-2) vue-cli-service serve
        - (3-4-3) vue-cli-service build
        - (3-4-4) vue-cli-service inspect
        - (3-4-5) 查找所有的可用命令
        - (3-4-6) 缓存和并行处理
        - (3-4-7) Git Hook
        - (3-4-8) 配置时无需 Eject
       
  
  - 4 开发
    + (4-1) 浏览器兼容性
        - (4-1-1) browserslist
        - (4-1-2) Polyfill
            + (4-1-2-1) useBuiltIns: "usage"
            + (4-1-2-2) 构建库或时 Web Component 时的 Polyfills
        - (4-1-3)现代模式
    + (4-2) HTML 和静态资源
        - (4-2-1) HTML
            + (4-2-1-1) Index 文件
            + (4-2-1-2) 插值
            + (4-2-1-3) Preload
            + (4-2-1-4) Prefetch
            + (4-2-1-5) 不生成 index
            + (4-2-1-6) 构建一个多页应用
        - (4-2-2) 处理静态资源
            + (4-2-2-1) 从相对路径导入
            + (4-2-2-2) URL 转换规则 
            + (4-2-2-3) public 文件夹
            + (4-2-2-4) 何时使用 public 文件夹
    + (4-3) CSS 相关  
        - (4-3-1) 引用静态资源
        - (4-3-2) 预处理器
             ``` 手动安装预处理器: npm install -D sass-loader node-sass```
             然后就可以导入响应的文件类型，或在 "#.vue" 文件中这样来使用:
             ```base
                <style lang="scss">
                    $color: red;
                </style>
             ```
            + (4-3-2-1) 自动化导入
        - (4-3-3) PostCSS
        - (4-3-4) CSS Modules
        - (4-3-5) 向预处理器 Loader 传递选项
    + (4-4) webpack 相关   
    + (4-5) 环境变量和模式  
    + (4-6) 构建目标   
    + (4-7) 部署   





#### (4-2-2-3) public 文件夹
  任何放置在 public 文件夹的静态资源都会被简单的复制，而不经过 webpack. 你需要通过绝对路径来引用他们。
  - 注意: 我们推荐将资源作为你的模块依赖图的一部分导入，这样他们会通过 webpack 的处理并获得如下好处:
     + 脚本和样式表会被压缩且打包在一起，从而避免额外的网络请求。
     + 文件丢失会直接在编译器时报错，而不是到了客户端才生成 404 错误。
     + 最终生成的文件名包含了内容哈希(hash)，因此你不必担心浏览器会缓存它们的老版本。
  
  - public 目录提供的时一个"应急手段"，当你通过绝对路径引用它时，留意应用将会部署到哪里。如果你的应用没有
  部署在域名的跟部，那么你需要为你的 URL 配置 baseUrl 前缀: 
     + 在 public/index.html 或其他通过 html-webpack-plugin 用作模板的 HTML 文件中， 你需要通过
     <%= BASE_URL %> 设置链接前缀:
            ```base
                <link rel="icon" href="<%= BASE_URL%>favicon.icon">
            ``` 
     + 在模板中，你首选需要向你的组件传入基础 URL:
             ```base
                data() {
                    return {
                        baseUrl: process.env.BASE_URL
                    }
                }   
             ``` 
     + 然后
            ```base
                <img :src="`${baseUrl}my-image.png`">
            ```   

#### (4-2-2-4) 何时使用 public 文件夹
   - 你需要在构建输出中指定一个文件的名字。
   - 你有上千个图片，需要动态引动他们的路径。
   - 有些库可能和 webpack 不兼容，这时你除了将其用一个独立的 <script> 标签引入没有别的选择。