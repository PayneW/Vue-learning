<!-- 11-10 created -->
<template>
    <transition name="slide">
        <div class="add-song" v-show="showFlag" @click.stop>
            <!-- header 头部: 文字 + close 按钮 -->
            <div class="header">
                <h1 class="title">添加歌曲到列表</h1>
                <div class="close">
                    <i class="icon-close" @click="hide"></i>
                </div>
            </div>

            <!-- 搜索框 -->
            <div class="search-box-wrapper">
                <!-- 11-11 add: 复用之前的搜索框组件. 当前父组件接受一个 search-box 发射($emit) 的
                一个名为 query 的事件(在 search-box 中的 this.$watch() 发送的)，这个事件把 input 中
                的值当作参数传出。 当前组件通过 @query="" 接收子组件 search-box 发送的事件-->
                <!-- 11-15 add: ref="searchBox" -->
                <search-box ref="searchBox"  placeholder="搜索歌曲"  @query="onQueryChange"></search-box>
            </div>

            <!-- 快捷健 最近播放/搜索历史 -->
            <div class="shortcut" v-show="!query">
                <!-- 11-12 add: 导入封装的快捷键组件。 @switch 为 switches.vue 组件 $emit 的事件 -->
                <switches :switches="switches" :currentIndex="currentIndex" @switch="switchItem"></switches>

                <!-- 11-13 add: 由于"最近播放/搜索历史" 都可以滚动，所以引入 scroll 组件 -->
                <div class="list-wrapper">
                    <!-- playHistory 通过 vuex -> mapGetters 拿到 -->
                    <!-- 11-14 add: class="list-scroll" -->
                    <!-- 11-15 add: ref="songList" 我们当前使用了 scroll 组件，"最近播放/搜索历史" 只要
                         数据发生改变，我们都会从新渲染高度，添加 ref 再当前组件内调用 refresh() 时使用 -->
                    <!---->
                    <scroll ref="songList"
                            class="list-scroll"
                            v-if="currentIndex === 0"
                            :data="playHistory"
                            :refreshDelay="refreshDelay">
                        <div class="list-inner">
                            <!-- 搜索历史 -->
                            <!-- 11-14 add: 点击当前搜索历史中的歌曲把其添加到播放列表, 就是监听 song-list
                                 组件 $emit 的 select 事件 -->
                            <song-list :songs="playHistory" @select="selectSong"></song-list>
                        </div>
                    </scroll>

                    <!-- 11-15 add: 搜索历史. searchHistory 搜索历史使用 mixin.js 下 searchMixin 对象内的
                         mapActions 内的引用 -->
                    <!-- 11-15 add: ref="searchList" 解释同上 -->
                    <!-- 11-17 add: :refreshDelay -->
                    <scroll ref="searchList"
                            class="list-scroll"
                            v-if="currentIndex === 1"
                            :data="searchHistory"
                            :refreshDelay="refreshDelay">
                        <div class="list-inner">
                            <!-- 引入搜索历史组件 -->
                            <search-list @delete="deleteSearchHistory" @select="addQuery" :searches="searchHistory"></search-list>
                        </div>
                    </scroll>
                </div>
            </div>

            <!-- 搜索结果列表 -->
            <div class="search-result" v-show="query">
                <!-- 导入展示搜索结果列表的组件: @select 为接收 suggest.vue 中 selectItem() 方法中
                     $emit 发送的事件。
                     ▲ tips: 当我们添加 selectSuggest() 方法时发现，接下来要做的判断和 search.vue 中的
                     很多代码是一样的，所以这里在 assets/js/mixin.js 中定义一个和搜索相关的 searchMixin  -->
                <suggest :query="query"
                         :showSinger="showSinger"
                         @select="selectSuggest"
                         @listScroll="blurInput">
                </suggest>
            </div>

            <!-- 11-16 add: 顶部提示添加歌曲到播放队列 -->
            <top-tip ref="topTip">
                <div class="tip-title">
                    <i class="icon-ok"></i>
                    <span class="text">1 首歌曲已经添加到播放队列</span>
                </div>
            </top-tip>
        </div>
    </transition>
</template>

