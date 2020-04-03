<template>
    <div id="app">
        <m-header/>
        <tab/>
        <!--渲染 router.js 中 routes 数组中的路由-->
        <keep-alive>
            <router-view></router-view>
        </keep-alive>
    </div>
</template>

<script>
    import MHeader from "Vue-learning/黄奕/慕课-Vue 2.0 独立开发音乐WebApp/Music-WebApp/src/components/m-header/m-header";
    import Tab from "Vue-learning/黄奕/慕课-Vue 2.0 独立开发音乐WebApp/Music-WebApp/src/components/tab/tab";
    export default {
        components: {
            MHeader,
            Tab,
        }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
</style>
