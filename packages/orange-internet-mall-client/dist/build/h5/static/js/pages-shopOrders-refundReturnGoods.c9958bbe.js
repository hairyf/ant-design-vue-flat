(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-shopOrders-refundReturnGoods"],{"0043":function(t,e,n){"use strict";var i=n("1751"),a=n.n(i);a.a},"0126":function(t,e,n){"use strict";n.r(e);var i=n("9143"),a=n.n(i);for(var o in i)["default"].indexOf(o)<0&&function(t){n.d(e,t,(function(){return i[t]}))}(o);e["default"]=a.a},1751:function(t,e,n){var i=n("e4a6");"string"===typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);var a=n("4f06").default;a("4a601407",i,!0,{sourceMap:!1,shadowMode:!1})},"1ce3":function(t,e,n){"use strict";n.r(e);var i=n("cb0a"),a=n.n(i);for(var o in i)["default"].indexOf(o)<0&&function(t){n.d(e,t,(function(){return i[t]}))}(o);e["default"]=a.a},"21c9":function(t,e,n){var i=n("c088");"string"===typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);var a=n("4f06").default;a("4c1e1a85",i,!0,{sourceMap:!1,shadowMode:!1})},2902:function(t,e,n){"use strict";n.r(e);var i=n("9c73"),a=n("0126");for(var o in a)["default"].indexOf(o)<0&&function(t){n.d(e,t,(function(){return a[t]}))}(o);n("0043");var r,l=n("f0c5"),d=Object(l["a"])(a["default"],i["b"],i["c"],!1,null,"2ba2969c",null,!1,i["a"],r);e["default"]=d.exports},"30ef":function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0,n("a9e3"),n("498a");var i={name:"u-field",props:{icon:String,rightIcon:String,required:Boolean,label:String,password:Boolean,clearable:{type:Boolean,default:!0},labelWidth:{type:[Number,String],default:130},labelAlign:{type:String,default:"left"},inputAlign:{type:String,default:"left"},iconColor:{type:String,default:"#606266"},autoHeight:{type:Boolean,default:!0},errorMessage:{type:[String,Boolean],default:""},placeholder:String,placeholderStyle:String,focus:Boolean,fixed:Boolean,value:[Number,String],type:{type:String,default:"text"},disabled:{type:Boolean,default:!1},maxlength:{type:[Number,String],default:140},confirmType:{type:String,default:"done"},labelPosition:{type:String,default:"left"},fieldStyle:{type:Object,default:function(){return{}}},clearSize:{type:[Number,String],default:30},iconStyle:{type:Object,default:function(){return{}}},borderTop:{type:Boolean,default:!1},borderBottom:{type:Boolean,default:!0},trim:{type:Boolean,default:!0}},data:function(){return{focused:!1,itemIndex:0}},computed:{inputWrapStyle:function(){var t={};return t.textAlign=this.inputAlign,"left"==this.labelPosition?t.margin="0 8rpx":t.marginRight="8rpx",t},rightIconStyle:function(){var t={};return"top"==this.arrowDirection&&(t.transform="roate(-90deg)"),"bottom"==this.arrowDirection?t.transform="roate(90deg)":t.transform="roate(0deg)",t},labelStyle:function(){var t={};return"left"==this.labelAlign&&(t.justifyContent="flext-start"),"center"==this.labelAlign&&(t.justifyContent="center"),"right"==this.labelAlign&&(t.justifyContent="flext-end"),t},justifyContent:function(){return"left"==this.labelAlign?"flex-start":"center"==this.labelAlign?"center":"right"==this.labelAlign?"flex-end":void 0},inputMaxlength:function(){return Number(this.maxlength)},fieldInnerStyle:function(){var t={};return"left"==this.labelPosition?t.flexDirection="row":t.flexDirection="column",t}},methods:{onInput:function(t){var e=t.detail.value;this.trim&&(e=this.$u.trim(e)),this.$emit("input",e)},onFocus:function(t){this.focused=!0,this.$emit("focus",t)},onBlur:function(t){var e=this;setTimeout((function(){e.focused=!1}),100),this.$emit("blur",t)},onConfirm:function(t){this.$emit("confirm",t.detail.value)},onClear:function(t){this.$emit("input","")},rightIconClick:function(){this.$emit("right-icon-click"),this.$emit("click")},fieldClick:function(){this.$emit("click")}}};e.default=i},"3f70":function(t,e,n){"use strict";var i=n("8cde"),a=n.n(i);a.a},"4bdd":function(t,e,n){"use strict";var i;n.d(e,"b",(function(){return a})),n.d(e,"c",(function(){return o})),n.d(e,"a",(function(){return i}));var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-uni-view",{staticClass:"u-card",class:{"u-border":t.border,"u-card-full":t.full,"u-card--border":t.borderRadius>0},style:{borderRadius:t.borderRadius+"rpx",margin:t.margin,boxShadow:t.boxShadow},on:{click:function(e){e.stopPropagation(),arguments[0]=e=t.$handleEvent(e),t.click.apply(void 0,arguments)}}},[t.showHead?n("v-uni-view",{staticClass:"u-card__head",class:{"u-border-bottom":t.headBorderBottom},style:[{padding:t.padding+"rpx"},t.headStyle],on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.headClick.apply(void 0,arguments)}}},[t.$slots.head?t._t("head"):n("v-uni-view",{staticClass:"u-flex u-row-between"},[t.title?n("v-uni-view",{staticClass:"u-card__head--left u-flex u-line-1"},[t.thumb?n("v-uni-image",{staticClass:"u-card__head--left__thumb",style:{height:t.thumbWidth+"rpx",width:t.thumbWidth+"rpx",borderRadius:t.thumbCircle?"100rpx":"6rpx"},attrs:{src:t.thumb,mode:"aspectfull"}}):t._e(),n("v-uni-text",{staticClass:"u-card__head--left__title u-line-1",style:{fontSize:t.titleSize+"rpx",color:t.titleColor}},[t._v(t._s(t.title))])],1):t._e(),t.subTitle?n("v-uni-view",{staticClass:"u-card__head--right u-line-1"},[n("v-uni-text",{staticClass:"u-card__head__title__text",style:{fontSize:t.subTitleSize+"rpx",color:t.subTitleColor}},[t._v(t._s(t.subTitle))])],1):t._e()],1)],2):t._e(),n("v-uni-view",{staticClass:"u-card__body",style:[{padding:t.padding+"rpx"},t.bodyStyle],on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.bodyClick.apply(void 0,arguments)}}},[t._t("body")],2),t.showFoot?n("v-uni-view",{staticClass:"u-card__foot",class:{"u-border-top":t.footBorderTop},style:[{padding:t.$slots.foot?t.padding+"rpx":0},t.footStyle],on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.footClick.apply(void 0,arguments)}}},[t._t("foot")],2):t._e()],1)},o=[]},5872:function(t,e,n){var i=n("24fb");e=i(!1),e.push([t.i,'@charset "UTF-8";\n/* 文字溢出处理(一行) */\n/* 文字溢出处理(多行) */\n/* 填充页面 */\n/* 除了最后一个元素 */\n/* 行为相关颜色 */\n/* 文字基本颜色 */\n/* 背景颜色 */\n/* 边框颜色 */\n/* 尺寸变量 */\n/* 文字尺寸 */\n/* 图片尺寸 */\n/* Border Radius */\n/* 水平间距 */\n/* 垂直间距 */\n/* 透明度 */\n/* 文章场景相关 */.u-image[data-v-3fdd3616]{position:relative;-webkit-transition:opacity .5s ease-in-out;transition:opacity .5s ease-in-out}.u-image__image[data-v-3fdd3616]{width:100%;height:100%}.u-image__loading[data-v-3fdd3616], .u-image__error[data-v-3fdd3616]{position:absolute;top:0;left:0;width:100%;height:100%;\ndisplay:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;flex-direction:row;\n-webkit-box-align:center;-webkit-align-items:center;align-items:center;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;background-color:#f3f4f6;color:#909399;font-size:%?46?%}',""]),t.exports=e},6144:function(t,e,n){var i=n("5872");"string"===typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);var a=n("4f06").default;a("717828ec",i,!0,{sourceMap:!1,shadowMode:!1})},6381:function(t,e,n){"use strict";var i=n("ee27").default;Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0,n("96cf");var a=i(n("c964"));n("d81d"),n("c740"),n("4de4"),n("a9e3"),n("4160"),n("159b");var o=i(n("e143")),r=n("79f6"),l=n("d257"),d=n("a6f4"),s=i(n("0613")),u=o.default.extend({components:{},data:function(){return{price:"",form:{images:[]},exchangeInstructions:"",goodsOrderInfo:{},type:0,goodsId:0,orderId:0,orderItemId:0,actionUrl:r.httpConfig.baseURL,requestHeader:r.httpConfig.header,addressInfo:{},afterSalesId:"",modify:!1,fileList:[]}},computed:{},setup:function(){var t=(0,d.computed)((function(){return s.default.getters.hexColor}));return{$hexColor:t}},methods:{onAfterEachUpload:function(t){var e=t.map((function(t){var e,n,i;return(null===(e=t.response)||void 0===e||null===(n=e.data)||void 0===n||null===(i=n.path)||void 0===i?void 0:i.show)||t.url}));-1===e.findIndex((function(t){return!t}))&&(this.form.images=e.filter((function(t){return t})))},onFilterOutNumber:function(){},inputPriceEvent:function(t){Number(t)>Number(this.goodsOrderInfo.goods_price*this.goodsOrderInfo.goods_num)&&(this.price="")},onSendRight:function(){var t=this;return(0,a.default)(regeneratorRuntime.mark((function e(){var n;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(!t.modify){e.next=5;break}return e.next=3,(0,r.reqApplyRight)({id:t.afterSalesId,type:t.type,order_id:t.orderId,order_item_id:t.orderItemId,shop_user_apply_reason:t.exchangeInstructions,images:t.form.images,goods_id:t.goodsId,refund_money:t.price});case 3:e.next=12;break;case 5:if(!t.afterSalesId){e.next=10;break}return e.next=8,(0,r.reqApplyProtectionAgain)({id:t.afterSalesId,type:t.type,order_id:t.orderId,order_item_id:t.orderItemId,shop_user_apply_reason:t.exchangeInstructions,images:t.form.images,goods_id:t.goodsId,refund_money:t.price});case 8:e.next=12;break;case 10:return e.next=12,(0,r.reqApplyRight)({type:t.type,order_id:t.orderId,order_item_id:t.orderItemId,shop_user_apply_reason:t.exchangeInstructions,images:t.form.images,goods_id:t.goodsId,refund_money:t.price});case 12:return n=t,e.next=15,(0,l.showToast)({title:"提交成功!",mask:!0,success:function(){setTimeout((function(){(0,l.redirectTo)("/pages/shopOrders/sprotectionRightDetail",{orderId:n.orderId,shopId:n.orderItemId})}),1500)}});case 15:case"end":return e.stop()}}),e)})))()},getGoodsDetail:function(t,e){var n=this;return(0,a.default)(regeneratorRuntime.mark((function i(){var a,o,l,d;return regeneratorRuntime.wrap((function(i){while(1)switch(i.prev=i.next){case 0:if(!n.modify){i.next=12;break}return i.next=3,(0,r.reqLegitimateDetail)(t,e);case 3:a=i.sent,o=a.data,n.goodsOrderInfo=o.data.orderGoods[0],n.exchangeInstructions=o.data.afterSales.shop_user_apply_reason,n.price=o.data.afterSales.refund_money,n.addressInfo=o.data,JSON.parse(o.data.afterSales.images).forEach((function(t){n.fileList.push({url:t})})),i.next=18;break;case 12:return i.next=14,(0,r.reqGetOrderDetial)(t,e);case 14:l=i.sent,d=l.data,n.goodsOrderInfo=d.data.order[0].orderGoods[0],n.addressInfo=d.data.order[0];case 18:case"end":return i.stop()}}),i)})))()}},watch:{},onLoad:function(t){this.modify=!!t.modify&&t.modify,this.type=t.type,this.orderId=t.orderId,this.orderItemId=t.goodsOrderId,this.goodsId=t.goodsId,this.afterSalesId=t.afterSalesId,this.getGoodsDetail(t.orderId,t.goodsOrderId)},onReady:function(){},onShow:function(){},onHide:function(){},onUnload:function(){},onPullDownRefresh:function(){uni.stopPullDownRefresh()},onReachBottom:function(){}});e.default=u},"695c":function(t,e,n){"use strict";n.r(e);var i=n("30ef"),a=n.n(i);for(var o in i)["default"].indexOf(o)<0&&function(t){n.d(e,t,(function(){return i[t]}))}(o);e["default"]=a.a},"6f8f":function(t,e,n){"use strict";n.r(e);var i=n("dd33"),a=n.n(i);for(var o in i)["default"].indexOf(o)<0&&function(t){n.d(e,t,(function(){return i[t]}))}(o);e["default"]=a.a},"7bc4":function(t,e,n){"use strict";var i=n("a891"),a=n.n(i);a.a},"7fb3":function(t,e,n){"use strict";var i=n("ee27").default;Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0,n("a9e3");var a=i(n("e143")),o=a.default.extend({model:{event:"input",prop:"value"},props:{labelAlign:String,labelColor:{type:String,default:"#666666"},label:String,inputAlign:String,placeholder:String,disabled:Boolean,value:String,height:{type:Number,default:210},maxlength:{type:Number,default:100},fontSize:{type:Number,default:24},bgColor:{type:String,default:"#f5f5f5"}},data:function(){return{index:0}},computed:{},methods:{},watch:{},mounted:function(){},beforeUpdate:function(){},updated:function(){},activated:function(){},deactivated:function(){},beforeDestroy:function(){}});e.default=o},8036:function(t,e,n){var i=n("24fb");e=i(!1),e.push([t.i,'@charset "UTF-8";\n/* 文字溢出处理(一行) */\n/* 文字溢出处理(多行) */\n/* 填充页面 */\n/* 除了最后一个元素 */\n/* 行为相关颜色 */\n/* 文字基本颜色 */\n/* 背景颜色 */\n/* 边框颜色 */\n/* 尺寸变量 */\n/* 文字尺寸 */\n/* 图片尺寸 */\n/* Border Radius */\n/* 水平间距 */\n/* 垂直间距 */\n/* 透明度 */\n/* 文章场景相关 */.u-field[data-v-5f7249ec]{font-size:%?28?%;padding:%?20?% %?28?%;text-align:left;position:relative;color:#303133}.u-field-inner[data-v-5f7249ec]{\ndisplay:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;flex-direction:row;\n-webkit-box-align:center;-webkit-align-items:center;align-items:center}.u-textarea-inner[data-v-5f7249ec]{-webkit-box-align:start;-webkit-align-items:flex-start;align-items:flex-start}.u-textarea-class[data-v-5f7249ec]{min-height:%?96?%;width:auto;font-size:%?28?%}.fild-body[data-v-5f7249ec]{\ndisplay:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;flex-direction:row;\n-webkit-box-flex:1;-webkit-flex:1;flex:1;-webkit-box-align:center;-webkit-align-items:center;align-items:center}.u-arror-right[data-v-5f7249ec]{margin-left:%?8?%}.u-label-text[data-v-5f7249ec]{display:-webkit-inline-box;display:-webkit-inline-flex;display:inline-flex}.u-label-left-gap[data-v-5f7249ec]{margin-left:%?6?%}.u-label-postion-top[data-v-5f7249ec]{-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;flex-direction:column;-webkit-box-align:start;-webkit-align-items:flex-start;align-items:flex-start}.u-label[data-v-5f7249ec]{width:%?130?%;-webkit-box-flex:1;-webkit-flex:1 1 %?130?%;flex:1 1 %?130?%;text-align:left;position:relative;\ndisplay:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;flex-direction:row;\n-webkit-box-align:center;-webkit-align-items:center;align-items:center}.u-required[data-v-5f7249ec]::before{content:"*";position:absolute;left:%?-16?%;font-size:14px;color:#fa3534;height:9px;line-height:1}.u-field__input-wrap[data-v-5f7249ec]{position:relative;overflow:hidden;font-size:%?28?%;height:%?48?%;-webkit-box-flex:1;-webkit-flex:1;flex:1;width:auto}.u-clear-icon[data-v-5f7249ec]{\ndisplay:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;flex-direction:row;\n-webkit-box-align:center;-webkit-align-items:center;align-items:center}.u-error-message[data-v-5f7249ec]{color:#fa3534;font-size:%?26?%;text-align:left}.placeholder-style[data-v-5f7249ec]{color:#969799}.u-input-class[data-v-5f7249ec]{font-size:%?28?%}.u-button-wrap[data-v-5f7249ec]{margin-left:%?8?%}',""]),t.exports=e},8338:function(t,e,n){"use strict";n.r(e);var i=n("d211"),a=n("c1f5");for(var o in a)["default"].indexOf(o)<0&&function(t){n.d(e,t,(function(){return a[t]}))}(o);n("ac89");var r,l=n("f0c5"),d=Object(l["a"])(a["default"],i["b"],i["c"],!1,null,"8a1af30c",null,!1,i["a"],r);e["default"]=d.exports},"8cde":function(t,e,n){var i=n("8036");"string"===typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);var a=n("4f06").default;a("c0ce53d6",i,!0,{sourceMap:!1,shadowMode:!1})},9143:function(t,e,n){"use strict";var i=n("ee27").default;Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0,n("a9e3");var a=n("d257"),o=i(n("e143")),r=o.default.extend({props:{height:{type:[String,Number],default:15},bgColor:String,position:{type:String,default:"static"},text:{type:String,default:""},fontSize:{type:[String,Number],default:30},color:{type:String,default:"#000"}},data:function(){return{}},computed:{style:function(){return{height:(0,a.analyUnit)(this.height),lineHeight:(0,a.analyUnit)(this.height),fontSize:(0,a.analyUnit)(this.fontSize),color:this.color,backgroundColor:this.bgColor,position:this.position}}},methods:{},watch:{},mounted:function(){},beforeUpdate:function(){},updated:function(){},activated:function(){},deactivated:function(){},beforeDestroy:function(){}});e.default=r},"91e1":function(t,e,n){"use strict";var i;n.d(e,"b",(function(){return a})),n.d(e,"c",(function(){return o})),n.d(e,"a",(function(){return i}));var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"custom-textarea"},[t.label?n("div",{staticClass:"tips",style:{textAlign:t.labelAlign,color:t.labelColor}},[t._t("left"),t._v(t._s(t.label))],2):t._e(),n("v-uni-textarea",{style:{textAlign:t.inputAlign,height:t.height+"rpx",fontSize:t.fontSize+"rpx",backgroundColor:t.bgColor},attrs:{"placeholder-class":"placeholder-input",placeholder:t.placeholder,disabled:t.disabled,value:t.value,maxlength:t.maxlength,name:"",id:"",cols:"30",rows:"10"},on:{input:function(e){arguments[0]=e=t.$handleEvent(e),t.$emit("input",e.detail.value),t.index=e.detail.value.length}}}),n("v-uni-cover-view",{staticClass:"textarea-tips"},[t._v("还可输入 "+t._s(t.maxlength-t.index)+" 字")])],1)},o=[]},"976d":function(t,e,n){"use strict";var i=n("21c9"),a=n.n(i);a.a},"9c73":function(t,e,n){"use strict";var i;n.d(e,"b",(function(){return a})),n.d(e,"c",(function(){return o})),n.d(e,"a",(function(){return i}));var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"blank",style:[t.style]},[t._v(t._s(t.text))])},o=[]},"9df5":function(t,e,n){"use strict";n.r(e);var i=n("d478"),a=n("1ce3");for(var o in a)["default"].indexOf(o)<0&&function(t){n.d(e,t,(function(){return a[t]}))}(o);n("fd40");var r,l=n("f0c5"),d=Object(l["a"])(a["default"],i["b"],i["c"],!1,null,"3fdd3616",null,!1,i["a"],r);e["default"]=d.exports},"9ff4":function(t,e,n){"use strict";n.r(e);var i=n("91e1"),a=n("de04");for(var o in a)["default"].indexOf(o)<0&&function(t){n.d(e,t,(function(){return a[t]}))}(o);n("7bc4");var r,l=n("f0c5"),d=Object(l["a"])(a["default"],i["b"],i["c"],!1,null,"15bf207a",null,!1,i["a"],r);e["default"]=d.exports},a891:function(t,e,n){var i=n("e75f");"string"===typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);var a=n("4f06").default;a("e78ff396",i,!0,{sourceMap:!1,shadowMode:!1})},ac89:function(t,e,n){"use strict";var i=n("eae4"),a=n.n(i);a.a},c088:function(t,e,n){var i=n("24fb");e=i(!1),e.push([t.i,'@charset "UTF-8";\n/* 文字溢出处理(一行) */\n/* 文字溢出处理(多行) */\n/* 填充页面 */\n/* 除了最后一个元素 */\n/* 行为相关颜色 */\n/* 文字基本颜色 */\n/* 背景颜色 */\n/* 边框颜色 */\n/* 尺寸变量 */\n/* 文字尺寸 */\n/* 图片尺寸 */\n/* Border Radius */\n/* 水平间距 */\n/* 垂直间距 */\n/* 透明度 */\n/* 文章场景相关 */.u-card[data-v-541dc022]{position:relative;overflow:hidden;font-size:%?28?%;background-color:#fff;box-sizing:border-box}.u-card-full[data-v-541dc022]{margin-left:0!important;margin-right:0!important;width:100%}.u-card--border[data-v-541dc022]:after{border-radius:%?16?%}.u-card__head--left[data-v-541dc022]{color:#303133}.u-card__head--left__thumb[data-v-541dc022]{margin-right:%?16?%}.u-card__head--left__title[data-v-541dc022]{max-width:%?400?%}.u-card__head--right[data-v-541dc022]{color:#909399;margin-left:%?6?%}.u-card__body[data-v-541dc022]{color:#606266}.u-card__foot[data-v-541dc022]{color:#909399}',""]),t.exports=e},c1f5:function(t,e,n){"use strict";n.r(e);var i=n("6381"),a=n.n(i);for(var o in i)["default"].indexOf(o)<0&&function(t){n.d(e,t,(function(){return i[t]}))}(o);e["default"]=a.a},c732:function(t,e,n){"use strict";n.r(e);var i=n("cd18"),a=n("695c");for(var o in a)["default"].indexOf(o)<0&&function(t){n.d(e,t,(function(){return a[t]}))}(o);n("3f70");var r,l=n("f0c5"),d=Object(l["a"])(a["default"],i["b"],i["c"],!1,null,"5f7249ec",null,!1,i["a"],r);e["default"]=d.exports},cb0a:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0,n("a9e3");var i={name:"u-image",props:{src:{type:String,default:""},mode:{type:String,default:"aspectFill"},width:{type:[String,Number],default:"100%"},height:{type:[String,Number],default:"auto"},shape:{type:String,default:"square"},borderRadius:{type:[String,Number],default:0},lazyLoad:{type:Boolean,default:!0},showMenuByLongpress:{type:Boolean,default:!0},loadingIcon:{type:String,default:"photo"},errorIcon:{type:String,default:"error-circle"},showLoading:{type:Boolean,default:!0},showError:{type:Boolean,default:!0},fade:{type:Boolean,default:!0},webp:{type:Boolean,default:!1},duration:{type:[String,Number],default:500},bgColor:{type:String,default:"#f3f4f6"}},data:function(){return{isError:!1,loading:!0,opacity:1,durationTime:this.duration,backgroundStyle:{}}},watch:{src:{immediate:!0,handler:function(t){t?this.isError=!1:(this.isError=!0,this.loading=!1)}}},computed:{wrapStyle:function(){var t={};return t.width=this.$u.addUnit(this.width),t.height=this.$u.addUnit(this.height),t.borderRadius="circle"==this.shape?"50%":this.$u.addUnit(this.borderRadius),t.overflow=this.borderRadius>0?"hidden":"visible",this.fade&&(t.opacity=this.opacity,t.transition="opacity ".concat(Number(this.durationTime)/1e3,"s ease-in-out")),t}},methods:{onClick:function(){this.$emit("click")},onErrorHandler:function(t){this.loading=!1,this.isError=!0,this.$emit("error",t)},onLoadHandler:function(){var t=this;if(this.loading=!1,this.isError=!1,this.$emit("load"),!this.fade)return this.removeBgColor();this.opacity=0,this.durationTime=0,setTimeout((function(){t.durationTime=t.duration,t.opacity=1,setTimeout((function(){t.removeBgColor()}),t.durationTime)}),50)},removeBgColor:function(){this.backgroundStyle={backgroundColor:"transparent"}}}};e.default=i},cd18:function(t,e,n){"use strict";n.d(e,"b",(function(){return a})),n.d(e,"c",(function(){return o})),n.d(e,"a",(function(){return i}));var i={uIcon:n("f86b").default},a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-uni-view",{staticClass:"u-field",class:{"u-border-top":t.borderTop,"u-border-bottom":t.borderBottom}},[n("v-uni-view",{staticClass:"u-field-inner",class:["textarea"==t.type?"u-textarea-inner":"","u-label-postion-"+t.labelPosition]},[n("v-uni-view",{staticClass:"u-label",class:[t.required?"u-required":""],style:{justifyContent:t.justifyContent,flex:"left"==t.labelPosition?"0 0 "+t.labelWidth+"rpx":"1"}},[t.icon?n("v-uni-view",{staticClass:"u-icon-wrap"},[n("u-icon",{staticClass:"u-icon",attrs:{size:"32","custom-style":t.iconStyle,name:t.icon,color:t.iconColor}})],1):t._e(),t._t("icon"),n("v-uni-text",{staticClass:"u-label-text",class:[this.$slots.icon||t.icon?"u-label-left-gap":""]},[t._v(t._s(t.label))])],2),n("v-uni-view",{staticClass:"fild-body"},[n("v-uni-view",{staticClass:"u-flex-1 u-flex",style:[t.inputWrapStyle]},["textarea"==t.type?n("v-uni-textarea",{staticClass:"u-flex-1 u-textarea-class",style:[t.fieldStyle],attrs:{value:t.value,placeholder:t.placeholder,placeholderStyle:t.placeholderStyle,disabled:t.disabled,maxlength:t.inputMaxlength,focus:t.focus,autoHeight:t.autoHeight,fixed:t.fixed},on:{input:function(e){arguments[0]=e=t.$handleEvent(e),t.onInput.apply(void 0,arguments)},blur:function(e){arguments[0]=e=t.$handleEvent(e),t.onBlur.apply(void 0,arguments)},focus:function(e){arguments[0]=e=t.$handleEvent(e),t.onFocus.apply(void 0,arguments)},confirm:function(e){arguments[0]=e=t.$handleEvent(e),t.onConfirm.apply(void 0,arguments)},click:function(e){arguments[0]=e=t.$handleEvent(e),t.fieldClick.apply(void 0,arguments)}}}):n("v-uni-input",{staticClass:"u-flex-1 u-field__input-wrap",style:[t.fieldStyle],attrs:{type:t.type,value:t.value,password:t.password||"password"===this.type,placeholder:t.placeholder,placeholderStyle:t.placeholderStyle,disabled:t.disabled,maxlength:t.inputMaxlength,focus:t.focus,confirmType:t.confirmType},on:{focus:function(e){arguments[0]=e=t.$handleEvent(e),t.onFocus.apply(void 0,arguments)},blur:function(e){arguments[0]=e=t.$handleEvent(e),t.onBlur.apply(void 0,arguments)},input:function(e){arguments[0]=e=t.$handleEvent(e),t.onInput.apply(void 0,arguments)},confirm:function(e){arguments[0]=e=t.$handleEvent(e),t.onConfirm.apply(void 0,arguments)},click:function(e){arguments[0]=e=t.$handleEvent(e),t.fieldClick.apply(void 0,arguments)}}})],1),t.clearable&&""!=t.value&&t.focused?n("u-icon",{staticClass:"u-clear-icon",attrs:{size:t.clearSize,name:"close-circle-fill",color:"#c0c4cc"},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.onClear.apply(void 0,arguments)}}}):t._e(),n("v-uni-view",{staticClass:"u-button-wrap"},[t._t("right")],2),t.rightIcon?n("u-icon",{staticClass:"u-arror-right",style:[t.rightIconStyle],attrs:{name:t.rightIcon,color:"#c0c4cc",size:"26"},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.rightIconClick.apply(void 0,arguments)}}}):t._e()],1)],1),!1!==t.errorMessage&&""!=t.errorMessage?n("v-uni-view",{staticClass:"u-error-message",style:{paddingLeft:t.labelWidth+"rpx"}},[t._v(t._s(t.errorMessage))]):t._e()],1)},o=[]},d0129:function(t,e,n){var i=n("24fb");e=i(!1),e.push([t.i,'@charset "UTF-8";\n/* 文字溢出处理(一行) */\n/* 文字溢出处理(多行) */\n/* 填充页面 */\n/* 除了最后一个元素 */\n/* 行为相关颜色 */\n/* 文字基本颜色 */\n/* 背景颜色 */\n/* 边框颜色 */\n/* 尺寸变量 */\n/* 文字尺寸 */\n/* 图片尺寸 */\n/* Border Radius */\n/* 水平间距 */\n/* 垂直间距 */\n/* 透明度 */\n/* 文章场景相关 */\n/* 全局容器 */uni-page-body[data-v-8a1af30c]{height:100%}.refund-return-goods[data-v-8a1af30c]{min-height:100%;background-color:#f8f8f8}.refund-return-goods[data-v-8a1af30c]{padding-top:%?15?%}\n/* 退款金额 */.after-sales-money .title[data-v-8a1af30c]{padding-top:%?10?%}.after-sales-money .tips[data-v-8a1af30c]{padding-top:%?25?%;font-size:%?24?%;color:#acacac}.after-sales-money .u-field[data-v-8a1af30c]{font-size:%?44?%!important;color:#ff3d00!important;font-weight:700}\n/* 退款规则 */.after-sales-rule[data-v-8a1af30c]{color:#acacac}\n/* 退款说明容器 */.refund-return-goods-explain .title[data-v-8a1af30c]{font-size:%?28?%;font-weight:700}\n/* 自定义上传组件 */.slot-btn[data-v-8a1af30c]{width:%?138?%;height:%?138?%;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;flex-direction:column;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;-webkit-box-align:center;-webkit-align-items:center;align-items:center;background:#f4f5f6;border-radius:%?10?%}.slot-btn .title[data-v-8a1af30c]{font-size:%?28?%;margin-bottom:%?3?%}.slot-btn .tips[data-v-8a1af30c]{font-size:%?21?%}.slot-btn__hover[data-v-8a1af30c]{background-color:#ebecee}\n/* 底部操作栏 */.footer-btns[data-v-8a1af30c]{position:fixed;left:0;right:0;padding:%?20?% %?56?%;background-color:#fff;bottom:0}',""]),t.exports=e},d211:function(t,e,n){"use strict";n.d(e,"b",(function(){return a})),n.d(e,"c",(function(){return o})),n.d(e,"a",(function(){return i}));var i={uCard:n("d505").default,uImage:n("9df5").default,uField:n("c732").default,customTextarea:n("9ff4").default,uUpload:n("eea8").default,uIcon:n("f86b").default,unionBlank:n("2902").default,uButton:n("d9ad").default},a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"refund-return-goods"},[n("u-card",{attrs:{"show-head":!1,border:!1,padding:"20",margin:"20rpx 34rpx"}},[n("div",{staticClass:"after-sales-order-container u-flex",attrs:{slot:"body"},slot:"body"},[n("div",{staticClass:"left-column"},[n("u-image",{attrs:{width:"120",height:"120","border-radius":10,src:t.goodsOrderInfo.goods_image}})],1),n("div",{staticClass:"right-column"},[n("div",{staticClass:"title"},[t._v(t._s(t.goodsOrderInfo.goods_title))]),n("div",{staticClass:"price-count"},[n("span",{staticClass:"price u-margin-right-10"},[t._v("单价：¥"+t._s(t.goodsOrderInfo.goods_price))]),n("span",{staticClass:"count"},[t._v("购买数量："+t._s(t.goodsOrderInfo.goods_num))])])])])]),n("u-card",{attrs:{"show-head":!1,border:!1,padding:"28",margin:"20rpx 34rpx"}},[n("div",{staticClass:"after-sales-money",attrs:{slot:"body"},slot:"body"},[n("div",{staticClass:"title"},[t._v("退款金额")]),n("u-field",{attrs:{label:"￥","label-width":"20","icon-style":{fontSize:"44rpx"},"field-style":{fontSize:"44rpx"}},on:{input:function(e){arguments[0]=e=t.$handleEvent(e),t.inputPriceEvent.apply(void 0,arguments)}},model:{value:t.price,callback:function(e){t.price=e},expression:"price"}}),n("div",{staticClass:"tips"},[t._v("点击修改退款金额，本次最多可申请"),n("span",{style:{color:t.$hexColor["--color-primary"]}},[t._v(t._s((t.goodsOrderInfo.goods_price-0)*(t.goodsOrderInfo.goods_num-0)))]),t._v("元")])],1)]),n("u-card",{attrs:{"show-head":!1,border:!1,padding:"28",margin:"20rpx 34rpx"}},[n("div",{staticClass:"refund-return-goods-explain",attrs:{slot:"body"},slot:"body"},[n("div",{staticClass:"title"},[t._v("退款说明")]),n("custom-textarea",{attrs:{placeholder:"请输入至少5个文字的退款说明"},model:{value:t.exchangeInstructions,callback:function(e){t.exchangeInstructions=e},expression:"exchangeInstructions"}}),n("u-upload",{ref:"uUpload",attrs:{"custom-btn":!0,action:t.actionUrl+"shop/clientUpload/add",header:t.requestHeader,"form-data":{group_type:"1"},width:138,height:138,"max-count":5,"file-list":t.fileList},on:{"on-uploaded":function(e){arguments[0]=e=t.$handleEvent(e),t.onAfterEachUpload.apply(void 0,arguments)},"on-list-change":function(e){arguments[0]=e=t.$handleEvent(e),t.onAfterEachUpload.apply(void 0,arguments)}}},[n("div",{staticClass:"slot-btn",attrs:{slot:"addBtn","hover-class":"slot-btn__hover","hover-stay-time":"150"},slot:"addBtn"},[n("u-icon",{attrs:{name:"camera",size:"45",color:t.$u.color["lightColor"]}}),n("div",{staticClass:"title"},[t._v("添加照片")]),n("div",{staticClass:"tips"},[t._v("至多5张")])],1)])],1)]),n("union-blank",{attrs:{height:120}}),n("div",{staticClass:"footer-btns"},[n("u-button",{attrs:{shape:"circle",type:"primary",ripple:!0,"custom-style":{background:t.$hexColor["--color-primary"]}},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.onSendRight.apply(void 0,arguments)}}},[t._v("提交")])],1)],1)},o=[]},d478:function(t,e,n){"use strict";n.d(e,"b",(function(){return a})),n.d(e,"c",(function(){return o})),n.d(e,"a",(function(){return i}));var i={uIcon:n("f86b").default},a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-uni-view",{staticClass:"u-image",style:[t.wrapStyle,t.backgroundStyle],on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.onClick.apply(void 0,arguments)}}},[t.isError?t._e():n("v-uni-image",{staticClass:"u-image__image",style:{borderRadius:"circle"==t.shape?"50%":t.$u.addUnit(t.borderRadius)},attrs:{src:t.src,mode:t.mode,"lazy-load":t.lazyLoad,"show-menu-by-longpress":t.showMenuByLongpress},on:{error:function(e){arguments[0]=e=t.$handleEvent(e),t.onErrorHandler.apply(void 0,arguments)},load:function(e){arguments[0]=e=t.$handleEvent(e),t.onLoadHandler.apply(void 0,arguments)}}}),t.showLoading&&t.loading?n("v-uni-view",{staticClass:"u-image__loading",style:{borderRadius:"circle"==t.shape?"50%":t.$u.addUnit(t.borderRadius),backgroundColor:this.bgColor}},[t.$slots.loading?t._t("loading"):n("u-icon",{attrs:{name:t.loadingIcon,width:t.width,height:t.height}})],2):t._e(),t.showError&&t.isError&&!t.loading?n("v-uni-view",{staticClass:"u-image__error",style:{borderRadius:"circle"==t.shape?"50%":t.$u.addUnit(t.borderRadius)}},[t.$slots.error?t._t("error"):n("u-icon",{attrs:{name:t.errorIcon,width:t.width,height:t.height}})],2):t._e()],1)},o=[]},d505:function(t,e,n){"use strict";n.r(e);var i=n("4bdd"),a=n("6f8f");for(var o in a)["default"].indexOf(o)<0&&function(t){n.d(e,t,(function(){return a[t]}))}(o);n("976d");var r,l=n("f0c5"),d=Object(l["a"])(a["default"],i["b"],i["c"],!1,null,"541dc022",null,!1,i["a"],r);e["default"]=d.exports},dd33:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0,n("a9e3");var i={name:"u-card",props:{full:{type:Boolean,default:!1},title:{type:String,default:""},titleColor:{type:String,default:"#303133"},titleSize:{type:[Number,String],default:"30"},subTitle:{type:String,default:""},subTitleColor:{type:String,default:"#909399"},subTitleSize:{type:[Number,String],default:"26"},border:{type:Boolean,default:!0},index:{type:[Number,String,Object],default:""},margin:{type:String,default:"30rpx"},borderRadius:{type:[Number,String],default:"16"},headStyle:{type:Object,default:function(){return{}}},bodyStyle:{type:Object,default:function(){return{}}},footStyle:{type:Object,default:function(){return{}}},headBorderBottom:{type:Boolean,default:!0},footBorderTop:{type:Boolean,default:!0},thumb:{type:String,default:""},thumbWidth:{type:[String,Number],default:"60"},thumbCircle:{type:Boolean,default:!1},padding:{type:[String,Number],default:"30"},showHead:{type:Boolean,default:!0},showFoot:{type:Boolean,default:!0},boxShadow:{type:String,default:"none"}},data:function(){return{}},methods:{click:function(){this.$emit("click",this.index)},headClick:function(){this.$emit("head-click",this.index)},bodyClick:function(){this.$emit("body-click",this.index)},footClick:function(){this.$emit("foot-click",this.index)}}};e.default=i},de04:function(t,e,n){"use strict";n.r(e);var i=n("7fb3"),a=n.n(i);for(var o in i)["default"].indexOf(o)<0&&function(t){n.d(e,t,(function(){return i[t]}))}(o);e["default"]=a.a},e4a6:function(t,e,n){var i=n("24fb");e=i(!1),e.push([t.i,'@charset "UTF-8";\n/* 文字溢出处理(一行) */\n/* 文字溢出处理(多行) */\n/* 填充页面 */\n/* 除了最后一个元素 */\n/* 行为相关颜色 */\n/* 文字基本颜色 */\n/* 背景颜色 */\n/* 边框颜色 */\n/* 尺寸变量 */\n/* 文字尺寸 */\n/* 图片尺寸 */\n/* Border Radius */\n/* 水平间距 */\n/* 垂直间距 */\n/* 透明度 */\n/* 文章场景相关 */.blank[data-v-2ba2969c]{position:absolute;top:0;width:100%;text-align:center}',""]),t.exports=e},e75f:function(t,e,n){var i=n("24fb");e=i(!1),e.push([t.i,'@charset "UTF-8";\n/* 文字溢出处理(一行) */\n/* 文字溢出处理(多行) */\n/* 填充页面 */\n/* 除了最后一个元素 */\n/* 行为相关颜色 */\n/* 文字基本颜色 */\n/* 背景颜色 */\n/* 边框颜色 */\n/* 尺寸变量 */\n/* 文字尺寸 */\n/* 图片尺寸 */\n/* Border Radius */\n/* 水平间距 */\n/* 垂直间距 */\n/* 透明度 */\n/* 文章场景相关 */.custom-textarea[data-v-15bf207a]{position:relative;padding:%?20?% 0}uni-textarea[data-v-15bf207a]{position:relative;width:auto;padding:%?25?%;padding-bottom:%?48?%;border-radius:%?8?%}.placeholder-input[data-v-15bf207a]{color:#9a9a9a}.tips[data-v-15bf207a]{width:%?160?%;margin-bottom:%?24?%}.textarea-tips[data-v-15bf207a]{position:absolute;font-size:%?24?%;right:%?24?%;bottom:%?64?%;color:#9a9a9a}',""]),t.exports=e},eae4:function(t,e,n){var i=n("d0129");"string"===typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);var a=n("4f06").default;a("2eab5479",i,!0,{sourceMap:!1,shadowMode:!1})},fd40:function(t,e,n){"use strict";var i=n("6144"),a=n.n(i);a.a}}]);