<script>
    // 11-11 导入搜索框组件
    import SearchBox from "base/search-box/search-box";
    // 11-11 导入搜索检索的列表
    import Suggest from "components/suggest/suggest";
    // 11-11 add: 导入 searchMixin
    import {searchMixin} from "assets/js/mixin";
    // 11-12 add: 导入封装的快捷键组件
    import Switches from "base/switches/switches.vue";
    // 11-13 add: Scroll 组件
    import Scroll from "base/scroll/scroll";
    // 11-13 add:
    import {mapGetters, mapActions} from "vuex";
    // 11-13 add: 创建于 6-9 生成"歌曲列表"的基础组件
    import SongList from "base/song-list/song-list";
    // 11-14 add: 引入构造函数 Song (tips: Song 使用了默认导出 export default Song)
    import Song from "assets/js/song";
    // 11-15 add: 引入搜索历史组件
    import SearchList from "base/search-list/search-list";
    // 11-16 add: 导入 top-tip.vue
    import TopTip from "base/top-tip/top-tip";

    export default {
        name: "add-song",
        mixins: [searchMixin],
        data() {
            return {
                showFlag: false,
                // query: "",
                showSinger: false,

                // 11-12 add: switches.vue 组件需要的 props 值
                currentIndex: 0,
                switches: [
                    {name: "最近播放"},
                    {name: "搜索历史"},
                ]
            }
        },

        // 11-13
        computed: {
            ...mapGetters([
                "playHistory"
            ])
        },


        // 11-11
        methods: {
            show() {
                this.showFlag = true;
                // 延时 20ms 刷新 scroll 组件的高度
                setTimeout(()=> {
                    // currentIndex 等于 0 是 "最近播放" 组件
                    if (this.currentIndex === 0) {
                        this.$refs.songList.refresh();
                    } else {
                        this.$refs.searchList.refresh();
                    }
                }, 20)
            },
            hide() {
                this.showFlag = false;
            },

            // 挪入到 assets/js/mixin.js 中
            // onQueryChange(query) {
            //     this.query = query;
            // },

            selectSuggest() {
                // 调用 assets/js/mixin.js 中 searchMixin 中的 saveSearch() 方法
                this.saveSearch();

                // 11-16 add
                this.showTip();
            },

            // 11-12 add: switches.vue 中 tab 切换事件
            switchItem(index) {
                this.currentIndex = index;
            },

            // 11-14 add: 点击当前搜索历史中的歌曲把其添加到播放列表, 就是监听 song-list 组件 $emit 的
            // select 事件, 接收 2 个参数，当前歌曲和 index
            selectSong(song, index) {
                if (index !== 0) {
                    // 插入当前歌曲到列表中，这里要用到 vuex 中的 insertSong.
                    // 这里需要注意的是 mapActions 中的 insertSong() 插入的歌曲仅和本地存储 cache.js相连，
                    // 并不是 assets/js/song.js 中构造函数 Song 的实例，那么我们把当前点击的歌曲添加到默认
                    // 播放列表就出有问题了，因为播放列表中的歌曲都是 Song 的实例;
                    // 解决办法就是把当前歌曲变成 Song 构造函数的实例后再传给 insertSong()
                    this.insertSong(new Song(song));
                }

                // 11-16 add
                this.showTip();
            },

            // 11-16 add: 当点击歌曲时，给出 "歌曲添加到播放队列" 的下拉提示
            showTip() {
                this.$refs.topTip.show();
            },

            // 11-14
            ...mapActions([
                "insertSong"
            ]),

        },

        components: {
            SearchBox,
            Suggest,
            Switches,
            Scroll,
            SongList,
            SearchList,
            TopTip,
        }
    }
</script>

<style scoped lang="stylus">
    @import "~assets/stylus/variable";
    @import "~assets/stylus/mixin";

    .slide-enter-active, .slide-leave-active {
        transition: all .3s;
    }
    .slide-enter, .slide-leave-to {
        transfrom: translate3d(100%, 0, 0);
    }

    .add-song {
        position: fixed;
        top: 0;
        bottom: 0;
        width: 100%;
        z-index: 200;
        background: $color-background;

        .header {
            position: relative;
            height: 44px;
            text-align: center;
            .title {
                line-height: 44px;
                font-size: $font-size-large;
                color: $color-text;
            }
            .close {
                position: absolute;
                top: 0;
                right: 8px;
                .icon-close {
                    display: block;
                    padding: 12px;
                    font-size: 20px;
                    color: $color-theme;
                }
            }
        }

        .search-box-wrapper {
            margin: 20px;
        }

        .shortcut {
            .list-wrapper {
                position: absolute;
                top: 165px;
                bottom: 0;
                width: 100%;
                .list-scroll {
                    height: 100%;
                    overflow: hidden;
                    .list-inner {
                        padding: 20px 30px;
                    }
                }
            }
        }

        .search-result {
            position: fixed;
            top: 124px;
            bottom: 0;
            width: 100%;
        }

        /* 顶部提示 歌曲添加到队列下拉框 */
        .tip-title {
            text-align: center;
            padding: 18px 0;
            font-size: 0;
            .icon-ok {
                font-size: $font-size-medium;
                color: $color-theme;
                margin-right: 4px;
            }
            .text {
                font-size: $font-size-medium;
                color: $color-text;
            }
        }

    }

</style>
