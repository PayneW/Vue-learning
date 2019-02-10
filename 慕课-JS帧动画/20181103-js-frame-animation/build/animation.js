(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["animation"] = factory();
	else
		root["animation"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/animation.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/animation.js":
/*!**************************!*\
  !*** ./src/animation.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var loadImage = __webpack_require__(/*! ./imageLoader */ "./src/imageLoader.js");
var Timeline = __webpack_require__(/*! ./timeline */ "./src/timeline.js");


// 初始化状态 initial (使用类似与常量的写法写变量(js不分常量和变量)，常量的写法一般用大写)
let STATE_INITIAL = 0;
// 开始状态
let STATE_START = 1;
// 停止状态
let STATE_STOP = 2;


// 同步任务
var TASK_SYNC = 0;
// 异步任务
var TASK_ASYNC = 1;


/**
 * 简单的函数封装，执行 callback
 * @param callback 执行函数
 */
function next(callback) {
    callback && callback();
}


/**
 * 帧动画类
 * @constructor
 */
function Animation() {
    // 帧动画库的任务链，定义为一个数组
    this.taskQueue = [];
    // 初始化索引
    this.index = 0;
    // 引用时间轴函数
    this.timeline = new Timeline();
    // 初始化状态
    this.state = STATE_INITIAL;
}

Animation.prototype = {
    constructor: Animation,

    /**
     * 添加一个同步任务，预加载图片
     * @param imgList 图片数组
     */
    loadImage: function (imgList) {
        var taskFn = function (next) {
            // 调用 slice() 方法是得到当前数组的一个副本
            // 图片预加载完成过后 next 回调函数执行
            loadImage(imgList.slice(), next);
        };
        var type = TASK_SYNC;
        return this._add(taskFn, type);
    },

    /**
     * 添加一个异步定时任务，通过定时改变图片背景位置，实现帧动画
     * @param   ele       dom对象
     * @param   positions 背景位置数组
     * @param   imageUrl  图片地址
     */
    changePosition: function (ele, positions, imageUrl) {
        var len = positions.length;
        var taskFn, type;
        if (len) {
            var me = this;
            // 如果 position 是一个数组，那就是个异步的定时任务，此时 taskFn 就是一个函数
            taskFn = function(next, time) {
                if (imageUrl) {
                    ele.style.backgroundImage = "url(" + imageUrl + ")";
                }
                /**
                 * 按位或操作符由一个竖线符号 (|) 表示 :
                 *   先将数值转换为 32 位二进制"整数值"(如果有小数则忽略)，再对二进制上每一位进行或运算，得出结果。
                 *   按位或操作只要有一个位是 1 就返回 1，只有在两个位都是 0 的情况下才返回 0。
                 * xxx|0, 因为 0 的二进制就是 32 个 0, 无论任何书对 0 进行或运算都是原来的书，因此可以用它来
                 * 进行向下取整。
                 */
                console.log("time/me.interval | 0: ", time/me.interval | 0);
                // 获得当前背景图片位置索引
                var index = Math.min(time/me.interval | 0, len-1);
                var position = positions[index].split(" ");
                // 改变 dom 对象的背景图片位置
                ele.style.backgroundPosition = position[0] + "px " + position[1] + "px";
                // 如果当前动画已经执行完毕
                if (index === len -1) {
                    // 调用下一个
                    next();
                }
                type = TASK_ASYNC;
            }
        } else {
            taskFn = next;
            type = TASK_SYNC;
        }

        return this._add(taskFn, type);
    },

    /**
     * 添加异步定时任务，通过定时改变 image 标签的 src 属性，实现帧动画
     * @param   ele     image 标签
     * @param   imgList 图片数组
     */
    changeSrc: function (ele, imgList) {
        var len = imgList.length;
        var taskFn, type;
        if (len) {
            var me = this;
            taskFn = function (next, time) {
                // 获取当前图片索引
                var index = Math.min(time/me.interval | 0, len -1);
                // 改变 image 对象的图片地址
                ele.src = imgList[index];
                if (index === len-1) {
                    next();
                }
            };
            type = TASK_ASYNC;
        } else {
            taskFn = next;
            type= TASK_SYNC;
        }

        return this.add(taskFn, type);
    },

    /**
     * 高级用法，添加一个异步定时执行的任务，该任务自定义动画每帧执行的任务函数
     * @param taskFn  自定义每帧执行的任务函数
     */
    enterFrame: function (taskFn) {
        return this._add(taskFn, TASK_ASYNC);
    },

    /**
     * 添加一个同步任务，可以在上一个任务完成后执行回调函数
     * @param   callback   回调函数
     */
    then: function (callback) {
        var taskFn = function(next) {
            callback(this);
            next();
        };
        var type = TASK_SYNC;
        return  this._add(taskFn, type);
    },

    /**
     * 开始执行任务，异步定义任务执行的间隔
     * @param   interval
     */
    start: function (interval) {
        // 如果任务已经开始，则返回
        if (this.state === STATE_START) {
            return this;
        }
        // 如果任务链中没有任务，则返回
        if (!this.taskQueue.length) {
            return this;
        }
        this.state = STATE_START;
        this.interval = interval;
        this._runTask();
        return this;
    },

    /**
     * 添加一个同步任务，该任务就是回退到上一个任务中，
     * 实现重复上一个任务的效果，可以定义重复的次数
     * @param   times  重复次数
     */
    repeat: function (times) {
        var me = this;
        var taskFn = function() {
            if (typeof times === "undefined") {
                // 无限回退到上一个任务
                me.index--;
                me._runTask();
                return;
            }
            if (times) {
                times--;
                // 回退到上一个任务
                me.index--;
                me._runTask();
            } else {
                // 达到重复次数，跳转到下一个任务
                var task = me.taskQueue[me.index];
                me._next(task);
            }
        };
        var type = TASK_SYNC;

        return this._add(taskFn, type);
    },

    /**
     * 添加一个同步任务，相当于 repeat() 更友好的接口，无限循环上一次任务
     */
    repeatForever: function () {
        return this.repeat();
    },

    /**
     * 设置当前任务执行结束后到下一个任务开始前的等待时间
     * @param   time  等待时长
     */
    wait: function (time) {
        if (this.taskQueue && this.taskQueue.length > 0) {
            // 给当前对象添加一个 wait 属性
            this.taskQueue[this.taskQueue.length - 1].wait = time;
        }
        return this;
    },

    /**
     * 暂停当前异步定时任务
     */
    pause: function () {
        if (this.state === STATE_START) {
            this.state = STATE_STOP;
            this.timeline.stop();
            return this;
        }
        return this;
    },

    /**
     * 重新执行上一次暂停的异步任务
     */
    restart: function () {
        if (this.state === STATE_STOP) {
            this.state = STATE_START;
            this.timeline.restart();
            return this;
        }
        return this;
    },

    /**
     * 释放资源
     */
    dispose: function () {
        if (!this.state !== STATE_INITIAL) {
            this.state = STATE_INITIAL;
            this.taskQueue = null;
            this.timeline.stop();
            this.timeline = null;
            return this;
        }
    },


    /**
     * 添加一个任务到任务队列
     * @param   taskFn  任务方法
     * @param   type    任务类型
     * @private
     */
    _add: function (taskFn, type) {
        this.taskQueue.push({
            taskFn: taskFn,
            type: type
        });
        return this;
    },


    /**
     * 执行任务
     * @private
     */
    _runTask: function () {
        if (!this.taskQueue || this.state !== STATE_START) {
            return;
        }
        // 任务执行完毕
        if (this.index === this.taskQueue.length) {
            this.dispose();
            return;
        }
        // 获得任务链上的当前任务
        var task = this.taskQueue[this.index];
        if (task.type === TASK_SYNC) {
            this._syncTask(task);
        } else {
            this._asyncTask(task);
        }
    },

    /**
     * 同步任务
     * @param    task  执行的任务对象
     * @private
     */
    _syncTask: function (task) {
        var me = this;
        var next = function () {
            // 切换到下一个任务
            me._next();
        };

        var taskFn = task.taskFn;
        taskFn(next);
    },


    /**
     * 异步任务
     * @param    task  执行的任务对象
     * @private
     */
    _asyncTask: function (task) {
        var me = this;
        // 定义每一帧执行的回调函数
        var enterFrame = function (time) {
            var taskFn = task.taskFn;
            var next = function() {
                // 停止当前任务
                me.timeline.stop();
                // 执行下一个任务
                me._next();
            };
            taskFn(next, time);
        };

        this.timeline.onenterframe = enterFrame;
        this.timeline.start(this.interval);
    },


    /**
     * 切换到下一个任务, 支持如果当前任务需要等待，则延时执行
     * @param task 当前任务
     * @private
     */
    _next: function (task) {
        this.index++;

        var me = this;
        task.wait ? setTimeout(function() {}, task.wait) : this._runTask();

        this._runTask();
    },

};


function createAnimation() {
    return new Animation();
}

module.exports = createAnimation;

/***/ }),

