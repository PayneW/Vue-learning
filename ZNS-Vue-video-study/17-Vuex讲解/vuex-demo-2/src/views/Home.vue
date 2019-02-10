<template>
    <div class="home">
        <img alt="Vue logo" src="../assets/logo.png">
        <HelloWorld msg="Welcome to Your Vue.js App"/>
    </div>
</template>

<script>
    // @ is an alias to /src
    // 导入 Footer.vue 模块
    import HelloWorld from '@/components/Footer.vue'

    export default {
        name: 'home',
        components: {
            HelloWorld
        }
    }
</script>
