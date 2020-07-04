import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import "./assets/typo.css";

Vue.config.productionTip = false

// - 自定义全局过滤器 currency
const digitsRE = /(\d{3})(?=\d)/g;
Vue.filter('currency', function(value, currency, decimals){
    // - `parseFloat()`: 把非数值转换为数值
    value = parseFloat(value);

    // - - **finite ['faɪnaɪt] --adj.有限的, 限定的.  --n.有限之物**
    // - `isFinite()`: 确定一个数是不是有穷.
    if (!isFinite(value) || (!value && value !== 0)) return '';
    currency = currency != null ? current : '$';
    // - - **decimal ['desɪm(ə)l] --adj.十进制的, 小数的. --n.小数**
    decimals = decimals != null ? decimals: 2;

    // - stringified 字符串化: 把当前 value 数值利用 Math.abs()转成正数,
    //   然后利用数组的 toFixed() 方法截取小数点后两位数, 并转换成字符串.
    // - Math.abs() 返回数值的绝对值
    // - 数组的 `toFixed()` 方法会按照指定的小数位返回数值的字符串表示.
    var stringified = Math.abs(value).toFixed(decimals);

    // - 截取 stringified 的整数部分.
    var _int = decimals ? stringified.slice(0, -1 - decimals) : stringified;
    // - (1) _int: 500; (2) _int: 10; (3) _int: 19; (4) _int: 2112
    // console.log('_int:', _int)

    var i = _int.length % 3;
    // console.log('i: ', i);  // - (1) i: 0; (2) i: 2; (3) i: 2; (4) i: 1
    var head = i > 0
        ? (_int.slice(0, i) + (_int.length > 3 ? ',' : ''))
        : '';
    // - (1) head: ; (2) head: 10; (3) head: 19; (4) head: 2,
    // console.log('head: ', head);

    var _float = decimals ? stringified.slice(-1 - decimals) : '';
    // - _float 为取得价格的小数部分.
    // - (1) _float: .01; (2) _float: .99; (3) _float: .99; (4) _float: .36,
    // console.log('_float: ', _float);

    var sign = value < 0 ? '-' : '';
    return sign + currency + head +
        _int.slice(i).replace(digitsRE, '$1,') + _float;
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
