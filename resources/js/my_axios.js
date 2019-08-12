// var Base_URL = "http://192.168.10.11/api";
axios.defaults.timeout = process.AXIOS.defaults.timeout;
/* 封装axios */
var get_head = function (url, params, headers, _this, isReTry) {
    headers.token = process.token;
    return axios.get(process.Base_URL + url,
        {
            headers: headers,
            params: params
        }
    ).then(function (res) {
        //对返回的数据res进行处理的逻辑
        if (process.env.NODE_ENV != "prod") {
            console.log(">>>>>>>>>>>>", res)
        }
        if (res.status == 200) {
            if (res.data.status == '200') {
                // _this.$message({message: res.data.message, type: 'success'});
                return res.data.record;
            } else {
                show_error(res.data.message, res.data.stack, _this);
                // _this.$message.error(res.data.message);
                // _this.$message({message: res.data.message,type: 'success'});
            }
        } else {
            if (isReTry != undefined && isReTry) {
                show_error("接口调用失败", '', _this);
            } else {
                //重试
                return retryFunction(get_head, url, params, headers, _this);
            }
        }
        return false;
    }).catch(function (e) {
        var message = e.message;
        if (process.env.NODE_ENV != "prod") {
            console.log("log>>>>", e.message);
        }
        if (isReTry != undefined && isReTry) {
            if (message != undefined && message.indexOf("timeout") > -1) {
                // _this.$message.error(process.message.timeout + "：" + message);
                show_error(process.message.timeout + "：" + message, '', _this);
            } else if (message != undefined && message.indexOf("404") > -1) {
                // _this.$message.error("404：" + message + "["+url+"]");
                show_error("404：" + message + "[" + url + "]", '', _this);
            }
            return false;
        } else {
            //重试
            return retryFunction(get_head, url, params, headers, _this);
        }
    })
};

var post_head = function (url, params, headers, _this, isReTry) {
    headers.token = process.token;
    return axios.post(process.Base_URL + url,
        Qs.stringify(params),
        {
            headers: headers
        }
    ).then(function (res) {
        //对返回的数据res进行处理的逻辑
        if (process.env.NODE_ENV != "prod") {
            console.log(">>>>>>>>>>>>", res)
        }
        if (res.status == 200) {
            if (res.data.status == '200') {
                show_success(res.data.message, _this);
                // _this.$message({message: res.data.message, type: 'success'});
                return res.data.record;
            } else {
                show_error(res.data.message, res.data.stack, _this);
                // _this.$message.error(res.data.message);
                // _this.$message({message: res.data.message,type: 'success'});
            }
            return false;
        } else {
            if (isReTry != undefined && isReTry) {
                show_error("接口调用失败", '', _this);
            } else {
                //重试
                return retryFunction(get_head, url, params, headers, _this);
            }
        }
    }).catch(function (e) {
        var message = e.message;
        if (process.env.NODE_ENV != "prod") {
            console.log("log>>>>", e.message);
        }
        if (isReTry != undefined && isReTry) {
            if (message != undefined && message.indexOf("timeout") > -1) {
                // _this.$message.error(process.message.timeout + "：" + message);
                show_error(process.message.timeout + "：" + message, '', _this);
            } else if (message != undefined && message.indexOf("404") > -1) {
                // _this.$message.error("404：" + message + "["+url+"]");
                show_error("404：" + message + "[" + url + "]", '', _this);
            }
            return false;
        } else {
            //重试
            return retryFunction(get_head, url, params, headers, _this);
        }
    })
}

var post_head_upload = function (url, params, headers, _this, isReTry) {
    headers.token = process.token;
    return axios.post(process.Base_URL + url,
        params,
        {
            headers: headers
        }
    ).then(function (res) {
        //对返回的数据res进行处理的逻辑
        if (process.env.NODE_ENV != "prod") {
            console.log(">>>>>>>>>>>>", res)
        }
        if (res.status == 200) {
            if (res.data.status == '200') {
                show_success(res.data.message, _this);
                // _this.$message({message: res.data.message, type: 'success'});
                return res.data.record;
            } else {
                show_error(res.data.message, res.data.stack, _this);
                // _this.$message.error(res.data.message);
                // _this.$message({message: res.data.message,type: 'success'});
            }
        } else {
            if (isReTry != undefined && isReTry) {
                show_error("接口调用失败", '', _this);
            } else {
                //重试
                return retryFunction(get_head, url, params, headers, _this);
            }
        }
        return false;
    }).catch(function (e) {
        var message = e.message;
        if (process.env.NODE_ENV != "prod") {
            console.log("log>>>>", e.message);
        }
        if (isReTry != undefined && isReTry) {
            if (message != undefined && message.indexOf("timeout") > -1) {
                // _this.$message.error(process.message.timeout + "：" + message);
                show_error(process.message.timeout + "：" + message, '', _this);
            } else if (message != undefined && message.indexOf("404") > -1) {
                // _this.$message.error("404：" + message + "["+url+"]");
                show_error("404：" + message + "[" + url + "]", '', _this);
            }
            return false;
        } else {
            //重试
            return retryFunction(get_head, url, params, headers, _this);
        }
    })
}

