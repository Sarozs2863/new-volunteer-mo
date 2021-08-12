import request from './request';

// 提交举报信息
function commitReport(params, files) {
	const file = new FormData();
	console.log(files);
	for (let i = 0; i <= files.length; i++) {
		file.append('file', files[i].file);
	}
	return request({
		url: '/inform/insert',
		method: 'POST',
		hideloading: true, // vant 加载效果
		params,
		data: files
	});
}
export { commitReport };
