export const constantRouterMap = [
	// 主页面
	{
		path: '/',
		component: () => import('@/views/Home/index'),
		meta: {
			title: '志愿者服务',
			keepAlive: true
		}
	},
	// 提交工时
	{
		path: '/approveAct',
		name: 'ApproveAct',
		component: () => import('@/views/approveAct'),
		meta: { title: '志愿者服务 - 工时提交', keepAlive: false }
	},
	// 活动招募页面
	{
		path: '/actrecruit',
		component: () => import('@/views/ActRecruit/ActRecruit.vue'),
		meta: {
			title: '志愿者服务 - 活动招募',
			keepAlive: false
		}
	},
	// 活动招募详情页面
	{
		path: 'recruitdetails',
		name: 'recruitDetails',
		component: () => import('@/views/ActRecruit/recruitActDetails.vue'),
		meta: {
			title: '志愿者服务 - 活动招募',
			keepAlive: false
		}
	},
	// 活动招募详情页面
	{
		path: 'myactdetails',
		name: 'myActDetails',
		component: () => import('@/views/ActRecruit/myActDetails.vue'),
		meta: {
			title: '志愿者服务 - 活动招募',
			keepAlive: false
		}
	},
	// 信用等级页面
	{
		path: '/creditlevel',
		component: () => import('@/views/CreditLevel'),
		meta: {
			title: '志愿者服务 - 信用等级',
			keepAlive: false
		}
	},
	// 工时概览页面
	{
		path: '/mytimes',
		component: () => import('@/views/MyVolTime'),
		meta: {
			title: '志愿者服务 - 工时概览',
			keepAlive: false
		}
	},
	// 志愿者活动列表
	{
		path: '/actList',
		name: 'AllActList',
		component: () => import('@/views/AllActList'),
		meta: { title: '志愿者服务 - 活动列表', keepAlive: false }
	},
	// 违规举报页面
	{
		path: '/report',
		component: () => import('@/views/report/Reasons'),
		meta: {
			title: '志愿者服务 - 举报详情',
			keepAlive: false
		}
	},
	{
		path: 'details',
		name: 'Details',
		component: () => import('@/views/report/Details')
	},
	// 举报记录页面
	{
		path: '/reportlist',
		component: () => import('@/views/reportList/ReportList'),
		meta: {
			title: '志愿者服务 - 举报记录',
			keepAlive: false
		}
	},
	// 404页面
	{
		path: '/404',
		name: 'NotFound',
		component: () => import('@/views/NotFound.vue')
	},
	// 404页面
	{
		path: '*',
		name: 'NotFound',
		component: () => import('@/views/NotFound.vue')
	}
];
