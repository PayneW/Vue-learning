// - `src/shared/util.js`

// @flow

// 1. `emptyObject` (空对象)
export const emptyObject = Object.freeze({});

// 2. `isUndef` (is undefined 是未定义的)
export function isUndef(v: any): boolean %checks {
    return v === undefined || v === null;
}

// 3. `isDef` (is defined 是定义的)
export function isDef(v: any): boolean %checks {
    return v !== undefined && v !== null;
}

// 4. `isTrue` (is true)
export function isTrue(v: any): boolean %check {
    return v === true;
}

// 5. `isFalse` (is false)
export function isFalse(v: any): boolean %checks {
    return v === false;
}

// 6. `isPrimitive` (is primitive 是原始值)
/**
 * Check if value is primitive. 
 */
export function isPrimitive(value: any): boolean %checks {
    return (
        typeof value === 'string' ||
        typeof value === 'number' ||
        // $flow-disable-line
        typeof value === 'symbol' ||
        typeof value === 'boolean'
    )
}

// 7. `isObject`
export function isObject(obj: mixed): boolean %checks {
    return obj !== null && typeof obj === 'object';
}

// 8. `toRawType` (to raw type 给出原始类型)
/**
 * Get the raw type string of a value e.g. [object Object]
 */
const _toString = Object.prototype.toString;
export function toRawType(value: any): stirng {
    // - 索引从 8 开始, -1 = -1 + value.length = 字符串的总长度 - 1
    _toString.call(value).slice(8, -1);
 }

// 9. `isPlainObject` (is plain object 是字面量对象)
/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
export function isPlainObject(obj: any): boolean {
    return _toString.call(obj) === '[object Object]';
}

// 10. `isRegExp` (is regular expression 是正则表达式)
export function isRegExp(v: any): boolean {
    return _toString.call(v) === '[object RegExp]';
}

// 11. `isValidArrayIndex` (is valid array index 是有效的数组索引)
export function isValidArrayIndex(val: any): boolean {
    // - `parseFloat()`: 把字符串转换成浮点数值.
    const n = parseFloat(String(val));
    return n >= 0 && Math.floor(n) == n && isFinite(val);
}
 
// 12. `toString` (to String  把变量转换为 string 类型)
/**
 * Convert a value to a string that is actually rendered.
 */
export function toString(val: any): string {
    return val == null 
        ? '' 
        : typeof val === 'object' 
            ? JSON.stringify(val, null, 2) 
            : String(val)
}

// 13. `toNumber`
/**
 * Convert a input value to number for persistence.
 * If the conversion fails, return original string.
 */ 
export function toNumber(val: string): number | string {
    const n = parseFloat(val);
    return isNaN(n) ? val : n;
}

// 14. `makeMap` (make map  生成 map(地图))
export function makeMap(
    str: string,
    expectsLowerCase?: boolean
): (key: string) => true | void {
    // - 定义一个对象 `map`
    const map = Object.create(null);
    // - `string.split()`: 将字符串转换成数组.
    const list: Array<string> = str.split(',');
    // - 遍历 `list` 并以 `list` 中的元素作为 `map` 的 `key`, 将其设置为 `true`.
    for (let i = 0; i < list.length; i++) {
        map[list] = true;
    }
    // - 返回一个函数, 并且如果 `expectsLowerCase` 为 `true` 的话, 将 `map` 的
    //   `key` 小写.
    return expectsLowerCase 
        ? val => map[val.toLowerCase()] 
        : val => map[val]
}
// - 使用示例:
const isVowel = makeMap('a,e,i,o,u', true);
isVowel('e');   // true
isVowel('b');   // false


// 15. `isBuiltInTag` (is built in tag 是内置标签)
export function isBuiltInTag = makeMap('slot, component', true);

// 16. `isReservedAttribute`
export const isReservedAttribute = makeMap('key, ref, slot, slot-scope, is')

// 17. `remove`
export function remove(arr: Array<any>, item: any): Array<any> | void {
    if (arr.length) {
        // - `Array.indexOf()`: 返回要查找的项在数组中的位置.
        const index = arr.indexOf(item);
        if (index > -1) {
            return arr.splice(index, 1);
        }
    }
} 

// 18. `hasOwn` (hasOwnProperty 检测对象是否具有某个属性)
const hasOwnProperty = Object.prototype.hasOwnProperty;
export function hasOwn (obj: Object | Array<*>, key:string): boolean {
    return hasOwnProperty.call(obj, key);
}

// 19. `cached`
export function cached<F: Function> (fn: F): F {
    const cache = Object.create(null);
    // - return 返回一个函数, 这个函数与外围的 cached 函数区别在于: 先读取缓存(即: hit)
    // - Tip: cachedFn(str) 参数 str 内部调用 fn(str) 所传.
    return (function cachedFn(str: string) {
        const hit = cache[str];
        // - 如果有命中缓存(即上面的 hit), 则直接返回缓存的值, 否则采用原函数 `fn`
        //   计算一次并且设置缓存, 然后返回结果.
        return hit || (cache[str] = fn(str))
    }: any)
}

