import{u as e,j as a,M as l,L as t,aI as u,aJ as s,c as o,aF as d}from"./index.a53c91c6.js";import{a as n,l as r,m as i,b as v,o as p,c,g as m,s as f,u as y,k as h,p as b,X as k,h as g}from"./vendor.71e19cde.js";const _=h();b("data-v-f65e6be0");const V=m("div",{class:"recharge-title"},"新增公告",-1),x=k("显示内容"),C=k("链接跳转"),L=k("开启"),w=k("关闭"),U={class:"oe-flex"},q=k("选择链接"),j={class:"oe-flex oe-row-center"},I=k("取消"),S=k("保存");g();var F=n({expose:[],setup(n){const h=e(),b=a(),k=r(""),g=r({text:"",title:"",url:"",type:"1",status:"1",statusContent:"",shareLinks:""}),F=r(""),J=r({text:[{required:!0,message:"请填写公告排序",trigger:"blur"}],title:[{required:!0,message:"请填写公告标题",trigger:"blur"}]}),M=()=>{l({multiple:!1}).then((e=>{g.value.url=e[0].path.url}))},X=()=>{t().then((e=>{g.value.shareLinks=e.value.path}))},z=()=>{k.value.validate((e=>{e&&A()}))},A=async()=>{F.value?await s({id:F.value,title:g.value.title,type:g.value.type,status:g.value.status,order:g.value.text,image:g.value.url,content:{statusContent:g.value.statusContent,shareLinks:g.value.shareLinks}}):await u({title:g.value.title,type:g.value.type,status:g.value.status,order:g.value.text,image:g.value.url,content:{statusContent:g.value.statusContent,shareLinks:g.value.shareLinks}}),o.success("操作成功"),h.go(-1)};return i((()=>{b.query.id&&(F.value=b.query.id,(async()=>{const{data:e}=await d({id:F.value});g.value.text=e.data.order,g.value.title=e.data.title,g.value.type=e.data.type.toString(),g.value.status=e.data.status.toString(),g.value.url=e.data.image,g.value.statusContent=e.data.content.statusContent,g.value.shareLinks=e.data.content.shareLinks})())})),_(((e,a)=>{const l=v("el-input"),t=v("el-form-item"),u=v("el-radio"),s=v("el-radio-group"),o=v("el-image"),d=v("el-button"),n=v("el-card"),r=v("el-form");return p(),c(r,{model:g.value,ref:k,rules:J.value,"label-width":"80px",class:"notice-box"},{default:_((()=>[m(n,{shadow:"never",class:"box-card"},{default:_((()=>[V,m(t,{label:"公告排序",prop:"text"},{default:_((()=>[m(l,{type:"number",class:"sort-inp",modelValue:g.value.text,"onUpdate:modelValue":a[1]||(a[1]=e=>g.value.text=e),placeholder:"请输入公告序号"},null,8,["modelValue"])])),_:1}),m(t,{label:"公告标题",prop:"title"},{default:_((()=>[m(l,{class:"title-inp",modelValue:g.value.title,"onUpdate:modelValue":a[2]||(a[2]=e=>g.value.title=e),placeholder:"请输入公告标题"},null,8,["modelValue"])])),_:1}),m(t,{label:"展示方式"},{default:_((()=>[m(s,{modelValue:g.value.type,"onUpdate:modelValue":a[3]||(a[3]=e=>g.value.type=e)},{default:_((()=>[m(u,{label:"1"},{default:_((()=>[x])),_:1}),m(u,{label:"2"},{default:_((()=>[C])),_:1})])),_:1},8,["modelValue"])])),_:1}),m(t,{label:"公告状态"},{default:_((()=>[m(s,{modelValue:g.value.status,"onUpdate:modelValue":a[4]||(a[4]=e=>g.value.status=e)},{default:_((()=>[m(u,{label:"1"},{default:_((()=>[L])),_:1}),m(u,{label:"0"},{default:_((()=>[w])),_:1})])),_:1},8,["modelValue"])])),_:1}),"1"==g.value.type?(p(),c(t,{key:0,label:"公告图片"},{default:_((()=>[g.value.url?f("",!0):(p(),c(o,{key:0,onClick:M,src:"/addons/weitshop_shop/weshop/public/home/backend/images/common/upload-empty.png",class:"empty-img",fit:"ccover"})),g.value.url?(p(),c(o,{key:1,fit:"ccover",onClick:M,src:g.value.url,class:"empty-img"},null,8,["src"])):f("",!0)])),_:1})):f("",!0),"1"==g.value.type?(p(),c(t,{key:1,label:"公告内容"},{default:_((()=>[m(l,{type:"textarea",modelValue:g.value.statusContent,"onUpdate:modelValue":a[5]||(a[5]=e=>g.value.statusContent=e),placeholder:"请输入公告标题"},null,8,["modelValue"])])),_:1})):f("",!0),"2"==g.value.type?(p(),c(t,{key:2,label:"分享链接"},{default:_((()=>[m("div",U,[m(l,{class:"title-inp",modelValue:g.value.shareLinks,"onUpdate:modelValue":a[6]||(a[6]=e=>g.value.shareLinks=e),placeholder:"请填写以http://或http://开头的有效链接"},null,8,["modelValue"]),m(d,{plain:"",class:"link-btn",onClick:X},{default:_((()=>[q])),_:1})])])),_:1})):f("",!0)])),_:1}),m(n,{shadow:"never",class:"operation"},{default:_((()=>[m("div",j,[m(d,{plain:"",onClick:a[7]||(a[7]=e=>y(h).go(-1))},{default:_((()=>[I])),_:1}),m(d,{type:"primary",onClick:z},{default:_((()=>[S])),_:1})])])),_:1})])),_:1},8,["model","rules"])}))}});F.__scopeId="data-v-f65e6be0";export default F;