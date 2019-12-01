<template>
    <!-- 子组件: ScopedSlots.vue -->
    <div id="scoped-slots">
        <p>作用域插槽</p>
        <!-- 通过 v-bind 把当前子组件的数据"绑定"到插槽上。更准确的说是绑定到未来插入到该插槽的节点上。 -->
        <slot name="scoped-slots-name" v-bind="scopedSlotData"></slot>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                scopedSlotData: {
                    msg: "I am scoped slots Data"
                }
            }
        },

    }
</script>

<style>
    #scoped-slots {
        width: 96%;
        min-height: 200px;
        margin: 2%;
        background: #f0f2f6;
        border-radius: 4px;
        overflow: hidden;
    }
</style>



