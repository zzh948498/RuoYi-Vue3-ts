// 首字母大小
export function titleCase(str: string) {
    return str.replace(/( |^)[a-z]/g, L => L.toUpperCase());
}

// 下划转驼峰
export function camelCase(str: string) {
    return str.replace(/_[a-z]/g, str1 => str1.substr(-1).toUpperCase());
}

export function isNumberStr(str: string) {
    return /^[+-]?(0|([1-9]\d*))(\.\d+)?$/g.test(str);
}
