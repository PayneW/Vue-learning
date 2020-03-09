# attrs.md --`src/platforms/web/util/attrs.js`


## 目录 (Catalog)
1. `isReservedAttr`
2. `mustUseProp`
3. 源码



## 生词 (New Words)
- **reserve [rɪ'zɜːv] --v.保留，储备。 --n.贮藏，储备，保护区**
- **compilation [kɒmpɪ'leɪʃ(ə)n]  --n.编译，编辑**
- **mute [mjuːt] --adj.无声，哑**
- **enumerate [ɪ'numəret] --vt.枚举, 列举; 罗列**
    + The errors are too many to enumerate. 错误太多, 不胜枚举.
    + He enumerated the advantages of air travel. 他一一举出搭飞机旅游的好处.
- **indeterminate [ˌɪndɪ'tɜːmɪnət] --adj.不确定的; 不明确的; 模糊的.**
    + an indeterminate future. 不可预测的未来.



## 内容 (Content)
#### 1. `isReservedAttr` (检测一个属性是否是 web 平台的保留属性)
- 描述: `isReservedAttr` 函数通过 `makeMap` 生成的, 用来检测一个属性是否是保留属性
  (web 平台的保留属性), 由下面的源码可知, 保留属性有 2 个: `style` 和 `class`.
  ```js
    // - these are reserved for web beacuse they are directly compiled away
    //   during template compilation. 
    //   (这些是为 web 保留的, 因为它们是在模板编译期间直接编译的.)
    export const isReseredAttr = makeMap('style,class');
  ```

#### 2. `mustUseProp`
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


#### 3. 源码
- 
