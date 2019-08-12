/*
* 华建自定义的流程组件，依赖vue和element-ui实现
* 开发人员：黄细初
*/

;(function (root, factory) {
    if (typeof exports === 'object') {
        module.exports = exports = factory();
    } else if (typeof defines === 'function' && define.amd) {
        define([], factory())
    } else {
        root.hjProcess = factory();
    }
})(this, function () {
    //hj-vertical-menu-item
    var hjProcess = {
        template: '<div class="hortree-wrapper">' +

            '<template v-for="(item,index) in data">' +
            '<process-entry :item="item" :entryWidth="entryWidth" :ref="reversedRefs(index)" ' +
            ':entryHeight="entryHeight" :ide="index" @click.native="handleClickEntry(item,index)"></process-entry>' +
            '</template>' +

            // '<template v-for="(item,index) in data">' +
            //     '<div class="line" :style="reversedStyle(index)"></div>' +
            // '</template>' +

            '</div>',
        props: {
            data: {
                type: Array,
                default: function () {
                    return [];
                }
            },
            entryWidth: {
                type: Number,
                default: function () {
                    return 100;
                }
            },
            entryHeight: {
                type: Number,
                default: function () {
                    return 30;
                }
            },
            lineStyle:{
                type: String,
                default: function () {
                    return 'width: 45px; border-bottom:2px solid rgb(75, 134, 183); border-color: rgb(75, 134, 183);' +
                        'position: absolute; z-index: 8; top: 18px;left:95px;' +
                        'transform: rotate(0rad);';
                }
            }
        },
        methods:{
            reversedStyle: function (index) {
                var style = 'display: none;';
                if((index + 1) < this.data.length){
                    var left = ((this.entryWidth - 5) + index * (this.entryWidth + 30)) - (this.entryWidth - 30);
                    style = 'width: 45px; border-bottom:2px solid rgb(75, 134, 183); border-color: rgb(75, 134, 183);' +
                        'position: absolute; z-index: 8; top: ' + (this.entryHeight/2 + 3) + 'px;left:' + left + 'px;' +
                        'transform: rotate(0rad);';
                }
                return style;
            },
            reversedRefs: function (index) {
                return 'process' + index;
            },
            handleClickEntry: function (item,index) {
                var _this = this;
                var e = event || window.event;
                var refName = this.reversedRefs(index);
                this.$emit("entry-click",e, item,_this.$refs[refName][0]);
            }
        }
    }
    return {
        name: 'hj-process',
        template: hjProcess
    }
})