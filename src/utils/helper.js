/* 
实现函数节流
- 语法: throttle(callback, wait)
- 功能: 创建一个节流函数，在 wait 毫秒内最多执行 `callback` 一次
*/
export function throttle(callback, wait) {
    let start = 0
    // 返回一个事件监听函数(也就是节流函数)
    return function (event) {
        console.log('throttle event')
        // 只有当距离上次处理的时间间隔超过了wait时, 才执行处理事件的函数
        const current = Date.now()
        console.log("start", start);
        if (current - start > wait) {
            callback.call(this, event) // 需要指定this和参数
            start = current
        }
    }
}

/* 
实现函数防抖
- 语法: debounce(callback, wait)
- 功能: 创建一个防抖动函数，该函数会从上一次被调用后，延迟 `wait` 毫秒后调用 `callback`
*/
export function debounce(callback, wait) {
    // 用来保存定时器任务的标识id
    let timeoutId = -1
    // 返回一个事件监听函数(也就是防抖函数)
    return function (event) {
        console.log('debounce event')
        // 清除未执行的定时器任务
        if (timeoutId !== -1) {
            clearTimeout(timeoutId)
        }
        // 启动延迟 await 时间后执行的定时器任务
        timeoutId = setTimeout(() => {
            // 调用 callback 处理事件
            callback.call(this, event)
            // 处理完后重置标识
            timeoutId = -1
        }, wait)
    }
}

/*
去重
    1). from + Set
    2). ... + Set
    说明: 编码简洁
*/
export function unique(array) {
    return [...new Set(array)]
}
/* 
数组扁平化: 取出嵌套数组(多维)中的所有元素放到一个新数组(一维)中
  如: [1, [3, [2, 4]]]  ==>  [1, 3, 2, 4]
*/
/*
方法一: 递归 + reduce() + concat()
*/
export function flatten1(array) {
    return array.reduce((pre, item) => {
        if (Array.isArray(item) && item.some(cItem => Array.isArray(cItem))) {
            return pre.concat(flatten1(item))
        } else {
            return pre.concat(item)
        }
    }, [])
}

/*
方法二: ... + some() + concat()
*/
export function flatten2(array) {
    let arr = [].concat(...array)
    while (arr.some(item => Array.isArray(item))) {
        arr = [].concat(...arr)
    }
    return arr
}
/*
方法三: ES6 flat num为扁平化层次，Infinity表示无论多少层都要转成一维数组
*/
export function flatten3(array, num) {
    return [...array.flat(num)]
}

/* 
深度克隆
1). 大众乞丐版
    问题1: 函数属性会丢失
    问题2: 循环引用会出错
2). 面试基础版本
    解决问题1: 函数属性还没丢失
3). 面试加强版本
    解决问题2: 循环引用正常
4). 面试加强版本2(优化遍历性能)
    数组: while | for | forEach() 优于 for-in | keys()&forEach() 
    对象: for-in 与 keys()&forEach() 差不多
*/

/* 
1). 大众乞丐版
    问题1: 函数属性会丢失
    问题2: 循环引用会出错
*/
export function deepClone1(target) {
    return JSON.parse(JSON.stringify(target))
}

/* 
2). 面试基础版本
    解决问题1: 函数属性没丢失
*/
export function deepClone2(target) {
    if (target !== null && typeof target === 'object') {
        const cloneTarget = target instanceof Array ? [] : {}

        for (const key in target) {
            if (target.hasOwnProperty(key)) {
                cloneTarget[key] = deepClone2(target[key])
            }
        }

        return cloneTarget
    }

    return target
}

/* 
3). 面试加强版本
    解决问题2: 循环引用正常
*/
export function deepClone3(target, map = new Map()) {
    if (target !== null && typeof target === 'object') {
        // 从缓存容器中读取克隆对象
        let cloneTarget = map.get(target)
        // 如果存在, 返回前面缓存的克隆对象
        if (cloneTarget) {
            return cloneTarget
        }
        // 创建克隆对象(可能是{}或者[])  
        cloneTarget = target instanceof Array ? [] : {}
        // 缓存到map中
        map.set(target, cloneTarget)

        for (const key in target) {
            if (target.hasOwnProperty(key)) {
                // 递归调用, 深度克隆对象, 且传入缓存容器map
                cloneTarget[key] = deepClone3(target[key], map)
            }
        }

        return cloneTarget
    }

    return target
}

/* 
4). 面试加强版本2(优化遍历性能)
    数组: while | for | forEach() 优于 for-in | keys()&forEach() 
    对象: for-in 与 keys()&forEach() 差不多
*/
export function deepClone4(target, map = new Map()) {
    if (target !== null && typeof target === 'object') {
        // 从缓存容器中读取克隆对象
        let cloneTarget = map.get(target)
        // 如果存在, 返回前面缓存的克隆对象
        if (cloneTarget) {
            return cloneTarget
        }
        // 创建克隆对象(可能是{}或者[])  
        if (target instanceof Array) {
            cloneTarget = []
            // 缓存到map中
            map.set(target, cloneTarget)
            target.forEach((item, index) => {
                cloneTarget[index] = deepClone4(item, map)
            })
        } else {
            cloneTarget = {}
            // 缓存到map中
            map.set(target, cloneTarget)
            Object.keys(target).forEach(key => {
                cloneTarget[key] = deepClone4(target[key], map)
            })
        }

        return cloneTarget
    }

    return target
}
// 获取元素相对浏览器的位置fixed top left
// 获取相对与视口的偏移量(viewpoint)加上页面的滚动量(scroll)
export function getOffsetRect(ele) {
    var box = ele.getBoundingClientRect();
    var body = document.body,
        docElem = document.documentElement;
    //获取页面的scrollTop,scrollLeft(兼容性写法)
    var scrollTop =
        window.pageYOffset || docElem.scrollTop || body.scrollTop,
        scrollLeft =
        window.pageXOffset || docElem.scrollLeft || body.scrollLeft;
    var clientTop = docElem.clientTop || body.clientTop,
        clientLeft = docElem.clientLeft || body.clientLeft;
    var top = box.top + scrollTop - clientTop,
        left = box.left + scrollLeft - clientLeft;
    return {
        //Math.round 兼容火狐浏览器bug
        top: Math.round(top),
        left: Math.round(left)
    };
}

// 获取相对与document的偏移量
export function getOffsetSum(ele) {
    var top = 0,
        left = 0;
    while (ele) {
        top += ele.offsetTop;
        left += ele.offsetLeft;
        ele = ele.offsetParent;
    }
    return {
        top: top,
        left: left
    }
}

export const loadJS = (url) =>
    new Promise(function (resolve, reject) {
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = url;
        document.body.appendChild(script);
        script.onload = function () {
            resolve(`success: ${url}`);
        };
        script.onerror = function () {
            reject(Error(`${url} load error!`));
        };
    });