<!-- 6-9: song-list 封装 "歌曲列表" 基础组件  -->
<template>
    <div class="song-list">
        <ul>
            <li v-for="song in songs" class="item">
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
