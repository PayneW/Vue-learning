[详细解说见 Vue CLI 3 文档](https://cli.vuejs.org/zh/guide/html-and-static-assets.html#public-%E6%96%87%E4%BB%B6%E5%A4%B9)

## public 文件夹
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

## 何时使用 public 文件
   - 你需要在构建输出中指定一个文件的名字。
   - 你有上千个图片，需要动态引动他们的路径。
   - 有些库可能和 webpack 不兼容，这时你除了将其用一个独立的 <script> 标签引入没有别的选择。