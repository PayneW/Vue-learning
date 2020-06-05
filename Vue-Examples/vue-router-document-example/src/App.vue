<template>
  <div id="app">
      <img alt="Vue logo" class="logo" src="./assets/logo.png">
      
      <Demo31/>
  </div>
</template>

<script>
    import Demo31 from './components/3.1/3.1';
    export default {
        name: 'App',
        components: {
            Demo31,
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
        margin-top 60px
    }
    .logo{
        display: block;
        width: 160px;
        height: auto;
        margin: 0 auto;
    }
</style>
