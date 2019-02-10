import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 按需引入需要的组件: row 行 column 列
import {Row, Col, Button} from "element-ui";

Vue.use(Row);
Vue.use(Col);
Vue.use(Button);

import {DatePicker} from "element-ui";

Vue.use(DatePicker);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
