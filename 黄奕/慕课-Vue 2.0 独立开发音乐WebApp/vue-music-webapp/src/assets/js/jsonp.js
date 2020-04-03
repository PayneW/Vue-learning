import originJSONP from "Vue-learning/黄奕/慕课-Vue 2.0 独立开发音乐WebApp/vue-music-webapp/src/assets/js/jsonp";

// 对安装的 jsonp 库进行二次封装，以便更方便的使用
export default function jsonp(url, data, option) {
    // 这里的写法和 js-sundry-goods\JS-实现效果\手写JSONP\jsonp.html
    url += (url.indexOf("?") === -1 ? "?" : "&") + param(data);

    return new Promise((resolve, reject) => {
        originJSONP(url, option, (err, data) => {
            if(!err) {
                resolve(data)
            } else {
                reject(err)
            }
        })
    })
}

function param(data) {
    let str = "";
    for (var k in data) {
        // 如果 key 的 value 为 undefined 就赋值为空值
        let value = data[k] !== undefined ? data[k] : "";
        // url += `&${k} = ${encodeURIComponent(value)}`;
        str += "&" + k + "=" + encodeURIComponent(value);
    }
    // 上面拼接完成后，如果 data 包含键值对，我们就去除拼接好的的第一个 & 符号
    // url.substring(1) 提取 str 索引从 1 处开始的字符串; 如果 data 为空
    // 就把 "" 空值赋值给 url
    return str ? str.substring(1): ""
}

