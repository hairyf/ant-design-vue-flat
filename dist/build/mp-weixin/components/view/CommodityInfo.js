(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/view/CommodityInfo"],{"459f":function(e,n,t){"use strict";var o=t("ff41"),u=t.n(o);u.a},5616:function(e,n,t){"use strict";t.r(n);var o=t("ed86"),u=t("e38a");for(var r in u)["default"].indexOf(r)<0&&function(e){t.d(n,e,(function(){return u[e]}))}(r);t("459f");var i,l=t("f0c5"),a=Object(l["a"])(u["default"],o["b"],o["c"],!1,null,"5ef446ac",null,!1,o["a"],i);n["default"]=a.exports},b240:function(e,n,t){"use strict";(function(e){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var o,u=t("a6f4"),r=t("79f6"),i=a(t("0613")),l=t("9dcd");function a(e){return e&&e.__esModule?e:{default:e}}function c(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);n&&(o=o.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,o)}return t}function s(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?c(Object(t),!0).forEach((function(n){d(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):c(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function d(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}var f=(0,u.defineComponent)({props:{option:{type:Object,required:!0}},methods:{onVideoClick:function(){var n,t;o||(o=e.createVideoContext("video-play",this)),this.videoStatus?null===(n=o)||void 0===n||n.pause():null===(t=o)||void 0===t||t.play()},onChangeSwiper:function(n){var t,u=n.target.current;(this.currentIndex=u+1,this.shopDetailsInfo.video&&u>=1&&this.videoStatus)&&(o||(o=e.createVideoContext("video-play",this)),null===(t=o)||void 0===t||t.pause())}},destroyed:function(){o=null},setup:function(e){var n,t=e.option,o=t.componentStyle,a=t.contentEdit,c=(0,u.inject)("shopDetailsInfo"),d=(0,u.ref)(1),f=(0,u.ref)(!1),v=(0,u.ref)(!1),p=[1,2,3],m=(null===(n=c.value)||void 0===n?void 0:n.member_equities)||[],b=p.find((function(e){return m.find((function(n){return+n===e}))})),h=(0,u.computed)((function(){var e,n,t,o,u,r,i;if(null===c||void 0===c||null===(e=c.value)||void 0===e||null===(n=e.UserLevelDiscount)||void 0===n||!n.level)return!1;switch(b){case 1:break;case 2:if(1!==c.value.vip_price_type)return!1;i=null===(t=c.value.vip_price)||void 0===t||null===(o=t.info)||void 0===o?void 0:o.find((function(e){var n,t;return e.level_id===(null===c||void 0===c||null===(n=c.value)||void 0===n||null===(t=n.UserLevelDiscount)||void 0===t?void 0:t.level)}));break;case 3:i=s(s({},c.value),{},{price:(0,l.Big)(+c.value.price).times(null===c||void 0===c||null===(u=c.value)||void 0===u||null===(r=u.UserLevelDiscount)||void 0===r?void 0:r.discount).times(.01).toFixed(2)});break;default:return!1}return void 0!==i&&null!==i&&i.price})),y=(0,u.computed)((function(){var e,n,t;return(null===(e=c.value)||void 0===e||null===(n=e.slideshow)||void 0===n||null===(t=n.map)||void 0===t?void 0:t.call(n,(function(e){return{image:e}})))||[]})),w=function(e){return d.value=e+1},g=(0,u.computed)((function(){var e=[!!c.value.goods_detail&&{name:"详情"},5!==c.value.goods_param_type&&{name:"参数"}];return e.filter((function(e){return e}))})),O=(0,u.ref)(0),_=(0,u.ref)([]);2==c.value.goods_param_type?(0,r.reqGoodsParam)(c.value.goods_param).then((function(e){var n,t,o=e.data;_.value=null===(n=o.data.data)||void 0===n||null===(t=n[0])||void 0===t?void 0:t.summarize})):4==c.value.goods_param_type&&(_.value=c.value.goods_param);var P=(0,u.computed)((function(){return i.default.getters.hexColor}));return{$hexColor:P,componentStyle:o,contentEdit:a,onSwitchCarousel:w,list:y,currentIndex:d,shopDetailsInfo:c,tabs:g,currentTab:O,tableList:_,memberPrice:h,onlymemberType:b,videoStatus:v,showEnsurePopup:f}}});n.default=f}).call(this,t("543d")["default"])},e38a:function(e,n,t){"use strict";t.r(n);var o=t("b240"),u=t.n(o);for(var r in o)["default"].indexOf(r)<0&&function(e){t.d(n,e,(function(){return o[e]}))}(r);n["default"]=u.a},ed86:function(e,n,t){"use strict";t.d(n,"b",(function(){return u})),t.d(n,"c",(function(){return r})),t.d(n,"a",(function(){return o}));var o={authController:function(){return t.e("components/controllers/auth-controller").then(t.bind(null,"303b"))},viewIcon:function(){return Promise.all([t.e("common/vendor"),t.e("components/view/view-icon")]).then(t.bind(null,"2807"))},uTabs:function(){return t.e("node-modules/uview-ui/components/u-tabs/u-tabs").then(t.bind(null,"5d62"))},uParse:function(){return Promise.all([t.e("common/vendor"),t.e("node-modules/uview-ui/components/u-parse/u-parse")]).then(t.bind(null,"98ef"))},uTable:function(){return t.e("node-modules/uview-ui/components/u-table/u-table").then(t.bind(null,"8365"))},uTr:function(){return t.e("node-modules/uview-ui/components/u-tr/u-tr").then(t.bind(null,"18fd"))},uTd:function(){return t.e("node-modules/uview-ui/components/u-td/u-td").then(t.bind(null,"acc3"))},uImage:function(){return t.e("node-modules/uview-ui/components/u-image/u-image").then(t.bind(null,"9df5"))},commonShopParams:function(){return t.e("components/commons/common-shop-params").then(t.bind(null,"f810"))}},u=function(){var e=this,n=e.$createElement,t=(e._self._c,e.shopDetailsInfo.video&&!e.videoStatus?e.$spliceStaticUrl("play.png"):null),o=1===e.shopDetailsInfo.sales_show?Number(e.shopDetailsInfo.sales):null,u=1===e.shopDetailsInfo.sales_show?Number(e.shopDetailsInfo.virtual_sales):null;e._isMounted||(e.e0=function(n){e.videoStatus=!0},e.e1=function(n){e.videoStatus=!1},e.e2=function(n){e.showEnsurePopup=!0},e.e3=function(n){e.currentTab=n}),e.$mp.data=Object.assign({},{$root:{m0:t,m1:o,m2:u}})},r=[]},ff41:function(e,n,t){}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/view/CommodityInfo-create-component',
    {
        'components/view/CommodityInfo-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("5616"))
        })
    },
    [['components/view/CommodityInfo-create-component']]
]);
