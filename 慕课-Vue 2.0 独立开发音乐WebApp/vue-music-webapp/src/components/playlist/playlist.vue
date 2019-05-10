<!-- 11-1 当前播放的歌曲列表: 被 player.vue 引入 -->
<template>
    <transition name="list-fade">
        <!-- 11-2 add: (1.)v-show (2.)点击事件 hide 把当前 playlist 组件隐藏 -->
        <div class="playlist" v-show="showFlag" @click="hide">

            <!-- 11-2 add: 为什么要在 div.list-wrapper 上添加 @click.stop? A: 我们在外围的 div.playlist
                上添加了 @click="hide" 事件，根据 "DOM2 级事件"规定事件流包含的三个阶段: "事件捕获阶段、
                处于目标阶段 和 事件冒泡阶段" (tips: 也可以想想事件委托) 所有的子元素都可以监听到事件，此时
                就会出现我们在 div.playlist 内部任何一个地方点击一下都会触发 @click="hide" 事件, 因为子元素可以
                冒泡到最外层的祖先级元素，然后 hide 事件会执行。那么怎么解决这个为题呢？ 答案便是在 div.list-wrapper
                上添加 stopPropagation 取消事件的进一步捕获或冒泡。(tips: 因为 div.list-wrapper 是 div.playlist
                内部的第一个子元素) -->
            <div class="list-wrapper" @click.stop>

                <div class="list-header">
                    <h1 class="title">
                        <!-- 11-8 add: 播放模式和 player.vue 中的是功能是类似的，所以把代码提取出来分装为一个
                             playerMixin  -->
                        <i class="icon" :class="iconMode" @click="changeMode"></i>

                        <!-- 11-9 add: -->
                        <span class="text">{{modeText}}</span>

                        <!-- 11-7 add: @click="showConfirm" 点击垃圾桶图标，弹出 confirm 组件 -->
                        <span class="clear" @click="showConfirm"><i class="icon-clear"></i></span>
                    </h1>
                </div>

                <Scroll class="list-content" :data="sequenceList" ref="listContent">
                    <!-- 11-7 把 ul 改为 transition-group -->
                    <transition-group name="list" tag="ul">
                        <!-- transition-group 需要子元素有一个 :key  -->
                        <li class="item"
                            :key="item.id"
                            v-for="(item, index) in sequenceList"
                            @click="selectItem(item, index)"
                            ref="listItem"
                        >
                            <i class="current" :class="getCurrentIcon(item)"></i>
                            <span class="text">{{item.name}}</span>
                            <span class="like">
                                <i class="icon-not-favorite"></i>
                            </span>
                            <!-- 11-5 add: @click="deleteOne(item)" -->
                            <!-- 11-6 add: @click.stop -->
                            <span class="delete" @click.stop="deleteOne(item)">
                                <i class="icon-delete"></i>
                            </span>
                        </li>
                    </transition-group>
                </Scroll>

                <div class="list-operate">
                    <!-- 11-10 add: @click="addSong" -->
                    <div class="add" @click="addSong">
                        <i class="icon-add"></i>
                        <span class="text">添加歌曲到队列</span>
                    </div>
                </div>

                <!-- 11-2 add: 点击事件 hide 把当前 playlist 组件隐藏 -->
                <div class="list-close" @click="hide">
                    <span>关闭</span>
                </div>

                <!-- 11-7 add: 添加 confirm 组件 -->
                <!-- @confirm 为接收子组件发射的 confirm 事件 -->
                <confirm
                    ref="confirm"
                    text="是否清空播放列表"
                    confirmBtnText="清空"
                    @confirm="confirmClear"></confirm>

                <!-- 11-10 add: 导入添加歌曲组件 -->
                <add-song ref="addSong"></add-song>
            </div>
        </div>
    </transition>
</template>

