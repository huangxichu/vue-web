/*
 * 该js依赖axios.js，所以需要在引入axios.js后，再引入本js文件
 * 作者：黄细初
 */
var ctOptions = {};//全局属性，在执行new Function()函数时赋值
var startStr_T = "<!-- template start -->";//html部分开始标志
var endStr_T = "<!-- template end -->";//html部分结束标志
var startStr_Script = "<!-- hj script start -->";//Script部分开始标志
var endStr_Script = "<!-- hj script end -->";//Script部分结束标志
var startStr_S = "//!--template start";//js部分开始标志
var endStr_S = "//!--template end";//js部分开始标志
var errorPage404 = "404.html";//404错误页面

var exitsJs = [];//已经加载的js文件的src
/**
 * 引入html模块组件
 * @param uri 模块组件相对地址
 * @param obj 返回的模块对象
 * @returns {PromiseLike<T | never> | Promise<T | never>}
 */
var importHtml = function (uri, obj,components) {
    loadComponents(components);
    ctOptions = {};//初始化
    return axios.get(uri).then(function(res){
        // console.info(res);
        if (res.status == 200) {
            var str = res.data + "";//返回的html 页面字符串
            var start = str.indexOf(startStr_T);
            if(start < 0){
                return importHtml(errorPage404,obj);
            }else{
                var template = str.substring(start + startStr_T.length, str.indexOf(endStr_T));
                //引入js文件
                var start_script = str.indexOf(startStr_Script);
                if(start_script >= 0){
                    var script_str = str.substring(start_script + startStr_Script.length, str.indexOf(endStr_Script));
                    script_str = hj_trim(script_str);
                    importScript(script_str);
                }

                var scriptStr = str.substring(str.indexOf(startStr_S) + startStr_S.length, str.indexOf(endStr_S));
                if (scriptStr != '' && scriptStr != null) {
                    (new Function(scriptStr))();
                }
                if(ctOptions.data != null){
                    ctOptions.data.showErrorDetail = false;
                    ctOptions.data.disableButton = false;
                }
                var methods = initPageMethods(ctOptions.methods);
                obj = Vue.extend({
                    data: ctOptions.data,
                    watch: ctOptions.watch,
                    computed: ctOptions.computed,
                    mounted: ctOptions.mounted,
                    destroyed: ctOptions.destroyed,
                    beforeDestroy: ctOptions.beforeDestroy,
                    updated: ctOptions.updated,
                    beforeUpdate: ctOptions.beforeUpdate,
                    beforeMount: ctOptions.beforeMount,
                    created: ctOptions.created,
                    beforeCreate: ctOptions.beforeCreate,
                    methods: methods,
                    template: template
                });
                return obj;
            }
        } else {
            return obj;
        }
    })
}
/**
 * 引入html模块组件(html 与 js 分离)
 * @param uri 模块组件html相对地址
 * @param jsUri 模块组件js相对地址
 * @param obj 返回的模块对象
 * @returns {*}
 */
var importHtmlAndJs = function (uri, jsUri, obj,components) {
    loadComponents(components);
    ctOptions = {};//初始化
    return axios.get(uri).then(function(res){
        // console.info(res);
        if (res.status == 200) {
            var str = res.data + "";//返回的html 页面字符串
            var start = str.indexOf(startStr_T);
            if(start < 0){
                return importHtml(errorPage404,obj);
            }else{
                var template = str.substring(start + startStr_T.length, str.indexOf(endStr_T));
                //引入js文件
                var start_script = str.indexOf(startStr_Script);
                if(start_script >= 0){
                    var script_str = str.substring(start_script + startStr_Script.length, str.indexOf(endStr_Script));
                    script_str = hj_trim(script_str);
                    importScript(script_str);
                }
                return axios.get(jsUri).then(function(res2){
                    // console.info(res);
                    if (res2.status == 200) {
                        var scriptStr = res2.data + "";
                        if (scriptStr != '' && scriptStr != null) {
                            (new Function(scriptStr))();
                        }
                        if(ctOptions.data != null){
                            ctOptions.data.showErrorDetail = false;
                            ctOptions.data.disableButton = false;
                        }
                        var methods = initPageMethods(ctOptions.methods);
                        obj = Vue.extend({
                            data: ctOptions.data,
                            watch: ctOptions.watch,
                            computed: ctOptions.computed,
                            mounted: ctOptions.mounted,
                            destroyed: ctOptions.destroyed,
                            beforeDestroy: ctOptions.beforeDestroy,
                            updated: ctOptions.updated,
                            beforeUpdate: ctOptions.beforeUpdate,
                            beforeMount: ctOptions.beforeMount,
                            created: ctOptions.created,
                            beforeCreate: ctOptions.beforeCreate,
                            methods: methods,
                            template: template
                        });
                        return obj;
                    } else {
                        return obj;
                    }
                })
            }
        } else {
            return obj;
        }
    })
}
/**
 * 引入模块（默认为index.html 与 index.js）
 * @param uri  模块路径
 * @param obj 返回的模块对象
 * @returns {*}
 */
