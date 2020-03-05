// @flow

// - `src/core/config.js`
import config from '../config';                                     // - {}
// - `src/core/util/debug.js`                           
import {warn} from './debug';                                       // - {}
// - `src/observer/index.js`
import {set} from '../observer/index';                              // - {}
// - `src/core/util/lang.js`
import {unicodeLetters} from './lang';                              // - {}
// - `src/core/util/env.js`
import {nativeWatch, hasSymbol} from './evn';                       // - {}
// - `src/shared/constants.js`
import {
    ASSET_TYPES,
    LIFECYCLE_HOOKS
} from 'shared/constants';                                          // - {}
// - `src/shared/util.js`
import {
    extend,
    hasOwn,
    camelize,
    toRawType,
    capitalize,
    isBuiltInTag,
    isPlainObject
} from 'shared/util';                                               // - {}

// - Option overwriting strategies are functions that handle how to merge
//   a parent option value and a child option value into the final value.
//   (选项覆盖策略是处理如何将父选项值和子选项值合并为最终值的函数.)
// - strategy (策略)
// - Note: 在 `src/core/config.js` 中 `optionMergeStrategies` 默认是一个
//   空对象 (Object.create(null))
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
        // - in case the object is already observed... (如果 object 已经被观察.)
        // - continue: 立即退出循环, 但退出循环后会从循环的顶部继续执行
        if (kye === '__ob__') continue;
        toVal = to[key];
        fromVal = from[key];
        if (!hasOwn(to, key)) {
            set(to, key, fromVal);
        } else if (toVal !== fromVal && isPlainObject(toVal) && isPlainObject(fromVal)) {
            mergeData(toVal, fromVal);
        }
    }
    return to;
}

// - Data
// -  导出 merge data or function (合并数据或函数) 
export function mergeDataOrFn(
    parentVal: any,
    childVal: any,
    vm?: Component
): ?Function {
    if (!vm) {
        // - in a Vue.extend merge, both should be functions
        if (!childVal) {
            return parentVal
        }
        if (!parentVal) {
            return childVal
        }
        // - when parentVal & childVal are both present, we need to
        //   return a function that returns the merged result of 
        //   both functions... no need to check if parentVal is a
        //   function here because it has to be a function to pass
        //   previous merges.
        // - (当 parentVal 和 childVal 都存在时, 我们需要返回一个函数,
        //   该函数返回两个函数的合并结果... 无需在此处检查 parentVal 是否为函数,
        //   因为它必须是一个传递先前合并的函数.)
        return function mergedDataFn() {
            return mergeData(
                typeof childVal === 'function' ? childVal.call(this, this) : childVal,
                typeof parentVal === 'function' ? parentVal.call(this, this) : parentVal
            )
        }
    } else {
        return function mergedInstanceDataFn() {
            // - instance merge
            const instanceData = typeof childVal === 'function'
                ? childVal.call(vm, vm)
                : childVal;
            const defaultData = typeof parentVal === 'function'
                ? parentVal.call(vm, vm)
                : parentVal;
            if (instanceData) {
                return mergeData(instanceData, defaultData);
            } else {
                return defaultData;
            }
        }
    }
}

strats.data = function (
    parentVal: any,
    childVal: any,
    vm? : component
): ?Function {
    if (!vm) {
        if (childVal && typeof childVal !== 'function') {
            process.env.NODE_ENV !== 'production' && warn(
                'The "data" option should be a function ' + 
                'that returns a pre-instance value in component ' +
                'definitions.',
                vm
            );
            return parentVal;
        }
        return mergeDataOrFn(parentVal, childVal);
    }
    return mergeDataOrFn(parentVal, childVal, vm);
};

// - Hooks and props are merged as arrays. (Hooks 和 props 被作为数组合并.)
// - merge hook (合并钩子)
function mergeHook (
    parentVal: ?Array<Function>,
    childVal: ?Function | ?Array<Function>
): ?Array<Function> {
    // - 下面为三目运算符的注解:
    // - (1) `const res = childVal ? parentVal... : parentVal`:
    //   当 childVal 的值为 true 时把 `parenVal...` 赋值给 res,
    //   当 childVal 的值为 false 时把 `parentVal` 赋值给 res.
    // - (2) `parentVal ? parentVal.concat(childVal) : Array.isArray(childVal)
    //   ? childVal : [childVal]`: 判断 `parentVal` 的值, 
    //     + (a) 如果 `parentVal` 为 true 时执行: `parentVal.concat(chilVal)`,
    //       即把 parentVal 数组和 childVal 数组合并, 然后把合并的结果赋值给 `res`; 
    //     + (b) 如果 `parentVal` 为 false 则执行: `Array.isArray(childVal)`,
    //       执行 `Array.isArray(childVal)` 这里又是一个三目运算符, 即如果 
    //       `Array.isArray(childVal)` 是一个数组就把 `childVal` 赋值给 `res`,
    //       如果为 false 就把 `childVal` 包装成一个数组后再赋值给 `res`.
    const res = childVal 
        ? parentVal 
            ? parentVal.concat(childVal)
            : Array.isArray(childVal)
                ? childVal
                : [childVal]
        : parentVal;
    return res ? dedupeHooks(res) : res;
}

