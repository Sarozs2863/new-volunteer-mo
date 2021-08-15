import request from './request';

// 提交举报信息
function commitReport(params, data) {
	return request({
		url: '/inform/insert',
		method: 'POST',
		hideloading: true, // vant 加载效果
		params,
		data
	});
}
export { commitReport };
