<template>
    <div class="default">
        <h2>3.3 嵌套路由</h2>

        <span class="link-span"><router-link to="/worker/foo">/user/foo</router-link></span>

        <router-view></router-view>
    </div>
</template>

<script>
export default {
    name: 'Demo33',
}
</script>

<style lang="stylus" scoped>
    p button {
        padding: 6px 10px
        background: lightblue
        border-radiu: 4px
    }
    .link-span {
        padding: 3px;
        margin: 2px;
        background: #fafafa;
        border-radius: 2px;
    }
</style>
