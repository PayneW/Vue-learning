<!-- 10-2 update:  -->

<template>
    <div class="search">
        <div class="search-box-wrapper">
            <!-- 10-2 引入封装的基础组件 search-box, 当前父组件接受一个 search-box 发射($emit) 的
                一个名为 query 的事件(在 search-box 中的 this.$watch() 发送的)，这个事件把 input 中
                的值当作参数传出。 当前组件通过 @query="" 接收子组件 search-box 发送的事件 -->
            <SearchBox ref="searchBox" @query="onQueryChange"></SearchBox>
        </div>

        <!-- 10-3 热门搜索板块 -->
        <!-- 10-4 add: v-show="!query" 如果搜索框内没有 query 值时才展示当前板块 -->
        <div class="shortcut-wrapper" ref="shortcutWrapper" v-show="!query">
            <!-- 10-17 add: 我们要把 div.shortcut 改成可以滑动的组件，所以引入 Scroll,
                 shortcut 见下面 js 内的注释 -->
            <!-- 11-17 add: 添加 :refreshDealy="refreshDelay", 具体解释见: scroll.vue 中 -->
            <Scroll class="shortcut" :data="shortcut" ref="shortcut" :refreshDealy="refreshDelay">
                <div>
                    <div class="hot-key">
                        <h1 class="title">热门搜索</h1>
                        <ul>
                            <li class="item" v-for="(item, index) in hotKey" :key="index" @click="addQuery(item.k)">
                                <span>{{item.k}}</span>
                            </li>
                        </ul>
                    </div>

                    <!-- 10-14 add: 搜索历史 -->
                    <div class="search-history" v-show="searchHistory.length">
                        <h1 class="title">
                            <span class="text">搜索历史</span>
                            <!-- 10-15 add: 添加清楚搜索历史事件 -->
                            <!-- 10-16 add: 添加确认删除的弹框，所以 @click 的回调也要变更 -->
                            <span class="clear" @click="showConfirm">
                            <i class="icon-clear"></i>
                        </span>
                        </h1>

                        <!-- 加载 search-list 组件 -->
                        <!-- 10-15 add: 接收当前 search-list 组件 $emit 发射的 2个事件 select + delete
                             @select 是点击把当前 li 的内容写入到 input 中，所以复用上面的 addQuery 方法.
                             @delete 是删除搜索列表  -->
                        <search-list :searches="searchHistory" @select="addQuery" @delete="deleteOne"></search-list>
                    </div>
                </div>
            </Scroll>
        </div>

        <!-- 搜索展示列表 -->
        <div class="search-result" ref="searchResult" v-show="query">
            <!-- 10-4 引入 suggest 搜索列表组件， query 为当前父组件传入到子组件的属性，子组件在 props 中接收 -->
            <!-- 10-10 add: @listenScroll -->
            <!-- 10-11 add: @select="saveSearch" 保存搜索历史 -->
            <!-- 10-18 add: ref="suggest" -->
            <suggest ref="suggest" :query="query" @listenScroll="blurInput" @select="saveSearch" ></suggest>
        </div>

        <!-- 10-16 add: 加载确认弹框 -->
        <confirm ref="confirm" text="是否清空所有搜索历史" confirmBtnText="清空" @confirm="deleteAll"></confirm>

        <!-- 10-6 add: 点击搜索列表可以播放歌曲或者跳转到相应的歌手，这里就需要扩展路由了, 在 router.js 中配置
             search 的二级路由。路由跳转的配置代码，在上面 suggest.vue 内的 selectItem() 方法内 -->
        <router-view></router-view>
    </div>
</template>


