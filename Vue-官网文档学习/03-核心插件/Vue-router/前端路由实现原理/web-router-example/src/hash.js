import {BaseRouter} from './base';

export class HashRouter extends BaseRouter {
    constructor(list) {
        super(list);
        this.handler();
        // - 监听 hashchange
        let that = this;
        window.addEventListener('hashchange', function(event){
            that.handler();
        }, false)
    }

    // - hash 改变时, 重新渲染页面
    handler() {
        this.render(this.getState());
    }
    // - 获取 hash 值 (即获取当前页面的 hash 值)
    getState() {
        const hash = window.location.hash;
        return hash ? hash.slice(1) : '/';
    }
    // - 这个方法在类外调用, 推入(push) hash 值
    push(path) {
        window.location.hash = path;
    }
    // - 获取默认页 url
    getUrl(path) {
        // - 取得当前页面的 href, 可以简写为
        //   location.href = window.location
        const href = window.location.href;
        const i = href.indexOf('#');
        // - 这里的 href.slice(0, i) 因为写成了 (0, 1) 这个错误改了很久,
        //   意思是: 当前 href 中如果包含 # 的话, 就利用字符串的 slice()
        //   方法, 截取到 # 号之前的部分;
        const base = i >= 0 ? href.slice(0, i) : href;
        return base + '#' + path;
    }
    // - 替换页面
    replace(path) {
        console.log('replace(path):', path);
        window.location.replace(this.getUrl(path));
    }
    // - 前进 或 后退浏览历史
    go(n) {
        window.history.go(n);
    }
}