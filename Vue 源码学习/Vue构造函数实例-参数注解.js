
/**
 * Date: 2017/12/20.
 *
 * Vue构造函数接受一个通过"对象字面量"方式创建的对象，这个对象中包含属性和方法有以下几类:
 * 基本讲解见: http://monjer.me/2017/07/20/Vue.js%E7%AC%94%E8%AE%B0-%E6%9E%84%E9%80%A0%E5%99%A8.html
 *
 */

let vm = new Vue(
    {
       // 1.DOM选项
        el: "",                                 // 元素: id/class，定义了每个Vue对象所绑定和控制的DOM元素的根对象。
        template: "",                           // 模板: string类型，表示一组DOM元素的HTML字符串，用来替换挂载到el上。
        render:         function () {},         // 渲染: 如果不想用template创建html结构，自定义渲染

        // 2.数据选项
        data: {},                               // 对象: Vue实例的数据对象，Vue会将此对象的所有属性转换为getter/setter方法，这样可以监听并响应数据的变化。如果Vue实例被当作组建使用，那么data需要时一个函数类型(function: 这个在"构造函数-原型-组合继承-面向对象讲解.js中有讲解")
        methods:        function () {},         //
        props: "对象/数组",                      //
        computed:       function () {},         //

        // 3.组建声明周期选项
        /*
         _lifecycleHooks: [
             'beforeCreate',
             'created',
             'beforeMount',
             'mounted',
             'beforeUpdate',
             'updated',
             'beforeDestroy',
             'destroyed',
             'activated',
             'deactivated'
         ],
         */


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
        },


        activated:      function () {},
        deactivated:    function () {},

        // 4. 资源选项
        directives:     {},                      // 自定义指令对象
        filters:        {},                      // Vue实例本地的过滤配置对象
        components:     {},                      // 实例中所有可用组件的声明

        // 5.组合选项
        parent: {},                              // 父组件的引用
        mixins: {},                              // 混合对象数组，可以包含正常的实例对象中的选项，最终都会合并到实例上。用于某些共性属性的重用。

        // 6.其它选项
        name: ""                                 // 作为组建选项时有用，用来声明实例对应的组件的名称。

    }
);









