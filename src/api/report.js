import request from './request';

// 提交举报信息
function commitReport(params, data) {
	return request({
		// url: '/inform/insert',
		url: '/report/addReportInfo',
		method: 'POST',
		hideloading: true, // vant 加载效果
		params,
		data
	});
}

// 根据学号获取举报记录
function getReportList() {
	return request({
		// url: '/inform/listByNum',
		url: '/report/getBriefInfoList',
		method: 'GET',
		hideloading: false
	});
}
// 根据活动id撤销举报
function cancelReport(reportID) {
	return request({
		// url: '/inform/delete',
		url: '/report/withdraw',
		method: 'PUT',
		hideloading: false,
		params: {
			id: reportID
		}
	});
}
export { commitReport, getReportList, cancelReport };
