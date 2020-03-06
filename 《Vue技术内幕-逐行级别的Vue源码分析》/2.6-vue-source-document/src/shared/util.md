# util.js 文件源码

## 目录 (Catalog)
1. `emptyObject` (空对象)
2. `isUndef` (is undefined 是未定义的)
3. `isDef` (is defined 是定义的)
4. `isTrue` (is true 判断给定变量是否为 `true`)
5. `isFalse` (is false 判断给定变量是否为 `false`)
6. `isPrimitive` (is primitive 是原始值)
7. `isObject` (判断给定的变量是不是对象)
8. `toRawType` (to raw type 返回给定变量的原始类型字符串)
9. `isPlainObject` (is plain object 判断给定变量是否是纯对象)
10. `isRegExp` (is regular expression 判断给定变量是否是正则表达式)
11. `isValidArrayIndex` (判断给定变量的值是否是有效的数组索引)
12. `toString` (将给定的值转换为 `string` 类型并返回)
13. `toNumber` (将给定 `string` 类型的值转换为 `number` 类型并返回.)
14. `makeMap` ()
15. `isBuiltInTag` (检查是不是内置的标签)
16. `isReservedAttribute` (检查给定字符串是不是内置的属性)
17. `remove` (从数组中移除指定元素)
18. `hasOwn` (hasOwnProperty 检测对象是否具有某个属性)
19. `cached` (为一个纯函数创建一个缓存版本的函数)
20. `camelize` (连字符转驼峰)
21. `capitalize` (首字母大写)
22. `hyphenate` (驼峰转连字符)
23. `toArray` (将类数组对象转换为数组)
24. `extend` (`mixin` 混合)
25. `toObject` (将一个对象数组合并到一个对象中, 并返回该对象)
26. `noop` (创建一个空函数)
27. `no` (始终返回 `false` 的函数)
28. `identity` (返回值和输入值一样的纯函数)
29. `genStaticKeys` (根据编译器(`compiler`)的 `modules` 生成一个静态键字符串)
30. `looseEqual` (loose equal 大致相等)
31. `looseIndexOf` (返回 `val` 在 `arr` 中的索引)
32. `once` (只调用一次的函数)



## 生词 (New Words)



## 内容 (Content)
- `src/shared/util.js`

#### 1. `emptyObject` (空对象)
- 描述: 创建一个空的冻结对象 `emptyObject`, 这意味着 `emptyObject` 是不可扩展,
  不可配置, 不可写的.
- 源码分析：通过以字面量形式创建的空对象 `{}` 为参数调用 `Object.freeze` 函数实现。
  ```js
    export const emptyObject = Object.freeze({});
  ```

#### 2. `isUndef` (is undefined 是未定义的)
- 描述: 判断给定变量是否是未定义, 当变量值为 `null` 时, 也会认为其实未定义.
- 参数: `{Any} v` 任意变量
  ```js
    export function isUndef(v: any): boolean %checks {
        return v === undefined || v === null;
    }
  ```

#### 3. `isDef` (is defined 是定义的)
- 描述: 判断给定变量是否是未定义, 当变量值不等于 `undefined/null` 时判断为是定义的.
  ```js
    export function isDef(v: any): boolean %checks {
        return v !== undefined && v !== null;
    }
  ```

#### 4. `isTrue` (is true)
- 描述: 判断给定变量值是否为 `true`.
  ```js
    export function isTrue(v: any): boolean %check {
        return v === true;
    }
  ```

#### 5. `isFalse` (is false)
- 描述: 判断给定变量值是否为 `false`.
  ```js
    export function isFalse(v: any): boolean %checks {
        return v === false;
    }
  ```

#### 6. `isPrimitive` (is primitive 是原始值)
- 描述: 判断给定变量是否是原始类型, 即 `string`, `number`, `boolean`, `symbol`.
  ```js
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
  ```

