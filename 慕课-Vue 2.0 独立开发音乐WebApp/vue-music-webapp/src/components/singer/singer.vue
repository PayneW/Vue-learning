<template>
    <div class="singer"></div>
</template>


<script>
    import { getSingerList } from "api/singer";
    import { ERR_OK } from "api/config";

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

        methods: {
            _getSingerList() {
                getSingerList().then((res) => {
                    console.log("res: ", res);
                    if (res.code === ERR_OK) {
                        this.singer = res.data.list;
                        console.log(this._normalizeSinger(this.singer));
                    }
                })
            },

            _normalizeSinger(list) {
                // 定义一个 map 用来保存热门数据
                let map = {
                    // 热门数据
                    hot: {
                        title: HOT_NAME,
                        items: []
                    }
                };
                // 遍历上面请求回来的歌手列表，取前十个推入到 hot.items 中
                list.forEach((item, index) => {
                    if(index < HOT_SINGER_LEN) {
                        map.hot.items.push({
                            // 详细的 Fsinger_xx 请参考数据
                            id: item.Fsinger_mid,
                            name: item.Fsinger_name,
                            avatar: `https://y.gtimg.cn/music/photo_new/T001R300x300M000${item.Fsinger_mid}.jpg?max_age=2592000`
                        })
                    }

                    // 根据数据中的 Findex 做聚类: 既右侧竖行的: A - Z
                    const key = item.Findex;
                    if (!map[key]) {
                        map[key] = {
                            title: key,
                            items: []
                        }
                    }
                    map[key].items.push({
                        // 详细的 Fsinger_xx 请参考数据
                        id: item.Fsinger_mid,
                        name: item.Fsinger_name,
                        avatar: `https://y.gtimg.cn/music/photo_new/T001R300x300M000${item.Fsinger_mid}.jpg?max_age=2592000`
                    });
                });
                console.log(map);

                // 为了得到有序列表(因为数据并不一定是按照 A-Z 排序的)，我们需要处理 map
                let hot = [],
                    ret = [];
                for (let key in map) {
                    let val = map[key];
                    if (val.title.match(/[a-zA-Z]/)) {
                        ret.push(val);
                    }else if (val.title === HOT_NAME) {
                        hot.push(val)
                    }
                }
                // 然后把 ret 数组内的项做升序排序
                ret.sort((a, b) => {
                    // 如果 a - b 大于0 就时 true
                    return a.title.charCodeAt(0) - b.title.charCodeAt(0);
                })
            }
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
