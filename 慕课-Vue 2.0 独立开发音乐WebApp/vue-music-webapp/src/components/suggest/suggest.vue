<!-- 10-4 created 搜索页面框中输入搜索得内容 (query) ，生成搜索检索的列表  -->
<template>
    <!-- 10-5 add: 上拉刷新是要扩展 better-scroll 组件的，传递 pullup 属性给 scroll 组件，
        在 scroll 组件中 $emit scrollToEnd 到当前组件，父组件接收到 scrollToEnd 消息之后
        触发 searchMore 事件-->
    <scroll class="suggest" ref="suggest"
            :data="result"

            :pullup="pullup"
            @scrollToEnd = "searchMore"

            :beforeScroll="beforeScroll"
            @beforeScroll = "listenScroll"
    >
        <ul class="suggest-list">
            <li class="suggest-item" v-for="(item, index) in result" :key="index" @click="selectItem(item)">
                <div class="icon">
                    <i :class="getIconCls(item)"></i>
                </div>
                <div class="name">
                    <p class="text" v-html="getDisplayName(item)"></p>
                </div>
            </li>
            <loading v-show="hasMore" title=""></loading>
        </ul>

        <div class="no-result-wrapper" v-show="!hasMore && !result.length">
            <no-result title="抱歉，暂无搜索结果"></no-result>
        </div>
    </scroll>
</template>

<script>
    // 10-4 add:
    import {search} from "src/api/search";
    import {ERR_OK} from "src/api/config";

    // 10-5~18 因为展示的搜索列表要可以滑动，而且可以上滑加载更多
    import Scroll from "base/scroll/scroll";
    import Loading from "base/loading/loading";

    import NoResult from "base/no-result/no-result";

    // 10-5 add
    import {createSong, isValidMusic, processSongsUrl} from "assets/js/song";

    //
    import {mapMutations, mapActions} from "vuex";

    import Singer from "assets/js/singer";


    const TYPE_SINGER = "singer";

    // 10-5
    const perpage = 20;

    export default {
        // 10-4
        props: {
            // query 为接收父组件传入得值，直接在当前 props 对象中接收，既可以使用
            query: {
                type: String,
                default: "",
            },
            showSinger: {
                type: Boolean,
                default: true,
            }
        },

        // 10-4 add
        data() {
            return {
                // page 用来表示是第几页，
                page: 1,
                result: [],

                beforeScroll: true,

                // 10-5 传递 pullup 属性给 scroll 组件
                pullup: true,

                // 10-5 add: 用来判断上滑加载后是否加载完
                hasMore: true,

            }
        },

        //
        methods: {
            // 请求服务器，获取搜索框内的检索需要的数据
            search() {
                // 10-4 add: 调用搜索接口: 1st 参数为搜索框输入的内容。 2nd 参数表示第几页，因为默认只
                // 显示 20 条，上拉刷新如果大于 20 条会接着加载。 3th 参数为返回的接口中要不要包含歌手，
                // 此参数来自于上面的 props 即父组件(search.vue)传入的。 4th 参数表示第几页
                // debugger;
                this.page = 1;
                this.hasMore = true;
                this.$refs.suggest.scrollTo(0, 0);
                search(this.query, this.page, this.showSinger, perpage).then((res) => {
                    if (res.code === ERR_OK) {
                        this._genResult(res.data).then((result) => {
                            console.log("result: ", result);
                            this.result = result;
                        });
                        this._checkMore(res.data);
                    }
                })
            },

            // 因为 res.data 下可能是这样的 { song: {}, zhida: {} } ，所以我们需要来处理一下数据
            _genResult(data) {
                let ret = [];
                if (data.zhida && data.zhida.singerid && this.page === 1) {
                    ret.push({...data.zhida, ...{type: TYPE_SINGER}})
                }

                // 10-5 更改这里的代码，实际上是对比 Master 分支更改的，因为这里的的代码要变更成和
                // singer-detail.vue, top-list.vue 中的歌曲列表一样，要把这些歌曲列表变成全局 Song 类
                // 的实例，以便添加所需要的歌曲信息以及播放 url 等
                return processSongsUrl(this._normalizeSongs(data.song.list)).then((songs) => {
                    console.log("songs: ", songs);
                    ret = ret.concat(songs);
                    return ret;
                })
            },
            _normalizeSongs(list) {
                let ret = [];
                list.forEach((musicData) => {
                    if (isValidMusic(musicData)) {
                        ret.push(createSong(musicData));
                    }
                });
                return ret;
            },


            // icon
            getIconCls(item) {
                if (item.type === TYPE_SINGER) {
                    return "icon-mine"
                } else {
                    return "icon-music"
                }
            },

            getDisplayName(item) {
                if (item.type === TYPE_SINGER) {
                    return item.singername;
                } else {
                    return `${item.name}-${item.singer}`;
                }
            },

            refresh() {
                this.$refs.suggest.refresh();
            },

            // 10-5
            searchMore() {
                if (!this.hasMore) return;
                this.page++;
                search(this.query, this.page, this.showSinger, perpage).then((res) => {
                    if (res.code === ERR_OK) {
                        this._genResult(res.data).then((result) => {
                            this.result = this.result.concat(result);
                        });
                        this._checkMore(res.data);
                    }
                })
            },

            // 10-5
            _checkMore(data) {
                const song = data.song;
                if (!song.list.length || (song.curnum + (song.curpage -1) * perpage) >= song.totalnum) {
                    this.hasMore = false;
                }
            },

            listenScroll(){
                this.$emit("listenScroll");
            },

            selectItem(item) {
                if (item.type === TYPE_SINGER) {
                    const singer = new Singer({
                        id: item.singermid,
                        name: item.singername,
                    });
                    this.$router.push({
                       path: `/search/${singer.id}`
                    });
                    this.setSinger(singer);
                } else {
                    // this.insertSong(item);
                }
                // this.$emit("select", item);
            },

            //
            ...mapMutations({
                setSinger: "SET_SINGER",
            }),
            ...mapActions([
                "insertSong",
            ])
        },

        // 10-4 watch query 的变化，当查询(query) 的内容有变化的时候，我们就去调用
        // 接口去获取匹配的数据
        watch: {
            query(newQuery){
                if (!newQuery) return;
                this.search(newQuery);
            },
        },


        components: {
            Scroll,
            Loading,
            NoResult,
        },
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
    @import "~assets/stylus/variable";
    @import "~assets/stylus/mixin";

    .suggest {
        height: 100%;
        overflow: hidden;
        .suggest-list {
            padding: 0 30px;
            .suggest-item {
                display: flex;
                align-items: center;
                padding-bottom: 20px;
            }
            .icon {
                flex: 0 0 30px;
                width: 30px;
                [class^="icon-"] {
                    font-size: 14px;
                    color: $color-text-d;
                }
            }
            .name {
                flex: 1;
                font-size: $font-size-medium;
                color: $color-text-d;
                overflow: hidden;
                .text {
                    no-wrap();
                }
            }
        }
        .no-result-wrapper {
            position: absolute;
            width: 100%;
            top: 50%;
            transform: translateY(-50%);
        }
    }

</style>
