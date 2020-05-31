## eslint 常用设置


```javascript
    module.exports = {
        rules: {
            // 0表示不不处理，1表示警告，2表示错误并退出
            
            // error/warning 给出错误提是的方式
            "indent": ["error", 4],
            
            "quotes": [0, "double"],
            
            // 语句强制是否分号结尾 (分号: semicolon)
            "semi": [0, "always"],
        }
    }
```