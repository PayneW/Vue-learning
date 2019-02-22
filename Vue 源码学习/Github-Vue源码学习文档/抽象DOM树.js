/**
 *  以前我们需要在各个事件方法中直接操作 DOM 来达到修改视图的目的。但是当应用一大就会变得难以维护。
 * 那我们是不是可以把真实 DOM 树抽象成一棵以 "js对象" 构成的抽象树，在修改抽象树数据后将抽象树
 * 转换成真实 DOM 重绘到也页面呢？ 于是虚拟 DOM 出现了，它是真实 DOM 的一层抽象，用属性描述真
 * 实 DOM 的各个特性。当对象中的属性发生变化的时候，就会去修改视图。
 *  可以想象，最简单粗暴的方法就是将整个 DOM 结构用 innerHTML 修改到页面上，但是这样进行重绘视
 * 图是相当消耗性能的，我们不是不是可以每次只更新它的修改呢? 所以 Vue.js 将 DOM 抽象成一个以
 * js 对象为节点的虚拟 DOM 树，以 VNode 节点模拟真实 DOM，可以对这可抽象树进行创建节点，删除
 * 节点以及修改节点等操作，在这过程中都不需要操作真实 DOM，只需要操作 js 对象后只对差异修改，相
 * 对于整块的 innerHTML 的粗暴式修改，大大提升了性能。修改后经过 diff 算法得出一些需要修改的
 * 最小单位，再将这些小单位的视图进行更新。这样做减少了很多不需要的 DOM 操作，大大提高了性能。
 *  Vue 就使用了这样的抽象节点 VNode, 它是真实 DOM 的一层抽象，而不依赖某个平台，它可以是浏
 * 览器平台，也可以是 weex, 甚至是 node 平台也可以对这样一棵抽象 DOM 树进行创建删除修改等操
 * 作，这也为前后端同构提供了可能。
 * */

/** VNode 基类 : 先来看一下 Vue.js 源码中对 VNode 类的定义 */
export default class VNode {
    tag: string | void;
    data: VNodeData | void;
    children: ?Array<VNode>;
    text: string | void;
    elm: string | void;
    ns: string | void;
    // rendered in this component's scope
    context: Component | void;
    // only for functional component root nodes
    functionalContext: Component | void;
    key: string | number | void;
    componentOptions: VNodeComponentOptions | void;
    // component instance
    componentInstance: Component | void;
    // component placeholder node
    parent: VNode | void;
    // contains raw HTML? (server only)
    raw: boolean;
    // hoisted static node
    isStatic: boolean;
    // necessary for enter transition check
    isRootInsert: boolean;
    // empty comment placeholder?
    isComment: boolean;
    // is a cloned node?
    isCloned: boolean;
    // is a v-once node?
    isOnce: boolean;

    constructor(
        tag?: string,
        data?: VNodeData,
        children?: ?Array<VNode>,
        text?: string,
        elm?: Node,
        context?: Component,
        componentOptions?: VNodeComponentOptions
    ) {
        // 当前节点的标签名
        this.tag = tag;
        // 当前节点对应的对象，包含了具体的一些数据信息，是一个 VNodeData 类型，可以参考 VNodeData 类型中的数据信息
        this.data = data;
        // 当前节点的子节点，是一个数组
        this.children = children;
        // 当前节点的文本
        this.text = text;
        // 当前虚拟节点对应的真实 DOM 节点
        this.elm = elm;
        // 当前节点的名字空间(nameSpace)
        this.ns = undefined;
        // 当前节点的编译作用域 (context: 上下文)
        this.context = context;
        // 函数化组件作用域 (函数上下文)
        this.functionalContext = undefined;
        // 节点的 key 属性，被当作节点的标志，用于优化
        this.key = data && data.key;
        // 组件的 option 选项
        this.componentOptions = componentOptions;
        // 当前节点对应的组件的实例
        this.componentInstance = undefined;
        // 当前节点的父节点
        this.parent = undefined;
        // 简而言之就是是否为原生 HTML 或只是普通文本，innerHTML 的时候为 true, textContent 的时候为 false
        this.raw = false;
        // 静态节点标志
        this.isStatic = false;
        // 是否作为根节点插入
        this.isRootInsert = true;
        // 是否为注释节点
        this.isComment = false;
        // 是否为克隆节点
        this.isCloned = false;
        // 是否有 v-once 指令
        this.isOnce = false;

        // DEPRECATED: alias for componentInstance for backwards compat.
        // istanbul ignore next
        get child(): Component| void {
            return this.componentInstance;
        }
    }

};


/*
 * 打个比方，比如说我现在有这么一个 VNode 树
 * {
 *   tag: 'div'
 *   data: { class: 'test' },
 *   children: [
 *       {
 *           tag: 'span',
 *           data: { class: 'demo' }
 *           text: 'hello,VNode'
 *       }
 *   ]
 * }
 *
 * 渲染之后的结果就是这样的
 * <div class="test">
 *     <span class="demo">hello,VNode</span>
 * </div>
 *
 */


/** 生成一个新的 VNode 的方法: 下面这些方法都是一些常用的构造 VNode 的方法 */
// 1. createEmptyVNode 创建一个空 VNode 节点
export const createEmptyVNode = () => {
    const node = new VNode();
    node.text = "";
    node.isComment = true;
    return node;
};

// 2. createTextVNode 创建一个文本节点
export function createTextVNode(val: string | number) {
    return new VNode(undefined, undefined, undefined, String(val));
};


// 3. createComponent 创建一个组件节点
// plain options object: turn it into a constructor 普通选项对象: 将其转换为一个构造函数
if (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor)
}

// if at this stage it's not a constructor or an async component factory,
// reject.
/*Github:https://github.com/answershuto*/
/*如果在该阶段Ctor依然不是一个构造函数或者是一个异步组件工厂则直接返回*/
if (typeof Ctor !== 'function') {
    if (process.env.NODE_ENV !== 'production') {
        warn(`Invalid Component definition: ${String(Ctor)}`, context)
    }
    return
}

// async component
/*处理异步组件*/
if (isUndef(Ctor.cid)) {
    Ctor = resolveAsyncComponent(Ctor, baseCtor, context)
    if (Ctor === undefined) {
        // return nothing if this is indeed an async component
        // wait for the callback to trigger parent update.
        /*如果这是一个异步组件则会不会返回任何东西（undifiened），直接return掉，等待回调函数去触发父组件更新。s*/
        return
    }
}

// resolve constructor options in case global mixins are applied after
// component constructor creation
resolveConstructorOptions(Ctor)

data = data || {}

// transform component v-model data into props & events
if (isDef(data.model)) {
    transformModel(Ctor.options, data)
}

// extract props
const propsData = extractPropsFromVNodeData(data, Ctor, tag)

// functional component
if (isTrue(Ctor.options.functional)) {
    return createFunctionalComponent(Ctor, propsData, data, context, children)
}

// extract listeners, since these needs to be treated as
// child component listeners instead of DOM listeners
const listeners = data.on
// replace with listeners with .native modifier
data.on = data.nativeOn

if (isTrue(Ctor.options.abstract)) {
    // abstract todo-components do not keep anything
    // other than props & listeners
    data = {}
}

// merge component management hooks onto the placeholder node
mergeHooks(data)

// return a placeholder vnode
const name = Ctor.options.name || tag
const vnode = new VNode(
    `vue-component-${Ctor.cid}${name ? `-${name}` : ''}`,
    data, undefined, undefined, undefined, context,
    { Ctor, propsData, listeners, tag, children }
)
return vnode
}












/***/
/***/
/***/
/***/
/***/
