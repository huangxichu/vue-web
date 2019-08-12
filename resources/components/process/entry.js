/*
* 流程图 块组件，依赖vue
* 开发人员：黄细初
*/

;(function (root, factory) {
    if (typeof exports === 'object') {
        module.exports = exports = factory();
    } else if (typeof defines === 'function' && define.amd) {
        define([], factory())
    } else {
        root.processEntry = factory();
    }
})(this, function () {
    //hj-vertical-menu-item
    var processEntry = {
        template:'<div class="hortree-branch"  :style="reversedBranchStyle()">' +
            '<div class="hortree-entry" :style="reversedEntryStyle()">' +
            '<div v-if="!item.first && !item.last" class="hortree-label" :style="reversedLabelStyle()">{{item.nodeName}}' +
            '<div class="line" :style="reversedStyle()">' +
            '<div class="arrow_right" :style="reversedStyle2()"></div>' +
            '</div>' +
            '</div>' +
            '<div v-if="item.first" class="hortree-label" :style="reversedLabelStyle2(\'#33CC99\')">' +
            '<div style="height: 30px;width:30px;border-radius:50%;background-color:#fff;position:relative;top:3px;left: -2px;">' +
            '<div class="line" :style="reversedStyle()">' +
            '<div class="arrow_right" :style="reversedStyle2()"></div>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '<div v-if="item.last" class="hortree-label" :style="reversedLabelStyle2(\'#FFCC99\')">' +
            '<div style="height: 30px;width:30px;border-radius:50%;background-color:#fff;position:relative;top:3px;left: -2px;"></div>' +
            '</div>' +
            '</div>' +
            '</div>',
        props: {
            item: {
                type: Object,
                default: function () {
                    return {};
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
            ide: {
                type: Number,
                default: function () {
                    return 0;
                }
            },
            dataLength: {
                type: Number,
                default: function () {
                    return 0;
                }
            }
        },
        methods:{
            reversedEntryStyle: function () {
                return 'height:' + this.entryHeight + 'px;';
            },
            reversedBranchStyle: function () {
                if(this.ide == 0){
                    return "";
                }else if(this.ide == 1){
                    return 'margin-left:60px;';
                }else{
                    return 'margin-left:' + (this.entryWidth + 30) + 'px;';
                }
            },
            reversedLabelStyle: function () {
                var utilWidth = 15;
                var lineMaxLength = this.entryWidth/utilWidth;
                var size = Math.ceil(this.item.nodeName.length / lineMaxLength);
                var style = 'width:' + this.entryWidth + 'px;line-height:' +
                    Math.ceil(this.entryHeight/size) + 'px;height:' + (this.entryHeight + 6) + 'px;';
                if(this.item.active){
                    style += 'border: 2px solid red;';
                }
                if(!this.item.first && !this.item.last){
                    style += 'background: #F2F2F2;';
                }
                return style;
            },
            reversedLabelStyle2: function (color) {
                var style = 'width:36px;height:36px;border-radius:50%;background-color:' + color
                    + ';border:0;margin-top:' + (this.entryHeight-30)/2 + 'px;';
                return style;
            },
            reversedStyle: function () {
                var style = 'display: none;';
                // var index = this.ide;
                if(!this.item.last){
                    var left = 32;
                    var top = 15;
                    if(!this.item.first){
                        left = this.entryWidth - 2;
                        top = this.entryHeight/2;
                    }
                    style = 'width: 30px; border-bottom:2px solid rgb(75, 134, 183); border-color: rgb(75, 134, 183);' +
                        'position: absolute; z-index: 8; top: ' + top + 'px;left:' + left + 'px;' +
                        'transform: rotate(0rad);';
                }
                return style;
            },
            reversedStyle2: function () {
                var style = 'display: none;';
                // var index = this.ide;
                if(!this.item.last){
                    var left = 24;
                    var top = -2;
                    if(this.item.first){
                        left = 18;
                    }
                    style = 'position: absolute; z-index: 8; top: ' + top + 'px;left:' + left + 'px;';
                }
                return style;
            }
        }
    }
    return {
        name: 'process-entry',
        template: processEntry
    }
})