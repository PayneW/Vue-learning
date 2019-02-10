# 智能社-陈潇冰-vue视频学习

## bower -> (前端)包管理器: 安装 bootstrap, jquery, Vue...等等软件。

  - 1.使用node的npm包管理器安装bower: npm install bower -g
  
  - 2.显示bower信息: bower --version
    + 关于输入--version找不到bower的问题: 
        - 在 【环境变量 --> "用户变量 + 系统变量"的Path中都要加入: (C:\Users\Administrator\AppData\Roaming\npm) --> administrator 为当前用户名】
  
  - 3.使用bower安装软件: bower install <包名>。例如: bower install vue
    + bower install <包名>安装软件后会在项目文件下下生成 `bower_components` 文件夹，插件以自己名称的文件夹存在次文件夾下
    + 安装特定版本一般在插件后面加 `#特定版本` 有时候也为 `@特定版本` 。例如: bower install vue#1.0.28 
    + 像 bootstrap 需要依赖 jquery ，所以在安装时会自动下载依赖插件
  
  - 4.卸载bower安装的软件: bower uninstall <包名> 
  
  + 5.查看安装包(插件)信息: bower info <包名>
  
  
  
#### Animate.css库的安装代码: bower install animate.css --save
### Velocity.js 安装代码:    bower install velocity
  
  
  
  