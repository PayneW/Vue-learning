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

    }
}