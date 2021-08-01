export const constantRouterMap = [
    {
        path: '/',
        component: () => import('@/views/index'),
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
