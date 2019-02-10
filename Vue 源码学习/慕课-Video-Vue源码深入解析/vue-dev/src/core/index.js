// 实例化的引入
import Vue from './instance/index'
// 初始化一些全局 API
import { initGlobalAPI } from './global-api/index'
// 从判断执行环境中的引入是否是 ssr 环境， 是一个 Boolean 类型
import { isServerRendering } from 'core/util/env'
// virtualDom 编译成 renderContext 的方法
import { FunctionalRenderContext } from 'core/vdom/create-functional-component'

// 开始执行初始化全局变量
initGlobalAPI(Vue);

// Vue.prototype.$isServer = boolean
// 用于判断是否是服务器环境
Object.defineProperty(Vue.prototype, '$isServer', {
  get: isServerRendering
});

// Vue.prototype.$ssrContext
// ssr 服务器端渲染 ssrContext 服务器端渲染上下文
Object.defineProperty(Vue.prototype, '$ssrContext', {
  get () {
    /* istanbul ignore next */
    return this.$vnode && this.$vnode.ssrContext
  }
});
// expose FunctionalRenderContext for ssr runtime helper installation
// 为 vue 原型定义当 ssr 环境运行时去加载 FunctionalRenderContext 方法
Object.defineProperty(Vue, 'FunctionalRenderContext', {
  value: FunctionalRenderContext
});

Vue.version = '__VERSION__';

// 导出 Vue
export default Vue
