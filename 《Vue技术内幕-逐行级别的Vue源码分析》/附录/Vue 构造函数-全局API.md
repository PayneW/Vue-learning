# Vue 构造函数-全局 API

- 这里是对 `Vue` 构造函数全局 API(静态属性和方法) 的整理, 便于看源码时查看方法对应位置.
  ```js
    // - initGlobalAPI
    // - 来源文件: ../src/core/global-api/index.js 
    function initGlobalAPI(Vue: GlobalAPI) {         // {4-11}
        // - config
        const configDef = {};                               // {4-12}
        configDef.get = () => config;                       // {4-13}
        if (proecess.env.NODE.ENV !== 'production') {       // {4-14}
            configDef.set = () => {                         // {4-15}
                warn('Do not replace the Vue.cofnig object, set individual fields instead.')
            }
        }
        Object.defineProperty(Vue, 'config', configDef);    // {4-16}

        Vue.util = {                                        // {4-17}
            warn,
            extend,
            mergeOptions,
            defineReactive
        };

        Vue.set = set;                                      // {4-18}
        Vue.delete = del;                                   // {4-19}
        Vue.nextTick = nextTick;                            // {4-20}

        Vue.options = {
            components: {
                KeepAlive,
                // - Transition 和 TransitionGroup 组件在 runtime/index.js
                //   文件中被添加
                // Transition
                // TransitionGroup
            },
            directives: Object.create(null),
            // - 在 runtime/index.js 文件中, 为 directives 添加了 2
            //   个平台化的指令 model 和 show
            // directives: {
            //     model,
            //     show
            // },
            filters: Object.create(null),
            _base: Vue
        },

        // - initUse ******************* ../src/core/global-api/use.js
        Vue.use = function(plugin: Function | Object) {}
       
        // - initMixin ******************* ../src/core/global-api/mixin.js
        Vue.mixin = function(mixin: Object) {}

        // - initExtend ******************* ../src/core/global-api/extend.js
        Vue.cid = 0;
        Vue.extend = function(extendOptions: Object): Function {}

        // - initAssetRegisters ************ ../src/core/global-api/assets.js
        Vue.component = 
        Vue.directive = 
        Vue.filter = function(
            id: string,
            definition: Function | Object
        ): Function | Object | vid {}

        // - expose FunctionalRenderContext for ssr runtime helper installation
        Object.defineProperty(Vue, 'FunctionalRenderContext', {
            value: FunctionalRenderContext
        });

        Vue.version = '__VERSION__';

        // - entry-runtime-with-compiler.js
        Vue.compile = compileToFunctions
    }
  ```