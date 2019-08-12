function hj_trim(str) {
    return str.replace(/(^\s*)|(\s*$)/g,"");
}

/**
 * 邮箱
 * @param {*} s
 */
function isEmail (s) {
    return /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((.[a-zA-Z0-9_-]{2,3}){1,2})$/.test(s)
}

/**
 * 手机号码
 * @param {*} s
 */
function isMobile (s) {
    return /^1[0-9]{10}$/.test(s)
}

/**
 * 电话号码
 * @param {*} s
 */
function isPhone (s) {
    return /^([0-9]{3,4}-)?[0-9]{7,8}$/.test(s)
}

/**
 * URL地址
 * @param {*} s
 */
function isURL (s) {
    return /^http[s]?:\/\/.*/.test(s)
}

/**
 * 复制对象
 */
function copyObject(sourceObject) {
    if(sourceObject == null || sourceObject == undefined){
        return null;
    }
    var copy = {};
    for(var key in sourceObject){
        // console.info(key);
        copy[key] = sourceObject[key]
    }
    // console.info(copyObject);
    return copy;
}

/**
 * 复制对象,对于数组的支持
 */
function copyObjectOrArray(sourceObject) {
    // if(sourceObject == null || sourceObject == undefined){
    //     return null;
    // }
    // if(sourceObject instanceof Array){
    //     var cp = [];
    //     if(sourceObject.length > 0){
    //         for(var i = 0; i < sourceObject.length; i++){
    //             cp.push(copyObjectOrArray(sourceObject[i]));
    //         }
    //         return cp;
    //     }else{
    //         return cp;
    //     }
    // }else if(sourceObject instanceof Object){
    //     return copyObject(sourceObject);
    // }else{
    //     return sourceObject;
    // }
    return deepClone(sourceObject);
}

function deepClone(source) {
    var cloneObj = Array.isArray(source) ? [] : {};
    if(source && typeof source === "object"){
        for(var key in source){
            if(source.hasOwnProperty(key)){
                //判断source子元素是否为对象，如果是，递归复制
                if(source[key] && typeof source[key] === "object"){
                    cloneObj[key] = deepClone(source[key]);
                }else{
                    cloneObj[key] = source[key];
                }
            }
        }
    }
    return cloneObj;
}

/**
 * 创建FormData
 */
function createFormData(sourceObject) {
    var formData = new FormData();
    if(sourceObject == null || sourceObject == undefined){
        return formData;
    }
    if(sourceObject instanceof Object){
        for(var key in sourceObject){
            // console.info(key);
            if(sourceObject[key] instanceof Array){

            }else{
                if(sourceObject[key] != null && sourceObject[key] != '' && sourceObject[key] != undefined){
                    formData.append(key,sourceObject[key]);
                }
            }
        }
    }
    return formData;
}
