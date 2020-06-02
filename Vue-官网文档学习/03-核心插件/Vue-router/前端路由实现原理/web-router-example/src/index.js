import { HashRouter } from './hash';
import { HistoryRouter } from './history';
import { ROUTES } from './routes';

class WebRouter {
    // - {mode = 'hash', routes} 为默认参数写法
    // - mode = 'hash' 为具名参数
    constructor({mode = 'hash', routes}) {
        this.router = mode === 'hash'
            ? new HashRouter(routes)
            : new HistoryRouter(routes)
    }
    push(path) {
        this.router.push(path);
    }
    replace(path) {
        this.router.replace(path);
    }
    go(num) {
        this.router.go(num);
    }
}

// - 声明路由模式 hash/history
const MODE = 'hash';
const webRouter = new WebRouter({
    mode: MODE,
    routes: ROUTES
});

// - tip: 把事件绑定到 ul 上使用了 "事件委托"
document.querySelector('.link-list').addEventListener(
    'click',
    function(event) {
        if (event.target.tagName === 'LI') {
            // - 获取 li 上的 data-url 自定义属性, html5 规定,
            //   元素上的自定义属性以 data- 开头
            const url = event.target.dataset.url;
            console.log('url: ', url);
            // - 如果 data-url 的值带有 "/", 就根据当前的 MODE 模式,
            //   分别调用 HashRouter / HistoryRouter 中的 push()
            //   方法(注意: 两种模式内的 push 方法的实现是不一样的.)
            //   否则调用 go() 方法.
            !url.indexOf('/')
                ? webRouter.push(url)
                : webRouter.go(url);
        }
    },
    false
);

document.querySelector('.replace-btn').addEventListener(
    'click',
    function(event) {
        console.log("replace-btn click event")
        webRouter.replace('/');
    },
    false
)