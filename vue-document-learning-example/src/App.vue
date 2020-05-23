<template>
    <div id="app">
        <div class="normal-component">
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
            <Demo1116/>
            <Demo11162/>
            <Demo1118/>
            <Demo2262/>
            <Demo232/>
            <Demo233/>
            <Demo234/>
            <Demo244/>
            <Demo245/>
            <Demo248/>
            <Demo251/>
            <Demo2613/>
            <Demo312/>
            <Demo3122/>
            <Demo3123/>
            <Demo3124/>
            <Demo3127/>
            <Demo314/>
            <Demo316/>
            <Demo3171/>
            <Demo3172/>
            <Demo3173/>
            <Demo319/>
            <Demo323/>
            <Demo324/>
            <Demo411/>
            <Demo421/>
            <Demo423/>
            <Demo4231/>
            <Demo431/>
            <Demo4344/>
            <Demo45/>
            <Demo512/>
        </div>
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
    import Demo1116 from './components/1.11.6/Prop-father-component';
    import Demo11162 from './components/1.11.6.2/1.11.6.2';
    import Demo1118 from './components/1.11.8/1.11.8';
    import Demo2262 from './components/2.2.6.2';
    import Demo232 from './components/2.3.2';
    import Demo233 from './components/2.3.3';
    import Demo234 from './components/2.3.4/2.3.4';
    import Demo244 from './components/2.4.4/2.4.4';
    import Demo245 from './components/2.4.5/2.4.5';
    import Demo248 from './components/2.4.8/2.4.8';
    import Demo251 from './components/2.5.1/2.5.1';
    import Demo2613 from './components/2.6.1.3';
    import Demo312 from './components/3.1.2';
    import Demo3122 from './components/3.1.2.2';
    import Demo3123 from './components/3.1.2.3';
    import Demo3124 from './components/3.1.2.4';
    import Demo3127 from './components/3.1.2.7';
    import Demo314 from './components/3.1.4';
    import Demo316 from './components/3.1.6/3.1.6';
    import Demo3171 from './components/3.1.7.1';
    import Demo3172 from './components/3.1.7.2';
    import Demo3173 from './components/3.1.7.3';
    import Demo319 from './components/3.1.9';
    import Demo323 from './components/3.2.3';
    import Demo324 from './components/3.2.4';
    import Demo411 from './components/4.1.1';
    import Demo421 from './components/4.2.1';
    import Demo423 from './components/4.2.3';
    import Demo4231 from './components/4.2.3.1';
    import Demo431 from './components/4.3.1/4.3.1';
    import Demo4344 from './components/4.3.4.4/4.3.3.4';
    import Demo45 from './components/4.5.vue';
    import Demo512 from './components/5.1.2-todos/5.1.2-todos'

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
            Demo1116,
            Demo11162,
            Demo1118,
            Demo2262,
            Demo232,
            Demo233,
            Demo234,
            Demo244,
            Demo245,
            Demo248,
            Demo251,
            Demo2613,
            Demo312,
            Demo3122,
            Demo3123,
            Demo3124,
            Demo3127,
            Demo314,
            Demo316,
            Demo3171,
            Demo3172,
            Demo3173,
            Demo319,
            Demo323,
            Demo324,
            Demo411,
            Demo421,
            Demo423,
            Demo4231,
            Demo431,
            Demo4344,
            Demo45,
            Demo512
        }
    }
</script>

<style src="./assets/typo.css"></style>
<style type="text/css">
    h1, h2, h3 {
        margin: 5px 0;
        font-weight: bold;
    }
    p {
        margin: 5px 0;
        line-height: 20px;
    }
    div, p {
        border-radius: 4px;
    }
    button, input, textarea {
        font-size: 15px;
        outline: none;
        box-shadow: none;
    }
    button {
        line-height: 16px;
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
