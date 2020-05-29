// singer-detail.vue 中有引用

import {getLyric, getSongsUrl} from "api/song";
import {ERR_OK} from "api/config";

// 7-20 安装 js-base64 (解码 base64 字符串):  npm install js-base64 --save
import {Base64} from "js-base64"

// 6-6 add : 封装获取歌曲数据的组件
export default class Song {
    /* 参数多,封装为一个对象:
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
        this.filename = `C400${this.mid}.m4a`;
        this.url = url;
    };

    // 7-19 add: 在 api/song.js 中定义 getLyric 请求接口，在 vue.config.js 配置后台转换，最后在这里接收歌词数据
    getLyric() {
        // 7-20: 在每次 currentSong 变化的时候我们就会调用 getLyric (调用发生在: player.vue -> watch ->
        // currentSong() 方法内) 肯定是不行的，这里添加判断如果已经有 lyric 了, 就直接返回一个 Promise
        if (this.lyric) {
            return Promise.resolve(this.lyric);
        }
        return new Promise((resolve, reject) => {
            getLyric(this.mid).then((res) => {
                if (res.retcode === ERR_OK) {
                    // 使用 Base64 解码
                    this.lyric = Base64.decode(res.lyric);
                    // console.log("js/song.js -> getLyric() -> this.lyric: ", this.lyric);
                    resolve(this.lyric);
                } else {
                    reject("no lyric")
                }
            })
        })
    }
}

// 6-6 给 Song 类扩展一个工厂方法，来实例化 Song (在 singer-detail.vue 中导入)
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
        image: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${musicData.albummid}.jpg?max_age=2592000`,

        /*
         * (0).点开歌手详情页打开控制台找到 "fcg_v8_singer_track_cp.fcg?g_tk=5381$loginUin=0&..." 点击一下，右侧的
         *  Headers 中便是 Request URL
         * (1).点击歌曲名称打开展示歌曲详细的页面，url: "https://y.qq.com/n/yqq/song/000uhMwj387EBp.html" 其中
         * "000uhMwj387EBp" 就是 songmid。
         * (2).在音乐播放列表页面打开控制台，network 找到 "fcg_global_comment_h5.fcg?g_tk=5381&loginUin=0......",
         * 这个 url: 需要替换里面的songmid、filename。
         * (3).在最后一个播放音乐的页面，打开控制台在 Media --> 下找到 Size 最大的那一行，点击 Name 右侧便可以看到完整的
         * Request URL (比如:https://dl.stream.qqmusic.qq.com/C400003mAan70zUy5O.m4a?guid=283460401&
         * vkey=C1D52CAB15384A5E7FAA768F191C90A04554B1E456A89D5DE10B3561FC78B0018D71E119B10590D01BFDDFF05F2E537D3A2651E69D059195
         * &uin=0&fromtag=3&r=11062979242888615  )
         */
        // 6-6 看视频时老师讲的 url 获取方法 (6-6 视频时便知道这个 url 是访问不通的，但是等到后面再改)
        // url: `http://ws.stream.qqmusic.qq.com/${musicData.songid}.m4a?fromtag=38`
        url: musicData.url
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

export function isValidMusic(musicData) {
    return musicData.songid && musicData.albummid && (!musicData.pay || musicData.pay.payalbumprice === 0)
}

export function processSongsUrl(songs) {
    if (!songs.length) {
        return Promise.resolve(songs);
    }
    return getSongsUrl(songs).then((purlMap) => {
        // console.log("purlMap: ", purlMap);
        songs = songs.filter((song) => {
            const purl = purlMap[song.mid];
            if (purl) {
                song.url = purl.indexOf("http") === -1 ? `http://dl.stream.qqmusic.qq.com/${purl}` : purl;
                return true;
            }
            return false;
        });
        // console.log("processSongsUrl function return songs: ", songs);
        return songs
    })
}
