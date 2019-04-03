<template>
    <div class="singer">
        <!-- 6-2 add: 监听 listview.vue 中 $emit 发送的事件 select 并附带一个 item 参数
            当前组件接收 select 事件之后，在 methods 中做接下来的操作 -->
        <ListView :data="singers" @select="selectSinger"></ListView>

        <!-- 6-2 add: 歌手详情页的路由配置, 路由的跳转是根据 `base\listview\listview.vue`
        中歌手列表 li 点击来跳转的，所以需要给 listview.vue 中的 li 添加 @click="selectItem(item)"
        在 listview.vue 中的 methods 中定义 selectedItem(item)  -->
        <router-view></router-view>
    </div>
</template>


<script>
    import {getSingerList} from "api/singer";
    import {ERR_OK} from "api/config";

    import Singer from "assets/js/singer";

    import ListView from "base/listview/listview"

    // 6-4 add: vuex
    import {mapMutations} from "vuex";

    const HOT_NAME = "热门";
    const HOT_SINGER_LEN = 10;

    export default {
        data() {
            return {
                singers: [],
            }
        },
        created() {
            this._getSingerList();
        },

        components: {
            ListView,
        },

        methods: {

            // 6-2 add
            selectSinger(singer) {
                // console.log("singer: ", singer);
                this.$router.push({
                    // singer 跳转的子路由在 router 中的 /singer 下配置
                    path: `/singer/${singer.id}`
                });

                // 6-4 add 在下面通过 ...mapMutations 做了映射之后，就实现了对 mutation 变化的提交
                // 这种写法等于 this.$store.commit().
                // 在点击当前歌手 (selectSinger) 的时候把当前 singer (从 listview.vue 中 $emit 得到)
                // 歌手信息，然后调用 vuex 中 mutations 中的 "SET_SINGER" 方法， 把 singer 赋值给 state.singer
                this.setSinger(singer);

                // {avatar: "https://xxxx", id: "0025Nh1xxx", name: "xxx"}
                console.log("singer 数据内容为: ", singer);
            },

            _getSingerList() {
                getSingerList().then((res) => {
                    // console.log("res: ", res);
                    if (res.code === ERR_OK) {
                        this.singers = this._normalizeSinger(res.data.list);
                        // console.log(this._normalizeSinger(this.singer));
                    }
                })
            },

            _normalizeSinger(list) {
                // 定义一个 map 用来保存数据列表
                let map = {
                    // 默认只创建"热门数据", 其他项会在下面的 list.forEach() 中添加
                    hot: {
                        title: HOT_NAME,
                        items: []
                    }
                };

                list.forEach((item, index) => {

                    // 遍历上面请求回来的歌手列表，取前十个推入到 hot.items 中
                    if(index < HOT_SINGER_LEN) {
                        // 5-3 之前的默认写法，因为封装了 assets -> singer.js 类 所以更改为下面的写法
                        /*map.hot.items.push({
                            // 详细的 Fsinger_xx 请参考数据
                            id: item.Fsinger_mid,
                            name: item.Fsinger_name,
                            avatar: `https://y.gtimg.cn/music/photo_new/T001R300x300M000${item.Fsinger_mid}.jpg?max_age=2592000`
                        })*/
                        map.hot.items.push(new Singer({
                            id: item.Fsinger_mid,
                            name: item.Fsinger_name,
                        }))
                    }

                    // 根据数据中的 Findex 做聚类: 既右侧竖行的: A - Z
                    // 找到 当前项(item) 的 Findex
                    const key = item.Findex;
                    // 如果 map 下不存在 map[key] (比如: map.9; map.A 这样的还没有被创建过的属性)，就以 key 为键，
                    // 对应的值为一个 包含 title 和 items 两个属性的对象
                    if (!map[key]) {
                        map[key] = {
                            title: key,
                            items: []
                        }
                    }
                    // 经过上面的 if 语句 map[key].items 会完全被创建出来 (注: 为 { 9: {title: "9", items: Array(1),
                    // A:xxx, B:xxx，....} } ), 因为 list 中包含很多数据，所以 items 数组在循环中可以被推入多个数据，
                    /*  注释原因: 同上
                        map[key].items.push({
                        // 详细的 Fsinger_xx 请参考数据
                        id: item.Fsinger_mid,
                        name: item.Fsinger_name,
                        avatar: `https://y.gtimg.cn/music/photo_new/T001R300x300M000${item.Fsinger_mid}.jpg?max_age=2592000`
                    });*/
                    map[key].items.push(new Singer({
                        id: item.Fsinger_mid,
                        name: item.Fsinger_name,
                    }));
                });

                // 此时输出 map 对象就可以看到完整的内容了
                // console.log("map: ", map);

                // 上面 console map 可以看到，我们是得到所有的 A-Z 的数据了，但是为了得到有序列表
                // (因为数据并不一定是按照 A-Z 排序的)，我们需要处理 map 变成有序的
                let hot = [],
                    ret = [];
                // 此时的 map 形式见上面的 console 输出
                for (let key in map) {
                    let val = map[key];
                    // console.log("val.title: ", val.title);
                    // console.log("val.title typeof: ", typeof val.title);
                    if( val.title !== undefined) {
                        if (val.title.match(/[a-zA-Z]/)) {
                            ret.push(val);
                        }else if (val.title === HOT_NAME) {
                            hot.push(val)
                        }
                    }
                }
                // 然后把 ret 数组内的项做升序排序
                ret.sort((a, b) => {
                    // 如果 a - b 大于0 就时 true
                    return a.title.charCodeAt(0) - b.title.charCodeAt(0);
                });

                // console.log("hot: ", hot);
                // console.log("ret: ", ret);
                // 最后把 hot 和 ret 拼接返回
                return hot.concat(ret);
            },

            // 6-4: 更具体的语法参考: Vue-learning\Vue--文档+语法\Vuex\20190303-vuex 讲解示例\use.vue
            ...mapMutations({
                setSinger: "SET_SINGER",
            })
        }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
    .singer {
        position: fixed;
        top: 88px;
        bottom: 0;
        width: 100%;
    }
</style>
