// 5-3 歌手数据处理和 Singer 类的封装
export default class Singer {
    constructor({id, name}) {
        this.id = id;
        this.name = name;
        this.avatar = `https://y.gtimg.cn/music/photo_new/T001R300x300M000${id}.jpg?max_age=2592000`
    }
}


// ES5 类的写法
function SingerES5(obj) {
    this.id = obj.id;
    this.name = obj.name;
    this.avatar = "https://y.gtimg.cn/music/photo_new/T001R300x300M000" + obj.id + ".jpg?max_age=2592000";
}
