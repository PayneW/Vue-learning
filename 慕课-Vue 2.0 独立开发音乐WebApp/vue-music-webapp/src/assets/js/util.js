export function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min +1) + min);
}

export function shuffle (arr) {
    let _arr = arr.slice();
    for (let i = 0; i < _arr.length; i++) {
        let j = getRandomInt(0, i);
        let current = _arr[i];
        _arr[i] = _arr[j];
        _arr[j] = current;
    }
    return _arr;
}

// export function debounce(func, delay) {
//     let timer;
//     return function (...args) {
//         if (timer) {
//             clearTimeout(timer);
//         }
//         timer = setTimeout(() => {
//             func.apply(this, args);
//         }, delay)
//     };
// }

// 10-10 add: 函数防抖
export function debounce(func, wait) {
    let timer;
    return function() {
        let args = arguments;
        let context = this;
        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(function() {
            func.apply(context, args);
        }, wait)
    }
}