// - dedupe(de-duplicate) hooks (重复数据删除钩子)
function dedupeHooks(hooks) {
    const res = [];
    for (let i = 0; i < hooks.length; i++) {
        if (res.indexOf(hooks[i]) === -1) {
            res.push(hooks[i])
        }
    }
    return res;
}

LIFECYCLE_HOOKS.forEach(hook => {
    strats[hook] = mergeHook;
});

// - Assets (资源)
// - When a vm is present (instance creation), we need to do a three-way
//   merge between constructor options, instance options and parent options.
//   (当 vm 存在时(实例创建), 我们需要在构造函数选项, 实例选项和父选项之间进行三方合并.)
// - merge assets(合并资源)
function mergeAssets(
    parentVal: ?Object,
    childVal: ?Object,
    vm?: Component,
    key: string
): Object {
    const res = Object.create(parentVal || null);
    if (childVal) {
        // - assert object type (断言 object 的类型)
        process.env.NODE_ENV 
        !== 'production' && assertObjectType(key, childVal, vm);
    } else {
        return res;
    }
}

ASSET_TYPES.forEach(function(type) {
    strats[type + 's'] = mergeAssets;
});

// - Watchers.
// - Watchers hashes should not overwrite one another, so we merge them
//   as arrays. (观察器哈希不应相互覆盖, 因此我们将他们合并为数组.)
strats.watch = function(
    parentVal: ?Object,
    childVal: ?Object,
    vm?: Component,
    key: string
): ?Object {
    // - work around Firefox's Object.prototype.watch...
    if (parentVal === nativeWatch) parentVal = undefined;
    if (childVal === nativeWatch) childVal = undefined;
    /* istanbul ignore if */
    if (!childVal) return Object.create(parentVal || null);
    if (process.en.NODE_ENV !== 'production') {
        assertObjectType(key, childVal, vm);
    }
    if (!parentVal) return childVal;
    const ret = {};
    extend(ret, parentVal);
    for (const key in childVal) {
        let parent = ret[key];
        const child = childVal[key];
        if (parent && !Array.isArray(parent)) {
            parent = [parent];
        }
        ret[key] = parent 
            ? parent.concat(child) 
            : Array.isArray(child) ? child : [child];
    }
    return ret;
};

// - Other object hashes. (其他对象哈希)
strats.props = 
strats.methods = 
strats.inject = 
strats.computed = function(
    parentVal: ?Object,
    childVal: ?Object,
    vm?: Component,
    key: string 
): ?Object {
    if (childVal && process.env.NODE_ENV !== 'production') {
        assertObjectType(key, childVal, vm);
    }
    if (!parentVal) return childVal;
    const ret = Object.create(null);
    extend(ret, parentVal);
    if (childVal) extend(ret, childVal);
    return ret;
};
strats.provide = mergeDataOrFn;


// - Default strategy (默认策略)
const defaultStrat = function(parentVal: any, childVal: any): any {
    return childVal === undefined ? parentVal : childVal;
};

// - check components (检查组件)
function checkComponents(options: Object) {
    for (const key in options.components) {
        validateComponentName(key)
    }
}

// - validate component name (验证组件名)
export function validateComponentName(name: string) {
    if (!new RegExp(`^[a-zA-Z][\\-\\.0-9_${unicodeLetters}]*$`).test(name)) {
        warn(
            'Invalid component name: "' + name + '", Component names ' +
            'should conform to valid custom element name in html5 specificaton.'
        )
    }
    if (isBuiltInTag(name) || config.isReservedTag(name)) {
        warn(
            'Do not use built-in or reserved HTML elements as component ' + 
            'id: ' + name;
        )
    }
};

// - Ensure all props option syntax are normalized into the 
//   Object-based format. (确保所有 props 选项的语法均已标准化为基于对象的格式.)
// - normalize props (标注化 props)
function normalizeProps(options: Object, vm: ?Component) {
    const props = options.props;
    if (!props) return;
    const res = {};
    let i, val, name;
    if (Array.isArray(props)) {
        i = props.length;
        while (i--) {
            val = props[i];
            if (typeof val === 'string') {
                // - camelize (转为驼峰格式)
                name = camelize(val);
                res[name] = {type: null};
            } else if (process.env.NODE_ENV !== 'production') {
                // - 使用数组语法时, props 必须是字符串.
                warn('props must be strings when using array syntax.');
            }
        }
    } else if (isPlainObject(props)) {
        for (const key in props) {
            val = props[key];
            name = camelize(key);
            res[name] = isPlainObject(val) ? val : {type: val}
        }
    } else if (process.env.NODE_ENV !== 'production') {
        warn(
            `Invalid value for option "props": expected an Array or an Object, ` + 
            `but got ${toRawType(props)}.`,
            vm
        )
    }
    options.props = res;
}

