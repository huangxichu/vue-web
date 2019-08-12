/*
* 华建自定义的菜单递归组件，依赖vue和element-ui实现
* 开发人员：黄细初
*/

;(function (root, factory) {
    if (typeof exports === 'object') {
        module.exports = exports = factory();
    } else if (typeof defines === 'function' && define.amd) {
        define([], factory())
    } else {
        root.hjVerticalMenuItem = factory();
    }
})(this, function () {
    //hj-vertical-menu-item
    var hjVerticalMenuItem = {
        template: '<div class="hj-menu-wrapper">' +

                    '<template v-for="menu in data">' +

                        '<el-menu-item v-if="!menu.subMenus" :index="menu.index" @click="handleMenuItem(menu)">' +
                            '<i v-if="menu.iconClass" :class="menu.iconClass"></i>' +
                            '<span slot="title">{{menu.menuName}}</span>' +
                        '</el-menu-item>' +

                        '<el-submenu v-else :index="menu.index">' +
                            '<template slot="title">' +
                                '<i v-if="menu.iconClass" :class="menu.iconClass"></i>' +
                                '<span>{{menu.menuName}}</span>' +
                            '</template>' +
                            '<hj-vertical-menu-item :data="menu.subMenus" @item-click="onMenuClick"></hj-vertical-menu-item>'+
                        '</el-submenu>' +
                    '</template>' +
                  '</div>',
        props: {
            data: {
                type: Array,
                default: function () {
                    return [];
                }
            }
        },
        methods:{
            handleMenuItem: function (menu) {
                this.$emit("item-click", menu);
            },
            onMenuClick: function (menu) {
                this.$emit("item-click", menu);
            }
        }
    }
    return {
        name: 'hj-vertical-menu-item',
        template: hjVerticalMenuItem
    }
})