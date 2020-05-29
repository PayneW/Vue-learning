# Vue 知识集合




## Catalog
- Vue 生存周期





## New Words






## Content
- Vue 生存周期
  ```js
    let vm = new Vue({
        el:"#box",
        data: {
            // 对于这样含有标签的字符串，解析方式就是使用 v-html
            msg: "Welcome to Vue.js"
        },

        methods: {
            change () {
                this.msg = "组件更新完毕，查看console.log中的组件更新提示"
            },
            destroy () {
                this.$destroy();
            }
        },

        beforeCreate () {
            console.log( "组件实例刚刚被创建,属性方法都没有" );
            console.log( this );
        },
        created () {
            console.log( "实例已经创建完成, 属性已经绑定" );
        },
        beforeMount () {
            console.log( "模板编译之前" );
        },
        mounted () {  // 代替1.0的 compiled 和 ready
            console.log( "模板编译之后" );
        },
        beforeUpdate () {
            console.log( "组件更新之前" );
        },
        updated () {
            console.log( "组件更新之后" );
        },
        beforeDestroy () {
            console.log( "组件销毁之前" );
        },
        destroyed () {
            console.log( "组件销毁之后" );
            console.log( this );
        }
    });
  ```