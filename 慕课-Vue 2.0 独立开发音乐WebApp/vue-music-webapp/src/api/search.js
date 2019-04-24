// 10-3 created: 封装搜索页面的所有请求接口

import jsonp from "assets/js/jsonp";
import {commonParams, options} from "./config";

import axios from "axios";

const debug = process.env.NODE_ENV !== "production";

// 热门搜索请求
export function getHotKey() {
    const url = debug ? "/api/getHotKey": "http://ustbhuangyi.com/music/api/getDiscList";
    const data = Object.assign({}, commonParams, {
        "_": 1556004530742,
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

// 输入框内输入内容，搜索调用的接口 : 1st 参数为搜索框输入的内容；2nd 参数表示第几页，因为默认只
// 显示 20 条，上拉刷新如果大于 20 条会接着加载； 3th 参数为返回的接口中要不要包含歌手，
export function search(query, page, zhida) {
    const url = debug ? "/api/search": "http://ustbhuangyi.com/music/api/getDiscList";
    const data = Object.assign({}, commonParams, {
        w:query,
        p: page,
        catZhida: zhida ? 1 : 0,
        zhidaqu: 1,
        t: 0,
        flag: 1,
        ie: "utf-8",
        sem: 1,
        aggr: 0,
        perpage: 20,
        n: 20,
        remoteplace: "txt.qq.all",
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
