import{u as o,a as s,b as e}from"./use-view-style.fb7e9a30.js";import{a as t,o as a,c as r,g as n,u as i,t as d,s as c,k as l,p,h as u}from"./vendor.71e19cde.js";const b=l();p("data-v-0487b014");const h={class:"input-view"},y=n("i",{class:"el-icon-location-outline"},null,-1);u();var v=t({expose:[],props:{option:{type:Object,required:!0}},setup(t){const l=t,{componentStyle:p,searchSetting:u,colorStyle:v}=l.option,{padding:w,borderRadius:x}=o(l.option),{background:S}=s(v),{boxShadow:g,border:m}=e(p);return b(((o,s)=>(a(),r("div",{style:{padding:i(w),background:i(S),boxShadow:i(g),border:i(m)},class:"search-input-container"},[n("div",h,["不显示"!==i(u).positionShow?(a(),r("div",{key:0,style:{order:"左侧"===i(u).positionShow?0:1,padding:"左侧"===i(u).positionShow?"0 8px 0 0":"0 0 0 8px"}},[y,n("span",{class:"address-text",style:{color:i(u).addressColor}},d("省"===i(u).showAddress?"广东省":"市"===i(u).showAddress?"深圳市":"龙岗区"),5)],4)):c("",!0),n("div",{class:"search-container oe-flex-1",style:{justifyContent:i(u).contentPosition,borderColor:i(v).color.border,borderRadius:i(x)}},[n("i",{class:"el-icon-search oe-m-r-8 oe-m-t-3",style:{color:i(v).color.icon}},null,4),n("span",{style:{color:i(v).color.text}},d(i(u).tipsContent),5)],4)])],4))))}});v.__scopeId="data-v-0487b014";export default v;