<!-- scroll 组件: 用来创建一个滚动效果 -->
<template>
    <!-- 注意: 这里定义的是 ref 为了下面 better-scroll 插件获取元素使用，不是 class. -->
    <div ref="wrapper">
        <slot></slot>
    </div>
</template>

<script>
    import BScroll from "better-scroll";
    // 把 better-scroll 组件初始化相关都放在这里，不用在每个组件中初始化了，达到复用的目的，
    export default {
        // 设置 better-scroll 组件可以传入的 props (设置 props 也就代表 better-scroll 是父组件)
        // props 验证: 验证传入的 props 参数的数据规格，如果不符号数据规格， Vue 会发出警告。
        props: {
            // probe /prəʊb/ v.探测，探讨
            // 监听滚动事件，缓慢或者快速时都可以监听到
            probeType: {
                type: Number,
                default: 1
            },
            // 设置组件是否可以点击，是否手动派发点击事件
            click: {
                type: Boolean,
                default: true
            },
            // 组件可能有的数据，(比如: 4-10 视频中传入的 discList 数据)
            data: {
                type: Array,
                default: null
            }
        },

        mounted() {
            setTimeout(() => {
                this._initScroll();
            }, 20)
        },

        methods: {
            // 初始化 better-scroll
            _initScroll() {
                if (!this.$refs.wrapper) {
                    return;
                }
                this.scroll = new BScroll(this.$refs.wrapper, {
                    probeType: this.probeType,
                    click: this.click
                })
            },
            // better-scroll 内部分方法的代理
            enable() {
                this.scroll && this.scroll.enable();
            },
            disable() {
                this.scroll && this.scroll.disable();
            },
            // 刷新 scroll 从新计算高度
            refresh() {
                this.scroll && this.scroll.refresh();
            }
        },

        // watch 对象观察上面 props 中 data 的变化，如果 data 变化，刷新 scroll
        watch: {
            data() {
                setTimeout(() => {
                    this.refresh();
                }, 20)
            }
        }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">

</style>
