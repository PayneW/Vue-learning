// @flow

// - ../src/core/instance/index.js (全部代码)

// - 从 5 个文件导入 5 个方法 (不包括 warn)
import {initMixin} from './init';
import {stateMixin} from './state';
import {renderMixin} from './render';
import {eventsMixin} from './events';
import {lifecycleMixin} from './lifecycle';
import {warn} from '../util/index';

// - 定义 Vue 构造函数
function Vue(options) {
    if (process.env.NODE_ENV !== 'production' && !(this instanceof Vue)) {
        warn('Vue is a constructor and should be called with the `new` keyword');
    }
    this._init(options); // {1}
}

// - 将 Vue 作为参数传递给导入的 5 个方法
initMixin(Vue);
stateMixin(Vue);
eventsMixin(Vue);
lifecycleMixin(Vue);
renderMixin(Vue);

// - 导出 Vue
export default Vue  