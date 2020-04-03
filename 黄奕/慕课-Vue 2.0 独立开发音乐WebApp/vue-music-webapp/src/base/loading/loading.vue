<template>
    <!-- 4-13 loading 基础组件的开发和应用 -->
    <div class="loading">
        <img src="loading.gif" width="24" height="24">
        <!-- desc = description -->
        <p class="desc">{{ title }}</p>
    </div>
</template>

<script>
    export default {
        // 可以从外部传入一个 props, 类型为字符串(String), 不传的话默为 default 的值
        props: {
            title: {
                type: String,
                default: "正在载入..."
            }
        }
    }
</script>

<style lang="stylus" scoped>
    @import "~assets/stylus/variable";

    .loading {
        width: 100%;
        text-align: center;

        .desc {
            line-height: 20px;
            font-size: $font-size-small;
            color: $color-text-l;
        }
    }
</style>
