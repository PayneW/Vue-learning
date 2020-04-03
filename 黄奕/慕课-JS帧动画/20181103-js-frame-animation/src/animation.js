"use strict";

var loadImage = require("./imageLoader");
var Timeline = require("./timeline");


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
    // 索引, 记录当前任务链中执行的任务
    this.index = 0;
    // 引用时间轴函数
    this.timeline = new Timeline();
    // 初始化状态
    this.state = STATE_INITIAL;
}

Animation.prototype = {
    constructor: Animation,

    /**
     * 添加一个同步任务，预加载图片 (预加载和帧动画分开，单独封装 imageLoader.js)
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
    //
    _asyncTask: function (task) {
        var me = this;
        // 定义每一帧执行的回调函数
        // 这个 time 从 Timeline 的 onenterframe 中的 time,
        // 表示从动画开始到当前执行的时间
        var enterFrame = function (time) {
            var taskFn = task.taskFn;
            var next = function() {
                // 停止当前任务
                me.timeline.stop();
                // 执行下一个任务
                me._next();
            };
            // time 表示这个异步任务从开始到当前运行了多久
            taskFn(next, time);
        };

        // 把上面定义的方法传给 Timeline.onenterframe
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