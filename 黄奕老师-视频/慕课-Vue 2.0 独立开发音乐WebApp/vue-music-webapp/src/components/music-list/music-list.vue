<!-- 6-8 公共的 "歌曲列表"(music-list) 组件 : 在歌单排行榜的页面也会用到这个公共组件 -->
<template>
    <div class="music-list">
        <!-- 6-14 add: @click = "back" -->
        <p class="back" @click = "back">
            <i class="icon-back"></i>
        </p>
        <h1 class="title" v-html="title"></h1>
        <!-- 6-8 :style="bgStyle" bgStyle 为计算属性取得。 动态绑定 style 详细示例见:
                ZNS-Vue-video-study\1-chapter-video -->
        <!-- 6-9 add: ref="bgImage"， 在下面的 mounted 模板编译之后生命周期中使用 -->
        <div class="bg-image" v-bind:style="bgStyle" ref="bgImage">

            <!-- 6-14 add -->
            <div class="play-wrapper">
                <!-- 6-14 播放按钮要等歌曲列表全部返回才能显示 v-show -->
                <!-- 7-18 add: @click="random" 点击随机播放事件，添加随机播放事件后接着就要在
                     vuex 中的 actions 中添加 randomPlay 封装函数，接下来的讲解见 store.js -->
                <p class="play" v-show="songs.length > 0" ref="play" @click="random">
                    <i class="icon-play"></i>
                    <span class="text">随机播放全部</span>
                </p>
            </div>

            <div class="filter" ref="filter"></div>
        </div>

        <!-- 6-10 add 为实现上滑歌曲列表上面的歌手名片隐藏而添加的 div -->
        <div class="bg-layer" ref="layer"></div>

        <!-- 引入封装的 Scroll 组件  -->
        <!-- 6-9: 动态绑定 data, 和之前的语法一样，better-scroll 初始化后可能里面的的 div 需要的数据还没有返回
             所有没有高度，所以添加一个 data 当 songs 的长度大于 0 时代表数据已经返回，这样就调用 better-scroll 中
             封装的 refresh 方法，从新刷新渲染。 -->
        <!-- 6-10: 为了实现上滑歌曲列表时上面的歌手图片动态隐藏的效果，添加和 listview.vue 文件中相同的代码:
             [5-6 add: :listenScroll 和 :probeType 为当前组件(在 create() 声明周期中) 向子组件 scroll.vue
             传递数据，在子组件的 props 内声明。@scroll="scroll" 为子组件 scroll.vue 通过 $emit 向父组件发送的消息。]
         -->
        <Scroll
            :data="songs"
            class="list"
            ref="list"
            :listen-scroll="listenScroll"
            :probe-type="probeType"
            @scroll="scroll">
            <div class="song-list-wrapper">
                <!-- 7-3 add: @select="selectItem" -->
                <!-- 9-5 add: rank -->
                <song-list :rank="rank" @select="selectItem" :songs="songs"/>
            </div>

            <div class="loading-container" v-show="!songs.length">
                <Loading/>
            </div>
        </Scroll>
    </div>
</template>

