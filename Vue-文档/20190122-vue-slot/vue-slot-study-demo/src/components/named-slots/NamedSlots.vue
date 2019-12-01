<template>
    <!-- named-slots 具名插槽: 将某个名字的内容插到子组件 slot 对应的名字里去 -->
   <div id="named-slots">
       <h3>Named slots 具名插槽</h3>

       <slot></slot>

       <slot name="named-num-two"></slot>

       <slot name="named-num-one"></slot>
   </div>
</template>

<script>
    export default {
        name: "named-slots"
    }
</script>

<style>
    #named-slots {
        width: 96%;
        min-height: 200px;
        margin: 2%;
        background: #f0f2f6;
        border-radius: 4px;
        overflow: hidden;
    }
    #named-slots p {
        margin-top: 2px;
        background: lightblue;
        border-radius: 2px;
    }
</style>
