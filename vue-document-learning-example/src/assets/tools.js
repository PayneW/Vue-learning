function swap (array, a, b) {
    // - temporary 暂时的
    const temp = array[a];
    array[a] = array[b];
    array[b] = temp;
    // - ES6 的写法
    // [array[a], array[b]] = [array[b], array[a]];
}

export function shuffle (array) {
    // - tip: 因为 Vue 传进来的 array 数据带有 `__ob__: Observer` 属性,
    //   即 Vue 把数据通过 Observer 构造函数变为响应式数据, 所以我们通过下面的方法去除.

    for(let i = array.length; i > 0; i--) {
        let randomIndex = Math.floor(Math.random() * i + 1);
        swap(array, i, randomIndex);
    }
    console.log(array);
    return array;
}
