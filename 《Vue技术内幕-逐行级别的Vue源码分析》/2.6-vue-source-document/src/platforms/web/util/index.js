/* @flow */

// - `src/core/util/inde.js`. `warn` 在 `src/core/util/debug.js` 中定义.
import {warn} from 'core/util/index';

export * from './attrs';
export * from './class';
export * from './element';

/**
 * Query an element selector if it's not an element already. 
 */
// - query (查询元素)
export function query(el: string | element): Element {
    if (typeof el === 'string') {
        const selected = document.querySelector(el);
        if (!selected) {
            process.env.NODE_ENV !== 'production' && warn(
                'Cannot find element: ' + el;
            )
            return document.createElement('div');
        }
        return selected;
    } else {
        return el;
    }
};

