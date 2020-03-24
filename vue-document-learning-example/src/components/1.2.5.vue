<template>
    <div id="app-5" class="default-div">
        <h2>1.2.5: 处理用户输入</h2>
        <p>{{ message }}</p>
        <button v-on:click="reverseMessage">反转消息</button>

        <p><input v-model="message"></p>
    </div>
</template>

<script>
    export default {
        name: 'Demo125',
        data() {
            return {
                message: 'Hello 01-Vue.js!'
            }
        },
        methods: {
            reverseMessage: function() {
                // - split(): 基于指定的分隔符, 把字符串转换为数组
                // - reverse(): 反转数组项的顺序
                // - join(): 基于指定的分隔符, 把数组转换为字符串.
                this.message = this.message.split('').reverse().join('')
            }
        }
    }
</script>

<style type="text/css" scoped>
    #app-5 {}
</style>
