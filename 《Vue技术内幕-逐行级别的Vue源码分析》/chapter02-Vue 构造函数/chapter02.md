# Chapter02 -- Vue 构造函数

## 目录
- 2. Vue 构造函数
    + 2.1 Vue 构造函数的原型  
    + 2.2 Vue 构造函数的静态属性和方法 (全局 API)
    + 2.3 Vue 平台化的包装
    + 2.4 with compiler



## 生词 

- **entity ['ɛntəti] --n.实体, 存在.**
    + business entity 企业单位
    + economic entity 经济实体
    + entity and nonentity.存在和不存在.
    + the entities underlying physical form. 作为物质构造之基础的实体.
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
- **observable [əb'zɝvəbl] --adj.可观察的, 看得见的**
    + explicit observable API. 显示可观察的 API.    
- **prune [pruːn] --v.修剪，裁剪，修整，精简。 --n.梅干，干梅子**
    + It's not a prune tree. They pruned the tree. 不是梅树，是它们在修枝剪叶。
- **instantiation [in,stænʃieiʃən] --n.实例化; 实体化; 体现**
    + 在js 文件中创建 `new Object()` 时, WebStorm 会提示: 
      Object instantiation can be simplified. 对象实例化可以简化.
- **definition [defɪ'nɪʃ(ə)n] --n.定义，精确度**
    + definition of probability. 概率定义
    + It is by definition a complex object. 它本质上是个复杂的物体。
- **directive [dɪ'rektɪv] --n.指示，指令  --adj.指导的，管理的**
    + It's a directive straight from the President. 这是总统直接下达的指令。
- **specific [spə'sɪfɪk] --adj.具体的，特定的**
    + This is likely a problem with your specific environment.
      这可能是您特性环境的问题。
    + There was no specific plan in my mind. 我脑子里没有具体的计划。
    + Do you have specific request for packing? 你们对包装有特别的要求吗？
- **hydrate ['haɪdret] --n.水合物(结晶中有一定比例水分子成分的固体化合物).**
  **--vt&vi.(使)水合. 时态: hydrated, hydrating, hydrates**





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
  按照上面的套路, 继续打开 **`../src/core/instance/index.js`** 文件:
  ```js
    // - ../src/core/instance/index.js (全部代码)

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
- **(1)** 那么这 5 个方法又做了什么呢? 先看 `initMixin`, 打开 
  **`../src/core/instance/init.js`**文件, 找到 `initMixin` 方法, 如下: 
  ```js
    // - ../src/core/instance/init.js

    let uid = 0;
    export function initMixin(Vue: Class<Component>) {
        Vue.prototype._init = function (options?: Object) {
            const vm: Component = this;
            // - a uid
            vm._uid = uid++;

            let startTag, endTag;
            /* istanbul ignore if */
            if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
                startTag = `vue-perf-start:${vm._uid}`;
                endTag = `vue-perf-end:${vm._uid}`;
                mark(startTag);
            }

            // ... 剩余代码省略
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
        
        // - data define (定义 data)
        const dataDef = {};                             // {1-1}
        // - `this._data` 在当前文件内的 `initData()` 方法内有定义, 即:
        //   let data = vm.$options.data
    	  //   data = vm._data = typeof data === 'function'
        //        ? getData(data, vm)
        //        : data || {}`
        dataDef.get = function() {return this._data};   // {1-2}
        // - props define (定义 props)
        const propsDef = {};                            // {1-3}
        propsDef.get = function() {return this._props}; // {1-4}
        if (process.env.NODE_ENV !== 'production') {    // {1-5}
            dataDef.set = function(newData: Object) {   // {1-6}
                // - 避免替换根实例 $data, 改用嵌套数据属性
                warn(                                   // {1-7}
                    'Avoid replacing instance root $data. ' + 
                    'Use nested data properties instead.',
                    this
                )
            };
          propsDef.set = function() {                   // {1-8}
                warn(`$props is readonly.`, this);      // {1-9}
            }
        }
        Object.defineProperty(Vue.prototype, '$data', dataDef);     // {1-10}
        Object.defineProperty(Vue.prototype, '$props', propsDef);   // {1-11}
  
        // - `set` 和 `del` 是在 `../src/core/observer/index.js` 中定定义的
        //   方法(倒数第 2 和倒数第 3 个)
        Vue.prototype.$set = set;                       // {1-12}
        Vue.prototype.$delete = del;                    // {1-13}
  
        Vue.prototype.$watch = function(                // {1-14}
             expOrFn: string | Function,
             cb: any,
             options?: Object
        ): Function {
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
            return function unwatchFn() {
                watcher.teardown();
            }
        }
    }
  ```
  我们先看 `行{1-10}` 和 `行{1-11}`, 使用 `Object.defineProperty` 在
  `Vue.prototype` 上定义了两个属性, 就是大家熟悉的 `$data` 和 `$props`,
  这两个属性的定义分别写在了 `dataDef` 以及 `propsDef` 这两个对象里, 
  我们来仔细看一下这两个对象的定义, 首先是 `get`(即 `行{1-2}` 和 `行{1-4}`),
  可以看到, `$data` 属性实际上代理的是 `_data` 这个属性,
  而 `$props` 代理的是 `props` 这个实例属性. 然后 `行{1-5}` 为是否为生产环境的判断,
  如果不是生产环境的话, 就为 `$data` 和 `$props` 这两个属性设置一下 `set`,
  实际上就是提示你一下: 请勿修改, `$data` 和 `$props` 是两个只读的属性.

  所以, 现在让你使用 `js`实现一个只读的属性, 你应该知道要怎么做了.
  
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
        };

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
- 到目前为止, **`core/instance/index.js`** 文件, 也就是 `Vue`
  的出生文件的代码我们就看完了, 按照之前我们寻找 `Vue` 构造函数时的文件路径回溯,
  下一个我们要看的文件应该就是 `core/index.js` 文件 (Note: 即上面的 `{flag 1}`), 
  这个文件将 `Vue` 从 `src/core/instance/index.js` 文件中导入进来, 我们打开
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
    //   `../src/core/global-api/index.js` 文件.
    initGlobalAPI(Vue);                                 // {3-5}
  
    // - 在 Vue.prototype 上添加 $isServer 属性, 该属性代理了来自
    //   `core/util/env.js` 文件的 isServerRendering 方法.
    Object.defineProperty(Vue.prototype, '$isServer', { 
        get: isServerRendering
    });                                                // {3-6}
  
    // - 在 Vue.prototype 上添加 $ssrContext 属性
    Object.defineProperty(Vue.prototype, '$ssrContext', {
        get() {
            // - istanbul ignore next.
            // - TIP: Istanbul 是 JS 程序的代码覆盖率工具.
            //   `/* istanbul ignore next */` 注释语法, 允许某些代码不计入覆盖率.
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

        // - exposed util methods. (导出 util 方法.)
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

        // - 2.6 explicit observable API. (显示可观察的 API.)
        // - TIP: 这里的方法对比源码简化了 flow 检查, 因为写了 flow 检查不符合 js
        //   语法, 没有高亮了.
        Vue.observable = (Obj) => {                         // {4-21}
            observe(obj);                                   // {4-22}
            return obj;                                     // {4-23}
        };

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

        // - this is used to identify the "base" constructor to extend all
        //   plain-object components with in Weex's multi-instance scenarios.
        Vue.options._base = Vue;                          // {4-27}

        extend(Vue.options.components, builtInComponents);  // {4-28}

        initUse(Vue);                                       // {4-29}
        initMixin(Vue);                                     // {4-30}
        initExtend(Vue);                                    // {4-31}
        initAssetRegisters(Vue);                            // {4-32}
    }

  ```
  `行{4-12}` 到 `行{4-16}` 的作用是在 `Vue` 构造函数上添加 `config` 属性,
  这个属性的添加方式类似我们前面看到的 `$data` 以及 `$props`, 也是一个只读的属性,
  并且当你试图设置其值时, 在非生产环境下会给你一个友好的提示.

  那 `Vue.config` 的值是什么呢? 在 `src/core/global-api/index.js`
  文件的开头有这样一句: 即 `行{4-1}`
  所以 `Vue.config` 代理的是从 `core/config.js` 文件导出的对象.

  `行{4-17}` 在 Vue 上添加了 `util` 属性, 这个属性是一个对象, 这个对象拥有 4
  个属性分别是: `warn`,`extend`, `mergeOptions` 以及 `defineReactive`.
  这 4 个属性来自于 `src/core/util/index.js` 文件.

  `行{4-17}` 上面的一段注释, 大概意思是 `Vue.util` 以及 `util` 下的 4
  个方法都不被认为是公共 API 的一部分, 要避免依赖他们, 但是你依然可以使用,
  只不过风险你要自己控制. 并且, 在官方文档上也没有介绍这个全局 API, 所以能不用尽量不要用.

  接着 `行{4-18}`, `行{4-19}`, `行{4-20}`, `行{4-24}` 在 `Vue`
  构造函数上添加了 4 个属性分别是 `set`, `delete`, `nextTick` 以及 `options`,
  注意 `Vue.options` 默认是通过 `Object.create(null)` 创建的一个空对象.

  不过接下来通过 `行{4-25}` 和 `行{4-26}` 后 `Vue.options` 将变成这样:
  ```js
    Vue.options = {
        components: Object.create(null),
        directives: Object.create(null),
        filters: Object.create(null),
        _base: Vue
    }
  ```
  紧接着是 `行{4-28}`, `extend` 来自于 `../src/shared/util.js` 文件,
  (Note: 进入 util.js 中查看 extend() 方法的源码可以看到, extend()
  就是很多库中实现的 Mixin(混合) 方法, 详见:
  `第2部分--设计模式/chapter08-发布-订阅模式/8.5-6-发布订阅模式通用实现.html`)
  可以在
  [附录/shared/util.js-文件工具方法全解.md](../附录/shared/util.js-文件工具方法全解.md)
  中查看其作用, 总之这句代码的意思就是将 `builtInComponents` 的属性混合到
  `Vue.options.components` 中, 其中 `builtInComponents` 来自于
  `../src/core/components/index.js` 文件, 该文件如下:
  ```js
    // - ../src/core/components/index.js (全部代码)

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
    Vue.options = {                     // {flag: 00-1}
        components: {
            KeepAlive
        },
        directives: Object.create(null),
        filters: Object.create(null),
        _base: Vue
    }
  ```
  我们继续看代码, 在 `../src/core/global-api/index.js` 内 
  `initGlobalAPI` 方法的最后部分, 以 `Vue` 为参数调用了 4 个
  `init*` 方法, 即 `行{4-29}`, `行{4-30}`, `行{4-31}` 和 `行{4-32}`, 
  这 4 个方法从上到下分别来自于:
    + `../src/core/global-api/use.js`,
    + `../src/core/global-api/mixin.js`,
    + `../src/core/global-api/extend.js`,
    + `../src/core/global-api/assets.js` 

  这 4 个方法, 我们一个一个看, 先打开 `../src/core/global-api/use.js` 文件,
  我们发现这个文件只有一个 `initUse` 方法, 如下:
  
  ```js
  // - ../src/core/global-api/use.js (全部代码)
  
    /* @flow */
    import {toArray} from '../util/index';                      // {5-1} 
    export function initUse(Vue: GlobalAPI) {                   // {5-2}
        Vue.use = function(plugin: Function | Object) {         // {5-3}
            // - installed plugins 安装的插件
            const installedPlugins = 
                (this._installedPlugins || (this._installedPlugins = [])); // {5-4}
            if (installedPlugins.indexOf(plugin) > -1) {        // {5-5}
              return this;
            }
  
            // - additional parameters; 附加参数
            const args = toArray(arguments, 1);                 // {5-6}
            // - `unshift()`: 在数组开头插入元素
            args.unshift(this);                                 // {5-7}
            if (typeof plugin.install === 'function') {         // {5-8}
                plugin.install.apply(plugin, args);             // {5-9}
            } else if (typeof plugin === 'function') {          // {5-10}
                plugin.apply(null, args);                       // {5-11}
            }
            installedPlugins.push(plugin);                      // {5-12}
            return this;                                        // {5-13}
        }
    }
  ```
  该方法的作用是在 `Vue` 构造函数上添加 `use` 方法, 也就是传说中的 `Vue.use`
这个全局 API, 这个方法大家应该不会陌生, 用来安装 `Vue` 插件.
  
  再打开 `../src/core/global-api/mixin.js` 文件, 这个文件更简单, 代码如下:
  ```js
  // - ../src/core/global-api/mixin.js (全部代码)
  
    /* @flow */
  import {mergeOptions} from '../util/index';                 // {6-1}
  
    export function initMixin(Vue: GlobalAPI) {                 // {6-2}
        Vue.mixin = function(mixin: Object) {                   // {6-3}
            this.options = mergeOptions(this.options, mixin);   // {6-4}
            return this;
        }
    }
  ```
  其中, `行{6-2}` 方法的作用是, 其内部 `行{6-2}` 在 `Vue` 构造函数上添加
`mixin` 静态方法, 这个全局 API.
  
  继续打开 `global-api/extend.js` 文件, 找到 `initExtend` 方法, 如下:
  ```js
  // - ../src/core/global-api/extend.js (全部代码)
  
    /* @flow */
    import {ASSET_TYPES} from 'shared/constants';                   // {7-1}
    import {defineComputed, proxy} from '../instance/state';        // {7-2}
  import {extend, mergeOptions, validateComponentName} from '../util/index'; // {7-3}
  
    // - inital extend 初始化扩展
    export function initExtend (Vue: GlobalAPI) {                   // {7-4}
        // - Each instance constructor, including Vue, has a unique cid,
        //   The enables us to create wrapped "child constructors" for 
        //   prototypal inheritance and cache them.
        // - 每个实例构造函数(包括 Vue), 都有一个唯一的 cid, 它可以为原型继承创建包装的
        //   "子构造函数" 并对其进行缓存.
        Vue.cid = 0;                                                // {7-5}
      let cid = 1;                                                // {7-6}
  
        // - Class inheritance (类继承)
        Vue.extend = function(extendOptions: Object): Function {    // {7-7}
            extendOptions = extendOptions || {};                    // {7-8}
            const Super = this;                                     // {7-9}
            const SuperId = Super.cid;                              // {7-10}
            const cachedCtors = 
                extendOptions._Ctor || (extendOptions._Ctor = {});  // {7-11}
            if (cachedCtors[SuperId]) {                             // {7-12}
                return cachedCtors[SuperId];                        // {7-13}
          }
  
            const name = extendOptions.name || Super.options.name;  // {7-14}
            if (process.env.NOED_ENV !== 'production' && name) {    // {7-15}
                validateComponentName(name);                        // {7-16}
          }
  
            const Sub = function VueComponent(options) {            // {7-17}
                this._init(options);                                // {7-18}
            };
            // - 利用 Object.create() 方法克隆一个对象, 其原型为 Super.prototype
            Sub.prototype = Object.create(Super.prototype);         // {7-19}
            Sub.prototype.constructor = Sub;                        // {7-20}
            Sub.cid = cid++;                                        // {7-21}
            Sub.options = mergeOptions(                             // {7-22}
                Super.options,
                extendOptions
            );
          Sub['super'] = Super;                                   // {7-23}
  
            // - For props and computed properties, we define the proxy
            //   getters on the Vue instances at extension time, on the
            //   extended prototype. This avoids Object.defineProperty calls
            //   for each instance created. 
            // - 对于 props 和 可计算属性, 我们在扩展时在 Vue 实例上定义了代理获取器,
            //   它实际是在扩展的原型上. 这样可以避免为每个创建的实例调用
            //   Object.defineProperty.
            if (Sub.prototype.props) {                              // {7-24}
                initProps(Sub);                                     // {7-25}
            }
            if (Sub.options.computed) {                             // {7-26}
                initComputed(Sub);                                  // {7-27}
          }
  
            // - allow further extension/mixin/plugin usage.
            // - 允许进一步扩展/混合/插件使用.
            Sub.extend = Super.extend;                              // {7-28}
            Sub.mixin = Super.mixin;                                // {7-29}
          Sub.use = Super.use;                                    // {7-30}
  
            // - create asset registers, so extended classes can have their
            //   private assets too. (创建资产注册, 因此扩展库也可以有它们的私有资产.)
            ASSET_TYPES.forEach(function(type) {                    // {7-31}
                Sub[type] = Super[type]                             // {7-32}
            });
            // - enable recursive self-lookup. (启用递归自查)
            if (name) {                                             // {7-33}
                Sub.options.components[name] = Sub;                 // {7-34}
          }
  
            // - keep a reference to the super options at extension time.
            //   later at instantiation we can check if Super's options have
            //   been updated.
            // - 在扩展时保留对父级选项的引用. 稍后在实例化时, 我们可以检查 Super
            //   的选项是否已更新.
            Sub.superOptions = Super.optoins;                       // {7-35}
            Sub.extendOptions = extendOptions;                      // {7-36}
            Sub.sealedOptions = extend({}, Sub.options);            // {7-37}
            
            // - cache constructor (缓存构造函数)
            cachedCtors[SuperId] = Sub;                             // {7-38}
            return Sub;                                             // {7-39}
        }
  }
  
    function initProps(Comp) {                                      // {7-40}
        const props = Comp.options.props;                           // {7-41}
        for (const key in props) {                                  // {7-42}
            proxy(Comp.prototype, `_props`, key);                   // {7-43}
        }
  }
  
    function initComputed(Comp) {                                   // {7-44}
        const computed = Comp.options.computed;                     // {7-45}
        for (const key in computed) {                               // {7-46}
            defineComputed(Comp.prototype, key, computed[key]);     // {7-47}
        }
    }
  ```
  `initExtend` 即 `行{7-4}` 方法在 `Vue` 上添加了 `Vue.cid` 静态属性, 和
`Vue.extend` 静态方法.
  
  最后一个是 `initAssetRegisters`(即: `行{4-32}`), 我们打开
  `src/core/global-api/assets.js` 文件, 找到 `initAssetRegisters` 方法如下:
  ```js
  // - ../src/core/global-api/assets.js  (全部代码)
  
    import {ASSET_TYPES} from 'shared/constants';                   // {8-1}
  import {isPlainObject, validateComponentName} from '../util/index'; // {8-2}
  
    export function initAssetRegisters(Vue: GlobalAPI) {            // {8-3}
        // - Create asset registration methods. (创建资产注册方法)
        ASSET_TYPES.forEach(type => {                               // {8-4}
            Vue[type] = function(                                   // {8-5}
                id: string,
                defination: Function | Object
            ): Function | Object | void {
                if (!definition) {                                  // {8-6}
                    return this.options[type + 's'][id];            // {8-7}
                } else {
                    // - istanbul ignore if 
                    if (process.env.NODE_ENV !== 'production'
                        && type === 'component') {                  // {8-8}
                        validateComponentName(id);                  // {8-9}
                    }
                    if (type === 'component' 
                        && isPlainObject(definition)) {             // {8-10}
                        definition.name = definition.name || id;    // {8-11}
                        definition = this.options._base.extend(definition); // {8-12}
                    }
                    if (type === 'directive'
                        && typeof definition === 'function') {      // {8-13}
                        definition = {bind: defintion, update: definition}; // {8-14}
                    }
                    this.options[type + 's'][id] = definitoin;      // {8-15}
                    return definition;
                }
            }
        })
    }
  ```
  其中, `ASSET_TYPES` 我们已经见过了, 它在 `../src/shared/constants.js` 文件中,
  长成这样, 即下面代码的 `行{9-2}`:
  ```js
    // - ../src/shared/constants.js  (全部代码)
    export const SSR_ATTR = 'data-server-rendered';     // {9-1}
    export const ASSET_TYPES = [                        // {9-2}
        'component',
        'directive',
        'filter'
    ];
    export const LIFECYCLE_HOOKS = [                    // {9-3}
        'beforeCreate',
        'created',
        'beforeMount',
        'mounted',
        'beforeUpdate',
        'updated',
        'beforeDestroy',
        'destroyed',
        'activated',
        'deactivated',
        'errorCaptured',
        'ssrPrefetch'
    ];
  ```
  所以, 最终经过 `initAssetRegisters` 方法, `Vue` 又多了 3 个静态方法:
  ```js
    Vue.component;
    Vue.directive;
    Vue.filter;
  ```
这 3 个静态方法大家都不陌生, 分别用来全局注册组件, 指令和过滤器.
  
  这样, `initGlobalAPI` 方法的全部功能我们就介绍完毕了, 它的作用就像它的名字一样,
  是在 `Vue` 构造函数上添加全局的 API, 类似整理 `Vue.prototype` 上的属性和方法一样,
  我们同样对 `Vue` 静态属性和方法做了一个整理, 将他放到 `附录/Vue构造函数整理-全局API`
中, 便于以后查阅.
  
  至此, 对于 `core/index.js` 文件的作用我们也大概清楚了, 在这个文件里, 它首先将核心的
  `Vue`, 即在 `../src/core/instance/index.js` 文件中创建,
  然后经历 5 个方法给原型添加属性和方法后的 `Vue` 导入, 然后使用 `initGlobalAPI`
  方法给 `Vue` 添加静态方法和属性, 除此之外, 在这个文件里, 也对原型进行了修改,
  为其添加了 2 个属性: `$isServer` 和 `$ssrContext`, 最后添加了 `Vue.version`
  属性并导出了 `Vue`. 

#### 2.3 Vue 平台化的包装
- 现在，在上面我们理清 Vue 构造函数的过程中已经看了两个主要的文件, 它们分别是:
  `src/core/instance/index.js` 文件以及 `src/core/index.js` 文件,
  前者是 Vue 构造函数的定义文件, 主要作用是定义 Vue 构造函数, 并对其原型添加属性和方法,
  即实例属性和实例方法. `src/core/index.js` 主要作用是为 Vue 添加全局的API,
  也就是静态的方法和属性. 这两个文件有个共同点，就是它们都在 `core` 目录下,
  我们在介绍 `Vue` 项目目录结构的时候说过: `core` 目录存放的是与平台无关的代码,
  所以无论是 `src/core/instance/index.js` 文件还是 `src/core/index.js` 文件,
  它们都在包装核心的 Vue, 且这些包装是与平台无关的. 但是 Vue 是一个 Multi-platform
  的项目 (`web`和`weex`), 不同平台可能会内置不同的组件、指令, 或者一些平台特有的功能等等,
  那么这就需要对 Vue 根据不同的平台进行平台化地包装, 这就是接下来我们要看的文件,
  这个文件也出现在我们寻找 Vue 构造函数的路线上, 它就是:
  `src/platforms/web/runtime/index.js` 文件。

  在看这个文件之前，大家可以先打开 `platforms` 目录,可以发现有两个子目录 `web` 和
  `weex`. 这两个子目录的作用就是分别为相应的平台对核心的 Vue 进行包装的.
  而我们所要研究的 web 平台，就在 `web` 这个目录里。

  接下来, 我们就打开 `src/platforms/web/runtime/index.js` 文件, 看一看里面的代码,
  这个文件的一开始是一大堆 `import` 语句，其中就包括从 `src/core/index.js`
  文件导入 `Vue` 的那句。
  ```js
    // - src/platforms/web/runtime/index.js (全部代码)

    /* @flow */
    import Vue from 'core/index';                               // {10-1}
    import config from 'core/config';                           // {10-2}
    import {extend, noop} from 'shared/util';                   // {10-3}
    import {mountComponent} from 'core/instance/lifecycle';     // {10-4}
    import {devtools, inBrowser} from 'core/util/index';        // {10-5}

    import {
        query,
        mustUseProp,
        isReservedTag,
        isReservedAttr,
        getTagNamespace,
        isUnknownElement
    } from 'web/util/index';                                    // {10-6}

    import {path} from './patch';                               // {10-7}
    import platformDirectives from './directives/index';        // {10-8}
    import platfromComponents from './components/index';        // {10-9}

    // - install platform specific utils. (安装特定于平台的工具)
    Vue.config.mustUseProp = mustUseProp;                       // {10-10}
    Vue.config.isReservedTag = isReservedTag;                   // {10-11}
    Vue.config.isReservedAttr = isReservedAttr;                 // {10-12}
    Vue.config.getTagNamespace = getTagNamespace;               // {10-13}
    Vue.config.isUnknownElement = isUnknownElement;             // {10-14}

    // - install platform runtime directives & components.
    // - 安装平台运行时指令和组件
    extend(Vue.options.directives, platformDirectives);         // {10-15}
    extend(Vue.options.components, platformComponents);         // {10-16}

    // - install platform patch function. 安装平台补丁功能
    Vue.prototype.__patch__ = inBrowser ? patch : noop;         // {10-17}

    // - public mount method. 公共安装方法
    Vue.prototype.$mount = function(                            
        el?: string | Element,  
        hydrating?: boolean
    ): Component {                                              // {10-18}
        el = el && inBrowser ? query(el): undefined;            // {10-19}
        return mountComponent(this, el, hydrating)              // {10-20}
    }

    // - devtools global hook. devtools 全局钩子
    /* istanbul ignore next. */
    if (inBrowser) {                                            // {10-21}
        setTimeout(() => {                                      // {10-22}
            if (config.devtools) {                              // {10-23}
                if (devtools) {                                 // {10-24}
                    devtools.emit('init', Vue);                 // {10-25}
                } else if (                                     
                    process.env.NODE_ENV !== 'production'      
                    && process.env.NODE_ENV !== 'test'         
                ) {                                             // {10-26}
                    console[console.info ? 'info': 'log'](
                        'Download the Vue Devtools extension for a better' +
                        'development experence: \n' +
                        'https://github.com/vuejs/vue-devtools'
                    )
                }
            }
            if (                                    
                process.env.NODE_ENV !== 'production'
                && process.env.NODE_ENV !== 'test'
                && config.productionTip !== false
                && typeof console !== 'undefined'
            ) {                                                 // {10-27}
                console[console.info ? 'info': 'log'](
                    `You are running Vue in development mode.\n` +
                    `Make sure to turn on production mode when deploying` +
                    `for production.\n` +
                    `See more tips at https://vuejs.org/guide/deployment.html`
                )
            }
        }, 0)
    }
    exprot default Vue;
  ```
  在 `import` 语句下面的 5 行, 即 `行{10-10}`, `行{10-11}`, `行{10-12}`,
  `行{10-13}`, `行{10-14}`, (TIP: 在上面的 `行{4-16}` 定义的 `Vue.config`),
  我们滑动到上面的 `../src/core/global-api/index.js` 源码出, 可以看到内部
  `Vue.cofig`代理的值是从 `src/core/config.js` 文件导出的对象,
  这个对象最开始长成这样:
  ```js
    // - ../src/core/config.js 
    Vue.config = {
        // - user
        optionMergeStrategies: Object.create(null),
        silent: false,
        productionTip: process.env.NODE_ENV !== 'production',
        performance: false,
        devtools: process.env.NODE_ENV !== 'production',
        errorHandler: null,
        warnHandler: null,
        ignoredElements: [],
        keyCodes: Object.create(null),

        // - platform
        isReservedTag: no,
        isReservedAttr: no,
        parsePlatformTagName: identity,
        isUnknownElement: no,
        getTagNamespace: noop,
        mustUseProp: no,

        // - legacy
        _lifecycleHooks: LIFECYCLE_HOOKS
    }
  ```
  我们可以看到, 从 `src/core/config.js` 文件导出的 `config` 对象, 
  大部分属性都是初始化了一个初始值, 并且我们在 `src/core/config.js`
  文件中能看到很多这样的注释，如下图: `图丢失......`

  `This is platform-dependent and may be overwritten.`, 这句话的意思是
  这个配置是与平台有关的，很可能会被覆盖掉。这个时候我们再回来看 `行{10-10}`,
  `行{10-11}`, `行{10-12}`, `行{10-13}`, `行{10-14}`; 其实就是在覆盖默认导出的
  `config` 对象的属性, 注释已经写的很清楚了, 安装平台特定的工具方法,
  至于这些东西的作用这里我们暂且不说, 你只要知道它在干嘛即可.

  接着是 `行{10-15}` 和 `行{10-16}` 安装特定平台运行的 指令(directive) 和
  组件(component), 大家现在还记得 `Vue.options` 长什么样吗? 在执行这两行代码之前,
  它长这样: (即: 上面的 `{flag 00-1}`)
  
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
  `extend` 方法上面已经见过了, 这里就不说明其作用了, 可以查看
  [附录/shared/util.js文件工具方法全解.md](../附录/shared/util.js文件工具方法全解.md)
  , 那么经过 `行{10-15}` 和 `行{10-16}` 两行代码之后的 `Vue.options` 长什么样呢?
  要想知道这个问题, 我们就要知道 `platformDirectives` 和 `platformComponents`
长什么样.
  
  根据上面代码开头的 `import` 导入语句 `行{10-8}` 和 `行{10-9}` 我们知道,
  这 2 个变量来自于 `../src/platforms/web/runtime/directives/index.js`
  和 `../src/platforms/web/runtime/components/index.js` 文件, 我们先打开
  `directives/index.js` 文件:
  
  ```js
    // - ../src/platforms/web/runtime/directives/index.js (全部代码)
    import model from './model';
    import show from './show';
    export default {
        model,
        show
    }
  ```
  也就是说, `platformDirectives` 是:
  ```js
    platformDirectives = {
        model,
        show
    }
  ```
  所以, 经过 `行{10-15}` 即 `extend(Vue.options.directives, platformDirectives)`
  之后, `Vue.options` 将变为:
  ```js
    Vue.options = {
        components: {
            KeepAlive
        },
        directives: {
            model,
            show
        },
        filters: Object.create(null),
        _base: Vue
    }
  ```
  同样的道理, 下面是 `../src/platforms/web/runtime/components/index.js`
  的全部代码:
  ```js
    // - ../src/platforms/web/runtime/components/index.js (全部代码)
  import Transition from './transition';
    import TransitionGroup from './transition-group';
  
    export default {
        Transition,
        TransitionGroup
    };
  ```
  所以 `platformComponents` 的值为:
  ```js
    platformComponents = {
        Transition,
        TransitionGroup
    }
  ```
  那么经过 `行{10-16}` 即 `extend(Vue.options.components, platformComponents)`
  之后, `Vue.options` 将变为:
  ```js
    Vue.options = {
        // - TIP: 在上面的 `行{4-28}` 中我们就已经初始化了 Vue.options.components,
        //   并给其添加了一个来自 `src/core/components/index.js` 中导入的
        //   KeepAlive 属性.
        components: {
            KeepAlive,
            Transition,
            TransitionGroup
        },
        directives: {
            model,
            show
        },
        filters: Object.create(null);
        _base: Vue
    }
  ```
  我们继续往下看, `行{10-17}`是在 `Vue.prototype` 上添加 `__patch__` 方法, 
  如果在浏览器环境运行的话, 这个方法的值为 `patch` 函数, 否则是一个空函数 `noop`. 
然后又在 `Vue.prototype` 上添加了 `$mount`方法 (即: `行{10-18}`, `行{10-19}`,
  `行{10-20}`), 我们暂且不关心 `$mount` 方法的内容和作用.
  

再往下的一段代码是 `Vue-devtools` 的全局钩子, 它被包裹在 `setTimeout` 中,
  最后导出了 `Vue`. (即: `行{10-21} ~ 行{10-27}`).

  现在我们就看完了 `platforms/web/runtime/index.js` 文件, 该文件的作用是对 `Vue`
  进行平台化包装:
    + 设置平台化的 `Vue.config`.
    + 在 `Vue.options` 上混合了 2 个指令 (`directives`), 分别是 `model` 和 `show`.
    + 在 `Vue.options` 上混合了 2 个组件 (`components`), 分别是 `Transition`
    和 ` TransitionGroup`.
    + 在 `Vue.prototype` 上添加了 2 个方法: `__patch__` 和 `$mount`.

  经过这个文件之后, `Vue.options`, `Vue.config` 和 `Vue.prototype` 都有所变化,
  我们把这些变化更新到对应的 [附录]("../附录") 文件里, 都可以查看的到.

#### 2.4 with compiler
- 在看完上面的 `src/platforms/web/runtime/index.js` 文件之后, 其实 `运行时` 版本的
  `Vue` 构造函数就已经 "成型了". 我们可以打开 `src/platforms/entry-runtime.js`
  这个入口文件, 这个文件只有 2 行代码:
  ```js
    // - src/platforms/entry-runtime.js (全部代码)
    import Vue from './runtime/index';
    export default Vue;
  ```
  可以发现, `运行时` 版的入口文件, 导出的 `Vue` 就到
  `/src/platforms/web/runtime/index.js` 文件为止. 然而我们所选择的并不仅仅是运行时版,
  而是完整版的 `Vue`, 入口文件是 `entry-runtime-with-compiler.js`,
  我们知道完整版和运行时版的区别就在于 `compiler`, 
  所以其实在我们看这个文件的代码之前也能够知道这个文件的作用:
  *就是在运行时版的基础上添加 `compiler`*, 对没错, 这个文件就是干这个的,
  接下来我们就看看它是怎么做的, 打开 `entry-runtime-with-compiler.js` 文件:
  ```js
    // - ../src/platform/web/entry-runtime-with-compiler.js  (简化)

    import config from 'core/config';
    import {warn, cached} from 'core/util/index';
    import {mark, measure} from 'core/util/perf';

    // - 导入 运行时 的 Vue 
    import Vue from './runtime/index';

    import {query} from './util/index';

    // - 从 `src/platforms/web/compiler/index.js` 文件导入 compileToFunctions
    import {compileToFunctions} from './compiler/index';

    import {shouldDecodeNewlines, shouldDecodeNewlinesForHref} from './util/compat';

    // - 根据 id 获取元素的 innerHTML
    const idToTemplate = cached(id => {
        const el = query(id);
        return el && el.innerHTML;
    });

    // - 使用 mount 变量缓存 Vue.prototype.$mount 方法
    const mount = Vue.prototype.$mount;
    // + 重写 Vue.prototype.$mount 方法
    Vue.prototype.$mount = function(
        el?: string | Element,
        hydrating?: boolean
    ): Component {
        // ... 函数体省略
    }

    // - 获取元素的 outerHTML: 
    // - (NOTE: 在读模式下, outerHTML 返回调用它的元素及所有子节点的 HTML 标签.
    //   在写模式下, outerHTML 会根据指定的 HTML 字符串创建新的 DOM 子树，
    //   然后用这个 DOM 子树完全替换调用元素.)
    function getOuterHTML (el: Element): stirng {
        if (el.outerHTML) {
            return el.outerHTML;
        } else {
            const container = document.createElement('div');
            container.appendChild(el.cloneNode(true));
            return container.innerHTML;
        }
    }

    // - 在 Vue 上添加一个全局 API `Vue.compile` 其值为上面导入进来的
    //   compileToFunctions
    Vue.compile = compileToFunctions;

    // - 导出 Vue
    export default Vue;
  ```
  上面代码是简化过的, 但是保留了所有重要的部分, 该文件的开始是一堆 `import` 语句,
  其中重要的 2 句 `import` 语句就是添加注释的那两句, 一句是导入运行时的 `Vue`,
  一句是从 `src/platforms/web/compiler/index.js` 文件导入
  `compileToFunctions`, 并且在倒数第二句代码将其添加到 `Vue.compile` 上.
  
  然后定义了一个函数 `idToTemplate`, 这个函数的作用是: 获取拥有指定 `id` 
  属性的元素的 `innerHTML`.

  之后缓存了运行时版 `Vue` 的 `Vue.prototype.$mount` 方法，并且进行了重写。

  接下来又定义了 `getOuterHTML` 函数, 用来获取一个元素的 `outerHTML`。

  这个文件运行下来, 对 `Vue` 的影响有两个, 第一个影响是它重写了
  `Vue.prototype.$mount` 方法；第二个影响是添加了 `Vue.compile` 全局API,
  目前我们只需要获取这些信息就足够了, 我们把这些影响同样更新到 `附录` 对应的文件中,
  也都可以查看的到.

  到这里，`Vue` 神秘面具下真实的样子基本已经展现出来了. 
  现在深呼吸, 继续我们的探索吧!