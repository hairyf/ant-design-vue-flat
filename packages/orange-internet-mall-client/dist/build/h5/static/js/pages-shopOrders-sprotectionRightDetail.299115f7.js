(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-shopOrders-sprotectionRightDetail"],{"03c8":function(t,e,a){var s=a("24fb");e=s(!1),e.push([t.i,'@charset "UTF-8";\n/* 文字溢出处理(一行) */\n/* 文字溢出处理(多行) */\n/* 填充页面 */\n/* 除了最后一个元素 */\n/* 行为相关颜色 */\n/* 文字基本颜色 */\n/* 背景颜色 */\n/* 边框颜色 */\n/* 尺寸变量 */\n/* 文字尺寸 */\n/* 图片尺寸 */\n/* Border Radius */\n/* 水平间距 */\n/* 垂直间距 */\n/* 透明度 */\n/* 文章场景相关 */uni-page-body[data-v-057c51be]{height:100%}.order-details[data-v-057c51be]{min-height:100%;background-color:#f2f2f2}.order-details[data-v-057c51be]{position:relative;padding-bottom:%?50?%}\n/* 页头-订单状态 */.header-container[data-v-057c51be]{-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;flex-direction:column;position:relative;width:%?750?%;color:#fff}.header-container .order-bg[data-v-057c51be]{position:absolute;top:0;left:0;width:%?750?%;height:%?334?%}.header-container .status-container[data-v-057c51be]{position:relative;z-index:10;padding-top:%?44?%;margin-bottom:%?24?%;font-size:%?34?%}.header-container .tips-container[data-v-057c51be], .header-container .btns-container[data-v-057c51be]{position:relative;margin-bottom:%?40?%;z-index:10}.header-container .btns-container[data-v-057c51be]  .u-steps .u-steps__item{min-width:%?130?%}.return-box[data-v-057c51be]{font-size:%?28?%;color:#000}.goods-body[data-v-057c51be]{font-size:%?24?%;margin:0 0 %?20?% 0;color:#acacac}\n/**寄回商品*/.goods-container .goods-header[data-v-057c51be]{font-size:%?32?%;font-weight:700;color:#000}.goods-container .goods-footer[data-v-057c51be]{padding:%?20?%;border-radius:%?8?%;color:#acacac;background-color:#eee}\n/* 订单信息 */.order-info-container[data-v-057c51be]{color:#000}.order-info-container .info-layer[data-v-057c51be]{display:-webkit-box;display:-webkit-flex;display:flex;margin-bottom:%?20?%}.order-info-container .info-layer .title[data-v-057c51be]{-webkit-flex-shrink:0;flex-shrink:0;width:%?140?%;margin-right:%?20?%;text-align:right}.order-info-container .info-layer .content[data-v-057c51be]{font-weight:550}.express-layer[data-v-057c51be]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:justify;-webkit-justify-content:space-between;justify-content:space-between;-webkit-box-align:center;-webkit-align-items:center;align-items:center}.custom-card-container .details[data-v-057c51be]{font-size:%?28?%;color:#acacac}.custom-card-container .layout-center[data-v-057c51be]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;margin-top:%?48?%}.custom-card-container .u-node[data-v-057c51be]{height:%?16?%;width:%?16?%;border-radius:%?100?%}.tips-color[data-v-057c51be]{margin-left:%?8?%;color:#fe9b2a}.refund-tips[data-v-057c51be]{margin:%?20?% 0 0 0;font-size:%?24?%;color:#acacac}.u-card__foot[data-v-057c51be]{padding:0!important}\n/* 底部操作栏 */.footer-container[data-v-057c51be]{position:fixed;bottom:0;z-index:2;height:%?120?%;width:100%;background:#fff}',""]),t.exports=e},"128b":function(t,e,a){var s=a("03c8");"string"===typeof s&&(s=[[t.i,s,""]]),s.locals&&(t.exports=s.locals);var r=a("4f06").default;r("ae055690",s,!0,{sourceMap:!1,shadowMode:!1})},"178a":function(t,e,a){"use strict";a.d(e,"b",(function(){return r})),a.d(e,"c",(function(){return o})),a.d(e,"a",(function(){return s}));var s={uIcon:a("f86b").default,uCountDown:a("e387").default,viewIcon:a("2807").default,uSteps:a("be74").default,customCardContainer:a("6d4c").default,uCellItem:a("065d").default,uRow:a("d67a").default,uCol:a("b408").default,uButton:a("d9ad").default,uTimeLine:a("34f4").default,uTimeLineItem:a("87b7").default,commonLegitimateInfo:a("6d6b").default,unionBlank:a("2902").default,linkController:a("d887").default,uModal:a("078c").default},r=function(){var t=this,e=t.$createElement,a=t._self._c||e;return t.addressInfo.afterSales?a("div",{staticClass:"order-details"},[a("div",{staticClass:"header-container u-flex"},[a("v-uni-image",{staticClass:"order-bg",attrs:{src:"https://client-static-1254212114.cos.ap-guangzhou.myqcloud.com/images/return-goods-background.png"}}),[0==t.addressInfo.afterSales.status?a("div",{staticClass:"status-container u-flex"},[a("u-icon",{staticClass:"u-m-r-12",attrs:{size:"40",name:"clock",color:"#ffffff"}}),a("span",{staticClass:"status-text"},[t._v("商家处理中")])],1):t._e(),0==t.addressInfo.afterSales.status?a("div",{staticClass:"tips-container"},[a("span",{staticClass:"tips-text"},[a("u-count-down",{attrs:{"font-size":"24rpx","separator-size":"24rpx","bg-color":"#FE8027","separator-color":"#fff",color:"#fff",separator:"zh",timestamp:t.automaticTime,"show-seconds":!1}}),t._v("后商家未处理将自动退款")],1)]):t._e(),-2==t.addressInfo.afterSales.status?a("div",{staticClass:"status-container u-flex"},[a("u-icon",{staticClass:"u-margin-right-20",attrs:{size:"40",name:"close-circle",color:"#ffffff"}}),a("span",{staticClass:"status-text"},[t._v("申请已关闭")])],1):t._e(),-2==t.addressInfo.afterSales.status?a("div",{staticClass:"tips-container"},[a("p",{staticClass:"tips-text"},[t._v("您已撤销此次订单退款申请，若您的问题未解")]),a("p",{staticClass:"tips-text"},[t._v("决，可以在有效期内再次申请")])]):t._e(),-1==t.addressInfo.afterSales.status?a("div",{staticClass:"status-container u-flex"},[a("u-icon",{staticClass:"u-margin-right-20",attrs:{size:"40",name:"close-circle",color:"#ffffff"}}),a("span",{staticClass:"status-text"},[t._v("商家已拒绝您的申请")])],1):t._e(),-1==t.addressInfo.afterSales.status?a("div",{staticClass:"tips-container"},[a("p",{staticClass:"tips-text"},[t._v("您的申请未通过，可修改退货退款申请后在有效")]),a("p",{staticClass:"tips-text"},[t._v("期内再次申请")])]):t._e(),1==t.addressInfo.afterSales.status?a("div",{staticClass:"status-container u-flex"},[a("view-icon",{staticClass:"u-margin-right-20",attrs:{size:"40",name:"cl-exchange",color:"#ffffff"}}),a("span",{staticClass:"status-text"},[t._v("七天退换，请退货给商家")])],1):t._e(),1==t.addressInfo.afterSales.status?a("div",{staticClass:"tips-container"},[a("span",{staticClass:"tips-text"},[t._v("剩余："),a("u-count-down",{attrs:{"font-size":"24rpx","separator-size":"24rpx","bg-color":"#FE8027","separator-color":"#fff",color:"#fff",separator:"zh",timestamp:t.agreedTime,"show-seconds":!1}})],1)]):t._e(),3==t.addressInfo.afterSales.status?a("div",{staticClass:"status-container u-flex"},[a("view-icon",{staticClass:"u-margin-right-20",attrs:{size:"40",name:"cl-car",color:"#ffffff"}}),a("span",{staticClass:"status-text"},[t._v("待商家收货")])],1):t._e(),3==t.addressInfo.afterSales.status?a("div",{staticClass:"tips-container"},[a("span",{staticClass:"tips-text"},[a("u-count-down",{attrs:{"font-size":"24rpx","separator-size":"24rpx","bg-color":"#FE8027","separator-color":"#fff",color:"#fff",separator:"zh",timestamp:t.businessTime,"show-minutes":!1,"show-seconds":!1}}),t._v("后商家未处理将自动退款")],1)]):t._e(),4==t.curStatus?a("div",{staticClass:"status-container u-flex"},[a("view-icon",{staticClass:"u-margin-right-20",attrs:{size:"40",name:"oe-hook",color:"#ffffff"}}),"0"==t.addressInfo.afterSales.timer_type?a("span",{staticClass:"status-text"},[t._v("退款成功")]):t._e(),"1"==t.addressInfo.afterSales.timer_type?a("span",{staticClass:"status-text"},[t._v("商家逾期未处理，自动退款成功")]):t._e()],1):t._e(),4==t.curStatus?a("div",{staticClass:"tips-container"},[a("span",{staticClass:"tips-text"},[t._v("退款金额: ￥"+t._s(t.totalRefundMoney)+" 时间:"+t._s(t.$formatUnix(t.createtime)))])]):t._e(),-1!=t.addressInfo.afterSales.status&&-2!=t.addressInfo.afterSales.status?a("div",{staticClass:"btns-container"},[a("u-steps",{attrs:{list:t.numList,current:t.curStatus,"active-color":"#ffffff","un-active-color":"rgba(255,255,255,.3)"}})],1):t._e()]],2),0==t.addressInfo.afterSales.status?a("custom-card-container",{staticClass:"custom-card-container",attrs:{title:"您的申请已提交，商家正在处理中"}},[a("div",{staticClass:"details",attrs:{slot:"body"},slot:"body"},[t._v("商家同意后,请按照给出的退货地址退货,并请记录退货运单号如商家拒绝,您可以修改申请后再次发起,商家会重新处理如商家超时未处理,退货申请将达成,请按系统给出的退货地址退货")]),a("div",{attrs:{slot:"foot"},slot:"foot"},[a("u-cell-item",{attrs:{icon:"",title:"协商历史"},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.$navigateTo("/pages/shopOrders/negotiationHistory",{order_id:t.addressInfo.afterSales.order_id,order_item_id:t.addressInfo.afterSales.order_item_id,id:t.addressInfo.afterSales.id,status:t.addressInfo.afterSales.status,type:t.addressInfo.afterSales.type,deliverTime:t.addressInfo.OrderBaseParam.cancelSafeguard.value})}}})],1)]):t._e(),-1==t.addressInfo.afterSales.status?a("custom-card-container",{staticClass:"custom-card-container",attrs:{title:"您的申请已被商家拒绝"}},[a("div",{staticClass:"details",attrs:{slot:"body"},slot:"body"},[t._v("拒绝原因："+t._s(t.addressInfo.afterSales.dismiss_reason))]),a("div",{attrs:{slot:"foot"},slot:"foot"},[a("u-cell-item",{attrs:{icon:"",title:"协商历史"},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.$navigateTo("/pages/shopOrders/negotiationHistory",{order_id:t.addressInfo.afterSales.order_id,order_item_id:t.addressInfo.afterSales.order_item_id,id:t.addressInfo.afterSales.id,status:t.addressInfo.afterSales.status,type:t.addressInfo.afterSales.type,deliverTime:t.addressInfo.OrderBaseParam.cancelSafeguard.value})}}})],1)]):t._e(),1==t.addressInfo.afterSales.status?a("custom-card-container",{staticClass:"custom-card-container",attrs:{title:"商家已同意退货申请，请尽快退货"}},[a("div",{staticClass:"details",attrs:{slot:"body"},slot:"body"},[a("div",{staticClass:"goods-body"},[t._v("未与商家协商一致,请勿使用到付或平邮,以免商家拒签货物交易的钱款还在天猫中间账户,确保您资金安全请填写真实退货物流信息,逾期未填写,退货申请将关闭")]),a("div",{staticClass:"goods-footer"},[t._v("商家备注:"+t._s(t.addressInfo.memo))])]),a("div",{attrs:{slot:"foot"},slot:"foot"})]):t._e(),1==t.addressInfo.afterSales.status?a("custom-card-container",{staticClass:"custom-card-container",attrs:{title:"商家退货信息"}},[a("div",{staticClass:"details",attrs:{slot:"body"},slot:"body"},[a("div",{staticClass:"return-box"},[a("div",{staticClass:"u-margin-top-15"},[t._v("收货人："+t._s(t.addressInfo.afterSales.consignee)+"("+t._s(t.addressInfo.afterSales.phone)+")")]),a("div",{staticClass:"u-margin-top-15"},[t._v(t._s(t.addressInfo.afterSales.province_name)+t._s(t.addressInfo.afterSales.city_name)+t._s(t.addressInfo.afterSales.area_name)+t._s(t.addressInfo.afterSales.address)),a("span",{staticClass:"tips-color",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.onCopyText(""+t.addressInfo.afterSales.province_name+t.addressInfo.afterSales.city_name+t.addressInfo.afterSales.area_name+t.addressInfo.afterSales.address)}}},[t._v("复制")])])])])]):t._e(),1==t.addressInfo.afterSales.status?a("custom-card-container",{staticClass:"custom-card-container",attrs:{title:"退货物流单号"}},[a("div",{staticClass:"details",attrs:{slot:"body"},slot:"body"},[a("div",[a("u-row",{attrs:{gutter:"16"}},[a("u-col",{attrs:{span:"2"}},[a("u-icon",{attrs:{name:"order"}})],1),a("u-col",{attrs:{span:"7"}},[a("p",[t._v("点击填写物流单号")])]),a("u-col",{attrs:{span:"3"}},[a("u-button",{attrs:{type:"primary",size:"mini",plain:!0,shape:"circle"},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.jumpEvent()}}},[t._v("填写单号")])],1)],1)],1),a("div",{staticClass:"refund-tips"},[t._v("寄出货品后需填写物流单号，有助于商家订单尽快处理")])]),a("div",{attrs:{slot:"foot"},slot:"foot"},[a("u-cell-item",{attrs:{icon:"",title:"协商历史"},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.$navigateTo("/pages/shopOrders/negotiationHistory",{order_id:t.addressInfo.afterSales.order_id,order_item_id:t.addressInfo.afterSales.order_item_id,id:t.addressInfo.afterSales.id,status:t.addressInfo.afterSales.status,type:t.addressInfo.afterSales.type,deliverTime:t.addressInfo.OrderBaseParam.cancelSafeguard.value})}}})],1)]):t._e(),3==t.addressInfo.afterSales.status?a("custom-card-container",{staticClass:"custom-card-container",attrs:{title:"物流信息"}},[a("div",{staticClass:"details",attrs:{slot:"body"},slot:"body"},[a("div",{staticClass:"express-layer"},[a("div",[t._v(t._s(t.addressInfo.afterSales.express_company)+":"+t._s(t.addressInfo.afterSales.express_sn))])]),a("div",[a("div",{staticClass:"layout-center"},[a("u-time-line",t._l(t.logisticsInfo,(function(e,s){return a("u-time-line-item",{key:s,attrs:{nodeTop:"2"}},[a("v-uni-view",{staticClass:"u-node",style:{background:t.$hexColor["--color-primary"]},attrs:{slot:"node"},slot:"node"}),a("div",{attrs:{slot:"content"},slot:"content"},[a("div",{staticClass:"u-order-title"},[t._v(t._s(e.AcceptStation))]),a("div",{staticClass:"u-order-time"},[t._v(t._s(e.AcceptTime))])])],1)})),1)],1)])]),a("div",{attrs:{slot:"foot"},slot:"foot"},[a("u-cell-item",{attrs:{icon:"",title:"协商历史"},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.$navigateTo("/pages/shopOrders/negotiationHistory",{order_id:t.addressInfo.afterSales.order_id,order_item_id:t.addressInfo.afterSales.order_item_id,id:t.addressInfo.afterSales.id,status:t.addressInfo.afterSales.status,type:t.addressInfo.afterSales.type,deliverTime:t.addressInfo.OrderBaseParam.cancelSafeguard.value})}}})],1)]):t._e(),2==t.addressInfo.afterSales.status?a("custom-card-container",{attrs:{isShowHead:!1}},[a("div",{attrs:{slot:"foot"},slot:"foot"},[a("u-cell-item",{attrs:{icon:"",title:"协商历史"},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.$navigateTo("/pages/shopOrders/negotiationHistory",{order_id:t.addressInfo.afterSales.order_id,order_item_id:t.addressInfo.afterSales.order_item_id,id:t.addressInfo.afterSales.id,status:t.addressInfo.afterSales.status,type:t.addressInfo.afterSales.type,deliverTime:t.addressInfo.OrderBaseParam.cancelSafeguard.value})}}})],1)]):t._e(),a("common-legitimate-info",{attrs:{returnInfo:t.addressInfo,title:"退款信息"}}),a("union-blank",{attrs:{height:120}}),a("div",{staticClass:"footer-container u-flex u-row-right u-border-top"},[0==t.addressInfo.afterSales.status?[a("div",{staticClass:"u-flex"},[a("u-button",{staticClass:"u-m-r-15",attrs:{size:"mini",shape:"circle"},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.revokeApply.apply(void 0,arguments)}}},[t._v("撤销申请")]),a("u-button",{staticClass:"u-m-r-15",attrs:{size:"mini",shape:"circle"},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.$navigateTo("/pages/shopOrders/refundReturnGoods",{modify:!0,type:2,orderId:t.addressInfo.id,goodsId:t.addressInfo.orderGoods[0].goods_id,goodsOrderId:t.addressInfo.orderGoods[0].id,afterSalesId:t.addressInfo.afterSales.id})}}},[t._v("修改申请")]),a("link-controller",{attrs:{data:{type:"serve"}}},[a("u-button",{staticClass:"u-m-r-15",staticStyle:{"pointer-events":"none"},attrs:{size:"mini",shape:"circle"}},[t._v("客服介入")])],1)],1)]:t._e(),-1==t.addressInfo.afterSales.status||-2==t.addressInfo.afterSales.status?[a("div",[a("u-button",{staticClass:"u-m-r-15",attrs:{size:"mini",shape:"circle"},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.applyAgain.apply(void 0,arguments)}}},[t._v("再次申请")])],1)]:t._e(),1==t.addressInfo.afterSales.status?[a("div",{staticClass:"u-flex"},[a("link-controller",{attrs:{data:{type:"serve"}}},[a("u-button",{staticClass:"u-m-r-15",staticStyle:{"pointer-events":"none"},attrs:{size:"mini",shape:"circle"}},[t._v("客服介入")])],1),a("u-button",{staticClass:"u-m-r-15",attrs:{size:"mini",shape:"circle"},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.revokeApply.apply(void 0,arguments)}}},[t._v("撤销申请")])],1)]:t._e(),3==t.addressInfo.afterSales.status||4==t.addressInfo.afterSales.status?[a("div",{staticClass:"u-flex"},[a("link-controller",{attrs:{data:{type:"serve"}}},[a("u-button",{staticClass:"u-m-r-15",staticStyle:{"pointer-events":"none"},attrs:{size:"mini",shape:"circle"}},[t._v("客服介入")])],1),a("u-button",{staticClass:"u-m-r-15",attrs:{size:"mini",shape:"circle"},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.revokeApply.apply(void 0,arguments)}}},[t._v("撤销售后")])],1)]:t._e(),2==t.addressInfo.afterSales.status?[a("div",[a("u-button",{staticClass:"u-m-r-15",attrs:{size:"mini",shape:"circle"},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.$navigateTo("/pages/shopOrders/moneyTo",{order_id:t.addressInfo.afterSales.order_id,order_item_id:t.addressInfo.afterSales.order_item_id})}}},[t._v("钱款去向")])],1)]:t._e()],2),a("u-modal",{attrs:{title:"撤销申请",content:t.revokeApplyContent,"confirm-color":"#000","cancel-color":"#000","show-cancel-button":!0},on:{confirm:function(e){arguments[0]=e=t.$handleEvent(e),t.revokeApplyConfirm.apply(void 0,arguments)},cancel:function(e){arguments[0]=e=t.$handleEvent(e),t.isRevokeApply=!1}},model:{value:t.isRevokeApply,callback:function(e){t.isRevokeApply=e},expression:"isRevokeApply"}})],1):t._e()},o=[]},2807:function(t,e,a){"use strict";a.r(e);var s=a("43bf"),r=a("b803");for(var o in r)["default"].indexOf(o)<0&&function(t){a.d(e,t,(function(){return r[t]}))}(o);var n,i=a("f0c5"),d=Object(i["a"])(r["default"],s["b"],s["c"],!1,null,"45af5623",null,!1,s["a"],n);e["default"]=d.exports},"43bf":function(t,e,a){"use strict";var s;a.d(e,"b",(function(){return r})),a.d(e,"c",(function(){return o})),a.d(e,"a",(function(){return s}));var r=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-uni-text",{class:[t.iconfont,t.name],style:[t.textStyle],on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.$emit("click")}}},[t._t("default")],2)},o=[]},"8f50":function(t,e,a){"use strict";a.r(e);var s=a("178a"),r=a("9d74");for(var o in r)["default"].indexOf(o)<0&&function(t){a.d(e,t,(function(){return r[t]}))}(o);a("ac56");var n,i=a("f0c5"),d=Object(i["a"])(r["default"],s["b"],s["c"],!1,null,"057c51be",null,!1,s["a"],n);e["default"]=d.exports},"96d5":function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0,a("a9e3"),a("ac1f"),a("1276");var s=a("d257"),r=a("a6f4"),o=(0,r.defineComponent)({props:{name:{type:String,required:!0},size:[String,Number],color:String},setup:function(t){var e=(0,r.computed)((function(){return t.name.split("-")[0]+"-iconfont"})),a=(0,r.computed)((function(){var e={};return"undefined"!==typeof t.size&&(e.fontSize=(0,s.analyUnit)(t.size)),"undefined"!==typeof t.color&&(e.color=t.color),e}));return{iconfont:e,textStyle:a}}});e.default=o},"9d74":function(t,e,a){"use strict";a.r(e);var s=a("bc2c"),r=a.n(s);for(var o in s)["default"].indexOf(o)<0&&function(t){a.d(e,t,(function(){return s[t]}))}(o);e["default"]=r.a},ac56:function(t,e,a){"use strict";var s=a("128b"),r=a.n(s);r.a},b803:function(t,e,a){"use strict";a.r(e);var s=a("96d5"),r=a.n(s);for(var o in s)["default"].indexOf(o)<0&&function(t){a.d(e,t,(function(){return s[t]}))}(o);e["default"]=r.a},bc2c:function(t,e,a){"use strict";var s=a("ee27").default;Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0,a("96cf");var r=s(a("c964"));a("a9e3");var o=s(a("e143")),n=s(a("5a0c")),i=a("79f6"),d=a("d257"),c=a("a6f4"),l=s(a("0613")),f=a("e389"),u=o.default.extend({components:{},props:{id:Number},data:function(){return{addressInfo:{},numList:[{name:"提交申请"},{name:"商家处理"},{name:"寄回商品"},{name:"商家退款"},{name:"退款成功"}],curStatus:0,revokeApplyContent:"您将撤销本次申请，如果问题未解决，您还可以再次发起，确定继续吗？",isRevokeApply:!1,createtime:0,totalRefundMoney:"",logisticsInfo:[],automaticTime:0,agreedTime:0,businessTime:0,orderId:"",shopId:""}},computed:{},setup:function(){var t=(0,c.computed)((function(){return l.default.getters.hexColor}));return{$hexColor:t}},methods:{getRightDetail:function(t,e){var a=this;return(0,r.default)(regeneratorRuntime.mark((function s(){var r,o,d,c;return regeneratorRuntime.wrap((function(s){while(1)switch(s.prev=s.next){case 0:return s.next=2,(0,i.reqLegitimateDetail)(t,e);case 2:if(r=s.sent,o=r.data,a.addressInfo=o.data,0!=a.addressInfo.afterSales.status){s.next=10;break}a.curStatus=1,a.automaticTime=(0,n.default)(1e3*o.data.afterSales.createtime).add(a.addressInfo.OrderBaseParam.toApplyForRightsOvertime.value,"day").unix()-(0,n.default)().unix(),s.next=28;break;case 10:if(1!=a.addressInfo.afterSales.status){s.next=15;break}a.curStatus=2,a.agreedTime=(0,n.default)(1e3*o.data.afterSales.start_time).add(a.addressInfo.OrderBaseParam.cancelSafeguard.value,"day").unix()-(0,n.default)().unix(),s.next=28;break;case 15:if(3!=a.addressInfo.afterSales.status){s.next=21;break}a.curStatus=3,a.businessTime=(0,n.default)(1e3*o.data.afterSales.user_shipments_time).add(a.addressInfo.OrderBaseParam.safeguardAutomation.value,"day").unix()-(0,n.default)().unix(),a.getlogisticsData(),s.next=28;break;case 21:if(2!=a.addressInfo.afterSales.status){s.next=28;break}return a.curStatus=3,s.next=25,(0,i.reqRefundStatus)(t,e);case 25:d=s.sent,c=d.data,1==c.data.status&&(a.curStatus=4,a.createtime=c.data.createtime,a.totalRefundMoney=c.data.total_refund_money);case 28:case"end":return s.stop()}}),s)})))()},applyAgain:function(){(0,d.navigateTo)("/pages/shopOrders/selectAfterSaleType",{goodsId:this.addressInfo.orderGoods[0].goods_id,goodsOrderId:this.addressInfo.orderGoods[0].id,orderId:this.addressInfo.id,afterSalesId:this.addressInfo.afterSales.id})},getlogisticsData:function(){var t=this;return(0,r.default)(regeneratorRuntime.mark((function e(){var a,s;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,(0,i.reqCheckLogistics)(t.addressInfo.afterSales.express_company_code,t.addressInfo.afterSales.express_sn);case 2:a=e.sent,s=a.data,t.logisticsInfo=s.data;case 5:case"end":return e.stop()}}),e)})))()},revokeApply:function(){var t=this;return(0,r.default)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:t.isRevokeApply=!0;case 1:case"end":return e.stop()}}),e)})))()},onCopyText:function(t){(0,f.setClipboardData)(t),uni.hideToast(),uni.showToast({title:"已复制联系方式!"})},revokeApplyConfirm:function(){var t=this;return(0,r.default)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,(0,i.reqCancelLegitimate)(t.addressInfo.afterSales.order_id,t.addressInfo.afterSales.order_item_id,t.addressInfo.afterSales.id);case 2:return e.next=4,(0,d.showToast)({title:"撤销申请成功!",mask:!0,success:function(){setTimeout((function(){(0,d.redirectTo)("/pages/shopOrders/afterSales")}),1500)}});case 4:case"end":return e.stop()}}),e)})))()},jumpEvent:function(){this.$navigateTo("/pages/shopOrders/fillLogistics",{legitimateInfo:encodeURIComponent(JSON.stringify(this.addressInfo))})}},watch:{},onLoad:function(t){this.orderId=t.orderId,this.shopId=t.shopId,this.getRightDetail(t.orderId,t.shopId)},onReady:function(){},onShow:function(){this.getRightDetail(this.orderId,this.shopId)},onHide:function(){},onUnload:function(){},onPullDownRefresh:function(){uni.stopPullDownRefresh()},onReachBottom:function(){}});e.default=u}}]);