import{j as e,u as a,X as s,ae as t,c as r}from"./index.a53c91c6.js";import{a as l,l as o,r as d,b as c,o as i,c as n,g as u,u as p,k as m,p as g,X as h,h as v}from"./vendor.71e19cde.js";const f=m();g("data-v-40296a2e");const b={class:"box-card"},w={class:"footer-button"},x=h("保存"),_=h("取消"),y=u("div",{class:"title"},"预览 ",-1),V={class:"picture-preview"};v();var j=l({expose:[],setup(l){const m=e(),g=a(),h=m.query.id,v=o([]),j=d({name:"",description:""}),k=d({name:[{required:!0,message:"请输入分组名称",trigger:"blur"},{min:1,max:20,message:"长度在 1 到 20 个字符",trigger:"blur"}]});null!=h&&s({id:h}).then((e=>{const a=e.data.data.data[0],s=a.goods;j.name=a.name,j.description=a.description,s.forEach((e=>{v.value.push({label:e.title,image:e.video_cover,value:e.id,price:e.price})}))}));const q=()=>{null!=h?(j.id=h,t(j).then((e=>{0==e.data.code?(g.push("support"),r.success("编辑成功")):r.error({message:"服务端异常,添加失败",type:"error"})}))):t(j).then((e=>{0==e.data.code?(g.push("support"),r.success("新增成功")):r.error({message:"服务端异常,添加失败",type:"error"})}))};return f(((e,a)=>{const s=c("el-input"),t=c("el-form-item"),r=c("el-form"),l=c("el-button"),o=c("el-card"),d=c("el-image");return i(),n("div",b,[u(o,{shadow:"never",class:"left-card custom-crad-container"},{default:f((()=>[u(r,{model:p(j),rules:p(k),"label-width":"120px",class:"demo-ruleForm"},{default:f((()=>[u(t,{label:"服务支持名称",prop:"name"},{default:f((()=>[u(s,{type:"text",class:"w-percentage",modelValue:p(j).name,"onUpdate:modelValue":a[1]||(a[1]=e=>p(j).name=e),maxlength:"20","show-word-limit":""},null,8,["modelValue"])])),_:1}),u(t,{label:"概述"},{default:f((()=>[u(s,{type:"textarea",class:"w-percentage",placeholder:"请输入分组简介内容",modelValue:p(j).description,"onUpdate:modelValue":a[2]||(a[2]=e=>p(j).description=e),maxlength:"140","show-word-limit":""},null,8,["modelValue"])])),_:1})])),_:1},8,["model","rules"]),u("div",w,[u(l,{size:"small btn",type:"primary",onClick:q},{default:f((()=>[x])),_:1}),u(l,{size:"small btn",onClick:a[3]||(a[3]=e=>p(g).push("support"))},{default:f((()=>[_])),_:1})])])),_:1}),u(o,{shadow:"never",class:"right-card custom-crad-container"},{default:f((()=>[y,u("div",V,[u(d,{src:"/addons/weitshop_shop/weshop/public/home/backend/images/goods/add-grouping-preview.png"})])])),_:1})])}))}});j.__scopeId="data-v-40296a2e";export default j;