<script type="text/ecmascript-6">
    // 11-3 add: 通过 vuex 取得数据
    import {mapActions} from "vuex";
    import Scroll from "base/scroll/scroll";

    import {playMode} from "assets/js/config";

    // 11-7 add: 给播放列表的删除按钮添加 confirm 组件
    import Confirm from "base/confirm/confirm";

    // 11-8 add: 引入 playerMixin
    import {playerMixin} from "assets/js/mixin";

    // 11-10 add: 添加歌曲组件
    import AddSong from "components/add-song/add-song";

    export default {

        mixins: [playerMixin],

        data() {
            return {
                showFlag: false,
                i: 0,
            }
        },

        // 11-3
        computed: {
            // 11-9
            modeText() {
              return this.mode === playMode.sequence ? "顺序播放"
                  : this.mode === playMode.random ? "随机播放" : "单曲循环"
            },
        },

        methods: {
            // 11-2 add:
            show() {
                this.showFlag = true;

                // 11-3 add: 重新计算高度
                setTimeout(() => {
                    this.$refs.listContent.refresh();

                    // 11-4 调用下面的 scrollToCurrent()
                    this.scrollToCurrent(this.currentSong);
                }, 20)
            },
            hide() {
                // console.log("i++: ", this.i++);
                this.showFlag = false;
            },

            // 11-3
            getCurrentIcon(item) {
                if (this.currentSong.id === item.id) {
                    return "icon-play"
                }
                return "";
            },

            // 11-3
            selectItem(item, index) {
                // this.mode 在 mapGetters 中获取
                if (this.mode === playMode.random) {
                    index = this.playlist.findIndex((song) => {
                        return song.id === item.id;
                    })
                }
                this.setCurrentIndex(index);
                // 11-4
                this.setPlayingState(true);
            },

            // 11-4 add: 展开播放列表，把当前播放的歌曲显示在可视窗口的第一个
            // 那这个事件什么时候执行呢？ A: currentSong 发生变化就执行，不过如何知道 currentSong
            // 发生变化了？直接在 watch 里观察 currentSong 就可以了
            scrollToCurrent(current) {
                const index = this.sequenceList.findIndex((song) => {
                    return current.id === song.id;
                });
                this.$refs.listContent.scrollToElement(this.$refs.listItem[index], 300);
            },

            // 11-5 add + 11-6 edit
            deleteOne(item) {
                this.deleteSong(item);

                //
                if (!this.playlist.length) {
                    this.hide();
                }
            },

            // 11-7 弹出 confirm
            showConfirm() {
                this.$refs.confirm.show();
            },
            // 清空列表， 在 store 中添加 deleteSongList 的 action
            confirmClear() {
                this.deleteSongList();
                // 删除之后把自身隐藏
                this.hide();
            },

            // 11-10 添加歌曲事件
            addSong() {
                this.$refs.addSong.show();
            },


            // 11-3
            // ...mapMutations({
            //     "setCurrentIndex": "SET_CURRENT_INDEX",
            //     "setPlayingState": "SET_PLAYING_STATE",
            // }),

            // 11-6 add
            ...mapActions([
                "deleteSong",

                // 11-7 add
                "deleteSongList",
            ])
        },

        watch: {
            currentSong(newSong, oldSong) {
                if (!this.showFlag || newSong.id === oldSong.id) {
                    return;
                }
                this.scrollToCurrent(newSong);
            },
        },

        // 11-3
        components: {
            Scroll,
            Confirm,

            // 11-10
            AddSong,
        }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
    @import "~assets/stylus/variable"

    .list-fade-enter-active, .list-fade-leave-active {
        transition: opacity .3s;
        .list-wrapper {
            transition: all .3s;
        }
    }
    .list-fade-enter, .list-fade-leave-to {
        opacity: 0;
        .list-wrapper {
            transform: translate3d(0, 100%, 0);
        }
    }
    .playlist {
        position: fixed;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        z-index: 200;
        background-color: $color-background-d;

        .list-wrapper {
            position: absolute;
            left: 0;
            bottom: 0;
            width: 100%;
            background-color: $color-highlight-background;

            .list-header {
                position: relative;
                padding: 20px 30px 10px 20px;
                .title {
                    display: flex;
                    align-items: center;
                    .icon {
                        margin-right: 10px;
                        font-size: 30px;
                        color: $color-theme-d;
                    }
                    .text {
                        flex: 1;
                        font-size: $font-size-medium;
                        color: $color-text-l;
                    }
                    .clear {
                        extend-click();
                        .icon-clear {
                            font-size: $font-size-medium;
                            color: $color-text-d;
                        }
                    }
                }
            }

            .list-content {
                max-height: 240px;
                overflow: hidden;
                .item {
                    display: flex;
                    align-items: center;
                    height: 40px;
                    padding: 0 30px 0 20px;
                    overflow: hidden;

                    &.list-enter-active, &.list-leave-active {
                        transition: all .1s;
                    }
                    &.list-enter, &.list-leave-to {
                        height: 0;
                    }
                    .current {
                        flex: 0 0 20px;
                        width: 20px;
                        font-size: $font-size-small;
                        color: $color-theme-d;
                    }
                    .text {
                        flex: 1;
                        no-wrap();
                        font-size: $font-size-medium;
                        color: $color-text-d;
                    }
                    .like {
                        extend-click();
                        margin-right: 15px;
                        font-size: $font-size-small;
                        color: $color-theme;
                        .icon-favorite {
                            color: $color-sub-theme;
                        }
                    }
                    .delete {
                        extend-click();
                        font-size: $font-size-small;
                        color: $color-theme;
                    }
                }
            }


            .list-operate {
                width: 140px;
                margin: 20px auto 30px auto;
                .add {
                    display: flex;
                    align-items: center;
                    padding: 8px 16px;
                    border: 1px solid $color-text-l;
                    border-radius: 100px;
                    color: $color-text-l;
                    .icon-add {
                        margin-right: 5px;
                        font-size: $font-size-small-s;
                    }
                    .text {
                        font-size: $font-size-small;
                    }
                }
            }


            .list-close {
                text-align: center;
                line-height: 50px;
                background: $color-background;
                font-size: $font-size-medium-x;
                color: $color-text-l;
            }
        }

    }
</style>
