<!-- 10-4 created 搜索页面框中输入搜索得内容 (query) ，生成搜索检索的列表  -->
<!-- tips: 当前组件的父组件有 search.vue / add-song.vue -->
<template>
    <!-- 10-5 add: 上拉刷新是要扩展 better-scroll 组件的，传递 pullup 属性给 scroll 组件，
         在 scroll 组件中 $emit scrollToEnd 到当前组件，父组件接收到 scrollToEnd 消息之后
         触发 searchMore 事件-->
    <!-- 10-10 add: 给 scroll 组件传入一个 beforeScroll 值，目的是当搜索框失去焦点时，让手机端
         的键盘隐藏。 @beforeScroll 为监听子组件的 $emit事件， 当前 @beforeScroll 事件的回调是
         listenScroll -->
    <scroll class="suggest"
        ref="suggest"
        :data="result"
        :pullup="pullup"
        @scrollToEnd = "searchMore"
        :beforeScroll="beforeScroll"
        @beforeScroll = "listenScroll"
    >
        <ul class="suggest-list">
            <!-- 10-6 add: @click="selectItem(item)"  -->
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

        <!-- 10-10 add: -->
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

    // 10-6
    import {mapMutations, mapActions} from "vuex";

    // 10-6 add: 因为搜索列表的第一项可能是歌手，所以我们现在要把 Singer 类导入，设置歌手的 id/name/avatar
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

                // 10-5 传递 pullup 属性给 scroll 组件
                pullup: true,

                // 10-5 add: 用来判断上滑加载后是否加载完
                hasMore: true,

                // 10-10 add: 当我们在手机端 input 失去焦点时，让键盘自动隐藏
                beforeScroll: true,
            }
        },

        //
        methods: {
            // 请求服务器，获取搜索框内的检索需要的数据
            search() {
                // 这个设置配合 this._checkMore() 看就明白了
                this.hasMore = true;

                // 因为我们牵扯到上滑加载更多，所以默认第一次 search() 调用接口返回数据是，把这两个配置设置成默认值
                this.page = 1;
                this.$refs.suggest.scrollTo(0, 0);

                // 10-4 add: 调用搜索接口: 1st 参数为搜索框输入的内容。 2nd 参数表示第几页，因为默认只
                // 显示 20 条，上拉刷新如果大于 20 条会接着加载。 3th 参数为返回的接口中要不要包含歌手，
                // 此参数来自于上面的 props 即父组件(search.vue)传入的。 4th 参数表示第几页
                search(this.query, this.page, this.showSinger, perpage).then((res) => {
                    if (res.code === ERR_OK) {
                        this._genResult(res.data).then((result) => {
                            // console.log("result: ", result);
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
                    // console.log("songs: ", songs);
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
                // 如果 hasMore 为 true, 我们就把 page + 1
                this.page++;
                // 然后传入参数，读取 page + 1 后返回的数据，
                search(this.query, this.page, this.showSinger, perpage).then((res) => {
                    if (res.code === ERR_OK) {
                        this._genResult(res.data).then((result) => {
                            // 新返回的数据和之前的数据做拼接
                            this.result = this.result.concat(result);
                        });
                        // 接着调用 _checkMore() 进行再次判断
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


            // 10-6 add:
            selectItem(item) {
                if (item.type === TYPE_SINGER) {
                    const singer = new Singer({
                        id: item.singermid,
                        name: item.singername,
                    });

                    // 10-6 add: 这里的搜索跳转，默认二级路由跳转是点击当前搜索列表中歌手来跳转。
                    this.$router.push({
                       path: `/search/${singer.id}`
                    });
                    // 通过 vuex 设置当前歌手需要的信息 setSinger, 以便在 singer-detail.vue 中使用
                    this.setSinger(singer);
                } else {
                    // 这个
                    this.insertSong(item);
                }

                // 10-11: 这个派发事件是怎么回事？ A: 根据设计稿的需求，我们要创建一个保存搜索历史的板块，
                // 那么什么时候保存我们搜索的内存到搜索历史板块呢？ 答案就是我们点击当前展示的列表中的 "歌手/歌曲" 时，
                // 因为当前 suggest.vue 组件不负责保存搜索历史这样的功能，所以我们 emit 一个消息，谁负责
                // 就在外面接收，接着进行下面的处理。 当前 select 事件在父级 search.vue 中接收。
                // Important Notes: 虽然当前 item 被当作参数传出了，但是父组件 search.vue 在 @select="saveSearch"
                // saveSearch 回调函数中并没有使用当前 item, 而是使用了 search-box.vue 中的 input blur
                // 时的 query 值。如何监听的 input 发生 blur 并保存的值，是通过 search-box.vue 中的 $watch 实现的
                this.$emit("select", item);
            },

            // 10-6 add: 为什么这里要引用 mapMutations? A: 在之前的组件 singer.vue 中我们是通过 vuex 的
            // mapMutations 来设置和保存 setSinger 的，然后在 singer-detail.vue 中通过 mapGetters 来读取当前歌手；
            // 我们此处继续利用这种格式
            ...mapMutations({
                setSinger: "SET_SINGER",
            }),

            // 10-6 add: 此处封装一个 action 的原因 ? A: 在上面 selectItem() 函数内，if 判断代表点击的是
            // 搜索列表中的歌手，else 内是点击的搜索列表中的歌曲，我们直接点击当前搜索列表中的歌曲肯定要播放，那来
            // 回顾一下，singer-detail.vue 中所有的对歌曲列表的操作都是通过 vuex 来完成的，此处我们也必须
            // 用 vuex 来完成操作。给 singer-detail.vue 中的 playlist 添加一首歌曲，state 中的属性肯定
            // 会有改动，那么哪几个会有改动？ A: playlist + sequenceList + currentIndex 都会有改动, 更多内容
            // 见 vuex 内的 insertSong
            ...mapActions([
                "insertSong",
            ]),


            // 10-10 add: listenScroll 再派发一个事件给父组件 search
            listenScroll(){
                this.$emit("listenScroll");
            },

            // 10-18 add
            refresh() {
                this.$refs.suggest.refresh();
            }

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
