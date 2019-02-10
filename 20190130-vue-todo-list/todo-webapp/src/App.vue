<template>
    <div id="test">{{ text }}</div>
</template>

<script>
    export default {
        data() {
            return {
                text: 'abc'
            }
        }
    }
</script>

<style>
    #test {
        color: palevioletred;
        width: 100%;
        height: 100%;
    }
</style>