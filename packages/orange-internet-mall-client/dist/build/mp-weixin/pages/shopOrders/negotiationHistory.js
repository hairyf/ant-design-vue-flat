(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/shopOrders/negotiationHistory"],{"12b4":function(t,n,e){"use strict";e.d(n,"b",(function(){return u})),e.d(n,"c",(function(){return i})),e.d(n,"a",(function(){return o}));var o={uCard:function(){return e.e("node-modules/uview-ui/components/u-card/u-card").then(e.bind(null,"d505"))},uImage:function(){return e.e("node-modules/uview-ui/components/u-image/u-image").then(e.bind(null,"9df5"))},uCountDown:function(){return e.e("node-modules/uview-ui/components/u-count-down/u-count-down").then(e.bind(null,"e387"))}},u=function(){var t=this,n=t.$createElement,e=(t._self._c,t.list.length?t.__map(t.list,(function(n,e){var o=t.__get_orig(n),u=2==n.user_type?t.$formatUnix(n.createtime):null,i=1==n.user_type?t.$formatUnix(n.createtime):null;return{$orig:o,m0:u,m1:i}})):null);t.$mp.data=Object.assign({},{$root:{l0:e}})},i=[]},"2dde":function(t,n,e){"use strict";(function(t){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var o=c(e("4795")),u=c(e("66fd")),i=e("79f6"),a=c(e("5a0c")),r=c(e("0613"));function c(t){return t&&t.__esModule?t:{default:t}}function d(t,n,e,o,u,i,a){try{var r=t[i](a),c=r.value}catch(d){return void e(d)}r.done?n(c):Promise.resolve(c).then(o,u)}function s(t){return function(){var n=this,e=arguments;return new Promise((function(o,u){var i=t.apply(n,e);function a(t){d(i,o,u,a,r,"next",t)}function r(t){d(i,o,u,a,r,"throw",t)}a(void 0)}))}}var f=u.default.extend({components:{},data:function(){return{list:[],avatar:"",shop_logo:"",status:"",type:"",merchantTime:0,deliverTime:0}},computed:{},methods:{getNegotiationHistoryData:function(t,n,e){var u=this;return s(o.default.mark((function a(){var c,d;return o.default.wrap((function(o){while(1)switch(o.prev=o.next){case 0:return o.next=2,(0,i.reqNegotiationHitory)(t,n,e);case 2:c=o.sent,d=c.data,u.list=d.data.data,u.shop_logo=d.data.shop_logo,u.avatar=r.default.state.user.info.avatar,u.countDown();case 8:case"end":return o.stop()}}),a)})))()},countDown:function(){var t=this;1==this.status&&1!=this.type&&this.list.forEach((function(n){if(n.remark.province_name){var e=n.remark.start_time;t.merchantTime=(0,a.default)(1e3*e).add(t.deliverTime,"day").unix()-(0,a.default)().unix()}}))}},watch:{},onLoad:function(t){this.status=t.status,this.type=t.type,this.deliverTime=t.deliverTime,this.getNegotiationHistoryData(t.order_id,t.order_item_id,t.id)},onReady:function(){},onShow:function(){},onHide:function(){},onUnload:function(){},onPullDownRefresh:function(){t.stopPullDownRefresh()},onReachBottom:function(){}});n.default=f}).call(this,e("543d")["default"])},"49b1":function(t,n,e){"use strict";e.r(n);var o=e("2dde"),u=e.n(o);for(var i in o)["default"].indexOf(i)<0&&function(t){e.d(n,t,(function(){return o[t]}))}(i);n["default"]=u.a},"66ab":function(t,n,e){"use strict";var o=e("f738"),u=e.n(o);u.a},c632:function(t,n,e){"use strict";(function(t){e("6cdc");var n=o(e("c717"));function o(t){return t&&t.__esModule?t:{default:t}}t(n.default)}).call(this,e("543d")["createPage"])},c717:function(t,n,e){"use strict";e.r(n);var o=e("12b4"),u=e("49b1");for(var i in u)["default"].indexOf(i)<0&&function(t){e.d(n,t,(function(){return u[t]}))}(i);e("66ab");var a,r=e("f0c5"),c=Object(r["a"])(u["default"],o["b"],o["c"],!1,null,null,null,!1,o["a"],a);n["default"]=c.exports},f738:function(t,n,e){}},[["c632","common/runtime","common/vendor"]]]);