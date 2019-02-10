<!-- scroll 组件: 用来创建一个滚动效果 -->
<template>
    <div class="wrapper">
        <slot></slot>
    </div>
</template>

<script>
    import BScoll from "better-scroll";
    // 把 better-scroll 组件初始化相关都放在这里，不用再每个组件中初始化了，达到复用的目的
    export default {
        // 设置组件可以传如的 props
        props: {
            // probe /prəʊb/ v.探测，探讨
            probeType: {
                type: Number
            }
        }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">

</style>
