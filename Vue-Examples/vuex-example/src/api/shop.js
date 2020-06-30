/*
 * Mocking client-server processing (模拟客户端-服务器处理)
 */ 
const _products = [
    {"id": 1, "title": "ipad 4 Mini", "price": 500.01, "inventory": 2},
    {"id": 2, "title": "H&M T-Shirt White", "price": 10.99, "inventory": 10},
    {"id": 3, "title": "Charli XCX - Sucker CD", "price": 19.99, "inventory": 5}
];

export default {
    // - 取得商品
    getProducts(cb) {
        setTimeout(() => cb(_products), 100)
    },

    buyProducts(products, cb, errorCb) {
        setTimeout(() => {
            // - simulate random checkout failure.(模拟随你结账失败)
            (Math.random() > 0.5 || navigator.webdriver)
                ? cb()
                : errorCb()
        }, 100)
    }
}