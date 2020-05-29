# 第 2 章 Object 的变化侦测

## 本章目录 (Catalog)
- 2.1 什么是变化侦测
- 2.2 如何追踪变化
- 2.3 如何收集依赖
- 2.4 依赖收集在哪里
- 2.5 依赖是谁
- 2.6 什么是 Watcher
- 2.7 递归侦测所有 key
- 2.8 关于 Object 的问题
- 2.9 总结


## 生词 (New Words)
- **observer [əb'zɜːvə] --n.观察者**  


## 内容 (Content)

### 2.2 如何追踪变化
- 如何侦测一个对象的变化? A: 使用 `Object.defineProperty` 或 ES6 的 `Proxy(代理)`

## 本章代码解说 + 调用示例(书上没有调用示例!!! 呵呵...真是服气 ^_^!)
- 完整代码见同级目录 `chapter02-complete-code.html`
- 方便 Markdown 查看粘贴进来:(为了防止改动, 对比时参考 html 代码) 
  ```js
    // - 除了书本上的讲解还参考了: 
    //     + [vue系列--响应式原理实现及Observer源码解析(七)](
    //       https://www.cnblogs.com/tugenhua0707/p/11754291.html)
    //     + 仓库: js-sundry-goods/珠峰/02_MVVM 原理实现/mvvm/mvvm-pure.js

    // - define reactive 定义响应式数据: 每当从 data 的 key 中读取数据时,
    //   get 函数就会触发; 每当往 data 的 key 中设置数据时, set 函数被触发.
    function defineReactive(data, key, val) {
        // - 2.7 新增, 递归子属性
        if (typeof val === 'object') {
            new Observe(val);
        }
        // - 因为当前函数内的 Object.defineProperty 方法(即下一行)让我们可以
        //   监听对象属性值发生改变, 如果值发生改变我们需要通知所有的订阅者, 因为
        //   订阅者全部保存在 Dep 类中, 我们需要先实例化 Dep.
        let dep = new Dep();
        Object.defineProperty(data, key, {
            enumerable: true,
            configurable: true,
            get: function() {
                dep.depend();
                return val;
            },
            set: function(newVal) {
                if (val === newVal) {
                    return;
                }
                val = newVal;
                dep.notify();
            }
        })
    }

    // - 2.7: 我们封装一个 Observer 类, 这个类的作用是将一个数据内的所有属性
    //   (包括子属性) 都转换成 getter/setter的形式, 然后去追踪它们的变化.
    class Observe{
        constructor(value) {
            this.value = value;
            if (!Array.isArray(value)) {
                this.walk(value);
            }
        }
        // - walk 会将每一个属性都转换成 getter/setter 的形式来侦测变化,
        //   这个方法只有在数据类型为 Object 时被调用
        walk(obj) {
            // - Object.keys(): 取得对象上所有可枚举的实例属性,
            const keys = Object.keys(obj);
            for (let i = 0; i < keys.length; i++) {
                defineReactive(obj, keys[i], obj[keys[i]]);
            }
        }
    }

    // - 发布订阅模式--收集订阅者的 Dependence 类 : 用于依赖收集和派发更新.
    //   (每个 Watcher 构造函数的实例都是一个订阅者)
    class Dep{
        constructor() {
            this.subs = [];
        }
        addSub(sub) {
            this.subs.push(sub);
        }
        removeSub(sub) {
            remove(this.subs, sub);
        }
        depend() {
            if (window.target) {
                this.addSub(window.target);
            }
        }
        notify() {
            // - 数组的 slice() 方法, 创建当前数组的一个副本
            const subs = this.subs.slice();
            for (let i = 0, l = subs.length; i < l; i++) {
                subs[i].update();
            }
        }
    }
    function remove(arr, item) {
        if (arr.length) {
            const index = arr.indexOf(item);
            if (index > -1) {
                return arr.splice(index, 1);
            }
        }
    }

    // - 发布订阅模式--中用来实例化订阅者的: Watcher 中介者类, 它的原型上有一个
    //   update 方法, 用于派发更新. 
    class Watcher{
        constructor(vm, expOrFn, cb) {
            this.vm = vm;
            this.getter = parsePath(expOrFn);   // {1}
            this.cb = cb;
            this.value = this.get();
        }
        get() {
            // - this 为当前 Watcher 构造函数的实例
            window.target = this;
            let value = this.getter.call(this.vm, this.vm);
            window.target = undefined;
            return value;
        }
        update() {
            const oldValue = this.value;
            this.value = this.get();
            this.cb.call(this.vm, this.value, oldValue);
        }
    }
    // - \w: 匹配字符, 数字, 下划线. 等于 [a-zA-Z0-9];
    // - [^xyz]: 不匹配这个集合中的任何一个字符.
    const bailRE = /[^\w.$]/;
    // - parsePath(): 解析简单路径, 例如 2.6 中给出的:
    //   vm.$watch('a.b.c', function(newVal, oldVal) {}
    function parsePath(path) {
        if (bailRE.test(path)) {
            return;
        }
        // - split(): 把字符串转换为数组
        const segments = path.split('.');
        return function(obj) {
            for (let i = 0; i < segments.length; i++) {
                if (!obj) {
                    return;
                }
                obj = obj[segments[i]];
            }
            return obj;
        }
    }

    
    // - 调用示例
    function MVVM(options = {}) {
        this.$options = options;
        let data = this._data = this.$options.data;
        
        // - 在 Vue 中 Object/Array 的变化侦测是和模板解析连起来的, 
        //   订阅者 watcher(即 Watcher 构造函数的实例) 是在模板解析中被实例化的,
        //   但是当前章节中还没有讲解模板解析,调用方式如下:
        // - (1) 实例化 Observer 观察者类对 data 数据进行监听(即: 添加访问器属性)
        new Observe(data);
        
        // - (2) 上面 defineReactive 函数中有调用发布订阅模式的 Dep 来把改变的
        //   属性值通知到其他订阅者, 但是订阅者我们还没有实例化, 此处实例化订阅者. 
        // - 变量 data 对象的所有属性, 分别调用.
        Object.keys(data).forEach((key) => {
            if (data.hasOwnProperty(key)) {
                new Watcher(data, key, (newVale, oldVale) => {
                    console.log('新值返回: ', newValue);
                    console.log('旧值返回: ', oldValue);
                })
            }
        })
    }

    let vm = new MVVM({
        el: '#app',
        data: {
            a: {aa: 'I am aa'},
            b: {name: '我是 b 的 name 值'},
            c: '我是 c 属性!'
        }
    });

    // - 在浏览器的控制台中输出下面内容测试:
    // vm._data;
    // vm_data.a;
    // vm_data.a.aa;
    // vm_data.a.aa = "I changed aa's value";
    // vm_data.a.aa;
  ```