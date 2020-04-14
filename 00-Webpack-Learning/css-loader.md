# css-loader 仓库文档

- [Webpack-contrib / css-loader](https://github.com/webpack-contrib/css-loader)

## Table Of Contents




## New Words
- **interpret [ɪn'tɝprɪt] --vt.解释,说明; 解析. --vi.口译**
    + Can you interpret(vt) the passage? 你能解释这一段吗?
    + How do you interpret(vt) this sentence? 你如何解释这一句?
    + He interpreted(vt) those symbols for me. 他为我解说那些符号.
    + The student kindly interpreted(vi) for me. 那个学生亲切地为我口译.
- **handling ['hændliŋ] --n.处理.**
    + It's okay. Daddy's handling this. 好了. 爸爸来处理.
    + By handling content in this way, you have much less code in
      each of your handler methods. 通过这种方式处理内容,
      每个处理程序方法中的代码就要少得多.
- **specify ['spesɪfaɪ] --vt.指定, 列举**
    + explicitly specifies 明确指定
- **require [rɪ'kwaɪə] --v.需要, 要求**
    + What is this buffer and why do we require it? 
        这是什么缓冲, 我们为什么需要它？
    + we require additional information. 我们需要更多的信息.   
- **via ['vaɪə] --prep.通过, 经由**
    + filter builds via command line arguments. 通过命令行参数过滤构建
- **prefer  [pri'fə:] --vt.偏爱; 比较喜欢; 宁愿. --vi.喜欢; 愿意.**
    + I prefer(vt) beer above all other drinks. 我喜欢啤酒甚于其他一切饮料.
    + Would you prefer milk or coffee? 你喜欢牛奶还是咖啡? 
    + Which do you prefer(vt), walking or riding? 走路和骑车, 你比较喜欢哪一种?
    + I prefer(vt) standing (to sitting). [prefer...to] 我比较喜欢站着
      (而不喜欢坐着).
    + Many people prefer(vt) living in the country to living in a city.
      很多人偏爱住乡间不喜欢住在都市.
- for instance 例如, 比如, 举例说
    + For An Instance 举个例子
    + For instance, something like 'I like you'. 比如说,  对我说 "我喜欢你".
- **post [post] --n.邮件; 职位; 柱子; 标杆. --vt.邮寄; 公布; 张贴. --vi.快速行进**
    + tab posts. 标签页
    + The post(n) hasn't come yet. 邮件还没来.
    + I had a heavy post(n) yesterday. 我昨天收到很多邮件.
    + the Sunday Post(n). 星期日邮报.
    + I posted(vt) him a Christmas card. 我寄给他一张圣诞卡.



## Content
- The `css-loader` interprets `@import` and `url()` like `import/require()`
  and will resolve them.  
  (`css-loader` 可以把 `@import` 和 `url()` 解析成像 `import/require()` 的形式,
  并使之正常工作.)

### 1. Getting Started (入门)
- To begin(首先), you'll need to install `css-loader`: 
  ```shell
    npm install --save-dev css-loader
  ```
  Then add the plugin to your `webpack` config. For example:
  ```js
    // - webpack.config.js
    module.exports = {
        module: {
            rules: [
                {
                    test: /\.css$/i,
                    use: ['style-loader', 'css-loader'],
                },
            ],
        },
    };
  ```
  例如, 在 js 文件中使用
  ```js
    /* - file.js*/
    import css from 'file.css';
  ```
  Good loaders for requiring your assets are the [file-loader](https://github.com/webpack/file-loader)
  and the [url-loader](https://github.com/webpack/url-loader)
  which you should specify in your config
  (see [below](https://github.com/webpack-contrib/css-loader#assets)).  
  (引入你资源的良好加载器是在配置中指定 `file-loader(文件加载器)` 和
  `url-loader(url 加载器)` (配置请参见下文))

  And run `webpack` via your preferred method.  
  (然后通过你的首选方式运行 `webpack`.)

#### 1.1 `toString`
- You can also use the css-loader results directly as a string.  
  (你也可以将 css-loader 的结果直接作为一个字符串.)
  ```js
    // - webpack.config.js
    module.exports = {
        module: {
            rules: [
                {
                    test: /\.css$/i,
                    use: ['to-string-loader', 'css-loader'],
                },
            ],
        },
    };
  ```
  使用方式如下:
  ```js
    const css = require('./test.css').toString();
    console.log(css);   // {String}
  ```
  If there are SourceMaps, they will also be included in the result string.  
  (如果有 SourceMaps, 它们也会包含在结果字符串中.)

  If, for one reason or another, you need to extract CSS as a plain string
  resource (i.e. not wrapped in a JS module) you might want to check out
  the [extract-loader](https://github.com/peerigon/extract-loader).
  It's useful when you, for instance, need to post process the CSS as
  a string.  
  (如果出于某种原因, 你需要将 CSS 提取为纯字符串资源(即未包含在 JS 模块中),
  则可能需要查看 `extract-loader`). 例如, 当你需要将 CSS 作为字符串进行后期处理时,
  它很有用.)
  ```js
    // - webpack.config.js
    module.exports = {
        module: {
            rules: [
                {
                    test: /\.css$/i,
                    use: [
                        // - handlebars loader(把手加载器???) expects raw resource string.
                        //   把手加载器期望原始资源字符串.
                        'handlebars-loader',
                        'extract-loader',
                        'css-loader',
                    ]
                }
            ]
        }
    };
  ```


### 2. Options(选项)
|  Name<br/>(名称)  |  Type<br>(类型)  |  Default<br>(默认值)  |  Description<br>(描述)  |
| :---------- | :---------- | :---------- | --------- |
| **[`localsConvention`](#localsconvention)** | `{String}` | `'asIs'` | Style of exported classnames |
| **[`importLoaders`](#importloaders)** | `{Number}` | `0` | Enables/Disables or setups number of loaders applied before CSS loader |
| **[`modules`](#modules)** | `{Boolean\|String\|Object}` | `false` | Enables/Disables CSS Modules and their configuration  |
| **[`sourceMap`](#sourcemap)** | `{Boolean}` | `false` | Enables/Disables generation of source maps   |
| **[`onlyLocals`](#onlylocals)**    | `{Boolean}`| `false` | Export only locals |
| **[`esModule`](#esmodule)** | `{Boolean}`| `false`  | Use ES modules syntax  |
| **[`import`](#import)** | `{Boolean\|Function}` | `true`  | Enables/Disables `@import` at-rules handling  |
| **[`url`](#url)** | `{Boolean\|Function}` | `true` | Enables/Disables `url`/`image-set` functions handling <br/>(启用/禁用 `url`/`image-set` 处理函数) |

#### 2.1 `url`
#### 2.2 `import`
#### 2.3 `modules`
#### 2.4 `sourceMap`
#### 2.5 `importLoaders`
#### 2.6 `localsConvention`
#### 2.7 `onlyLocals`
#### 2.8 `esModule`


### 3. Examples
#### 3.1 Assets
#### 3.2 Extract
#### 3.3 Pure CSS, CSS modules and PostCSS 


### 6. 


### 7. 