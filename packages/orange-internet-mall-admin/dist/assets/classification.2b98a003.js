import{u as e,f as a,w as l,l as s,U as t,_ as i,a7 as d,c as n}from"./index.a53c91c6.js";import{a as o,l as c,w as r,b as u,o as v,c as m,g as f,s as p,t as h,X as y,u as x,k as b,p as g,h as k}from"./vendor.71e19cde.js";const C=b();g("data-v-18a7972c");const _={class:"oe-m-b-20 title-button"},w=f("span",{class:"text"},"编辑模板",-1),I={class:"add-button-box"},j={key:0,class:"text"},F={key:1,class:"text"},V=f("div",{class:"table-header-container"},[f("div",{class:"table-header oe-flex"},[f("div",{style:{flex:"5%"}}),f("div",{style:{flex:"35%"}},"分类名称"),f("div",{style:{flex:"10%"}},"分类图片"),f("div",{style:{flex:"10%"}},"状态"),f("div",{style:{flex:"10%"}},"商品数"),f("div",{style:{flex:"15%"}},"新增时间"),f("div",{style:{flex:"15%"}},"操作")])],-1),z={key:0,class:"table-slot-item oe-flex"},B={style:{flex:"5%"},class:"oe-flex oe-row-between"},E=f("i",{class:"ad-tableIcon icon"},null,-1),N={style:{flex:"35%"}},S={style:{flex:"10%"}},T={class:"table-upload-image"},U={class:"image-slot"},q={style:{flex:"10%"}},A={style:{flex:"10%"}},G={style:{flex:"15%"}},L={style:{flex:"15%"}},X={class:"edit oe-flex"},D=y("删除");k();var H=o({expose:[],setup(o){const b=c([]),g=c(!1);r(b,(e=>{g.value=!e.some((e=>e.hideChildren))}),{deep:!0});const k=e();function H(e){e.forEach((e=>{e.children?(e.isNameShow=!0,e.hideChildren=!1,H(e.children)):(e.isNameShow=!0,e.hideChildren=!1)}))}const J=c(1),K=async()=>{const{data:e}=await t();b.value=e.data.data,J.value=e.data.template_level,H(b.value)};K();return C(((e,t)=>{const o=u("el-button"),c=u("el-image"),r=u("el-link"),H=u("custom-button"),M=u("el-empty"),O=u("el-card");return v(),m(O,{shadow:"never",class:"custom-crad-container"},{default:C((()=>[f("div",_,[f(o,{class:"add-goods",size:"mini",type:"primary",onClick:t[1]||(t[1]=e=>{var a;k.push({path:"/commodity/editClassification",query:{id:a}})})},{default:C((()=>[w])),_:1}),f(o,{onClick:t[2]||(t[2]=e=>{return a=g.value,void s.forEach(b.value,(e=>{e.hideChildren=a}));var a}),class:"add-goods",size:"mini",type:"primary",plain:""},{default:C((()=>[f("div",I,[f("i",{class:g.value?"ad-open-class":"ad-putItAway"},null,2),g.value?(v(),m("span",j,"全部收起")):(v(),m("span",F,"全部展开"))])])),_:1})]),V,f(l,{style:{width:"100%"},modelValue:b.value,"onUpdate:modelValue":t[3]||(t[3]=e=>b.value=e)},{item:C((({nestedIndex:e,item:l})=>{var s;return[e<J.value?(v(),m("div",z,[f("div",B,[E,e<J.value-1&&(null==(s=l.children)?void 0:s.length)?(v(),m("i",{key:0,onClick:e=>{l.hideChildren=!l.hideChildren},class:["el-icon-caret-bottom hide-icon oe-m-r-10",{hide:l.hideChildren}]},null,10,["onClick"])):p("",!0)]),f("div",N,[e?(v(),m("i",{key:0,class:"ad-Frame1 oe-m-r-14",style:{marginLeft:1==e?0:20*e+"px"}},null,4)):p("",!0),f("span",null,h(l.name),1)]),f("div",S,[f("div",T,[f(c,{src:l.thumb},{error:C((()=>[f("div",U,[f(c,{src:"/addons/weitshop_shop/weshop/public/home/backend/images/classificationGoods/default-image.png"})])])),_:2},1032,["src"])])]),f("div",q,[f(r,{href:"javascript:;",type:1==l.status?"success":"danger"},{default:C((()=>[y(h(1==l.status?"显示":"隐藏"),1)])),_:2},1032,["type"])]),f("div",A,[f("span",null,h(l.num),1)]),f("div",G,[f("span",null,h(x(a)(l.createtime)),1)]),f("div",L,[f("div",X,[f(H,{icon:"ad-delete",onClick:e=>{return a=l.id,void i.confirm("此操作将永久删除该分类, 是否继续?","删除分类",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((()=>{d({del_datas:a}).then((e=>{0==e.data.code?(n({type:"success",message:"删除成功!"}),K()):n({type:"error",message:"删除失败!"})}))}));var a},color:"#FF0000",class:"public-move-left oe-m-l-0"},{default:C((()=>[D])),_:2},1032,["onClick"])])])])):p("",!0)]})),_:1},8,["modelValue"]),b.value.length?p("",!0):(v(),m(M,{key:0,class:"oe-m-t-30",description:"暂无商品分类"}))])),_:1})}))}});H.__scopeId="data-v-18a7972c";export default H;