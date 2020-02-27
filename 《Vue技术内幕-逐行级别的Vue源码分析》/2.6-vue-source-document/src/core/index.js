 // - ../src/core/index.js (全部代码)
  
  // - 从 Vue 的出生文件导入 Vue
  import Vue from './instance/index';                 // {3-1}
  import {initGlobalAPI} from './global-api/index';   // {3-2}
  import {isServerRendering} from 'core/util/env';    // {3-3}
  import {FunctionalRenderContext} from
  'core/vdom/create-functional-component';            // {3-4}

  // - 将 Vue 构造函数作为参数传递给 initGlobalAPI 方法, 该方法来自
  //   `../src/core/global-api/index.js` 文件.
  initGlobalAPI(Vue);                                 // {3-5}

  // - 在 Vue.prototype 上添加 $isServer 属性, 该属性代理了来自
  //   `core/util/env.js` 文件的 isServerRendering 方法.
  Object.defineProperty(Vue.prototype, '$isServer', { 
      get: isServerRendering
  });                                                 // {3-6}

  // - 在 Vue.prototype 上添加 $ssrContext 属性
  Object.defineProperty(Vue.prototype, '$ssrContext', {
      get() {
          // - istanbul ignore next.
          // - TIP: Istanbul 是 JS 程序的代码覆盖率工具.
          //   `/* istanbul ignore next */` 注释语法, 允许某些代码不计入覆盖率.
          return this.$vnode && this.$vnode.ssrContext;
      }
  })                                                  // {3-7}

  // - expose FunctionalRenderContext for ssr runtime helper installation
  Object.defineProperty(Vue, 'FunctionalRenderContext', {
      value: FunctionalRenderContext
  })                                                  // {3-8}

  // - Vue.version 存储了当前 Vue 的版本号
  Vue.version = '__VERSION__';                        // {3-9}

  // - 导出 Vue
  export default Vue                                  // {3-10}