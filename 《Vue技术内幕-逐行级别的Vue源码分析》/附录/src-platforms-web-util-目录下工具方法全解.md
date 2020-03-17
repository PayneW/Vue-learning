# `src/platforms/web/util/` 目录下工具方法全解
- Tip: 虽然标题说是 "工具方法全解", 但每个文件只讲解了其中部分方法, 
  完整的代码见各自文件的 `源码`.

## 目录 (Catalog)
1. `attr.js`
    + (1.1) `isReservedAttr`
    + (1.2) `mustUseProp`
    + (1.3) 源码文档
2. `class.js`
    + (2.1) 源码文档
3. `compat.js`
    + (3.1) 源码讲解
    + (3.x) 源码文档
4. `element.js`
    + (4.1) 
    + (4.x) 源码文档
5. `index.js`
    + (5.1) `query`
    + (5.2) 源码文档
6. `style.js`
    + (6.1) 
    + (6.x) 源码文档



## 生词 (New Words)
### 1. `attr.js`
- **reserve [rɪ'zɜːv] --v.保留, 储备。 --n.贮藏, 储备, 保护区**
- **compilation [kɒmpɪ'leɪʃ(ə)n]  --n.编译, 编辑**
- **mute [mjuːt] --adj.无声, 哑**
- **enumerate [ɪ'numəret] --vt.枚举, 列举; 罗列**
    + The errors are too many to enumerate. 错误太多, 不胜枚举.
    + He enumerated the advantages of air travel. 他一一举出搭飞机旅游的好处.
- **indeterminate [ˌɪndɪ'tɜːmɪnət] --adj.不确定的; 不明确的; 模糊的.**
    + an indeterminate future. 不可预测的未来.

### 2. `class.js`

### 3. `compat.js`
- **compatible  [kəm'pætɪb(ə)l] --adj.兼容, 相容的**
     + Their marriage came to end because they were simply not compatible 
       with each other. 他俩简直无法和睦相处, 所以就离婚了。
     + Driving a car at a speed compatible with safety. 以兼顾安全的速度驾驶车。

### 4. `element.js`
- **decode [diː'kəʊd] --vt.解码; 译码.**
    + The control unit decoded the 18 bits. 控制器对 18 位字进行了译码.
    + Obviously, if you wanted to encode an decode in some other format,
      I would suggest extending the input and output stream.
      如果您希望对其他格式进行编码和解码, 我建议您继承输入和输出流, 这是很自然的事情.

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
- 见 `2.6-vue-source-document/src/platforms/web/util/attrs.js`


### 2. `class.js`


### 3. `compat.js`
#### 3.1 `compat.js` 文件的全部代码如下:
- ```js
    /* @flow */

    // - `inBrowser` 来自 `/src/core/util/env.js`
    import {inBrowser} from 'core/util/index';                      // {3-0}

    // check whether current browser encodes a char inside attribute value.
    // (检查当前浏览器是否在属性值内部编码了字符(character))
    let div;                                                        // {3-1}
    function getShouldDecode(href: boolean): boolean {              // {3-2}
        div = div || document.createElement('div');                 // {3-3}
        div.innerHTML = href ? `<a href="\n">` : `<div a="\n"/>`;   // {3-4}
        return div.innerHTML.indexOf('&#10;') > 0;                  // {3-5}
    }

    // #3663: IE encodes newlines inside attribute values while other 
    // browsers don't.
    export const shouldDecodeNewlines = inBrowser ? getShouldDecode(false) : false; // {3-6}
    // #6828: chrome encode content in a[href]
    export const shouldDecodeNewlinesForHref = inBrowser ? getShouldDecode(true) : false; // {3-7}
  ```
  该文件主要导出 2 个变量, 分别是 `shouldDecodeNewlines` 和
  `shouldDecodeNewlinesForHref`, 这 2 个变量都是布尔值, 那么这 2 个变量是干嘛的?
  我们看一个例子就知道了, 假设我们有如下 `DOM`:
  
  ```html
    <div id="link-box">
        <!-- 注意 href 属性值, 链接后面加了一个换行 -->
        <a href="http://hcysun.me
        ">aaaa</a>
        <!-- 注意 href 属性值, 链接后面加了一个 Tab -->
        <a href="http://hcysun.me   ">bbbb</a>
    </div>
  ```
  上面的 `DOM` 看上去貌似没有什么奇特的地方, 关键点在于 `<a>` 标签的 `href` 属性,
  我们在第一个 `<a>` 标签的 `href` 属性值后面添加了换行符, 在第二个 `<a>` 标签的
  `href` 属性值后面添加了制表符。那么这么做会有什么影响呢？执行下面的代码就显而易见了:
  ```js
    console.log(document.getElementById('link-box').innerHTML);
  ```
完整示例见当前文件夹 `./测试代码页面.html`.
  
  我在当前 `Chrome` 的版本(`80.0.3987.132`) 测试的输出结果是下面这样;
  ```html
        <!-- 注意 href 属性值, 链接后面加了一个换行 -->
        <a href="http://hcysun.me
        ">aaaa</a>
        <!-- 注意 href 属性值, 链接后面加了一个 Tab -->
        <a href="http://hcysun.me   ">bbbb</a>
  ```
可以看出 `80+` 版本的 `Chrome` 已经不再把 `换行符` 和 `制表符` 转义成 `&#10` 和 `&#9`了, 但是可能之前的版本是会的. 下面我们按照文章中所说的被解决转义的情况来讨论.
  
  实际上, 转义运算是浏览器的怪癖行为. 在 `IE` 中, 不仅仅是 `a` 标签的 `href` 属性值,
  任何属性值都存在这个问题. 这就会影响 `Vue` 的编译器在对模板进行编译后的结果,
  导致莫名奇妙的问题, 为了避免这些问题 `Vue` 需要知道什么时候要做兼容工作, 
  这就是 `shouldDecodeNewlines` 和 `shouldDecodeNewlinesForHref` 这两个变量的作用. 
  
  下面我们看一下具体实现, 首先定义了一个函数 `getShouldDecode`, 即上面代码的
  `行{3-1}` 到 `行{3-5}`.
  ```js
    // check whether current browser encodes a char inside attribute value.
    // (检查当前浏览器是否在属性值内部编码了字符(character))
    let div;                                                        // {3-1}
    // - get should decode 应该解码
    function getShouldDecode(href: boolean): boolean {              // {3-2}
        div = div || document.createElement('div');                 // {3-3}
        div.innerHTML = href ? `<a href="\n">` : `<div a="\n"/>`;   // {3-4}
        return div.innerHTML.indexOf('&#10;') > 0;                  // {3-5}
    }
  ```
  该函数的作用是判断当前浏览器是否会对属性值中所包含的换行符进行编码, 如果是则返回真,
  否则返回假. 其实现原理分 3 步:
    + (1) 创建一个 `div`;
    + (2) 设置这个 `div` 的 `innerHTML` 为 `<a href="\n"/>` 或者 `<div a="\n"/>` 
    + (3) 获取 `div` 的 `innerHTML` 值, 并检测换行符是否被编码, 如果被编码返回 `true`
    否则返回 `false`. 测试代码见当前目录: `./测试代码页面.html`.
  
  `getShouldDecode` 接收一个布尔值参数 `href`, 如果该参数为 `true` 意味着要检测的是
`a` 标签的 `href` 属性; `false` 为检测任意属性.
  
  有了上面的函数再实现 `shouldDecodeNewlines` 和 `shouldDecodeNewlinesForHref`
  这两个变量就容易多了:
  ```js
    export const shouldDecodeNewlines = inBrowser ? getShouldDecode(false) : false; // {3-6}
    export const shouldDecodeNewlinesForHref = inBrowser ? getShouldDecode(true) : false; // {3-7}
  ```
  最终如果 `shouldDecodeNewlines` 为 `true`, 意味着 `Vue` 在编译模板的时候,
  要对属性值中的换行符或制表符做兼容处理. 而 `shouldDecodeNewlinesForHref` 为
  `true` 意味着 `Vue` 在编译模板的时候, 要对 `a` 标签的 `href`
  属性值中的换行符或制表符做兼容处理. 当然, 这一切都是以在浏览器中为前提的,
因为上面的代码中存在一个 `isBrowser` 的判断.
  
  最后再啰嗦一句, 为什么只在浏览器中才判断是否需要做此兼容处理:
  因为只有完整版(包含`编译器`)的 `Vue` 才会遇到这个问题, 完整版的 `Vue`
  会在浏览器中对模板进行编译, 这样才有可能在解析模板的时候使用 `innerHTML` 获取模板内容.




### 4. `element.js`


### 5. `index.js`
#### (5.1) `query`
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




