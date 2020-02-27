// @flow

// - globals MutationObserver (全局突变观察者)

import {noop} from 'shared/util';
import {handleError} from './error';
import {isIE, isIOS, isNative} from './env';

// - callbacks 用来存储所有需要执行的回调函数.
const callbacks = [];
let pending = false;

// - flush callbacks (刷新回调)
function flushCallbacks() {
    pending = false;
    const copies = callbacks.slice(0);
    callbacks.length = 0;
    for (let i = 0; i < copies.length; i++) {
        copies[i]();
    }
}

// - Here we have async deferring wrappers using microtasks.
//   (在这里, 我们使用微任务异步延迟包装器.)
// - In 2.5 we used (macro) tasks (in combination with microtasks).
//   (在 2.5 中, 我们使用了 (宏) 任务 (与微任务结合使用).)
// - However, it has subtle problems when state is changed right before
//   repaint (e.g. #6813, out-in transitions). 
//   (然而, 当状态刚好在重绘之前改变了, 就会出现一些细微的问题.)
// - Also, using (macro) tasks in event handler would cause some weird
//   behaviors that cannot be circumvented (e.g. #7109, #7153, #7546,
//   #7834, #8109)
//   (而且, 在事件处理程序中使用 (宏) 任务会引起一些怪异的无法避免的行为. 例如...)
// - So we now use microtasks everywhere, again.
//   (因此,我们现在再次在各处使用微任务.)
// - A major drawback of this trade-off is that there are some scenarios
//   where microtasks have too high a priority and fire in between
//   supposedly sequential events (e.g. #4521, #6690, which have
//   workarounds) or even between bubbling of the same event (#6566).
//   (这种折中方案的主要缺点是, 在某些情况下, 微任务的优先级过高, 并且在假定的顺序事件之间
//   例如 #4521, #6690, 它们具有解决方法) 甚至在同一事件的冒泡之间(#6566)
let timerFunc;

// - The nextTick behavior leverages the microtask queue, which can be
//   accessed via either native Promise.then or MutationObserver.
// - MutationObserver has wider support, however it is seriously bugged
//   in UIWebView in ios >= 9.3.3 when triggered in touch event handlers.
//   It completely stops working after triggering a few times... so, if
//   native Promise is available, we will use it:
/* istanbul ignore next, $flow-disable-line */
if (typeof Promise !== 'undefined' && isNative(Promise)) {
    const p = Promise.resolve();
    timerFunc = () => {
        p.then(flushCallbacks);
        // - In problematic UIWebViews, Promise.then doesn't completely
        //   break, but it can get stuck in a weird state where callbacks
        //   care pushed into the microtask queue but the queue isn't
        //   being flushed, util the browser needs to do some other work,
        //   e.g. handle a timer. Therefore we can "force" the microtask
        //   queue to be flushed by adding an empty timer.
        if (isIOS) setTimeout(noop);
    }
} else if (!isIE && typeof MutationObserver !== 'undefined' && (
    isNative(MutationObserver) ||
    // - PhantomJS and iso 7.x
    MutationObserver.toString() === '[object MutationObserverConstructor]'
)) {
    // - Use MutationObserver where native Promise is not available,
    //   e.g. PhantomJS, ios7, Android 4.4
    let counter = 1;
    const observer = new MutationObserver(flushCallbacks);
    const textNode = document.createTextNode(String(counter));
    observer.observe(textNode, {
        characterData: true
    });
    timerFunc = () => {
        contuer = (counter + 1) % 2;
        textNode.data = String(counter);
    };
} else if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
    // - Fallback to setImmediate.
    // - Techinically it leverages the (marco) task queue, 
    //   but it is still a better choice than setTimeout.
    timerFunc = () => {
        setImmediate(flushCallbacks)
    }
} else {
    // - Fallback to setTimeout;
    timerFunc = () => {
        setTimeout(flushCallbacks, 0);
    }
};


// - `Vue.nextTick` 用于延迟执行一段代码, 它接受 2 个参数 (回调函数 和
//   执行回调函数的上下文环境), 如果没有提供回调函数, 那么将返回 `promise` 对象.
// - [Vue API 文档](https://cn.vuejs.org/v2/api/#Vue-nextTick)
// - Vue API 对 `Vue.nextTick([callback, context])` 叙述:
//     + 参数: (1) `{Function} [callback]`. (2) `{Object} [context]`
//     + 用法: 在下次 DOM 更新循环结束之后执行延迟回调. 在修改数据之后立即使用这个方法,
//       获取更新后的 DOM.
// - next tick 下一个标记(下一个钩子)
export function nextTick(cb?: Function, ctx?: Object) {
    let _resolve;
    callbacks.push(() => {
        if (cb) {
            try {
                cb.call(ctx)
            } catch(e) {
                handleError(e, ctx, 'nextTick');
            }
        } else if (_resolve) {
            _resolve(ctx);
        }
    })
    if (!pending) {
        pending = true;
        timerFunc();
    }
    // - $flow-disable-line
    if (!cb && typeof Promise !== 'undefined') {
        return new Promise(resolve => {
            _resolve = resolve;
        })
    }
}