<script>
    // 6-9 add
    import Scroll from "base/scroll/scroll";
    import SongList from "base/song-list/song-list";

    // 6-10 add: reserved height (预留高度)
    const RESERVED_HEIGHT = 40;

    // 6-13 add
    import {prefixStyle} from "assets/js/dom";
    const transform = prefixStyle("transform");
    const backdrop = prefixStyle("backdrop-filter");

    // 7-3 引入 vuex 中的 mapActions
    import {mapActions} from "vuex";


    import Loading from "base/loading/loading"

    // 7-25 引入 mixin
    import {playlistMixin} from "assets/js/mixin"

    export default {

        // 7-25 add: 插入 mixin
        mixins: [
            // tips: 组件中的同名方法会覆盖掉 mixin 中的方法。
            playlistMixin,
        ],

        // 6-8
        props: {
            // 背景图
            bgImage: {
                type: String,
                // 默认为空
                default: ""
            },
            songs: {
                type: Array,
                default: []
            },
            title: {
                type: String,
                default: ""
            },

            // 9-5 add: 添加排行需要的信息
            rank: {
                type: Boolean,
                default: false,
            }

        },

        // 6-10 add
        created() {
            this.probeType = 3;
            this.listenScroll = true;
        },

        // 6-8 动态给 div.bg-image 添加 background-image
        computed: {
            bgStyle() {
                return `background-image: url(${this.bgImage})`;
            }
        },

        // 6-9 add
        mounted() {
            // this.$ref.list 取到的是一个 vue components 对象，因为现在 ref 我们是写在 Scroll 组建上的，
            // 我们需要取到 element(即: DOM 对象)，就要接着使用 $el (Vue 实例使用的根 DOM 元素).
            /* 为什么 top = this.$refs.bgImage.clientHeight ?  A: 在下面的 bg-image {
               height: 0; padding-top: 70%; background-size: cover;} 中 height 高度为 0,
               padding-top 设置为了 70%; 这个 70% 是为了下面使用 clientHeight 方法而准备的。
               【为什么设置为 70% ? 详见: github-clone\CSS-grocery\20190310--等比例缩放的盒子.html】
               ，接着通过 v-bind:style="bgImage" 动态绑定了背景图片，下面我们又 background-size: cover;
               cover 值会根据当前屏幕的宽高比来按比例缩放，所以这样计算出来的高度会在不同宽度的屏幕上有所不同，
               也就是说高度是动态的。那此时我们取得 bgImage 的 clientHeight (客户取大小: 元素内容区高度加上上
               下内边距高度 ) 赋值给 list 就可以了。 */
            this.$refs.list.$el.style.top = `${this.$refs.bgImage.clientHeight}px`;

            // 6-10 add: (2) 接 watch{} 中的 (1)
            // 设置最小滚动量
            this.minTranslateY = -(this.$refs.bgImage.clientHeight) + RESERVED_HEIGHT;
            console.log("this.minTranslateY: ", this.minTranslateY);
        },

        // 6-10 add: 此处的讲解来自 listview.vue: [5-6 add: scroll 方法，接收子组件 scroll.vue 通过 $emit
        // [me.$emit("scroll", pos)] 向父组件发送的消息，里面包含一个 position 位置]
        methods: {
            scroll(pos) {
                // console.log("music-list -> methods -> scroll(pos) pos.y: ", pos.y);
                this.scrollY = pos.y;
            },

            // 6-14 add
            back() {
                this.$router.back();
            },

            // 7-3 add
            selectItem(item, index) {
                // console.log("item: ", item);
                // console.log("this.songs", this.songs);
                // 7-3 add : 上面通过 ...mapActions() 方法引入 selectPlay 后，在此处使用。
                // important notes: 参数 {list: xxx, index} 是共 vuex -> actions -> selectPlay() 内几个方法使用的
                this.selectPlay({
                    list: this.songs,
                    index,
                })
            },

            // 7-3 add: 为什么要在这里使用 ...mapActions() ? 答: 首先我们要设置 playlist (歌曲列表) 和
            // sequenceList (顺序播放列表)，即我们点击歌曲的时实际上是要播放整个歌曲列表，这就是我们设置 playlist
            // 和 sequenceList 的原因；其次我们根据点击的索引可以设置 currentIndex(SET_CURRENT_INDEX) 和
            // playing-state(即: SET_PLAYING_STATE); 最后我们默认展开打播放器要设置 SET_FULL_SCREEN.
            // 这样我们就在一个动作中多次改变 mutation ，所以封装一个 action 用来做统一调度。
            ...mapActions([
                // 调用 vuex 中定义的 selectPlay
                "selectPlay",
                // 7-18 add: 随机播放 actions 封装
                "randomPlay",
            ]),

            // 7-18 随机播放事件
            random() {
                this.randomPlay({
                    list: this.songs,
                })
            },

            // 7-25 add: 实现 mixin: playlist 为 mixin.js 内部通过 vuex 取得的
            handlePlaylist(playlist) {
                const bottom = playlist.length > 0 ? "60px" : "";
                this.$refs.list.$el.style.bottom = bottom;
                // 最后再调用 scroll.vue 组件中的 refresh() 方法，父组件可以直接通过这种方式调用子组件的方法。
                this.$refs.list.refresh();
            }
        },

        // 6-10
        data() {
            return {
                // scrollY 观测歌曲列表(tips: listview.vue 中观测歌手列表)实时滚动的位置, 如何得到 scrollY?
                // A: 通过 methods 中的 scroll 事件来赋值
                scrollY: 0,
            }
        },

        // 6-10 : 此处的注释和 (listview.vue 中的类似): 观察 data 方法下的 scrollY 属性，newY 是通过 methods
        // 下的 scroll 方法赋值的。我们滚动歌曲列表的时，会向子组件 (scroll.vue) 传递 listenScroll="true"，
        // 那么子组件就会 $emit("scroll", pos) 一个事件，并发送了一个 pos 的参数。
        watch: {
            scrollY(newY) {
                // 我们把 better-scroll 实时传回的 newY 赋值给 div.layer 的 transform 属性，这样 div.layer
                // 就会随着我们的滑动而滑动。

                // console.log("newY: ", newY);
                // console.log("this.minTranslateY: ", this.minTranslateY);
                // (3) 第三步: 实时取得当前歌曲滚动列表的的 newY 值, 和 div.bg-image 的 clientHeight 加负号
                // 后的值相比较，然后用取较大的一个 (tips: 详细看上面 2 行的 console 输出)
                let translateY = Math.max(this.minTranslateY, newY);

                // (1): 下面的赋值只是实现了 div.layer 背景跟着滑动，但是歌曲列表一般情况下都会很长，如果超过屏幕的
                // 高度后，layer 就会被滑走了，所以接下来的 (2) 步解决放在上面 mounted 模板编译之后 声明周期中解决。
                // (4): 接 (3)，把 ${newY} 替换为 translateY
                this.$refs.layer.style[transform] = `translate3d(0, ${translateY}px, 0)`;

                // 6-11 要解决的问题见视频讲解
                let zIndex = 0;

                // 6-12 实现下拉歌曲列表上面的歌手图片有一个放大的效果
                let scale = 1;
                let blur = 0;
                const percent = Math.abs(newY / this.minTranslateY);
                // console.log("percent: ", percent);
                if (newY > 0) {
                    scale = 1 + percent;
                    zIndex = 10;
                } else {
                    blur = Math.min(20 * percent, 20)
                }
                // 6-13 js 封装，修改写法
                this.$refs.filter.style[backdrop] = `blur(${blur}px)`;

                // 6-11 add:
                if (newY < this.minTranslateY) {
                    zIndex = 10;
                    this.$refs.bgImage.style.paddingTop = 0;
                    this.$refs.bgImage.style.height = `${RESERVED_HEIGHT}px`;

                    // 6-14 add:
                    this.$refs.play.style.display = "none";

                } else {
                    // zIndex = 0;
                    this.$refs.bgImage.style.paddingTop = "70%";
                    this.$refs.bgImage.style.height = 0;

                    // 6-14 add:
                    this.$refs.play.style.display = "block";
                }
                this.$refs.bgImage.style.zIndex = zIndex;

                // 6-12 add
                // 6-13 修改封装后的写法
                this.$refs.bgImage.style[transform] = `scale(${scale})`;
            },
        },


        // 6-9 add
        components: {
            Scroll,
            SongList,
            Loading,
        }

    }
