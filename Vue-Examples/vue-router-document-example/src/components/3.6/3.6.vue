<template>
    <div class="default">
        <h2>3.6 命名视图</h2>

        <span class="link-span">
            <router-link to="/container">Container: Named Views</router-link>
        </span>

        <router-view></router-view>
    </div>
</template>

<script>
export default {
    name: 'Demo36',
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
