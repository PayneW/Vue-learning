<template>
  <div id="app">
        <h2>Vue Router 官网文档单组件示例</h2>
        <p class="link-p">
            <router-link to="/Demo31">Demo31 起步</router-link>
        </p>
        <p class="link-p">
            <router-link to="/Demo32">Demo32 动态路由匹配</router-link>
        </p>
        <p class="link-p">
            <router-link to="/Demo33">Demo33 嵌套路由</router-link>
        </p>
        <p class="link-p">
            <router-link to="/Demo34">Demo34 编程式导航</router-link>
        </p>
        <p class="link-p">
            <router-link to="/Demo36">Demo36 命名视图</router-link>
        </p>
        <p class="link-p">
            <router-link to="/Demo362">Demo362 嵌套命名视图</router-link>
        </p>
        <p class="link-p">
            <router-link to="/Demo38">Demo38 传递 Props 到路由组件</router-link>
        </p>


        <router-view></router-view>
  </div>
</template>

<script>
    export default {
        name: 'App',
        created() {
            // this.getViewport();
        },
        methods: {
        }
    }
</script>

<style lang="stylus">
    #app {
        font-family Avenir, Helvetica, Arial, sans-serif
        -webkit-font-smoothing antialiased
        -moz-osx-font-smoothing grayscale
        text-align center
        color #2c3e50
        margin-top 20px
    }
    .logo{
        display: block;
        width: 60px;
        height: auto;
        margin: 0 auto;
    }
    .link-p {
        width: 90%;
        margin: 5px auto;
        border-radius: 4px;
        background-color: #7fd0ff;
    }
</style>
