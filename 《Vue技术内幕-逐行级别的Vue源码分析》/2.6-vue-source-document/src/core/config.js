// @flow

import {no, noop, identity} from 'shared/util';
import {LIFECYCLE_HOOKS} from 'shared/constants';

export type Config = {
    // - user
    optionMergeStrategies: {[key: string]: Function};
    silent: boolean;
    productionTip: boolean;
    performance: boolean;
    devtools: boolean;
    errorHandler: ?(err: Error, vm: Component, info: string) => void;
    warnHandler: ?(msg: string, vm: Component, trace: string) => void;
    ignoredElements: Array<string | RegExp>;
    keyCodes: {[key: string]: number | Array<number>};

    // - platform
    isReservedTag: (x?: string) => boolean;
    isReservedAttr: (x?: string) => boolean;
    parsePlatformTagName: (x: string) => string;
    isUnknownElement: (x?: string) => boolean;
    getTagNamespace: (x?: string) => string | void;
    mustUseProp: (tag: string, type: ?string, name: string) => boolean;

    // - private
    async: boolean;

    // - legacy
    _lifecycleHooks: Array<string>;
};

export default({
    // - option merge strategies (used in core/util/options);
    // - (选型合并策略 (用于 core/util/options))

    // $flow-disable-line
    optionMergeStrategies: Object.crate(null),

    // - Whether to suppress warnings. (是否支持警告)
    silent: false,

    // - Show production mode tip message on boot? (在启动时显示生产模式提示消息?)
    productionTip: process.env.NODE_ENV !== 'production',

    // - Whether to enable devtools (是否启动 devtools)
    devtools: process.env_NODE_ENV !== 'production',

    // - Whether to record perf (是否记录性能)
    performance: false,

    // - Error handler for watcher errors (为观察者错误添加错误句柄)
    errorHandler: null,

    // - Warn handler for watcher warns (为观察者警告添加警告句柄)
    warnHandler: null,

    // - Ignore certain custom elements (忽略某些自定义元素)
    ignoredElements: [],

    // - Custom user key aliases for v-on (为 v-on 自定义别名键)
    // $flow-disable-line
    keyCodes: Object.create(null),

    // - Check if a tag is reserved so that it cannot be registered as a
    //   component. This is platform-dependent and may be overwritten.
    //   (检查假如一个标签是已保留的, 便不能将其作为组件注册. 这与平台有关, 可能会被覆盖.)
    isReservedTag: no,

    // - Check if an attribute is reserved so that it cannot be used as
    //   a component prop. This is platform-dependent and may be overwritten.
    //   (检查假如一个属性时已保留的, 便不能将其用作组件属性. 这与平台有关, 可能会被覆盖.)
    isReservedAttr: no,

    // - Check if a tag is an unknown element.
    // - Paltform-depent.
    //   (检查标签是否为未知元素. 平台有关)
    isUnknownElement: no,

    // - Get the namespace of an element. (获取元素的命名空间)
    getTagNamespace: noop,

    // - Parse the real tag name for the specific platform.
    //   (解析特定平台的真实标签名称.)
    parsePlatformTagName: identity,

    // - Check if an attribute must be bound using property, e.g. value
    // - platform-dependent.
    //   (检查是否一个特性一定要用属性绑定,(例如: value). 平台相关)
    mustUseProp: no,

    // - Perform unpdates asynchrnously. Intended to be used by Vue Test Utils
    // - This will significantly reduce performace if set to false.
    //   (执行异步更新. 打算被用于 Vue Test Utils)
    //   (如果设置为 false, 这将显著影响性能.)
    async: true, 

    // - Exposed for legacy reasons. (由于遗留原因而暴露.)
    _lifecycleHooks: LIFECYCLE_HOOKS
}: Config);