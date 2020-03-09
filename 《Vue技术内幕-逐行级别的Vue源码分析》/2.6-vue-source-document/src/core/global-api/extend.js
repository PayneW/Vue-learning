  // - ../src/core/global-api/extend.js (全部代码)

  /* @flow */
  import {ASSET_TYPES} from 'shared/constants';                   // {7-1}
  import {defineComputed, proxy} from '../instance/state';        // {7-2}
  import {extend, mergeOptions, validateComponentName} from '../util/index'; // {7-3}

  // - inital extend 初始化扩展
  export function initExtend (Vue: GlobalAPI) {                   // {7-4}
      // - Each instance constructor, including Vue, has a unique cid,
      //   The enables us to create wrapped "child constructors" for 
      //   prototypal inheritance and cache them.
      // - 每个实例构造函数(包括 Vue), 都有一个唯一的 cid, 它可以为原型继承创建包装的
      //   "子构造函数" 并对其进行缓存.
      Vue.cid = 0;                                                // {7-5}
      let cid = 1;                                                // {7-6}

      // - Class inheritance (类继承)
      Vue.extend = function(extendOptions: Object): Function {    // {7-7}
          extendOptions = extendOptions || {};                    // {7-8}
          const Super = this;                                     // {7-9}
          const SuperId = Super.cid;                              // {7-10}
          const cachedCtors = 
              extendOptions._Ctor || (extendOptions._Ctor = {});  // {7-11}
          if (cachedCtors[SuperId]) {                             // {7-12}
              return cachedCtors[SuperId];                        // {7-13}
          }

          const name = extendOptions.name || Super.options.name;  // {7-14}
          if (process.env.NOED_ENV !== 'production' && name) {    // {7-15}
              validateComponentName(name);                        // {7-16}
          }

          const Sub = function VueComponent(options) {            // {7-17}
              this._init(options);                                // {7-18}
          };
          // - 利用 Object.create() 方法克隆一个对象, 其原型为 Super.prototype
          Sub.prototype = Object.create(Super.prototype);         // {7-19}
          Sub.prototype.constructor = Sub;                        // {7-20}
          Sub.cid = cid++;                                        // {7-21}
          Sub.options = mergeOptions(                             // {7-22}
              Super.options,
              extendOptions
          );
          Sub['super'] = Super;                                   // {7-23}

          // - For props and computed properties, we define the proxy
          //   getters on the Vue instances at extension time, on the
          //   extended prototype. This avoids Object.defineProperty calls
          //   for each instance created. 
          // - 对于 props 和 可计算属性, 我们在扩展时在 Vue 实例上定义了代理获取器,
          //   它实际是在扩展的原型上. 这样可以避免为每个创建的实例调用
          //   Object.defineProperty.
          if (Sub.prototype.props) {                              // {7-24}
              initProps(Sub);                                     // {7-25}
          }
          if (Sub.options.computed) {                             // {7-26}
              initComputed(Sub);                                  // {7-27}
          }

          // - allow further extension/mixin/plugin usage.
          // - 允许进一步扩展/混合/插件使用.
          Sub.extend = Super.extend;                              // {7-28}
          Sub.mixin = Super.mixin;                                // {7-29}
          Sub.use = Super.use;                                    // {7-30}

          // - create asset registers, so extended classes can have their
          //   private assets too. (创建资产注册, 因此扩展库也可以有它们的私有资产.)
          ASSET_TYPES.forEach(function(type) {                    // {7-31}
              Sub[type] = Super[type]                             // {7-32}
          });
          // - enable recursive self-lookup. (启用递归自查)
          if (name) {                                             // {7-33}
              Sub.options.components[name] = Sub;                 // {7-34}
          }

          // - keep a reference to the super options at extension time.
          //   later at instantiation we can check if Super's options have
          //   been updated.
          // - 在扩展时保留对父级选项的引用. 稍后在实例化时, 我们可以检查 Super
          //   的选项是否已更新.
          Sub.superOptions = Super.optoins;                       // {7-35}
          Sub.extendOptions = extendOptions;                      // {7-36}
          Sub.sealedOptions = extend({}, Sub.options);            // {7-37}
          
          // - cache constructor (缓存构造函数)
          cachedCtors[SuperId] = Sub;                             // {7-38}
          return Sub;                                             // {7-39}
      }
  }

  function initProps(Comp) {                                      // {7-40}
      const props = Comp.options.props;                           // {7-41}
      for (const key in props) {                                  // {7-42}
          proxy(Comp.prototype, `_props`, key);                   // {7-43}
      }
  }

  function initComputed(Comp) {                                   // {7-44}
      const computed = Comp.options.computed;                     // {7-45}
      for (const key in computed) {                               // {7-46}
          defineComputed(Comp.prototype, key, computed[key]);     // {7-47}
      }
  }