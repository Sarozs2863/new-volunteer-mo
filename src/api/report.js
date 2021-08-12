import request from './request';

function commitReport(params) {
    return request({
        url: '/inform/insert',
        method: 'POST',
        hideloading: true, // vant 加载效果
        params
    });
}

export {
    commitReport
}