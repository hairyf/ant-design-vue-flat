(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/shopOrders/expressSelect"],{"1fa5":function(n,t,e){"use strict";(function(n){e("6cdc");var t=u(e("deb5"));function u(n){return n&&n.__esModule?n:{default:n}}n(t.default)}).call(this,e("543d")["createPage"])},"5a31":function(n,t,e){},aa7e:function(n,t,e){"use strict";e.d(t,"b",(function(){return r})),e.d(t,"c",(function(){return o})),e.d(t,"a",(function(){return u}));var u={uSearch:function(){return e.e("node-modules/uview-ui/components/u-search/u-search").then(e.bind(null,"9cf5"))}},r=function(){var n=this,t=n.$createElement;n._self._c},o=[]},b5a5:function(n,t,e){"use strict";var u=e("5a31"),r=e.n(u);r.a},c821:function(n,t,e){"use strict";e.r(t);var u=e("cefc"),r=e.n(u);for(var o in u)["default"].indexOf(o)<0&&function(n){e.d(t,n,(function(){return u[n]}))}(o);t["default"]=r.a},cefc:function(n,t,e){"use strict";(function(n){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var u=c(e("4795")),r=e("79f6"),o=e("a6f4"),a=e("1bee");function c(n){return n&&n.__esModule?n:{default:n}}function i(n,t,e,u,r,o,a){try{var c=n[o](a),i=c.value}catch(f){return void e(f)}c.done?t(i):Promise.resolve(i).then(u,r)}function f(n){return function(){var t=this,e=arguments;return new Promise((function(u,r){var o=n.apply(t,e);function a(n){i(o,u,r,a,c,"next",n)}function c(n){i(o,u,r,a,c,"throw",n)}a(void 0)}))}}var s=(0,o.defineComponent)({components:{},data:function(){return{}},computed:{},methods:{searchEvent:function(){this.resetList()},jumpEvent:function(t){this.$navigateBack(),n.$emit("sendLegitimate",t)}},watch:{},setup:function(){var n=(0,o.ref)(""),t=(0,a.useListPaging)({getList:function(){var t=f(u.default.mark((function t(e){var o,a;return u.default.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,(0,r.reqLogisticsList)({page:e,limit:22,company_name:n.value});case 2:return o=t.sent,a=o.data,t.abrupt("return",a.data.data);case 5:case"end":return t.stop()}}),t)})));function e(n){return t.apply(this,arguments)}return e}()}),e=t.list,c=t.resetList;return{list:e,keyword:n,resetList:c}},onLoad:function(){},onReady:function(){},onShow:function(){},onHide:function(){},onUnload:function(){},onPullDownRefresh:function(){n.stopPullDownRefresh()},onReachBottom:function(){}});t.default=s}).call(this,e("543d")["default"])},deb5:function(n,t,e){"use strict";e.r(t);var u=e("aa7e"),r=e("c821");for(var o in r)["default"].indexOf(o)<0&&function(n){e.d(t,n,(function(){return r[n]}))}(o);e("b5a5");var a,c=e("f0c5"),i=Object(c["a"])(r["default"],u["b"],u["c"],!1,null,null,null,!1,u["a"],a);t["default"]=i.exports}},[["1fa5","common/runtime","common/vendor"]]]);