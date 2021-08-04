import{e,f as a,g as s}from"./v7channel.e3167cf5.js";import{u as l,c as t}from"./index.a53c91c6.js";import{a as c,l as r,z as d,b as v,o as i,c as u,g as n,t as o,s as p,k as m,p as y,X as g,h as f}from"./vendor.71e19cde.js";const h=m();y("data-v-3c356cf0");const x={class:"step-box"},b={class:"step-side"},k=n("div",{class:"current-title"},"扫码上传",-1),w=n("div",{class:"current-tips"},"公众平台账号授权绑定",-1),_=n("div",{class:"current-title"},"填写版本信息",-1),I=n("div",{class:"current-tips"},"填写小程序版本信息，上传代码",-1),q=n("div",{class:"current-title"},"提交微信审核",-1),V=n("div",{class:"current-tips"},"跳转微信页面提交审核",-1),z={class:"step-content"},A=n("div",{class:"triangle"},null,-1),F={class:"qr-code-box"},L={key:0},j={key:1},C={class:"qr-code-mask"},D={class:"qr-button-box"},O={key:0},P={key:1},R={key:0},U={key:1},X={key:0,class:"refresh-qr-box"},B=n("div",{class:"tips"},"请使用微信扫描二维码进行绑定授权",-1),E=n("div",{class:"triangle"},null,-1),G=n("div",{class:"edition-tips"},"当前版本为0.0.1",-1),H={class:"footer"},J=g("上传代码"),K=n("div",{class:"triangle"},null,-1),M={key:0,class:"up-login"},N=n("div",{class:"tips-text"},"代码正在上传中...",-1),Q={key:1,class:"up-login"},S=n("div",{class:"tips-text"},"上传失败！",-1),T={key:2,class:"login-success"},W=n("div",{class:"title-icon"},[n("i",{class:"el-icon-check"})],-1),Y=n("div",{class:"success"},"上传成功",-1),Z={class:"tips"};f();var $=c({expose:[],setup(c){const m=l(),y=r({version:"",desc:"",uploadkey:""}),g={version:[{required:!0,message:"请输入活动名称",trigger:"blur"}],desc:[{required:!0,message:"请输入活动名称",trigger:"blur"}]},f=r(1),$=r(!1),ee=r(1),ae=r(!1),se=r(!1),le=r(0),te=r(5),ce=r(""),re=async()=>{se.value=!0;try{const{data:a}=await e();ce.value=a.data.qrcode,y.value.uploadkey=a.data.uploadkey,se.value=!1,$.value=!0}catch(l){if("number"==typeof l.data.data){le.value=l.data.data;const e=setInterval((()=>{le.value--,le.value<=0&&(clearInterval(e),se.value=!1)}),1e3)}else se.value=!1;return}const s=setInterval((async()=>{try{await a();ae.value=!0,f.value=2,clearInterval(s),t.success("登录成功")}catch(l){}}),3e3)},de=r(0),ve=r(),ie=()=>{ve.value.validate((async e=>{if(e){f.value=3;const e=setInterval((()=>{de.value++}),200);try{await s(y.value),clearInterval(e),ee.value=3;const a=setInterval((()=>{te.value--,te.value<=0&&(clearInterval(a),m.push("/v7channel/v7appLetsOption/v7reviewAndRelease"))}),1e3)}catch(a){clearInterval(e),m.push("/v7channel/v7appLetsOption/v7reviewAndRelease")}}}))};return d((()=>{$.value&&location.reload()})),h(((e,a)=>{const s=v("el-image"),l=v("qr-code"),t=v("el-button"),c=v("el-card"),r=v("el-input"),d=v("el-form-item"),m=v("el-form"),ae=v("el-progress");return i(),u("div",x,[n("div",b,[n("div",{class:["text text1",1==f.value?"current":""]},[k,w],2),n("div",{class:["text",2==f.value?"current":""]},[_,I],2),n("div",{class:["text text3",3==f.value?"current":""]},[q,V],2)]),n("div",z,[1==f.value?(i(),u(c,{key:0,shadow:"never",class:"triangle-box card-box"},{default:h((()=>[A,n("div",F,[$.value?(i(),u("div",L,[n(s,{style:{width:"208px",height:"208px"},src:ce.value},null,8,["src"])])):(i(),u("div",j,[n("div",C,[n(s,{src:"/addons/weitshop_shop/weshop/public/home/backend/images/channel/Applets.png"})]),n(l,{text:"asdsadasdsa",size:208})])),n("div",D,[$.value?(i(),u(t,{key:0,disabled:se.value,onClick:re,type:"text",size:"small"},{default:h((()=>[0==le.value?(i(),u("span",O,"刷新二维码")):(i(),u("span",P,o(le.value)+"秒后重新获取二维码",1))])),_:1},8,["disabled"])):(i(),u(t,{key:1,disabled:se.value,onClick:re,type:"primary",size:"small"},{default:h((()=>[0==le.value?(i(),u("span",R,"获取授权二维码")):(i(),u("span",U,o(le.value)+"秒后重新获取二维码",1))])),_:1},8,["disabled"]))])]),$.value?(i(),u("div",X,[B])):p("",!0)])),_:1})):p("",!0),2==f.value?(i(),u(c,{key:1,shadow:"never",class:"triangle-box2 card-box"},{default:h((()=>[E,n(m,{ref:ve,model:y.value,rules:g,"label-width":"80px",class:"register-rule-form"},{default:h((()=>[n(d,{label:"版本号",prop:"version"},{default:h((()=>[n(r,{modelValue:y.value.version,"onUpdate:modelValue":a[1]||(a[1]=e=>y.value.version=e),placeholder:"请输入小程序APP ID"},null,8,["modelValue"]),G])),_:1}),n(d,{label:"版本描述",prop:"desc"},{default:h((()=>[n(r,{rows:6,type:"textarea",modelValue:y.value.desc,"onUpdate:modelValue":a[2]||(a[2]=e=>y.value.desc=e),placeholder:"请输入版本描述"},null,8,["modelValue"])])),_:1}),n("div",H,[n(t,{onClick:ie,type:"primary",size:"small"},{default:h((()=>[J])),_:1})])])),_:1},8,["model"])])),_:1})):p("",!0),3==f.value?(i(),u(c,{key:2,shadow:"never",class:"triangle-box3 card-box"},{default:h((()=>[K,1==ee.value?(i(),u("div",M,[n(ae,{type:"dashboard",percentage:de.value,width:400,color:"#FF9D28"},{default:h((()=>[n(s,{src:"/addons/weitshop_shop/weshop/public/home/backend/images/v7channel/upLoading.png"})])),_:1},8,["percentage"]),N])):p("",!0),2==ee.value?(i(),u("div",Q,[n(ae,{type:"dashboard",percentage:100,width:400,color:"#FF0000"},{default:h((()=>[n(s,{src:"/addons/weitshop_shop/weshop/public/home/backend/images/v7channel/upLoading.png"})])),_:1}),S])):p("",!0),3==ee.value?(i(),u("div",T,[W,Y,n("div",Z,o(te.value)+"秒后将会自动跳转至审核页面前往后台",1)])):p("",!0)])),_:1})):p("",!0)])])}))}});$.__scopeId="data-v-3c356cf0";export default $;