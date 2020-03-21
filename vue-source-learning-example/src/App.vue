<template>
    <div id="app">
        <img alt="Vue logo" class="logo" src="./assets/logo.png">
        <p v-if="seen">现在你看到我了!</p>
        <HelloWorld msg="Welcome to Your Vue.js App"/>
        <Demo123/>
        <Demo124/>
        <Demo125/>
        <Demo133/>
        <Demo1412/>
    </div>
</template>

<script type="text/javascript">
    import HelloWorld from './components/HelloWorld.vue';
    import Demo123 from './components/1.2.3.vue';
    import Demo124 from './components/1.2.4';
    import Demo125 from './components/1.2.5';
    import Demo133 from './components/1.3.3';
    import Demo1412 from './components/1.4.1.2';

    export default {
        name: 'App',
        data() {
            return {
                seen: false,
            }
        },
        components: {
            HelloWorld,
            Demo123,
            Demo124,
            Demo125,
            Demo133,
            Demo1412,
        }
    }
</script>

<style type="text/css">
    * {
        margin: 0;
        padding: 0;
        font-size:14px;
        letter-spacing: 0;
    }
    h1, h2, h3 {
        margin: 5px 0;
        font-size: 20px;
        font-weight: bold;
    }
    p {
        margin-top: 5px;
        line-height: 20px;
    }
    div, p {
        border-radius: 4px;
    }
    button {
        min-width: 100px;
        line-height: 26px;
        border: none;
        margin: 4px 0;
        border-radius: 4px;
        text-align: center;
        background-color: #99cc66;
    }
    input {
        min-width:120px;
        line-height: 26px;
        text-indent: 10px;
        border: none;
        border-radius: 4px;
    }
    .default-div {
        margin: 10px 10px 10px 0;
        height: 200px;
        width: 320px;
        padding: 0 10px;
        float: left;
        background: #33cc99;
    }
    #app {
      font-family: "Menlo", "Microsoft YaHei", "WenQuanYi Micro Hei", Arial, sans-serif;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      text-align: left;
      color: #2c3e50;
      margin-top: 20px;
    }
    .logo{
      width: 100px; height: auto;
    }
</style>