</script>

<style lang="stylus" scoped>
    @import "~assets/stylus/variable";
    @import "~assets/stylus/mixin";

    .music-list {
        position: fixed;
        z-index: 100;
        top: 0; left: 0;
        bottom: 0; right: 0;
        background: $color-background;

        .back {
            position: absolute;
            top: 0; left: 6px;
            z-index: 50;

            /* 6-9 add: 我们在 main.js 中全局引入了 index.styl 样式文件， index 文件其内引入了
               同级目录的 reset、base、icon 样式文件。 在 icon.styl 中就有
               .icon-back:before {content: "\e911"} */
            .icon-back {
                display: block;
                padding: 10px;
                font-size: $font-size-large-x;
                color: $color-theme;
            }
        }

        .title {
            position: absolute;
            top: 0;
            left: 10%;
            z-index: 40;
            width: 80%;
            overflow: hidden;
            line-height: 40px;
            text-align: center;

            .no-wrap {
                text-align: center;
                line-height: 40px;
                font-size: $font-size-large;
                color: $color-text;
            }
        }

        .bg-image {
            position: relative;
            width: 100%;
            height: 0;
            padding-top: 70%;
            /*background: lightsalmon;*/
            transform-origin: top;
            background-size: cover;

            /* 6-14 add */
            .play-wrapper {
                position: absolute;
                bottom: 20px;
                z-index: 50;
                width: 100%;
                .play {
                    box-sizing: border-box;
                    width: 135px;
                    padding: 7px 0;
                    margin: 0 auto;
                    text-align: center;
                    border: 1px solid $color-theme;
                    color: $color-theme;
                    border-radius: 100px;
                    font-size: 0;
                    .icon-play {
                        display: inline-block;
                        vertical-align: middle;
                        margin-right: 6px;
                        font-size: $font-size-medium-x;
                    }
                    .text {
                        display: inline-block;
                        vertical-align: middle;
                        font-size: $font-size-small;
                    }
                }
            }

            .filter {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(7, 17, 27, .4);
            }
        }
        .bg-layer {
            position: relative;
            height: 100%;
           /* width:100%;*/
            background: $color-background;
        }
        .list {
            position: absolute;
            top: 0;
            bottom: 0;
            width: 100%;
            /*overflow: hidden;*/
            background: $color-background;
            .song-list-wrapper {
                padding: 20px 30px;
            }
            .loading-container {
                position: absolute;
                width: 100%;
                top: 50%;
                transform : translateY(-50%);
            }
        }
    }
</style>





