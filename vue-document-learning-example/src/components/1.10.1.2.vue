<template>
    <div id="app11011" class="default-div">
        <h2>1.10.1.2: `v-model` textarea 多行文本的双向数据绑定</h2>
        <span>Multiline message is:</span>
        <p style="white-space: pre-line;">{{ message }}</p>
        <br>
        <textarea v-model="message" cols="26" rows="4"></textarea>
    </div>
</template>
<script>
    export default {
        name: 'Demo11011',
        data() {
            return {
                message: ''
            }
        }
    }
</script>
<style scoped>
    textarea {
        border: 1px solid #ccc;
        border-radius: 4px;
    }
</style>
