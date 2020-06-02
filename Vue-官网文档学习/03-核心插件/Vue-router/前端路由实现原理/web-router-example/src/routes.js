// - 既然是做前端路由, 那么就先规定路由的格式:
export const ROUTES = [
    {
        path: '/',
        name: 'index',
        component: 'This is index page'
    },
    {
        path: '/page1',
        name: 'page1',
        component: 'This is page1...'
    },
    {
        path: '/page2',
        name: 'page2',
        component: 'This is page2...'
    },
    {
        path: '*',
        name: 'notFound',
        component: '404 NOT FOUND'
    }
];