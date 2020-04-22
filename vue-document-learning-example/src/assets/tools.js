function swap (array, a, b) {
    // - temporary 暂时的
    const temp = array[a];
    array[a] = array[b];
    array[b] = temp;
    // - ES6 的写法
    // [array[a], array[b]] = [array[b], array[a]];
}

// export function shuffle (array) {
//     // - tip: 因为 Vue 传进来的 array 数据带有 `__ob__: Observer` 属性,
//     //   即 Vue 把数据通过 Observer 构造函数变为响应式数据, 所以我们通过下面的方法去除.
//     // - `JSON.stringify()`: 把 JS 对象序列化为 JSON 字符串.
//     // - `JSON.parse()`: 把 JSON 字符串解析为原生 JS 值.
//     array = JSON.parse(JSON.stringify(array));
//
//     for(let i = array.length; i > 0; i--) {
//         let randomIndex = Math.floor(Math.random() * i + 1);
//         swap(array, i, randomIndex);
//     }
//     console.log(array);
//     return array;
// }


/*
 * @param {Array} source: The array to copy values from.(要从中赋值值的数组)
 * @param {Array} [array=[]] The array to copy values to.(将值复制到的数组)
 * @return {Array} Returns `array`.
 */
function copyArray(source, array) {
    let index = -1;
    let length = source.length;

    array || (array = Array(length));
    // - ++index 先递增再做比较
    while(++index < length) {
        array[index] = source[index];
    }
    return array;
}