/***/ "./src/imageLoader.js":
/*!****************************!*\
  !*** ./src/imageLoader.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 *
 * @param images    加载图片的数组或对象
 * @param callback  图片全部加载完毕后调用的回调函数
 * @param timeout   加载超时的时长
 */

function loadImage(images, callback, timeout) {
    // count: 加载完成图片的计数器
    // success: 全部图片加载成功的一个标志位
    // timeoutId: 超时 timer 的 id
    // isTimeout: 是否加载超时的标志位
    var count = 0;
    var success = true;
    var timeoutId = 0;
    var isTimeout = false;

    // 对图片数组 (或对象) 进行遍历
    for (var key in images) {
        // 过滤 prototype 上的属性
        if (!images.hasOwnProperty(key)) {
            // continue 立即退出循环，但退出循环后会从循环的顶部继续执行
            continue;
        }
        // 获得每个图片元素，期望的格式是 object: { src: xxx }
        var item = images[key];
        if (typeof item === "string") {
            item = images[key] = {
                src: item
            }
        }

        // 如果格式不满足期望(item 为空，或者 item.src 不存在)，就丢弃此条数据进行下一个遍历
        if (!item || !item.src) {
            continue;
        }

        // 如果数据满足期望，计数 +1
        count++;
        // 设置图片元素的 id
        item.id = "__img__" + key + getId();
        // 设置图片元素的 img, 他是一个 Image 对象 (把 Image 对象赋值给 window 上自定义属性 item.id )
        item.img = window[item.id] = new Image();

        // 真正加载图片
        doLoad(item);
    }

    // 遍历完成(元素为空)如果计数为 0, 则直接调用 callback
    if (!count) {
        callback(success);
    } else if (timeout) {   // 如果 timeout 超时时长存在
        timeoutId = setTimeout(onTimeout, timeout);
    }


    /**
     * 真正进行图片加载的函数
     * @param item 图片元素对象
     */
    function doLoad(item) {
        item.status = "loading";
        var img = item.img;
        // 定义图片加载成功的回调函数
        img.onload = function() {
            // 只有 success 每次都为 true 时，&true 才为 true
            success = success & true;
            img.status = "loaded";
            done();
        };

        // 定义图片记载失败的回调函数
        img.onerror = function() {
            success = false;
            item.status = "error";
            done();
        };

        // 真正的发起来一个 http(s) 请求
        img.src = item.src;

        /**
         *  每张图片加载完成的回调函数
         */
        function done() {
            // 首先清理元素上的 onload + onerror 事件
            img.onload = img.onerror = null;

            // 用 try catch 为了兼容低版本浏览器
            try{
                delete window[item.id];
            } catch(e) {

            }

            // 每张图片加在完成，计数器 -1， 当 count 等于 0 时 (!0 === true), 当所图片加载完成
            // 且没有超时的情况(即没有 timeout 参数时)，清除超时计时器，并触发回调函数。
            if (!--count && isTimeout) {
                clearTimeout(timeoutId);
                callback(success);
            }

        }
    }

    /**
     * 超时函数
     */
    function onTimeout() {
        // 把是否加载超时的标志设置为 true
        isTimeout = true;
        callback(false);
    }
}

