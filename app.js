var routes = [
    // {
    //   path: "/",
    //   components:{
    //
    //   }
    // },
    {
        path: "/404",
        component: Error => importHtml(errorPage404, Error,[])
    },
    {
        path: "/apply_publish",
        components: {
            apply_publish:html => importModule('page/share_publish/apply_publish', html,[
                {name: "edit-apply-publish",uri:"page/share_publish/apply_publish/edit_apply/index.html"},
                {name: "choose-user",uri:"page/share_publish/apply_publish/edit_apply/choose_user.html"},
                {name: "approve",uri:"page/share_publish/wait_approve/approve/index.html"}
            ])
        }
    },
    {
        path: "/share_apply",
        components: {
            share_apply:html => importModule('page/share_publish/share_apply', html,[
                {name: "edit-apply-publish",uri:"page/share_publish/apply_publish/edit_apply/index.html"},
                {name: "choose-user",uri:"page/share_publish/apply_publish/edit_apply/choose_user.html"}
            ])
        }
    },
    {
        path: "/wait_approve",
        components: {
            wait_approve:html => importModule('page/share_publish/wait_approve', html,[
                {name: "approve",uri:"page/share_publish/wait_approve/approve/index.html"},
                {name: "choose-user",uri:"page/share_publish/apply_publish/edit_apply/choose_user.html"}
            ])
        }
    },
    {
        path: "/accomplish_approve",
        components: {
            accomplish_approve:html => importModule('page/share_publish/accomplish_approve', html,[
                {name: "approve",uri:"page/share_publish/wait_approve/approve/index.html"},
                {name: "choose-user",uri:"page/share_publish/apply_publish/edit_apply/choose_user.html"}
            ])
        }
    },
    {
        path: "/agency_approve",
        components: {
            agency_approve:html => importModule('page/share_publish/agency_approve', html,[
                {name: "agency",uri:"page/share_publish/agency_approve/approve/index.html"},
                {name: "choose-user",uri:"page/share_publish/apply_publish/edit_apply/choose_user.html"}
            ])
        }
    },
    {
        path:"/information",
        components: {
            information:html => importModule('page/share_publish/information', html,[
                {name: "approve",uri:"page/share_publish/wait_approve/approve/index.html"}
            ])
        }
    }
];

var router = new VueRouter({
    // mode: 'history',
    base: '/',  //添加的地方
    routes: routes

});
var SecurityData = [];
var StatusData = [];
var FlowNameData = [];
var SourceData = [];
var ReasonData = [];

