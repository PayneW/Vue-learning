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


// add: 5-5 "设置或取得"元素绑定的 data-xxx(E.g.: index) 属性
export function getData(el, name, val) {
    const prefix = "data-";
    name = prefix + name;
    if (val) {
        return el.setAttribute(name, val);
    }
    else {
        return el.getAttribute(name);
    }
}


// 6-13 add: 封装 js 中为 css 样式添加前缀的代码
let elementsStyle = document.createElement("div").style;
// vendor 浏览器供应商
let vendor = (function() {
    let transformNames = {
        webkit: "webkitTransform",
        Moz: "MozTransform",
        O: "OTransform",
        ms: "msTransform",
        standard: "transform"
    };
    for (let key in transformNames) {
        if (elementsStyle[transformNames[key]] !== undefined) {
            return key
        }
    }

    // 如果全部不支持，那么这个浏览器必定有问题，所以返回 false
    return false;
})();

export function prefixStyle(style) {
    if (vendor === false) {
        return false;
    }
    if (vendor === "standard") {
        return style
    }

    return vendor + style.charAt(0).toUpperCase() + style.substr(1);
}
