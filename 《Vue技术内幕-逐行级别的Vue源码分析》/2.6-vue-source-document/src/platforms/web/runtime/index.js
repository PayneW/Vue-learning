// - src/platforms/web/runtime/index.js (全部代码)

/* @flow */
// - `src/core/index.js`
import Vue from 'core/index';                               // {10-1}
// - `src/core/config.js`
import config from 'core/config';                           // {10-2}
// - `src/shared/util.js`
import {extend, noop} from 'shared/util';                   // {10-3}
// - `src/core/instance/lifecycle.js`
import {mountComponent} from 'core/instance/lifecycle';     // {10-4}
// - `src/core/util/index.js`
import {devtools, inBrowser} from 'core/util/index';        // {10-5}

// - `src/platforms/web/util/index.js`
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