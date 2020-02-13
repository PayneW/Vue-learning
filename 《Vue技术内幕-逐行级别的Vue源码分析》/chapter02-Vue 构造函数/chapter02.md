# Chapter02 -- Vue 构造函数

## 目录
- 2. Vue 构造函数
    + 2.1 Vue 构造函数的原型  
    + 2.2 Vue 构造函数的静态属性和方法 (全局 API)
    + 2.3 Vue 平台化的包装
    + 2.4 with compiler




## 生词 
- **entity ['ɛntəti] --n.实体**
    + business entity 企业单位
    + economic entity 经济实体
    + What kind of an entity is a person? 认识一种什么样的实体？
- **rendering ['rɛndərɪŋ] --n.[计]渲染; 表演,演出; 翻译,译文[of].**
    + Rendering Context. 渲染上下文.
    + Rendering engine. 渲染引擎
- **expose [ɪk'spoz] --vt.使...暴露[于阳光, 风雨等中]{to}; 揭发; 露出**
- **scenario [sə'nærɪo] --n.情节; 剧本; 方案**
- **additional [ə'dɪʃ(ə)n(ə)l]  --adj.额外的，另外的，附加的**
    + additional expense 附加费用
    + we require additional information. 我们需要更多的信息。
    + Installing additional dependencies. 正在安装附加依赖。
- **asset ['æsɛt] --n.资产, 财富** 
    + personal[real] assets. 动[不动]产.
    + assets and liabilities. 资产和负债.
- **procedural [prə'siːdʒərəl] --adj.程序(上)的**
    + procedural language
- **convenience [kən'vinɪəns] --n.方便, 便利**
- **explicit  [ɪk'splɪsɪt] --adj.明确的, 明晰的**
    + He gave such explicit directions that everyone understood them. 
      它给的指示很明确，每人都了解。
    + It's an explicit statement. 这句话说得很确定。



## 内容
### 2. Vue 构造函数
- 我们在使用 Vue 的时候，要使用 new 操作符进行调用，这说明 Vue 应该是一个构造函数，
  所以我们要做的第一件事就是：把 Vue 构造函数搞清楚。
#### 2.1 Vue 构造函数的原型
- 在 chapter01 一节中, 我们在最后提到这套文章将会以 `npm run dev` 为切入点:
  ```json
    {
        "dev": "rollup -w -c scripts/config.js --environment TARGET:web-full-dev",
    }
  ```
  当我们执行 `npm run dev` 时, 根据 `scripts/config.js` 中的配置:
  ```js
    {
        // Runtime+compiler development build (Browser)
        'web-full-dev': {
            entry: resolve('web/entry-runtime-with-compiler.js'),
            // - destination
            dest: resolve('dist/vue.js'),
            format: 'umd',
            env: 'development',
            alias: { he: './entity-decoder' },
            banner
        },
    }
  ```
  可知, 入口文件为 `web/entry-runtime-with-compiler.js`, 最终输出 `dist/vue.js`
  它是一个 `umd` 模块, 接下来我们就以入口文件为起点, 找到 `vue` 构造函数并将 `vue`
  构造函数的真面目扒的一清二楚. 

  但现在有一个问题 `web/entry-runtime-with-compiler.js` 中这个 `web`
  指的是哪一个目录? 这其实是一个别名配置, 打开 `scripts/alias.js` 文件:
  ```js
    const path = require('path');
    const resolve = p => path.resolve(__dirname, '../', p);
    module.exports = {
        vue: resolve('src/platforms/web/entry-runtime-with-compiler'),
        compiler: resolve('src/compiler'),
        core: resolve('src/core'),
        shared: resolve('src/shared'),
        web: resolve('src/platforms/web'),
        weex: resolve('src/platforms/weex'),
        server: resolve('src/server'),
        entries: resolve('src/entries'),
        sfc: resolve('src/sfc'),
    }
  ```
  其中的这么一句: `web: resolve('src/platforms/web')`

  所以 `web` 指向的应该是 ` src/platforms/web`, 除了 `web` 之外, `alias.js`
  文件中还配置了其他的别名, 大家在找对应目录的时候, 可以来这里查阅,
  后面就不做这种目录寻找的说明了.

  接下来我们就进入正题, 打开 `src/platforms/web/entry-runtime-with-compiler.js`
  文件, 你可以看到这样一句话: 
  ```js
    import Vue from './runtime/index';
  ```
  这说明: 这个文件并不是 `Vue` 构造函数的 "出生地", 这个文件中的 `Vue` 是从
  `./runtime/index` 导入进来的, 于是我们就打开当前目录的 `runtime` 目录下的
  index.js 看一下, 你同样能够发现这样一句话:
  ```js
    import Vue from 'core/index';
  ```
  同样的道理, 这说明 `runtime/index.js` 文件也不是 `Vue` 构造函数的 "出生地",
  你应该继续顺藤摸瓜打开 `core/index.js` 文件, 在 `scripts/alias.js` 的配置中,
  `core` 指向的是 `src/core`, 打开 `src/core/index.js` 你能看到这样一句:
  
  ```js
    import Vue from './instance/index';	// {flag 1}
  ```
  按照上面的套路, 继续打开 **`./instance/index.js`** 文件:
  ```js
    // - ../src/core/instance/index.js

    // - 从 5 个文件导入 5 个方法 (不包括 warn)
    import {initMixin} from './init';
    import {stateMixin} from './state';
    import {renderMixin} from './render';
    import {eventsMixin} from './events';
    import {lifecycleMixin} from './lifecycle';
    import {warn} from '../util/index';
  
    // - 定义 Vue 构造函数
    function Vue(options) {
        if (process.env.NODE_ENV !== 'production' && !(this instanceof Vue)) {
            warn('Vue is a constructor and should be called with the `new` keyword');
        }
        this._init(options); // {1}
    }
  
    // - 将 Vue 作为参数传递给导入的 5 个方法
    initMixin(Vue);
    stateMixin(Vue);
    eventsMixin(Vue);
    lifecycleMixin(Vue);
    renderMixin(Vue);
  
    // - 导出 Vue
    export default Vue  
  ```
  可以看出, 这个文件才是 `Vue` 构造函数的真正 "出生地", 上面的代码是
  `./instance/index.js` 文件中全部的代码, 还是比较简短易懂的, 首先分别从
  `./init.js`、`./state.js`、`./render.js`、`./events.js`、`./lifecycle.js`
  这五个文件中导入 5 个方法，分别是：`initMixin`、`stateMixin`、`renderMixin`、
  `eventsMixin` 以及 `lifecycleMixin`，然后定义了 Vue 构造函数，
  其中使用了安全模式来提醒你要使用 `new` 操作符来调用 `Vue`，接着将 `Vue`
  构造函数作为参数，分别传递给了导入进来的这五个方法，最后导出 Vue。
- **(1)** 那么这 5 个方法又做了什么呢? 先看 `initMixin`, 打开 **`./init.js`**
  文件, 找到 `initMixin` 方法, 如下: 
  ```js
    // - ../src/core/instance/init.js

    export function initMixin(Vue: Class<Component>) {
        Vue.prototype._init = function (options?: Object) {
            // ... _init 方法的函数体, 此处省略
        }
    }
  ```
  这个方法的作用就是在 `Vue` 的原型上添加了 `_init` 方法, 这个 `_init`
  方法看上去应该是内部初始化的一个方法, 其实在 `instance/index.js`
  文件中我们是见过这个方法的, 即上面的 Vue 构造函数内的 行`{1}`, 这说明,
  当我们执行 `new Vue()` 的时候, `this._init(options)` 将被执行.
- **(2)** 再打开 **`./state.js`** 文件, 找到 `stateMixin` 方法, 这个方法的一开始,
  是这样一段代码:
  ```js
    // - ../src/core/instance/state.js

    export function stateMixin(Vue: Class<Component>) {
        // - Flow somehow has problems with directly declared definition
        //   object when using Object.defineProperty, so we have to
        //   procedurally build up the object here. (Flow 有时候有问题,
        //   当使用 Object.defineProperty 直接声明定义对象时.)
        
        // - data define
        const dataDef = {};                             // {1-1}
        dataDef.get = function() {return this._data};   // {1-2}
        // - props define
        const propsDef = {};                            // {1-3}
        propsDef.get = function() {return this._props}; // {1-4}
        if (process.env.NODE_ENV !== 'production') {    // {1-5}
            dataDef.set = function(newData: Object) {   // {1-6}
                // - 避免替换根实例 $data, 改用嵌套数据属性
                warn(                                   // {1-7}
                    'Avoid replacing instance root $data. ` + 
                    'Use nested data properties instead.',
                    this
                )
            }
            propsDef.set = function() {                 // {1-8}
                warn(`$props is readonly.`, this);      // {1-9}
            }
        }
        Object.defineProperty(Vue.prototype, '$data', dataDef);     // {1-10}
        Object.defineProperty(Vue.prototype, '$props', propsDef);   // {1-11}

        Vue.prototype.$set = set;                       // {1-12}
        Vue.prototype.$delete = del;                    // {1-13}
  
        Vue.prototype.$watch = function() {             // {1-14}
            expOrFn: string | Function,
            cb: any,
            options?: Object
        }: Function {
            const vm: Component = this;
            if (isPlainObject(cb)) {
                return createWatcher(vm, expOrFn, cb, options);
            }
            options = options || {};
            options.user = true;
            const watcher = new Watcher(vm, expOrFn, cb, options);
            if (options.immediate) {
                try {
                    cb.call(vm, watcher.value);
                } catch (error) {
                    handleError(
                        error, 
                        vm,
                        `callback for immediate watcher "${watcher.expression}"`;
                    )
                }
            }
            return fucntion unwatchFn() {
                watcher.teardown();
            }
        }
    }
  ```
  我们先看最后两句, 使用 `Object.defineProperty` 在 `Vue.prototype` 上定义了两个属性,
  就是大家熟悉的 `$data` 和 `$props`, 这两个属性的定义分别写在了 `dataDef` 以及
  `propsDef` 这两个对象里, 我们来仔细看一下这两个对象的定义, 首相是 `get`:
  即 `行{1-2}` 和 `行{1-4}`,可以看到, `$data` 属性实际上代理的是 `_data` 这个属性,
  而 `$props` 代理的是 `props` 这个实例属性. 然后 `行{1-5}` 为是否为生产环境的判断,
  如果不是生产环境的话, 就为 `$data` 和 `$props` 这两个属性设置一下 `set`,
  实际上就是提示你一下: 别他娘的想修改我, 老子就是无敌.
  
  也就是说, `$data` 和 `$props` 是两个只读的属性, 所以, 现在让你使用 `js`
  实现一个只读的属性, 你应该知道要怎么做了.
  
  接下来 `stateMixin` 又在 `Vue.prototype` 上定义了 3 个方法:
  `行{1-12}`, `行{1-13}`, `行{1-14}`, 这 3 个方法分别是: `$set`, `$delete`
  以及 `$watch`, 实际上这些东西你都见过, 在这里: `图片丢失...`
- **(3)** 然后是 `eventsMixin` 方法, 这个方法在 **`./events.js`** 文件中,
  打开这个文件找到 `eventsMixin` 方法, 这个方法在 `Vue.prototype`
  上添加了 4 个方法, 分别是:
  ```js
    // - ../src/core/instance/events.js

    export function eventsMixin(Vue: Class<Component>) {
        const hookRE = /^hook:/;
        Vue.prototype.$on = function(event: string | Array<string>, fn: Function): Component {};
        
        Vue.prototype.$once = function(event: string, fn: Function): Component {};

        Vue.prototype.$off = function(event?: string | Array<string>, fn?: Function): Component {};

        Vue.prototype.$emit = function(event: string): Component {};
    }
  ```
- **(4)** 下一个是 `lifecycleMixin`, 打开 **`,/lifecycle.js`** 文件找到相应方法,
  这个方法在 `Vue.prototype` 上添加了 3 个方法:
  ```js
    // - ../src/core/instance/lifecycle.js

    export function lifecycleMixin(Vue: Class<Component>) {
        Vue.prototype._update = function(vnode: VNode, hydrating?: boolean) {};
        
        Vue.prototype.$forceUpdate = function() {};
        
        Vue.prototype.$destroy = function() {};
    }
  ```
- **(5)** 最后一个是 `renderMixin` 方法了, 它在 **`render.js`** 文件中,
  ```js
    // - ../src/core/instance/render.js

    export fucntion renderMixin(Vue: Class<Component>) {
        // - install runtime convenience helpers. 安装运行时便利助手
        installRenderHelpers(Vue.prototype);                // {2-1}

        Vue.prototype.$nextTick = function(fn: Function) {  // {2-2}
            return nextTick(fn, this);                      
        }

        Vue.prototype._render = function(): VNode {}        // {2-3}
    }
  ```
  这个方法的一开始以 `Vue.prototype` 为参数调用了 `installRenderHelpers` 函数
  (即 `行{2-1}`), 这个函数来自于与 `render.js` 文件相同目录下的
  `render-helpers/index.js`, 打开这个文件找到 `installRenderHelpers` 函数:
  ```js
    // - ../src/core/instance/render-helpers/index.js

    import {toNumber, toString, looseEqual, looseIndexOf} from 'shared/util';
    import {createTextNode, createEmptyNode} from 'core/vdom/vnode';
    import {renderList} from './render-list';
    import {renderSlot} from './render-slot';
    import {resolveFilter} from './resolve-filter';
    import {checkKeyCodes} from './check-keycodes';
    import {bindObjectProps} from './bind-object-props';
    import {renderStatic, markOnce} from './render-static';
    import {bindObjectListeners} from './bind-object-listeners';
    import {resolveScopedSlots} from './resolve-slots';

    // - target 为 Vue.prototype
    export function installRenderHelpers(target: any) {
        target._o = markOnce;
        target._n = toNumber;
        target._s = toString;
        target._l = renderList;
        target._t = renderSlot;
        target._q = looseEqual;
        target._i = looseIndexOf;
        target._m = renderStatic;
        target._f = resolveFilter;
        target._k = checkKeyCodes;
        target._b = bindObjectProps;
        target._v = createTextVNode;
        target._e = createEmptyVNode;
        target._u = resolveScopedSlots;
        target._g = bindObjectListeners;
    }
  ```
  以上代码就是 `intallRenderHelpers` 函数的源码, 可以发现, 这个函数的作用就是在
  `Vue.prototype` 上添加一系列方法, 这些方法的作用大家暂时还不需要关心,
  后面都会讲到.

  `renderMixin` 方法在执行完 `installRenderHelpers` 函数之后, 又在 `Vue.prototype`
  上添加了 2 个方法, 分别是: `$nextTick` 和 `_render`(即: `行{2-2}` 和 `行{2-3}`),
  最终经过 `renderMixin` 之后, `Vue.prototype` 又被添加了: 
  `$nextTick` 和 `_render` 方法. 至此, `instance/index.js`
  文件中的代码就运行完毕了 (注意: 所谓的运行, 是指执行 `npm run dev` 命令时构建的运行).
  我们大概了解了每个 `*Mixin` 方法的作用其实就是包装 `Vue.prototype`,
  在其上挂载一些属性和方法, 下面我们要做一件很重要的事, 就是将上面的内容集中合并起来,
  放到一个单独的地方, 便于以后查看, 我将它们整理到了这里:
  [附录/Vue 构造函数函数整理-原型]("../附录/Vue 构造函数整理-原型.md"), 
  这样当我们在后面详细讲解的时候, 提到某个方法你就可以迅速定位它的位置,
  以便于保持我们思路的清晰.


#### 2.2 Vue 构造函数的静态属性和方法 (全局 API)
- 到目前为止, **`core/instance/index.js`** 文件, 也就是 `Vue` 的出生文件的代码我们就看完了,
  按照之前我们寻找 `Vue` 构造函数时的文件路径回溯, 下一个我们要看的文件应该就是
  `core/index.js` 文件 (Note: 即上面的 `{flag 1}`), 
  这个文件将 `Vue` 从 `core/instance/index.js` 文件中导入进来, 我们打开
  `core/index.js`, 下面是其全部的代码, 同样很简短易看:
  
  ```js
    // - ../src/core/index.js (全部代码)
    
    // - 从 Vue 的出生文件导入 Vue
    import Vue from './instance/index';                 // {3-1}
    import {initGlobalAPI} from './global-api/index';   // {3-2}
    import {isServerRendering} from 'core/util/env';    // {3-3}
    import {FunctionalRenderContext} from
    'core/vdom/create-functional-component';            // {3-4}
  
    // - 将 Vue 构造函数作为参数传递给 initGlobalAPI 方法, 该方法来自
    //   `./global-api/index.js` 文件.
    initGlobalAPI(Vue);                                 // {3-5}
  
    // - 在 Vue.prototype 上添加 $isServer 属性, 该属性代理了来自
    //   `core/util/env.js` 文件的 isServerRendering 方法.
    Object.defineProperty(Vue.prototype, '$isServer`, { 
        get: isServerRendering
    })                                                  // {3-6}
  
    // - 在 Vue.prototype 上添加 $ssrContext 属性
    Object.defineProperty(Vue.prototype, '$ssrContext', {
        get() {
            // - istanbul ignore next 
            return this.$vnode && this.$vnode.ssrContext;
        }
    })                                                  // {3-7}
  
    // - expose FunctionalRenderContext for ssr runtime helper installation
    Object.defineProperty(Vue, 'FunctionalRenderContext', {
        value: FunctionalRenderContext
    })                                                  // {3-8}
  
    // - Vue.version 存储了当前 Vue 的版本号
    Vue.version = '__VERSION__';                        // {3-9}
  
    // - 导出 Vue
    export default Vue                                  // {3-10}
  ```
  上面的代码中, 首先 `行{3-1}` 从 `../src/core/instance/index.js` 文件导入 `Vue`,
  然后分别从 3 个文件导入了 3 个变量, 即上面的 `行{3-2}, 行{3-3}, 行{3-4}`; 其中
  `initGlobalAPI` 是一个函数 (即: `行{3-5}`), 并且以 `Vue` 构造函数作为参数进行调用:
  `initGlobalAPI(Vue)`.
  
  然后在 `Vue.prototype` 上分别添加了 2 个只读的属性, 分别是: `$isServer` 和
  `$ssrContext`. 接着又在 `Vue` 构造函数上定义了 `FunctionalRenderContext`
  静态属性, 并且 `FunctionalRenderContext` 属性的值为来自
  `../src/core/vdom/create-functional-component.js` 文件的 `FunctionalRenderContext`,
  之所以在 `Vue` 构造函数上暴露该属性, 是为了在 `ssr` 中使用它.
  
  最后, 在 `Vue` 构造函数上添加了一个静态属性 `version`, 存储了当前 `Vue`
  的版本值, 但是这里的 `__VERSION__` 是什么鬼? 打开 `../scripts/config.js`
  文件, 找到 `genConfig` 方法, 其中有这么一句话: `__version__: version`.
  这句话被写在了 `rollup` 的 `replace` 插件中, 也就是说, `__version__`
  最终将被 `version` 的值替换, 而 `version` 的值就是 `Vue` 的版本号.

  我们再回过头来看看这句代码: `initGlobalAPI(Vue)` (即: `行{3-5}`);

  大家应该可以猜个大概, 这看上去像是在 `Vue` 上添加一些全局的 API, 实际上就是这样的,
  这些全局 API 以静态属性和方法的形式被添加到 `Vue` 构造函数上, 打开
  `src/core/global-api/index.js` 文件找到 `initGlobalAPI` 方法, 我们来看看
  `initGlobalAPI` 方法都做了什么.

  首先是这样一段代码:
  ```js
    // - ../src/core/global-api/index.js (全部代码)

    /* @flow */
    import config from '../config';                         // {4-1}
    import {initUse} from './use';                          // {4-2}
    import {initMixin} from './mixin';                      // {4-3}
    import {initExtend} from './extend';                    // {4-4}
    import {initAssetRegisters} from './assets';            // {4-5}
    import {set, del} from '../observer/index';             // {4-6}
    import {ASSET_TYPES} from 'shared/constants';           // {4-7}
    import builtInComponents from '../components/index';    // {4-8}
    import {observe} from 'core/observer/index';            // {4-9}

    import {warn, extend, nextTick, mergeOptions, defineReactive} from
    '../util/index';                                        // {4-10}

    export function initGlobalAPI(Vue: GlobalAPI) {         // {4-11}
        // - config
        const configDef = {};                               // {4-12}
        configDef.get = () => config;                       // {4-13}
        if (proecess.env.NODE.ENV !== 'production') {       // {4-14}
            configDef.set = () => {                         // {4-15}
                warn('Do not replace the Vue.cofnig object, set individual fields instead.')
            }
        }
        Object.defineProperty(Vue, 'config', configDef);    // {4-16}

        // - exposed util methods.
        // - NOTE: these are not considered part of the public API -
        //   avoid relying on them unless you are aware of the risk.
        Vue.util = {                                        // {4-17}
            warn,
            extend,
            mergeOptions,
            defineReactive
        };

        Vue.set = set;                                      // {4-18}
        Vue.delete = del;                                   // {4-19}
        Vue.nextTick = nextTick;                            // {4-20}

        // - 2.6 explicit observale API. 显示可观察的 API
        // - TIP: 这里的方法对比源码简化了 flow 检查, 因为写了 flow 检查不符合 js
        //   语法, 没有高亮了.
        Vue.observable = (Obj) => {                         // {4-21}
            observe(obj);                                   // {4-22}
            return obj;                                     // {4-23}
        };

        Vue.optionts = Object.create(null);                 // {4-24}
        ASSET_TYPES.forEach(type => {                       // {4-25}
            Vue.options[type + 's'] = Object.create(null);  // {4-26}
        });

        // - this is used to identify the "base" constructor to extend all
        //   plain-object components with in Weex's multi-instance scenarios.
        Vue.prototype._base = Vue;                          // {4-27}

        extend(Vue.options.components, builtInComponents);  // {4-28}

        initUse(Vue);                                       // {4-29}
        initMixin(Vue);                                     // {4-30}
        initExtend(Vue);                                    // {4-31}
        initAssetRegisters(Vue);                            // {4-32}
    }

  ```
  这段代码的作用是在 `Vue` 构造函数上添加 `config` 属性,
  这个属性的添加方式类似我们前面看到的 `$data` 以及 `$props`, 也是一个只读的属性,
  并且当你试图设置其值时, 在非生产环境下会给你一个友好的提示.

  那 `Vue.config` 的值是什么呢? 在 `src/core/global-api/index.js`
  文件的开头有这样一句:
  ```js
    import config from '../config';
  ```
  所以 `Vue.config` 代理的是从 `core/config.js` 文件导出的对象.

  接着是这样一段代码:
  ```js
    
  ```
  在 Vue 上添加了 `util` 属性, 这个属性是一个对象, 这个对象拥有 4 个属性分别是: `warn`,
  `extend`, `mergeOptions` 以及 `defineReactive`. 这 4 个属性来自于
  `core/util/index.js` 文件.

  接着就是上面的一段注释, 大概意思是 `Vue.util` 以及 `util` 下的 4
  个方法都不被认为是公共 API 的一部分, 要避免依赖他们, 但是你依然可以使用,
  只不过风险你要自己控制. 并且, 在官方文档上也没有介绍这个全局 API, 所以能不用尽量不要用.

  接着在 `src/core/global-api/index.js` 内是这样一段代码:
  ```js
   
  ```
  这段代码比较简单, 在 `Vue` 上添加了 4 个属性分别是 `set`, `delete`, `nextTick`
  以及 `options`, 这里要注意的是 `Vue.options`, 现在它还只是一个空的对象, 通过
  `Object.create(null)` 创建.

  不过接下来, `Vue.options` 就不是一个空的对象了, 因为下面这段代码:
  ```js
  
  ```
  `Vue.options` 将变成这样:

  ```js
    Vue.options = {
        components: Object.create(null),
        directives: Object.create(null),
        filters: Object.create(null),
        _base: Vue
    }
  ```
  紧接着, 是这句代码:
  ```js
    extend(Vue.options.components, builtInComponents);
  ```
  `extend` 来自于 `shared/util.js` 文件, 可以在
  `../附录/shared/util.js 文件工具方法全解` 中查看其作用, 总之这句代码的意思就是将
  `builtInComponents` 的属性混合到 `Vue.options.components` 中, 其中
  `builtInComponents` 来自于 `core/components/index.js` 文件, 该文件如下:
  ```js
    import KeepAlive from './keep-alive';
    export default {
        KeepAlive
    }
  ```
  所以最终 `Vue.options.components` 的值如下:
  ```js
    Vue.options.components = {
        KeepAlive
    }
  ```
  那么到现在为止, `Vue.options` 已经变成了这样:
  ```js
    Vue.options = {
        components: {
            KeepAlive
        },
        directives: Object.create(null),
        filters: Object.create(null),
        _base: Vue
    }
  ```
  我们继续看代码, 在 `initGlobalAPI` 方法的最后部分, 以 `Vue` 为参数调用了 4 个
  `init*` 方法:
  ```js
    initUse(Vue);
    initMixin(Vue);
    initExtend(Vue);
    initAssetRegisters(Vue);
  ```
  这 4 个方法从上到下分别来自于:
    + `global-api/use.js`,
    + `global-api/mixin.js`,
    + `global-api/extend.js`,
    + `global-api/assets.js` 

  这 4 个方法, 我们不着急, 一个一个慢慢看, 先打开 `global-api/use.js` 文件,
  我们发现这个文件只有一个 `initUse` 方法, 如下:
  ```js
    /* @flow */
    import {toArray} from '../util/index';
    export function initUse(Vue: GlobalAPI) {
        Vue.use = function(plugin: Function | Object) {
            // - installed plguins 安装的插件
            const installedPlugins = (this._installedPlugins || (this._installedPlugins = []));
            if (installedPlugins.indexOf(plugin) > -1) {
              return this;
            }
  
            // - additional parameters; 附加参数
            const args = toArray(arguments, 1);
            // - `unshift()`: 在数组开头插入元素
            args.unshift(this);
            if (typeof plugin.install === 'function') {
                plugin.install.apply(plugin, args);
            } else if (typeof plugin === 'function') {
                plugin.apply(null, args);
            }
            installedPlguins.push(plugin);
            return this;
        }
    }
  ```


#### 2.3 Vue 平台化的包装
#### 2.4 with compiler