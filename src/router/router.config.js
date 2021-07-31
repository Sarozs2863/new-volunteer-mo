export const constantRouterMap = [
    {
        path: '/',
        component: () => import('@/views/index'),
        meta: {
            title: 'home',
            keepAlive: false
        }
    },
    {
        path: '/test',
        component: () => import('@/views/Test.vue')
    }
];
