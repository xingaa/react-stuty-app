const List = [{}, {}, {}]

export function isBusinessReeor(code) {
    // code数组
    const codeList = List.map(item => {
        return item.code
    })
    // 是否含有code,flag为布尔值1
    const flag = codeList.includes(code)
    return flag
}