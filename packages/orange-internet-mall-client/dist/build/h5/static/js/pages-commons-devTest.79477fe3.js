(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-commons-devTest"],{"58c9":function(t,s,n){"use strict";var e;n.d(s,"b",(function(){return i})),n.d(s,"c",(function(){return r})),n.d(s,"a",(function(){return e}));var i=function(){var t=this,s=t.$createElement,n=t._self._c||s;return n("div",{staticClass:"dev-test"},[t._v(t._s(t.countDown.seconds))])},r=[]},"5d65":function(t,s,n){"use strict";var e=n("ee27").default;Object.defineProperty(s,"__esModule",{value:!0}),s.useCountdown=void 0;var i=e(n("5a0c")),r=e(n("d772")),o=n("a6f4");i.default.extend(r.default);var u=function(t){return(0,o.computed)((function(){var s=i.default.duration(t.value);return s.$d}))};s.useCountdown=u},"7d36":function(t,s,n){"use strict";Object.defineProperty(s,"__esModule",{value:!0}),s.default=void 0;var e=n("5d65"),i=n("a6f4"),r=(0,i.defineComponent)({setup:function(){var t=(0,i.ref)(1e6),s=(0,e.useCountdown)(t);return{countDown:s}}});s.default=r},"93dd":function(t,s,n){"use strict";n.r(s);var e=n("7d36"),i=n.n(e);for(var r in e)["default"].indexOf(r)<0&&function(t){n.d(s,t,(function(){return e[t]}))}(r);s["default"]=i.a},d21e:function(t,s,n){"use strict";n.r(s);var e=n("58c9"),i=n("93dd");for(var r in i)["default"].indexOf(r)<0&&function(t){n.d(s,t,(function(){return i[t]}))}(r);var o,u=n("f0c5"),a=Object(u["a"])(i["default"],e["b"],e["c"],!1,null,"77ce0745",null,!1,e["a"],o);s["default"]=a.exports},d772:function(t,s,n){!function(s,n){t.exports=n()}(0,(function(){"use strict";var t,s,n=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,e=/^(-|\+)?P(?:([-+]?[0-9,.]*)Y)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)W)?(?:([-+]?[0-9,.]*)D)?(?:T(?:([-+]?[0-9,.]*)H)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)S)?)?$/,i={years:31536e6,months:2592e6,days:864e5,hours:36e5,minutes:6e4,seconds:1e3,milliseconds:1,weeks:6048e5},r=function(t){return t instanceof h},o=function(t,s,n){return new h(t,n,s.$l)},u=function(t){return s.p(t)+"s"},a=function(t){return t<0},d=function(t){return a(t)?Math.ceil(t):Math.floor(t)},c=function(t,s){return t?a(t)?{negative:!0,format:""+function(t){return Math.abs(t)}(t)+s}:{negative:!1,format:""+t+s}:{negative:!1,format:""}},h=function(){function a(t,s,n){var r=this;if(this.$d={},this.$l=n,s)return o(t*i[u(s)],this);if("number"==typeof t)return this.$ms=t,this.parseFromMilliseconds(),this;if("object"==typeof t)return Object.keys(t).forEach((function(s){r.$d[u(s)]=t[s]})),this.calMilliseconds(),this;if("string"==typeof t){var a=t.match(e);if(a)return this.$d.years=a[2],this.$d.months=a[3],this.$d.weeks=a[4],this.$d.days=a[5],this.$d.hours=a[6],this.$d.minutes=a[7],this.$d.seconds=a[8],this.calMilliseconds(),this}return this}var h=a.prototype;return h.calMilliseconds=function(){var t=this;this.$ms=Object.keys(this.$d).reduce((function(s,n){return s+(t.$d[n]||0)*i[n]}),0)},h.parseFromMilliseconds=function(){var t=this.$ms;this.$d.years=d(t/31536e6),t%=31536e6,this.$d.months=d(t/2592e6),t%=2592e6,this.$d.days=d(t/864e5),t%=864e5,this.$d.hours=d(t/36e5),t%=36e5,this.$d.minutes=d(t/6e4),t%=6e4,this.$d.seconds=d(t/1e3),t%=1e3,this.$d.milliseconds=t},h.toISOString=function(){var t=c(this.$d.years,"Y"),s=c(this.$d.months,"M"),n=+this.$d.days||0;this.$d.weeks&&(n+=7*this.$d.weeks);var e=c(n,"D"),i=c(this.$d.hours,"H"),r=c(this.$d.minutes,"M"),o=this.$d.seconds||0;this.$d.milliseconds&&(o+=this.$d.milliseconds/1e3);var u=c(o,"S"),a=t.negative||s.negative||e.negative||i.negative||r.negative||u.negative,d=i.format||r.format||u.format?"T":"",h=(a?"-":"")+"P"+t.format+s.format+e.format+d+i.format+r.format+u.format;return"P"===h||"-P"===h?"P0D":h},h.toJSON=function(){return this.toISOString()},h.format=function(t){var e=t||"YYYY-MM-DDTHH:mm:ss",i={Y:this.$d.years,YY:s.s(this.$d.years,2,"0"),YYYY:s.s(this.$d.years,4,"0"),M:this.$d.months,MM:s.s(this.$d.months,2,"0"),D:this.$d.days,DD:s.s(this.$d.days,2,"0"),H:this.$d.hours,HH:s.s(this.$d.hours,2,"0"),m:this.$d.minutes,mm:s.s(this.$d.minutes,2,"0"),s:this.$d.seconds,ss:s.s(this.$d.seconds,2,"0"),SSS:s.s(this.$d.milliseconds,3,"0")};return e.replace(n,(function(t,s){return s||String(i[t])}))},h.as=function(t){return this.$ms/i[u(t)]},h.get=function(t){var s=this.$ms,n=u(t);return"milliseconds"===n?s%=1e3:s="weeks"===n?d(s/i[n]):this.$d[n],0===s?0:s},h.add=function(t,s,n){var e;return e=s?t*i[u(s)]:r(t)?t.$ms:o(t,this).$ms,o(this.$ms+e*(n?-1:1),this)},h.subtract=function(t,s){return this.add(t,s,!0)},h.locale=function(t){var s=this.clone();return s.$l=t,s},h.clone=function(){return o(this.$ms,this)},h.humanize=function(s){return t().add(this.$ms,"ms").locale(this.$l).fromNow(!s)},h.milliseconds=function(){return this.get("milliseconds")},h.asMilliseconds=function(){return this.as("milliseconds")},h.seconds=function(){return this.get("seconds")},h.asSeconds=function(){return this.as("seconds")},h.minutes=function(){return this.get("minutes")},h.asMinutes=function(){return this.as("minutes")},h.hours=function(){return this.get("hours")},h.asHours=function(){return this.as("hours")},h.days=function(){return this.get("days")},h.asDays=function(){return this.as("days")},h.weeks=function(){return this.get("weeks")},h.asWeeks=function(){return this.as("weeks")},h.months=function(){return this.get("months")},h.asMonths=function(){return this.as("months")},h.years=function(){return this.get("years")},h.asYears=function(){return this.as("years")},a}();return function(n,e,i){t=i,s=i().$utils(),i.duration=function(t,s){var n=i.locale();return o(t,{$l:n},s)},i.isDuration=r;var u=e.prototype.add,a=e.prototype.subtract;e.prototype.add=function(t,s){return r(t)&&(t=t.asMilliseconds()),u.bind(this)(t,s)},e.prototype.subtract=function(t,s){return r(t)&&(t=t.asMilliseconds()),a.bind(this)(t,s)}}}))}}]);