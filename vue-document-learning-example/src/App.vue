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
        <Demo1511/>
        <Demo1513/>
        <Demo1514/>
        <Demo152/>
        <Demo1613 class="another-bg-color"/>
        <Demo1614/>
        <Demo1711/>
        <Demo1714/>
        <Demo172/>
        <Demo181/>
        <Demo182/>
        <Demo1842/>
        <Demo186/>
        <Demo1810/>
        <Demo191/>
        <Demo192/>
        <Demo193/>
        <Demo11012/>
        <Demo11013/>
        <Demo11014/>
        <Demo11015/>
        <Demo1111/>
    </div>
</template>

<script type="text/javascript">
    import HelloWorld from './components/HelloWorld.vue';
    import Demo123 from './components/1.2.3.vue';
    import Demo124 from './components/1.2.4';
    import Demo125 from './components/1.2.5';
    import Demo133 from './components/1.3.3';
    import Demo1412 from './components/1.4.1.2';
    import Demo1511 from './components/1.5.1.1';
    import Demo1513 from './components/1.5.1.3';
    import Demo1514 from './components/1.5.1.4';
    import Demo152 from './components/1.5.2';
    import Demo1613 from './components/1.6.1.3';
    import Demo1614 from './components/1.6.1.4';
    import Demo1711 from './components/1.7.1.1';
    import Demo1714 from './components/1.7.1.4';
    import Demo172 from './components/1.7.2';
    import Demo181 from './components/1.8.1';
    import Demo182 from './components/1.8.2';
    import Demo1842 from './components/1.8.4.2';
    import Demo186 from './components/1.8.6';
    import Demo1810 from './components/1.8.10/todo-list';
    import Demo191 from './components/1.9.1';
    import Demo192 from './components/1.9.2';
    import Demo193 from './components/1.9.3';
    import Demo11012 from './components/1.10.1.2';
    import Demo11013 from './components/1.10.1.3';
    import Demo11014 from './components/1.10.1.4';
    import Demo11015 from './components/1.10.1.5';
    import Demo1111 from './components/1.11.1';

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
            Demo1511,
            Demo1513,
            Demo1514,
            Demo152,
            Demo1613,
            Demo1614,
            Demo1711,
            Demo1714,
            Demo172,
            Demo181,
            Demo182,
            Demo1842,
            Demo186,
            Demo1810,
            Demo191,
            Demo192,
            Demo193,
            Demo11012,
            Demo11013,
            Demo11014,
            Demo11015,
            Demo1111,
        }
    }
</script>

<style type="text/css">
    * {
        margin: 0;
        padding: 0;
        font-size:14px;
        letter-spacing: 0;
        list-style: none;
    }
    h1, h2, h3 {
        margin: 5px 0;
        font-size: 20px;
        font-weight: bold;
    }
    p {
        margin: 5px 0;
        line-height: 20px;
    }
    div, p {
        border-radius: 4px;
    }
    button {
        min-width: 66px;
        line-height: 26px;
        padding: 3px 6px;
        margin: 6px 6px 6px 0;
        cursor: pointer;
        border-radius: 4px;
        text-align: center;
        background-color: #fafafa;
        border: none;
    }
    button:hover {
        background-color: #e2e6ea;
        color: #222629;
    }
    input {
        min-width:120px;
        line-height: 26px;
        text-indent: 10px;
        border: none;
        border-radius: 4px;
    }
    .default-div {
        margin: 6px 0 6px 12px;
        height: 200px;
        width: 320px;
        padding: 0 10px;
        float: left;
        background: #33cc99;
        overflow: hidden;
    }
    #app {
        font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,  sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: left;
        color: #2c3e50;
        margin-top: 3px;
    }
    .logo{
        display: block;
        width: 160px;
        height: auto;
        margin: 0 auto;
    }
</style>
