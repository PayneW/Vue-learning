/** 公共的修改 DOM 的方法 */

export function addClass(el, className) {
    if (hasClass(el, className)) return;
    let newClass = el.className.split(" ");
    newClass.push(className);
    el.className = newClass.join(" ");
}

export function hasClass(el, className) {
    // \s: 匹配一个空白字符
    let reg = new RegExp("(^|\\s+)" + className + "(\\s+|$)");
    return reg.test(el.className)
}