<script>
    import SearchBox from "base/search-box/search-box";

    // 10-3 add:
    import {getHotKey} from "Vue-learning/黄奕/慕课-Vue 2.0 独立开发音乐WebApp/vue-music-webapp/src/api/search";
    import {ERR_OK} from "Vue-learning/黄奕/慕课-Vue 2.0 独立开发音乐WebApp/vue-music-webapp/src/api/config";


    // 10-4
    import Suggest from "components/suggest/suggest";

    // 10-12
    // 10-14 add: mapGetters 因为我们要使用 state.searchHistory;
    // 11-11 add: 在 assets/js/mixin.js 中创建 searchMixin 对象 所以此处就不要再需要 mapGetters
    import {mapActions,} from 'vuex';

    // 10-14
    import SearchList from "base/search-list/search-list";

    // 10-16
    import Confirm from "base/confirm/confirm";

    // 10-17
    import Scroll from "base/scroll/scroll";

    // 10-18 add: 导入 playlistMixin
    // 11-11 add: 导入 searchMixin
    import {playlistMixin, searchMixin} from "assets/js/mixin";

    export default {

        // 10-18 add: 插入 mixin
        // 11-11 add: 添加 searchMixin
        mixins: [playlistMixin, searchMixin],

        created() {
            this._getHotKey();
        },

        data() {
            return {
                hotKey: [],

                // 10-4 add:  当前的 query 值是怎么改变的？ A: 通过上面 search-box 上的
                // @query="onQueryChange" 来改变的。 2.通过 onQueryChange(query)
                // {this.query = query;}, 事件是可以实时改变当前的 query 了，但是我们怎么根据
                // 当前搜索框的内容(query) 改变来调用查询呢？ A: 在上面 <suggest :query="query"></suggest>
                // 中我们把改变后的 query 查询值传给 suggest 组件， suggest 组件在 watch 观察者属性内实时
                // 观察 query 的变化，来调用搜索内容的结果，并展示。
                /* 11-11 edit: query 挪入到 assets/js/mixin.js 中的 searchMixin 对象中 */
                // query: "",

            }
        },

        // 10-14
        computed: {
            // 11-11 edit: 在 assets/js/mixin.js 中创建 searchMixin 对象,这里的代码挪到那里,
            // ...mapGetters([
            //     "searchHistory",
            // ]),

            // 10-17 add: 为什么我们专门定义了一个 shortcut 计算属性传给 Scroll 组件？ A: 因为 scroll 组件
            // 要根据当前父组件传递的 data 值来实时 refresh 以获取 scroll 组件的正确高度，但是此时我们可以看到，
            // 上面的 "热门搜索" 和 "搜索历史" 都是异步的，尤其是搜索历史里的条数是可以实时增加的，那么怎么解决
            // 这个问题呢? 答案就是我们把它们两个的数据拼接起来就可以了嘛，一旦数据发生改变，当前计算属性就会重新计算
            // 然后再传给 Scroll
            shortcut() {
                return this.hotKey.concat(this.searchHistory);
            }
        },

        methods: {
            _getHotKey() {
                getHotKey().then((res) => {
                    if (res.code === ERR_OK) {
                        // 只需要前十个数据
                        // console.log(res.data);
                        this.hotKey = res.data.hotkey.slice(0, 10);
                    }
                })
            },

            // 把点击的热门搜索的值添加点到 搜索框中 (即传入到: search-box.vue 中的 input 内)
            // 此处定义了 addQuery， 在 search-box.vue 中添加一个接受的 setQuery, 接着就在
            // 当前组建内调用子组件的方法
            // 11-11 edit: 放入到 assets/js/mixin.js 中的 searchMixin 对象中
            // addQuery(query) {
            //     this.$refs.searchBox.setQuery(query);
            // },

            /* 统一放入到 assets/js/mixin.js 中的 searchMixin 对象中
                // 10-4
                onQueryChange(query) {
                    this.query = query;
                },

                // 10-10: 这个回调函数经过了 2 层传递。(1)首先 scroll.vue 中 this.$emit("beforeScroll")
                // (2) 接着 suggest.vue 中在 listenScroll 回调中又 this.$emit("listenScroll");
                // (3) 当前 blurInput 要做的就调用 search-box.vue 中的 input 失去焦点事件
                blurInput() {
                    this.$refs.searchBox.blur();
                },

                // 10-11 add: 保存搜索结果. 因为我们的搜索结果是可以保存到本地缓存，而且在组件其他部分也是可以共用的
                // 所以我们首先在 vuex 中封装一个 action
                saveSearch() {
                    this.saveSearchHistory(this.query);
                },
            */

            // 10-15 add
            deleteOne(item) {
                this.deleteSearchHistory(item);
            },

            // 10-15 add. 10-16 edit
            deleteAll() {
                this.clearSearchHistory();
            },

            // 10-12
            // 10-15 add: deleteSearchHistory
            ...mapActions([
                //  11-11 edit: 放入到 assets/js/mixin.js 中的 searchMixin 对象中
                // "saveSearchHistory",
                // "deleteSearchHistory",

                "clearSearchHistory"
            ]),

            // 10-16
            showConfirm() {
                this.$refs.confirm.show();
            },

            // 10-18
            handlePlaylist(playlist) {
                const bottom = playlist.length > 0 ? "60px" : "";
                this.$refs.shortcutWrapper.style.bottom = bottom;
                this.$refs.shortcut.refresh();

                this.$refs.searchResult.style.bottom = bottom;
                this.$refs.suggest.refresh();
            },

        },

        // 10-17
        watch: {
            query(newQuery) {
                if (!newQuery) {
                    setTimeout(() => {
                        this.$refs.shortcut.refresh();
                    }, 20)
                }
            }
        },

        components: {
            SearchBox,
            Suggest,
            SearchList,
            Confirm,
            Scroll,
        }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
    @import "~assets/stylus/variable";
    @import "~assets/stylus/mixin";

    .search {
        .search-box-wrapper {
            margin: 20px;
        }
        .shortcut-wrapper {
            position: fixed;
            top: 178px;
            bottom: 0;
            width: 100%;
            .shortcut {
                height: 100%;
                overflow: hidden;
                .hot-key {
                    margin: 0 20px 20px 20px;
                    .title {
                        margin-bottom: 20px;
                        font-size: $font-size-medium;
                        color: $color-text-l;
                    }
                    .item {
                        display: inline-block;
                        padding: 5px 10px;
                        margin: 0 20px 10px 0;
                        border-radius: 6px;
                        background: $color-highlight-background;
                        font-size: $font-size-medium;
                        color: $color-text-d;
                    }
                }
                .search-history {
                    position: relative;
                    margin: 0 20px;
                    .title {
                        display: flex;
                        align-items: center;
                        height: 40px;
                        font-size: $font-size-medium;
                        color: $color-text-l;
                        .text {
                            flex: 1;
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
            }
        }
        .search-result {
            position: fixed;
            width: 100%;
            top: 178px;
            bottom: 0;
        }
    }
</style>
