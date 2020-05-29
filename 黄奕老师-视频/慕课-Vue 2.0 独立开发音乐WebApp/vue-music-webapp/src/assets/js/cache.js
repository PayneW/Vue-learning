// 10-12 created: 保存搜索历史


// --save 会把安装的依赖保存到 dependencies
// --save-dev 把依赖保存到 devDependencies 中.
// npm 自己的文档说 dependencies 是运行时依赖，devDependencies 是开发时依赖。

// 安装操作 localStorage 的库: npm install good-storage --save
import storage from "good-storage";

const SEARCH_KEY = "__search__";
// 最大只能存 15 条数据
const SEARCH_MAX_LENGTH = 15;


function insertArray(arr, val, compare, maxLen) {
    // ES6 的数组方法 findIndex() 返回查找到的值的索引。这个方法都接受2个参数:
    // 1.一个回调函数; 2.可选参数，用于指定回调函数中 this 的值。 执行回调函数时，传入的参数分别为:
    // (1). 数组中的某个元素; (2).该元素在数组中的索引; (3).数组本身. 与传入 map() 和
    // forEach() 方法的参数相同。如果给定的值满足定义的标准，回调函数应返回 true, 一旦回调函数返回 true，
    // find() 和 findIndex() 方法都会立即停止搜索数组剩余的部分。
    const index = arr.findIndex(compare);
    if (index === 0) return;
    if (index > 0) {
        arr.splice(index, 1);
    }
    // 把当前 val 推入到数组的开头
    arr.unshift(val);
    if (maxLen && arr.length > maxLen) {
        arr.pop();
    }
}

// query 参数为当前要保存的搜索结果
export function saveSearch(query) {
    // 当前的列表，默认没有存过就是一个空数组
    let searches = storage.get(SEARCH_KEY, []);

    // insertArray() 方法就是把 query 值插入到本地存储中，但是其内还是做了一些判断，详见上面的方法内部
    insertArray(searches, query, (item) => {
        return item === query;
    }, SEARCH_MAX_LENGTH);

    // 通过上面 insertArray 方法后，searches 已经是一个保存了要插入本地缓存的值，然后调用 storage
    // 插件的 set 方法，把 searches 设置到 localStorage 中
    storage.set(SEARCH_KEY, searches);

    // 最后把 searches 返回
    return searches;
}

// 10-13 导出一个 loadSearch 方法，给 vuex 中的 state.searchHistory 使用，就是说
export function loadSearch() {
    return storage.get(SEARCH_KEY, []);
}


// 10-15
function deleteFromArray(arr, compare) {
    const index = arr.findIndex(compare);
    if (index > -1) {
        arr.splice(index, 1);
    }
}

// 10-15 删除搜索历史列表
export function deleteSearch(query) {
    let searches = storage.get(SEARCH_KEY, []);
    deleteFromArray(searches, (item) => {
        return item === query
    });
    // 保存删除后的数组
    storage.set(SEARCH_KEY, searches);
    return searches;
}

// 10-15 add: 清楚搜索历史列表
export function clearSearch() {
    storage.remove(SEARCH_KEY);
    return [];
}



// 11-13 add: 保存播放历史到本地存储。 首先定义一个保存到 localstorage 对象
// 中的属性 key 名
const PLAY_KEY = "__play__";
// 最多显示 200 条播放历史
const PLAY_MAX_LENGTH = 200;

// 11-13 保存播放列表
export function savePlay(song) {
    let songs = storage.get(PLAY_KEY, []);
    insertArray(songs, song, (item) => {
        return item.id === song.id;
    }, PLAY_MAX_LENGTH);
    storage.set(PLAY_KEY, songs);
    return songs;
}
// 读取播放列表
export function loadPlay() {
    return storage.get(PLAY_KEY, []);
}