var __id = 0;
function getId() {
    return ++__id;
}


// Node.js 的到处模块
// 注: 导出的 loadImage 函数最后都会被 Node.js 封装在 function defineFactory() {} 函数中
module.exports = loadImage;



// console.log(!0);

/***/ }),

/***/ "./src/timeline.js":
/*!*************************!*\
  !*** ./src/timeline.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";



// 初始化状态
var STATE_INITIAL = 0;
// 开始状态
var STATE_START = 1;
// 停止状态
var STATE_STOP = 2;

/**
 * Timeline 时间轴类
 * @constructor
 */
function Timeline () {
    this.animationHandler = 0;
    this.state = STATE_INITIAL;
}

Timeline.prototype = {
    constructor: Timeline,

    /**
     * 时间轴上每一次回调执行的函数
     * @param   time  从动画开始到当前执行的时间 (即程序运行了多久)
     */
    onenterframe: function(time) {
        console.log("time: ", time);
    },

    /**
     * 动画开始
     * @parameter   interval  每一次回调的间隔时间
     */
    start: function(interval) {
        if (this.state === STATE_START) {
            return;
        }
        this.state = STATE_START;
        this.interval = interval || DEFAULT_INTERVAL;
        // +new Date() 相等于调用了 (new Date()).getTime();
        startTimeline(this, +new Date());
    },

    /**
     * 动画停止
     */
    stop: function() {
        if (this.state !== STATE_START) {
            return;
        }
        this.state = STATE_STOP;
        // 如果动画开始过，则记录动画从开始到现在所经历的时间
        if (this.startTime) {
            // this.dur 为动态给当前 Timeline 对象添加属性，stop方法执行便设置成功
            this.dur = +new Date() - this.startTime;
        }
        cancelAnimationFrame(this.animationHandler);
    },

    /**
     * 重新开始动画
     */
    restart: function() {
        if (this.state !== STATE_START) {
            return;
        }
        if (!this.dur || !this.interval) {
            return;
        }
        this.state = STATE_START;

        startTimeline(this, +new Date() - this.dur);

    },
};


