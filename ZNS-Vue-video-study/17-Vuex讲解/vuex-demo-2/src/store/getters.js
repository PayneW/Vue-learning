export default {
    countNum: (state) => {
        return state.count;
    },
    oddOrEven(state) {
        return state.count % 2 === 0 ? "偶数" : "奇数";
    }
}