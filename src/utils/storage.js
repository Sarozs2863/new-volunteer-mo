// 命名空间区分不同项目或模块的localStorage

const namespace = "mobile";
function saveItem (key, value) {
    // 命名空间作为key，键值对（key-val）都是字符串，需要将字符串类型的value 转换为 对象类型
    let storage = window.localStorage.getItem(namespace);
    if(!storage) {
        storage = {}; // 若 storage 不存在，初始化
    } else {
        storage = JSON.parse(storage);
    }

    storage[key] = value;
    window.localStorage.setItem(namespace, JSON.stringify(storage));
}

function loadItem (key, def) {
    let storage = window.localStorage.getItem(namespace);
    if(!storage) {
        return def; //def 默认值
    } 
    storage = JSON.parse(storage);
    let res = storage[key];
    return res || def;
}

export {
    saveItem,
    loadItem
}