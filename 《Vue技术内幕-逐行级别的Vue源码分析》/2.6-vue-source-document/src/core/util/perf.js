// - `src/core/util/env.js`
import {inBrowser} from './env';

export let mark;
export let measure;

if (process.env.NODE_ENV !== 'production') {
    const perf = inBrowser && window.performance;
    /* istanbul ignore if */
    if (
        perf &&
        perf.mark &&
        perf.measure &&
        perf.clearMarks &&
        perf.clearMeasure &&
    ) {
        mark = tag => perf.mark(tag);
        measure = (name, startTag, endTag) => {
            perf.measure(name, startTag, endTag);
            perf.clearMarks(startTag);
            perf.clearMarks(endTag);
            perf.clearMeasure(name);
        }
    }
}