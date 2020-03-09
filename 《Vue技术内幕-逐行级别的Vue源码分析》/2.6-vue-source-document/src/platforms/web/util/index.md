# index.md
`src/core/platforms/web/util/index.js`

## 目录 (Catalog)
1. `query`


## 生词 (New Word)



## 内容 (Content)
#### 1. `query`
- 描述: `query` 查询元素.
- 参数: `{String | Element} el` css 选择符 或 DOM 元素
- 返回值: `{Element} el` DOM 元素
- 源码分析: 如果参数是字符串, 那么将该字符串作为 `css` 选择符并使用 
  `document.querySelector()` 函数查询元素, 如果查找到该元素则返回该元素,
  否则在生产环境下打印警告信息并返回一个新创建的 `div`.

  若果参数不是一个字符串, 则原封不动地返回参数.
  ```js
    /**
     * Query an element selector if it's not an element already. 
     */
    // - query (查询元素)
    export function query(el: string | element): Element {
        if (typeof el === 'string') {
            const selected = document.querySelector(el);
            if (!selected) {
                process.env.NODE_ENV !== 'production' && warn(
                    'Cannot find element: ' + el;
                )
                return document.createElement('div');
            }
            return selected;
        } else {
            return el;
        }
    };
  ```
