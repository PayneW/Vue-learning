<template>
    <transition name="slide">
        <!-- 6-8 music-list 组件开发
            :songs = "songs" 当前组件绑定一个动态属性 songs (songs 来自下面 data 中的 sings) 给 music-list
            组件，子组件(music-list) 在 props 属性中接收
            :title = "title" 和 :bg-image = "bgImage" 也要传递给子组件(music-list)， title 和 bgImage
            来自于当前 computed 计算属性下的对应方法 -->
        <music-list :songs="songs" :title="title" :bg-image="bgImage"></music-list>
    </transition>
</template>

<script>
    // 6-4 add
    import {mapGetters} from "vuex";
    // 6-5 add
    import {getSingerDetail} from "api/singer";
    import {ERR_OK} from "api/config";

    // 6-6
    import {createSong} from "assets/js/song";

    // 6-8 引用 music-list 组件
    import MusicList from "components/music-list/music-list"

    export default {

        // 6-6 add
        data() {
            return {
                songs: []
            }
        },

        computed: {
            // 6-5 add
            ...mapGetters([
                // 这个 singer 对应 store.js --> getters 下的 singer 方法(属性)
                "singer"
            ]),

            // 6-8 add 取得 当前 singer 的 title 和 image 传给子组件 (music-list)
            // this.singer 来自于上面 ...mapGetters 取得的 store.js 中的 getters 对象下返回的 state.singer,
            // 因为当前 export default {} 导出的默认对象, Vue 会通过 Vue.component("singer-detail", {})
            // 注册为 vue 的全局组件，vuex 也会通过 Vue.use(vuex) 变成 Vue 的一个方法，所以 singer 可以在当前
            // Vue 实例的任何部分访问到。
            title() {
                return this.singer.name
            },
            bgImage() {
                return this.singer.avatar
            }

        },
        created() {
            // console.log("this.singer: ", this.singer);  // Singer {}

            // 6-5 add
            this._getSingerDetail();
        },

        methods: {
            // 6-5 add: 获取歌手详情
            _getSingerDetail() {
                // 当前组件内的 singer 是根据 vuex 来获取的，vuex 触发的是在 singer.vue 中的点击事件
                // selectSinger() 中执行的; 假如在当前(歌手详情页) 刷新了页面是无法得到当前
                // this.singer.id 的，所以当刷新了页面后我们把路由跳转到 singer 歌手列表组件(页面)。
                if (!this.singer.id) {
                    this.$router.push("/singer");
                    return;
                }
                getSingerDetail(this.singer.id).then((res) => {
                    if (res.code === ERR_OK) {
                        // console.log("_getSingerDetail res.data.list: ", res.data.list);
                        this.songs = this._normalizeSongs(res.data.list);
                        // console.log("songs: ", this.songs);
                    }
                })
            },

            // 6-6 add
            _normalizeSongs(list) {
                let ret = [];
                list.forEach((item) => {
                    // ES6 的对象解构赋值
                    // musicData 看上面的数据输出
                    let {musicData} = item;
                    if (musicData.songid && musicData.albumid) {
                        ret.push(createSong(musicData))
                    }
                });
                return ret;
            }
        },

        // 6-8 add
        components: {
            MusicList,
        }
    }
</script>


<style lang="stylus" rel="stylesheet/stylus">
    @import "~assets/stylus/variable";

    .singer-detail {
        position: fixed;
        z-index: 100;
        height: 100%;
        left: 0;
        right: 0;
        bottom: 0;
        background: $color-background;
    }


    .slide-enter, .slide-leave-to {
        transform: translate3d(100%, 0, 0);
    }
    .slide-enter-active, .slide-leave-active {
        transition: all 0.3s;
    }
</style>
