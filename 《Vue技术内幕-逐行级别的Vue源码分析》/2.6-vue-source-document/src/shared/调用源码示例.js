// - toArray: 把类数组对象转换为数组.
function toArray(list, start) {
    start = start || 0;
    let i = list.length - start;
    const ret = new Array(i);
    while (i--) {
        ret[i] = list[i + start]
    }
    return ret;
}
let arrayLike = {
    0: 'name',
    1: 'age',
    2: 'sex',
    length: 3
}
// [ 'name', 'age', 'sex' ]
// console.log(toArray(arrayLike));


function extend(to, _from) {
    for (const key in _from) {
        to[key] = _from[key];
    }
    return to;
}
// - toObject: 把一个对象数组合并到一个对象中.
function toObject(arr) {
    const res = {};
    for (let i = 0; i < arr.length; i++) {
        if (arr[i]) {
            extend(res, arr[i]);
        }
    }
    return res;
}
let arr = [{name: 'W'}, {age: 31}, {gender: 'male'}];
// { name: 'W', age: 31, gender: 'male' }
// console.log(toObject(arr));


// - genStaticKeys: 生成静态键
function genStaticKeys (modules){
    return modules.reduce((keys, m) => {
        return keys.concat(m.staticKeys || []);
    }, []).join(',');   // - `Array.join()`: 把数组转化为字符串.
}
// - 使用示例
let modules = [         // {flag 0-1}
    {
        staticKeys: ['staticClass'],
        transformNode: 'transformNode',
        genData: 'genData'
    },
    {
        staticKeys: ['staticStyle'],
        transformNode: 'transformNode',
        genData: 'genData'
    },
    {
        preTransformNode: 'preTransformNode'
    }
];
// - staticClass,staticStyle
console.log(genStaticKeys(modules));