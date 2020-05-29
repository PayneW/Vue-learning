<!-- 8-1 created: 歌单详情页 -- 点击首页 "热门歌单推荐" 下的歌单跳转到当前页面 -->
<!-- tips: 当前 歌单详情页 和 singer-detail.vue 差不多是一样的，很多代码可以
    复用 singer-detail.vue 的 -->
<template>
    <transition name="slide">
        <music-list :title="title" :bg-image="bgImage" :songs="songs"></music-list>
    </transition>
</template>

<script type="text/ecmascript-6">

    // 8-1 导入 MusicList 组件
    import MusicList from "components/music-list/music-list";
    import {mapGetters} from "vuex";

    // 8-2 导入获取歌单里的歌曲接口
    import {getDiscSongList} from "api/recommend";
    import {ERR_OK} from "api/config";

    // 8-3 add: 导入 createSong
    import {createSong , isValidMusic, processSongsUrl} from "assets/js/song";

    export default {
        computed: {
            // 8-1 tips: ...mapGetters([]) 参数内是数组， ...mapMutations({}) 内参数为对象
            // 因为在 recommend.vue 中通过调用 mapMutations 设置了 disc 所以，现在通过 mapGetters
            // 可以取到设置的 disc 的值。
            ...mapGetters([
                "disc"
            ]),

            title() {
                return this.disc.dissname;
            },
            bgImage() {
                return this.disc.imgurl;
            },
        },

        components: {
            MusicList
        },

        // 8-2 add: 调用获取歌单里的歌曲接口
        created() {
            this._getDiscSongList();
        },

        // 8-3 add: 我们要把歌单里的歌曲列表传给 music-list.vue 内的 scroll 组件，所以在这里声明 songs
        data() {
            return {
                songs: [],
            }
        },

        methods: {
            _getDiscSongList() {
                // 8-2 add: 忘记在 this 前添加 !, 这个 bug 找了一个多小时！！！
                if (!this.disc.dissid) {
                    this.$router.push("/recommend");
                    return;
                }
                getDiscSongList(this.disc.dissid).then((res) => {
                    // console.log("res: ", res);
                    if (res.code === ERR_OK) {
                        // 8-3 把歌曲列表传给 songs
                        processSongsUrl(this._normalizeSongs(res.cdlist[0].songlist)).then((songs) => {
                            this.songs = songs
                        });
                    }
                })
            },

            // 8-3 add: 这个和歌手详情页(singer-detail.vue) 中的代码逻辑很相似,但是又很重要，把每一首歌
            // 都过 _normalizeSongs 执行后变成 Song 构造函数的实例，在播放歌曲页面(即: player)页面
            // tips: 这里的代码更改，按照 singer-detail.vue 中的来
            _normalizeSongs(list){
                let ret = [];
                console.log("list: ", list);
                list.forEach((musicData) => {
                    if (isValidMusic(musicData)){
                        ret.push(createSong(musicData))
                    }
                });
                // console.log("ret: ", ret);
                return ret;
            }
        }
    }
</script>

<style rel="stylesheet/stylus" lang="stylus" scoped>
    .slide-enter-active, .slide-leave-active {
        transition: all .3s;
    }
    .slide-enter, .slide-leave-to {
        transform: translate3d(100%, 0, 0);
    }
</style>
