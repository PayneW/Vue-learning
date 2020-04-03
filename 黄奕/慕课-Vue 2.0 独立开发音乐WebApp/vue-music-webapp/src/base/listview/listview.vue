<!-- 歌手列表 + 右侧 "热-A-Z" 快捷列表 -->
<template>
    <!-- 父组件1: src--components--singer--singer.vue, data 为父组件传入， 在当前组件 props 内声明  -->
    <!-- 5-5 给 Scroll 添加 ref 引用: 作用是当我们点击右侧的 shortcutList ("热-A-Z") 中的某一项时，
        better-scroll 滚动到相对应的项。[better-scroll 组件默认只处理容器(wrapper)的第一个子元素
        (content) 的滚动] -->
    <!-- 5-6 add: :listenScroll 和 :probeType 为当前组件(定义在 create() 声明周期中) 向子组件 scroll.vue
         传递数据，在子组件内的 props 内声明。 @scroll = "scroll" 为子组件 scorll.vue 通过 $emit 向父组件发送的消息。 -->
    <Scroll
        class="list-view"
        :data="data"
        ref="listView"
        :listen-scroll="listenScroll"
        :probe-type="probeType"
        @scroll="scroll">
        <ul>
            <!-- 第一个循环是输出 "热门-A-Z" -->
            <!-- 5-5 添加 ref="listGroup"，作用是点击右侧的 shortcutList 时左侧歌手列表滚动到相应的位置 -->
            <li v-for="group in data" class="list-group" ref="listGroup">
                <h2 class="list-group-title">{{group.title}}</h2>
                <ul>
                    <!-- 第二个循环式: 每个字母下符合的歌手，循环输出-->
                    <li
                        v-for="item in group.items"
                        class="list-group-item"
                        @click="selectItem(item)">
                        <!-- 5-4:  4-12 视频中有讲解 -->
                        <img  class="avatar" v-lazy="item.avatar">
                        <span class="name">{{item.name}}</span>
                    </li>
                </ul>
            </li>
        </ul>

        <!-- 右侧 "热-A-Z" 快捷列表 [- shortcut /'ʃɔːtkʌt/ n.捷径，便道  --shortcut list 快捷列表] -->
        <!-- 5-5 给 list-shortcut 添加:
                + (1)点击事件(移动端是 touchstart)
                + (2)touchmove: 在 list-shortcut 上滑动时的事件。
                + 说明: .stop.prevent 是 vue 提供的的 6 个事件修饰符中的 2 个；
                    - .stop 是原生的 event.stopPropagation(): 取消事件的进一步捕获或冒泡。
                    - .prevent 是 event.preventDefault(): 取消事件的默认行为。
             添加 .stop 和 .prevent 的原因: 我们在 div.list-shortcut 上滑动如果不阻止事件的
             冒泡和默认行为，事件就会冒泡到包围的 Scroll 组件上，问题是 Scroll 组件本身也有事件，
             不阻止的话 Scroll 上的事件也会执行。
        -->
        <div class="list-shortcut"
             @touchstart.stop.prevent = "onShortcutTouchStart"
             @touchmove.stop.prevent = "onShortcutTouchMove">
            <ul>
                <!-- 5-5 利用 v-mind:data-index 添加一个动态属性，属性的值为 当前 li 项的索引  -->
                <!-- 6-2 add: @click="select(item)" 添加点击事件，供跳转到歌手详情页面使用 -->
                <li v-for="(item, index) in shortcutList"
                    class="item"
                    :key="item"
                    :data-index="index"
                    :class="{'current': currentIndex === index}">
                    {{ item }}
                </li>
            </ul>
        </div>

        <!-- 5-9 add : v-show 是当 fixedTitle 有值时，div.list-fixed 才做展示-->
        <div class="list-fixed" v-show="fixedTitle" ref="fixed">
            <!-- fixedTitle 在计算属性中 -->
            <h1 class="fixed-title">{{fixedTitle}}</h1>
        </div>

        <div class="loading-container" v-show="!data.length">
            <Loading/>
        </div>
    </Scroll>
</template>

<script type="text/javascript">
    // 引入公共的 scroll 组件
    import Scroll from "base/scroll/scroll";

    import {getData} from "assets/js/dom";

    import Loading from "base/loading/loading";

    // 5-5: 定义常量 ANCHOR_HEIGHT 为 18 以供 onShortcutTouchMove 事件使用;
    // 18 来自于 item 样式中的 font-size: 12px + padding: 3px
    const ANCHOR_HEIGHT = 18;

    // 5-10 add:
    const TITLE_HEIGHT = 30;


    export default {
        props: {
            // 父组件 singer.vue 传入的 data 数据，当前子组件在 props 属性中声明
            data: {
                type: Array,
                default: []
          }
        },

        components: {
            Scroll,
            Loading
        },

        /** Vue 生存周期 (生存周期创建的都是函数):
         *  beforeCreate -> created -> beforeMount -> Mounted ->
         *  beforeUpdate -> updated -> beforeDestroy -> destroyed
         * */
        // 5-5 add
        created() {
            // touch 属性供 methods 中的 onShortcutTouchStart 和 onShortcutTouchMove
            // 2 个事件共享使用，但是为什么不在 vue 组件下的 data 方法中创建 touch 属性呢？
            // 原因是 vue 渐进式框架会把组建内的 data、props内的属性添加 getter/setter 访问器属性
            // 使其变成响应式的，以便在 template 中做数据绑定使用。但此时我们只需要在两个事件中共享
            // 使用，并不需要把它变成响应式的。
            this.touch = {};
            this.listenScroll = true;

            // 5-6 add: 保存每个 li.list-group 的高度
            this.listHeight = [];
            //
            this.probeType = 3;
        },

        // 5-6 add:
        data() {
            return {
                // scrollY 观测歌手列表实时滚动的位置, 如何得到 scrollY? A: 通过 methods 中的 scroll 事件来赋值
                scrollY: -1,
                // 当前显示的是第几个, 默认为 0, 即 shortcut-list 第一个高亮
                currentIndex: 0,

                // 5-10
                diff: -1,
            }
        },


        computed: {
            // 计算属性: 目的是添加 A-Z 的快速入口
            shortcutList() {
                // 此时 props 中的 data 已经有值了，data 的值是父组件(singer.vue)传入的
                // 参数 group 是根据上面的 <li v-for="group in data"> 得来的
                return this.data.map((group) => {
                    // 因为 "热-A-Z" 都是一个词，所以 "热门" 要截取第一个字
                    // console.log("group.title: ", group.title);
                    return group.title.substring(0,1);
                })
            },

            // 5-9
            fixedTitle() {
                // 正值是 better-scroll 内的监听元素已经滑动到最上面了， 我们还继续往下滑动时 better-scroll
                // 添加的一个缓动效果，没有实际的意义，但是这样的话页面就会出现，h1.fixed-title 此标题存在，
                // 下面还有一个歌手列表中的 "热门" 标题也存在，所以避免出现这种情况，我们就吧 scrollY 大于 0
                // 的情况直接 return
                if (this.scrollY > 0) return;
                return this.data[this.currentIndex] ? this.data[this.currentIndex].title : ""
            }
        },

        methods: {

            // 6-2 add 歌手列表 li 的点击事件，通过 $emit 把自己 select 点击的事件发送出去，
            // 在父组件的 "<ListView :data="singers"></ListView>" 添加接收的事件
            selectItem(item) {
                // console.log("listView.vue 中 发送的 item 为: ", item);
                this.$emit("select", item)
            },

            // 点击事件(移动端是 touchstart)
            onShortcutTouchStart(event) {
                // 首先拿到 "热门-A-Z" 列表的索引,
                // 通过 event.target 能拿到 div.list-shortcut > ul > li 的每个 li 的索引
                let anchorIndex = getData(event.target, "index");
                // js高程--13.4.9: touches: 表示当前跟踪的触摸操作的 Touch 对象的数组。
                let firstTouch = event.touches[0];
                // 获取当前点击的 li.item 的 payeY 保存到 touch 数组，以供下面的 touchmove 事件使用
                this.touch.y1 = firstTouch.pageY;
                this.touch.anchorIndex = anchorIndex;
                // console.log("this.touch: ", this.touch);

                // 0 代表没有参数传入
                /* this.$refs.listView 找到绑定 better-scroll 的 Scroll 组件，然后调用 better-scroll
                 * 封装的 scrollToElement() 方法，使用上面获得的右侧 li.item 的索引 anchorIndex (右侧的
                 * 快捷列表和左侧的歌手列表的 li 是同等的)，所以 touchStart 的同时左侧的歌手列表也会移动到
                 * 相对的位置。*/
                // this.$refs.listView.scrollToElement(this.$refs.listGroup[anchorIndex], 0)
                // 5-5 调用滚动到哪里的代码可以公用，所以抽出来封装成一个私有方法
                this._scrollTo(anchorIndex);
            },

            // 在 list-shortcut 上滑动时的事件
            onShortcutTouchMove(event){
                let firstTouch = event.touches[0];
                this.touch.y2 = firstTouch.pageY;
                // (this.touch.y2 - this.touch.y1) : 得到 Y 轴上的偏移(即: Y 轴上的上下滑动的距离)
                //  Y 轴上的偏移量 / ANCHOR_HEIGHT(每个 item 的高度) ==> 得到划了几个 item
                let delta = (this.touch.y2 - this.touch.y1) / ANCHOR_HEIGHT | 0;
                let anchorIndex = parseInt(this.touch.anchorIndex, 10) + delta;
                // console.log("anchorIndex is a numeric type: ", typeof anchorIndex === "number");

                // 5-5 调用滚动到哪里的代码可以公用，所以抽出来封装成一个私有方法
                // this.$refs.listView.scrollToElement(this.$refs.listGroup[anchorIndex], 0);
                this._scrollTo(anchorIndex);
            },

            // 5-6 add: scroll 方法，接收子组件 scroll.vue 通过 $emit [me.$emit("scroll", pos)]
            // 向父组件发送的消息，里面包含一个 position 位置
            scroll(pos) {
                // 实时获取 scroll.vue 中 better-scroll 滚动的 y 轴的距离。(注: better-scroll 返回的
                // pos.y 都是负值，因为我们是在当前屏幕往上滑动的。当然在 Scroll 组建上滑动也会有大于 0 的值
                // 存在，但是这个正值是 better-scroll 内的监听元素已经处于最上面了， 我们还继续往下滑动时
                // better-scroll 添加的一个缓动效果，并没有实际的意义。通过下面的 console 输出可以看到 )
                // console.log("pos.y: ", pos.y);
                this.scrollY = pos.y;

            },

            // 5-6 add: 计算歌手列表每个 li.list-group 的高度。
            // Q: 在哪里调用这个私有方法? A: 在 watch 侦听器下的 singerData() 方法中
            _calculateHeight() {
                this.listHeight = [];
                const list = this.$refs.listGroup;
                let height = 0;
                this.listHeight.push(height);
                for (let i = 0; i < list.length; i++) {
                    let item = list[i];
                    // clientHeight 属性是元素内容区高度加上下内边距高度。
                    height += item.clientHeight;
                    // 这里一定要注意: 当前 list-group 的高度都加上了当前节点其上的所有节点的高度。看下面的输出。
                    this.listHeight.push(height);
                }
                // [0, 760, 1030, 1370, 1780, 1910, 2110, 2450, 2720, 3060, 3190, 3950, 4430,
                // 4700, 4900, 5100, 5370, 5570, 5980, 6460, 7010, 7560, 7900, 9010]
                // console.log("this.listHeight: ", this.listHeight);
            },

            // 5-5 add:
            _scrollTo(index) {
                // 5-8 _scrollTo() 这个方法是快捷列表"A-Z"上的2个事件共用的，但是在 div.list-shortcut 元素上
                // 我们设置了 padding: 20px 0; 上下的 20px 间距也是可以点击的，但是根据下面的 console 输出可以
                // 看到，padding 可以点击但是 index = null
                console.log("index", index);
                console.log("!index: ", !index);
                // 注: 这里的讲解比较绕，看 5-8 的视频讲解更好懂
                if (!index && index !== 0) {
                    return;
                }
                // debugger;
                if (index < 0) {
                    index = 0;
                }
                else if (index > this.listHeight.length -2 ) {
                    index = this.listHeight.length - 2;
                }

                // arguments = 0 是不需要缓动动画
                this.$refs.listView.scrollToElement(this.$refs.listGroup[index], 0);

                this.scrollY = this.$refs.listView.scroll.y;
            },

            // 7-25 add: 添加一个 refresh() 方法(内部调用 better-scroll 的 refresh() 方法)，
            // 给 singer.vue 中添加的 mixin 使用
            refresh() {
                this.$refs.listView.refresh();
            }

        },

        // 5-6 add
        watch: {
            // 观察的 Props 下的 data 的变化
            data() {
                // 添加延时的原因: 数据的变化到 DOM 的变化有一个延时
                setTimeout(() => {
                    this._calculateHeight();
                }, 20)
            },

            // 观察 data 方法下的 scrollY 属性，newY 是通过 methods 下的 scroll 方法赋值的。
            // 我们滚动歌手列表的时候子组件 (scroll.vue) 如果收到当前组件通过 listenScroll 数据，那么子组件就会
            // $emit("scroll", pos) 一个事件，并发送了一个 pos 的参数。
            scrollY(newY) {
                // console.log("查看 newY 的值: ", newY);
                // 取得上面保存每个 li.list-group 高度的 listHeight 数组
                // (tips: 请查看上面 _calculateHeight() 函数)
                const listHeight = this.listHeight;

                // 当前滚动到顶部 newY > 0
                if (newY > 0) {
                    this.currentIndex = 0;
                    return;
                }
                // 在中间部分滚动
                for (let i = 0; i < listHeight.length - 1; i++) {
                    // 抛去第一个和最后一个 li.list-group 后，我们在 div.list-shortcut 上 @touchmove 时
                    // 如何确定 touchmove 后 scrollY 落在哪个歌手列表内? A: 取得 listHeight 数组中的当前项和下一项
                    let height1 = listHeight[i];
                    let height2 = listHeight[i+1];
                    // newY 添加负号是因为当我们从下往上滑动时 better-scroll 返回的值是负数。(注: better-scroll
                    // 上滑返回负数，大概因为区分是上滑还是下滑)
                    if (-newY >= height1 && -newY < height2) {
                        this.currentIndex = i;

                        // 5-10 add: 取得当前元素的下一项(因为下一项的定位是根据当前项的左上角定位的)，然后和 better-scroll
                        // 实时获取的 newY(负值) 相加, 这个差值 (diff) 如果小于 h1.fixed-title 的高度，我就们就给一个
                        // h1.fixed-title 网上滑动的效果 (注: 效果在 watch 中监听)
                        this.diff = height2 + newY;


                        console.log("currentIndex: ", this.currentIndex);
                        return;
                    }
                }
                // 当滚动到底部，且 -newY 大于最后一个元素的上限
                this.currentIndex = listHeight.length - 2;
            },

            // 5-10 add
            diff(newVal) {
                let fixedTop = (newVal > 0 && newVal < TITLE_HEIGHT) ? newVal - TITLE_HEIGHT : 0;
                // 这里的讲解见: 5-10 视频
                if (this.fixedTop === fixedTop) return;
                this.fixedTop = fixedTop;
                // 使用 translate3d 是为了打开 GPU 加速
                this.$refs.fixed.style.transform = `translate3d(0, ${fixedTop}px, 0)`
            }

        },
    }

</script>

<style lang="stylus" scoped>
    @import "~assets/stylus/variable";

    .list-view {
        position: relative;
        width: 100%;
        height: 100%;
        overflow: hidden;
        background: $color-background;

        // 歌手列表
        .list-group {
            padding-bottom: 30px;

            .list-group-title {
                height: 30px;
                line-height: 30px;
                padding-left: 20px;
                font-size: $font-size-small;
                color: $color-text-l;
                background: $color-highlight-background;
            }

            .list-group-item {
                display: flex;
                align-items: center;
                padding: 20px 0 0 30px;

                .avatar {
                    width: 50px;
                    height: 50px;
                    border-radius: 50%;
                }
                .name {
                    margin-left: 20px;
                    color: $color-text-l;
                    font-size: $font-size-medium;
                }
            }
        }


        // 右侧 "热-A-Z" 的快捷列表
        .list-shortcut {
            position: absolute;
            z-index: 0;
            right: 2px;
            top: 50%;
            transform: translateY(-50%);
            width: 20px;
            padding: 20px 0;
            border-radius: 10px;
            text-align: center;
            background: $color-background-d;
            font-family: Helvetica;

            .item {
                padding: 3px;
                line-height: 1;
                color: $color-text-l;
                font-size: $font-size-small;

                &.current {
                    color: $color-theme;
                }
            }
        }

        // 固定头部
        .list-fixed {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;

            .fixed-title {
                height: 30px;
                line-height: 30px;
                padding-left: 20px;
                font-size: $font-size-small
                color: $color-text-l
                background: $color-highlight-background
            }
        }

        // loading
        .loading-container {
            position: absolute;
            width: 100%;
            top: 50%;
            transform: translateY(-50%)
        }
    }

</style>