#### 7. `isObject`
- **compliant [kəm'plaɪənt] --adj.服从的; 顺从的**
- 描述: 当值为 `JSON-compliant` 类型时, 用于区分对象和原始值, 返回 `boolean` 值.
  ```js
    export function isObject(obj: mixed): boolean %checks {
        return obj !== null && typeof obj === 'object';
    }
  ```

#### 8. `toRawType` (to raw type 给出原始类型)
- 描述: 返回给定变量的原始类型字符串.
- 源码分析: 首先使用 `Object.prototype.toString` 获取诸如这样的字符串:
  `[object Object]`(tip: 第一个 object 小写, 第二个 Object 大写), 然后使用
  `slice` 方法截取, 最终结果类似于 `Object`. 例如: 调用 `toRawType(new Data)`
  返回值为 `Data`.
  ```js
    /**
     * Get the raw type string of a value e.g. [object Object]
     */
    const _toString = Object.prototype.toString;
    export function toRawType(value: any): stirng {
        // - 索引从 8 开始, -1 = -1 + value.length = 字符串的总长度 - 1
        _toString.call(value).slice(8, -1);
    }
  ```

#### 9. `isPlainObject` (is plain object 是字面量对象)
- 描述: 判断给定变量是否是纯对象.
- 源码分析: 原理很简单, 使用 `Object.prototype.toString` 与 '[object Object]'
  做全等对比.
  ```js
    /**
     * Strict object type check. Only returns true
     * for plain JavaScript objects.
     */
    export function isPlainObject(obj: any): boolean {
        return _toString.call(obj) === '[object Object]';
    }
  ```

#### 10. `isRegExp` (is regular expression 是正则表达式)
- 描述: 判断给定变量是否是正则对象.
  ```js
    export function isRegExp(v: any): boolean {
        return _toString.call(v) === '[object RegExp]';
    }
  ```

#### 11. `isValidArrayIndex` (is valid array index 是有效的数组索引)
- 描述: 判断给定变量的值是否是有效的数组索引. 如果是有效的则返回 true, 否则返回 false.
- 源码分析: 一个有效的数组索引要满足 2 个条件: (1) 大于等于 0 的整数. (2) 在条件(1)
  的基础上, 这个整数不能是无限的. 在源码中条件 `n >= 0 && Math.floow(n) === n`
  保证了索引是一个大于等于 0 的整数, `isFinite(val)` 保证了该值是有限的.
  ```js
    export function isValidArrayIndex(val: any): boolean {
        // - `parseFloat()`: 把字符串转换成浮点数值.
        const n = parseFloat(String(val));
        return n >= 0 && Math.floor(n) == n && isFinite(val);
    }
  ```
 
#### 12. `toString` (to String  把变量转换为 string 类型)
- JSON.stringify(): 把 JS 对象序列化为 JSON 字符串. 此方法接收 3 个参数:
  第 1 个参数是要序列化的对象; 第 2 个参数是一个过滤器, 可以是一个数组, 或一个函数; 
  第 3 个参数是一个选项, 表示是否在 JSON 字符串中保留缩进. --<JS高程> 20.2.2
- 描述: 将给定变量的值转换为 string 类型并返回.
- 源码分析: 当变量值为 null 时, 返回空字符串; 当值的类型为 `object` 返回
  `JSON.stringify(val, null, 2)`, 否则返回 `String(val)`.
  ```js
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
  ```

#### 13. `toNumber`
- 描述: 将给定的 string 类型的值转换为 number 类型并返回. 如果转换失败, 放回初始值.
  ```js
    /**
     * Convert a input value to number for persistence.
     * If the conversion fails, return original string.
     */ 
    export function toNumber(val: string): number | string {
        const n = parseFloat(val);
        return isNaN(n) ? val : n;
    }
  ```

#### 14. `makeMap` (make map  生成 map(地图))
- 描述: `makeMap` 函数首先根据一个字符串生成一个 `map`, 然后根据该 `map`
  产生一个新函数, 新函数接收一个字符串参数作为 `key`, 如果这个 `key` 在 `map`
  中则返回 `true`, 否则返回 `undefined`.
- 参数:
      + (1) `{string} str`: 一个以逗号分隔的字符串.
      + (2) `{Boolean} expectsLowerCase`: 期待是否小写
- 返回值: 根据生成的 `map` 产生的函数
- 源码分析:
  ```js
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
  ```

#### 15. `isBuiltInTag` (is built in tag 是内置标签)
- 描述: 检查是否是内置的标签.
- 源码分析: `isBuiltInTag` 是一个使用 `makeMap` 生成的函数.
  ```js
    /**
     * Check if a tag is a built-in tag.
     */
    export function isBuiltInTag = makeMap('slot, component', true);
  ```

#### 16. `isReservedAttribute`
- 描述: 检查给定字符串是否是内置的属性.
- 源码分析: `isReservedAttribute` 是一个使用 `makeMap` 生成的函数, 可知:
  `key`, `ref`, `slot`, `slot-scope` 以及 `is` 等属性皆属于内置属性,
  我们不能使用这些属性作为 `props` 的名字.
  ```js
    /**
     * Check if a attribute is a reserved attribute.
    */
    export const isReservedAttribute = makeMap('key, ref, slot, slot-scope, is')
  ```

#### 17. `remove`
- 描述：从数组中移除指定元素.
- 源码分析: 首先判断数组 arr 的长度不为 0,  使用 `indexOf` 函数查看要移除的元素
  是否在数组中以及在数组中的位置，然后使用 splice 方法将其移除。
  ```js
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
  ```

#### 18. `hasOwn` (hasOwnProperty 检测对象是否具有某个属性)
- 描述: 检查对象 `obj` 是否具有属性 `key`.
  ```js
    /**
     * Check whether the object has the property. 
     */ 
    const hasOwnProperty = Object.prototype.hasOwnProperty;
    export function hasOwn (obj: Object | Array<*>, key:string): boolean {
        return hasOwnProperty.call(obj, key);
    }
  ```

#### 19. `cached`
- 描述: 为一个纯函数创建一个缓存版本的函数.
- 参数: `{Function} fn` 一个函数 (注意: 这个函数必须是纯函数).
- 源码解析: 我们提到了，传递给 cached 函数的参数一定要是一个纯函数，
  那为什么要是一个纯函数呢？因为纯函数有一个特性，即输入不变则输出不变。在现实中，
  有很多这样的场景，简单举个例子，也是我们接下来要介绍的一个函数：中横线转驼峰 
  (camelize() 函数)，假设我们给 camelize 函数传递字符串 aaa-bbb，
  那么得到的始终都是 aaaBbb，不会有其他可能，那我们想象一下，在一个庞大的应用程序中，
  我们可能需要转译很多相同的字符串，如果每次都要重新执行转译程序，那么是一个极大的浪费，
  我们只需转译一次并将结果缓存，当再次需要转译该相同的字符串时，
  我们只需要从缓存中读取即可，这就是 cached 的目标，下面我们看一下它是怎么实现的。
  ```js
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
  ```

#### 20. `camelize`
- 描述: 连字符转驼峰.
- 源码分析: 这是一个很基本的函数, 定义一个正则表达式: `/-(\w)/g`,
  用来全局匹配`中横线及其后的一个字符`(例如: 可以匹配 `-b` 或 `-m`),
  注意该正则拥有一个捕获组, 用来捕获连字符后面的字符, 在 `camelize` 函数体内,
  使用 `camelizeRE` 正则表达式匹配字符串, 如果连字符后面有字符, 则将匹配到的内容
  使用该字符的大写形式替换, 否则使用空字符串替换即可.
- Tip: (`\w`: 匹配字母,数字,下划线字符.); (`()`: 捕获型分组).
- Note: `replace()` 的详细使用见仓库: `DataStructure-Algorithm-Learning/
  正则表达式/replace方法和正则表达式.md`
  ```js
    /**
     * Camelize a hyphen-delimited string. 
     */
    const camelizeRE = /-(\w)/g;
    export const camelize = cached((str: string): string => {
        return str.replace(camelizeRE, (_, c_ => c ? c.toUpperCase() : '')
    });
    // - 使用示例:
    camelize('aaa-bbb');    // aaaBbb
  ```

#### 21. `capitalize`
- 描述: 首字母大写. 这是一个由 `cached` 函数生成的新函数.
- 源码分析: 略.
  ```js
    /**
     * Capitalize a string. 
     */
    export const capitalize = cached((str: string): string => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    });
  ```

#### 22. `hyphenate`
- 描述: 驼峰转连字符.
- 源码分析: 其作用域 `camelize` 恰好相反. 用来将驼峰字符串转为连字符,
  实现方式同样是使用正则, 正则 `/\B[A-Z]/g` 用来全局匹配字符串中的大写字母, 
  并且该大写字母前必须不是单词的边界. 在 `hyphenate` 函数体内使用 `hyphenateRE`
  正则匹配字符串, 并将匹配的内容使用连字符和捕获组的字符替换, 最后转为小写.
  ```js
    /**
     * Hyphenate a camelCase string.
     */
    const hyphenateRE = /\B([A-Z])/g;
    export const hyphenate = cached((str: string): string => {
        return str.replace(hyphenateRE, '-$1').toLowerCase();
    });
    // - 使用示例:
    hyphenate('aaaBbb');    // aaa-bbb
  ```

#### 23. `toArray`
- 描述: 将类数组对象转换为数组.
- 参数: `{any} list`: 类数组 list; `{number} start` 开始转换的索引
- 源码分析: `toArray` 接收 2 个参数, 分别为类数组 `list` 和开始转换的索引 `start`
  (默认从 0 开始). 通过 `new Array()` 创建长度为 `i` 的新数组, `while` 循环对
  `ret` 每一项赋值, 最后返回转换后的新数组 `ret`.
  ```js
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
  ```

#### 24. `extend` (tip: 虽然 vue 此处命名为 `extend`(扩展), 但实际上这个方法
    实现的就是 `mixin`(混入) 方法: 即一个对象接收来自于另一个对象的属性和方法.)
