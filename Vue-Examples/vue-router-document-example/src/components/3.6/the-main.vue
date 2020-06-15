<template>
    <div class="the-main">
        <p>我是内容模块</p>
    </div>
</template>

<script>
    export default {
        name: 'TheMain',
    }
</script>

<style lang="stylus">
    .the-main {
        width: 75%;
        height: 100%;
        right: 0;
        bottom: 0;
        position: absolute;
        z-index: 100;
        text-align: center;
        background: #fdfdfd;
    }
</style>
