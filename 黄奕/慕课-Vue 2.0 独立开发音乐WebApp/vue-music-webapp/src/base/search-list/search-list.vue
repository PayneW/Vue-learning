<!-- 10-14 created: 搜索过的内容(搜索历史)列表 -->
<template>
    <div class="search-list" v-show="searches.length">
        <!-- 11-15 add: 把 ul 替换为 transition-group, 别忘记在 li 中添加 :key="" -->
        <transition-group name="list" tag="ul">
            <!-- 10-15 add: @click="selectItem" -->
            <li :key="item" class="search-item" v-for="(item, index) in searches" @click="selectItem(item)">
                <span class="text">{{item}}</span>
                <!-- 10-15 add: @click -->
                <span class="icon" @click.stop="deleteOne(item)">
                    <i class="icon-delete"></i>
                </span>
            </li>
        </transition-group>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        props: {
            searches: {
                type: Array,
                default: [],
            }
        },

        // 10-15 add
        methods: {
            // 在当前 li 上绑定 click 事件是做什么?  A: 因为当前 li 是可以再次写入到 input 中实现搜索的。
            // 所以需要绑定 click 事件
            selectItem(item){
                this.$emit("select", item);
            },

            deleteOne(item) {
                this.$emit("delete", item);
            },
        }
    }
</script>

<style lang="stylus" scoped>
    @import "~assets/stylus/variable";

    .search-list {

        .search-item {
            display: flex;
            align-items: center;
            font-size: $font-size-small;
            height: 40px;

            /* 给 li 添加动画 */
            &.list-enter-active, &.list-leave-active {
                transition: all .1s;
            }
            &.list-enter, &.list-leave-to {
                height: 0;
            }

            .text {
                flex: 1;
                color: $color-text-l;
            }
            .icon {
                extend-click();
                .icon-delete {
                    font-size: $font-size-small;
                    color: $color-text-d;
                }
            }
        }
    }
</style>
