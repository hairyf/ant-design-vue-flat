(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-commons-help"],{"1cda":function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0,n("a9e3"),n("d81d");var i={name:"u-collapse-item",props:{title:{type:String,default:""},align:{type:String,default:"left"},disabled:{type:Boolean,default:!1},open:{type:Boolean,default:!1},name:{type:[Number,String],default:""},activeStyle:{type:Object,default:function(){return{}}},index:{type:[String,Number],default:""}},data:function(){return{isShow:!1,elId:this.$u.guid(),height:0,headStyle:{},bodyStyle:{},itemStyle:{},arrowColor:"",hoverClass:"",arrow:!0}},watch:{open:function(t){this.isShow=t}},created:function(){this.parent=!1,this.isShow=this.open},methods:{init:function(){var t=this;this.parent=this.$u.$parent.call(this,"u-collapse"),this.parent&&(this.nameSync=this.name?this.name:this.parent.childrens.length,this.parent.childrens.push(this),this.headStyle=this.parent.headStyle,this.bodyStyle=this.parent.bodyStyle,this.arrowColor=this.parent.arrowColor,this.hoverClass=this.parent.hoverClass,this.arrow=this.parent.arrow,this.itemStyle=this.parent.itemStyle),this.$nextTick((function(){t.queryRect()}))},headClick:function(){var t=this;this.disabled||(this.parent&&1==this.parent.accordion&&this.parent.childrens.map((function(e){t!=e&&(e.isShow=!1)})),this.isShow=!this.isShow,this.$emit("change",{index:this.index,show:this.isShow}),this.isShow&&this.parent&&this.parent.onChange(),this.$forceUpdate())},queryRect:function(){var t=this;this.$uGetRect("#"+this.elId).then((function(e){t.height=e.height}))}},mounted:function(){this.init()}};e.default=i},"21c9":function(t,e,n){var i=n("c088");"string"===typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);var a=n("4f06").default;a("4c1e1a85",i,!0,{sourceMap:!1,shadowMode:!1})},"2a6d":function(t,e,n){"use strict";n.d(e,"b",(function(){return a})),n.d(e,"c",(function(){return o})),n.d(e,"a",(function(){return i}));var i={uIcon:n("f86b").default},a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-uni-view",{staticClass:"u-collapse-item",style:[t.itemStyle]},[n("v-uni-view",{staticClass:"u-collapse-head",style:[t.headStyle],attrs:{"hover-stay-time":200,"hover-class":t.hoverClass},on:{click:function(e){e.stopPropagation(),arguments[0]=e=t.$handleEvent(e),t.headClick.apply(void 0,arguments)}}},[t.$slots["title-all"]?t._t("title-all"):[t.$slots["title"]?t._t("title"):n("v-uni-view",{staticClass:"u-collapse-title u-line-1",style:[{textAlign:t.align?t.align:"left"},t.isShow&&t.activeStyle&&!t.arrow?t.activeStyle:""]},[t._v(t._s(t.title))]),n("v-uni-view",{staticClass:"u-icon-wrap"},[t.arrow?n("u-icon",{staticClass:"u-arrow-down-icon",class:{"u-arrow-down-icon-active":t.isShow},attrs:{color:t.arrowColor,name:"arrow-down"}}):t._e()],1)]],2),n("v-uni-view",{staticClass:"u-collapse-body",style:[{height:t.isShow?t.height+"px":"0"}]},[n("v-uni-view",{staticClass:"u-collapse-content",style:[t.bodyStyle],attrs:{id:t.elId}},[t._t("default")],2)],1)],1)},o=[]},"2c5d":function(t,e,n){"use strict";n.r(e);var i=n("2a6d"),a=n("a896");for(var o in a)["default"].indexOf(o)<0&&function(t){n.d(e,t,(function(){return a[t]}))}(o);n("540f");var r,d=n("f0c5"),l=Object(d["a"])(a["default"],i["b"],i["c"],!1,null,"4bb3f8d0",null,!1,i["a"],r);e["default"]=l.exports},"4bdd":function(t,e,n){"use strict";var i;n.d(e,"b",(function(){return a})),n.d(e,"c",(function(){return o})),n.d(e,"a",(function(){return i}));var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-uni-view",{staticClass:"u-card",class:{"u-border":t.border,"u-card-full":t.full,"u-card--border":t.borderRadius>0},style:{borderRadius:t.borderRadius+"rpx",margin:t.margin,boxShadow:t.boxShadow},on:{click:function(e){e.stopPropagation(),arguments[0]=e=t.$handleEvent(e),t.click.apply(void 0,arguments)}}},[t.showHead?n("v-uni-view",{staticClass:"u-card__head",class:{"u-border-bottom":t.headBorderBottom},style:[{padding:t.padding+"rpx"},t.headStyle],on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.headClick.apply(void 0,arguments)}}},[t.$slots.head?t._t("head"):n("v-uni-view",{staticClass:"u-flex u-row-between"},[t.title?n("v-uni-view",{staticClass:"u-card__head--left u-flex u-line-1"},[t.thumb?n("v-uni-image",{staticClass:"u-card__head--left__thumb",style:{height:t.thumbWidth+"rpx",width:t.thumbWidth+"rpx",borderRadius:t.thumbCircle?"100rpx":"6rpx"},attrs:{src:t.thumb,mode:"aspectfull"}}):t._e(),n("v-uni-text",{staticClass:"u-card__head--left__title u-line-1",style:{fontSize:t.titleSize+"rpx",color:t.titleColor}},[t._v(t._s(t.title))])],1):t._e(),t.subTitle?n("v-uni-view",{staticClass:"u-card__head--right u-line-1"},[n("v-uni-text",{staticClass:"u-card__head__title__text",style:{fontSize:t.subTitleSize+"rpx",color:t.subTitleColor}},[t._v(t._s(t.subTitle))])],1):t._e()],1)],2):t._e(),n("v-uni-view",{staticClass:"u-card__body",style:[{padding:t.padding+"rpx"},t.bodyStyle],on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.bodyClick.apply(void 0,arguments)}}},[t._t("body")],2),t.showFoot?n("v-uni-view",{staticClass:"u-card__foot",class:{"u-border-top":t.footBorderTop},style:[{padding:t.$slots.foot?t.padding+"rpx":0},t.footStyle],on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.footClick.apply(void 0,arguments)}}},[t._t("foot")],2):t._e()],1)},o=[]},5178:function(t,e,n){"use strict";var i=n("7bd3"),a=n.n(i);a.a},"540f":function(t,e,n){"use strict";var i=n("ebfe"),a=n.n(i);a.a},6166:function(t,e,n){var i=n("24fb");e=i(!1),e.push([t.i,'@charset "UTF-8";\n/* 文字溢出处理(一行) */\n/* 文字溢出处理(多行) */\n/* 填充页面 */\n/* 除了最后一个元素 */\n/* 行为相关颜色 */\n/* 文字基本颜色 */\n/* 背景颜色 */\n/* 边框颜色 */\n/* 尺寸变量 */\n/* 文字尺寸 */\n/* 图片尺寸 */\n/* Border Radius */\n/* 水平间距 */\n/* 垂直间距 */\n/* 透明度 */\n/* 文章场景相关 */uni-page-body[data-v-426b3b6a]{height:100%}.help[data-v-426b3b6a]{min-height:100%;background-color:#f5f5f5}',""]),t.exports=e},"64b9":function(t,e,n){"use strict";var i;n.d(e,"b",(function(){return a})),n.d(e,"c",(function(){return o})),n.d(e,"a",(function(){return i}));var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-uni-view",{staticClass:"u-collapse"},[t._t("default")],2)},o=[]},"68bf":function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0,n("4160"),n("159b"),n("a15b");var i={name:"u-collapse",props:{accordion:{type:Boolean,default:!0},headStyle:{type:Object,default:function(){return{}}},bodyStyle:{type:Object,default:function(){return{}}},itemStyle:{type:Object,default:function(){return{}}},arrow:{type:Boolean,default:!0},arrowColor:{type:String,default:"#909399"},hoverClass:{type:String,default:"u-hover-class"}},created:function(){this.childrens=[]},data:function(){return{}},methods:{init:function(){this.childrens.forEach((function(t,e){t.init()}))},onChange:function(){var t=[];this.childrens.forEach((function(e,n){e.isShow&&t.push(e.nameSync)})),this.accordion&&(t=t.join("")),this.$emit("change",t)}}};e.default=i},"6f8f":function(t,e,n){"use strict";n.r(e);var i=n("dd33"),a=n.n(i);for(var o in i)["default"].indexOf(o)<0&&function(t){n.d(e,t,(function(){return i[t]}))}(o);e["default"]=a.a},"7bd3":function(t,e,n){var i=n("6166");"string"===typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);var a=n("4f06").default;a("bc44407e",i,!0,{sourceMap:!1,shadowMode:!1})},"8e6c":function(t,e,n){var i=n("24fb");e=i(!1),e.push([t.i,'@charset "UTF-8";\n/* 文字溢出处理(一行) */\n/* 文字溢出处理(多行) */\n/* 填充页面 */\n/* 除了最后一个元素 */\n/* 行为相关颜色 */\n/* 文字基本颜色 */\n/* 背景颜色 */\n/* 边框颜色 */\n/* 尺寸变量 */\n/* 文字尺寸 */\n/* 图片尺寸 */\n/* Border Radius */\n/* 水平间距 */\n/* 垂直间距 */\n/* 透明度 */\n/* 文章场景相关 */.u-collapse-head[data-v-4bb3f8d0]{position:relative;\ndisplay:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;flex-direction:row;\n-webkit-box-pack:justify;-webkit-justify-content:space-between;justify-content:space-between;-webkit-box-align:center;-webkit-align-items:center;align-items:center;color:#303133;font-size:%?30?%;line-height:1;padding:%?24?% 0;text-align:left}.u-collapse-title[data-v-4bb3f8d0]{-webkit-box-flex:1;-webkit-flex:1;flex:1;overflow:hidden}.u-arrow-down-icon[data-v-4bb3f8d0]{-webkit-transition:all .3s;transition:all .3s;margin-right:%?20?%;margin-left:%?14?%}.u-arrow-down-icon-active[data-v-4bb3f8d0]{-webkit-transform:rotate(180deg);transform:rotate(180deg);-webkit-transform-origin:center center;transform-origin:center center}.u-collapse-body[data-v-4bb3f8d0]{overflow:hidden;-webkit-transition:all .3s;transition:all .3s}.u-collapse-content[data-v-4bb3f8d0]{overflow:hidden;font-size:%?28?%;color:#909399;text-align:left}',""]),t.exports=e},"945f":function(t,e,n){var i=n("d7cf");"string"===typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);var a=n("4f06").default;a("4c72ab3c",i,!0,{sourceMap:!1,shadowMode:!1})},"952e":function(t,e,n){"use strict";n.r(e);var i=n("d19e"),a=n.n(i);for(var o in i)["default"].indexOf(o)<0&&function(t){n.d(e,t,(function(){return i[t]}))}(o);e["default"]=a.a},"976d":function(t,e,n){"use strict";var i=n("21c9"),a=n.n(i);a.a},"9e9a":function(t,e,n){"use strict";n.r(e);var i=n("64b9"),a=n("bd37");for(var o in a)["default"].indexOf(o)<0&&function(t){n.d(e,t,(function(){return a[t]}))}(o);n("be16");var r,d=n("f0c5"),l=Object(d["a"])(a["default"],i["b"],i["c"],!1,null,"688f25e7",null,!1,i["a"],r);e["default"]=l.exports},a896:function(t,e,n){"use strict";n.r(e);var i=n("1cda"),a=n.n(i);for(var o in i)["default"].indexOf(o)<0&&function(t){n.d(e,t,(function(){return i[t]}))}(o);e["default"]=a.a},bd37:function(t,e,n){"use strict";n.r(e);var i=n("68bf"),a=n.n(i);for(var o in i)["default"].indexOf(o)<0&&function(t){n.d(e,t,(function(){return i[t]}))}(o);e["default"]=a.a},be16:function(t,e,n){"use strict";var i=n("945f"),a=n.n(i);a.a},c088:function(t,e,n){var i=n("24fb");e=i(!1),e.push([t.i,'@charset "UTF-8";\n/* 文字溢出处理(一行) */\n/* 文字溢出处理(多行) */\n/* 填充页面 */\n/* 除了最后一个元素 */\n/* 行为相关颜色 */\n/* 文字基本颜色 */\n/* 背景颜色 */\n/* 边框颜色 */\n/* 尺寸变量 */\n/* 文字尺寸 */\n/* 图片尺寸 */\n/* Border Radius */\n/* 水平间距 */\n/* 垂直间距 */\n/* 透明度 */\n/* 文章场景相关 */.u-card[data-v-541dc022]{position:relative;overflow:hidden;font-size:%?28?%;background-color:#fff;box-sizing:border-box}.u-card-full[data-v-541dc022]{margin-left:0!important;margin-right:0!important;width:100%}.u-card--border[data-v-541dc022]:after{border-radius:%?16?%}.u-card__head--left[data-v-541dc022]{color:#303133}.u-card__head--left__thumb[data-v-541dc022]{margin-right:%?16?%}.u-card__head--left__title[data-v-541dc022]{max-width:%?400?%}.u-card__head--right[data-v-541dc022]{color:#909399;margin-left:%?6?%}.u-card__body[data-v-541dc022]{color:#606266}.u-card__foot[data-v-541dc022]{color:#909399}',""]),t.exports=e},d19e:function(t,e,n){"use strict";var i=n("ee27").default;Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a=i(n("e143")),o="https://client-static-1254212114.cos.ap-guangzhou.myqcloud.com/images/",r=a.default.extend({components:{},data:function(){return{list:[{head:"常见问题",body:"充值需先与管理员联系，并在线下支付需充值相应的金额后，管理员再对于账户进行余额充值即可",open:!0,disabled:!0},{head:"如何查看物流信息？",body:"1、亲,您可以在【个人中心-我的订单】中选择对应的订单,点击【查看物流】,  即可查询该订单的物流进度；2、如果是查询退货/换货/补寄等信息,还需要您用浏览器打开对应物流公司官网,  输入快递单号查询物流流转明细。",image:"".concat(o,"order-help.png"),open:!1},{head:"为什么有运单号却查看不到物流信息？",body:"亲有运单号未查到物流消息有以下几点1、快递公司未对此货物进行收件扫描，所以暂时查不到此单号的物流信息； 2、运单信息已录入，网上信息尚未更新建议亲可以隔天查看一般可以查看到物流消息哦，若是隔天未更新可以联系客服查询商品物流情况~3、由于物流接口对接原因或者物流查询达到上限无法查询物流信息，您可以复制物流单号到百度查询物流信息。",open:!1},{head:"可以指定快递么？",body:"1、亲,  您的商品是由商家为您安排发货,  如您需要指定具体快递配送,  建议您联系商家进行确认若因商家未按双方约定发快递导致您收不到货,  微匠工建议您优先联系物流公司或快递员进行拒收。",open:!1},{head:"商品少发/发错怎么办？",body:"1、亲,  可以拍下包裹内外详细照片，尽快联系客服；2、少发、发错的商品联系客服协商进行补发或退款。",open:!1},{head:"什么是七天无理由退货？",body:"亲，以下情况我们为您提供七天内无理由退货服务1、商品出现质量问题：运输破损、错发、漏发等；2、商品非质量问题；订单签收次日起七天内【以物流显示的签收日期为准】，商品吊牌完好未经使用或清洗、且配件赠品资料齐全，不影响二次销售。【部分特殊商品不支持七天无理由，在商品详情页面有注明】。",open:!1},{head:"订单能够修改哪些内容？",body:"1、订单付款后未发货可以修改一次收货信息",open:!1},{head:"订单如何取消？",body:"1、亲,  您可以在【个人中心-我的订单-待支付】找到对应的订单，点击取消订单，即可取消该订单",image:"".concat(o,"logistics-help.png"),open:!1}]}},computed:{},methods:{},watch:{},onLoad:function(){},onReady:function(){},onShow:function(){},onHide:function(){},onUnload:function(){},onPullDownRefresh:function(){uni.stopPullDownRefresh()},onReachBottom:function(){}});e.default=r},d505:function(t,e,n){"use strict";n.r(e);var i=n("4bdd"),a=n("6f8f");for(var o in a)["default"].indexOf(o)<0&&function(t){n.d(e,t,(function(){return a[t]}))}(o);n("976d");var r,d=n("f0c5"),l=Object(d["a"])(a["default"],i["b"],i["c"],!1,null,"541dc022",null,!1,i["a"],r);e["default"]=l.exports},d7cf:function(t,e,n){var i=n("24fb");e=i(!1),e.push([t.i,'@charset "UTF-8";\n/* 文字溢出处理(一行) */\n/* 文字溢出处理(多行) */\n/* 填充页面 */\n/* 除了最后一个元素 */\n/* 行为相关颜色 */\n/* 文字基本颜色 */\n/* 背景颜色 */\n/* 边框颜色 */\n/* 尺寸变量 */\n/* 文字尺寸 */\n/* 图片尺寸 */\n/* Border Radius */\n/* 水平间距 */\n/* 垂直间距 */\n/* 透明度 */\n/* 文章场景相关 */',""]),t.exports=e},dd33:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0,n("a9e3");var i={name:"u-card",props:{full:{type:Boolean,default:!1},title:{type:String,default:""},titleColor:{type:String,default:"#303133"},titleSize:{type:[Number,String],default:"30"},subTitle:{type:String,default:""},subTitleColor:{type:String,default:"#909399"},subTitleSize:{type:[Number,String],default:"26"},border:{type:Boolean,default:!0},index:{type:[Number,String,Object],default:""},margin:{type:String,default:"30rpx"},borderRadius:{type:[Number,String],default:"16"},headStyle:{type:Object,default:function(){return{}}},bodyStyle:{type:Object,default:function(){return{}}},footStyle:{type:Object,default:function(){return{}}},headBorderBottom:{type:Boolean,default:!0},footBorderTop:{type:Boolean,default:!0},thumb:{type:String,default:""},thumbWidth:{type:[String,Number],default:"60"},thumbCircle:{type:Boolean,default:!1},padding:{type:[String,Number],default:"30"},showHead:{type:Boolean,default:!0},showFoot:{type:Boolean,default:!0},boxShadow:{type:String,default:"none"}},data:function(){return{}},methods:{click:function(){this.$emit("click",this.index)},headClick:function(){this.$emit("head-click",this.index)},bodyClick:function(){this.$emit("body-click",this.index)},footClick:function(){this.$emit("foot-click",this.index)}}};e.default=i},ebfe:function(t,e,n){var i=n("8e6c");"string"===typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);var a=n("4f06").default;a("5dbdda1c",i,!0,{sourceMap:!1,shadowMode:!1})},f63b:function(t,e,n){"use strict";n.r(e);var i=n("fe56"),a=n("952e");for(var o in a)["default"].indexOf(o)<0&&function(t){n.d(e,t,(function(){return a[t]}))}(o);n("5178");var r,d=n("f0c5"),l=Object(d["a"])(a["default"],i["b"],i["c"],!1,null,"426b3b6a",null,!1,i["a"],r);e["default"]=l.exports},fe56:function(t,e,n){"use strict";n.d(e,"b",(function(){return a})),n.d(e,"c",(function(){return o})),n.d(e,"a",(function(){return i}));var i={viewController:n("cd6b").default,uCard:n("d505").default,uCollapse:n("9e9a").default,uCollapseItem:n("2c5d").default},a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("view-controller",[n("div",{staticClass:"help"},[n("u-card",{attrs:{"show-head":!1,"show-foot":!1,border:!1,margin:"0rpx 32rpx"}},[n("u-collapse",{attrs:{slot:"body"},slot:"body"},t._l(t.list,(function(e,i){return n("u-collapse-item",{key:i,attrs:{title:e.head,open:e.open}},[n("div",[t._v(t._s(e.body))]),e.image?n("v-uni-image",{staticClass:"u-m-t-15",staticStyle:{height:"634rpx"},attrs:{fit:"aspectFit",src:e.image}}):t._e()],1)})),1)],1),n("div",{staticStyle:{height:"30rpx"}})],1)])},o=[]}}]);