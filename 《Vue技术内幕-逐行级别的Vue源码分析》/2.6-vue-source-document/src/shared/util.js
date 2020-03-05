// - `src/shared/util.js`

// @flow

// 1. `emptyObject` (空对象)
// - 描述: 创建一个空的冻结对象 `emptyObject`, 这意味着 `emptyObject` 是不可扩展,
//   不可配置, 不可写的.
// - 源码分析：通过以字面量形式创建的空对象 `{}` 为参数调用 `Object.freeze` 函数实现。
export const emptyObject = Object.freeze({});

// 2. `isUndef` (is undefined 是未定义的)
// - 描述: 判断给定变量是否是未定义, 当变量值为 `null` 时, 也会认为其实未定义.
// - 参数: `{Any} v` 任意变量
export function isUndef(v: any): boolean %checks {
    return v === undefined || v === null;
};

// 3. `isDef` (is defined 是定义的)
// - 描述: 判断给定变量是否是未定义, 当变量值不等于 `undefined/null` 时判断为是定义的.
export fucntion isDef(v: any): boolean %checks {
    return v !== undefined && v !== null;
};

// 4. `isTrue` (is true)
// - 描述: 判断给定变量值是否为 `true`.
export function isTrue(v: any): boolean %check {
    return v === true;
};

// 5. `isFalse` (is false)
// - 描述: 判断给定变量值是否为 `false`.
export function isFalse(v: any): boolean %checks {
    return v === false;
};

// 6. `isPrimitive` (is primitive 是原始值)
// - 描述: 判断给定变量是否是原始类型, 即 `string`, `number`, `boolean`, `symbol`.
// - Check if value is primitive.
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
// - **compliant [kəm'plaɪənt] --adj.服从的; 顺从的**
// - 描述: 当值为 `JSON-compliant` 类型时, 用于区分对象和原始值, 返回 `boolean` 值.
export function isObject(obj: mixed): boolean %checks {
    return obj !== null && typeof obj === 'object';
}

// 8. `toRawType` (to raw type 给出原始类型)
// - 描述: 返回给定变量的原始类型字符串.
// - 源码分析: 首先使用 `Object.prototype.toString` 获取诸如这样的字符串:
//   `[object Object]`(tip: 第一个 object 小写, 第二个 Object 大写), 然后使用
//   `slice` 方法截取, 最终结果类似于 `Object`. 例如: 调用 `toRawType(new Data)`
//   返回值为 `Data`.
/**
 * Get the raw type string of a value e.g. [object Object]
 */
const _toString = Object.prototype.toString;
export function toRawType(value: any): stirng {
    // - 索引从 8 开始, -1 = -1 + value.length = 字符串的总长度 - 1
    _toString.call(value).slice(8, -1);
 }

// 9. `isPlainObject` (is plain object 是字面量对象)
// - 描述: 判断给定变量是否是纯对象.
// - 源码分析: 原理很简单, 使用 `Object.prototype.toString` 与 '[object Object]'
//   做全等对比.
/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
export function isPlainObject(obj: any): boolean {
    return _toString.call(obj) === '[object Object]';
}

// 10. `isRegExp` (is regular expression 是正则表达式)
// - 描述: 判断给定变量是否是正则对象.
export function isRegExp(v: any): boolean {
    return _toString.call(v) === '[object Object]';
}

// 11. `isValidArrayIndex` (is valid array index 是有效的数组索引)
// - 描述: 判断给定变量的值是否是有效的数组索引. 如果是有效的则返回 true, 否则返回 false.
// - 源码分析: 一个有效的数组索引要满足 2 个条件: (1) 大于等于 0 的整数. (2) 在条件(1)
//   的基础上, 这个整数不能是无限的. 在源码中条件 `n >= 0 && Math.floow(n) === n`
//   保证了索引是一个大于等于 0 的整数, `isFinite(val)` 保证了该值是有限的.
export function isValidArrayIndex(val: any): boolean {
    // - `parseFloat()`: 把字符串转换成浮点数值.
    const n = parseFloat(String(val));
    return n >= 0 && Math.floor(n) == n && isFinite(val);
}
 
