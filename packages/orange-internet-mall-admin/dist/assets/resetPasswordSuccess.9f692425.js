import{u as s}from"./index.a53c91c6.js";import{a,l as e,m as t,b as l,o as c,c as o,g as n,t as r,k as i,p as d,h as u}from"./vendor.71e19cde.js";const p=i();d("data-v-62d05643");const v={class:"main"},m=n("i",{class:"ad-complete1 icon"},null,-1),f=n("div",{class:"success"},"您的密码已经重置成功，请牢记",-1),g={class:"footer"},h=n("span",{class:"text"},"返回登录",-1);u();var x=a({expose:[],setup(a){const i=s(),d=e(5);t((()=>{const s=setInterval((()=>{d.value--,d.value<1&&(clearInterval(s),i.push("login"))}),1e3)}));const u=()=>{i.push("login")};return p(((s,a)=>{const e=l("el-button");return c(),o("div",v,[m,f,n("div",g,r(d.value)+"秒后自动返回登录页面",1),n(e,{class:"wechat-login",size:"small",type:"primary",onClick:u},{default:p((()=>[h])),_:1})])}))}});x.__scopeId="data-v-62d05643";export default x;
