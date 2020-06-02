let page = document.querySelector('#page');

// - 路由的基本结构, 即 `hash` 模式和 `history` 模式都需要用的基类
export class BaseRouter {
    // - list 即路由列表, 即上面的 ROUTERS 对象
    constructor(list) {
        this.list = list;
    }

    // - 页面渲染函数
    render(state) {
        let ele = this.list.find(ele => ele.path === state);
        ele = ele ? ele: this.list.find(ele => ele.path === '*');
        page.innerHTML = ele.component;
    }
} 