# Vue 知识集合




## Catalog
1. Vue 生存周期





## New Words






## Content
### 1. Vue 生存周期
  ```js
    let vm = new Vue({
        el:"#box",
        data: {
            // 对于这样含有标签的字符串, 解析方式就是使用 v-html
            msg: "Welcome to Vue.js"
        },

        methods: {
            change () {
                this.msg = "组件更新完毕, 查看console.log中的组件更新提示"
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

### 2. vue-cli 3.x 项目中的 views 和 components 文件夹有什么区别?
- components 是小组件
- containers 是容器级组件
- views 是页面级组件
  
  也就是说, views 是页面级组件, components 是小组件, 小组件可被引用在 views 中,
  一般 views 组件不被复用[containers 是容器级组件(根据项目大小决定是否使用)]

  从组件大小级别区分 components - （containers）- views
