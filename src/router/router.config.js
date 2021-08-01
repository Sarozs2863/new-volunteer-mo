export const constantRouterMap = [
    {
        path: '/',
        component: () => import('@/views/HomePage'),
        meta: {
            title: '志愿者服务',
            keepAlive: false
        }
    },
    {
        path: '/test',
        component: () => import('@/views/Test.vue')
    }
];
