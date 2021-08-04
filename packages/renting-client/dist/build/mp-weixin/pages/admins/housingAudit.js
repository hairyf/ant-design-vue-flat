require('common/vendor.js');(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/admins/housingAudit"],{5125:function(t,e,n){"use strict";n.r(e);var r=n("6f0c"),u=n.n(r);for(var o in r)["default"].indexOf(o)<0&&function(t){n.d(e,t,(function(){return r[t]}))}(o);e["default"]=u.a},"6f0c":function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var r=a(n("a34a")),u=a(n("66fd")),o=n("79f6"),i=n("d257");function a(t){return t&&t.__esModule?t:{default:t}}function s(t){return l(t)||d(t)||f(t)||c()}function c(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function f(t,e){if(t){if("string"===typeof t)return m(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);return"Object"===n&&t.constructor&&(n=t.constructor.name),"Map"===n||"Set"===n?Array.from(t):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?m(t,e):void 0}}function d(t){if("undefined"!==typeof Symbol&&Symbol.iterator in Object(t))return Array.from(t)}function l(t){if(Array.isArray(t))return m(t)}function m(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,r=new Array(e);n<e;n++)r[n]=t[n];return r}function h(t,e,n,r,u,o,i){try{var a=t[o](i),s=a.value}catch(c){return void n(c)}a.done?e(s):Promise.resolve(s).then(r,u)}function p(t){return function(){var e=this,n=arguments;return new Promise((function(r,u){var o=t.apply(e,n);function i(t){h(o,r,u,i,a,"next",t)}function a(t){h(o,r,u,i,a,"throw",t)}i(void 0)}))}}var v=u.default.extend({components:{},data:function(){return{currentTab:0,checked:!1,show:!1,refuseTetx:"",currentId:"",tabs:[{name:"待审核",id:0},{name:"已审核",id:1}],page:1,limit:10,AuditList:[],isEnd:!1,currentBtn:0}},computed:{},methods:{resetList:function(){var t=this;return p(r.default.mark((function e(){return r.default.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return t.page=1,t.isEnd=!1,e.next=4,t.getList();case 4:t.AuditList=e.sent;case 5:case"end":return e.stop()}}),e)})))()},getList:function(){var t=this;return p(r.default.mark((function e(){var n,u;return r.default.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,(0,o.reqHousingAuditList)({page:t.page,limit:t.limit,audit:t.currentTab});case 3:return n=e.sent,u=n.data,t.tabs[0].name="待审核(".concat(u.total_out,")"),t.tabs[1].name="已审核(".concat(u.total_load,")"),e.abrupt("return",u.data.data);case 10:return e.prev=10,e.t0=e["catch"](0),e.abrupt("return",[]);case 13:case"end":return e.stop()}}),e,null,[[0,10]])})))()},onNextList:function(){var t=this;return p(r.default.mark((function e(){var n;return r.default.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(!t.isEnd){e.next=2;break}return e.abrupt("return",!1);case 2:return t.page+=1,e.next=5,t.getList();case 5:if(n=e.sent,n.length){e.next=9;break}return t.isEnd=!0,e.abrupt("return",!1);case 9:t.AuditList=[].concat(s(t.AuditList),s(n));case 10:case"end":return e.stop()}}),e)})))()},getSwitch:function(t){return p(r.default.mark((function e(){return r.default.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,(0,o.reqAuditSettings)({name:"house",value:t?"1":"0"});case 2:return e.next=4,(0,i.showToast)({title:"操作成功！"});case 4:case"end":return e.stop()}}),e)})))()},getCopy:function(e){var n=e.toString();t.setClipboardData({data:n,success:function(){t.showToast({icon:"success",title:"复制成功"})}})},setRefuse:function(t){this.refuseTetx="",this.currentBtn=0,this.currentId=t,this.show=!0},serConfirmRejection:function(){var t=this;return p(r.default.mark((function e(){return r.default.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(0!=t.currentBtn){e.next=9;break}return e.next=3,(0,o.reqAudit)({house_id:t.currentId,audit:-1,remark:t.refuseTetx});case 3:return t.show=!1,e.next=6,(0,i.showToast)({title:"拒绝成功!"});case 6:t.resetList(),e.next=15;break;case 9:return e.next=11,(0,o.reqAudit)({house_id:t.currentId,audit:-2,remark:t.refuseTetx});case 11:return t.show=!1,e.next=14,(0,i.showToast)({title:"退回成功!"});case 14:t.resetList();case 15:case"end":return e.stop()}}),e)})))()},adoptBtn:function(e){var n=this;t.showModal({content:"是否确定通过审核",success:function(){var t=p(r.default.mark((function t(u){return r.default.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(!u.confirm){t.next=8;break}return t.next=3,(0,o.reqAudit)({house_id:e,audit:1});case 3:return t.next=5,(0,i.showToast)({title:"通过成功!"});case 5:n.resetList(),t.next=9;break;case 8:u.cancel&&console.log("用户点击取消");case 9:case"end":return t.stop()}}),t)})));function u(e){return t.apply(this,arguments)}return u}()})},onChange:function(t){this.currentTab=t,this.resetList()},returnBtn:function(t){this.currentBtn=1,this.refuseTetx="",this.currentId=t,this.show=!0}},watch:{},onLoad:function(){var t=this;return p(r.default.mark((function e(){var n,u;return r.default.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,(0,o.reqSwitchSettings)();case 2:n=e.sent,u=n.data,t.checked="1"==u.house;case 5:case"end":return e.stop()}}),e)})))()},onReady:function(){},onShow:function(){this.resetList()},onHide:function(){},onUnload:function(){},onPullDownRefresh:function(){t.stopPullDownRefresh()},onReachBottom:function(){this.onNextList()}});e.default=v}).call(this,n("543d")["default"])},8954:function(t,e,n){"use strict";n.d(e,"b",(function(){return u})),n.d(e,"c",(function(){return o})),n.d(e,"a",(function(){return r}));var r={uTabs:function(){return Promise.all([n.e("common/vendor"),n.e("node-modules/uview-ui/components/u-tabs/u-tabs")]).then(n.bind(null,"5d62"))},uSwitch:function(){return n.e("node-modules/uview-ui/components/u-switch/u-switch").then(n.bind(null,"89f2"))},uImage:function(){return n.e("node-modules/uview-ui/components/u-image/u-image").then(n.bind(null,"9df5"))},uButton:function(){return n.e("node-modules/uview-ui/components/u-button/u-button").then(n.bind(null,"d9ad"))},uEmpty:function(){return n.e("node-modules/uview-ui/components/u-empty/u-empty").then(n.bind(null,"7516"))},customBlank:function(){return Promise.all([n.e("common/vendor"),n.e("components/customs/custom-blank")]).then(n.bind(null,"2305"))},uPopup:function(){return n.e("node-modules/uview-ui/components/u-popup/u-popup").then(n.bind(null,"df25"))},customIcon:function(){return Promise.all([n.e("common/vendor"),n.e("components/customs/custom-icon")]).then(n.bind(null,"0d30"))}},u=function(){var t=this,e=t.$createElement,n=(t._self._c,t.__map(t.AuditList,(function(e,n){var r=t.__get_orig(e),u=0==t.currentTab?t.$format(e.create_time,"YYYY-MM-DD hh:mm:ss"):null,o=1==t.currentTab?t.$format(e.update_time,"YYYY-MM-DD hh:mm:ss"):null,i=1==t.currentTab?encodeURIComponent(JSON.stringify(e.remark)):null;return{$orig:r,m0:u,m1:o,m2:i}})));t._isMounted||(t.e0=function(e){t.show=!1}),t.$mp.data=Object.assign({},{$root:{l0:n}})},o=[]},"9afb":function(t,e,n){"use strict";(function(t){n("6cdc"),n("921b");var e=r(n("e296"));function r(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,n("543d")["createPage"])},ae57:function(t,e,n){},e296:function(t,e,n){"use strict";n.r(e);var r=n("8954"),u=n("5125");for(var o in u)["default"].indexOf(o)<0&&function(t){n.d(e,t,(function(){return u[t]}))}(o);n("ff34");var i,a=n("f0c5"),s=Object(a["a"])(u["default"],r["b"],r["c"],!1,null,null,null,!1,r["a"],i);e["default"]=s.exports},ff34:function(t,e,n){"use strict";var r=n("ae57"),u=n.n(r);u.a}},[["9afb","common/runtime","common/vendor"]]]);