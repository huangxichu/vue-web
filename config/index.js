var process = {
    env: {
        NODE_ENV: "dev"//可选择 dev , prod
    },
    // Base_URL: "http://192.168.10.4/api", // api接口请求地址
    // Base_URL: "http://jenkins.ce/", // api接口请求地址
    Base_URL: "http://192.168.10.11/", // api接口请求地址
    Shp_Route: 'testshrpub',
    AXIOS: {
        defaults: {
            timeout: 10000
        }
    },
    message: {
        timeout: "请求超时"
    },
    token:'test20191526'//
}
var offset = 275;
var currentPath = "/home";
var ECharts_theme = "macarons";//设置全局的EChart主题
errorPage404 = "404.html";

var isIE = false;
if(!!window.ActiveXObject || "ActiveXObject" in window){
    isIE = true;
}

if(isIE){
    document.write('<script src="resources/js/polyfill.min.js"><\/script>');
}

if (process.env.NODE_ENV == 'prod') {
    //生产环境
    document.write('<script src="./config/prod.env.js?t=' + new Date().getTime() + '"><\/script>');
} else {
    //开发环境
    document.write('<script src="./config/dev.env.js?t=' + new Date().getTime() + '"><\/script>');
}
