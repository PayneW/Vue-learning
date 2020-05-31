# Webpack 语法



## Catalog




## New Words





## Content

### 什么是 Webpack
- webpack是一个模块打包器。它将根据模块的依赖关系进行静态分析，然后将这些模块按照指定的规则生
  成对应的静态资源。
 
 
### Webpack 支持什么模块化规范？
- AMD(RequireJS)
- ES Modules (推荐)
- CommonJS 


### 安装 Webpack 
1. 安装node.js 
2. 用 npm 包管理工具安装 Webpack:
    - (1)、全局安装代码: npm install -g webpack   
    - (2)、本地安装(首先进入到项目中): (通常使用这个，可以使用项目本地版本的webpack)
        + webpack 4.0 开始安装 webpack 需要连 webpack-cli 一起安装，安装代码如下
            - `npm install webpack webpack-cli --save-dev`
        
3. 关于 --save / ---save-dev 的区别，
    - `--save` 会把安装的依赖保存到 dependencies 中。
    - `--save-dev` 把安装依赖保存到 devDependencies 中。 
    - tips: npm 文档说 dependencies 是运行时依赖，devDependencies 是开发时依赖。**

4. 创建package.json文件: 
    - tips: `package.json` 文件是一个标准的 npm 说明文件，包括当前项目的依赖模块，自定义
        的脚本任务等等。[*JSON 文件中不支持注释*]
    - 在当前项目中 `npm init`. / 或者一键创建命令: `npm init --yes` (推荐)
    - 注意: 在 npm init 创建过程中 {"main": "index.js"} 为默认就行不用修改。 
5. 在项目中创建: `webpack.config.js` 文件。
    - 如果在命令行中直接打包文件代码为: `webpack app.js -o bundle.js`. 

6. 配置文件: webpack.config.js:
    - 这个文件是一个 node.js 模块，返回一个 json 格式的配置信息对象。简单的配置如下: 
        + ```javascript
            module.exports = {
                mode: "development",
                entry: {
                    app: "./src/app.js"
                },
                output: {
                    path: path.resolve(__dirname, "dist"),
                    // publicPath: "/",
                    filename: "[name].bundle-[hash:5].js",
                    // chunkFilename: "[chunkhash].js"
                },
                devtool: "cheap-module-source-map",
                devServer: {
                    // 子页面顶部显示打包状态
                    inline: false,
                    port: 9004,
                    overlay: true,
                    open: true,
                    // 代理远程端口
                    proxy: {},
                    // 模块热更新(步骤1)
                    hot: true,
                },
                module: {rules: []},
                plugins: [],
                // 第三方库在本地配置 resole
                resolve: {},
                // webpack 4 代码分割和压缩
                optimization: {}
            };
          ```
    - 配置好后 cmd 中编译直接输入 webpack 就可以了.       
    - 说明: webpack 是(webpack --production 的缩写)编译后的文件经过压缩，如果想不压缩需要:
        + (1)、webpack.config.js 中设置 : mode: "development"
        + (2)、cmd 中输入: webpack --development
    -  这里说明一点，即使 cmd 中输入 webpack 编译成功了，还是需要单独点击 index.html 用浏
        览器打开文件的。Vue 中是在 (run-animation.js) 中配置了localhost 和 8080 端口，
        可以: npm run dev 直接就在浏览器中打开了，但是 webpack 模板并没有配置这些。

7. Loader(/'ləudə/ n.加载器): Webpack 本身只能处理js模块，如果要处理其他类型的文件，就需要
    使用 loader 进行转换。Loader可以理解为是模块和资源的转换器，它本身是一个函数，接受
    源文件作为参数，返回转换的结果。这样我们就可以通过 require 来加载任何类型的模块或文件，
    比如 CoffeeScript, JSX, LESS 或图片。Loader 本身也是运行在 node.js 环境中的 js 模
    块，它通常会返回一个函数。大多数情况下，我们通过 npm 来管理 loader，但是你也可以在项目中
    自己写 loader 模块。按照惯例，而非必须，loader 一般以 xxx-loader 的方式命名， 
    xxx 代表了这个 loader 要做的转换功能。比如: json-loader. 
    - 安装 loader: `npm install css-loader style-loader --save-dev` 就直接可以写到 
    package.json 中的 devDependencies 中了。

8. 插件(plugin): 插件可以完成更多 loader不能完成的功能。插件的使用一般是在 webpack 的配置
    信息 plugins 选项中指定。webpack本身内置了一些常用的插件，还可以通过npm安装第三方插件。

9. 开发环境启动监听模式: 
    + 当项目逐渐变大，webpack的编译时间会变长，可以通过参数让编译的输入内容带有进度和颜色。如
      果不想每次修改模块后都重新编译，可以启动监听模式。开启监听模式后，没有变化的模块会在编译后
      缓存到内存中，而不会每次都被重新编译，所以监听模式的整体速度都很快。 
    ```base
        packag.json 文件中配置 "scripts" --> "webpack": 
        {
            "scripts": {}
        }
    ```
    + 当然是用 webpack-dev-server 开发服务是一个更好的选择。它将在localhost:8080 启动
      一个 express 静态资源 web 服务器，并且会监听模式自动运行 webpack, 在浏览器打开
      http://localhost:8080/ 或 http://localhost:8080/webpack-dev-server/ 可以
      浏览项目中的页面和编译后的资源输出，并且通过一个 socket.io 服务实时监听它们的变化并
      自动刷新页面。
        - 安装: npm install webpack-dev-server -g
        - 运行: webpack-dev-server --progress --colors

     
### 分别价绍 bundle, chunk, module 是什么？
- bundle: 是由 webpack 打包出来的文件。
- chunk: 代码块，一个 chunk 由多个模块组合而成，用于代码的合并和分割。
- module(模块): 是开分中的单个模块，在 webpack 的世界里，一切皆模块啊，一个模块对应一个文件。
    
 
 ### webpack.config.js : 
  - devtool: "cheap-module-source-map", 它有一下四种不同的配置选项，各有优缺点，描述如下:
    + source-map : 在一个单独的文件中产生一个完整且功能完全的文件。这个文件具有最好的 source 
        map，但是它会减慢打包速度；
    + cheap-module-source-map :  在一个单独的文件中生成一个不带列映射的 map，不带列映射
        提高了打包速度，但是也使得浏览器开发者工具只能对应到具体的行，不能对应到具体的列（符号）
        ，会对调试造成不便；
    + eval-source-map :  使用eval打包源文件模块，在同一个文件中生成干净的完整的 
        source map。这个选项可以在不影响构建速度的前提下生成完整的 sourcemap，但是对打包后
        输出的JS文件的执行具有性能和安全的隐患。在开发阶段这是一个非常好的选项，在生产阶段则一定
        不要启用这个选项；
    + cheap-module-eval-source : 这是在打包文件时最快的生成source map的方法，生成的
        Source Map 会和打包后的JavaScript文件同行显示，没有列映射，和 eval-source-map 
        选项具有相似的缺点；
  

 ## 讲解文章:
 [Webpack 官方文档](https://doc.webpack-china.org/concepts/)