var put_head = function (url, params, headers, _this, isReTry) {
    headers.token = process.token;
    return axios.put(process.Base_URL + url,
        Qs.stringify(params),
        {
            headers: headers
        }
    ).then(function (res) {
        //对返回的数据res进行处理的逻辑
        if (process.env.NODE_ENV != "prod") {
            console.log(">>>>>>>>>>>>", res)
        }
        if (res.status == 200) {
            if (res.data.status == '200') {
                show_success(res.data.message, _this);
                // _this.$message({message: res.data.message, type: 'success'});
                return res.data.record;
            } else {
                show_error(res.data.message, res.data.stack, _this);
                // _this.$message.error(res.data.message);
                // _this.$message({message: res.data.message,type: 'success'});
            }
        } else {
            if (isReTry != undefined && isReTry) {
                show_error("接口调用失败", '', _this);
            } else {
                //重试
                return retryFunction(get_head, url, params, headers, _this);
            }
        }
        return false;
    }).catch(function (e) {
        var message = e.message;
        if (process.env.NODE_ENV != "prod") {
            console.log("log>>>>", e.message);
        }
        if (isReTry != undefined && isReTry) {
            if (message != undefined && message.indexOf("timeout") > -1) {
                // _this.$message.error(process.message.timeout + "：" + message);
                show_error(process.message.timeout + "：" + message, '', _this);
            } else if (message != undefined && message.indexOf("404") > -1) {
                // _this.$message.error("404：" + message + "["+url+"]");
                show_error("404：" + message + "[" + url + "]", '', _this);
            }
            return false;
        } else {
            //重试
            return retryFunction(get_head, url, params, headers, _this);
        }
    })
}

var put_head_upload = function (url, params, headers, _this, isReTry) {
    headers.token = process.token;
    return axios.put(process.Base_URL + url,
        params,
        {
            headers: headers
        }
    ).then(function (res) {
        //对返回的数据res进行处理的逻辑
        if (process.env.NODE_ENV != "prod") {
            console.log(">>>>>>>>>>>>", res)
        }
        if (res.status == 200) {
            if (res.data.status == '200') {
                show_success(res.data.message, _this);
                // _this.$message({message: res.data.message, type: 'success'});
                return res.data.record;
            } else {
                show_error(res.data.message, res.data.stack, _this);
                // _this.$message.error(res.data.message);
                // _this.$message({message: res.data.message,type: 'success'});
            }
        } else {
            if (isReTry != undefined && isReTry) {
                show_error("接口调用失败", '', _this);
            } else {
                //重试
                return retryFunction(get_head, url, params, headers, _this);
            }
        }
        return false;
    }).catch(function (e) {
        var message = e.message;
        if (process.env.NODE_ENV != "prod") {
            console.log("log>>>>", e.message);
        }
        if (isReTry != undefined && isReTry) {
            if (message != undefined && message.indexOf("timeout") > -1) {
                // _this.$message.error(process.message.timeout + "：" + message);
                show_error(process.message.timeout + "：" + message, '', _this);
            } else if (message != undefined && message.indexOf("404") > -1) {
                // _this.$message.error("404：" + message + "["+url+"]");
                show_error("404：" + message + "[" + url + "]", '', _this);
            }
            return false;
        } else {
            //重试
            return retryFunction(get_head, url, params, headers, _this);
        }
    })
}


