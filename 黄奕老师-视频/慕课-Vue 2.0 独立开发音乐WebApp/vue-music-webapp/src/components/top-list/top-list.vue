<!-- 9-2 created 排行榜歌曲列表页面。 tips: 这个页面和 热门歌单下的 -> 歌单详情页获取接口
    几乎是一模一样的 -->
<template>
    <transition name="slide">
        <music-list :title="title" :bgImage="bgImage" :songs="songs" :rank="rank"></music-list>
    </transition>
</template>

<script>
    import MusicList from "components/music-list/music-list";

    // 9-3
    import {mapGetters} from "vuex";

    // 9-4 add: 导入排行榜下的歌曲列表接口
    import {getTopListMusic} from "api/rank";
    import {ERR_OK} from "api/config";

    // 9-4 导入 createSong 创建歌曲列表
    import {createSong, isValidMusic, processSongsUrl} from "assets/js/song";

    export default {

        // 9-3 add
        computed: {
            title() {
                return this.topList.topTitle;
            },
            bgImage() {
                if (this.songs.length) {
                    return this.songs[0].image;
                }
                return "";
            },
            ...mapGetters([
                "topList"
            ])
        },

        // 9-4 add: 在 created 生命周期中初始化获取排行榜下的歌曲列表的接口
        created() {
            this._getTopListMusic();
        },

        data() {
            return {
                songs: [],
                rank: true,
            }
        },

        methods: {
            _getTopListMusic() {
                if (!this.topList.id) {
                    this.$router.push("/rank");
                    return;
                }
                getTopListMusic(this.topList.id).then((res) => {
                    if (res.code === ERR_OK) {
                        // 8-3 把歌曲列表传给 songs
                        processSongsUrl(this._normalizeSongs(res.songlist)).then((songs) => {
                            this.songs = songs
                        });
                    }
                })
            },

            _normalizeSongs(list) {
                let ret = [];
                list.forEach((item) => {
                    const musicData = item.data;
                    if (isValidMusic(musicData)){
                        ret.push(createSong(musicData))
                    }
                });
                return ret;
            }
        },


        // 9-2
        components: {
            MusicList,
        },
    }
</script>

<style lang="stylus" scoped rel="stylesheet/stylus">
    .slide-enter-active, .slide-leave-active {
        transition: all .3s ease;
    }
    .slide-enter, .slide-leave-to {
        transform: translate3d(100%, 0, 0);
    }
</style>
