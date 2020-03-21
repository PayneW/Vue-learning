<template>
    <div id="app-3">
        <h2>1.2.3: v-bind:attribute</h2>
        <span v-bind:title="message">
            鼠标悬停几秒钟会显示此处动态绑定的提示信息!
        </span>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                message: '页面加载于' + new Date().toLocaleString()
            }
        }
    }
</script>

<style scoped>
    #app-3{
        width: 340px;
        line-height: 20px;
        padding: 5px 0;
        background: #33cc99
    }
</style>
