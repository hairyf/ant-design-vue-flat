(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/commons/guarantees"],{"0a3b":function(t,n,e){"use strict";e.r(n);var r=e("13bc"),u=e("b3f2");for(var o in u)["default"].indexOf(o)<0&&function(t){e.d(n,t,(function(){return u[t]}))}(o);e("ab77");var i,a=e("f0c5"),c=Object(a["a"])(u["default"],r["b"],r["c"],!1,null,null,null,!1,r["a"],i);n["default"]=c.exports},"13bc":function(t,n,e){"use strict";e.d(n,"b",(function(){return u})),e.d(n,"c",(function(){return o})),e.d(n,"a",(function(){return r}));var r={uTabs:function(){return Promise.all([e.e("common/vendor"),e.e("node-modules/uview-ui/components/u-tabs/u-tabs")]).then(e.bind(null,"5d62"))},uCard:function(){return e.e("node-modules/uview-ui/components/u-card/u-card").then(e.bind(null,"d505"))},uTag:function(){return e.e("node-modules/uview-ui/components/u-tag/u-tag").then(e.bind(null,"2ad6"))},uEmpty:function(){return e.e("node-modules/uview-ui/components/u-empty/u-empty").then(e.bind(null,"7516"))},commonFixedFooter:function(){return e.e("components/commons/common-fixed-footer").then(e.bind(null,"90d2"))},uButton:function(){return e.e("node-modules/uview-ui/components/u-button/u-button").then(e.bind(null,"d9ad"))}},u=function(){var t=this,n=t.$createElement,e=(t._self._c,t.__map(t.list,(function(n,e){var r=t.__get_orig(n),u=t.getStatusText(n.status),o=t.getStatusText(n.status),i=t.$format(n.update_time);return{$orig:r,m0:u,m1:o,m2:i}})));t._isMounted||(t.e0=function(n){t.current=n}),t.$mp.data=Object.assign({},{$root:{l0:e}})},o=[]},5015:function(t,n,e){"use strict";(function(t){e("6cdc"),e("921b");var n=r(e("0a3b"));function r(t){return t&&t.__esModule?t:{default:t}}t(n.default)}).call(this,e("543d")["createPage"])},"82a2":function(t,n,e){"use strict";(function(t){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var r=i(e("a34a")),u=e("79f6"),o=i(e("66fd"));function i(t){return t&&t.__esModule?t:{default:t}}function a(t){return d(t)||f(t)||s(t)||c()}function c(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function s(t,n){if(t){if("string"===typeof t)return l(t,n);var e=Object.prototype.toString.call(t).slice(8,-1);return"Object"===e&&t.constructor&&(e=t.constructor.name),"Map"===e||"Set"===e?Array.from(t):"Arguments"===e||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(e)?l(t,n):void 0}}function f(t){if("undefined"!==typeof Symbol&&Symbol.iterator in Object(t))return Array.from(t)}function d(t){if(Array.isArray(t))return l(t)}function l(t,n){(null==n||n>t.length)&&(n=t.length);for(var e=0,r=new Array(n);e<n;e++)r[e]=t[e];return r}function m(t,n,e,r,u,o,i){try{var a=t[o](i),c=a.value}catch(s){return void e(s)}a.done?n(c):Promise.resolve(c).then(r,u)}function p(t){return function(){var n=this,e=arguments;return new Promise((function(r,u){var o=t.apply(n,e);function i(t){m(o,r,u,i,a,"next",t)}function a(t){m(o,r,u,i,a,"throw",t)}i(void 0)}))}}var b=o.default.extend({components:{},data:function(){return{tabs:[{id:1,name:"待处理"},{id:2,name:"处理中"},{id:3,name:"已完成"},{id:4,name:"已取消"}],current:0,type:"user",list:[],page:1,limit:10,isEnd:!1}},computed:{},methods:{getStatusText:function(t){var n={1:{color:"#FF7E5F",text:"待处理"},2:{color:"#FF0000",text:"处理中"},3:{color:"#23B929",text:"已完成"},4:{color:"#9E9E9E",text:"已取消"}};return n[t]},resetList:function(){var t=this;return p(r.default.mark((function n(){return r.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return t.page=1,t.isEnd=!1,n.next=4,t.getList();case 4:t.list=n.sent;case 5:case"end":return n.stop()}}),n)})))()},getList:function(){var t=this;return p(r.default.mark((function n(){var e,o,i;return r.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return n.prev=0,e="user"==t.type?u.reqRepairsList:u.reqAdminRepairsList,n.next=4,e({status:t.tabs[t.current].id,page:t.page,limit:t.limit});case 4:return o=n.sent,i=o.data,n.abrupt("return",i.data.map((function(t){return t.update_time=t.finish_time||t.dispose_time||t.repairs_time||t.createtime,t})));case 9:return n.prev=9,n.t0=n["catch"](0),n.abrupt("return",[]);case 12:case"end":return n.stop()}}),n,null,[[0,9]])})))()},onNextList:function(){var t=this;return p(r.default.mark((function n(){var e;return r.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:if(!t.isEnd){n.next=2;break}return n.abrupt("return",!1);case 2:return t.page+=1,n.next=5,t.getList();case 5:if(e=n.sent,e.length){n.next=9;break}return t.isEnd=!0,n.abrupt("return",!1);case 9:t.list=[].concat(a(t.list),a(e));case 10:case"end":return n.stop()}}),n)})))()}},watch:{current:function(){this.resetList()}},onLoad:function(t){this.type=t.type||this.type},onReady:function(){},onShow:function(){this.resetList()},onHide:function(){},onUnload:function(){},onPullDownRefresh:function(){t.stopPullDownRefresh()},onReachBottom:function(){this.onNextList()}});n.default=b}).call(this,e("543d")["default"])},ab77:function(t,n,e){"use strict";var r=e("cb6b"),u=e.n(r);u.a},b3f2:function(t,n,e){"use strict";e.r(n);var r=e("82a2"),u=e.n(r);for(var o in r)["default"].indexOf(o)<0&&function(t){e.d(n,t,(function(){return r[t]}))}(o);n["default"]=u.a},cb6b:function(t,n,e){}},[["5015","common/runtime","common/vendor"]]]);