/**
 * 时间轴动画启动函数
 * @param   timeline   时间轴的实例
 * @param   startTime  动画开始时间戳
 * */
function startTimeline(timeline, startTime) {
    // 把开始时间赋值给 Timeline 的自定义属性 startTime
    timeline.startTime = startTime;
    nextTick.interval = timeline.interval;

    // 记录上一次回调的时间戳
    var lastTick = +new Date();

    /**
     * 定义每一帧执行的函数
     * */
    function nextTick() {
        var now = +new Date();

        timeline.animationHandler = requestAnimationFrame(nextTick);

        // 如果当前时间与上一次回调的时间戳相减大于我们设置的间隔时间，表示可以执行一次回调函数。
        if (now - lastTick >= timeline.interval) {
            timeline.onenterframe(now - startTime);
            lastTick = now;
        }
    }
}

module.exports = Timeline;


var  DEFAULT_INTERVAL = 1000 / 60;

/**
 * raf (requestAnimationFrame)
 */
var requestAnimationFrame = (function() {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        function (callback) {
            return window.setTimeout(callback, callback.interval || DEFAULT_INTERVAL);
        }
})();
/**
 * cancel raf
 */
var cancelAnimationFrame = (function() {
    return window.cancelAnimationFrame ||
        window.webkitCancelRequestAnimationFrame ||
        window.mozCancelRequestAnimationFrame ||
        window.oCancelRequestAnimationFrame ||
        function (id) {
            return window.clearTimeout(id);
        }
})();

/***/ })

/******/ });
});
//# sourceMappingURL=animation.js.map