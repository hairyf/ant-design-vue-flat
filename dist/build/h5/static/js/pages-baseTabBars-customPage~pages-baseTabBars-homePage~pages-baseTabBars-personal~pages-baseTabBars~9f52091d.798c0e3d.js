(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-baseTabBars-customPage~pages-baseTabBars-homePage~pages-baseTabBars-personal~pages-baseTabBars~9f52091d"],{"02d1":function(t,e,n){"use strict";n.d(e,"b",(function(){return o})),n.d(e,"c",(function(){return a})),n.d(e,"a",(function(){return i}));var i={uNavbar:n("87cd").default,uTabbar:n("1fd6").default},o=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"view-controller safe-area-inset-bottom"},[t.isNavBar?n("u-navbar",{attrs:{"is-back":t.isBack,"border-bottom":!1,title:t.pageInfo.option.navigationBarTitleText,"title-color":t.pageInfo.option.navigationBarTextStyle,background:{background:t.pageInfo.option.navigationBarBackgroundColor}}}):t._e(),n("div",{staticClass:"view-controller__container",style:{backgroundColor:t.pageInfo.option.backgroundColor,height:t.containerHeight}},[n("div",{staticClass:"view-controller__main"},[t._t("default")],2),n("div",{staticClass:"view-controller__sticky"},[t._t("sticky")],2)]),n("div",{staticClass:"view-controller__footer safe-area-inset-bottom",style:{bottom:t.isTabBar?"50px":"0px"}},[t._t("footer")],2),t.isTabBar?n("u-tabbar",{attrs:{"active-color":t.common.navigation.colorStyle.color.activeColor,"inactive-color":t.common.navigation.colorStyle.color.inactiveColor,list:t.common.navigation.contentEdit.navis},on:{change:function(e){arguments[0]=e=t.$handleEvent(e),t.$store.dispatch("setTabBarIndex",e)}}}):t._e()],1)},a=[]},"05bb":function(t,e,n){"use strict";var i=n("ee27").default;Object.defineProperty(e,"__esModule",{value:!0}),e.useTemplates=void 0,n("45fc"),n("ac1f"),n("841c"),n("7db0");var o=n("d6e4"),a=i(n("0613")),r=n("d257"),c=n("a6f4"),l=n("8ea9"),u=function(t){var e=getCurrentPages(),n=e[e.length-1],i=(0,c.computed)((function(){return a.default.state.common.navigation.contentEdit.navis.some((function(t){return t.pagePath.search(n.route||"")>0}))})),u=(0,c.ref)([]),s=(0,c.computed)((function(){return u.value.find((function(t){return"PageInfo"==t.type}))||l.pageInfoOption}));(0,c.provide)("templates",u),(0,o.useLifecycleInject)({onLoad:function(e){if("undefined"===typeof t)return!1;u.value="customPage"===t?(0,r.getTemplateInfo)(t,null===e||void 0===e?void 0:e.id).data:(0,r.getTemplateInfo)(t).data}});var f=(0,c.ref)(!1);return(0,o.useLifecycleInject)({onLoad:function(){return setTimeout((function(){var t=getCurrentPages();f.value=!!(t.length-1)}))}}),{isTabBar:i,templates:u,pageInfo:s,isBack:f}};e.useTemplates=u},"13f6":function(t,e,n){"use strict";var i=n("e920"),o=n.n(i);o.a},"1fab":function(t,e,n){"use strict";var i=n("be0e"),o=n.n(i);o.a},"1fd6":function(t,e,n){"use strict";n.r(e);var i=n("2dda"),o=n("6d53");for(var a in o)["default"].indexOf(a)<0&&function(t){n.d(e,t,(function(){return o[t]}))}(a);n("afe1");var r,c=n("f0c5"),l=Object(c["a"])(o["default"],i["b"],i["c"],!1,null,"5bd6e012",null,!1,i["a"],r);e["default"]=l.exports},"2dda":function(t,e,n){"use strict";n.d(e,"b",(function(){return o})),n.d(e,"c",(function(){return a})),n.d(e,"a",(function(){return i}));var i={uIcon:n("f86b").default,uBadge:n("9971").default},o=function(){var t=this,e=t.$createElement,n=t._self._c||e;return t.show?n("v-uni-view",{staticClass:"u-tabbar",on:{touchmove:function(e){e.stopPropagation(),e.preventDefault(),arguments[0]=e=t.$handleEvent(e),function(){}.apply(void 0,arguments)}}},[n("v-uni-view",{staticClass:"u-tabbar__content safe-area-inset-bottom",class:{"u-border-top":t.borderTop},style:{height:t.$u.addUnit(t.height),backgroundColor:t.bgColor}},[t._l(t.list,(function(e,i){return n("v-uni-view",{key:i,staticClass:"u-tabbar__content__item",class:{"u-tabbar__content__circle":t.midButton&&e.midButton},style:{backgroundColor:t.bgColor},on:{click:function(e){e.stopPropagation(),arguments[0]=e=t.$handleEvent(e),t.clickHandler(i)}}},[n("v-uni-view",{class:[t.midButton&&e.midButton?"u-tabbar__content__circle__button":"u-tabbar__content__item__button"]},[n("u-icon",{attrs:{size:t.midButton&&e.midButton?t.midButtonSize:t.iconSize,name:t.elIconPath(i),"img-mode":"scaleToFill",color:t.elColor(i),"custom-prefix":e.customIcon?"custom-icon":"uicon"}}),e.count||e.isDot?n("u-badge",{attrs:{count:e.count,"is-dot":e.isDot,offset:[-2,t.getOffsetRight(e.count,e.isDot)]}}):t._e()],1),n("v-uni-view",{staticClass:"u-tabbar__content__item__text",style:{color:t.elColor(i)}},[n("v-uni-text",{staticClass:"u-line-1"},[t._v(t._s(e.text))])],1)],1)})),t.midButton?n("v-uni-view",{staticClass:"u-tabbar__content__circle__border",class:{"u-border":t.borderTop},style:{backgroundColor:t.bgColor,left:t.midButtonLeft}}):t._e()],2),n("v-uni-view",{staticClass:"u-fixed-placeholder safe-area-inset-bottom",style:{height:"calc("+t.$u.addUnit(t.height)+" + "+(t.midButton?48:0)+"rpx)"}})],1):t._e()},a=[]},"2dfc":function(t,e,n){"use strict";n.r(e);var i=n("3625"),o=n.n(i);for(var a in i)["default"].indexOf(a)<0&&function(t){n.d(e,t,(function(){return i[t]}))}(a);e["default"]=o.a},"2e57":function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0,n("a9e3");var i={name:"u-badge",props:{type:{type:String,default:"error"},size:{type:String,default:"default"},isDot:{type:Boolean,default:!1},count:{type:[Number,String]},overflowCount:{type:Number,default:99},showZero:{type:Boolean,default:!1},offset:{type:Array,default:function(){return[20,20]}},absolute:{type:Boolean,default:!0},fontSize:{type:[String,Number],default:"24"},color:{type:String,default:"#ffffff"},bgColor:{type:String,default:""},isCenter:{type:Boolean,default:!1}},computed:{boxStyle:function(){var t={};return this.isCenter?(t.top=0,t.right=0,t.transform="translateY(-50%) translateX(50%)"):(t.top=this.offset[0]+"rpx",t.right=this.offset[1]+"rpx",t.transform="translateY(0) translateX(0)"),"mini"==this.size&&(t.transform=t.transform+" scale(0.8)"),t},showText:function(){return this.isDot?"":this.count>this.overflowCount?"".concat(this.overflowCount,"+"):this.count},show:function(){return 0!=this.count||0!=this.showZero}}};e.default=i},3625:function(t,e,n){"use strict";var i=n("ee27").default;Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var o=i(n("e143")),a=i(n("0613")),r=n("a6f4"),c=n("05bb"),l=(0,r.defineComponent)({props:{type:String},setup:function(t){var e=(0,r.computed)((function(){return a.default.state.common})),n=(0,c.useTemplates)(t.type),i=n.pageInfo,l=n.isTabBar,u=n.isBack,s=(0,r.computed)((function(){return t.type})),f=o.default.prototype.$customNavbarOffsetTop,d=(0,r.computed)((function(){var t=l.value?50:0;return s.value&&(t+=f),l.value,"calc(100% - ".concat(t,"px)")}));return{isTabBar:l,isNavBar:s,common:e,pageInfo:i,isBack:u,containerHeight:d}}});e.default=l},"3d9f":function(t,e,n){"use strict";var i=n("ee27").default;Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0,n("96cf");var o=i(n("c964"));n("a9e3");var a={props:{show:{type:Boolean,default:!0},value:{type:[String,Number],default:0},bgColor:{type:String,default:"#ffffff"},height:{type:[String,Number],default:"50px"},iconSize:{type:[String,Number],default:40},midButtonSize:{type:[String,Number],default:90},activeColor:{type:String,default:"#303133"},inactiveColor:{type:String,default:"#606266"},midButton:{type:Boolean,default:!1},list:{type:Array,default:function(){return[]}},beforeSwitch:{type:Function,default:null},borderTop:{type:Boolean,default:!0},hideTabBar:{type:Boolean,default:!0}},data:function(){return{midButtonLeft:"50%",pageUrl:""}},created:function(){this.hideTabBar&&uni.hideTabBar();var t=getCurrentPages();this.pageUrl=t[t.length-1].route},computed:{elIconPath:function(){var t=this;return function(e){var n=t.list[e].pagePath;return n?n==t.pageUrl||n=="/"+t.pageUrl?t.list[e].selectedIconPath:t.list[e].iconPath:e==t.value?t.list[e].selectedIconPath:t.list[e].iconPath}},elColor:function(){var t=this;return function(e){var n=t.list[e].pagePath;return n?n==t.pageUrl||n=="/"+t.pageUrl?t.activeColor:t.inactiveColor:e==t.value?t.activeColor:t.inactiveColor}}},mounted:function(){this.midButton&&this.getMidButtonLeft()},methods:{clickHandler:function(t){var e=this;return(0,o.default)(regeneratorRuntime.mark((function n(){var i;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:if(!e.beforeSwitch||"function"!==typeof e.beforeSwitch){n.next=10;break}if(i=e.beforeSwitch.bind(e.$u.$parent.call(e))(t),!i||"function"!==typeof i.then){n.next=7;break}return n.next=5,i.then((function(n){e.switchTab(t)})).catch((function(t){}));case 5:n.next=8;break;case 7:!0===i&&e.switchTab(t);case 8:n.next=11;break;case 10:e.switchTab(t);case 11:case"end":return n.stop()}}),n)})))()},switchTab:function(t){this.$emit("change",t),this.list[t].pagePath?uni.switchTab({url:this.list[t].pagePath}):this.$emit("input",t)},getOffsetRight:function(t,e){return e?-20:t>9?-40:-30},getMidButtonLeft:function(){var t=this.$u.sys().windowWidth;this.midButtonLeft=t/2+"px"}}};e.default=a},"452f":function(t,e,n){"use strict";var i=n("d6e1"),o=n.n(i);o.a},"62f2":function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0,n("a9e3");var i=uni.getSystemInfoSync(),o={},a={name:"u-navbar",props:{height:{type:[String,Number],default:""},backIconColor:{type:String,default:"#606266"},backIconName:{type:String,default:"nav-back"},backIconSize:{type:[String,Number],default:"44"},backText:{type:String,default:""},backTextStyle:{type:Object,default:function(){return{color:"#606266"}}},title:{type:String,default:""},titleWidth:{type:[String,Number],default:"250"},titleColor:{type:String,default:"#606266"},titleBold:{type:Boolean,default:!1},titleSize:{type:[String,Number],default:32},isBack:{type:[Boolean,String],default:!0},background:{type:Object,default:function(){return{background:"#ffffff"}}},isFixed:{type:Boolean,default:!0},immersive:{type:Boolean,default:!1},borderBottom:{type:Boolean,default:!0},zIndex:{type:[String,Number],default:""},customBack:{type:Function,default:null}},data:function(){return{menuButtonInfo:o,statusBarHeight:i.statusBarHeight}},computed:{navbarInnerStyle:function(){var t={};return t.height=this.navbarHeight+"px",t},navbarStyle:function(){var t={};return t.zIndex=this.zIndex?this.zIndex:this.$u.zIndex.navbar,Object.assign(t,this.background),t},titleStyle:function(){var t={};return t.left=(i.windowWidth-uni.upx2px(this.titleWidth))/2+"px",t.right=(i.windowWidth-uni.upx2px(this.titleWidth))/2+"px",t.width=uni.upx2px(this.titleWidth)+"px",t},navbarHeight:function(){return this.height?this.height:44}},created:function(){},methods:{goBack:function(){"function"===typeof this.customBack?this.customBack.bind(this.$u.$parent.call(this))():uni.navigateBack()}}};e.default=a},"6d53":function(t,e,n){"use strict";n.r(e);var i=n("3d9f"),o=n.n(i);for(var a in i)["default"].indexOf(a)<0&&function(t){n.d(e,t,(function(){return i[t]}))}(a);e["default"]=o.a},"7b89":function(t,e,n){var i=n("24fb");e=i(!1),e.push([t.i,'@charset "UTF-8";\n/* 文字溢出处理(一行) */\n/* 文字溢出处理(多行) */\n/* 填充页面 */\n/* 除了最后一个元素 */\n/* 行为相关颜色 */\n/* 文字基本颜色 */\n/* 背景颜色 */\n/* 边框颜色 */\n/* 尺寸变量 */\n/* 文字尺寸 */\n/* 图片尺寸 */\n/* Border Radius */\n/* 水平间距 */\n/* 垂直间距 */\n/* 透明度 */\n/* 文章场景相关 */.u-fixed-placeholder[data-v-5bd6e012]{box-sizing:initial}.u-tabbar__content[data-v-5bd6e012]{\ndisplay:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;flex-direction:row;\n-webkit-box-align:center;-webkit-align-items:center;align-items:center;position:relative;position:fixed;bottom:0;left:0;width:100%;z-index:998;box-sizing:initial}.u-tabbar__content__circle__border[data-v-5bd6e012]{border-radius:100%;width:%?110?%;height:%?110?%;top:%?-48?%;position:absolute;z-index:4;background-color:#fff;left:50%;-webkit-transform:translateX(-50%);transform:translateX(-50%)}.u-tabbar__content__circle__border[data-v-5bd6e012]:after{border-radius:100px}.u-tabbar__content__item[data-v-5bd6e012]{-webkit-box-flex:1;-webkit-flex:1;flex:1;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;height:100%;padding:%?12?% 0;\ndisplay:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;flex-direction:row;\nflex-direction:column;-webkit-box-align:center;-webkit-align-items:center;align-items:center;position:relative}.u-tabbar__content__item__button[data-v-5bd6e012]{position:absolute;top:%?14?%;left:50%;-webkit-transform:translateX(-50%);transform:translateX(-50%)}.u-tabbar__content__item__text[data-v-5bd6e012]{color:#606266;font-size:%?26?%;line-height:%?28?%;position:absolute;bottom:%?14?%;left:50%;-webkit-transform:translateX(-50%);transform:translateX(-50%);width:100%;text-align:center}.u-tabbar__content__circle[data-v-5bd6e012]{position:relative;\ndisplay:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;flex-direction:row;\nflex-direction:column;-webkit-box-pack:justify;-webkit-justify-content:space-between;justify-content:space-between;z-index:10;height:calc(100% - 1px)}.u-tabbar__content__circle__button[data-v-5bd6e012]{width:%?90?%;height:%?90?%;border-radius:100%;\ndisplay:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;flex-direction:row;\n-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;-webkit-box-align:center;-webkit-align-items:center;align-items:center;position:absolute;background-color:#fff;top:%?-40?%;left:50%;z-index:6;-webkit-transform:translateX(-50%);transform:translateX(-50%)}',""]),t.exports=e},"87cd":function(t,e,n){"use strict";n.r(e);var i=n("a710"),o=n("d54d");for(var a in o)["default"].indexOf(a)<0&&function(t){n.d(e,t,(function(){return o[t]}))}(a);n("13f6");var r,c=n("f0c5"),l=Object(c["a"])(o["default"],i["b"],i["c"],!1,null,"67988de8",null,!1,i["a"],r);e["default"]=l.exports},"8cf3":function(t,e,n){var i=n("7b89");"string"===typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);var o=n("4f06").default;o("0f0ff947",i,!0,{sourceMap:!1,shadowMode:!1})},9971:function(t,e,n){"use strict";n.r(e);var i=n("bf18"),o=n("fe4c");for(var a in o)["default"].indexOf(a)<0&&function(t){n.d(e,t,(function(){return o[t]}))}(a);n("1fab");var r,c=n("f0c5"),l=Object(c["a"])(o["default"],i["b"],i["c"],!1,null,"34077204",null,!1,i["a"],r);e["default"]=l.exports},a710:function(t,e,n){"use strict";n.d(e,"b",(function(){return o})),n.d(e,"c",(function(){return a})),n.d(e,"a",(function(){return i}));var i={uIcon:n("f86b").default},o=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-uni-view",{},[n("v-uni-view",{staticClass:"u-navbar",class:{"u-navbar-fixed":t.isFixed,"u-border-bottom":t.borderBottom},style:[t.navbarStyle]},[n("v-uni-view",{staticClass:"u-status-bar",style:{height:t.statusBarHeight+"px"}}),n("v-uni-view",{staticClass:"u-navbar-inner",style:[t.navbarInnerStyle]},[t.isBack?n("v-uni-view",{staticClass:"u-back-wrap",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.goBack.apply(void 0,arguments)}}},[n("v-uni-view",{staticClass:"u-icon-wrap"},[n("u-icon",{attrs:{name:t.backIconName,color:t.backIconColor,size:t.backIconSize}})],1),t.backText?n("v-uni-view",{staticClass:"u-icon-wrap u-back-text u-line-1",style:[t.backTextStyle]},[t._v(t._s(t.backText))]):t._e()],1):t._e(),t.title?n("v-uni-view",{staticClass:"u-navbar-content-title",style:[t.titleStyle]},[n("v-uni-view",{staticClass:"u-title u-line-1",style:{color:t.titleColor,fontSize:t.titleSize+"rpx",fontWeight:t.titleBold?"bold":"normal"}},[t._v(t._s(t.title))])],1):t._e(),n("v-uni-view",{staticClass:"u-slot-content"},[t._t("default")],2),n("v-uni-view",{staticClass:"u-slot-right"},[t._t("right")],2)],1)],1),t.isFixed&&!t.immersive?n("v-uni-view",{staticClass:"u-navbar-placeholder",style:{width:"100%",height:Number(t.navbarHeight)+t.statusBarHeight+"px"}}):t._e()],1)},a=[]},afe1:function(t,e,n){"use strict";var i=n("8cf3"),o=n.n(i);o.a},bd36:function(t,e,n){var i=n("24fb");e=i(!1),e.push([t.i,'@charset "UTF-8";\n/* 文字溢出处理(一行) */\n/* 文字溢出处理(多行) */\n/* 填充页面 */\n/* 除了最后一个元素 */\n/* 行为相关颜色 */\n/* 文字基本颜色 */\n/* 背景颜色 */\n/* 边框颜色 */\n/* 尺寸变量 */\n/* 文字尺寸 */\n/* 图片尺寸 */\n/* Border Radius */\n/* 水平间距 */\n/* 垂直间距 */\n/* 透明度 */\n/* 文章场景相关 */.u-badge[data-v-34077204]{display:-webkit-inline-box;display:-webkit-inline-flex;display:inline-flex;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;-webkit-box-align:center;-webkit-align-items:center;align-items:center;line-height:%?24?%;padding:%?4?% %?8?%;border-radius:%?100?%;z-index:9}.u-badge--bg--primary[data-v-34077204]{background-color:#fe9b2a}.u-badge--bg--error[data-v-34077204]{background-color:#fa3534}.u-badge--bg--success[data-v-34077204]{background-color:#19be6b}.u-badge--bg--info[data-v-34077204]{background-color:#909399}.u-badge--bg--warning[data-v-34077204]{background-color:#f90}.u-badge-dot[data-v-34077204]{height:%?16?%;width:%?16?%;border-radius:%?100?%;line-height:1}.u-badge-mini[data-v-34077204]{-webkit-transform:scale(.8);transform:scale(.8);-webkit-transform-origin:center center;transform-origin:center center}.u-info[data-v-34077204]{background-color:#909399;color:#fff}',""]),t.exports=e},be0e:function(t,e,n){var i=n("bd36");"string"===typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);var o=n("4f06").default;o("0a09e850",i,!0,{sourceMap:!1,shadowMode:!1})},bf18:function(t,e,n){"use strict";var i;n.d(e,"b",(function(){return o})),n.d(e,"c",(function(){return a})),n.d(e,"a",(function(){return i}));var o=function(){var t=this,e=t.$createElement,n=t._self._c||e;return t.show?n("v-uni-view",{staticClass:"u-badge",class:[t.isDot?"u-badge-dot":"","mini"==t.size?"u-badge-mini":"",t.type?"u-badge--bg--"+t.type:""],style:[{top:t.offset[0]+"rpx",right:t.offset[1]+"rpx",fontSize:t.fontSize+"rpx",position:t.absolute?"absolute":"static",color:t.color,backgroundColor:t.bgColor},t.boxStyle]},[t._v(t._s(t.showText))]):t._e()},a=[]},c72c:function(t,e,n){var i=n("24fb");e=i(!1),e.push([t.i,'@charset "UTF-8";\n/* 文字溢出处理(一行) */\n/* 文字溢出处理(多行) */\n/* 填充页面 */\n/* 除了最后一个元素 */\n/* 行为相关颜色 */\n/* 文字基本颜色 */\n/* 背景颜色 */\n/* 边框颜色 */\n/* 尺寸变量 */\n/* 文字尺寸 */\n/* 图片尺寸 */\n/* Border Radius */\n/* 水平间距 */\n/* 垂直间距 */\n/* 透明度 */\n/* 文章场景相关 */.view-controller[data-v-eeda1f56]{height:100%}.view-controller__container[data-v-eeda1f56]{position:relative;overflow-y:auto;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;flex-direction:column;background-color:#f5f5f5!important}.view-controller__footer[data-v-eeda1f56]{position:fixed;width:100%}.view-controller__main[data-v-eeda1f56]{-webkit-box-flex:1;-webkit-flex:1;flex:1}.view-controller__sticky[data-v-eeda1f56]{position:relative}',""]),t.exports=e},c7c9:function(t,e,n){var i=n("24fb");e=i(!1),e.push([t.i,'@charset "UTF-8";\n/* 文字溢出处理(一行) */\n/* 文字溢出处理(多行) */\n/* 填充页面 */\n/* 除了最后一个元素 */\n/* 行为相关颜色 */\n/* 文字基本颜色 */\n/* 背景颜色 */\n/* 边框颜色 */\n/* 尺寸变量 */\n/* 文字尺寸 */\n/* 图片尺寸 */\n/* Border Radius */\n/* 水平间距 */\n/* 垂直间距 */\n/* 透明度 */\n/* 文章场景相关 */.u-navbar[data-v-67988de8]{width:100%}.u-navbar-fixed[data-v-67988de8]{position:fixed;left:0;right:0;top:0;z-index:991}.u-status-bar[data-v-67988de8]{width:100%}.u-navbar-inner[data-v-67988de8]{\ndisplay:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;flex-direction:row;\n-webkit-box-pack:justify;-webkit-justify-content:space-between;justify-content:space-between;position:relative;-webkit-box-align:center;-webkit-align-items:center;align-items:center}.u-back-wrap[data-v-67988de8]{\ndisplay:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;flex-direction:row;\n-webkit-box-align:center;-webkit-align-items:center;align-items:center;-webkit-box-flex:1;-webkit-flex:1;flex:1;-webkit-box-flex:0;-webkit-flex-grow:0;flex-grow:0;padding:%?14?% %?14?% %?14?% %?24?%}.u-back-text[data-v-67988de8]{padding-left:%?4?%;font-size:%?30?%}.u-navbar-content-title[data-v-67988de8]{\ndisplay:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;flex-direction:row;\n-webkit-box-align:center;-webkit-align-items:center;align-items:center;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;-webkit-box-flex:1;-webkit-flex:1;flex:1;position:absolute;left:0;right:0;height:%?60?%;text-align:center;-webkit-flex-shrink:0;flex-shrink:0}.u-navbar-centent-slot[data-v-67988de8]{-webkit-box-flex:1;-webkit-flex:1;flex:1}.u-title[data-v-67988de8]{line-height:%?60?%;font-size:%?32?%;-webkit-box-flex:1;-webkit-flex:1;flex:1}.u-navbar-right[data-v-67988de8]{-webkit-box-flex:1;-webkit-flex:1;flex:1;\ndisplay:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;flex-direction:row;\n-webkit-box-align:center;-webkit-align-items:center;align-items:center;-webkit-box-pack:end;-webkit-justify-content:flex-end;justify-content:flex-end}.u-slot-content[data-v-67988de8]{-webkit-box-flex:1;-webkit-flex:1;flex:1;\ndisplay:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;flex-direction:row;\n-webkit-box-align:center;-webkit-align-items:center;align-items:center}',""]),t.exports=e},cd6b:function(t,e,n){"use strict";n.r(e);var i=n("02d1"),o=n("2dfc");for(var a in o)["default"].indexOf(a)<0&&function(t){n.d(e,t,(function(){return o[t]}))}(a);n("452f");var r,c=n("f0c5"),l=Object(c["a"])(o["default"],i["b"],i["c"],!1,null,"eeda1f56",null,!1,i["a"],r);e["default"]=l.exports},d54d:function(t,e,n){"use strict";n.r(e);var i=n("62f2"),o=n.n(i);for(var a in i)["default"].indexOf(a)<0&&function(t){n.d(e,t,(function(){return i[t]}))}(a);e["default"]=o.a},d6e1:function(t,e,n){var i=n("c72c");"string"===typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);var o=n("4f06").default;o("3fe49903",i,!0,{sourceMap:!1,shadowMode:!1})},d6e4:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.useLifecycleInject=e.useLifecycleProvide=void 0,n("fb6a"),n("ac1f"),n("1276"),n("4160"),n("159b"),n("b64b"),n("99af");var i=n("a6f4"),o=n("2ef0"),a=n("1cc4"),r={},c=function(){var t,e,n=getCurrentPages(),c=n[n.length-1],l=(0,i.getCurrentInstance)(),u=(null===l||void 0===l||null===(t=l.proxy)||void 0===t||null===(e=t.$route)||void 0===e?void 0:e.fullPath)||(null===c||void 0===c?void 0:c.route),s="/"===u[0]?u.slice(1):u;s=s.split("?")[0],(0,a.onLoad)((function(t){uni.$emit("".concat(s,"-onLoad"),t),r["".concat(s,"-onLoad")]=t})),(0,a.onShow)((function(){uni.$emit("".concat(s,"-onShow")),r["".concat(s,"-onShow")]="xxxx"})),(0,a.onReady)((function(){return uni.$emit("".concat(s,"-onReady"))})),(0,a.onHide)((function(){return uni.$emit("".concat(s,"-onHide"))})),(0,a.onUnload)((function(){uni.$emit("".concat(s,"-onUnload")),(0,o.forIn)(r,(function(t){delete r[t]}))})),(0,a.onPullDownRefresh)((function(){return uni.$emit("".concat(s,"-onPullDownRefresh"))})),(0,a.onReachBottom)((function(){return uni.$emit("".concat(s,"-onReachBottom"))})),(0,a.onPageScroll)((function(t){return uni.$emit("".concat(s,"-onPageScroll"),t)})),(0,a.onShareAppMessage)((function(t){return uni.$emit("".concat(s,"-onShareAppMessage"),t),{}}))};e.useLifecycleProvide=c;var l=function(t){var e,n,o=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{setup:!0},a=getCurrentPages(),c=a[a.length-1],l=(0,i.getCurrentInstance)(),u=(null===c||void 0===c?void 0:c.route)||(null===l||void 0===l||null===(e=l.proxy)||void 0===e||null===(n=e.$route)||void 0===n?void 0:n.fullPath);Object.keys(t).forEach((function(e){var n=t[e],i="".concat(u,"-").concat(e);uni.$on(i,(function(){for(var t=arguments.length,e=new Array(t),i=0;i<t;i++)e[i]=arguments[i];return null===n||void 0===n?void 0:n.apply(void 0,e)})),r[i]&&uni.$emit(i,r[i])}));var s=function(){Object.keys(t).forEach((function(t){var e="".concat(u,"-").concat(t);r[e]=null,uni.$off(e)}))};return o.setup&&(0,i.onBeforeUnmount)(s),{uninstall:s}};e.useLifecycleInject=l},e920:function(t,e,n){var i=n("c7c9");"string"===typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);var o=n("4f06").default;o("57a686a5",i,!0,{sourceMap:!1,shadowMode:!1})},fe4c:function(t,e,n){"use strict";n.r(e);var i=n("2e57"),o=n.n(i);for(var a in i)["default"].indexOf(a)<0&&function(t){n.d(e,t,(function(){return i[t]}))}(a);e["default"]=o.a}}]);