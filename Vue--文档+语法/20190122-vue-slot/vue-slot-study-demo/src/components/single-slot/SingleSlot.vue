<template>
    <div id="single-slot">
        <h3>Single slots 单个插槽</h3>
        <!-- 父组件离的 span 会替换掉 slot, 所以这里的 123 是看不见的
             如果父组件在使用子组件的时候不在里面添加内容，这里的
             slot 会显示出来 -->
        <slot>123</slot>
    </div>
</template>

<script>
    export default {
        name: "single-slot"
    }
</script>

<style>
    #single-slot {
        width: 96%;
        min-height: 200px;
        margin: 2%;
        background: #f0f2f6;
        border-radius: 4px;
        overflow: hidden;
    }
</style>