var importModule = function (uri, obj,components) {
    loadComponents(components);
    obj = null;
    ctOptions = {};//初始化
    return axios.get(uri + "/index.html").then(function(res){
        // console.info(res);
        if (res.status == 200) {
            var str = res.data + "";//返回的html 页面字符串
            var start = str.indexOf(startStr_T);
            if(start < 0){
                return importHtml(errorPage404,obj);
            }else{
                var template = str.substring(start + startStr_T.length, str.indexOf(endStr_T));
                //引入js文件
                var start_script = str.indexOf(startStr_Script);
                if(start_script >= 0){
                    var script_str = str.substring(start_script + startStr_Script.length, str.indexOf(endStr_Script));
                    script_str = hj_trim(script_str);
                    importScript(script_str);
                }
                return axios.get(uri + "/index.js").then(function(res2){
                    // console.info(res);
                    if (res2.status == 200) {
                        var scriptStr = res2.data + "";
                        if (scriptStr != '' && scriptStr != null) {
                            (new Function(scriptStr))();
                        }
                        if(ctOptions.data != null){
                            ctOptions.data.showErrorDetail = false;
                            ctOptions.data.disableButton = false;
                        }
                        var methods = initPageMethods(ctOptions.methods);
                        obj = Vue.extend({
                            data: ctOptions.data,
                            watch: ctOptions.watch,
                            computed: ctOptions.computed,
                            mounted: ctOptions.mounted,
                            destroyed: ctOptions.destroyed,
                            beforeDestroy: ctOptions.beforeDestroy,
                            updated: ctOptions.updated,
                            beforeUpdate: ctOptions.beforeUpdate,
                            beforeMount: ctOptions.beforeMount,
                            created: ctOptions.created,
                            beforeCreate: ctOptions.beforeCreate,
                            methods: methods,
                            template: template
                        });
                        return obj;
                    } else {
                        return obj;
                    }
                })
            }
        } else {
            return obj;
        }
    })
}

var importIframe = function (uri) {
    return Vue.extend({
        data: function () {
            return {
                iframeUrl: uri,
                screenHeight: (document.documentElement.clientHeight) - 165
            }
        },
        mounted: function () {
            var _this = this;
            window.onresize = function() {
                return (function() {
                    window.screenHeight = document.documentElement.clientHeight - 165
                    _this.screenHeight = (window.screenHeight)
                })();
            }
        },
        destroyed: function () {},
        beforeDestroy: function () {},
        updated: function () {},
        beforeUpdate: function () {},
        beforeMount: function () {},
        created: function () {},
        beforeCreate: function () {},
        template: "<iframe :src='iframeUrl' :style=\"'overflow-y: hidden;height:'+ screenHeight +'px;'\"" +
            " width=\"100%\" height=\"100%\" frameborder=\"0\" scrolling=\"yes\">" +
            "</iframe>"
    });
}

var importHtml_ = function (uri,components) {
    loadComponents(components);
    return axios.get(uri).then(function(res){
        // console.info(res);
        if (res.status == 200) {
            var str = res.data + "";//返回的html 页面字符串
            var start = str.indexOf(startStr_T);
            if(start < 0){
                return null;
            }else{
                var template = str.substring(start + startStr_T.length, str.indexOf(endStr_T));
                console.info(template);
                var scriptStr = str.substring(str.indexOf(startStr_S) + startStr_S.length, str.indexOf(endStr_S));
                // obj = Vue.extend({
                //     data:function () {
                //         return {
                //            title:"首页"
                //         }
                //     },
                //     template:template
                // });
                (new Function(scriptStr))();
                // console.info(ctOptions);
                var methods = initPageMethods(ctOptions.methods);
                var obj = Vue.extend({
                    data: ctOptions.data,
                    methods: methods,
                    template: template
                });
                console.info(obj);
                return obj;
            }
        } else {
            return null;
        }
    })
}

var componentHtml = function(componentName,uri) {
    ctOptions = {};//初始化
    return axios.get(uri).then(function(res){
        // console.info(res);
        if (res.status == 200) {
            var str = res.data + "";//返回的html 页面字符串
            var start = str.indexOf(startStr_T);
            if(start < 0){
                return importHtml(errorPage404,obj);
            }else{
                var template = str.substring(start + startStr_T.length, str.indexOf(endStr_T));
                //引入js文件
                var start_script = str.indexOf(startStr_Script);
                if(start_script >= 0){
                    var script_str = str.substring(start_script + startStr_Script.length, str.indexOf(endStr_Script));
                    script_str = hj_trim(script_str);
                    importScript(script_str);
                }

                var scriptStr = str.substring(str.indexOf(startStr_S) + startStr_S.length, str.indexOf(endStr_S));

                if (scriptStr != '' && scriptStr != null) {
                    (new Function(scriptStr))();
                }
                if(ctOptions.data != null){
                    ctOptions.data.disableButton = false;
                }
                var methods = initPageMethods(ctOptions.methods);
                Vue.component(componentName,{
                    props: ctOptions.props,
                    data: ctOptions.data,
                    watch: ctOptions.watch,
                    computed: ctOptions.computed,
                    mounted: ctOptions.mounted,
                    destroyed: ctOptions.destroyed,
                    beforeDestroy: ctOptions.beforeDestroy,
                    updated: ctOptions.updated,
                    beforeUpdate: ctOptions.beforeUpdate,
                    beforeMount: ctOptions.beforeMount,
                    created: ctOptions.created,
                    beforeCreate: ctOptions.beforeCreate,
                    methods: methods,
                    template: template
                });
            }
        }
    })
}

