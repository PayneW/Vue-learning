/**
 * 實現 mvvm 的雙向綁定， 就必須要實現以下幾點：
 * (1). 实现一个数据监听器 Observer, 能够对数据对象的所有属性进行监听，如有变动可拿到最新值并通知订阅者。
 * (2). 实现一个指令解析器 Compile, 对每个元素节点的指令进行扫描和解析，根据指令模板替换数据，以及绑定相应的更新函数。
 * (3). 实现一个 Watcher, 作为连接 Observer 和 Compile 的桥梁，能够订阅并受到每个属性变动的通知，执行指令绑定的相应回调函数，从而更新视图。
 * (4). mvvm 入口函數，整合以上三者。
 * */



function Observer (data) {
    this.data = data;
    this.walk(data);
}

Observer.prototype = {
    walk: function (data) {
        var me = this;
        Object.keys(data).forEach(function (key) {
            me.convert(key, data[key]);
        })
    },

    convert: function (key, val) {
        this.defineReactive(this.data, key, val);
    },

    defineReactive: function (data, key, val) {
        var dep = new Dep();        // Dependence
        var childObj = observe(val);

        Object.defineProperty(data, key, {
            enumerable: true,       // 可枚举
            configurable: false,    // 不能再define
            get: function () {
                if (Dep.target) {
                    dep.depend();
                }
                return val;
            },
            set: function (newVal) {
                if (newVal === val) {
                    return;
                }
                val = newVal;

                // 新的值是 object 的話，進行監聽
                childObj = observe(newVal);
                // 通知訂閱者
                dep.notify();
            }
        })
    }
};

function observe (value, vm) {
    if (!value || typeof value !== "object") {
        return;
    }
    return new Observer(value);
}

var uid = 0;

// Dependence
function Dep () {
    this.id = uid++;
    this.subs = [];
}
Dep.prototype = {
    addSub: function (sub) {
        this.subs.push(sub);
    },

    depend: function () {
        Dep.target.addDep(this);
    },

    removeSub: function (sub) {
        var index = this.subs.indexOf(sub);
        if (index != -1) {
            this.subs.splice(index, 1);
        }
    },

    notify: function () {
        this.subs.forEach(function (sub) {
            sub.update();
        })
    }
};

Dep.target = null;