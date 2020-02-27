// @flow

import config from '../config';                                     // {1-1} 
import {noop} from 'shared/util';                                   // {1-2}

export let warn = noop;                                             // {1-3}
export let tip = noop;                                              // {1-4}

// - work around flow check
export let generateComponentTrace = (noop: any);                    // {1-5}
export let formatComponentName = (noop: any);                       // {1-6}

if (process.env.NODE_ENV !== 'production') {                        // {1-7}
    const hasConsole = typeof console !== 'undefined';              // {1-8}
    const classifyRE = /(?:^[-_])(\w)/g;                            // {1-9}
    const classify = str => str
        .replace(classifyRE, c => c.toUpperCase())
        .replace(/[-_]/g, '');               // {1-10}

    // - warn (警告)
    warn = (msg, vm) => {                                           // {1-11}
        const trace = vm ? generateComponentTrace(vm) : '';         // {1-12}

        if (config.warnHandler) {                                   // {1-13}
            config.warnHandler.call(null, msg, vm, trace);          // {1-14}
        } else if (hasConsole && (!config.silent)) {                // {1-15}
            console.error(`[Vue warn]: ${msg}${trace}`);            // {1-16}
        }
    };

    // - tip (提示)
    tip = (msg, vm) => {                                            // {1-17}
        if (hasConsole && (!config.silent)) {                       // {1-18}
            console.warn(`[Vue tip]: ${msg}` + (
                vm ? generateComponentTrace(vm) : ''
            ))                                                      // {1-19}
        }
    };

    // - format component name (格式组件名)
    formatComponentName = (vm, includeFile) => {                    // {1-20}
        if (vm.$root === vm) {                                      // {1-21}
            return '<Root>';                                        // {1-22}
        }
        const options = typeof vm === 'function' && vm.cid != null
            ? vm.options
            : vm._isVue
                ? vm.$options || vm.constructor.options
                : vm;                                               // {1-23}
        let name = options.name || options._componentTag;           // {1-24}       
        const file = options.__file;                                // {1-25}
        if (!name && file) {                                        // {1-26}
            const match = file.match(/([^/\\]+)\.vue$/);     // {1-27}
            name = match && match[1];                               // {1-28}
        }

        return (
            (name ? `<${classify(name)}>` : `<Anonymous>`) + 
            (file && includeFile !== false ? ` at ${file} ` : '')
        )                                                           // {1-29}
    }; 

    // - repeat (重复)
    const repeat = (str, n) => {                                    // {1-30}
        let res = '';                                               // {1-31}
        while (n) {                                                 // {1-32}
            if (n % 2 === 1) {                                      // {1-33}
                res += str                                          // {1-34}
            }   
            if (n > 1) {                                            // {1-35}
                str += str;                                         // {1-36}
            }
            n >>= 1;                                                // {1-37}
        }
        return res;                                                 // {1-38}
    };

    // - generate component trace (生成组件跟踪)
    generateComponentTrace = vm => {                                // {1-39}
        if (vm.isVue && vm.$parent) {                               // {1-40}
            const tree = [];                                        // {1-41}
            // - current recursive sequence (当前递归序列)
            let currentRecursiveSequence = 0;                       // {1-42}
            while (vm) {                                            // {1-43}
                if (tree.length > 0) {                              // {1-44}
                    const last = tree[tree.length - 1];             // {1-45}
                    if (last.constructor === vm.constructor) {      // {1-46}
                        curerntRecursiveSequence++;                 // {1-47}
                        vm = vm.$parent;                            // {1-48}
                        continue;
                    } else if (currentRecursiveSequence > 0) {      // {1-49}
                        tree[tree.length - 1] = [last, currentRecursiveSequence]; // {1-50}
                        currentRecursiveSequence = 0;               // {1-51}
                    }
                }
                tree.push(vm);                                      // {1-52}
                vm = vm.$parent;                                    // {1-53}
            }
            return '\n\nfound in\n\n' + tree            
                .map((vm, i) => `${
                    i === 0 ? '--->' : repeat(' ', 5 + i * 2);
                }${
                    Array.isArray(vm)
                        ? `${formatComponentName(vm[0])}...(${vm[1]} recursive calls)`
                        : formatComponentName(vm);
                }`)
                .join('\n')                                         // {1-54}
        } else {                                                    // {1-55}
            return `\n\n(found in ${formatComponentName(vm)})`;     // {1-56}
        }
    }
}
