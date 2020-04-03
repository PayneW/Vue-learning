"use strict";

/**
 *
 * @param images    加载图片的数组或对象
 * @param callback  图片全部加载完毕后调用的回调函数 (即: 图片加载完成之后要通知给外部的 animation.js 调用)
 * @param timeout   加载超时的时长 (注: 当预加载图片失败时，即设置一个时长，超过这个时间还没加载表示加载失败)
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
    // 注: 当 images 为数组时，key 为从 0 开始的索引
    for (var key in images) {
        // 过滤 images 为对象时，其 prototype 上的属性
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

        console.log("item.id: ", item.id);
        // <img>
        console.log("new Image()", new Image);

        // 设置图片元素的 img, 他是一个 Image 对象 (把 Image 对象赋值给 window 上自定义属性 item.id )
        item.img = window[item.id] = new Image();

        console.log("item.img", item.img);
        console.log("window[item.id]: ", window[item.id]);


        // item: key = 0 时 {src: "./images/rabbit-big.png", id: "__img_01", img: img}
        // item: key = 1 时 {src: "./images/rabbit-lose.png", id: "__img_12", img: img}
        // item: key = 2 时 {src: "./images/rabbit-win.png", id: "__img_23", img: img}
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