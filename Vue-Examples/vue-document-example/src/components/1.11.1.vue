<template>
    <div id="app1111" class="default-div">
        <h2>1.11.1 组件基础-基本示例</h2>
       <button @click="count++">You clicked me {{ count }} times.</button>
    </div>
</template>
<script>
    export default {
        name: 'ButtonCounter',
        data() {
            return {
                count: 0
            }
        },

    }
</script>
<style scoped>

</style>
