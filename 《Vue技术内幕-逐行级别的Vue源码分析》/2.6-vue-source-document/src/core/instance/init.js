// @flow

// - `../src/core/config.js`
import config from '../config';                                     // {1-1}

// - `../src/core/intance/(proxy|state|render|events).js` 
import {initProxy} from './proxy';                                  // {1-2}
import {initState} from './state';                                  // {1-3}
import {initRender} from './render';                               // {1-4}
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
            // - mergeOptions() 来自: `src/core/util/options.js`
            vm.$options = mergeOptions(                             // {1-23}
                resolveConstructorOptions(vm.constructor),          // {1-24}
                options || {},                                       // {1-25}
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
        callHook(vm, 'beforeCreate');                                // {1-35}
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

// - resolve modified options (解析修改的选项)
function resolveModifiedOptions(Ctor: Class<Component>): ?Object {  // {1-73}
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