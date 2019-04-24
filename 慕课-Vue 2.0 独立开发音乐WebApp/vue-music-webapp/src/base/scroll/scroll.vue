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
        // 设置 better-scroll 组件可以传入的 props (设置 props 代表当前组件为某个组件的子组件)
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
            // 组件可能有的数据，(比如: 4-10 视频中传入的 discList 数据; 即 recommend.vue 传入的推荐歌单数据)
            data: {
                type: Array,
                default: null
            },

            // 5-6 add: 主要作用是获取当前滚动元素的位置。(e.g.: 歌手列表 singer.vue 组件中
            // [实际的代码在 listview.vue 中]滑动歌手列表，右侧的 shortcutList 快捷列表需要
            // 知道当前你滑动到哪个歌手，然后把相对应的字母选中)
            // listenScroll 属性的作用就是让下面的 _initScroll 时要不要监听歌手列表上的 scroll
            // 事件，具体的判断在下面 methods 下 _initScroll 方法的 if 判断中。
            // tips: 记得 listview.vue 中的一定要传值，在当前子组件 props 中接收。
            listenScroll: {
                type: Boolean,
                default: false,
            },

            // 10-5 add: suggest.vue 组件内的搜索列表是可以上拉刷新的，所以我们在此处扩展组件
            pullup: {
                type: Boolean,
                default: false,
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
                });

                // 5-6 add: 如果父组件 (listview.vue)通过 props 向子组件传递 listenScroll 数据
                if(this.listenScroll) {
                    let me = this; // 保存 vue 实例的 this
                    // 就监听 better-scroll 的 scroll 滚动事件
                    this.scroll.on("scroll", (pos) => {
                        // 派发一个名为 scroll 的事件 (注: $emit 是 vue 的方法所以需要用 me)
                        // pos 时一个对象，里面有 X 和 Y 轴的位置
                        me.$emit("scroll", pos)
                    })
                }

                // 10-5 add: suggest.vue 组件内的搜索列表是可以上拉刷新的，所以我们在此处扩展组件
                if (this.pullup) {
                    // scrollEnd 是当前滑动结束时派发一个事件
                    this.scroll.on("scrollEnd", () => {
                        // 当前滑动结束的位置的 y 坐标 < xxxx  说明已经快滚动到底部了
                        console.log("scroll.y: ", this.scroll.y);
                        console.log("scroll.maxScrollY: ", this.scroll.maxScrollY);
                        if (this.scroll.y <= (this.scroll.maxScrollY + 50)) {
                            // 当前组件通过 $emit 发送名称为 scrollToEnd 的消息给父组件 suggest.vue，消息没有附加参数
                            this.$emit("scrollToEnd");
                        }
                    });
                }
            },
            // better-scroll 内部分方法的代理
            enable() {
                this.scroll && this.scroll.enable();
            },
            disable() {
                this.scroll && this.scroll.disable();
            },
            // 刷新 scroll 从新计算高度:
            // 7-25 add: tips: 想一想当前 methods 对象中定义的这些方法并没有在当前组件内调用，
            // 那么这些方法是在哪里被调用的？ A: 当前组件的父组件中被调用。例如父组件 music-list.vue
            // 中的 this.$refs.list.refresh();
            refresh() {
                this.scroll && this.scroll.refresh();
            },

            // 5-5 添加
            scrollTo() {
                this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments);
            },
            scrollToElement() {
                this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments);
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
