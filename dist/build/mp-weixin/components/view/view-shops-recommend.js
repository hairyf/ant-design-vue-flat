(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/view/view-shops-recommend"],{"1b9e":function(e,n,t){"use strict";var o;t.d(n,"b",(function(){return u})),t.d(n,"c",(function(){return r})),t.d(n,"a",(function(){return o}));var u=function(){var e=this,n=e.$createElement;e._self._c},r=[]},"253f":function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var o=r(t("0613")),u=t("a6f4");function r(e){return e&&e.__esModule?e:{default:e}}var c=function(){Promise.all([t.e("common/vendor"),t.e("components/view/CommodityGroup")]).then(function(){return resolve(t("834b"))}.bind(null,t)).catch(t.oe)},i=(0,u.defineComponent)({props:{type:{type:String,required:!0}},components:{CommodityGroup:c},setup:function(e){var n=(0,u.computed)((function(){return o.default.state.common.recommend})),t=n.value.contentEdit.pages.includes(e.type);return{showView:t,recommend:n}}});n.default=i},9460:function(e,n,t){"use strict";var o=t("97b1"),u=t.n(o);u.a},"97b1":function(e,n,t){},db67:function(e,n,t){"use strict";t.r(n);var o=t("253f"),u=t.n(o);for(var r in o)["default"].indexOf(r)<0&&function(e){t.d(n,e,(function(){return o[e]}))}(r);n["default"]=u.a},fcdb:function(e,n,t){"use strict";t.r(n);var o=t("1b9e"),u=t("db67");for(var r in u)["default"].indexOf(r)<0&&function(e){t.d(n,e,(function(){return u[e]}))}(r);t("9460");var c,i=t("f0c5"),f=Object(i["a"])(u["default"],o["b"],o["c"],!1,null,"05ff13aa",null,!1,o["a"],c);n["default"]=f.exports}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/view/view-shops-recommend-create-component',
    {
        'components/view/view-shops-recommend-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("fcdb"))
        })
    },
    [['components/view/view-shops-recommend-create-component']]
]);
