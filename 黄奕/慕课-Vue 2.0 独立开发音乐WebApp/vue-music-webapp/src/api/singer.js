import jsonp from "assets/js/jsonp";
import { commonParams, options } from './config';

import axios from "axios";

const debug = process.env.NODE_ENV !== "production";

export function getSingerList() {
    const url = 'https://c.y.qq.com/v8/fcg-bin/v8.fcg';
    const data = Object.assign({}, commonParams, {
        channel: 'singer',
        page: 'list',
        key: 'all_all_all',
        pagesize: 100,
        pagenum: 1,
        hostUin: 0,
        needNewCode: 0,
        platform: 'yqq'
    });
    return jsonp(url, data, options);

    /*const url = debug ? "/api/getSingerList": "" ;
    let str = "getUCGI";
    for (var i = 0; i< 16; i++) {
        str += Math.floor(Math.random()*10);
    }
    const data = {
        comm: {
            ct: 24,
            cv: 0,
        },
        singerList: {
            module: "Music.SingerListServer",
            method: "get_singer_list",
            param: {
                area: -100,
                sex: -100,
                genre: -100,
                sin: 0,
                cur_page: 1,
                index: -100
            }
        }
    };
    const params = Object.assign({}, commonParams, {
        "-": str,
        loginUin: 0,
        hostUin: 0,
        platform: "yqq.json",
        needNewCode: 0,
        data: JSON.stringify(data)
    });
    return axios.get(url, {
        params: params
    }).then((res) => {
        console.log("res singer list: ", res);
        return Promise.resolve(res.data)
    }).catch((err) => {
        console.error(err);
    })*/
}


// 6-5 add : 根据不同的歌手的 singerId 获取歌手的详细信息
export function getSingerDetail(singerId) {
    const url = "https://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_track_cp.fcg?";
    const data = Object.assign({}, commonParams, {
        hostUin: 0,
        needNewCode: 0,
        platform: "yqq",
        order: 'listen',
        begin: 0,
        num: 100,
        songstatus: 1,
        singermid: singerId
    });
    return jsonp(url, data, options)


    /*console.log("getSingerDetail 内的接收到的 singerId: ", singerId);
    const url = debug ? "/api/getSingerDetail" : "";
    const params = Object.assign({}, commonParams, {
        loginUin: 0,
        hostUin: 0,
        platform: "yqq",
        needNewCode: 0,
        ct: 24,
        singermid: singerId,
        order: "listen",
        begin: 0,
        num: 10,
    });
    return axios.get(url, {
        params: params
    }).then((res) => {
        return Promise.resolve(res.data)
    }).catch((e) => {
        console.log(e);
    })*/
}
