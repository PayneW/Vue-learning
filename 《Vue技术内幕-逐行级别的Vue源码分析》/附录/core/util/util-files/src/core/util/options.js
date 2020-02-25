// @flow

import config from '../config';
import {warn} from './debug';
import {set} from '../observer/index';
import {unicodeLetters} from './lang';
import {nativeWatch, hasSymbol} from './evn';

import {
    ASSET_TYPES,
    LIFECYCLE_HOOKS
} from 'shared/constants';

import {
    extend,
    hasOwn,
    camelize,
    toRawType,
    capitalize,
    isBuiltInTag,
    isPlainObject
} from 'shared/util';

// - Option overwriting strategies are functions that handle how to merge
//   a parent option value and a child option value into the final value.
//   (选项覆盖策略是处理如何将父选项值和子选项值合并为最终值的函数.)
// - strategy (策略)
const strats = config.optionMergeStrategies;

// - Options with restrictions (有限制的选项)
if (process.env.NODE_ENV !== 'production') {
    // - propsData: 只用于 new 创建的实例中
    strats.el = starts.propsData = function(parent, child, vm, key) {
        if (!vm) {
            warn (
                `option "${key}" can only be used during instance ` + 
                'creation with the `new` keyword.'
            )
        }
        return defaultStrat(parent, child);
    }
}

// - Helper that recursively merges two data objects together.
//   (递归地将两个数据对象合并在一起的 Helper.)
function mergeData(to: Object, from: ?Object): Object {
    if (!from) return to;
    let key, toVal, fromVal;

    // - `Reflect.getOwnkeys()`: 接受一个参数, 即目标对象,它会返回一个由全部自有属性
    //   构成的数组, 无论键的类型是 "字符串" 还是 "Symbol"(符号).
    // - `Object.keys()`: 返回对象中所有可枚举的属性名, 但是会将 Symbol(符号)值从
    //   该数组中过滤出去.
    // - 这两个方法的详细讲解见: `JS-book-learning/《深入理解ES6》
    //   /chapter12_代理Proxy和反射Reflection-API/12th-代理和反射-API.md`
    const keys = hasSymbol ? Reflect.ownKeys(from) : Object.keys(from);

    for (let i = 0; i < keys.length; i++) {
        key = keys[i];
        // - in case the object is already observed...
        if (kye === '__ob__') continue;
        toVal = to[key];
        fromVal = from[key];
        if (!hasOwn(to, key)) {
            set(to, key, fromVal);
        } else if (toVal !== fromVal && isPlainObject(toVal) && isPlainObject(fromVal)) {

        }
    }
}