// 6-6 add : 封装获取歌曲数据的组件
export default class Song {
    /* 参数多传一个对象:
     * id: 歌曲的 id.
     * mid: 歌曲的 mid.
     * singer: 歌曲对应的歌手
     * name: 歌曲的名称.
     * album: 歌曲专辑的名称
     * duration: 歌曲的长度
     * image: 歌曲对应的图片
     * url: 歌曲的路径
     */
    constructor({id, mid, singer, name, album, duration, image, url}){
        this.id = id;
        this.mid = mid;
        this.singer = singer;
        this.name = name;
        this.album = album;
        this.duration = duration;
        this.image = image;
        this.url = url;
    };
}

// 6-6 给 Song 类扩展一个工厂方法，来实例化 Song
export function createSong(musicData) {
    return new Song({
        id: musicData.songid,
        mid: musicData.songmid,
        singer: filterSinger(musicData.singer),
        name: musicData.songname,
        album: musicData.albumname,
        // interval 是歌曲有多少秒
        duration: musicData.interval,
        // 点击歌曲名称打开歌曲详细的页面，歌曲名称左边图片的 url 和我们之前获取歌手列表时
        // 歌手的展示图片路径是类似的，在控制台可以看到是这样的 :
        // "https://y.gtimg.cn/music/photo_new/T002R300x300M000003RMaRI1iFoYd.jpg?max_age=2592000"
        image: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${musicData.albumid}.jpg?max_age=2592000`,

        /*
         * (1).点击歌曲名称打开展示歌曲详细的页面，url: "https://y.qq.com/n/yqq/song/000uhMwj387EBp.html" 其中
         * "000uhMwj387EBp" 就是 songmid。
         * (2).在音乐播放列表页面打开控制台，network 找到 "fcg_global_comment_h5.fcg?g_tk=5381&loginUin=0......",
         * 这个 url: 需要替换里面的songmid、filename。
         */
        // 6-6 看视频时老师讲的 url 获取方法 (6-6 视频时便知道这个 url 是访问不通的，但是等到后面再改)
        url: `http://ws.stream.qqmusic.qq.com/${musicData.songid}.m4a?fromtag=38`
    })
}

// 处理 musicData 中的 singer
function filterSinger(singer) {
    let ret = [];
    // 如果 singer 为空
    if (!singer) return "";
    singer.forEach((item) => {
        ret.push(item.name);
    });
    return ret.join("/")
}
