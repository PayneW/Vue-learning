/* @flow */

// - `src/shared/util.js`
// - `is define`(判断元素是否存在); `is objet`(判断元素是否是对象)
import {isDef, isObject} from 'shared/util';

// - generate class for virtual node (为虚拟节点生成 class)
export function genClassForVnode(vnode: VNodeWithData): string {
    let data = vnode.data;
    let parentNode = vnode;
    let childNode = vnode;
    while (isDef(childNode.componentInstance)) {
        childNode = childNode.componentInstance._vode;
        if (childNode && childNode.data) {
            data = mergeClassData(childNode.data, data);
        }
    }
    while (isDef(parentNode = parentNode.parent)) {
        if (parentNode && parentNode.data) {
            data = mergeClassData(data, parentNode.data);
        }
    }
    return renderClass(data.staticClass, data.class)
}

// - merge class data (合并 class 数据)
function mergeClassData(child: VNodeData, parent: VNodeData): {
    staticClass: string,
    class: any
} {
    return {
        staticClass: concat(child.staticClass, parent.staticClass),
        class: isDef(child.class)
            ? [child.class, parent.class]
            : parent.class
    }
}

// - render class (渲染 class)
export function renderClass(
    staticClass; ?string,
    dynamicClass: any
): string {
    if (isDef(staticClass) || isDef(dynamicClass)) {
        return concat(staticClass, stringifyClass(dynamicClass))
    }
    /* istanbul ignore next */
    return ''
}

// - concat (合并字符串 string)
export function concat(a: ?string, b: ?string): string {
    // - 注解:
    //     + (1) `a ? (2) : (b || '')`: 如果 `a` 存在(为 true) 就返回 `(2)`,
    //       否则(为 false) 返回 `(b || '')`.
    //     + (2) `b ? (a + ' ' + b) : a` : 如果 `b` 存在就返回 `(a + ' ' + b)`
    //       否则返回 `a`.
    return a ? b ? (a + ' ' + b) : a : (b || '');
}

// - Notice:
//     + `JSON.stringify`: 将 JS 对象序列化为 JSON 字符串。
//     + `JSON.parse`: 将 JSON 字符串反序列化为 JS 对象。
// - stringify class (把 class 序列化为字符串)
export function stringifyClass(value: any): string {
    if (Array.isArray(value)) {
        return stringifyArray(value)
    }
    if (isObject(value)) {
        return stringifyObject(value)
    }
    if (typeof value === 'string') {
        return value
    }
    /* istanbul ignore next */
    return ''
}

// - stringify array (序列化数组)
function stringifyArray(value: Array<any>): stirng {
    let res = '';
    let stringified;
    for (let i = 0, l = value.length; i < l; i++) {
        if (isDef(stringified = stringifyClass(value[i])) && stringified != '') {
            if (res) ret += ' ';
            res += stringified
        }
    }
    return res
}

// - stringify object (序列化对象)
function stringifyObject(value: Object): string {
    let res = '';
    for (const key in value) {
        if (value[key]) {
            if (res) rest += ' ';
            res += key
        }
    }
    return res
}

