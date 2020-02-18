## 如何在 VSCode 中使用 flow?
1. 首先安装 flow 插件
2. 在 setting.json 中添加一下 2 句:
   ```json
    {
        "flow.useNPMPackagedFlow": true,
        "javascript.validate.enable": false,
    }
   ```