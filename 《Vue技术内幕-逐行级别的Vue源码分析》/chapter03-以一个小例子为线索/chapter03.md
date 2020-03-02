# Chapter03 -- 一个小例子为线索

## 目录 (Catalog)
- 


## 生词 (New Words)
- **mark [mɑrk] --n.标记; 马克; 标志; 标识. --v.标志**
    + Mark the place on the map. (祈使句) 在地图上标出囊额地方.
    + Mark approval with a nod. 点头表示同意.
- **measure ['mɛʒɚ] --vt&vi.测量, 衡量, 计量. --n.措施, 测度, 度量.**



## 内容 (Content)
- 在上一节 `Vue` 构造函数中，我们整理了完整的 `Vue` 构造函数，包括`原型的设计`和
  `全局API`的设计，并且我们专门为其整理了`附录`，
  目的是便于查看相应的方法和属性是在哪里被添加的，同时也让我们对 `Vue`
  构造函数有一个大局观的认识。
  
  从这一章节开始，我们将逐渐走进 `Vue`，我们采用一种由浅入深，由宽到窄的思路，
  一开始我们会从宏观的角度来看 `Vue` 是如何设计的，然后再一点点“追究”进去，
  进而逐步搞清楚 `Vue` 为什么这么设计。

  而这一节，我们就致力于搞清楚：`Vue`的思路。我们将会从一个例子开始，这个例子非常简单，
  如下:
  ```js
    <div id='app'>{{test}}</div>
  ```
  和这样一段 `js` 代码:
  ```js
    var vm = new Vue({
        el: '#app',
        data: {
            test: 1
        }
    })
  ```
  这段 js 代码很简单，只是简单地调用了 Vue，传递了两个选项 `el` 以及 `data`。
  这段代码的最终效果就是在页面中渲染为如下 DOM：
  ```js
    <div id='app'>1</div>
  ```
  其中 `{{test}}` 被替换成了 `1`, 并且当我们尝试修改 `data.test` 值的时候
  ```js
    // - 控制台输入
    vm.$data.test = 2;
    // - 或
    vm.test = 2;
  ```
  那么页面的 `DOM` 也会随之变化为:
  ```js
    <div id='app'>2</div>
  ```
  看上去这个例子很简单(好吧，确实很简单)，但其实这么简单的例子已经足够我们搞清楚 `Vue`
  的思路了，当你明白 `Vue` 的思路之后，再去搞清楚其他的问题将会变得异常轻松。
  接下来我们就看看上面的例子中，到底发生了什么。

  首先我们要找到当我们调用 `Vue` 构造函数的时候，第一句执行的代码是什么，
  所以我们要找到 `Vue` 的构造函数，还记得 `Vue` 的构造函数定义在哪里吗？不记得没关系，
  只要查阅一下 `附录/Vue构造函数整理-原型` 就ok了，`Vue` 的构造函数定义在
  `src/core/instance/index.js` 文件中，我们找到它:
  ```js
    function Vue(options) {
        if (process.env.NODE_ENV !== 'production' && !(this instanceof Vue)) {
            warn('Vue is a constructor and should be called with the `new` keyword');
        }
        this._init(options); // {1}
    }
  ```
  一目了然，当我们使用 `new` 操作符调用 `Vue` 的时候，第一句执行的代码就是
  `this._init(options)` 方法，其中 `options` 是我们调用 `Vue` 构造函数时透传过来的，
  也就是说：
  ```js
    options = {
        el: '#app',
        data: {
            test: 1
        }
    }
  ```
  既然如此, 我们就找到 `_init` 方法, 打开
  `2.6-vue-source-document/src/core/instance/init.js`, 
  ```js
    // @flow

    // - `../src/core/config.js`
    import config from '../config';                                     // {1-1}
    
    // - `../src/core/intance/(proxy|state|render|events).js` 
    import {initProxy} from './proxy';                                  // {1-2}
    import {initState} from './state';                                  // {1-3}
    import {initrRender} from './render';                               // {1-4}
    import {initEvents} from './events';                                // {1-5}
    
    // - `../src/core/util/perf.js`
    import {mark, measure} from '../util/perf';                         // {1-6}
    
    // - `../src/core/intance/(lifecycle|inject).js` 
    import {initLifecycle, callHook} from './lifecycle';                // {1-7}
    import {initProvide, initInjections} from './inject';               // {1-8}
    
    // - `../src/core/util/index.js`
    import {
        extend, 
        mergeOptions, 
        formatComponentName
    } from '../util/index';                                             // {1-9}
    
    let uid = 0;                                                        // {1-10}
    
    // - init mixin (初始化 mixin)
    export function initMixin(Vue: Class<Comment>) {                    // {1-11}
        Vue.prototype._init = function(options?: Object) {              // {1-12}
            // - this 为当前 `Vue` 构造函数的实例
            const vm: Component = this;                                 // {1-13}
            
            // - a uid 
            // - 在当前构造函数的实例上添加一个唯一标识: `_uid` 属性, 每次实例化一个 `Vue`
            //   实例后, `uid` 的值都会 `++`.
            vm._uid = uid++;                                            // {1-14}
    
            let startTag, endTag;                                       // {1-15}
            /* istanbul ignore if */
            if (process.env.NODE_ENV !== 'production' && config.performance && mark) { // {1-16}
                startTag = `vue-perf-start:${vm._uid}`;                 // {1-17}
                endTag = `vue-perf-end:${vm._uid}`;                     // {1-18}
                mark(startTag);                                         // {1-19}
            }
            
            // - a flag to void this being observed.(添加一个标志避免 this 被观察到)
            vm._isVue = true;                                           // {1-20}
            // - merge options (合并 options)
            if (options && options._isComponent) {                      // {1-21}
                // - optimize internal component instantiation since dynamic
                //   options merging is pretty slow, and none of the internal
                //   component options needs special treatment.
                //   (优化内部组件实例化, 因为动态选项合并速度相当慢, 并且没有一个内部组件
                //   选项需要特殊处理.)
                initInternalComponent(vm, options);                     // {1-22}
            } else {
                vm.$options = mergeOptions(                             // {1-23}
                    resolveConstructorOptions(vm.constructor),          // {1-24}
                    optons || {},                                       // {1-25}
                    vm                                                  // {1-26}
                )
            }
            /* istanbul ignore else */
            if (process.env.NODE_ENV !== 'production') {                // {1-27}
                initProxy(vm)                                           // {1-28}
            } else {                                                    // {1-29}
                vm._renderProxy = vm                                    // {1-30}
            }
            // - expose real self
            vm._self = vm;                                              // {1-31}
            initLifecycle(vm);                                          // {1-32}
            initEvents(vm);                                             // {1-33}
            initRender(vm);                                             // {1-34}
            callback(vm 'beforeCreate');                                // {1-35}
            // - resolve injections before data/props
            initInjections(vm);                                         // {1-36}
            initState(vm);                                              // {1-37}
            // - resolve provide after data/props
            initProvide(vm);                                            // {1-38}
            callback(vm, 'created');                                    // {1-39}
    
            /* istanbul ignore if */
            if (process.env.NODE_ENV !== 'production' 
                && config.performance && mark) {                        // {1-40}
                vm._name = formatComponentName(vm, false);              // {1-41}
                mark(endTag);                                           // {1-42}
                measure(`vue ${vm._name} init`, startTag, endTag);      // {1-43}
            }
    
            if (vm.$options.el) {                                       // {1-44}
                vm.$mount(vm.$options.el);                              // {1-45}
            }
        }
    };

    // - init internal component (初始化内部组件)
    export function initInternalComponent(
        vm: Component, options: InternalComponentOptions
    ) {                                                                 // {1-46}
        const opts = vm.$options = Object.create(vm.constructor.options); // {1-47}
        // - doing this because it's faster than dynamic enumeration. 
        //   (这样做是因为它比动态枚举更快)
        const parentVnode = options._parentVnode;                       // {1-48}
        opts.parent = options.parent;                                   // {1-49}
        opts._parentVnode = parentVnode;                                // {1-50}
    
        const vnodeComponentOptions = parentVnode.componentOptions;     // {1-51}
        opts.propsData = vnodeComponentOptions.propsData;               // {1-52}
        opts._parentListeners = vnodeComponentOptions.listeners;        // {1-53}
        opts._renderChildren = vnodeComponentOptions.children;          // {1-54}
        opts._componentTag = vnodeComponentOptions.tag;                 // {1-55}
    
        if (options.render) {                                           // {1-56}
            opts.render = options.render;                               // {1-57}
            opts.staticRenderFns = options.staticRenderFns;             // {1-58}
        }
    };

    // - resolve constructor options (解析构造函数的 options)
    export function resolveConstructorOptions(Ctor: Class<Component>) { // {1-59}
        let options = Ctor.options;                                     // {1-60}
        if (Ctor.super) {                                               // {1-61}
            const superOptions = resolveConstructorOptions(Ctor.super); // {1-62}
            const cachedSuperOptions =  Ctor.superOptions;              // {1-63}
            if (superOptions !== cachedSuperOptions) {                  // {1-64}
                // - super option changed, need to resolve new options. 
                //   (父选项已变更, 需要细节新 options)
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

    // - resolve modified options (解析修改的选项)
    funciton resolveModifiedOptions(Ctor: Class<Component>): ?Object {  // {1-73}
        let modified;                                                   // {1-74}
        const latest = Ctor.options;                                    // {1-75}
        const sealed = Ctor.sealedOptions;                              // {1-76}
        for (const key in latest) {                                     // {1-77}
            if (latest[key] !== sealed[key]) {                          // {1-78}
                if (!modified) modified = {};                           // {1-79}
                modified[key] = latest[key];                            // {1-80}
            }
        }
        return modified;                                                // {1-81}
    }
  ```
  我们先找到 `Vue.prototype._init` 方法(`行{1-12}`), 其内部一开始是这样 2 句代码
  (`行{1-13}`, `行{1-14}`):
  
  ```js
    // - this 为当前 `Vue` 构造函数的实例
    const vm: Component = this;                                 // {1-13}
    
    // - a uid 
    // - 在当前构造函数的实例上添加一个唯一标识: `_uid` 属性, 每次实例化一个 `Vue`
    //   实例后, `uid` 的值都会 `++`.
    vm._uid = uid++;                                            // {1-14}
  ```
  首先声明了常量 `vm`，其值为 `this` 也就是当前这个 `Vue` 实例啦，
  然后在实例上添加了一个唯一标示：`_uid`，其值为 `uid`，`uid` 这个变量定义在
  `initMixin` 方法的上面(`行{1-10}`)，初始化为 `0`，可以看到每次实例化一个
  `Vue` 实例之后，`uid` 的值都会 `++`。

  所以实际 `_uid` 就是一个 `Vue` 实例的实例属性，在之后的分析中，
  我们将会在很多地方遇到很多的实例属性被逐渐添加到 `Vue` 实例上，
  所以我们同样整理了一个附录：`附录/Vue实例的设计` 来对 `Vue` 实例进行整理，
  就像我们对 `Vue` 构造函数的整理一样，大家可以在这里查阅。

  我们接着看下面一段:
  ```js
    let startTag, endTag
    /* istanbul ignore if */
    if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
        startTag = `vue-perf-start:${vm._uid}`
        endTag = `vue-perf-end:${vm._uid}`
        mark(startTag)
    }

    // 中间的代码省略...

    /* istanbul ignore if */
    if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
        vm._name = formatComponentName(vm, false)
        mark(endTag)
        measure(`vue ${vm._name} init`, startTag, endTag)
    }
  ```
  上面的代码中，我省略了这两段代码中间的内容，我们暂且只看这两段代码。首先声明两个变量
  `startTag` 和 `endTag`，然后这两段代码有一个共同点，即拥有相同的判断语句：
  ```js
    if (process.env.NODE_ENV !== 'production' && config.performance && mark)
  ```
  意思是：在非生产环境下，并且 `config.performance` 和 `mark` 都为真，
  那么才执行里面的代码，其中 `config.performance` 来自于 
  `src/core/config.js` 文件，我们知道 `Vue.config` 同样引用了这个对象，在 `Vue`
  的官方文档中可以看到如下内容：`图片丢失...`
  
  Vue 提供了全局配置 `Vue.config.performance`，我们通过将其设置为 `true`，
  即可开启性能追踪，你可以追踪四个场景的性能：
    + 1、组件初始化(`component init`)
    + 2、编译(`compile`)，将模板(`template`)编译成渲染函数
    + 3、渲染(`render`)，其实就是渲染函数的性能，
      或者说渲染函数执行且生成虚拟 `DOM` (`vnode`(virtual node))的性能
    + 4、打补丁(`patch`)，将虚拟`DOM` 渲染为真实`DOM`的性能

  其中组件初始化的性能追踪就是我们在 `_init` 方法中看到的那样去实现的，
  其实现的方式就是在初始化的代码的开头和结尾分别使用 `mark` 函数打上两个标记，
  然后通过 `measure` 函数对这两个标记点进行性能计算。`mark` 和 `measure` 
  这两个函数可以在`附录/src-core-util-目录下的工具方法全解` 中查看其作用和实现方式。

  此时大家应该对照着 `src/core/util/perf.js` 搞清楚 `mark` 和 `measure` 这两个方法了，
  通过 `core/util/perf.js` 文件的代码我们可知，只有在非生产环境，且浏览器必须支持
  `window.performance` API 的情况下才会导出有用的 `mark` 和 `measure` 函数，也就是说，
  如果你的浏览器不支持 `window.performance` 那么在 `src/core/instance/init.js`
  文件中导入的 `mark` 和 `measure` 就都是 `undefined`，也就不会执行 if 语句里面的内容。

  下面是 `src/core/util/perf.js` 文件的全部代码:
  ```js
    // - `src/core/util/env.js`
    import {inBrowser} from './env';

    export let mark;
    export let measure;

    if (process.env.NODE_ENV !== 'production') {
        const perf = inBrowser && window.performance;
        /* istanbul ignore if */
        if (
            perf &&
            perf.mark &&
            perf.measure &&
            perf.clearMarks &&
            perf.clearMeasure &&
        ) {
            mark = tag => perf.mark(tag);
            measure = (name, startTag, endTag) => {
                perf.measure(name, startTag, endTag);
                perf.clearMarks(startTag);
                perf.clearMarks(endTag);
                perf.clearMeasure(name);
            }
        }
    }
  ```