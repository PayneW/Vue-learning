<template>
    <div class="default">
        <h2>3.4 编程式导航</h2>

        <span class="link-span">
            <!-- to="/runner/li" -->
            <a @click='runner("li")'>/runner/li</a>
        </span>
        <span class="link-span">
            <!-- to="/runner/wang" -->
            <a @click='runner("wang")'>/runner/wang</a>
        </span>

        <router-view></router-view>
    </div>
</template>

<script>
    export default {
        name: 'Demo34',
        methods: {
            runner(person) {
                this.$router.push({path: `/runner/${person}`});
            }
        }
    }
</script>

<style lang="stylus" scoped>
    p button {
        padding: 6px 10px
        background: lightblue
        border-radiu: 4px
    }
    .link-span {
        padding: 3px 5px;
        margin: 2px;
        background: #fafafa;
        border-radius: 2px;
    }
</style>
