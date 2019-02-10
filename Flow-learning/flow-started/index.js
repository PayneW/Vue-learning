// @flow

function split(str) {
    return str.split(" ");
}
split("Hello");


/** 2. Add type annotations (类型注释/类型注解) */
// 类型注释: 类型注释通常都以 ``:`` 开头, 可以用在方法参数和返回值，还有变量声明，例如:
function add(x:number, y: number): number {
    return x + y;
}
add(22, 11);



/** 3. Nullable types */
function length(x) {
    if (x !== null) {
        return x.length;
    } else {
        return 0;
    }

}
let total = length("Hello") + length(null);


/** 4. Arrays (数组) */
function totalArr(numbers: Array<number>) {
    let result  = 0;
    for (var i = 0; i < numbers.length; i++) {
        result += numbers[i];
    }
    return result;
}
// WebStorm 可以自行检测语法，所以无需单独在 cmd/gitBash 中运行文件
// totalArr([1, 2, 3, "Hello"]);
totalArr([1, 2, 3, 4]);


/** 5. Dynamic code (动态代码) */
function foo(x) {
    if (typeof x === "string") {
        return x.length;
    } else {
        return x;
    }
}
var res = foo("Hello") + foo(42);


/** 模块界限: 在跨模块使用的时候，Flow 需要明确注释。 为了保证 Flow 在各自模块的独立检测，
 * 不去探测别的模块的调用，提高性能。刚好这页提升了模块化变成中代码即文档的风格。 */



class Bar {
    x: string;
    // y 可以使字符串或者数字
    y: string | number | void;
    z: boolean;
    constructor(x: string, y: string | number | void) {
        this.x = x;
        this.y = y;
        this.z = false;
    }
}
let bar: Bar = new Bar("Hello");
// let bar: Bar = new Bar("Hello", 4);

// 解构赋值
let obj: { a: string, b: number, c: Array<string>, d: Bar } = {
    a: "Hello",
    b: 11,
    c: ["Hello", "world"],
    d: new Bar("hello", 3)
};


/** ~~~~~~~~~~~~~ 快速参考 ~~~~~~~~~~~~~~~ */

export type NavigationRoute = {
    key: string,
    // 定义在 titleOne 属性后面的(?)代表是可选的(optional)
    titleOne?: string,
    /* 定义在 titleTow 属性冒号(:)后的(?)代表的是类型可自定义，也就是值的部分除了定义的类型，
     * 也可以是 null 或 undefined, 不过这个属性是需要的，而且你一定要给它一个值。 */
    titleTwo: ?string
}











