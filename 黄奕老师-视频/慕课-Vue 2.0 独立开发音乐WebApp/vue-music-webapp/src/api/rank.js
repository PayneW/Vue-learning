// 9-1 created: 歌曲排行榜接口: 获取数据的 url: https://m.y.qq.com/#toplist
import jsonp from "assets/js/jsonp";
import {commonParams, options} from './config';

import axios from "axios";

// vue cli 3 中 vue-cli-service serve 默认的模式是 development;
// build 时默认的模式是 production
const debug = process.env.NODE_ENV !== "production";

export function getTopList () {
    const url = debug ?  "/api/getTopList" : "http://ustbhuangyi.com/music/api/getDiscList";
    const data = Object.assign({}, commonParams, {
        "_": 1555578102308,
        uin: 0,
        platform: "h5",
        needNewCode: 1,
    });
    return axios.get(url, {
        params: data,
    }).then((res) => {
        return Promise.resolve(res.data);
    })
}

// 9-3 add: 获取排行榜下的歌曲列表接口 (tips: qq 音乐线上已经把接口改为 post, 但是获取的步骤较为复杂，暂时先不改)
export function getTopListMusic (topid) {
    const url = "https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg";

    const data = Object.assign({}, commonParams, {
        topid,
        needNewCode: 1,
        uin: 0,
        tpl: 3,
        page: "detail",
        type: "top",
        platform: "h5"
    });

    return jsonp(url, data, options);
}
