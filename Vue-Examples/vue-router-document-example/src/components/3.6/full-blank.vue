<template>
    <div class="full-blank">
        <p>我是一个页面及的空白页面</p>
    </div>
</template>

<script>
    export default {
        name: 'FullBlank',
    }
</script>

<style scoped>
    .full-blank {
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
        z-index: 100;
        background: #ededed;
    }
    .full-blank p {
        text-align: center;
        line-height: 26px;
        margin-top: 20px;
        font-size: 20px;
    }
</style>
