import{h as e,i as a}from"./v7channel.e3167cf5.js";import{c as l}from"./index.a53c91c6.js";import{a as r,l as t,b as s,o as d,c as o,g as u,k as c,p,X as i,h as n}from"./vendor.71e19cde.js";const m=c();p("data-v-2b506785");const v={class:"footer"},f=i("取消"),_=i("保存");n();var P=r({expose:[],setup(r){const c=t({app_id:"",secret:""}),p={app_id:[{required:!0,message:"请输入小程序APP ID",trigger:"blur"}],secret:[{required:!0,message:"请输入小程序APP Secret",trigger:"blur"}]};e().then((e=>{c.value.app_id=e.data.data.value.app_id,c.value.secret=e.data.data.value.secret}));const i=t(),n=()=>{i.value.validate((async e=>{e&&(await a(c.value),l.success("保存配置成功"))}))};return m(((e,a)=>{const l=s("el-input"),r=s("el-form-item"),t=s("el-button"),P=s("el-form"),h=s("el-card");return d(),o(h,{shadow:"never"},{default:m((()=>[u(P,{ref:i,model:c.value,rules:p,"label-width":"160px",class:"register-rule-form"},{default:m((()=>[u(r,{label:"小程序APP ID",prop:"app_id"},{default:m((()=>[u(l,{modelValue:c.value.app_id,"onUpdate:modelValue":a[1]||(a[1]=e=>c.value.app_id=e),placeholder:"请输入小程序APP ID"},null,8,["modelValue"])])),_:1}),u(r,{label:"小程序APP Secret",prop:"secret"},{default:m((()=>[u(l,{modelValue:c.value.secret,"onUpdate:modelValue":a[2]||(a[2]=e=>c.value.secret=e),placeholder:"请输入小程序APP Secret"},null,8,["modelValue"])])),_:1}),u("div",v,[u(t,{onClick:a[3]||(a[3]=a=>e.$router.push("/v7channel/v7channelManagement")),size:"small"},{default:m((()=>[f])),_:1}),u(t,{onClick:n,type:"primary",size:"small"},{default:m((()=>[_])),_:1})])])),_:1},8,["model"])])),_:1})}))}});P.__scopeId="data-v-2b506785";export default P;