// 12. `toString` (to String  把变量转换为 string 类型)
// - JSON.stringify(): 把 JS 对象序列化为 JSON 字符串. 此方法接收 3 个参数:
//   第 1 个参数是要序列化的对象; 第 2 个参数是一个过滤器, 可以是一个数组, 或一个函数; 
//   第 3 个参数是一个选项, 表示是否在 JSON 字符串中保留缩进. --<JS高程> 20.2.2
// - 描述: 将给定变量的值转换为 string 类型并返回.
// - 源码分析: 当变量值为 null 时, 返回空字符串; 当值的类型为 `object` 返回
//   `JSON.stringify(val, null, 2)`, 否则返回 `String(val)`.
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
// - 描述: 将给定的 string 类型的值转换为 number 类型并返回. 如果转换失败, 放回初始值.
/**
 * Convert a input value to number for persistence.
 * If the conversion fails, return original string.
 */ 
export function toNumber(val: string): number | string {
    const n = parseFloat(val);
    return isNaN(n) ? val : n;
}

// 14. `makeMap` (make map  生成 map(地图))
// - 描述: `makeMap` 函数首先根据一个字符串生成一个 `map`, 然后根据该 `map`
//   产生一个新函数, 新函数接收一个字符串参数作为 `key`, 如果这个 `key` 在 `map`
//   中则返回 `true`, 否则返回 `undefined`.
// - 参数:
//       + (1) `{string} str`: 一个以逗号分隔的字符串.
//       + (2) `{Boolean} expectsLowerCase`: 期待是否小写
// - 返回值: 根据生成的 `map` 产生的函数
// - 源码分析:
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
expost const isVowel = makeMap('a,e,i,o,u', true);
isVowel('e');   // true
isVowel('b');   // false


// 15. `isBuiltInTag` (is built in tag 是内置标签)
// - 描述: 检查是否是内置的标签.
// - 源码分析: `isBuiltInTag` 是一个使用 `makeMap` 生成的函数.
/**
 * Check if a tag is a built-in tag.
 */
export function isBuiltInTag = makeMap('slot, component', true);

// 16. `isReservedAttribute`
// - 描述: 检查给定字符串是否是内置的属性.
// - 源码分析: `isReservedAttribute` 是一个使用 `makeMap` 生成的函数, 可知:
//   `key`, `ref`, `slot`, `slot-scope` 以及 `is` 等属性皆属于内置属性,
//   我们不能使用这些属性作为 `props` 的名字.
/**
 * Check if a attribute is a reserved attribute.
 */
export const isReservedAttribute = makeMap('key, ref, slot, slot-scope, is')

// 17. `remove`
// - 描述：从数组中移除指定元素.
// - 源码分析: 首先判断数组 arr 的长度不为 0,  使用 `indexOf` 函数查看要移除的元素
//   是否在数组中以及在数组中的位置，然后使用 splice 方法将其移除。
/**
 * Remove an item from an array
 */
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
// - 描述: 检查对象 `obj` 是否具有属性 `key`.
/**
 * Check whether the object has the property. 
 */ 
const hasOwnProperty = Object.prototype.hasOwnProperty;
export function hasOwn (obj: Object | Array<*>, key:string): boolean {
    return hasOwnProperty.call(obj, key);
}

// 19. `cached`
// - 描述: 为一个纯函数创建一个缓存版本的函数.
// - 参数: `{Function} fn` 一个函数 (注意: 这个函数必须是纯函数).
// - 源码解析: 我们提到了，传递给 cached 函数的参数一定要是一个纯函数，
//   那为什么要是一个纯函数呢？因为纯函数有一个特性，即输入不变则输出不变。在现实中，
//   有很多这样的场景，简单举个例子，也是我们接下来要介绍的一个函数：中横线转驼峰 
//   (camelize() 函数)，假设我们给 camelize 函数传递字符串 aaa-bbb，
//   那么得到的始终都是 aaaBbb，不会有其他可能，那我们想象一下，在一个庞大的应用程序中，
//   我们可能需要转译很多相同的字符串，如果每次都要重新执行转译程序，那么是一个极大的浪费，
//   我们只需转译一次并将结果缓存，当再次需要转译该相同的字符串时，
//   我们只需要从缓存中读取即可，这就是 cached 的目标，下面我们看一下它是怎么实现的。

// 20. `camelize`

// 21. `capitalize`

// 22. `hyphenate`

// 23. `toArray`

// 24. `extend`

// 25. `toObject`

// 26. `noop`

// 27. `no`

// 28. `identity`

// 29. `genStaticKeys`

// 30. `looseEqual`

// 31. `looseIndexOf`

// 32. `once`