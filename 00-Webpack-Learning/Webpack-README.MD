# Webpack 学习

## 目录(Catalog)
1. 模块系统的演进
    + 1.1 `<script>`标签
    + 1.2 `CommonJS`: 服务器端的 `NodeJS` 遵循 `CommonJS`.
    + 1.3 `AMD`: (Asynchronous Module Definition 异步模块定义) 
    + 1.4 `CMD`: (Common Module Definition 通用模块定义) 规范和 `AMD` 很相似.
    + 1.5 `UMD`: (Universal Modules Definition 通用模块定义)
    + 1.6 `ES Modules` 模块: 一个文件一个模块



## 生词(New Words)
- **synchronous ['sɪŋkrənəs] (syn-chro-nous) --同步的**
    + Synchronous I/0. 同步式 I/O
- **asynchronous [ei'siŋkrənəs] (asyn-chro-nous) --adj.异步的**
    + Asynchronous task runner 异步任务执行器


## 内容(Content)
### 1. 模块系统的演进:
- 1.1 `<script>`标签
- 1.2 `CommonJS`: 服务器端的 `NodeJS` 遵循 `CommonJS` 规范:
    + 该规范的核心思想是允许模块通过 `require` 方法来同步加载所有依赖的其他模块,
      然后通过 `exports` 或者 `module.exports` 来导出需要暴露的接口.
      (但是 `require` 是同步加载, 浏览器是异步加载, 所以并不能在浏览器端使用)
- 1.3 `AMD`: (Asynchronous Module Definition 异步模块定义) 
    + 该规范其实只有一个主要接口 `define(id?, dependencies?, factory)`,
      它要在声明模块的时候指定所有的依赖 `dependencies`, 并且还要当做形参传到
      `factory` 中, 对于依赖的模块提前执行. 依赖前置.
      ```javascript
       define("module", ["dep1", "dep2"], function(d1, d2){
           return someExportedValue;
       });
       require(["module", "../file"], function(module,file){/!*...*!/});
     ```
- 1.4 `CMD`: (Common Module Definition 通用模块定义)
    + 该规范和 `AMD` 很相似, 尽量保持简单, 并与 `CommonJS` 和 `NodeJS` 的
      `modules` 规范保持了很大的兼容性.
        -  一个文件为一个模块
        - 使用 `define` 来定义一个模块
        - 使用 `require` 来加载一个模块
        - 代表为: `SeaJS` (CMD 也是 SeaJS 在推广中过程中产生的产物)
        - 特点: 尽可能的懒执行
        - 详细教程: https://github.com/cmdjs/specification/blob/master/draft/module.md
- 1.5 `UMD`: (Universal Modules Definition 通用模块定义)
    + 该规范类似于兼容 `CommonJS` 和 `AMD` 的语法糖, 是模块定义的跨平台解决方法.
      ```js
        (function (root, factory) {
            if (typeof define === 'function' && define.amd) {
                define([], factory);
            } else if (typeof exports === 'object') {
                module.exports = factory();
            } else {
                root.returnExports = factory()
            }
        }(this, function () {
            return {}
        }))
      ```
- 1.6 `ES Modules` 模块: 一个文件一个模块
    + 详细语法见仓库: 
    `/JS-book-learning/《深入理解ES6》/chapter13_用模块封装代码/chapter13.md`