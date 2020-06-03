<template>
    <div class="default-div">
        <h2>3.2.4 添加示例: 使用 Vue 过渡(transition) 实现轮播图</h2>
        <a href="">
            <router-link to="/carousel">Vue 轮播图</router-link>
            <!-- 还要在 App.vue 中添加 router-view 来对路由的内容做展示 -->
        </a>
    </div>
</template>

<script>
    export default {
        name: 'Demo324',
        data() {
            return {

            }
        },
    }
</script>

<style scoped>
    a {
        color: #000;
    }
</style>
