<!-- 6-9: song-list 封装 "歌曲列表" 基础组件  -->
<template>
    <div class="song-list">
        <ul>
            <!-- 7-2 add: @click="selectItem(song, index)", 在 components 目录下创建 player/player.vue
                组件后，接着在 App.vue 中引入 player.vue; 然后回到当前歌曲组件，给每个歌曲添加点击跳转播放的事件 -->
            <li @click="selectItem(song, index)" v-for="(song, index) in songs" class="item">
                <div class="content">
                    <!-- 歌曲标题 -->
                    <h2 class="name">{{song.name}}</h2>
                    <!-- 歌曲描述: 即演唱作词作曲 -->
                    <p class="desc">{{getDesc(song)}}</p>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        props: {
            // 首先肯定要接收一个 songs 即传入歌曲
            songs: {
                type: Array,
                default: []
            }
        },
        methods: {
            // 7-2 add:
            selectItem(item, index) {
                // 当前 song-list.vue 是个基础组件，不写业务逻辑，只派发事件，告诉父级元素当前元素被点击了，
                // 以及点击的元素，索引是什么
                this.$emit("select", item, index)
            },

            getDesc(song) {
                 return `${song.singer}。${song.album}`
            }
        }
    }
</script>

<style lang="stylus" scoped>
    @import "~assets/stylus/variable";
    @import "~assets/stylus/mixin";

    .song-list {
        /* 6-9: 实话说在这里面写 stylus/scss/less 真的好吗？ .item 前面忘记点点，找了半天为什么没有样式。 */
        .item {
            display: flex;
            align-items: center;
            box-sizing: border-box;
            height: 64px;
            font-size: $font-size-medium;

            .rank {
                flex: 0 0 25px;
                width: 25px;
                margin-right: 30px;
                text-align: center;

                .icon {
                    display: inline-block;
                    width: 25px;
                    height: 24px;
                    background-size: 25px 24px;

                    &.icon0 {
                        bg-image("first")
                    }
                    &.icon1 {
                        bg-image("second")
                    }
                    &.icon2 {
                        bg-image("third")
                    }
                }

                .text {
                    color: $color-theme;
                    font-size: $font-size-large;
                }
            }


            .content {
                flex: 1;
                line-height: 20px;
                overflow: hidden;

                .name {
                    no-wrap();
                    color: $color-text;
                }
                .desc {
                    no-wrap();
                    margin-top: 4px;
                    color: $color-text-d;
                }
            }
        }
    }
</style>
