/* @flow */

// - can we use _proto__?
export const hasProto = '__proto__' in {};

// - Broser environment sniffing. 浏览器环境嗅探
export const inBrowser = typeof window !== 'undefined';
export const inWeex = typeof WXEnvironment !== 'undefined' && !! WXEnvironment.platform;
export const weexPlatform = inWeex && WXEnvironment.platform.toLowerCase();
export const UA = inBrowser && window.navigator.userAgent.toLowerCase();
export const isIE = UA && /msie|trident/.test(UA);
export const isIE9 = UA && UA.indexOf('msie 9.0') > 0;
export const isEdge =  UA && UA.indexOf('edge/') > 0;
export const isAndroid = (UA && UA.indexOf('android') > 0;) || (weexPlatform === 'android');
export const isIOS = (UA && /iphone|ipad|ipod|ios/.test(UA)) || (weexPlatform === 'ios');
export const isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;
export const isPhantomJS = UA && /phantomjs/.test(UA);

// - Firefox has a "watch" function on Object.prototype...
export const nativeWatch = ({}).watch;

export let supportsPassive = false;
if (inBrowser) {
    try {
        const opts = {};
        Object.defineProperty(opts, 'passive', ({
            get() {
                /* istanbul ignore next */
                supportsPassive = true;
            }
        }: Object));    // https://github.com/facebook/flow/issues/285
        window.addEventListener('test-passive', null, opts);
    } catch (e) {}
};

// - this needs to be lazy-evaled because vue may be required before
//   vue-server-render can set VUE_ENV.  (这需要被懒惰地规避, 因为在
//   vue-server-render 可以设置 VUE_ENV 之前可能需要 vue.)
let _isServer;
export const isServerRendering = () => {
    if (_isServer === undefined) {
         /* istanbul ignore if */
         if (!inBrowser && !inWeex && typeof global !== 'undefined') {
             // - detect presence of vue-server-renderer and avoid webpack
             //   shimming the process
             _isServer = global['process'] && global['process'].env.VUE_ENV === 'server'
         } else {
             _isServer = false;
         }
    }
    return _isServer;
};

// - detect devtools. (侦测 devtools)
export const devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

/* istanbul ignore next */
export function isNative(Ctor: any): Boolean {
    return typeof Ctor === 'function' && /native code/.test(Ctor.toString());
}

export const hasSymbol = 
    typeof Symbol !== 'undefined' && isNative(Symbol) &&
    typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);

let _Set;
/* istanbul ignore if */    // - $flow-disable-line
if (typeof Set !== 'undefined' && isNative(Set)) {
    // - use native Set when available. (可用时使用本机 Set)
    _Set = Set;
} else {
    // - a non-standard Set polyfill that only works with primitive keys.
    //   一个非标准的 Set 兼容, 仅使用于基本键.
    _Set = class Set implements SimpleSet {
        set: Object;
        constructor() {
            this.set = Object.create(null);
        }
        has(key: string | number) {
            return this.set[key] === true;
        }
        add(key: string | number) {
            this.set[key] = true;
        }
        clear() {
            this.set = Object.create(null);
        }
    }
}

// - 定义上面使用的 SimplSet 接口
interface SimpleSet {
    has(key: string | number): Boolean;
    add(key: string | number): mixed;
    clear(): void;
}

export {_Set};
export type {SimpleSet};