<template>
    <div id="app-1412" class="default-div">
        <h2>1.4.1.2: 原始 HTML</h2>
        <p>使用 Mustache: {{rawHtml}}</p>
        <p>使用 v-html 指令: <span v-html="rawHtml"></span></p>
    </div>
</template>

<script>
    export default {
        name: 'app-1412',
        data() {
            return {
                rawHtml: '<span style="color:red">This should be red.</span>'
            }
        }
    }
</script>

<style scoped>
    #app-1412 {
        width: 560px;
    }
    p{
        margin-top: 10px;
    }
</style>
