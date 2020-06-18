# 理解 Vue3 Reactivity API

- > 文章来源: [深入理解 Vue3 Reactivity API](https://zhuanlan.zhihu.com/p/146097763)



## Catalog
- (1) `effect()` 和 `reactive()`
- (2) `shallowReactive()`
- (3) `readonly()`
- (4) `shallowReadonly()`
- (5) `isReactive()`
- (6) `isReadonly()`
- (7) `isProxy()`
- (8) `markRaw()`
- (9) 哪些数据是可以被代理的?
    + (9.1) `markRaw()` 函数用于让数据不可被代理
- (10) `toRaw()`
- (11) `ReactiveFlags`
- (12) 调度执行 effect - scheduler
- (13) `watchEffect()`
- (14) 异步副作用和 `invalidate`
- (15) 停止一个副作用(`effect`)
- (16) `watchEffect()` 与 `effect()` 的区别
- (17) `track()` 与 `trigger()`
- (18) `ref()`
- (19) `isRef()`
- (20) `toRef()`
- (21) `toRefs()`
- (22)  自动脱 `ref`
- (23) `customRef()`
- (24) `shallowRef()`
- (25) `triggerRef()`
- (26) `unref()`
- (27) `Lazy 的 effect()`
- (28) `computed()`
- (29)  effect 的其他选项 `onTrack` 和 `onTrigger`





## New Words
- **reactivity [ˌriæk'tivəti] --n.反应性; 反应.**
    + vascular reactivity. 血管反应性.
    + Reactivity module can be used as a standalone library.
      响应式(Vue.js)模块可以作为独立库.
- **schedule ['ʃedjuːl]/['skɛdʒul] {UK/US 发音不同}**
  **--n.时间表; 日程; 进度; 日程表. --vt.排定; 安排.**
    + My schedule(n) for next week is very tight[taɪt].
      我下周预定要做的事排的很紧.
    + What is on the schedule(n) (for) today? 今天预定要做的事是什么?
    + Ah. I thought everything was on schedule(n).
      啊. 我觉得一切都在按计划进行.
    + a train schedule. 火车时刻表.
    + a class schedule. 课程表.
    + The mactch is scheduled(vt) for Monday[1 p.m.].
      比赛顶在星期一[下午一点种].
- **scheduler ['ʃedju:lə(r)] --n.调度,调度器; 调度程序; 计划员.**
    + 注意: UK/US 音标虽然相同, 但是发音和上面的 schedule 类似是不一样的.
    + scheduler program. 调度程序.





## Content
一些基础内容, 可作为文档参考.
### (1) `effect()` 和 `reactive()`
- ```js
    import { effect, reactive } from '@vue/reactivity'
    // 使用 reactive() 函数定义响应式数据
    const obj = reactive({ text: 'hello' })
    // 使用 effect() 函数定义副作用函数
    effect(() => {
        document.body.innerText = obj.text
    })

    // 一秒后修改响应式数据, 这会触发副作用函数重新执行
    setTimeout(() => {
    obj.text += ' world'
    }, 1000)
  ```
  `reactive()` 函数接收一个对象作为参数, 并返回一个代理对象. 

  `effect()` 函数用于定义副作用, 它的参数就是副作用函数, 这个函数可能会产生副作用,
  例如上面代码中的 `document.body.innerText = obj.text`.
  在副作用函数内的响应式数据会与副作用函数之间建立联系, 即所谓的依赖收集,
  当响应式数据变化之后, 会导致副作用函数重新执行. 

### (2) `shallowReactive()`
- 定义浅响应数据: 
  ```js
    import { effect, shallowReactive } from '@vue/reactivity'
    // 使用 shallowReactive() 函数定义浅响应式数据
    const obj = shallowReactive({ foo: { bar: 1 } })

    effect(() => {
    console.log(obj.foo.bar)
    })

    obj.foo.bar = 2  // 无效
    obj.foo = { bar: 2 }  // 有效
  ```

### (3) `readonly()`
- 有些数据, 我们要求对用户是只读的, 此时可以使用 `readonly()` 函数, 它的用法如下: 
  ```js
    import { readonly } from '@vue/reactivity'
    // 使用 reactive() 函数定义响应式数据
    const obj = readonly({ text: 'hello' })
    obj.text += ' world' // Set operation on key "text" failed: target is readonly. 
  ```

### (4) `shallowReadonly()`
- 类似于浅响应, shallowReadonly() 定义浅只读数据, 这意味着,
  深层次的对象值是可以被修改的, 在 `Vue` 内部 `props` 就是使用 `shallowReadonly()`
  函数来定义的, 用法如下: 
  ```js
    import { effect, shallowReadonly } from '@vue/reactivity'
    // 使用 shallowReadonly() 函数定义浅只读数据
    const obj = shallowReadonly({ foo: { bar: 1 } })

    obj.foo = { bar: 2 }  // Warn
    obj.foo.bar = 2 // OK
  ```

### (5) `isReactive()`
- 判断数据对象是否是 reactive: 
  ```js
    import { isReactive, reactive, readonly, shallowReactive, shallowReadonly } from '@vue/reactivity'

    const reactiveProxy = reactive({ foo: { bar: 1 } })
    console.log(isReactive(reactiveProxy)) // true
    console.log(isReactive(reactiveProxy.foo)) // true

    const shallowReactiveProxy = shallowReactive({ foo: { bar: 1 } })
    console.log(isReactive(shallowReactiveProxy)) // true
    console.log(isReactive(shallowReactiveProxy.foo)) // false

    const readonlyProxy = readonly({ foo: 1 })
    console.log(isReactive(readonlyProxy)) // false

    const shallowReadonlyProxy = shallowReadonly({ foo: 1 })
    console.log(isReactive(shallowReadonlyProxy)) // false
  ```

### (6) `isReadonly()`
- 用于判断数据是否是 readonly: 
  ```js
    import { isReadonly, reactive, readonly, shallowReactive, shallowReadonly } from '@vue/reactivity'

    console.log(isReadonly(readonly({}))) // true
    console.log(isReadonly(shallowReadonly({}))) // true
    console.log(isReadonly(reactive({}))) // false
    console.log(isReadonly(shallowReactive({}))) // false
  ```

### (7) `isProxy()`
- 用于判断对象是否是代理对象（reactive 或 readonly）: 
  ```js
    import { isProxy, reactive, readonly, shallowReactive, shallowReadonly } from '@vue/reactivity'

    console.log(isProxy(readonly({}))) // true
    console.log(isProxy(shallowReadonly({}))) // true
    console.log(isProxy(reactive({}))) // true
    console.log(isProxy(shallowReactive({}))) // true

    const shallowReactiveProxy = shallowReactive({ foo: {} })
    console.log(isProxy(shallowReactiveProxy))  // true
    console.log(isProxy(shallowReactiveProxy.foo))  // false

    const shallowReadonlyProxy = shallowReadonly({ foo: {} })
    console.log(isProxy(shallowReadonlyProxy))  // true
    console.log(isProxy(shallowReadonlyProxy.foo))  // false
  ```

### (8) `markRaw()`
- `markRaw()` 函数用于让数据不可被代理: 
  
  实际上 `markRaw` 函数所做的事情, 就是在数据对象上定义 `__v_skip` 属性, 从而跳过代理: 
  ```js
    import { markRaw } from '@vue/reactivity'
    const obj = { foo: 1 }
    markRaw(obj) // { foo: 1, __v_skip: true }
  ```

### (9) 哪些数据是可以被代理的?
- 哪些数据是可以被代理的:
    + (1) `Object`、`Array`、`Map`、`Set`、`WeakMap`、`WeakSet`
    + (2)`Object.isFrozen`: 
      ```js
        const obj = { foo: 1 }
        Object.freeze(obj)

        // Object.isFrozen(obj) ==> true
        // proxyObj === obj
        const proxyObj = reactive(obj)
      ```
    + 非 VNode, Vue3 的 VNode 对象带有 `__v_skip: true` 标识,
      用于跳过代理（实际上, 只要带有 `__v_skip` 属性并且值为 `true` 的对象,
      都不会是被代理）, 例如: 
      ```js
        // obj 是原始数据对象
        const obj = reactive({
            foo: 0,
            __v_skip: true
        })
      ```

### (10) `toRaw()`
- 接收代理对象作为参数, 并获取原始对象: 
  ```js
    import { toRaw, reactive, readonly } from '@vue/reactivity'

    const obj1 = {}
    const reactiveProxy = reactive(obj1)
    console.log(toRaw(reactiveProxy) === obj1)  // true

    const obj2 = {}
    const readonlyProxy = readonly(obj2)
    console.log(toRaw(readonlyProxy) === obj2)  // true
  ```
  如果参数是非代理对象, 则直接该值: 
  ```js
    import { toRaw } from '@vue/reactivity'

    const obj1 = {}
    console.log(toRaw(obj1) === obj1) // true
    console.log(toRaw(1) === 1) // true
    console.log(toRaw('hello') === 'hello') // true
  ```

### (11) `ReactiveFlags`
- `ReactiveFlags` 是一个枚举值: 
  
  ![img](https://pic3.zhimg.com/80/v2-cbd4f89cc20793ae3c91523122ec10e2_1440w.jpg)

  它的定义如下: 
  ```ts
    export const enum ReactiveFlags {
        skip = '__v_skip',
        isReactive = '__v_isReactive',
        isReadonly = '__v_isReadonly',
        raw = '__v_raw',
        reactive = '__v_reactive',
        readonly = '__v_readonly'
    }
  ```
  它有什么用呢?举个例子, 我们要定义一个不可被代理的对象: 
  ```js
    import { ReactiveFlags, reactive, isReactive } from '@vue/reactivity'
    const obj = {
        [ReactiveFlags.skip]: true
    }
    const proxyObj = reactive(obj)
    console.log(isReactive(proxyObj)) // false
  ```
  实际上 `markRaw()` 函数就是使用类似的方式实现的. 所以我们不必像如上代码那么做,
  但是在一些高级场景或许会用到这些值. 

  下面简单介绍一下 `ReactiveFlags` 中各个值得作用: 
    + (1) 代理对象会通过 `ReactiveFlags.raw` 引用原始对象
    + (2) 原始对象会通过 `ReactiveFlags.reactive` 或
      `ReactiveFlags.readonly` 引用代理对象
    + (3) 代理对象根据它是 `reactive` 或 `readonly` 的, 将
      `ReactiveFlags.isReactive` 或 `ReactiveFlags.isReadonly`
      属性值设置为 `true`. 

### (12) 调度执行 effect - scheduler
- 来看下面的例子: 
  ```js
    const obj = reactive({ count: 1 })
    effect(() => {
    console.log(obj.count)
    })

    obj.count++
    obj.count++
    obj.count++
  ```
  定义响应式对象 `obj`, 并在 `effect` 内读取它的值, 这样 `effect`
  与数据之间就会建立“联系”, 接着我们连续三次修改 `obj.count` 的值,
  会发现 `console.log` 语句共打印四次（包括首次执行）. 
  
  想像一下, 假如我们只需要把数据的最终的状态应用到副作用中,
  而不是每次变化都重新执行一次副作用函数, 这将对性能有所提升. 实际上我们可以为
  `effect` 传递第二个参数作为选项, 可以指定“调度器”.
  所谓调度器就是用来指定如何运行副作用函数的: 
  ```js
    const obj = reactive({ count: 1 })
    effect(
        () => { console.log(obj.count)},
        {
            // 指定调度器为 queueJob
            scheduler: queueJob
        }
    )

    // 调度器实现
    const queue: Function[] = []
    let isFlushing = false
    function queueJob(job: () => void) {
        if (!queue.includes(job)) queue.push(job)
        if (!isFlushing) {
            isFlushing = true
            Promise.resolve().then(() => {
            let fn
            while(fn = queue.shift()) {
                fn()
            }
            })
        }
    }

    obj.count++
    obj.count++
    obj.count++
  ```
  我们指定 `effect` 的调度器为 `queueJob`, `job` 实际上就是副作用函数,
  我们将副作用函数缓冲到 `queue` 队列中, 并在 `microtask` 中刷新队列,
  由于队列不会重复缓冲相同的 `job`, 因此最终只会执行一次副作用函数. 

  这实际上就是 `watchEffect()` 函数的实现思路. 

### (13) `watchEffect()`
- `watchEffect()` 函数并不在 `@vue/reactivity` 中提供, 而是在
  `@vue/runtime-core` 中提供, 与 `watch()` 函数一起对外暴露. 
  ```js
    const obj = reactive({ foo: 1 })
    watchEffect(() => {
        console.log(obj.foo)
    })

    obj.foo++
    obj.foo++
    obj.foo++
  ```
  这与我们上面刚刚实现的自定义调度器的 `effect` 的效果实际上是一样的. 

### (14) 异步副作用和 `invalidate`
- 异步副作用是很常见的, 例如请求 API 接口: 
  ```js
    watchEffect(async () => {
        const data = await fetch(obj.foo)
    })
  ```
  当 `obj.foo` 变化后, 意味着将会再次发送请求, 那么之前的请求怎么办呢?
  是否应该将之前的请求标记为 `invalidate`?

  实际上, 副作用函数接收一个函数作为参数: 
  ```js
    watchEffect(async (onInvalidate) => {
        const data = await fetch(obj.foo)
    })
  ```
  我们可以调用它来注册一个回调函数, 这个回调函数会在副作用无效时执行: 
  ```js
    watchEffect(async (onInvalidate) => {
        let validate = true
        onInvalidate(() => {
            validate = false
        })
        const data = await fetch(obj.foo)
        if (validate){
            /* 正常使用 data */
        } else {
            /* 说明当前副作用已经无效了, 抛弃即可 */
        }
    })
  ```
  如果不抛弃无效的副作用, 那么就会产生**竟态问题**. 实际上,
  我们很容易就能通过封装 effect() 函数支持注册“无效回调”的功能: 
  ```js
    import { effect } from '@vue/reactivity'

    function watchEffect(fn: (onInvalidate: (fn: () => void) => void) => void) {
        let cleanup: Function
        function onInvalidate(fn: Function) {
            cleanup = fn
        }
        // 封装一下 effect
        // 在执行副作用函数之前, 先使上一次无作用无效
        effect(() => {
            cleanup && cleanup()
            fn(onInvalidate)
        })
    }
  ```
  如果我们再加上调用器, 那实际上就非常接近 `watchEffect` 的真实实现了. 

  什么时候需要 invalidate 掉一个副作用函数呢?
    + 在组件中定义的 effect, 需要在组件卸载时将其 invalidate
    + 在数据变化导致 effect 重新执行时, 需要 invalidate 掉上一次的 effect 执行
    + 用户手动 stop 一个 effect 时

### (15) 停止一个副作用(`effect`)
- `@vue/reactivity` 提供了 `stop` 函数用来停止一个副作用: 
  ```js
    import { stop, reactive, effect } from '@vue/reactivity'
    const obj = reactive({ foo: 1 })

    const runner = effect(() => {
        console.log(obj.foo)
    })
    // 停止一个副作用
    stop(runner)

    obj.foo++
    obj.foo++
  ```
  `effect()` 函数会返回一个值, 这个值其实就是 `effect` 本身,
  我们通常命名它为 `runner`. 
  
  把这个 `runner` 传递给 `stop()` 函数, 就可以停止掉这个 `effect`.
  后续对数据的变更不会触发副作用函数的重新执行. 

### (16) `watchEffect()` 与 `effect()` 的区别
- `effect()` 函数来自于 `@vue/reactivity` , 而 `watchEffect()`
  函数来自于 `@vue/runtime-core`. 它们的区别在于: `effect()` 是非常底层的实现,
  `watchEffect()` 是基于 `effect()` 的封装, `watchEffect()`
  会维护与组件实例以及组件状态(是否被卸载等)的关系, 如果一个组件被卸载, 那么
  `watchEffect()` 也将被 `stop`, 但 `effect()` 则不会. 举个例子: 

#### (16.1) `watchEffect()`
- ```js
    const obj = reactive({ foo: 1 })

    const Comp = defineComponent({
        setup() {
            watchEffect(() => {
                console.log(obj.foo)
            })

            return () => ''
        }
    })

    // 挂载组件
    render(h(Comp), document.querySelector('#app')!)
    // 卸载组件
    render(null, document.querySelector('#app')!)
    obj.foo++ // 副作用函数不会重新执行
  ```
  我们先挂载了组件, 接着又卸载了组件, 最后修改 `obj.foo` 的值,
  并不会导致 `watchEffect` 的副作用函数重新执行. 

#### (16.2) `effect()`
- ```js
    const obj = reactive({ foo: 1 })

    const Comp = defineComponent({
        setup() {
            effect(() => {
                console.log(obj.foo)
            })

            return () => ''
        }
    })

    // 渲染组件
    render(h(Comp), document.querySelector('#app')!)
    // 卸载组件
    render(null, document.querySelector('#app')!)
    obj.foo++
  ```
  但 `effect()` 的副作用函数仍然会被执行, 但我们可以借助 `onUnmounted` API
  解决这个问题: 
  ```js
    const obj = reactive({ foo: 1 })

    const Comp = defineComponent({
        setup() {
            const runner = effect(() => {
            console.log(obj.foo)
            })
            // 组件卸载时, stop 掉 effect
            onUnmounted(() => stop(runner))

            return () => ''
        }
    })

    // 渲染组件
    render(h(Comp), document.querySelector('#app')!)
    // 卸载组件
    render(null, document.querySelector('#app')!)
    obj.foo++
  ```
  当然, 在普通开发中不推荐直接用 `effect()` 啦, 使用 `watchEffect()` 就好了. 

### (17) `track()` 与 `trigger()`
- `track()` 和 `trigger()` 是依赖收集的核心, `track()`
  用来跟踪收集依赖(收集 `effect`), `trigger()` 用来触发响应(执行 `effect`),
  它们需要配合 `effect()` 函数使用: 
  ```js
    const obj = { foo: 1 }
    effect(() => {
        console.log(obj.foo)
        track(obj, TrackOpTypes.GET, 'foo')
    })

    obj.foo = 2
    trigger(obj, TriggerOpTypes.SET, 'foo')
  ```
  如上代码所示, `obj` 是一个普通的对象, 注意它并非是响应式对象. 接着使用 `effect()`
  函数定义了一个副作用函数, 读取并打印 `obj.foo` 的值, 由于 `obj` 是一个普通对象,
  因此它并没有收集依赖的能力, 为了收集到依赖, 我们需要手动调用 `track()` 函数,
  `track()` 函数接收三个参数: 
    + target: 要跟踪的目标对象, 这里就是 `obj`
    + 跟踪操作的类型: `obj.foo` 是读取对象的值, 因此是 `'get'`
    + key: 要跟踪目标对象的 `key`, 我们读取的是 `foo`, 因此 `key` 是 `foo`

  这样, 我们本质上是手动建立一种数据结构: 
  ```js
    // 伪代码
    map : {
        [target]: {
            [key]: [effect1, effect2....]
        }
    }
  ```
  简单的理解, `effect` 与对象和具体操作的 `key`, 是以这种映射关系建立关联的: 
  ```base
    [target]`---->`key1`---->`[effect1, effect2...]
    [target]`---->`key2`---->`[effect1, effect3...]
    [target2]`---->`key1`---->`[effect5, effect6...]
  ```
  既然 `effect` 与目标对象 `target` 已经建立了联系, 那么当然就可以想办法通过
  `target` --> `key` 进而取到 `effect` , 然后执行它们, 而这就是 `trigger()`
  函数做的事情, 所以在调用 `trigger` 函数时我们要指定目标对象和相应的`key`值: 
  ```js
    trigger(obj, TriggerOpTypes.SET, 'foo')
  ```
  这大概就是依赖收集的原理, 但是这个过程是可以自动完成的, 而不需要开发者手动调用
  `track()` 和 `trigger()` 函数, 想要自定完成依赖收集, 那么就需要拦截诸如:
  设置、读取等对值得操作方法才行. 至于实现方式, 无论是 `Object.defineProperty`
  还是 `Proxy` 那就是具体的技术形式了. 

### (18) `ref()`
- `reactive()` 函数可以代理一个对象, 但不能代理基本类型值, 例如字符串、数字,
  `boolean` 等, 这是 `js` 语言的限制, 因此我们需要使用 `ref()`
  函数来间接对基本类型值进行处理:
  ```js
    const refVal = ref(0)
    refVal.value  // 0
  ```
  `ref` 是响应式的:
  ```js
    const refVal = ref(0)
    effect(() => {
    console.log(refVal.value)
    })

    refVal.value = 1  // 触发响应
  ```
  已经了解了 `track()` 和 `trigger()` 函数的你, 仔细思考一下, 实现 `ref()`
  函数是不是非常简单呢:
  ```js
    function myRef(val: any) {
        let value = val

        const r = {
            isRef: true, // 随便加个标识以示区分
            get value() {
            // 收集依赖
            track(r, TrackOpTypes.GET, 'value')
            return value
            },
            set value(newVal: any) {
            if (newVal !== value) {
                value = newVal
                // 触发响应
                trigger(r, TriggerOpTypes.SET, 'value')
            }
            }
        }

        return r
    }
  ```
  现在去试试我们的 `myRef()` 函数吧: 
  ```js
    const refVal = myRef(0)

    effect(() => {
        console.log(refVal.value)
    })

    refVal.value = 1
  ```
  一切 OK.

### (19) `isRef()`
- 我们在实现 `myRef()` 函数时, 可以看到为 `ref` 对象添加了一个标识
  **`isRef: true`**. 因此我们可以封装一个函数 `isRef()`
  函数来判断一个值是不是 `ref`: 
  ```js
    function isRef(val) {
        return val.isRef
    }
  ```
  实际上在 `Vue`3 中使用的标识是 `__v_isRef`, 这无关紧要嘛. 

### (20) `toRef()`
- 丢失响应, 式 reactivity api 的一个问题: 
  ```js
    const obj = reactive({ foo: 1 }) // obj 是响应式数据
    const obj2 = { foo: obj.foo }

    effect(() => {
        console.log(obj2.foo) // 这里读取 obj2.foo
    })

    obj.foo = 2  // 设置 obj.foo 显然无效
  ```
  为了解决这个问题, 我们可以使用 `toRef()` 函数: 
  ```js
    const obj = reactive({ foo: 1 })
    const obj2 = { foo: toRef(obj, 'foo') } // 修改了这里

    effect(() => {
        // 由于 obj2.foo 现在是一个 ref, 因此要访问 .value
        console.log(obj2.foo.value)  
    })

    obj.foo = 2 // 有效
  ```
  `toRef()` 函数用来把一个响应式对象的的某个 `key` 值转换成 `ref`,
  它的实现本身很简单: 
  ```js
    function toRef(target, key) {
        return {
            isRef: true,
            get value() {
                return target[key]
            },
            set value(newVal){
                target[key] = newVal
            }
        }
    }
  ```
  可以看到 `toRef()` 函数比 `ref()` 函数要简单的多, 这是因为 `target`
  本身就是响应的, 因此无需手动 `track()` 和 `trigger()`. 

### (21) `toRefs()`
- `toRef()` 的一个问题是定义起来极其麻烦, 一次只能转换一个 `key`,
  因此我们可以封装一个函数, 直接把一个响应式对象的所有`key`都转成 `ref`,
  这就是 `toRefs()`:
  ```js
    function toRefs(target){
        const ret: any = {}
        for (const key in target) {
            ret[key] = toRef(target, key)
        }
        return ret
    } 
  ```
  这样我们就可以修改前例的代码为: 
  ```js
    const obj = reactive({ foo: 1 })
    // const obj2 = { foo: toRef(obj, 'foo') }
    const obj2 = { ...toRefs(obj) } // 代替上面注释这句代码

    effect(() => {
        // 由于 obj2.foo 现在是一个 ref, 因此要访问 .value
        console.log(obj2.foo.value)  
    })

    obj.foo = 2 // 有效
  ```

### (22)  自动脱 `ref`
- 但是我们发现, 问题虽然解决了, 但是带来了新的问题, 即我们需要通过 `.value`
  访问值才行, 这就带来了另外一个问题: 我们怎么知道一个值是不是 `ref`, 需不需要通过
  `.value` 来访问呢? 因为上面的例子可能会给读者带来疑惑, 我们为什么把问题弄得这么复杂?
  为什么弄了 `obj` 和 `obj2` 这两个变量, 只用 `obj` 不就没问题了嘛?这是因为在
  `Vue` 中, 我们要暴露数据到渲染环境, 怎么暴露呢?
  ```js
    const Comp = {
        setup() {
            const obj = reactive({ foo: 1 })
            return { ...obj }
        }
    }
  ```
  这就会导致丢失响应, 因此我们需要 `toRef()` 还是和 `toRefs()` 函数.
  然而这带来了新的问题,  我们在 `setup` 中暴露出去的数据, 是要在渲染环境中使用的: 
  ```html
    <h1>{{ obj.foo }}</h1>
  ```
  这里我们应该用 `obj.foo` 还是 `obj.foo.value` 呢? 这时就需要你明确知道在
  `setup` 中暴露出去的值, 哪些是 `ref` 哪些不是 `ref`. 因此为了减轻心智负担, 干脆,
  在渲染环境都不需要 `.value` 去取值, 即使是 `ref` 也不需要,
  这就极大的减少的心智负担, 这就是自动脱 `Ref` 功能. 而实现自动`脱 ref`也很简单,
  回看一下刚才的代码: 
  ```js
    const obj = reactive({ foo: 1 })
    // const obj2 = { foo: toRef(obj, 'foo') }
    const obj2 = { ...toRefs(obj) } // 代替上面注释这句代码

    effect(() => {
        // 由于 obj2.foo 现在是一个 ref, 因此要访问 .value
        console.log(obj2.foo.value)  
    })

    obj.foo = 2 // 有效
  ```
  为了自动摆脱 `ref`, 我们可以: 
  ```js
    const obj = reactive({ foo: 1 })
    // const obj2 = { foo: toRef(obj, 'foo') }
    const obj2 = reactive({ ...toRefs(obj) })  // 让 obj2 也是 reactive

    effect(() => {
        console.log(obj2.foo)  // 即使 obj2.foo 是 ref, 我们也不需要 .value 来取值
    })

    obj.foo = 2 // 有效
  ```
  我们只需要让 `obj2` 也是 `reactive` 的即可, 这样, 即使 `obj2.foo` 是 `ref`,
  我们也不需要通过 `.value` 取值, 其实现也很简单, 当我们在对象上读取属性时,
  如果发现其值是 `ref`, 那么直接返回 `.value` 就可以了:
  ```js
    get(target, key, receiver) {
        // ...
        const res = Reflect.get(target, key, receiver)
        if (isRef(res)) return res.value
        // ...
    }
  ```
  但对于由 `ref` 组成的数组, 在渲染环境仍然需要 `.value` 访问. 

### (23) `customRef()`
- `customRef()` 实际上就是手动 `track` 和 `trigger` 的典型例子,
  参考上文中的 `track() 和 trigger()` 一节. 它的源码也极其简单, 大家可以自行查看. 

### (24) `shallowRef()`
- 通常我们使用 `ref()` 函数时, 目的是为了引用原始类型值, 例如: `ref(false)`.
  但我们仍然可以引用非基本类型值, 例如一个对象: 
  ```js
    const refObj = ref({ foo: 1 })
  ```
  此时, `refObj.value` 是一个对象, 这个对象依然是响应的, 例如如下代码会触发响应: 
  ```js
    refObj.value.foo = 2
  ```
  `shallowRef()` 顾名思义, 它只代理 `ref` 对象本身, 也就是说只有 `.value`
  是被代理的, 而 `.value` 所引用的对象并没有被代理: 
  ```js
    const refObj = shallowRef({ foo: 1 })

    refObj.value.foo = 3 // 无效
  ```

### (25) `triggerRef()`
- 我们上面讲过了 `ref()` 函数的实现, 在 `trigger` 一个 `ref` 的时候,
  它的操作类型都是 `SET`, 并且操作的 `key` 都是 `value`: 
  ```js
    trigger(r, TriggerOpTypes.SET, 'value')
  ```
  这里唯一不同的就是 `r`, 也就是 `ref` 本身. 换句话说, 如果一个 `ref` 被 `track` 了,
  那么我们可以手动调用 `trigger` 函数任意去触发响应: 
  ```js
    const refVal = ref(0)
    effect(() => {
        refVal.value
    })

    // 任意次的 trigger
    trigger(refVal, TriggerOpTypes.SET, 'value')
    trigger(refVal, TriggerOpTypes.SET, 'value')
    trigger(refVal, TriggerOpTypes.SET, 'value')
  ```
  而 `triggerRef()` 函数实际上就是封装了这一操作: 
  ```js
    export function triggerRef(ref: Ref) {
        trigger(
            ref,
            TriggerOpTypes.SET,
            'value',
            __DEV__ ? { newValue: ref.value } : void 0
        )
    }
  ```
  那它有什么用呢?上面我们讲过了, `shallowRef()` 函数不会代理 `.value` 所引用的对象,
  因此我们修改对象值的时候不会触发响应, 这时我们可以通过 `triggerRef()`
  函数强制触发响应:
  ```js
    const refVal = shallowRef({ foo: 1 })
    effect(() => {
        console.log(refVal.value.foo)
    })

    refVal.value.foo = 2 // 无效
    triggerRef(refVal)  // 强制 trigger
  ```

### (26) `unref()`
- `unref()` 函数很简单:
  ```js
    export function unref<T>(ref: T): T extends Ref<infer V> ? V : T {
        return isRef(ref) ? (ref.value as any) : ref
    }
  ```
  给它一个值, 如果这个值是 `ref` 就返回 `.value`, 否则原样返回. 

### (27) `Lazy 的 effect()`
- `effect()` 用来运行副作用函数, 默认是立即执行的, 但它可以是 `lazy` 的,
  这时我们可以手动执行它: 
  ```js
    const runner = effect(
        () => { console.log('xxx') },
        { lazy: true }  // 指定 lazy
    )

    runner() // 手动执行副作用函数
  ```
  它有什么用呢?实际上 `computed()` 就是一个 `lazy` 的 `effect`. 

### (28) `computed()`
- 我们先来看看 `computed()` 怎么用: 
  ```js
    const refCount = ref(0)
    const refDoubleCount = computed(() => refCount.value * 2)
  ```
  当我们通过 `refDoubleCount.value` 取值时, 如果 `refCount` 的值没变,
  那么表达式 `refCount.value * 2` 只会计算一次. 这也是 `computed()` 优于
  `methods` 的地方. 

  上面说了 `computed` 就是一个 `lazy` 的 `effect`, 接下来我们证明这个说法. 

  我们可以把问题简化一下, 首先我们有一 `refCount` 和 `doubleCount`,
  其中 `doubleCount` 是根据 `refCount.value * 2` 计算得来的, 如下: 
  ```js
    const refCount = ref(1)
    let doubleCount = 0

    function getDoubleCount() {
        doubleCount = refCount.value * 2
        return doubleCount
    }
  ```
  这样, 我们就可以通过执行 `getDoubleCount()` 函数来取值,
  这段代码实际上我们可以改写一下, 例如: 
  ```js
    const refCount = ref(1)
    let doubleCount = 0

    const runner = effect(() => {
        doubleCount = refCount.value * 2
    }, { lazy: true })

    function getDoubleCount() {
        runner()
        return doubleCount
    }
  ```
  我们定义了一个 `lazy` 的 `effect`, 然后在 `getDoubleCount()` 函数中手动执行
  `runner()` 来计算值. 不过无论怎么改, 都存在一个问题: 即使 `refCount` 的值没变,
  表达式 `refCount.value * 2` 都会执行计算. 
  
  实际上, 我们可以通过一个标志变量 `dirty` 来避免这个问题: 
  ```js
    const refCount = ref(1)
    let doubleCount = 0
    let dirty = true // 定义标志变量, 默认为 true

    const runner = effect(() => {
        doubleCount = refCount.value * 2
    }, { lazy: true })

    function getDoubleCount() {
        if(dirty) {
            runner()  // 只有 dirty 的时候才执行计算
            dirty = false // 设置为 false
        }
        return doubleCount
    }
  ```
  如上代码所示, 我们增加了 `dirty` 变量, 默认为 `true`, 代表脏值, 需要计算,
  所以只有 `dirty` 为 `true` 的时候才执行 `runner()`, 紧接着将 `dirty`
  设置为 `false`, 这样就避免了冗余的计算量. 
  
  但问题是, 现在我们修改 `refCount` 的值, 并在此执行 `getDoubleCount()` 函数,
  得到的仍然是上一次的值, 这是不正确的, 因为 `refCount` 已经变化了, 这是因为 `dirty`
  一直是 `false` 的缘故, 因此问题的解决办法也很简单, 当 `refCount` 值变化之后,
  我们将 `dirty` 再次设置为 `true` 就可以了:
  ```js
    const refCount = ref(1)
    let doubleCount = 0
    let dirty = true // 定义标志变量, 默认为 true

    const runner = effect(
        () => { doubleCount = refCount.value * 2 },
        {
            lazy: true,
            scheduler: () => dirty = true
        }
    )  // 将 dirty 设置为 true

    function getDoubleCount() {
        if(dirty) {
            runner()  // 只有 dirty 的时候才执行计算
            dirty = false // 设置为 false
        }
        return doubleCount
    }
  ```
  如上代码所示, 当 `refCount` 变化之后, 我们知道副作用函数会进行调度执行,
  因此我们提供调度器, 在调度器中仅仅将 `dirty` 设置为 `true` 即可. 

  那其实我们可以把 `getDoubleCount` 函数封装为一个 `getter`: 
  ```js
    const refDoubleCount = {
        get value() {
            if(dirty) {
                runner()  // 只有 dirty 的时候才执行计算
                dirty = false // 设置为 false
            }
            return doubleCount
        }
    }

    refDoubleCount.value
  ```
  这其实机上计算属性的思路了. 

### (29)  effect 的其他选项 `onTrack` 和 `onTrigger`
#### (29.1) onTrack()
- ```js
    const obj = reactive({ foo: 0 })
        effect(
            () => { obj.foo},
            {
                onTrack({ effect, target, type, key }) {
                    // ...
                }
    })
  ```
  参数介绍: 
    + `effect`: track 谁?
    + `target`: 谁 track 的?
    + `type`: 因为啥 track?
    + `key`: 哪个 key track 的?

#### (29.2) onTrigger()
- ```js
    const map = reactive(new Map())
    map.set('foo', 1)

    effect(
        () => {
            for (let item of map){}
        },
        {
            onTrigger({ effect, target, type, key, newValue, oldValue }) {
            // ...
        }
    })

    map.set('bar', 2)
  ```
    + `effect`: trigger 谁?
    + `target`: 谁 trigger 的?
    + `type`: 因为啥 trigger
    + `key`: 哪个 key trigger 的?可能是 undefined, 例如: map.clear() 的时候. 
    + `newValue` 和 `oldValue`: 新旧值

#### (29.3) onStop()
- ```js
    const runner = effect(
        () => {
            // ...
        },
        {
            onStop() {
                console.log('stop...')
        }
    })
    stop(runner)
  ```