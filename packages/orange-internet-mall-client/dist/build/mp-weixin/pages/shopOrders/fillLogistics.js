(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/shopOrders/fillLogistics"],{"3d81":function(e,n,t){"use strict";t.d(n,"b",(function(){return r})),t.d(n,"c",(function(){return u})),t.d(n,"a",(function(){return o}));var o={customCardContainer:function(){return t.e("components/customs/custom-card-container").then(t.bind(null,"6d4c"))},uImage:function(){return t.e("node-modules/uview-ui/components/u-image/u-image").then(t.bind(null,"9df5"))},uInput:function(){return Promise.all([t.e("common/vendor"),t.e("node-modules/uview-ui/components/u-input/u-input")]).then(t.bind(null,"d5da"))},uIcon:function(){return t.e("node-modules/uview-ui/components/u-icon/u-icon").then(t.bind(null,"f86b"))},uButton:function(){return t.e("node-modules/uview-ui/components/u-button/u-button").then(t.bind(null,"d9ad"))}},r=function(){var e=this,n=e.$createElement,t=(e._self._c,{background:e.$hexColor["--color-primary"]});e.$mp.data=Object.assign({},{$root:{a0:t}})},u=[]},"3d89":function(e,n,t){"use strict";(function(e){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var o=s(t("4795")),r=s(t("66fd")),u=t("79f6"),a=t("a6f4"),i=t("d257"),c=s(t("0613"));function s(e){return e&&e.__esModule?e:{default:e}}function d(e,n,t,o,r,u,a){try{var i=e[u](a),c=i.value}catch(s){return void t(s)}i.done?n(c):Promise.resolve(c).then(o,r)}function f(e){return function(){var n=this,t=arguments;return new Promise((function(o,r){var u=e.apply(n,t);function a(e){d(u,o,r,a,i,"next",e)}function i(e){d(u,o,r,a,i,"throw",e)}a(void 0)}))}}var l=r.default.extend({components:{},setup:function(){var e=(0,a.computed)((function(){return c.default.getters.hexColor}));return{$hexColor:e}},data:function(){return{logisticsInput:"",companyName:"请选择",mobile:"",sendInfo:{},code:"",specifications:"",show:!1}},computed:{},methods:{sumitEvent:function(){var e=this;return f(o.default.mark((function n(){var t,r,a,c,s,d;return o.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:if("2"!=e.sendInfo.afterSales.type){n.next=15;break}if(!e.companyName||!e.logisticsInput){n.next=12;break}return t=e.sendInfo.id,r=e.sendInfo.orderGoods[0].id,a=e.sendInfo.afterSales.id,n.next=7,(0,u.reqApplyAfterSales)({order_after_sale_id:a,order_id:t,order_item_id:r,express_company:e.companyName,express_company_code:e.code,express_sn:e.logisticsInput});case 7:return n.next=9,(0,i.showToast)({title:"提交成功!",mask:!0});case 9:(0,i.navigateBack)(),n.next=13;break;case 12:(0,i.showToast)({icon:"none",title:"请填写单号和物流公司"});case 13:n.next=27;break;case 15:if(!e.companyName||!e.logisticsInput){n.next=26;break}return c=e.sendInfo.id,s=e.sendInfo.orderGoods[0].id,d=e.sendInfo.afterSales.id,n.next=21,(0,u.reqApplyAfterSales)({order_after_sale_id:d,order_id:c,order_item_id:s,express_company:e.companyName,express_company_code:e.code,express_sn:e.logisticsInput});case 21:return n.next=23,(0,i.showToast)({title:"提交成功!",mask:!0});case 23:(0,i.navigateBack)(),n.next=27;break;case 26:(0,i.showToast)({icon:"none",title:"请填写单号和物流公司"});case 27:case"end":return n.stop()}}),n)})))()}},watch:{},onLoad:function(n){var t=this;this.sendInfo=JSON.parse(decodeURIComponent(n.legitimateInfo)),e.$on("sendLegitimate",(function(e){t.companyName=e.company_name,t.code=e.code}))},onReady:function(){},onShow:function(){},onHide:function(){},onUnload:function(){e.$off("sendLegitimate")},onPullDownRefresh:function(){e.stopPullDownRefresh()},onReachBottom:function(){}});n.default=l}).call(this,t("543d")["default"])},a76e:function(e,n,t){"use strict";t.r(n);var o=t("3d89"),r=t.n(o);for(var u in o)["default"].indexOf(u)<0&&function(e){t.d(n,e,(function(){return o[e]}))}(u);n["default"]=r.a},b657:function(e,n,t){"use strict";t.r(n);var o=t("3d81"),r=t("a76e");for(var u in r)["default"].indexOf(u)<0&&function(e){t.d(n,e,(function(){return r[e]}))}(u);t("d54c");var a,i=t("f0c5"),c=Object(i["a"])(r["default"],o["b"],o["c"],!1,null,null,null,!1,o["a"],a);n["default"]=c.exports},bfb6:function(e,n,t){"use strict";(function(e){t("6cdc");var n=o(t("b657"));function o(e){return e&&e.__esModule?e:{default:e}}e(n.default)}).call(this,t("543d")["createPage"])},d54c:function(e,n,t){"use strict";var o=t("e604"),r=t.n(o);r.a},e604:function(e,n,t){}},[["bfb6","common/runtime","common/vendor"]]]);