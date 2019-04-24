<!-- 10-2 created 搜索页面基础组件 search-box, 在 components/search/search.vue 中被引入 -->
<template>
    <div class="search-box">
        <i class="icon-search"></i>
        <input class="box" :placeholder="placeholder" v-model="query" >
        <i class="icon-dismiss" v-show="query" @click="clear"></i>
    </div>
</template>

<script>
    export default {
        // 10-2
        props: {
            placeholder: {
                type: String,
                default: "搜索歌曲、歌手",
            }
        },

        // 10-2
        data() {
            return {
                query: ""
            }
        },

        // 10-2
        methods: {
            clear() {
                this.query = "";
            },

            // 10-3 : 子组件的方法，父组件通过 this.$refs.searchBox.setQuery() 就可以调用了
            setQuery(query) {
                this.query = query;
            }
        },

        // 10-2: 当前组件对外提供的就是一个 query (查询结果)，但是怎么把查询的结果暴露给外面呢？
        // A: 答案是我们 $watch("query") 观察这个 query, 然后把 query 当作一个事件派发出去
        // 把值当作参数传出。
        created() {
            // 只要搜索框内容有改变，$watch 函数就会执行，接着派发一个 query 事件给外围
            this.$watch("query", (newQuery) => {
                this.$emit("query", newQuery)
            });
        }
    }
</script>

<style lang="stylus" scoped  rel="stylesheet/stylus">
    @import "~assets/stylus/variable";

    .search-box {
        display: flex;
        align-items: center;
        box-sizing: border-box;
        width: 100%;
        padding: 0 6px;
        height: 40px;
        background: $color-highlight-background;
        border-radius: 6px;
        .icon-search {
            font-size: 24px;
            color: $color-background;
        }
        .box {
            flex: 1;
            margin: 0 5px;
            line-height: 18px;
            background: $color-highlight-background;
            color: $color-text;
            font-size: $font-size-medium;
            &::placeholder {
                color: $color-text-d;
            }
        }
        .icon-dismiss {
            font-size: 16px;
            color: $color-background;
        }
    }
</style>
