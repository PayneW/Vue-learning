# chapter04 -- Vue 选项(`options`) 的规范化

## 目录(Catalog)
- 4.1 弄清传给`mergeOptions()`(此方法在:`src/core/util/options.js`内)
  函数的 3 个参数.
- 4.2 检查组件名称是否符合要求
- 4.3 允许合并另一个实例构造函数的选项(`options`)
- 4.4 规范化 `props` (`normalizeProps()` 标准化props)
- 4.5 规范化 `inject`(`normalizeInject()` 标准化注入)
- 4.6 规范化 `directives` (`normalizeDirectives()` 标准化指令)



## 生词 (New Words
- **directive [dɪ'rektɪv] --n.指示，指令  --adj.指导的，管理的**
    + It's a directive straight from the President. 这是总统直接下达的指令。


## 内容 (Content)
- Notice: 本节讨论依旧沿用上一章(chapter03) 的例子
- Tip: 本章几乎全部在讲 `src/core/util/options.js` 文件内的代码; `options.js`
  的完整代码讲解见: `../2.6-vue-source-document/src/core/util/options.js`
### 4.1 弄清传给 `mergeOptions()` 函数的 3 个参数.
- Tip: mergeOptions() 方法在 `src/core/util/options.js`内.
- 这一小节我们继续前面的讨论，看一看 `mergeOptions` 都做了些什么。根据
  `src/core/instance/init.js` 顶部的引用关系可知，`mergeOptions`
  函数来自于 `src/core/util/options.js` 文件，事实上不仅仅是
  `mergeOptions` 函数，整个文件所做的一切都为了一件事：**选项的合并**。
  
  不过在我们深入 `options.js` 文件之前，我们有必要搞清楚一件事，就是如下代码中：
  ```js
    // - src/core/instance/init.js
    vm.$options = mergeOptions( 
        resolveConstructorOpitons(vm.constructor),
        options || {},
        vm
    )
  ```
  传递给 `mergeOptions` 函数的三个参数到底是什么。

  其中第一个参数是通过调用一个函数得到的，这个函数叫做 `resolveConstructorOptions`，
  并将 `vm.constructor` 作为参数传递进去。第二个参数 `options` 就是我们调用 `Vue`
  构造函数时透传进来的对象，第三个参数是当前 `Vue 实例`，现在我们逐一去看。

  `resolveConstructorOptions` 是一个函数，这个函数就声明在
  `src/core/instance/init.js` 文件中，如下：
  ```js
    // - `2.6-vue-source-document/src/core/instance/init.js`

    // - resolve constructor options (解析构造函数的 options)
    export function resolveConstructorOptions(Ctor: Class<Component>) { // {1-59}
        let options = Ctor.options;                                     // {1-60}
        if (Ctor.super) {                                               // {1-61}
            const superOptions = resolveConstructorOptions(Ctor.super); // {1-62}
            const cachedSuperOptions =  Ctor.superOptions;              // {1-63}
            if (superOptions !== cachedSuperOptions) {                  // {1-64}
                // - super option changed, need to resolve new options. 
                //   (父选项已变更, 需要解析新 options)
                Ctor.superOptions = superOptions;                       // {1-65}
                // - check if there are any late-modified/attached options (#4976)
                const modifiedOptions = resolveModifiedOptions(Ctor);   // {1-66}
                // - update base extend options
                if (modifiedOptions) {                                  // {1-67}
                    extend(Ctor.extendOptions, modifiedOptions);        // {1-68}
                }
                options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions); // {1-69}
                if (options.name) {                                     // {1-70}
                    options.component[options.name] = Ctor;             // {1-71}
                }
            }
        }
        return options;                                                 // {1-72}
    };
  ```
  在具体去看代码之前，大家能否通过这个函数的名字猜一猜这个函数的作用呢？其名字是
  `resolve Constructor Options` 那么这个函数是不是用来 `解析构造器的 options` 的呢？
  答案是：对，就是干这个的。接下来我们就具体看一下它是怎么做的，首先第一句：
  ```js
    let options = Ctor.options;                                     // {1-60}
  ```
  其中 `Ctor` 即传递进来的参数 `vm.constructor`，在我们的例子中他就是 `Vue` 构造函数，
  可能有的同学会问：难道它还有不是 `Vue` 构造函数的时候吗？当然，当你使用 `Vue.extend`
  创造一个子类并使用子类创造实例时，那么 `vm.constructor` 就不是 `Vue` 构造函数，
  而是子类，比如：
  ```js
    const Sub = Vue.extend();
    const s = new Sub();
  ```
  那么 `s.constructor` 自然就是 `Sub` 而非 `Vue`，大家知道这一点即可，但在我们的例子中，
  这里的 `Ctor` 就是 `Vue` 构造函数，而有关于 `Vue.extend` 的东西，我们后面会专门讨论的。

  所以，`Ctor.options` 就是 `Vue.options`，然后我们再看
  `resolveConstructorOptions` 的返回值是什么？如下：
  ```js
    return options;                                                 // {1-72}
  ```
  也就是把 `Vue.options` 返回回去了，所以这个函数的确就像他的名字那样，
  是用来获取构造者的 `options` 的。不过同学们可能注意到了，
  `resolveConstructorOptions` 函数的第一句和最后一句代码中间还有一坨包裹在 `if`
  语句块中的代码，那么这坨代码是干什么的呢？

  我可以很明确地告诉大家，这里水稍微有那么点深，比如 `if` 语句的判断条件
  `Ctor.super`，`super` 这是子类才有的属性，如下：
  ```js
    const sub = Vue.extend();
    console.log(Sub.super); //vue
  ```
  也就是说，`super` 这个属性是与 `Vue.extend` 有关系的，事实也的确如此。
  除此之外判断分支内的第一句代码：
  ```js
    const superOptions = resolveConstructorOptions(Ctor.super); // {1-62}    
  ```
  我们发现，又递归地调用了 `resolveConstructorOptions` 函数，
  只不过此时的参数是构造者的父类，之后的代码中，还有一些关于父类的 `options`
  属性是否被改变过的判断和操作，并且大家注意这句代码：
  ```js
    // - check if there are any late-modified/attached options (#4976)
    const modifiedOptions = resolveModifiedOptions(Ctor);   // {1-66}
  ```
  我们要注意的是注释，有兴趣的同学可以根据注释中括号内的 `issue` 索引去搜一下相关的问题，
  这句代码是用来解决使用 `vue-hot-reload-api` 或者 `vue-loader` 时产生的一个 bug 的。

  现在大家知道这里的水有多深了吗？关于这些问题，我们在讲 `Vue.extend`
  时都会给大家一一解答，不过有一个因素从来没有变，那就是 `resolveConstructorOptions`
  这个函数的作用永远都是用来获取当前实例构造者的 `options` 属性的，即使 `if`
  判断分支内也不例外，因为 `if` 分支只不过是处理了 `options`，
  最终返回的永远都是 `options`。

  所以根据我们的例子，`resolveConstructorOptions` 函数目前并不会走 `if` 判断分支，
  即此时这个函数相当于：
  ```js
    export function resolveConstructorOptions(Ctor: Class<Component>) {
        let options = Ctor.options;
        return options;
    }
  ```
  所以, 根据我们的例子, 此时的 `mergeOptions` 函数的第一个参数就是 `Vue.options`,
  那么大家还记得 `Vue.options` 长成什么样子吗? 
- (1) 打开 `chapter02.md` 找到 `行{4-24}` 
  (Tip: 请用 Typora 打开 `chapter02.md` 文件做参考)
  ```js
    // - `src/core/global-api/index.js` 

    Vue.options = Object.create(null);                  // {4-24}
    // - `ASSET_TYPES` 来自 `src/shared/constants.js`, 源码为:
    //   export const ASSET_TYPES = [
    //       'component',
    //       'directive',
    //       'filter'
    //   ]
    ASSET_TYPES.forEach(type => {                       // {4-25}
        Vue.options[type + 's'] = Object.create(null);  // {4-26}
    });
  ```
  经过 `行{4-25}` 和 `行{4-26}` 后 `Vue.options` 将变成这样:
  ```js
    Vue.options = {
        components: Object.create(null),
        directives: Object.create(null),
        filters: Object.create(null),
        _base: Vue
    }
  ```
- (2) 我们接着看 `chapter02.md` 中操作 `Vue.options` 的代码, 找到代码
  ```js
    // - ../src/core/components/index.js (全部代码)

    import KeepAlive from './keep-alive';
    export default {
        KeepAlive
    }
  ```
  经过上面的代码后 `Vue.options.components` 的值变为:
  ```js
    Vue.options.components = {
        KeepAlive
    }
  ```
  此时 `Vue.options` 变成:
  ```js
    Vue.options = {     // {flag: 00-1}
        components: {
            KeepAlive
        },
        directives: Object.create(null),
        filters: Object.create(null),
        _base: Vue
    }
  ```
- (3) 还是看 `chapter02.md` 文件, 找到 `行{10-15}`,`行{10-16}` 代码
  ```js
    // - `src/platform/web/runtime/index.js`

    // - install platform runtime directives & components.
    // - 安装平台运行时指令和组件
    extend(Vue.options.directives, platformDirectives);         // {10-15}
    extend(Vue.options.components, platformComponents);         // {10-16}
  ```
  经过 `行{10-15}` 和 `行{10-16}` 两行代码之后的 `Vue.options` 最终变成
  (Tip: 更详细过程见 `chapter02.md` 讲解):
  ```js
    Vue.options = {  
        components: {
            KeepAlive,
            Transition,
            TransitionGroup
        },
        directives: {
            model,
            show
        },
        filters: Object.create(null),
        _base: Vue
    }
  ```
- 经过上面的 `(1)`, `(2)`, `(3)` 步的解说我们知道 `Vue.options` 目前的面貌了,
  现在我们接着看:
  ```js
    // - src/core/instance/init.js
    vm.$options = mergeOptions( 
        resolveConstructorOpitons(vm.constructor),
        options || {},
        vm
    )
  ```
  `mergeOptions()` 方法的第二个参数 `options`, 这个参数实际上就是我们调用 `Vue`
  构造函数时传进来的选项(options), 所以根据我们目前例子 `options` 的值如下:
  ```json
    {
        el: '#app',
        data: {
            test: 1
        }
    }
  ```
  而 `mergeOptions` 的第 3 个参数 `vm` 就是 `Vue` 实例对象本身, 综上所述,
  最终代码如下:
  ```js
    vm.$options = {
        // - resolveConstructorOptions(vm.constructor)
        {
            components: {
                keepAlive,
                Transition,
                TransitionGroup
            },
            directives: {
                model,
                show
            },
            filters: Object.create(null),
            _base: Vue
        },
        // - options || {}
        {
            el: '#app',
            data: {
                test: 1
            }
        },
        vm
    }
  ```
  现在我们已经搞清楚传递给 `mergeOptions` 函数的三个参数分别是什么了，
  那么接下来我们就打开 `../2.6-vue-source-document/src/core/util/options.js`
  文件并找到 `mergeOptions` 方法，看一看都发生了什么。

### 4.2 检查组件名称是否符合要求
### 4.3 允许合并另一个实例构造函数的选项(`options`)
### 4.4 规范化 `props` (normalizeProps 标准化props)
### 4.5 规范化 `inject`(normalizeInject 标准化注入)
### 4.6 规范化 `directives` (normalizeDirectives 标准化指令)
