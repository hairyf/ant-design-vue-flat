import{p as e,h as l,a,i as o,e as t,b as s,o as r,c as d,g as u,u as n,s as p,t as i,F as m,k as c,X as v}from"./vendor.71e19cde.js";import{_ as k}from"./ColorInput.60244a44.js";const y=c();e("data-v-1360aaf6");const f={class:"tips oe-m-l-10"},h=v(" 重置 ");l();var V=a({expose:[],props:{modelValue:{type:Object},showAlpha:Boolean,keyword:String,tips:String,textTips:{type:String,default:"显示文字"}},setup(e,{emit:l}){const a=e,c=o("styled"),v=t({get:()=>c&&a.keyword?c[a.keyword]:a.modelValue,set:e=>{c&&a.keyword?c[a.keyword]=e:l("update:modelValue",e)}}),V=t((()=>{var e;return void 0!==(null==(e=v.value)?void 0:e.text)})),x=t((()=>{var e;return void 0!==(null==(e=v.value)?void 0:e.color)}));return y(((l,a)=>{const o=s("el-checkbox"),t=s("el-form-item"),c=s("el-input"),w=s("el-link");return r(),d(m,null,[u(t,{"label-position":"left",class:{"checkbox-form-item":!n(x)}},{label:y((()=>[n(v)?(r(),d(o,{key:0,modelValue:n(v).state,"onUpdate:modelValue":a[1]||(a[1]=e=>n(v).state=e)},null,8,["modelValue"])):p("",!0),u("span",f,i(e.tips),1)])),default:y((()=>{var l;return[void 0!==(null==(l=n(v))?void 0:l.color)?(r(),d(k,{key:0,showAlpha:e.showAlpha,modelValue:n(v).color,"onUpdate:modelValue":a[2]||(a[2]=e=>n(v).color=e),reset:""},null,8,["showAlpha","modelValue"])):p("",!0)]})),_:1},8,["class"]),n(V)?(r(),d(t,{key:0,class:"input-form-item",label:e.textTips},{default:y((()=>[n(v)?(r(),d(c,{key:0,modelValue:n(v).text,"onUpdate:modelValue":a[3]||(a[3]=e=>n(v).text=e)},null,8,["modelValue"])):p("",!0),u(w,{onClick:a[4]||(a[4]=e=>{var l;return!!(null==(l=n(v))?void 0:l.text)&&(n(v).text="")}),class:"oe-m-l-10",type:"primary",href:"javascript:;"},{default:y((()=>[h])),_:1})])),_:1},8,["label"])):p("",!0)],64)}))}});V.__scopeId="data-v-1360aaf6";export{V as _};