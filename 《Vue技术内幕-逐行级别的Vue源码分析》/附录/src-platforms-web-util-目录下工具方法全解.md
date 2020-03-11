# `src/platforms/web/util/` 目录下工具方法全解
- Tip: 虽然标题说是 "工具方法全解", 但每个文件只讲解了其中部分方法, 
  完整的代码见各自文件的 `源码`.

## 目录 (Catalog)
1. `attr.js`
    + (1.1) `isReservedAttr`
    + (1.2) `mustUseProp`
    + (1.3) 源码
2. `class.js`
    + (2.1) 
    + (2.x) 源码
3. `compat.js`
    + (3.1) 
    + (3.x) 源码
4. `element.js`
    + (4.1) 
    + (4.x) 源码
5. `index.js`
    + (5.1) `query`
    + (5.2) 源码
6. `style.js`
    + (6.1) 
    + (6.x) 源码



## 生词 (New Words)
### 1. `attr.js`
- **reserve [rɪ'zɜːv] --v.保留，储备。 --n.贮藏，储备，保护区**
- **compilation [kɒmpɪ'leɪʃ(ə)n]  --n.编译，编辑**
- **mute [mjuːt] --adj.无声，哑**
- **enumerate [ɪ'numəret] --vt.枚举, 列举; 罗列**
    + The errors are too many to enumerate. 错误太多, 不胜枚举.
    + He enumerated the advantages of air travel. 他一一举出搭飞机旅游的好处.
- **indeterminate [ˌɪndɪ'tɜːmɪnət] --adj.不确定的; 不明确的; 模糊的.**
    + an indeterminate future. 不可预测的未来.
### 2. `class.js`
### 3. `compat.js`
### 4. `element.js`
### 5. `index.js`
### 6. `style.js`



## 内容 (Content)
### 1. `attr.js`
##### 1.1 `isReservedAttr`
- 描述: `isReservedAttr` 函数通过 `makeMap` 生成的, 用来检测一个属性是否是保留属性
  (web 平台的保留属性), 由下面的源码可知, 保留属性有 2 个: `style` 和 `class`.
  ```js
    // - these are reserved for web beacuse they are directly compiled away
    //   during template compilation. 
    //   (这些是为 web 保留的, 因为它们是在模板编译期间直接编译的.)
    export const isReseredAttr = makeMap('style,class');
  ```
##### 1.2 `mustUseProp`
- 描述: `mustUseProp` 用来检测一个属性在标签中是否要使用元素对象原生的
  `prop (property)` 进行绑定, 注意: **这里的 `prop` 指的是元素对象的属性, 而非 `Vue`**
  **中的 `props` 概念.**
- 参数:
    + `{String} tag` 标签名
    + `{String} type` 标签的 `type` 属性, 多用于如 `<input type='button'/>`
    + `{String} attr` 属性名
- 返回值: 如果给定的属性 `attr` 在标签 `tag` 中要使用元素对象原生的 `prop` 进行绑定,
  那么就返回 `true`, 否则返回 `false`.
- 源码分析: 首先定义一个函数 `acceptValue`, 这是一个使用 `makeMap` 生成的函数,
  用来检测标签是否是以下标签之一: `input,textarea,option,select,progress`.
  ```js
    // - attributes that should be using props for binding.
    //   (应该使用 `props` 进行绑定的属性.)
    const acceptValue = makeMap('input,textarea,option,select,progress');
    // - must use prop 
    export const mustUseProp = (tag: string, type: ?string, attr: string): boolean => {
        return (
            // - `input,textarea,option,select,progress` 这些标签的 value
            //   属性都应该使用元素对象原生的 prop 绑定 (除了 type === 'button' 之外)
            (attr === 'value' && acceptValue(tag)) && type !== 'button' ||
            // - option 标签的 selected 属性应该使用元素对象原生的 prop 绑定
            (attr === 'selected' && tag === 'option') ||
            // - input 标签的 checke 属性应该使用元素对象原生的 prop 绑定
            (attr === 'checked' && tag === 'input') ||
            // - video 标签的 muted 属性应该使用元素对象原生的 prop 绑定.
            (attr === 'muted' && tag === 'video')
        )
    }
  ```
  举个例子, 如下:
  ```js
    const el = document.createElement('div');
    // - 这里的 el.innerHTML 属性就是元素对象的属性.
    el.innerHTML;
  ```
##### 1.3 源码
- 见 `2.6-vue-source-document/src/platforms/web/util.attrs.js`


### 2. `class.js`


### 3. `compat.js`


### 4. `element.js`


### 5. `index.js`
##### (5.1) `query`
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
##### (5.2) 源码 
- `src/core/platforms/web/util/index.js`

### 6. `style.js`
