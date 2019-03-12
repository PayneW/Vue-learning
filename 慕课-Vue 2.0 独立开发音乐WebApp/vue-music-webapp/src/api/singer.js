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

   /* const url = debug ? "/getSingerList": "" ;
    const data = {
        "-": "getUCGI9005210658149876",
        g_tk: 5381,
        loginUin: 0,
        hostUin: 0,
        format: "json",
        inCharset: "utf-8",
        outCharset: "utf-8",
        notice: 0,
        platform: "yqq.json",
        needNewCode: 0,
        data: '{"comm":{"ct":24,"cv":0},"singerList":{"module":"Music.SingerListServer","method":"get_singer_list","param":{"area":-100,"sex":-100,"genre":-100,"index":-100,"sin":0,"cur_page":1}}}'
    };

    return axios.get(url, {
        params: data
    }).then((res) => {
        console.log("res singer list: ", res);
        return Promise.resolve(res.data)
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

    /*const url = debug ? "/getSingerDetail" : "";
    const data = {
        g_tk: 5381,
        loginUin: 0,
        hostUin: 0,
        format: "json",
        inCharset: "utf-8",
        outCharset: "utf-8",
        notice: 0,
        platform: "yqq.json",
        needNewCode: 0,
        ct: 24,
        singermid: singerId,
        order: "listen",
        begin: 0,
        num: 30,
        songstatus: 1
    };
    return axios.get(url, {
        params: data
    }).then((res) => {
        return Promise.resolve(res.data)
    }).catch((e) => {
        console.log(e);
    })*/
}
