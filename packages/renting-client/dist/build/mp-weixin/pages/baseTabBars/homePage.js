(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/baseTabBars/homePage"],{"4bd0":function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=a(n("a34a")),u=n("79f6"),i=a(n("0613")),o=a(n("66fd"));function a(e){return e&&e.__esModule?e:{default:e}}function c(e){return d(e)||f(e)||l(e)||s()}function s(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function l(e,t){if(e){if("string"===typeof e)return m(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?m(e,t):void 0}}function f(e){if("undefined"!==typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}function d(e){if(Array.isArray(e))return m(e)}function m(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function p(e,t,n,r,u,i,o){try{var a=e[i](o),c=a.value}catch(s){return void n(s)}a.done?t(c):Promise.resolve(c).then(r,u)}function h(e){return function(){var t=this,n=arguments;return new Promise((function(r,u){var i=e.apply(t,n);function o(e){p(i,r,u,o,a,"next",e)}function a(e){p(i,r,u,o,a,"throw",e)}o(void 0)}))}}var v=o.default.extend({components:{},data:function(){return{mealList:[],readme:"",selectIndex:0,showbuySetPop:!1,swpierList:[],showCitySelectPopup:!1,searchText:"",regionList:{},list:[],page:1,limit:10,isEnd:!1}},computed:{location:function(){return i.default.state.common.location}},methods:{reqSetmealGet:function(){var e=this;return h(r.default.mark((function t(){var n,i;return r.default.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,(0,u.reqSetmealGet)();case 2:n=t.sent,i=n.data,e.readme=i.buy_notice,e.mealList=i.data,console.log(i);case 7:case"end":return t.stop()}}),t)})))()},onBannerClick:function(e){var t=this.swpierList[e];"undefined"!==typeof t.id&&this.$navigateTo("/pages/commons/houseDetails",{id:t.id})},initBanner:function(){var e=this;return h(r.default.mark((function t(){var n,i;return r.default.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,(0,u.reqHouseBanner)();case 2:n=t.sent,i=n.data,e.swpierList=i.map((function(e){return{id:e.house_id,image:e.image_text}}));case 5:case"end":return t.stop()}}),t)})))()},initRegionList:function(){var e=this;return h(r.default.mark((function t(){var n,i;return r.default.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,(0,u.reqRegionList)(e.searchText);case 2:n=t.sent,i=n.data,e.regionList=i;case 5:case"end":return t.stop()}}),t)})))()},resetList:function(){var e=this;return h(r.default.mark((function t(){var n;return r.default.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return e.page=1,e.isEnd=!1,t.next=4,e.getList();case 4:e.list=t.sent,null===(n=e.$refs.uDropdown)||void 0===n||n.close();case 6:case"end":return t.stop()}}),t)})))()},getList:function(){var e=this;return h(r.default.mark((function t(){var n,i;return r.default.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,(0,u.reqHouseList)({page:e.page,limit:e.limit});case 3:return n=t.sent,i=n.data,t.abrupt("return",i.data);case 8:return t.prev=8,t.t0=t["catch"](0),t.abrupt("return",[]);case 11:case"end":return t.stop()}}),t,null,[[0,8]])})))()},onNextList:function(){var e=this;return h(r.default.mark((function t(){var n;return r.default.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(!e.isEnd){t.next=2;break}return t.abrupt("return",!1);case 2:return e.page+=1,t.next=5,e.getList();case 5:if(n=t.sent,n.length){t.next=9;break}return e.isEnd=!0,t.abrupt("return",!1);case 9:e.list=[].concat(c(e.list),c(n));case 10:case"end":return t.stop()}}),t)})))()},onSwitchSearchTab:function(t){e.setStorageSync("search-params",t),this.$switchTab("/pages/baseTabBars/searchHouse")}},watch:{searchText:function(){this.initRegionList()}},onLoad:function(){},onReady:function(){},onShow:function(){i.default.dispatch("getIpLocation"),this.resetList(),this.initBanner(),this.initRegionList()},onHide:function(){},onUnload:function(){},onPullDownRefresh:function(){},onReachBottom:function(){this.onNextList()},onShareAppMessage:function(){return{title:i.default.state.common.name,imageUrl:"",path:"/pages/baseTabBars/homePage"}},onShareTimeline:function(){return{title:i.default.state.common.name,query:"",imageUrl:""}}});t.default=v}).call(this,n("543d")["default"])},"52c3":function(e,t,n){"use strict";var r=n("fda6"),u=n.n(r);u.a},"828e":function(e,t,n){"use strict";(function(e){n("6cdc"),n("921b");var t=r(n("a69c"));function r(e){return e&&e.__esModule?e:{default:e}}e(t.default)}).call(this,n("543d")["createPage"])},a69c:function(e,t,n){"use strict";n.r(t);var r=n("d848"),u=n("ef6a");for(var i in u)["default"].indexOf(i)<0&&function(e){n.d(t,e,(function(){return u[e]}))}(i);n("52c3");var o,a=n("f0c5"),c=Object(a["a"])(u["default"],r["b"],r["c"],!1,null,null,null,!1,r["a"],o);t["default"]=c.exports},d848:function(e,t,n){"use strict";n.d(t,"b",(function(){return u})),n.d(t,"c",(function(){return i})),n.d(t,"a",(function(){return r}));var r={uNavbar:function(){return n.e("node-modules/uview-ui/components/u-navbar/u-navbar").then(n.bind(null,"87cd"))},customIcon:function(){return Promise.all([n.e("common/vendor"),n.e("components/customs/custom-icon")]).then(n.bind(null,"0d30"))},uSearch:function(){return n.e("node-modules/uview-ui/components/u-search/u-search").then(n.bind(null,"9cf5"))},customBlank:function(){return Promise.all([n.e("common/vendor"),n.e("components/customs/custom-blank")]).then(n.bind(null,"2305"))},uSwiper:function(){return n.e("node-modules/uview-ui/components/u-swiper/u-swiper").then(n.bind(null,"1153"))},uGrid:function(){return n.e("node-modules/uview-ui/components/u-grid/u-grid").then(n.bind(null,"f8cc"))},uGridItem:function(){return n.e("node-modules/uview-ui/components/u-grid-item/u-grid-item").then(n.bind(null,"7b54"))},uPopup:function(){return n.e("node-modules/uview-ui/components/u-popup/u-popup").then(n.bind(null,"df25"))},uIcon:function(){return n.e("node-modules/uview-ui/components/u-icon/u-icon").then(n.bind(null,"f86b"))},customTabbar:function(){return Promise.all([n.e("common/vendor"),n.e("components/customs/custom-tabbar")]).then(n.bind(null,"e3d5"))}},u=function(){var e=this,t=e.$createElement,r=(e._self._c,e.__map(e.list,(function(t,r){var u=e.__get_orig(t),i="个人已实名"===t.authentication||"企业已实名"===t.authentication?n("9a7e"):null,o="个人已实名"!==t.authentication&&"企业已实名"!==t.authentication?n("267f"):null;return{$orig:u,m0:i,m1:o}})));e._isMounted||(e.e0=function(t){e.showCitySelectPopup=!0},e.e1=function(t){e.showCitySelectPopup=!1},e.e2=function(t){return e.$store.dispatch("getIpLocation")},e.e3=function(t,n){var r=arguments[arguments.length-1].currentTarget.dataset,u=r.eventParams||r["event-params"];n=u.item;return e.$store.commit("receve_location",n)}),e.$mp.data=Object.assign({},{$root:{l0:r}})},i=[]},ef6a:function(e,t,n){"use strict";n.r(t);var r=n("4bd0"),u=n.n(r);for(var i in r)["default"].indexOf(i)<0&&function(e){n.d(t,e,(function(){return r[e]}))}(i);t["default"]=u.a},fda6:function(e,t,n){}},[["828e","common/runtime","common/vendor"]]]);