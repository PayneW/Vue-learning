<template>
    <div class="default">
        <h2>3.1 起步: 使用 Vue.js + Vue Router</h2>
        
        <p class="router-link-p">
            <!-- (1) 在 template 模板中使用 router-link 组件来导航;
                 通过传入 `to` 属性指定链接;
                 <router-link> 默认会被渲染成一个 `<a>` 标签. -->
            <router-link to="/foo">Go to Foo</router-link>
            <router-link to="/bar">Go to Bar</router-link>
        </p>

        <!-- (2) 路由出口: 路由匹配到的组件将渲染在这里. -->
        <router-view></router-view>
    </div>
</template>

<script>
    // import Foo from './foo';
    // import Bar from './bar';
    // export default {
    //     name: 'Demo31',
    //     components: {
    //         Foo,
    //         Bar,
    //     }
    // }
</script>

<style lang="stylus" scoped>

</style>