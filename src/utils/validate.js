export function isExternal(path) {
	return /^(https?:|mailto:|tel:)/.test(path);
}

export function validUsername(str) {
	const valid_map = ['admin', 'editor'];
	return valid_map.indexOf(str.trim()) >= 0;
}

export function isQQ(str) {
	const reg = /^[1-9][0-9]{4,10}$/;
	return reg.test(str);
}

export function isIdCard(str) {
	// 大陆
	let reg1=/^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/
	// 香港
	let reg2 = /^[A-Z]{1,2}[0-9]{6,10}[0-9A-Z]$/
	// 澳门
	let reg3 = /^[1|5|7][0-9]{6}[0-9A-Z]$/
	// 台湾
	let reg4 = /^[a-zA-Z][0-9]{9}$/
	
	// const reg1 = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
	//   const reg2 = /(\d{3})(\*{4})(\d{3})(\*{4})(\d{4})/
	return reg1.test(str)||reg2.test(str)||reg3.test(str)||reg4.test(str);
}

export function isPhone(str) {
	const reg1 = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;

	//   const reg2 = /([\d{3}]+\*{4}[\d{4}])/
	//   return reg1.test(str) || reg2.test(str)
	return reg1.test(str);
}