var vm = new Vue({
    el: "#app",
    data: {
        userToken: process.token,
        activeName:'',
        defaultActive: "",
        defaultOpeneds: [],
        activeHead: 1,
        pathName: "申请发布管理",
        collapsed: false,
        fullscreenLoading: true,
        tabsItem:[],
        allMenus: [],
        menus: [],
        menus1: [
            {
                id:'apply_publish',
                menuName: '申请发布管理',
                iconClass: "el-icon-folder-add",
                isNode: true,
                pathName: '申请发布管理',
                index: "/apply_publish",
                path: "/apply_publish",
            },
            {
                id:'share_apply',
                menuName: '共享申请管理',
                iconClass: "el-icon-share",
                isNode: true,
                pathName: '共享申请管理',
                index: "/share_apply",
                path: "/share_apply"
            }
        ],
        menus2: [
            {
                id:'wait_approve',
                menuName: '待审批',
                iconClass: "el-icon-message",
                isNode: true,
                pathName: '待审批',
                index: "/wait_approve",
                path: "/wait_approve"
            },
            {
                id:'accomplish_approve',
                menuName: '已审批',
                iconClass: "el-icon-finished",
                isNode: true,
                pathName: '已审批',
                index: "/accomplish_approve",
                path: "/accomplish_approve"
            },
            {
                id:'agency_approve',
                menuName: '代理审批',
                iconClass: "el-icon-message",
                isNode: true,
                pathName: '代理审批',
                index: "/agency_approve",
                path: "/agency_approve"
            }

        ],
        menus3: [
            {
                id:'information',
                menuName: '信息查询',
                iconClass: "el-icon-s-data",
                isNode: true,
                pathName: '信息查询',
                index: "/information",
                path: "/information"
            }
        ],
        loadCheck: {
            SecurityData:false,
            StatusData:false,
            FlowNameData:false,
            SourceData:false,
            ReasonData:false
        },
        loadingInstance:null,
        screenHeight: (document.documentElement.clientHeight - 160)
    },
    watch: {
        screenHeight: function (val) {
            this.screenHeight = val
        }
    },
    methods: {
        changUser:function(value){
            var _this = this;
            process.token = value;
            _this.dropdownCommand("deleteOther");
            _this.loadData();
            _this.$router.push({path: "/"});
        },
        //加载页面基础数据
        loadData: function () {
            var _this = this;
            _this.loadCheck = {
                SecurityData:false,
                StatusData:false,
                FlowNameData:false,
                SourceData:false,
                ReasonData:false
            };
            _this.loadingInstance = _this.$loading({
                fullscreen:true,
                lock:true,
                // text:'哈哈是啥时候',
                background:'rgba(255, 255, 255, 0.51)'
            });
            get_head(process.Shp_Route + "/sys/select",
                {attrType: 'security'}, {}, _this).then(function(record){
                SecurityData = record;
                _this.loadCheck.SecurityData = true;
            });
            get_head(process.Shp_Route + "/sys/select",
                {attrType: 'approvalStatus'}, {}, _this).then(function(record){
                StatusData = record;
                _this.loadCheck.StatusData = true;
            });
            get_head(process.Shp_Route + "/wrkFlw/select",
                {}, {}, _this).then(function(record){
                FlowNameData = record;
                _this.loadCheck.FlowNameData = true;

            });
            get_head(process.Shp_Route + "/sys/select",
                {attrType: 'source'}, {}, _this).then(function(record) {
                SourceData = record;
                _this.loadCheck.SourceData = true;
            });
            get_head(process.Shp_Route + "/sys/select",
                {attrType: 'reason'}, {}, _this).then(function(record) {
                ReasonData = record;
                _this.loadCheck.ReasonData = true;
            });
            var initInterval = setInterval(function () {
                var isCheck = _this.loadCheck.SecurityData && _this.loadCheck.StatusData
                    && _this.loadCheck.FlowNameData && _this.loadCheck.SourceData && _this.loadCheck.ReasonData;
                if(isCheck){
                    _this.loadingInstance.close();
                    _this.init();
                    clearInterval(initInterval);
                }
            },500);
        },
        changeActiveHead:function(activeHead){
            var _this = this;
            _this.activeHead = activeHead;
            if (_this.activeHead == 1) {
                _this.menus = _this.menus1
            } else if (_this.activeHead == 2) {
                _this.menus = _this.menus2
            } else if (_this.activeHead == 3) {
                _this.menus = _this.menus3
            }
            _this.goFirstPage();
        },
        onCHMenuClick: function (menu) {
            var _this = this;
            // console.log("menu>>>>", menu);
            _this.addTabs(menu);
            _this.activeName = menu.id;
            _this.$router.push({path:menu.index});
        },
        addTabs:function(menu){
            var _this = this;
            var exits = false;
            var id = menu.id;
            for(var i in _this.tabsItem){
                if(_this.tabsItem[i].name == id){
                    exits = true;
                    break;
                }
            }
            if(!exits){
                _this.tabsItem.push({label:menu.menuName,name:menu.id,closable:true});
            }
        },
        handleTabClick(tab, event) {
            var _this = this;
            // console.log(tab, event);
            var id = tab.name;
            var menu = _this.getMenuById(id,_this.allMenus);
            _this.defaultActive = menu.index;
            _this.addTabs(menu);
            _this.defaultOpeneds = menu.path.split("#");
            // console.log(menu);
            _this.$router.push({path:menu.index});
        },
        handleRemoveTabs(name){
            // console.log(name);
            var _this = this;
            var curr_index = -1;
            var open_tab = null;
            for(var i = 0; i < _this.tabsItem.length;i++){
                if(_this.tabsItem[i].name == name){
                    curr_index = i;
                    break;
                }
            }
            if(curr_index != -1){
                if(_this.activeName == _this.tabsItem[curr_index].name){
                    if(curr_index == 0){
                        if(_this.tabsItem.length > 1){
                            open_tab = _this.tabsItem[1];
                        }
                    }else{
                        open_tab = _this.tabsItem[curr_index - 1];
                    }
                    if(open_tab != null){
                        var menu = _this.getMenuById(open_tab.name,_this.allMenus);
                        _this.activeName = menu.id;
                        _this.$router.push({path:menu.index});
                    }
                }
                _this.tabsItem.splice(curr_index,1);
            }
        },
        getItemByName: function(name){
            var _this = this;
            var tab = null;
            for(var i in _this.tabsItem){
                if(_this.tabsItem[i].name == name){
                    tab = _this.tabsItem[i];
                    break;
                }
            }
            return tab;
        },
        getMenuById: function (id, subMenus) {
            var _this = this;
            var menu = null;
            for (var key in subMenus) {
                if (subMenus[key].isNode) {
                    if (subMenus[key].id == id) {
                        menu = subMenus[key];
                        break;
                    }
                } else {
                    var sub_menu = _this.getMenuById(id, subMenus[key].subMenus);
                    if (sub_menu != null) {
                        menu = sub_menu;
                        break;
                    }
                }
            }
            return menu;
        },
        selectMenu: function (index, indexPath) {
            var _this = this;
            // console.info(index);
            // console.info(indexPath);
            var path = _this.getPath(index, _this.allMenus);
            if (path != null) {
                _this.pathName = path.pathName;
            }
            _this.defaultActive = index;
            _this.defaultOpeneds = indexPath;
        },
        dropdownCommand: function(command){
            var _this = this;
            // console.info(command);
            var item = _this.getItemByName(_this.activeName);
            // console.log(item);
            if('refresh' == command){
                if(item != null){
                    // var menu = _this.getMenuById(_this.activeName,_this.allMenus);
                    // for(var i = 0;i < _this.tabsItem.length;i++){
                    //     if(_this.activeName == _this.tabsItem[i].name){
                    //         _this.tabsItem.splice(i,1);
                    //         break;
                    //     }
                    // }
                    // _this.addTabs(menu);
                    // _this.$router.push({path:menu.index});
                    _this.$router.go(0);
                }
            }else if('close' == command){
                if(item != null){
                    _this.handleRemoveTabs(_this.activeName);
                }
            }else if('deleteOther' == command){
                if(item != null){
                    var deletes = [];
                    for(var i = 0;i < _this.tabsItem.length;i++){
                        if(_this.activeName != _this.tabsItem[i].name){
                            deletes.push(i)
                        }
                    }
                    for(var i = deletes.length;i > 0;i--){
                        _this.tabsItem.splice(deletes[i-1],1);
                    }
                }
            }else if('deleteAll' == command){
                _this.tabsItem = [];
            }
        },
        getPath: function (index, subMenus) {
            var _this = this;
            var path = null;
            for (var key in subMenus) {
                if (subMenus[key].isNode) {
                    if (subMenus[key].index == index) {
                        path = {};
                        path.id = subMenus[key].id;
                        path.menuName = subMenus[key].menuName;
                        path.pathName = subMenus[key].pathName;
                        path.path = subMenus[key].path;
                        break;
                    }
                } else {
                    var sub_path = _this.getPath(index, subMenus[key].subMenus);
                    if (sub_path != null) {
                        path = sub_path;
                        break;
                    }
                }
            }
            return path;
        },
        getFirstMenu: function (subMenus) {
            var _this = this;

            for (var key in subMenus) {
                if (subMenus[key].isNode) {
                    return subMenus[key];
                } else {
                    var menu = _this.getFirstMenu(subMenus[key].subMenus);
                    if(menu != null){
                        return menu;
                    }
                }
            }
            return null;
        },
        goFirstPage:function () {
            var _this = this;
            var menu = null;
            if(_this.menus.length > 0){
                menu = _this.getFirstMenu(_this.menus);
            }
            // console.info(menu);
            if(menu != null){
                _this.pathName = menu.pathName;
                _this.defaultActive = menu.index;
                _this.defaultOpeneds = menu.path.split("#");
                _this.addTabs(menu);
                _this.activeName = menu.id;
                _this.$router.push({
                    path: menu.index,//路径
                    query: {//参数

                    }
                });
            }else{
                _this.pathName = "首页";
                _this.addTabs({id:'home',menuName:'首页'});
                _this.activeName = 'home';
                _this.$router.push({
                    path: '/home',//路径
                    query: {//参数

                    }
                });
            }
        },
        init: function () {
            var _this = this;
            var href = window.location.href;
            var path = _this.$route.path;
            // console.log("href",href);
            // console.log("path",path);
            var index = href.substring(href.indexOf("#") + 1);
            // console.info(index);
            _this.defaultActive = index;
            if (index == '/') {
                _this.goFirstPage();
            } else if(index == '/home'){
                _this.pathName = "首页";
                _this.addTabs({id:'home',menuName:'首页'});
                _this.activeName = 'home';
                _this.$router.push({
                    path: '/home',//路径
                    query: {//参数

                    }
                });
            } else if (index != null && index.length > 0) {
                var path = _this.getPath(index, _this.menus1);
                if(path == null){
                    path = _this.getPath(index, _this.menus2);
                    _this.activeHead = 2;
                    _this.menus = _this.menus2;
                }
                if(path == null){
                    path = _this.getPath(index, _this.menus3);
                    _this.activeHead = 3;
                    _this.menus = _this.menus3;
                }
                _this.addTabs(path);
                _this.activeName = path.id;
                if (path != null && path != undefined && path.path != undefined) {
                    _this.defaultOpeneds = path.path.split("#");
                    _this.pathName = path.pathName;
                }
            }
        }
    },
    mounted: function () {
        var _this = this;
        _this.allMenus.push.apply(_this.allMenus,_this.menus1);
        _this.allMenus.push.apply(_this.allMenus,_this.menus2);
        _this.allMenus.push.apply(_this.allMenus,_this.menus3);
        _this.menus = _this.menus1;
        _this.loadData();

        window.onresize = function () {
            return (function () {
                window.screenHeight = document.documentElement.clientHeight - 165
                _this.screenHeight = (window.screenHeight)
            })();
        }
    },
    router: router
});