- 描述: 将 `_from` 对象的属性混合到 `to` 对象中.
- 参数: `{Object} to`: 目标对象; `{Object} _from` 源对象.
- 返回值: 混合后的 `to` 对象
- 源码分析: `extend` 函数的实现还是挺简单的, 使用一个 `for...in` 语句实现.
  ```js
    /**
     * Mix properties into target object. 
     */
    export function extend(to: Object, _from: ?Object): Object {
        for (const key in _from) {
            to[key] = _from[key]
        }
        return to;
    }
  ```

#### 25. `toObject`
- 描述: 将一个对象数组合并到一个对象中, 并返回该对象.
- 参数: `{Array} arr`.
- 源码分析:
  ```js
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
  ```

#### 26. `noop`
- 描述: 空函数, 什么都不做, 用于初始化一些值为函数的变量.
- 源码分析: 就是简单的写了一个空函数 `noop`, 至于其中的参数 `a, b, c` 的作用,
  我们看注释可知是为了避免 `Flow` 使用 `rest` 参数转译代码.
  ```js
    /**
     * Perform no operation.
     * Stubbing args to make Flow happy without leaving useless transpiled code
     * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/) 
     */
    export function noop(a?: any, b?: any, c?: any) {}
  ```

#### 27. `no`
- 描述: 始终返回 `false` 的函数
  ```js
    /**
     * Always return false.
     */
    export const no = (a?: any, b?: any, c?: any) => false;
  ```

