import{a as e,e as t,b as s,o as a,c as i,g as o,G as l,u as r,t as p,s as n,k as c,p as d,h as m}from"./vendor.71e19cde.js";import{M as g}from"./index.a53c91c6.js";const u=c();d("data-v-0eeddeb7");const b=o("i",{class:"el-icon-plus"},null,-1),h={key:0,class:"tips oe-m-t-5"},y={key:1,class:"tips oe-m-l-5"};m();var x=e({expose:[],props:{modelValue:String,tips:String,size:{type:[Number,String],default:48},bgColor:{type:String},border:{type:String,default:"1px dashed rgb(217, 217, 217)"},tipsPlacement:{type:String,default:"right"}},setup(e,{emit:c}){const d=e,m=t({get:()=>d.modelValue,set:e=>c("update:modelValue",e)}),x=async()=>{const[e]=await g({multiple:!1});m.value=e.path.url};return u(((t,c)=>{const d=s("el-image");return a(),i("div",{class:"image-container oe-flex",style:{flexDirection:"bottom"===e.tipsPlacement?"column":"row"}},[o(d,{fit:"cover",src:r(m),onClick:x,style:{width:`${e.size}px`,height:`${e.size}px`}},{error:u((()=>[o("div",{class:"empty-image",onClick:l(x,["stop"]),style:{width:`${e.size}px`,height:`${e.size}px`,lineHeight:`${e.size}px`,backgroundColor:e.bgColor,border:e.border}},[b],12,["onClick"])])),_:1},8,["src","style"]),e.tips&&"bottom"==e.tipsPlacement?(a(),i("span",h,p(e.tips),1)):n("",!0),e.tips&&"right"==e.tipsPlacement?(a(),i("span",y,p(e.tips),1)):n("",!0)],4)}))}});x.__scopeId="data-v-0eeddeb7";export{x as _};