/**
 * 引入组件中<script> 标签文件
 * @param script_str
 */
var importScript = function (script_str) {
    script_str = hj_trim(script_str);
    var scripts = script_str.split("\n");
    // console.log("scripts",scripts);
    if(scripts != null && scripts.length > 0){
        var srcReg = /src=[\'\"]?([^\'\"]*)[\'\"]?/i;
        for(var i in scripts){
            if(scripts[i] != ''){
                var src = scripts[i].match(srcReg);
                // console.log("src",src[1]);
                if(exitsJs.indexOf(src[1]) < 0){//判断js文件是否已经加载
                    var newScript = document.createElement("script");
                    newScript.setAttribute('type','text/javascript');
                    newScript.setAttribute('src',src[1]);
                    var head = document.getElementsByTagName('head')[0];
                    head.appendChild(newScript);
                    exitsJs.push(src[1]);//写入到已经加载的数组中
                }
            }
        }
    }
}


var loadComponents = function (components){
    if(components != null && components != undefined && components.length > 0){
        for(var i in components){
            // componentHtml(components[i].name,"page/upload/upload.html");
            componentHtml(components[i].name,components[i].uri);
        }
    }
}

var initPageMethods = function (methods) {
    if(methods == undefined || methods == null){
        methods = {};
    }
    methods.handleSelectionChange = function (val) {
        var _this = this;
        // console.info(val)
        _this.multipleSelection = val;
    };
    methods.handleSizeChange = function (rows) {
        var _this = this;
        _this.search.pageNum = 1;
        _this.search.pageSize = rows;
        _this.tableData();
    };
    methods.handleCurrentChange = function (page) {
        var _this = this;
        _this.search.pageNum = page;
        _this.tableData();
    };
    //实现搜索功能，加载数据
    methods.searchData = function () {
        var _this = this;
        _this.search.pageNum = 1;
        _this.tableData();
    };
    if(methods.tableData == undefined || methods.tableData == null){
        methods.tableData = function () {
            var _this = this;
            _this.loading = true;
            get_head(_this.tableDataUrl, _this.search, {}, _this).then(function (record) {
                console.log("List>>>>>>>>>>>>>>",record);
                _this.items = record.list;
                _this.totalRows = record.totalRow;
                _this.currentPage = _this.search.pageNum;
                _this.loading = false;
            }).catch(function (err) {
                _this.loading = false;
            })
        }
    }
    methods = initFileDownMethods(methods);
    methods = initDateMethods(methods);
    return methods;
}

var initFileDownMethods = function (methods) {
    if(methods == undefined || methods == null){
        methods = {};
    }
    methods.downFile = function (filePath) {
        var _this = this;
        down_head(process.Shp_Route + "/common/downloadFile",{filePath:filePath},{},_this).then(function (record) {

        })
    };

    return methods;
}
var initDateMethods = function (methods) {
    if(methods == undefined || methods == null){
        methods = {};
    }
    methods.datefunction = function (type,startTime,endTime,isCurrent) {
        var _this = this;
        if(type == 'start'){
            return {
                disabledDate: function(time) {
                    var curDate = new Date();
                    var preDate = new Date(curDate.getTime() - 24 * 60 * 60 * 1000);//前一天
                    var endDate = endTime == '' || endTime == null ? null : new Date(Date.parse(endTime));
                    if(endDate == null){
                        return isCurrent && time.getTime() < preDate.getTime();
                    }else{
                        if(isCurrent){
                            return time.getTime() < preDate.getTime() || time.getTime() > endDate.getTime();
                        }else{
                            return time.getTime() > endDate.getTime();
                        }
                    }
                }
            };
        }else{
            return {
                disabledDate: function(time) {
                    var curDate = new Date();
                    var preDate = startTime == '' || startTime == null ? null : new Date(new Date(Date.parse(startTime)).getTime());
                    if(isCurrent && preDate == null){
                        preDate = new Date(curDate.getTime() - 24 * 60 * 60 * 1000);
                    }
                    return preDate != null && time.getTime() < preDate.getTime();
                }
            };
        }
    };
    return methods;
}