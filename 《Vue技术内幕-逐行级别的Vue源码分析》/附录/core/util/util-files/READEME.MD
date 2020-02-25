## 如何在 VSCode 中使用 flow?
1. 首先安装 flow 插件
2. 在 VSCode 的 settings.json 中添加一下 2 句:
   ```json
    {
        "flow.useNPMPackagedFlow": true,
        "javascript.validate.enable": false,
    }
   ```

## 使用 Flow 创建项目:
- 为了示范如何将 Flow 应用到项目，我们就来一个 npm 项目作例子吧.
  
  首先，创建一个名为 “get_started” 的项目：
  ```base 
    mkdir -p get_started
    cd get_started
    echo '{"name": "get_started", "scripts": {"flow": "flow; test $? -eq 0 -o $? -eq 2"}}' > package.json
  ```
  接着，加入 Flow
  ```base
    touch .flowconfig
    npm install --save-dev flow-bin
  ```