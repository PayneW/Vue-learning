<template>
    <div id="app">
        <!-- 单个插槽 -->
        <SingleSlot>
            <span>我是父组件里的文字，但是我要被放到子组件里</span>
        </SingleSlot>

        <!-- 具名插槽 -->
        <NamedSlots>
            <p slot="named-num-one">
                <span>Named Slots One </span>
                <span> 具名插槽第一个</span>
            </p>

            <p>
                <span> 父级标签 P 没有 slot 名，所以插入到子组件(NamedSlots)默认的 slot 标签中 </span>
            </p>

            <p slot="named-num-two">
                <span>Named Slots Two </span>
                <span> 具名插槽第二个</span>
            </p>
        </NamedSlots>

        <!-- 作用域插槽 -->
        <ScopedSlots>
            <!-- 通过 slot-scope -->
            <p slot="scoped-slots-name" slot-scope="scopedSlotData">
                {{ scopedSlotData.msg }}
            </p>
        </ScopedSlots>

    </div>
</template>

<script>
    // 单个插槽
    import SingleSlot from './components/single-slot/SingleSlot';
    // 具名插槽
    import NamedSlots from "./components/named-slots/NamedSlots";
    // 作用域插槽
    import ScopedSlots from "./components/scoped-slots/ScopedSlots";


    export default {
        name: 'app',

        components: {
            SingleSlot,
            NamedSlots,
            ScopedSlots,
        }
    }
</script>

<style>
    * { margin: 0; padding: 0; font-size: 14px; line-height:22px; }
    #app {
        width: 100%;
        height: 100%;
        overflow: hidden;
    }
</style>
