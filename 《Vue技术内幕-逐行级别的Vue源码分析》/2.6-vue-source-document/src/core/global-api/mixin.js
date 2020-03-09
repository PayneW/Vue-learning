// - ../src/core/global-api/mixin.js (全部代码)

/* @flow */
import {mergeOptions} from '../util/index';                 // {6-1}

export function initMixin(Vue: GlobalAPI) {                 // {6-2}
    Vue.mixin = function(mixin: Object) {                   // {6-3}
        this.options = mergeOptions(this.options, mixin);   // {6-4}
        return this;
    }
}