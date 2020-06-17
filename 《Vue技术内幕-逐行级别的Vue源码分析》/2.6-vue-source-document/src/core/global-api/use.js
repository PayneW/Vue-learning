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