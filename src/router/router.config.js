export const constantRouterMap = [
  // 主页面
  {
    path: '/',
    component: () => import('@/views/HomePage'),
    meta: {
      title: '志愿者服务',
      keepAlive: false
    }
  },
  // 提交工时
  {
    path: '/approveAct',
    name: 'ApproveAct',
    component: () => import('@/views/approveAct'),
    meta: { title: '工时提交 - 志愿者服务', keepAlive: false }
  },
  {
    path: '/test',
    component: () => import('@/views/Test.vue')
  },
  // 活动招募页面
  {
    path: '/actrecruit',
    component: () => import('@/views/ActRecruit'),
    meta: {
      title: '志愿者服务-活动招募',
      keepAlive: false
    }
  },
  // 信用等级页面
  {
    path: '/creditlevel',
    component: () => import('@/views/CreditLevel')
  },
  // 工时概览页面
  {
    path: '/mytimes',
    component: () => import('@/views/MyVolTime')
  },
  // 违规举报页面
  {
    path: '/reasons',
    component: () => import('@/views/report/Reasons')
  },
  // 举报记录页面
  {
    path: '/reportlist',
    component: () => import('@/views/ReportList')
  },
  // 404页面
  {
    path: '*',
    name: 'NotFound',
    component: () => import('@/views/NotFound.vue')
  }
];
