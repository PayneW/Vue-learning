<template>
  <div id="app">
        <img alt="Vue logo" class="logo" src="./assets/logo.png">
        <p class="link-p"><router-link to="/Demo31">Demo31</router-link></p>
        <p class="link-p"><router-link to="/Demo32">Demo32</router-link></p>
        <p class="link-p"><router-link to="/Demo33">Demo33</router-link></p>
        <p class="link-p"><router-link to="/Demo36">Demo36</router-link></p>
        <p class="link-p"><router-link to="/Demo362">Demo362</router-link></p>
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
        background-color: #a3dafa;
    }
</style>
