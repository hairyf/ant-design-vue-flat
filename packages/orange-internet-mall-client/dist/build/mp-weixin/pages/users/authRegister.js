(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/users/authRegister"],{"11a2":function(e,t,n){},"2a30":function(e,t,n){"use strict";n.r(t);var r=n("d3f0"),o=n("d32d");for(var a in o)["default"].indexOf(a)<0&&function(e){n.d(t,e,(function(){return o[e]}))}(a);n("74c3");var u,i=n("f0c5"),c=Object(i["a"])(o["default"],r["b"],r["c"],!1,null,null,null,!1,r["a"],u);t["default"]=c.exports},"74c3":function(e,t,n){"use strict";var r=n("11a2"),o=n.n(r);o.a},c93a:function(e,t,n){"use strict";(function(e){n("6cdc");var t=r(n("2a30"));function r(e){return e&&e.__esModule?e:{default:e}}e(t.default)}).call(this,n("543d")["createPage"])},d32d:function(e,t,n){"use strict";n.r(t);var r=n("e132"),o=n.n(r);for(var a in r)["default"].indexOf(a)<0&&function(e){n.d(t,e,(function(){return r[e]}))}(a);t["default"]=o.a},d3f0:function(e,t,n){"use strict";n.d(t,"b",(function(){return o})),n.d(t,"c",(function(){return a})),n.d(t,"a",(function(){return r}));var r={uCard:function(){return n.e("node-modules/uview-ui/components/u-card/u-card").then(n.bind(null,"d505"))},uField:function(){return n.e("node-modules/uview-ui/components/u-field/u-field").then(n.bind(null,"c732"))},viewIcon:function(){return Promise.all([n.e("common/vendor"),n.e("components/view/view-icon")]).then(n.bind(null,"2807"))},uCheckbox:function(){return n.e("node-modules/uview-ui/components/u-checkbox/u-checkbox").then(n.bind(null,"1e79"))},uButton:function(){return n.e("node-modules/uview-ui/components/u-button/u-button").then(n.bind(null,"d9ad"))},commonCopyright:function(){return Promise.all([n.e("common/vendor"),n.e("components/commons/common-copyright")]).then(n.bind(null,"3d19"))}},o=function(){var e=this,t=e.$createElement,n=(e._self._c,e.$spliceStaticUrl("auth-bg.png")),r=e.getVisionIcon(e.showPassword),o=e.getVisionIcon(e.showRepassword),a={boxShadow:"0px 4px 20px "+e.$rgbaColor["--color-primary-light-opacity-8"],background:e.$hexColor["--color-primary"]};e._isMounted||(e.e0=function(t){e.showPassword=!e.showPassword},e.e1=function(t){e.showRepassword=!e.showRepassword}),e.$mp.data=Object.assign({},{$root:{m0:n,m1:r,m2:o,a0:a}})},a=[]},e132:function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=l(n("4795")),o=n("79f6"),a=n("9428"),u=n("dd73"),i=l(n("0613")),c=n("d257"),s=n("a6f4"),d=n("1cc4");function l(e){return e&&e.__esModule?e:{default:e}}function f(e,t,n,r,o,a,u){try{var i=e[a](u),c=i.value}catch(s){return void n(s)}i.done?t(c):Promise.resolve(c).then(r,o)}function p(e){return function(){var t=this,n=arguments;return new Promise((function(r,o){var a=e.apply(t,n);function u(e){f(a,r,o,u,i,"next",e)}function i(e){f(a,r,o,u,i,"throw",e)}u(void 0)}))}}function m(e){return b(e)||w(e)||v(e)||h()}function h(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function v(e,t){if(e){if("string"===typeof e)return g(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?g(e,t):void 0}}function w(e){if("undefined"!==typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}function b(e){if(Array.isArray(e))return g(e)}function g(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}var y=(0,s.defineComponent)({setup:function(){(0,d.onReady)((function(){var t,n;return null===(t=(n=e).hideHomeButton)||void 0===t?void 0:t.call(n)}));var t=(0,s.reactive)({mobile:"",account:"",password:"",repassword:"",verifyCode:"",captcha:"",captchakey:"",openid:"",agreeaFreement:!0}),n=(0,s.ref)(""),l=function(e){return e?"oe-vision-show":"oe-vision-hide"},f=(0,s.ref)(!1),h=(0,s.ref)(!1),v=(0,s.ref)(!1);(0,d.onLoad)((function(e){v.value=!(null===e||void 0===e||!e.hideBackLogin)}));var w=(0,s.computed)((function(){return i.default.getters.forceAuthPhone})),b=function(){if(!t.agreeaFreement)return e.$u.toast("请同意《用户使用协议》"),!1;var n=[["userName",t.account],["password",t.password],["password",t.repassword,"重复密码"],["empty",t.captcha,"验证码"]],r=[["userName",t.account],["password",t.password],["password",t.repassword,"重复密码"],["empty",t.mobile,"手机号"],["phone",t.mobile],["empty",t.verifyCode,"验证码"]],o=w.value?r:n,a=u.fromValidate.validateAll.apply(u.fromValidate,m(o));return a.validate&&t.password!==t.repassword&&(a.validate=!1,a.error="输入密码与确认密码不相同",e.$u.toast(a.error)),a.validate},g=(0,a.useMobileSeconds)({phone:(0,s.toRef)(t,"mobile"),getPhoneCodeHook:function(){var e=p(r.default.mark((function e(){return r.default.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,(0,o.reqSendCode)(t.mobile,"registerByMobile");case 2:case"end":return e.stop()}}),e)})));function n(){return e.apply(this,arguments)}return n}()}),y=g.seconds,x=g.getPhoneCode,C=function(){var e=p(r.default.mark((function e(){var a,u;return r.default.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,(0,o.reqGraphicalCode)();case 2:a=e.sent,u=a.data,t.captchakey=u.data.verify_key,n.value=u.data.verify_src;case 6:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();C();var k=function(){var e=p(r.default.mark((function e(){return r.default.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(b()){e.next=2;break}return e.abrupt("return",!1);case 2:if(e.prev=2,!w.value){e.next=8;break}return e.next=6,i.default.dispatch("bindPhoneRegisterUserInfo",t);case 6:e.next=10;break;case 8:return e.next=10,i.default.dispatch("phoneRegisterUserInfo",t);case 10:(0,c.reLaunch)("/pages/empty"),e.next=16;break;case 13:e.prev=13,e.t0=e["catch"](2),C();case 16:case"end":return e.stop()}}),e,null,[[2,13]])})));return function(){return e.apply(this,arguments)}}(),P=function(){(0,c.navigateTo)("/pages/commons/richText",{title:"注册协议",html:i.default.state.common.shopset.registerSet.content})},S=(0,s.computed)((function(){return i.default.getters.hexColor})),$=(0,s.computed)((function(){return i.default.getters.rgbaColor})),_=(0,s.computed)((function(){return i.default.state.common.shopset.shopSet.logo})),A=(0,s.computed)((function(){return"1"==i.default.state.common.shopset.registerSet.agreement}));return{$rgbaColor:$,$hexColor:S,form:t,onSubmitRegister:k,showPassword:f,getVisionIcon:l,showRepassword:h,seconds:y,getPhoneCode:x,bindingPhone:w,graphicalCode:n,getGraphicalCode:C,logo:_,hideBackLogin:v,seeAgreement:P,agreement:A}}});t.default=y}).call(this,n("543d")["default"])}},[["c93a","common/runtime","common/vendor"]]]);