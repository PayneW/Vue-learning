<!-- create 7-3  -->
<!-- 7-3: 此组件直接在 App.vue 中导入，因为不牵扯到路由 -->
<template>
    <div class="player" v-show="playlist.length > 0">
        <div class="normal-player" v-show="fullScreen">
            播放器
        </div>
        <div class="mini-player" v-show="!fullScreen"></div>
    </div>
</template>

<script type="text/javascript">
    // 7-3
    import {mapGetters} from "vuex";

    export default {
        computed: {
            ...mapGetters([
                "fullScreen",
                "playlist",

            ])
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
    @import "~assets/stylus/variable";
    @import "~assets/stylus/mixin";

    .player {
        .normal-player {
            position: fixed;
            left: 0;
            right: 0;
            top: 0;
            bottom: 0;
            z-index: 150;
            background: $color-background;
        }

        .mini-player {
            display: flex;
            align-items: center;
            position: fixed;
            left: 0;
            bottom: 0;
            z-index: 180;
            width: 100%;
            height: 60px;
            background: $color-highlight-background;


            &.mini-enter, &.mini-leave-to {
                opacity: 0;
            }
            &.mini-enter-active, &.mini-leave-active {
                transition: all .4s;
            }
        }
    }

</style>
