//构造函数
function MyVue(options) {
    this._init(options)
}

//_init函数(只保留initState)
MyVue.prototype._init = function (options) {
    const vm = this
    vm.$options = options
    vm._renderProxy = vm
    initState(vm)
    vm.$mount()
}
//$mount函数合二为一,删除el有关内容
MyVue.prototype.$mount = function () {
    function render() {
        with (this) {
            return `我的名字: ${name}, 我的年龄: ${age}`
        }
    }

    this.$options.render = render
    mountComponent(this)
}
//实际在renderMixin中被注册
MyVue.prototype._render = function () {
    const vm = this
    const render = vm.$options.render
    var value = render.call(vm._renderProxy)
    console.log(value)
}

//挂载元素
function mountComponent(vm) {
    let updateComponent = () => {
        vm._render()
    }
    new Watcher(vm, updateComponent, noop, null, true /* isRenderWatcher */)
}

function initState(vm) {
    vm._watchers = []
    const opts = vm.$options
    if (opts.data) {
        initdata(vm)
    } else {
        observe(vm._data = {}, true)
    }
}

function initdata(vm) {
    let data = vm._data = vm.$options.data
    const keys = Object.keys(data)
    let i = keys.length
    while (i--) {
        const key = keys[i]
        proxy(vm, '_data', key)
    }
    observe(data, true)
}

const sharedPropertyDefinition = {
    enumerable: true,
    configurable: true,
    get: function (a, b, c) {
    },
    set: function (a, b, c) {
    },
}

function proxy(target, sourceKey, key) {
    sharedPropertyDefinition.get = function proxyGetter() {
        return this[sourceKey][key]
    }
    sharedPropertyDefinition.set = function proxySetter(val) {
        this[sourceKey][key] = val
    }
    Object.defineProperty(target, key, sharedPropertyDefinition)
}

//一些工具函数
//--------------------------------------------------------------
function noop(a, b, c) {
}

// 检查对象
function isObject(obj) {
    return obj !== null && typeof obj === 'object'
}

// 检查纯对象
const _toString = Object.prototype.toString

function isPlainObject(obj) {
    return _toString.call(obj) === '[object Object]'
}

// 声明属性
function def(obj, key, val, enumerable) {
    Object.defineProperty(obj, key, {
        value: val,
        enumerable: !!enumerable,
        writable: true,
        configurable: true
    })
}

//-----------------------------------------------------------------
//-----------------------------------------------------------------
//Observe有关内容
function observe(value, asRootData) {
    if (!isObject(value)) {
        return
    }
    let ob
    if (value.hasOwnProperty('__ob__') && value.__ob__ instanceof Observer) {
        ob = value.__ob__
        //1.观察者的状态能够被改变,默认为true
        //2.不是服务器端的渲染
        //3.data是一个数组或则是对象
        //4.data可以添加新的属性
        //5.data不是Vue的一个实例
    } else if (
        (Array.isArray(value) || isPlainObject(value)) && !value._isVue
    ) {
        ob = new Observer(value)
    }
    if (asRootData && ob) {
        ob.vmCount++
    }
    return ob

}

class Observer {
    constructor(value) {
        this.value = value
        this.dep = new Dep()
        this.vmCount = 0
        def(value, '__ob__', this)
        if (Array.isArray(value)) {
            //todo 和数组有关,这里会覆写数组原来的办法,因为数组方法无法使用set,get
            //内容较多不做展开
        } else {
            this.walk(value)
        }
    }

    walk(obj) {
        const keys = Object.keys(obj)
        for (let i = 0; i < keys.length; i++) {
            defineReactive(obj, keys[i], obj[keys[i]])
        }
    }
}

function defineReactive(obj, key, val, customSetter, shallow) {
    const dep = new Dep()
    const property = Object.getOwnPropertyDescriptor(obj, key)
    if (property && property.configurable === false) {
        return
    }
    const getter = property && property.get
    const setter = property && property.set
    let childOb = !shallow && observe(val)
    Object.defineProperty(obj, key, {
        enumerable: true,
        configurable: true,
        get: function reactiveGetter() {
            const value = getter ? getter.call(obj) : val
            if (Dep.target) {
                dep.depend()
                if (childOb) {
                    childOb.dep.depend()
                    if (Array.isArray(value)) {
                        dependArray(value)
                    }
                }
            }
            return value
        },
        set: function reactiveSetter(newVal) {
            const value = getter ? getter.call(obj) : val
            if (newVal === value || (newVal !== newVal && value !== value)) {
                return
            }
            if (setter) {
                setter.call(obj, newVal)
            } else {
                val = newVal
            }
            childOb = !shallow && observe(newVal)
            dep.notify()
        }
    })
}

// ------------------------------------------------------------------
// ------------------------------------------------------------------
// Dep有关内容
let duid = 0

class Dep {
    constructor() {
        this.id = duid++
        this.subs = []
    }

    addSub(sub) {
        this.subs.push(sub)
    }

    removeSub(sub) {
        remove(this.subs, sub)
    }

    depend() {
        if (Dep.target) {
            Dep.target.addDep(this)
        }
    }

    notify() {
        const subs = this.subs.slice()
        for (let i = 0, l = subs.length; i < l; i++) {
            subs[i].update()
        }
    }
}

Dep.target = null
const targetStack = []

function pushTarget(_target) {
    if (Dep.target) targetStack.push(Dep.target)
    Dep.target = _target
}

function popTarget() {
    Dep.target = targetStack.pop()
}

//------------------------------------------------------------------
//------------------------------------------------------------------
//Watcher相关内容
let wuid = 0

class Watcher {
    constructor(vm, expOrFn, cb, options, isRenderWatcher) {
        this.vm = vm
        vm._watchers.push(this)
        this.cb = cb
        this.id = ++wuid // uid for batching
        this.deps = []
        this.newDeps = []
        //Set数据结构,可过滤掉重复的key值
        this.depIds = new Set()
        this.newDepIds = new Set()
        this.getter = expOrFn
        this.value = this.get()
    }

    get() {
        pushTarget(this)
        let value
        const vm = this.vm
        value = this.getter.call(vm, vm)
        // "touch" every property so they are all tracked as
        // dependencies for deep watching
        popTarget()
        this.cleanupDeps()
        return value
    }

    addDep(dep) {
        const id = dep.id
        if (!this.newDepIds.has(id)) {
            this.newDepIds.add(id)
            this.newDeps.push(dep)
            if (!this.depIds.has(id)) {
                dep.addSub(this)
            }
        }
    }

    cleanupDeps() {
        let i = this.deps.length
        while (i--) {
            const dep = this.deps[i]
            if (!this.newDepIds.has(dep.id)) {
                dep.removeSub(this)
            }
        }
        let tmp = this.depIds
        this.depIds = this.newDepIds
        this.newDepIds = tmp
        this.newDepIds.clear()
        tmp = this.deps
        this.deps = this.newDeps
        this.newDeps = tmp
        this.newDeps.length = 0
    }

    update() {
        console.log('如果数据被更新,我会被执行到')
        //queueWatcher(this)
    }

    depend() {
        let i = this.deps.length
        while (i--) {
            this.deps[i].depend()
        }
    }
}

var demo = new MyVue({
    data: {
        name: "qjc",
        age: "18"
    }
})

demo.name = 'qdd'