//v-dialogDrag：弹框拖拽属性
Vue.directive('dialogDrag', {
    bind(el, binding, vnode, oldVnode) {
        var dialogHeaderEl = el.querySelector(".el-dialog__header");
        var dragDom = el.querySelector(".el-dialog");
        dialogHeaderEl.style.cursor = "move";
        // dialogHeaderEl.style.cssText += ";cursor:move;";
        // dragDom.style.cssText += ";top:0px;";

        //获取原有属性的ie dom元素 .currentStyle 火狐谷歌 window.getComputedStyle(dom元素，null);
        // var sty = (function () {
        //     if(window.document.currentStyle){
        //         return function(dom,attr){
        //             dom.currentStyle[attr];
        //         }
        //     }else{
        //         return function(dom,attr){
        //             window.getComputedStyle(dom,null)[attr];
        //         }
        //     }
        // })();

        var sty = dragDom.currentStyle || window.getComputedStyle(dragDom, null);

        // console.log("sty",sty);


        dialogHeaderEl.onmousedown = function (e) {

            //鼠标按下，计算当前元素距离可视区的距离
            var disX = e.clientX - dialogHeaderEl.offsetLeft;
            var disY = e.clientY - dialogHeaderEl.offsetTop;

            var screenWidth = document.body.clientWidth;//body当前宽度
            var screenHeight = document.documentElement.clientHeight;//可见区域高度（应为body高度，可某些环境下无法获取）

            var dragDomWidth = dragDom.offsetWidth;//对话框宽度
            var dragDomHeight = dragDom.offsetHeight;//对话框高度

            var minDragDomLeft = dragDom.offsetLeft;
            var maxDragDomLeft = screenWidth - dragDom.offsetLeft - dragDomWidth;

            var minDragDomTop = dragDom.offsetTop;
            var maxDragDomTop = screenHeight - dragDom.offsetTop - dragDomHeight;

            //获取到的值到px正则匹配替换
            // var styL = sty(dragDom,'left');
            // var styT = sty(dragDom,'top');
            var styL, styT;

            //注意在ie中 第一次获取到的值为组件自带50%移动之后赋值为px

            if (sty.left == 'auto') {
                styL = 0;
                styT = 0;
            } else if (sty.left.includes('%')) {
                styL = +document.body.clientWidth * (+sty.left.replace(/\%/g, '') / 100);
                styT = +document.body.clientHeight * (+sty.top.replace(/\%/g, '') / 100);
            } else {
                styL = +sty.left.replace(/\px/g, '');
                styT = +sty.top.replace(/\px/g, '');
            }
            ;
            // console.log(">>>>>>>styL",styL);
            // console.log(">>>>>>>styT",styT);
            document.onmousemove = function (ev) {
                //通过事件委托，计算移动的距离
                var left = ev.clientX - disX;
                var top = ev.clientY - disY;
                // console.log(">>>>>>>left",left);
                // console.log(">>>>>>>top",top);
                //边界处理
                if (-(left) > minDragDomLeft) {
                    left = -(minDragDomLeft);
                } else if (left > maxDragDomLeft) {
                    left = maxDragDomLeft;
                }

                if (-(top) > minDragDomTop) {
                    top = -(minDragDomTop);
                } else if (top > maxDragDomTop) {
                    top = maxDragDomTop;
                }
                //移动当前元素
                // dragDom.style.left = left + styL + 'px';
                // dragDom.style.top = top + styT + 'px';
                dragDom.style.cssText += ';left:' + (left + styL) + 'px;top:' + (top + styT) + 'px;';
            };
            document.onmouseup = function (ev) {
                document.onmousemove = null;
                document.onmouseup = null;
            };
            // return false;
        }
    }
});
