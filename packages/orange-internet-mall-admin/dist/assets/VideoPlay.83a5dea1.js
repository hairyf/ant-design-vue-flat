import{a as e,e as o,o as a,c as s,g as i,u as r,k as t}from"./vendor.71e19cde.js";import{_ as d}from"./ViewImage.e6691b67.js";import{a as p,u as c,b as n}from"./use-view-style.fb7e9a30.js";import"./index.a53c91c6.js";const l=t();var u=e({expose:[],props:{option:{type:Object,required:!0}},setup(e){const t=e,{componentStyle:u,colorStyle:b}=t.option,{background:g}=p(b),{padding:m,borderRadius:v}=c(t.option),{boxShadow:y,border:h}=n(u),f=o((()=>{const e=t.option.addVideo.proportion;return"1:1"===e?375:"4:3"===e?281:211}));return l(((o,t)=>(a(),s("div",null,[i("div",{class:"video-play-container",style:{boxShadow:r(y),border:r(h),padding:r(m),background:r(g)}},[i("div",{class:"video-play-view",style:{height:`${r(f)}px`,borderRadius:r(v)}},[i(d,{size:{width:"100%",height:"100%"},class:"background-image",src:e.option.addVideo.image,alt:"",fit:"cover"},null,8,["src"]),i(d,{size:56,class:"play-image",src:"/addons/weitshop_shop/weshop/public/home/backend/images/decorate/play.png",alt:""})],4)],4)]))))}});u.__scopeId="data-v-5b61d06e";export default u;