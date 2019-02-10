export default function(time) {
    if (time) {
        let oDate = new Date();
        oDate.setTime(time);

        let y = oDate.getFullYear();
        let m = oDate.getMonth() + 1;
        let d = oDate.getDate();

        let h = oDate.getHours();
        let mm = oDate.getMinutes();
        let s = oDate.getSeconds();

        return y + '-' + m + '-' + d + ' ' + h + ':' + mm + ':' + s;
    }
}