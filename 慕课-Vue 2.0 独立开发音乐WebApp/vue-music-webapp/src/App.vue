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
    import MHeader from "components/m-header/m-header";
    import Tab from "components/tab/tab";
    export default {
        components: {
            MHeader,
            Tab,
        }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
</style>
