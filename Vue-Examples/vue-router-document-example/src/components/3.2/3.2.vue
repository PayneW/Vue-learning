<template>
    <div class="default">
        <h2>3.2 动态路由匹配</h2>

        <p>User {{ $route.params.id }}</p>

        <p class="router-link-p">
            <router-link to="/user/foo">/user/foo</router-link>
            <router-link to="/user/bar">/user/bar</router-link>
        </p>

        <router-view></router-view>
    </div>
</template>

<script>
export default {
    name: 'Demo32',
}
</script>

<style lang="stylus" scoped>
    p button {
        padding: 6px 10px
        background: lightblue
        border-radiu: 4px
    }
</style>
