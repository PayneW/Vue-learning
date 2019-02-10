<template>
    <div class="hello">
        <h1>Welcome to Vuex</h1>
        <h2>{{ msg }}</h2>
    </div>
</template>

<script>
    export default {
        name: 'HelloWorld',
        // 当前模块被 Home.vue 导入，所以此 msg 就导入到 Home.vue 文件的
        // <HelloWorld msg="Welcome to Your Vue.js App"> 内部，父组件
        // 通过 props 给子组件下发数据
        props: {
            msg: String
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    h3 {
        margin: 40px 0 0;
    }

    ul {
        list-style-type: none;
        padding: 0;
    }

    li {
        display: inline-block;
        margin: 0 10px;
    }

    a {
        color: #42b983;
    }
</style>
