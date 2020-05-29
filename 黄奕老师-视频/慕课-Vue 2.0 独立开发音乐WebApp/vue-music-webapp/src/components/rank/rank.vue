<!-- 9-1 update: 排行榜页面 -->

<template>
    <!-- 9-2 add: ref="rank" -->
    <div class="rank" ref="rank">
        <!--9-1 add: :data + ref -->
        <Scroll class="top-list" :data="topList" ref="topList">
            <ul>
                <!-- 9-1 add: 点击路由跳转和 singer.vue / recommend.vue 中都是一样的，不做过多注释 -->
                <!-- 9-3 添加点击事件 selectItem(item) -->
                <li class="item" @click="selectItem(item)" v-for="(item, index) in topList" :key="index">
                    <div class="icon">
                        <img width="100" height="100" v-lazy="item.picUrl">
                    </div>

                    <ul class="song-list">
                        <li class="song" v-for="(song, index) in item.songList" :key="index">
                            <span>{{index + 1}}</span>
                            <span>{{song.songname}}-{{song.singername}}</span>
                        </li>
                    </ul>
                </li>
            </ul>

            <div class="loading-container" v-show="!topList.length">
                <loading></loading>
            </div>
        </Scroll>

        <router-view></router-view>
    </div>
</template>


<script>
    import Loading from "base/loading/loading";
    import Scroll from "base/scroll/scroll";
    import {ERR_OK} from "api/config";

    // 9-1 add: 调用获取排行榜歌单的接口
    import {getTopList} from "api/rank";

    // 9-2 引入 playlistMixin
    import {playlistMixin} from 'assets/js/mixin';

    // 9-3 导入 vuex 的 mapMutations, 在点击跳转的时候把当前榜单的 item 给 top-list.vue 使用
    import {mapMutations} from "vuex";

    export default {

        // 9-2 add: 添加 playlistMixin
        mixins: [playlistMixin],

        // 获取排行榜歌单的接口，在当前 created 钩子函数初始化
        created() {
            setTimeout(() => {
                this._getTopList();
            }, 1000)
        },
        data() {
            return {
                topList: [],
            }
        },

        methods: {
            // 定义私有方法封装获取排行榜接口的api
            _getTopList() {
                getTopList().then((res) => {
                    console.log("res:", res);
                    if (res.code === ERR_OK) {
                        // console.log("res.data.topList: ", res.data.topList);
                        this.topList = res.data.topList;
                    }
                })
            },

            // 7-25 add: 实现 mixin: playlist 为 mixin.js 内部通过 vuex 取得的
            handlePlaylist(playlist) {
                this.$refs.rank.style.bottom = playlist.length > 0 ? "60px" : "";
                // 最后再调用 scroll.vue 组件中的 refresh() 方法，当前父组件可以直接通过这种方式调用子组件的方法。
                this.$refs.topList.refresh();
            },

            selectItem(item) {
                this.$router.push({
                    path: "/rank/${item.id}",
                });
                this.setTopList(item);
            },

            // 9-3
            ...mapMutations({
                setTopList: "SET_TOP_LIST"
            })
        },

        components: {
            Loading,
            Scroll,
        },
    }

</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
    @import "~assets/stylus/variable";
    @import "~assets/stylus/mixin";
    .rank {
        position: fixed;
        width: 100%;
        top: 88px;
        bottom: 0;
        .top-list {
            height: 100%;
            overflow: hidden;
            .item {
                display: flex;
                margin: 0 20px;
                padding-top: 20px;
                height: 100px;
                &:last-child {
                    padding-bottom: 20px;
                }
                .icon {
                    flex: 0 0 100px;
                    width: 100px;
                    height: 100px;
                    border-radius: 2px;
                    overflow: hidden;
                }
                .song-list {
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    padding: 0 20px;
                    height: 100px;
                    overflow: hidden;
                    background: $color-highlight-background;
                    color: $color-text-d;
                    font-size: $font-size-small;
                    .song {
                        no-wrap();
                        line-height: 26px;
                    }
                }
            }
            .loading-container {
                /* position 写成 postion, 竟然不报错，这里真是让人抓狂啊，而且也 webstorm 也不提示下波浪线 */
                position: absolute;
                width: 100%;
                top: 50%;
                transform: translateY(-50%);
            }
        }
    }
</style>
