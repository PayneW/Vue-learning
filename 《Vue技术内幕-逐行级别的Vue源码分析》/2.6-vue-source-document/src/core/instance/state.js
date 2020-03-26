// - Tip: 此方法在: `chapter02-Vue 构造函数/chapter02.md` 中讲解了
//   `stateMixin()` 方法

/* @flow */ 

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