#### 28. `identity`
- 描述: 返回值和输入值一样的纯函数.
  ```js
    /**
     * Return same value
     */
    export function identity = (_: any) => _;
  ```

#### 29. `genStaticKeys` (generate static keys 生成静态键)
- 描述: 根据编译器(`compiler`)的 `modules` 生成一个静态键字符串.
- 参数: `{Array} modules` 编译器选项参数的 `modules` 选项.
- Tip: `reduce()` 方法的使用见仓库: `JS-book-learning/《深入理解ES6》/
  00_ES6 其他语法/Array.reduce().html`. (`keys` 即是 `accumulator`(累加器),
  `m` 即是 `currentValue`, `[]` 是 `initialValue`)
- 源码分析: 首先我们知道 `modules` 是编译器的一个选项, 该选项是一个数组, 
  其格式大概如下: 
  ```js
    [ 
      {
          staticKeys: ['staticClass'],
          transformNode,
          genData
      },
      {
          staticKeys: ['staticStyle'],
          transformNode,
          genData
      },
      {
          preTransformNode
      }
  ]
  ```
  可以发现 `modules` 的每一个元素都是一个对象,
  该对象可能包含 `staticKeys` 属性, 也可能不包含, 而 `genStaticKeys`
  函数的作用就是通过对 `modules` 数组的遍历, 将所有的 `staticKeys` 收集到一个数组,
  最终转换成一个以逗号 `,`, 拼接的字符串.
  其实现方式很简单, 对数组 `modules` 使用 `reduce` 函数进行归并, 将所有的
  `staticKeys` 归并到一个数组中, 最后通过 `join(',')` 实现目的.
  ```js
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
  ```

#### 30. `looseEqual` (loose equal 大致相等)
- 描述: 检查两个值是否相等.
- 源码分析: 略
  ```js
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
  ```

#### 31. `looseIndexOf`
- 描述: 返回 `val` 在 `arr` 中的索引.
- 源码分析: `looseIndexOf` 以 `arr`, `val` 作为参数, 返回 `val` 在 `arr`
  中的索引. 通过对数组遍历, 调用 `looseEqual` 方法比较 `arr[i]` 与 `val`
  是否相等, 若为 `true`, 则返回当前索引 `i`, 当循环结束且无和 `val`
  相等的值则返回 `-1`.
  ```js
    export function looseIndexOf(arr: Array<mixed>, val: mixed): number {
        for (let i = 0; i < arr.length; i++) {
            if (looseEqual(arr[i], val)) return i;
        }
        return -1;
    }
  ```

#### 32. `once`
- 描述: 只被调用一次的函数.
- 源码分析: `once` 函数接受一个 `fn` 作为参数, 并返回一个新函数. `called`
  作为一个标识符, 仅当值为 `false` 时调用 `if` 语句, 且将 `called` 值修改为
  `true`, 再次调用将不再执行.
  ```js
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
  ```