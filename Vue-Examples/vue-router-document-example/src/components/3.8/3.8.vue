<template>
    <div class="default">
        <h2>3.8 传递 Props 到路由组件</h2>

        <ul class="router-props">
            <!-- <li>
                <router-link to="/">/</router-link>
            </li> -->
            <li>
                <router-link to="/hello/you">/hello/you</router-link>
            </li>
            <li>
                <router-link to="/static">/static</router-link>
            </li>
            <li>
                <router-link to="/dynamic/1">/dynamic/1</router-link>
            </li>
            <li>
                <router-link to="/attrs">/attrs</router-link>
            </li>
        </ul>

        <router-view class="view" foo="123"></router-view>
    </div>
</template>

<script>
    export default {
        name: 'Demo38',
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
    .router-props {
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .router-props li {
        flex: 0 1 auto;
        padding: 2px 5px;
        margin: 3px;
        background: #fafafa;
        border-radius: 4px;
    }
</style>
