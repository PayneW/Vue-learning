# README


## 项目运行:
- (1) 进入当前项目, 使用下面 shell 安装依赖
  ```shell
    npm install
  ```
- (2) 启动项目(主要是启动 webpack-dev-serve), 运行下面 shell 
  ```shell
    npm run dev
  ```


## Content (项目创建过程)
- (1) 在控制台中进入到当前文件夹(`web-router-example`), 使用 `npm init -y`
  初始化 `package.json`
- (2) 在文件夹内安装 webpack
  ```shell
    npm install webpack webpack-cli --save-dev
  ```
  接着安装 webpack-dev-server
  ```shell
    npm install webpack-dev-server --save-dev
  ```
- (3) 创建项目需要的文件, 目录结构如下:
  ```
    
  ```
- (4) 创建 `webpack.config.js` 文件, 然后添加默认配置
- (5) 因为要处理(生成的) html 文件, 所以需要安装 html webpack plugin
  ```shell
    npm install html-webpack-plugin --save-dev
  ```

  在 `webpack.config.js` 中 配置 html-webpack-plugin.
  
- (6) 在 package.json 中配置运行脚本
  ```js
    "scripts": {
      "dev": "webpack-dev-server --config ./webpack.config.js"  
    }
  ```  
  运行示例: `npm run dev`
  