// 20. `camelize`
/**
 * Camelize a hyphen-delimited string. 
 */
const camelizeRE = /-(\w)/g;
export const camelize = cached((str: string): string => {
    return str.replace(camelizeRE, (_, c_ => c ? c.toUpperCase() : '')
});
// - 使用示例:
camelize('aaa-bbb');    // aaaBbb

// 21. `capitalize`
/**
 * Capitalize a string. 
 */
export const capitalize = cached((str: string): string => {
    return str.charAt(0).toUpperCase() + str.slice(1);
});

// 22. `hyphenate`
/**
 * Hyphenate a camelCase string.
 */
const hyphenateRE = /\B([A-Z])/g;
export const hyphenate = cached((str: string): string => {
    return str.replace(hyphenateRE, '-$1').toLowerCase();
});
// - 使用示例:
hyphenate('aaaBbb');    // aaa-bbb

// 23. `toArray`
/**
 * Convert an Array-like object to a real Array. 
 */
export function toArray(list: any, start?: number): Array<any> {
    start = start || 0;
    let i = list.length - start;
    const ret: Array<any> = new Array(i);
    while (i--) {
        ret[i] = list[i + start];
    }
    return ret;
}
// - 使用示例
let arrayLike = {
    0: 'name',
    1: 'age',
    2: 'sex',
    length: 3
};
// [ 'name', 'age', 'sex' ]
console.log(toArray(arrayLike));

// 24. `extend` (tip: 虽然 vue 此处命名为 `extend`(扩展), 但实际上这个方法
/**
 * Mix properties into target object. 
 */
export function extend(to: Object, _from: ?Object): Object {
    for (const key in _from) {
        to[key] = _from[key]
    }
    return to;
}

// 25. `toObject`
/**
 * Merge an Array of Objects into a single Object. 
 */
export function toObject(arr: Array<any>): Object {
    const res = {};
    for (let i = 0; i < arr.length; i++) {
        if (arr[i]) {
            extend(res, arr[i]);
        }
    }
    return res;
}
// - 使用示例:
let arr = [{name: 'W'}, {age: 31}, {gender: 'male'}];
// { name: 'W', age: 31, gender: 'male' }
console.log(toObject(arr));

// 26. `noop`
/**
 * Perform no operation.
 * Stubbing args to make Flow happy without leaving useless transpiled code
 * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/) 
 */
export function noop(a?: any, b?: any, c?: any) {}

// 27. `no`
/**
 * Always return false.
 */
export const no = (a?: any, b?: any, c?: any) => false;

// 28. `identity`
/**
 * Return same value
 */
export function identity = (_: any) => _;

// 29. `genStaticKeys` (generate static keys 生成静态键)
/**
 * Generate a static keys string from compiler modules. 
 */
export function genStaticKeys (modules: Array<ModuleOptions>): string {
    return modules.reduce((keys, m) => {
        return keys.concat(m.staticKeys || []);
    }, []).join(',');   // - `Array.join()`: 把数组转化为字符串.
}
// - 使用示例:
//   见: 同级目录 `调用源码示例.js`

// 30. `looseEqual` (loose equal 大致相等)
/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 * 检查两个值是否大致相等 - 也就是说, 如果他们是普通对象, 他们是否具有相同的形状?
 */
export function looseEqual(a: any, b: any): boolean {
    if (a === b) return true;
    const isObjectA = isObject(a);
    const isObjectB = isObject(b);
    if (isObjectA && isObjectB) {
        try {
            const isArrayA = Array.isArray(a);
            const isArrayB = Array.isArray(b);
            if (isArrayA && isArrayB) {
                return a.length === b.length && a.every((e, i) => {
                    return looseEqual(e, b[i])
                })
            } else if (!isArrayA && !isArrayB) {
                const keysA = Object.keys(a);
                const keysB = Object.keys(b);
                return keysA.length === keysB.length && keysA.every(key => {
                    return looseEqual(a[key], b[key]);
                })
            } else {
                /* istanbul ignore next */
                return false;
            }
        } catch (e) {
            /* istanbul ignore next */
            return false;
        }
    } else if (!isObjectA && !isObjectB) {
        return String(a) === String(b);
    } else {
        return false;
    }
}

// 31. `looseIndexOf`
export function looseIndexOf(arr: Array<mixed>, val: mixed): number {
    for (let i = 0; i < arr.length; i++) {
        if (looseEqual(arr[i], val)) return i;
    }
    return -1;
}

// 32. `once`
/**
 * Ensure a function is called only once. 
 */
export function once(fn: Function): Function {
    let called = false;
    return function() {
        if (!called) {
            called = true;
            fn.apply(this, arguments);
        }
    }
}