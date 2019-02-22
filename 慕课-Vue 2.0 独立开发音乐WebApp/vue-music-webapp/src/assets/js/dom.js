/** 公共的修改 DOM 的方法 */

export function addClass(el, className) {
    if (hasClass(el, className)) return;
    // 字符串的 split 方法: 基于指定的分隔符将一个字符串分割成多个子字符串，并将结果放在一个数组中
    let newClass = el.className.split(" ");
    newClass.push(className);
    // join( )数组方法。只接收一个参数，即用作分隔符的字符串，然后返回包含所有数组项的字符串
    el.className = newClass.join(" ");
}

export function hasClass(el, className) {
    // \s: 匹配一个空白字符
    let reg = new RegExp("(^|\\s+)" + className + "(\\s+|$)");
    return reg.test(el.className)
}
