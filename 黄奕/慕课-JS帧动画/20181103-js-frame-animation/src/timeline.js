"use strict";


// 初始化状态
var STATE_INITIAL = 0;
// 开始状态
var STATE_START = 1;
// 停止状态
var STATE_STOP = 2;


//   动画的实现方式是通过每隔固定的毫秒数(例如 80ms)执行一个预定的动作(函数)，但问题是
// setTimeout()间隔 80ms 执行一次浏览器并不会百分百按照这个时间执行，也就是说浏览器
// 执行的时间不准确，而且随着 setTimeout 的不断执行误差可能会越来越大(就是说执行时间
// 会大于 80ms 很多才，比如 100ms/120ms/180ms 才会执行)，这样动画就会变的越来越
// 不连贯。我们回过头来想想什么是动画: 动画就是动画开始到某一个时间点执行完毕，这个动画
// 执行了多长时间，在这个时间点动画是一个什么状态并绘制出来，整个动画应该是一串流畅的
// 动作，即使当前浏览器的执行环境不好，我们还是能保证当前动画匀速流畅的运行完毕。
//    根据这个需求我们设计一个时间轴的类 (Timeline), 这个时间轴的作用就是管理回调
// 函数按照预期的动作来执行；给这个时间轴的类(构造函数)传入一个"回调函数"，在这个回调
// 函数中拿到当前动画已经运行了多久，这样就可以把帧动画给绘制出来，来达到帧动画的目的。

// Timeline 在 animation.js 中使用的示例为 第二个左右跑动的兔子(在 index.js 中的 enterFrame() 接口)，
// 和第一个兔子点击暂停和开始的效果(animation.js 中的 stop() 和 restart())，


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
     * 时间轴上每一次回调执行的函数 : 设置 Timeline 这个类就是希望外部可以实现以下
     * 这个接口: 调用这个方法，把 time 传进来，然后 Timeline 会在合适的时机调用这个
     * 方法，这样外部就不用关系什么时候回调什么时候处理计时器，只关心这一个接口。
     *
     * 这个方法在内部不做任何实现，需要每个 Timeline 实例来实现。
     * 详细使用示例就是index.js 中的  enterFrame( function(success, time) {} )
     * 内部的匿名函数。
     *
     * @param time 从动画开始到当前执行的时间 (即程序运行了多久)
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
// 对 requestAnimationFrame 进行一次封装
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

        // 如果当前时间与上一次回调的时间戳相减大于我们设置的间隔时间，
        // 表示可以执行一次回调函数。
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