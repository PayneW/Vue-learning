<!-- 10-2 update:  -->

<template>
    <div class="search">
        <div class="search-box-wrapper">
            <!-- 10-2 引入封装的基础组件 search-box, 当前父组件接受一个 search-box 发射($emit) 的
                一个名为 query 的事件，这个事件把 input 中的值当作参数传出。 当前组件通过 @query=""
                接收子组件 search-box 发送的事件 -->
            <SearchBox ref="searchBox" @query="onQueryChange"></SearchBox>
        </div>

        <!-- 10-3 热门搜索板块 -->
        <!-- 10-4 add: v-show="!query" 如果搜索框内没有 query 值时才展示当前板块 -->
        <div class="shortcut-wrapper" ref="shortcutWrapper" v-show="!query">
            <div class="shortcut">
                <div class="hot-key">
                    <h1 class="title">热门搜索</h1>
                    <ul>
                        <li class="item"
                            v-for="(item, index) in hotKey"
                            :key="index"
                            @click="addQuery(item.k)"
                        >
                            <span>{{item.k}}</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>

        <!-- 搜索展示列表 -->
        <div class="search-result" v-show="query">
            <!-- 10-4 引入 suggest 搜索列表组件， query 为当前父组件传入到子组件的属性，子组件在 props
                 中接收 -->
            <suggest :query="query"></suggest>
        </div>
    </div>
</template>


<script>
    import SearchBox from "base/search-box/search-box";

    // 10-3 add:   10-4 add: search
    import {getHotKey, search} from "src/api/search";
    import {ERR_OK} from "src/api/config";


    // 10-4
    import Suggest from "components/suggest/suggest";

    export default {

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
                query: ""
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
            addQuery(query) {
                this.$refs.searchBox.setQuery(query);
            },

            // 10-4
            onQueryChange(query) {
                this.query = query;
            },
        },


        components: {
            SearchBox,
            Suggest,
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
