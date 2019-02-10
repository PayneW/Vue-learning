// [在 Vue 中使用任意 Javascript 第三方库] (http://www.css88.com/archives/7939)

/** 1. 在 vue 项目中使用 js 库的最干净、最健壮的方法是将其代理为 Vue 原型对象的属性。 我们用这种方式，
 * 将 Moment 日期和时间库添加到我们的项目中:  */
// entry.js 文件
import moment from "moment";
Object.defineProperty(Vue.prototype, "$moment", { value: moment });
/** 由于所有组件都会继承 Vue 原型对象上的方法，这将使 Moment 自动可用于任何组件，没有全局变量或任何
 * 需要手动导入的组件。它可以在任何 实例/组件 中简单地通过 this.$moment 访问: */
// MyComponent.vue 文件
export default {
    created() {
        console.log("The time is ", this.$moment().format("HH:MM"));
    }
}


/** 2. 使用 Vue 的 install 方法安装一个插件 */
