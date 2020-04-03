<template>
    <div class="m-header">
        <p class="icon"></p>
        <h1 class="text">Chicken Music</h1>
        <router-link tag="p" class="mine" to="/user">
            <i class="icon-mine"></i>
        </router-link>
    </div>
</template>

<script>
    export default {  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
    @import "~assets/stylus/variable.styl"
    @import "~assets/stylus/mixin.styl"

    .m-header{
        position: relative;
        height: 44px;
        text-align: center;
        color: $color-them;
        background-color: rgba(255, 255, 255, .2);
        font-size: 0;

        .icon {
            display: inline-block;
            vertical-align: top;
            margin-top: 6px;
            width: 30px;
            height: 32px;
            margin-right: 9px;
            bg-image("logo");
            background-size: 30px 32px;
        }
        .text {
            display: inline-block;
            vertical-algin: top;
            line-height: 44px;
            font-size: $font-size-large;
        }
        .mine {
            position: absolute;
            top: 0;
            right: 0;

            .icon-min {
                display: block;
                background: #fff;
                padding: 12px;
                font-size: 20px;
                color: $color-theme;
            }
        }
    }


</style>
