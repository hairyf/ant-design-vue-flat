import{aB as e,aC as a,c as s}from"./index.a53c91c6.js";import{a as l,l as t,m as c,b as o,o as d,c as n,g as r,k as i,p as m,X as p,h as u}from"./vendor.71e19cde.js";const f=i();m("data-v-ec02fb40");const v=r("div",null,"反馈设置位置指引：",-1),h=r("div",{class:"oe-flex"},[p(" 1、先登录 "),r("span",{style:{color:"#ff0000"}},"兔小巢"),p(" 后台，点击 "),r("a",{class:"compliance",href:"https://txc.qq.com/",target:"_blank"},"兔小巢"),p(" 去登录 ")],-1),g={class:"oe-flex"},x=p(" 2、新增产品 "),b=r("div",{class:"set-icon-text"},[r("span",null,"示例")],-1),_={class:"oe-flex"},y=p(" 3、产品新增完成后，在产品设置中查看产品ID "),w=r("div",{class:"set-icon-text"},[r("span",null,"示例")],-1),k=r("div",null," 4、将获得的产品ID输入上方输入框内，点击保存并生效即可",-1),I=p("保存并生效");u();var D=l({expose:[],setup(l){const i=t({name:""}),m=async()=>{const{data:a}=await e({key:"feedback"});i.value.name=a.data.product_id},p=async()=>{const e={product_id:i.value.name};await a("feedback",e),s.success("操作成功"),m()};return c((()=>{m()})),f(((e,a)=>{const s=o("el-input"),l=o("el-image"),t=o("el-popover"),c=o("el-button"),m=o("el-form-item"),u=o("el-form"),D=o("el-card");return d(),n(D,{shadow:"never",class:"feedback-box"},{default:f((()=>[r(u,{model:i.value,"label-width":"100px"},{default:f((()=>[r(m,{label:"产品ID"},{default:f((()=>[r(s,{placeholder:"请输入您的产品ID",modelValue:i.value.name,"onUpdate:modelValue":a[1]||(a[1]=e=>i.value.name=e)},null,8,["modelValue"]),v,h,r("div",g,[x,r(t,{placement:"right",width:400,trigger:"hover"},{reference:f((()=>[b])),default:f((()=>[r(l,{src:"/addons/weitshop_shop/weshop/public/home/backend/images/system/product.png",class:"examples-img",style:{width:"400px",height:"515px"}})])),_:1})]),r("div",_,[y,r(t,{placement:"right",width:485,trigger:"hover"},{reference:f((()=>[w])),default:f((()=>[r(l,{src:"/addons/weitshop_shop/weshop/public/home/backend/images/system/establish.png",class:"examples-img",style:{width:"485px",height:"210px"}})])),_:1})]),k,r(c,{type:"primary",onClick:p},{default:f((()=>[I])),_:1})])),_:1})])),_:1},8,["model"])])),_:1})}))}});D.__scopeId="data-v-ec02fb40";export default D;