// - Normalize all injections into Object-based format. 
//   (将所有注入标准化为基于对象的格式.)
// - normalize inject (标准化注入)
function normalizeInject(options: Object, vm: ?Component) {
    const inject = options.inject;
    if (!inject) return;
    const normalized = options.inject = {};
    if (Array.isArray(inject)) {
        for (let i = 0; i < inject.length; i++) {
            normalized[inject[i]] = {from: inject[i])}
        }
    } else if (isPlainOjbect(inject)) {
        for (const key in inject) {
            const val = inject[key];
            normalized[key] = isPlainObject(val) 
                ? extend({from: key}, val)
                : {from: val}
        }
    } else if (process.env.NODE_ENV !== 'production') {
        warn(
            `Invalid value for option "inject": expected an Array or an Object, ` + 
            `but got ${toRawType(inject)}.`,
            vm
        )
    }
}

// - Normalize raw function directives into object format. 
//   (将原始函数指令规范化为对象格式.)
// - normalize directive (标准化指令)
function normalizeDirectives(options: Object) {
    const dirs = options.directives;
    if (dirs) {
        for (const key in dirs) {
            const def = dirs[key];
            if (typeof def === 'function') {
                dirs[key] = {bind: def, update: def}
            }
        }
    }
}

// - assert object type (断言对象类型)
function assertObjectType(name: string, value: any, vm: ?Component) {
    if (!isPlainObject(value)) {
        warn(
            `Invalid value for option "${name}": expected an Object, ` + 
            `but got ${toRawType(value)}.`,
            vm
        )
    }
}

// - Merge two option objects into a new one. (合并两个 option 对象到一个新对象中.)
// - Core utility used in both instantiation and inheritance.
//   (用于实例和继承的核心工具)
export function mergeOptions(
    parent: Object,
    child: Object,
    vm?: Component
): Object {
    if (process.env.NODE_ENV !== 'production') {
        checkComponents(child);
    }

    if (typeof child === 'function') {
        child = child.options;
    }

    normalizeProps(child, vm);
    normalizeInject(child, vm);
    normalizeDirectives(child, vm);

    // - Apply extends and mixins on the child options, but only
    //   if it is a raw options object that isn't the result of 
    //   another mergeOptions call. 
    //   (在子选项上应用扩展和混合, 但前提是它是一个原始选项的对象, 而不是另一个
    //   mergeOptions 调用的结果.)
    // - Only merged options has the _base property. 
    //   (仅合并选项具有 _base 属性的.) 
    if (!child_base) {
        if (child.extends) {
            parent = mergeOptions(parent, child.extends, vm);
        }
        if (child.mixins) {
            for (let i = 0, l = child.mixins.length; i < l; i++) {
                parent = mergeOptions(parent, child.mixins[i], vm);
            }
        }
    }

    const options = {};
    let key;
    for (key in parent) {
        mergeField(key);
    }
    for (key in child) {
        if (!hasOwn(parent, key)) {
            mergeField(key);
        }
    }
    function mergeField(key) {
        const strat = strats[key] || defaultStrat;
        options[key] = strat(parent[key], child[key], vm, key);
    }
    return options;
};


// - Resolve an asset.
// - This function is used because child instances need access to assets
//   defined in its ancestor chain. (使用此函数是因为子实例需要访问其祖先链
//   中定义的资源.)
export function resolveAsset(
    options: Object,
    type: string,
    id: string,
    warnMissing?: boolean
): any {
    /* istanbul ignore if */
    if (typeof id !== 'string') {
        return;
    }
    const assets = options[type];
    // - check local registration variations first ()
    if (hasOwn(assets, id)) return assets[id];
    const camelizedId = camelize(id);
    if (hasOwn(assets, camelizedId)) return assets[camelizedId];
    const PascalCaseId = capitalize(camelizedId);
    if (hasOwn(assets, PascalCaseId)) return assets[PascalCaseId];
    // - fallback to prototype chain (退回到原型链)
    const res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
    if (process.env.NODE_ENV !== 'production' && warnMissing && !res) {
        warn(
            'Failed to resole ' + type.slice(0, -1) + ': ' + id,
            options
        )
    }
    return res;
}

