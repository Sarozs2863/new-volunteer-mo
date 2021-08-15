import request from './request';

// 提交举报信息
function commitReport(params, data) {
	// const form = new FormData();
	// console.log(files);
	// for (let i = 0; i < files.length; i++) {
	// 	form.append('file', files[i].file);
	// }
	return request({
		url: '/inform/insert',
		method: 'POST',
		hideloading: true, // vant 加载效果
		params,
		data
	});
}
// 根据学号获取举报记录
function getReportList() {
	return request({
		url: '/inform/listByNum',
		method: 'POST',
		hideloading: false
	});
}
// 根据活动id撤销举报
function cancelReport(reportID) {
	return request({
		url: '/inform/delete',
		method: 'GET',
		hideloading: false,
		params: {
			id: reportID
		}
	});
}
export { commitReport, getReportList, cancelReport };
