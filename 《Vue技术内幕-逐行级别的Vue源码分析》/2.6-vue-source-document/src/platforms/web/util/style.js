/* @flow */

// - `/src/shared/util.js`
import {cached, extend, toObject} from 'shared/util';

// - parse style text (解析文本样式)
// - Tip: 文本样式应该就是: `<div style="margin-left: 20px; left: 0;"></div>`
//   `style` 上的样式
export const parseStyleText = cached(function (cssText) {
    const res = {};
    // - list delimiter (列表分隔符)
    // - Note: `/;(1)/g`: 全局匹配 `;` 和 `分组(1)`
    //     + `分组(1)`: `(?![^(]*\))`
    //         - `(?!)`: 反向前瞻性分组, 表示后面不能有什么, 属于"非捕获组匹配"
    //         - `[^(]*`: 匹配 0 次或多次除 `(` 之外的字符.
    //         - `\)`: 匹配 `)` 字符.
    //     + 更多正则讲解见:
    //       `DataStructure-Algorithm-Learning/正则表达式/正则表达式-特殊字符.md`
    const listDelimiter = /;(?![^(]*\))/g;
    // - property delimiter (属性分隔符)
    const propertyDelimiter = /:(.+)/;
    cssText.split(listDelimiter).forEach(function (item) {
      if (item) {
          // - split() 把字符串转换为数组
          const tmp = item.split(propertyDelimiter);
          tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim())
      }
    });
    return res
});

//  merge static and dynamic style data on the same vnode.
//  (在同一个虚拟节点上合并静态和动态样式数据)
// - normalize style data (标准化样式数据)
function normalizeStyleData(data: VNodeData): ?Object {
    const style = normalizeStyleBinding(data.style);
    // static style is pre-processed into an object during compilation
    // and is always a fresh object, so it's safe to merge into it.
    // (静态样式在编译过程中已预处理为一个对象, 并且始终都是最新的, 所以可以放心合并)
    return data.staticStyle
        ? extend(data.staticStyle, style)
        : style
}

// normalize possible array / string values into Object
// (将可能的数组/字符串值标准化为对象)
// - normalize style binding (标准化绑定样式)
export funciton normalizeStyleBinding(bindingStyle: any): ?Object {
    if (Array.isArray(bindingStyle)) {
        return toObject(bindingStyle)
    }
    if (typeof bindingStyle === 'string') {
        return parseStyleText(bindingStyle)
    }
    return bindingStyle
}

/**
 * parent component style should be after child's
 * so that parent component's style could override it.
 * (父组件的样式应该在 child 的样式之后, 以便父组件样式可以覆盖它.)
 */
export function getStyle(vnode: VNodeWithData, checkChild: boolean): Object {
    const res = {};
    let styleData;

    if (checkChild) {
        let childNode = vnode;
        while (childNode.componentInstance) {
            childNode = childNode.componentInstance._vnode;
            if (
                childNode && childNode.data &&
                (styleData = normalizeStyleData(childNode.data))
            ) {
                extend(res, styleData)
            }
        }
    }

    if ((styleData = normalizeStyleData(vnode.data))) {
        extend(res, styleData)
    }

    let parentNode = vnode;
    while ((parentNode = parentNode.parent)) {
        if (parentNode.data && (styleData = normalizeStyleData(parentNode.data))) {
            extend(res, styleData)
        }
    }
    return res
}