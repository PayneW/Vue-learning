
## Babel是一个广泛使用的转码器，可以将ES6代码转为ES5代码，从而在现有环境执行。
- [Babel使用手册](https://github.com/thejameskyle/babel-handbook/blob/master/translations/zh-Hans/user-handbook.md)


0. 在使用Babel之前先安装webpack,webpack是打包工具，babel只是把ES6的语法转换为ES5。

1. 全局安装 Babel (不建议): babel的用途只是查看包的版本
  - 全局安装命令: npm install --global babel-cli
  - 卸载全局安装命令: npm uninstall --global babel-cli

2. ★ 项目内安装Babel CLI命令 ( 推荐): 
  - npm install babel-cli --save-dev  
 

3. 如何配置Bebel:
    - (1.)方法一: 在项目的根目录下新建一个后缀名为 .babelrc的文件(为什么是.babelrc？: 
        熟悉linux的同学知道，rc结尾的文件通常代表运行时自动加载的文件，配置等等，同样的这里的babelr会
        在webpack打包时运行babel访问这个配置文件，如果不想分离，也可以把babelrc的设置放到package.json中)
    xxx.babelrc: 内容为:  [ preset /priː'set/ vt.事先调整，事先装置。 n.预调装置。 adj.预先装置的，预先调整的。]<br>
    `
        { "presets": [ "es2015", "stage-0" ] }
    `
    <br>
    "presets" 代表了启动怎样的预设转码， es2015 代表启动 es6 语法，后面的 stage 则有 stage-0、stage-1、stage-2，
    这里我一般用 stage-0， 因为他代表了绝大多数的标准情况。总之，如果要用到这些预设配置 presets,我们就要用 npm 安装并依赖他们: 
    `
        npm install --save-dev babel-preset-es2015 babel-preset-stage-0
    `

   - (2.)方法二: 
    + package.json 中查看 devDependencies 中是否增加了 babel-cli 的加载器：
       `devDependencies: {  
            "babel-cli": "^x.x.x"                   
        }`
    + 然后安装 babel-loader加载器: <br>
      - npm install  babel-loader babel-core  --save-dev : 因为 babel-loader 和 babel-core 有依赖关系。
    + 配置 webpack.dev.config.js
    `
        module: {
            rules: [
                {
                    test: /\.css$/,
                    loaders: "style-loader!css-loader"
                },
                {
                    test: /\.js$/,
                    loaders: "babel-loader",
                    include: path.join(__dirname, "src")
                }
            ]
        }
    `  
      
4. 最简单的编译文件
    - 编译文件命令: --out-file 或者 -o
    + babel example.js  --out-file  compiled.js  或
    + babel example.js -o compiled.js
    - 把一个目录整个编译成一个新的目录: --out-dir 或者 -d
    + babel src --out-dir lib   或
    + babel src -d lib
      
      

## 文章:
[使用Webpack+Babel编译ES6模块(module)](https://github.com/94dreamer/webpack/tree/master/part2)
