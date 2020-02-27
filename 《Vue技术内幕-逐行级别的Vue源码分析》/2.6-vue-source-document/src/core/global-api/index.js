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
    Vue.observable = <T>(Obj: T): T => {                // {4-21}
        observe(obj);                                   // {4-22}
        return obj;                                     // {4-23}
    };
    
    Vue.options = Object.create(null);                  // {4-24}
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