var delete_head = function (url, params, headers, _this, isReTry) {
    headers.token = process.token;
    return axios.delete(process.Base_URL + url,
        {
            headers: headers,
            params: params
        }
    ).then(function (res) {
        //对返回的数据res进行处理的逻辑
        if (process.env.NODE_ENV != "prod") {
            console.log(">>>>>>>>>>>>", res)
        }
        if (res.status == 200) {
            if (res.data.status == '200') {
                show_success(res.data.message, _this);
                // _this.$message({message: res.data.message, type: 'success'});
                return res.data.record;
            } else {
                show_error(res.data.message, res.data.stack, _this);
                // _this.$message.error(res.data.message);
                // _this.$message({message: res.data.message,type: 'success'});
            }
        } else {
            if (isReTry != undefined && isReTry) {
                show_error("接口调用失败", '', _this);
            } else {
                //重试
                return retryFunction(get_head, url, params, headers, _this);
            }
        }
        return false;
    }).catch(function (e) {
        var message = e.message;
        if (process.env.NODE_ENV != "prod") {
            console.log("log>>>>", e.message);
        }
        if (isReTry != undefined && isReTry) {
            if (message != undefined && message.indexOf("timeout") > -1) {
                // _this.$message.error(process.message.timeout + "：" + message);
                show_error(process.message.timeout + "：" + message, '', _this);
            } else if (message != undefined && message.indexOf("404") > -1) {
                // _this.$message.error("404：" + message + "["+url+"]");
                show_error("404：" + message + "[" + url + "]", '', _this);
            }
            return false;
        } else {
            //重试
            return retryFunction(get_head, url, params, headers, _this);
        }
    })
}


var down_head = function (url, params, headers, _this, isReTry) {
    headers.token = process.token;
    return axios.get(process.Base_URL + url,
        {
            headers: headers,
            params: params,
            responseType:'blob'
        }
    ).then(function (res) {
        //对返回的数据res进行处理的逻辑
        if (process.env.NODE_ENV != "prod") {
            console.log(">>>>>>>>>>>>", res)
        }
        if(!res){
            return false;
        }
        var href = window.URL.createObjectURL(new Blob([res.data]));
        var link = document.createElement('a');
        link.style.display = 'none';
        link.href = href;
        link.setAttribute("download",params.filePath.substring(params.filePath.lastIndexOf("/")));

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        window.URL.revokeObjectURL(href);//释放blob对象
        // if (res.status == 200) {
        //     if (res.data.status == '200') {
        //         // _this.$message({message: res.data.message, type: 'success'});
        //         return res.data.record;
        //     } else {
        //         show_error(res.data.message, res.data.stack, _this);
        //         // _this.$message.error(res.data.message);
        //         // _this.$message({message: res.data.message,type: 'success'});
        //     }
        // } else {
        //     if (isReTry != undefined && isReTry) {
        //         show_error("接口调用失败", '', _this);
        //     } else {
        //         //重试
        //         return retryFunction(get_head, url, params, headers, _this);
        //     }
        // }
        return false;
    }).catch(function (e) {
        var message = e.message;
        if (process.env.NODE_ENV != "prod") {
            console.log("log>>>>", e.message);
        }
        if (isReTry != undefined && isReTry) {
            if (message != undefined && message.indexOf("timeout") > -1) {
                // _this.$message.error(process.message.timeout + "：" + message);
                show_error(process.message.timeout + "：" + message, '', _this);
            } else if (message != undefined && message.indexOf("404") > -1) {
                // _this.$message.error("404：" + message + "["+url+"]");
                show_error("404：" + message + "[" + url + "]", '', _this);
            }
            return false;
        } else {
            //重试
            return retryFunction(get_head, url, params, headers, _this);
        }
    });
};

var retryFunction = function (fun, url, params, headers, _this) {
    var isReTry = true;
    return fun(url, params, headers, _this, isReTry);
}

var showStackDetail = function (div_id) {
    document.getElementById(div_id).style.display = "block";
}

// var show_success = function (message, _this) {
//     _this.$notify({title: '成功', message: message, type: 'success'});
// };

var show_error = function (message, stack, _this) {
    _this.showErrorDetail = false;
    var html = message;
    if (stack != '' && stack != null && stack != undefined) {
        html += "<div style='padding-top: 10px;'><a style='cursor: pointer;color: #0000cc;' onclick='showStackDetail(\"errorDetail\")'>查看详情</a></div>";
        html += "<div style='display: none;height: 200px;width:250px;overflow-y: auto;color: ' id='errorDetail'>" + stack + "</div>";
    }
    _this.$notify({
        title: '错误',
        message: html,
        type: 'error',
        dangerouslyUseHTMLString: true,
        duration: 2000
    });
}

var show_success = function (message,_this) {
    _this.$message({message: message, type: 'success'});
}

var show_info = function (message,_this) {
    _this.$message({message: message, type: 'info'});
}

var show_warning = function (message,_this) {
    _this.$message({message: message, type: 'warning'});
}