<template>
  <div id="app">
      <img alt="Vue logo" class="logo" src="./assets/logo.png">
      <p class="link-p"><router-link to="/Demo31">Demo31</router-link></p>
      <p class="link-p"><router-link to="/Demo32">Demo32</router-link></p>

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
            getViewport: function() {
                console.log('window.innerWidth:', window.innerWidth);
                console.log('window.innerHeight:', window.innerHeight);
                console.log('document.documentElement.clientWidth:', document.documentElement.clientWidth);
                console.log('document.documentElement.clientHeight:', document.documentElement.clientHeight);
            }
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
        width: 120px;
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
